import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Parámetros para la conexión a MySQL
const db = mysql.createConnection({
  host: "192.168.0.111",
  user: "admin",
  password: "dualab2025",
  database: "dualab",
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
  const { role, email, password, dni, nif } = req.body;
  let query = "";
  let params = [];

  // Selección de tabla y credenciales según el rol
  if (role === "profesor") {
    query = "SELECT * FROM profesores WHERE email = ? AND password = ?";
    params = [email, password];
  } else if (role === "alumno") {
    query = "SELECT * FROM alumnos WHERE dni = ? AND password = ?";
    params = [dni, password];
  } else if (role === "empresa") {
    query = "SELECT * FROM empresas WHERE nif = ? AND password = ?";
    params = [nif, password];
  } else {
    return res.status(400).json({ success: false, message: "Rol inválido" });
  }

  // Ejecutar consulta en MySQL
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }

    if (results.length > 0) {
      res.json({ success: true, message: "Login exitoso" });
    } else {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  });
});

// Endpoint para obtener los datos de la tabla
app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM dualab"; // Consulta SQL
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los datos:", err);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://192.168.0.111:5000");
});