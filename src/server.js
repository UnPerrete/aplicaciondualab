import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import CryptoJS from "crypto-js";

const app = express();
app.use(express.json());
app.use(cors());

// Parámetros para la conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  // host: "localhost",
  // user: "root",
  // password:"Riosdelaluna7",
  // database:"duapp",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Endpoint para el login
app.post("/api/login", (req, res) => {
  const { role, nif, nombre_comercial, password } = req.body;
  const hashedPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
  const roleNormalized = role?.toLowerCase();

  console.log("🟡 Login recibido:", {
    roleOriginal: role,
    roleNormalized,
    nif,
    nombre_comercial,
    hashedPassword
  });

  let query = "";
  let params = [];

  if (roleNormalized === "profesor") {
    query = "SELECT * FROM users WHERE nif = ? AND password = ? AND role = ?";
    params = [nif, hashedPassword, role];
  } else if (roleNormalized === "alumno") {
    query = `
      SELECT u.*, CONCAT(p.nombre, ' ', p.apellido) AS nombre_profesor
      FROM users u
      LEFT JOIN alumnos a ON u.id = a.user_id
      LEFT JOIN users p ON a.profesor_id = p.id
      WHERE u.nif = ? AND u.password = ? AND u.role = ?;
    `;
    params = [nif, hashedPassword, role];
  } else if (roleNormalized === "empresa") {
    query = `
      SELECT e.*, u.password as user_password
      FROM users u
      JOIN empresas e ON TRIM(LOWER(u.nombre)) = TRIM(LOWER(e.NombreComercial))
      WHERE TRIM(LOWER(u.nombre)) = TRIM(LOWER(?)) AND u.password = ? AND u.role = ?;
    `;
    params = [nombre_comercial, hashedPassword, role];
  } else {
    return res.status(400).json({ success: false, message: "Rol no reconocido" });
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("❌ Error en la consulta:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }

    console.log("📦 Resultados obtenidos en login:");
    console.table(results);

    if (results.length > 0 && roleNormalized !== "empresa") {
      const user = results[0];
      res.json({
        success: true,
        message: "Login exitoso",
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          nacimiento: user.nacimiento,
          poblacion: user.poblacion,
          role: user.role,
          nif: user.nif,
          gmail: user.gmail || null,
          telefono: user.telefono || null,
          zona: user.zona || null,
          profesor: user.nombre_profesor || null,
        }
      });
    } else if (results.length > 0 && roleNormalized === "empresa") {
      const user = results[0];
      res.json({
        success: true,
        message: "Login exitoso",
        user: {
          idzca: user.IdZCA || null,
          municipio: user.Municipio || null,
          ID: user.ID || null,
          nombrecomercial: user.NombreComercial || null,
          razonsocial: user.RazonSocial || null,
          role: role,
          sector: user.Sector || null,
          actividad: user.Actividad || null,
          calle: user.Calle || null,
          nº: user.Nº || null,
          cp: user.CP || null,
          telefono: user.Telefono || null,
          email: user.Email || null,
          web: user.Web || null,
        }
      });
    } else {
      console.log("⚠️ No se encontró empresa o usuario:", role, nif || nombre_comercial);
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  });
});



// Endpoint para obtener nombres comerciales (dropdown)
app.get("/api/empresas", (req, res) => {
  const query = "SELECT NombreComercial FROM empresas ORDER BY NombreComercial ASC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener empresas:", err);
      return res.status(500).json({ error: "Error al obtener empresas" });
    }
    res.json(results);
  });
});


app.put("/api/edit-profile/:nif", (req, res) => {
  const { nif } = req.params;
  const updates = req.body;
  const isEmpresa = updates.role?.toLowerCase() === "empresa";


  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No se enviaron datos para actualizar" });
  }

  // Campos permitidos por tabla
  const camposEmpresa = [
    "nombrecomercial", "razonsocial", "sector", "actividad",
    "calle", "nº", "cp", "municipio", "email", "web", "telefono"
  ];

  const camposUsuario = [
    "nombre", "apellido", "nacimiento", "nif", "gmail",
    "telefono", "poblacion", "zona"
  ];

  const camposValidos = isEmpresa ? camposEmpresa : camposUsuario;

  const fields = camposValidos
    .filter(field => updates[field] !== undefined)
    .map(field => `${field} = ?`)
    .join(", ");

  const values = camposValidos
    .filter(field => updates[field] !== undefined)
    .map(field => updates[field]);

  const query = isEmpresa
    ? `UPDATE empresas SET ${fields} WHERE NombreComercial = ?`
    : `UPDATE users SET ${fields} WHERE nif = ?`;

  const whereValue = isEmpresa ? updates.nombrecomercial : nif;

  db.query(query, [...values, whereValue], (err, result) => {
    if (err) {
      console.error("❌ Error al actualizar el perfil:", err);
      return res.status(500).json({ error: "Error al actualizar perfil" });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Perfil actualizado con éxito" });
    } else {
      res.status(404).json({ error: "No se encontró el registro" });
    }
  });
});





// Endpoint para obtener los datos de la tabla
app.get("/api/data", (req, res) => {
  const query = "SELECT e.Municipio, e.ID, e.NombreComercial, e.Sector, e.Actividad, e.Calle, e.Nº, e.Web, EXISTS(SELECT 1 FROM proyectos WHERE id_empresa = e.ID) AS hasProjects FROM empresas e"; // Consulta SQL
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los datos:", err);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    res.json(results);
  });
});

app.post("/api/data", (req, res) => {
  const query = "SELECT Municipio, ID, NombreComercial, Sector, Actividad, Calle, Nº, Web FROM empresas where NombreComercial LIKE CONCAT('%', ?, '%')";
  const { name } = req.body;
  db.query(query,[name], (err, results) => {
    if (err) {
      console.error("Error al obtener los datos:", err);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    res.status(200).json(results);
  });
}); 

app.post("/api/addUser", (req, res) => {
  const {
    nif, pass, confirmpass, role,
    nombre, nombre_comercial, apellido,
    gmail, telefono, zona,
    nacimiento, poblacion, instituto, profesor_id
  } = req.body;

  // Validación de contraseña
  if (pass !== confirmpass) return res.status(500).json({ error: 79 });


  // Verifica que recibes correctamente el nombre comercial
  console.log("Nombre comercial recibido:", nombre_comercial);

  // Asignación según rol
  const nombreValue = role === "Empresa" ? nombre_comercial.trim() : nombre;
  const apellidoValue = role === "Empresa" ? null : apellido;

  const query = "CALL insertar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, [
    nif, pass, role,
    nombreValue, apellidoValue,
    gmail, telefono, zona,
    nacimiento, poblacion, instituto, profesor_id
  ], (err, results) => {
    if (err) {
      console.error("Error al subir los datos:", err);
      return res.status(500).json({ error: err.errno });
    }
    console.log("✅ Nuevo usuario añadido:", nombreValue);
    res.status(200).json({ success: true });
  });
});



app.post("/api/listProjects", (req, res) => {
  const query = req.body.role == "Alumno" ? "SELECT p.id_proyecto, p.nombre, p.descripcion, p.microservicios, p.estado, JSON_ARRAYAGG(CONCAT(u.nombre, ' ', u.apellido)) AS colaboradores FROM proyectos AS p JOIN empresas AS e ON p.id_empresa = e.ID LEFT JOIN proyectoalumno AS pa ON p.id_proyecto = pa.id_proyecto LEFT JOIN users AS u ON pa.id_alumno = u.id WHERE u.ID = ? GROUP BY p.id_proyecto;" 
  :
   "SELECT p.id_proyecto, p.nombre, p.descripcion, p.microservicios, p.estado, JSON_ARRAYAGG(CONCAT(u.nombre, ' ', u.apellido)) AS colaboradores FROM proyectos AS p JOIN empresas AS e ON p.id_empresa = e.ID LEFT JOIN proyectoalumno AS pa ON p.id_proyecto = pa.id_proyecto LEFT JOIN users AS u ON pa.id_alumno = u.id WHERE e.ID = ? GROUP BY p.id_proyecto;"
  const ID = req.body.ID;
  db.query(query, [ID], (err, results) => {
    if (err) {
      console.error("Error al subir los datos:", err);
      return res.status(500).json({ error: err.errno });
    }
    res.status(200).json(results)
  });
});

// Ruta para recuperar la contraseña
app.post("/api/forgot-password", (req, res) => {
  const { nif } = req.body;

  if (!nif) {
    return res.status(400).json({ error: "El NIF es requerido." });
  }

  console.log("📩 Solicitando recuperación para el NIF:", nif); // Verificar el NIF recibido

  // Consultar en la base de datos si el NIF existe (asegurarse de comparar sin importar mayúsculas/minúsculas)
  db.query("SELECT * FROM users WHERE LOWER(nif) = LOWER(?)", [nif], (err, results) => {
    if (err) {
      console.error("❌ Error al buscar el NIF:", err); // Log detallado del error
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length === 0) {
      console.log(`❌ No se encontró el NIF: ${nif}`); // Verificar si el NIF no existe
      return res.status(404).json({ error: "No existe una cuenta con este NIF." });
    }

    console.log(`✔️ El NIF existe: ${nif}`); // Verificar si el NIF fue encontrado

    res.json({ message: "NIF Confirmado" });
  });
});

// Ruta para restablecer la contraseña
app.post("/api/reset-password", (req, res) => {
  const { nif, newPassword } = req.body;
  const hashedPassword = CryptoJS.MD5(newPassword).toString(CryptoJS.enc.Hex);  // Cifrar la nueva contraseña

  // Actualizar la contraseña en la base de datos
  let query = "UPDATE users SET password = ? WHERE nif = ?";
  let params = [hashedPassword, nif];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error al restablecer la contraseña:", err);
      return res.status(500).json({ message: "Error al restablecer la contraseña" });
    }

    if (results.affectedRows > 0) {
      return res.json({ message: "Contraseña restablecida con éxito" });
    } else {
      return res.status(400).json({ message: "No se encontró el usuario" });
    }
  });
});

//Endpoint para añadir nuevos proyectos
app.post("/api/new-proyect", (req, res) => {
  const query = "INSERT INTO proyectos (id_empresa, nombre, descripcion, microservicios) value (?, ?, ?, ?)";
  const { idEmpresa, nombre, descripcion, microservicio } = req.body;
  db.query(query, [idEmpresa, nombre, descripcion, JSON.stringify(microservicio)], (err, results) => {
    if (err) {
      console.error("Error al añadir nuevo proyecto", err);
      return res.status(500).json({ error: "Error al añadir nuevo proyecto" });
    }
    console.log("Proyecto añadido con exito")
    return res.status(200).json({ success: true })
  });
});


//Endpoint para obtener informacion de un proyecto
app.get("/api/projectInfo/:id", (req, res) => {
  const query = "SELECT p.nombre, p.descripcion, p.microservicios, p.fecha_creacion, p.estado, e.RazonSocial FROM proyectos as p JOIN empresas as e ON p.id_empresa = e.ID WHERE p.id_proyecto = ?";
  const id = parseInt(req.params.id);
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al encontrar el proyecto:", err);
      return res.status(500).json({ error: "Error al encontrar el proyecto" });
    }
    res.status(200).json(results)
  });
});




app.post("/api/guardar-servicio", (req, res) => {
  const { nombreSolicitante, tipoSolicitante, serviciosSeleccionados} = req.body;

  if (!nombreSolicitante || !tipoSolicitante || !Object.keys(serviciosSeleccionados).length) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const query = "INSERT INTO proyectos (nombre, descripcion, microservicios) VALUES (?, ?, ?)";
  const valores = [nombreSolicitante, tipoSolicitante, JSON.stringify(serviciosSeleccionados)];

  db.query(query, valores, (err, result) => {
    if (err) {
      console.error("Error al guardar los datos:", err);
      return res.status(500).json({ error: "Error al guardar los datos en la base de datos" });
    }
    res.status(200).json({ success: true, message: "Datos guardados correctamente" });
  });
});

app.post("/api/listStudents", (req, res) => {
  const id_profesor = req.body.idProfesor;
  const query = "SELECT u.id, u.nombre, u.apellido FROM users u JOIN alumnos a ON u.id = a.user_id JOIN profesores p ON a.profesor_id = p.id WHERE p.user_id = ?"

  db.query(query, [id_profesor], (err, result) => {
    if (err) {
      console.error("Error al guardar los datos:", err);
      return res.status(500).json({ error: "Error al mostrar los datos" });
    }
    return res.status(200).json({ success: true, data: result });
  });
});

app.post("/api/asignarProyecto", (req, res) => {
  const {id_proyecto, id_alumno} = req.body;
  const query = "insert into proyectoalumno (id_proyecto, id_alumno) values (?, ?)";

  db.query(query, [id_proyecto, id_alumno], (err, result) => {
    if (err) {
      console.error("Error al guardar los datos:", err);
      return res.status(500).json({ error: "Error al guardar los datos en la base de datos" });
    }
    return res.status(200).json({ success: true });
  });
});

app.get("/api/listFinishedProjects", (req, res) => {
  const query = "select * from proyectos where estado = 'completado'"
  db.query(query, [], (err, result) => {
    if(err){
      console.error("Error al guardar los datos:", err);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    return res.status(200).json(result);
  });
});

app.get("/api/listProfesores", (req, res) => {
  const query = "SELECT p.id, u.nombre, u.apellido FROM users u JOIN profesores p ON u.id = p.user_id"
  db.query(query, [], (err, result) => {
    if(err){
      console.error("Error al obtener los datos:", err);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    return res.status(200).json(result);
  });
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});

