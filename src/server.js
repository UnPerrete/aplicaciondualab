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
  //host: process.env.DB_HOST,
  //user: process.env.DB_USER,
  //password: process.env.DB_PASS,
  //database: process.env.DB,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "duapp",
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

  let query = "SELECT * FROM users WHERE nif = ? AND password = ? AND role = ?";
  let params = [nif, hashedPassword, role];

  // Ejecutar consulta en MySQL
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }
  
    console.log("Resultados de la consulta:", results); // Agrega este log para ver los resultados
  
    if (results.length > 0) {
      const user = results[0];
      res.json({
        success: true,
        message: "Login exitoso",
        user: {
          nombre: user.nombre,
          apellido: user.apellido,
          role: user.role,
          nif: user.nif,
          email: user.email || null
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

app.post("/api/addUser", (req, res) => {
  const { nif, pass, confirmpass, role, nombre, apellido } = req.body;

  // Validación: Contraseñas coinciden
  if (pass !== confirmpass) return res.status(500).json({ error: 79 });

  // Hashear la contraseña (MD5, no recomendado para producción)
  const hashedPassword = CryptoJS.MD5(pass).toString(CryptoJS.enc.Hex);

  console.log(`🔑 Añadiendo usuario con NIF: ${nif}, Role: ${role}, Nombre: ${nombre}, Apellido: ${apellido}, Contraseña: ${hashedPassword}`);

  // Query para agregar el usuario a la base de datos
  const query = "INSERT INTO `users` (nif, password, role, nombre, apellido) VALUES (?,?,?,?,?)";

  db.query(query, [nif, hashedPassword, role, nombre, apellido], (err, results) => {
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
  const {idEmpresa, nombre, descripcion, microservicio} = req.body;
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


app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});