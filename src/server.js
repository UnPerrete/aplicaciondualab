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
  //host: "localhost",
  //user: "root",
  //password:"Riosdelaluna7",
  //database:"duapp",
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
  const { role, nif, password } = req.body;
  const hashedPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);

  console.log(`🔑 Contraseña hasheada recibida desde el frontend: ${hashedPassword}`); // Verificar el hash recibido
  let query = "";
  if (role != "empresa") {
    query = "SELECT * FROM users WHERE nif = ? AND password = ? AND role = ?";
  } else {
    query = "SELECT e.* FROM users u JOIN empresas e ON u.nombre = e.NombreComercial WHERE u.nombre = ? AND u.password = ? AND u.role = ?;"
  }
  let params = [nif, hashedPassword, role];

  // Ejecutar consulta en MySQL
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }

    console.log("Resultados de la consulta:", results); // Agrega este log para ver los resultados

    if (results.length > 0 && role != "empresa") {
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
        }
      });
    } else if (results.length > 0 && role == "empresa") {
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
          role: role || null,
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
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  });
});

app.put("/api/edit-profile/:nif", (req, res) => {
  const { nif } = req.params;
  const updates = req.body; // Recibe cualquier campo a actualizar

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No se enviaron datos para actualizar" });
  }

  // Construimos dinámicamente la consulta SQL
  const fields = Object.keys(updates).map(field => `${field} = ?`).join(", ");
  const values = Object.values(updates);

  const query = `UPDATE users SET ${fields} WHERE nif = ?`;

  console.log("Consulta SQL:", query);  // Verifica la consulta generada
  console.log("Valores:", [...values, nif]);  // Verifica los valores enviados

  db.query(query, [...values, nif], (err, results) => {
    if (err) {
      console.error("Error al actualizar el perfil:", err);
      return res.status(500).json({ error: "Error al actualizar los datos del perfil" });
    }

    if (results.affectedRows > 0) {
      return res.status(200).json({ message: "Perfil actualizado con éxito" });
    } else {
      return res.status(404).json({ error: "No se encontró el usuario con ese NIF" });
    }
  });
});




// Endpoint para obtener los datos de la tabla
app.get("/api/data", (req, res) => {
  const query = "SELECT Municipio, ID, NombreComercial, Sector, Actividad, Calle, Nº, Web FROM empresas"; // Consulta SQL
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
  console.log(req.body);
  const {
    nif,
    pass,
    confirmpass,
    role,
    nombre,
    apellido,
    gmail,
    telefono,
    zona,
    nacimiento,
    poblacion,
    instituto,
    profesor_id
  } = req.body;

  // Validación: Contraseñas coinciden
  if (pass !== confirmpass) return res.status(500).json({ error: 79 });

  // Hashear la contraseña (MD5, no recomendado para producción)
  const hashedPassword = CryptoJS.MD5(pass).toString(CryptoJS.enc.Hex);

  console.log(`🔑 Añadiendo usuario con NIF: ${nif}, Role: ${role}, Nombre: ${nombre}, Apellido: ${apellido}, gmail: ${gmail}, telefono: ${telefono}, Zona: ${zona}, Fecha de Nacimiento: ${nacimiento}, Poblacion: ${poblacion}, Contraseña: ${hashedPassword}`);

  // Query para agregar el usuario a la base de datos
  const query = "CALL insertar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, [nif, hashedPassword, role, nombre, apellido, gmail, telefono, zona, nacimiento, poblacion, instituto, profesor_id], (err, results) => {
    if (err) {
      console.error("Error al subir los datos:", err);
      return res.status(500).json({ error: err.errno });
    }
    console.log("Nuevo usuario añadido");
    res.status(200).json({ success: true });
  });
});


app.post("/api/listProjects", (req, res) => {
  const query = "SELECT p.id_proyecto, p.nombre, p.descripcion FROM proyectos as p JOIN empresas as e ON p.id_empresa = e.ID WHERE e.ID = ?;"
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
  const query = "SELECT a.id, u.nombre, u.apellido FROM users u JOIN alumnos a ON u.id = a.user_id JOIN profesores p ON a.profesor_id = p.id WHERE p.user_id = ?"

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
      console.error("Error al obtener los datos:", err);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    return res.status(200).json(result);
  });
});

app.get("/api/listProfesores", (req, res) => {
  const query = "select id, nombre, apellido from users where role = 'Profesor'"
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

