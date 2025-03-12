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
  const { role, nif, password } = req.body;
  let query = "SELECT * FROM users WHERE nif = ? AND password = ? and role = ?";
  let params = [nif, password, role];

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
  const query = "SELECT * FROM empresas"; // Consulta SQL
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los datos:", err);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    res.json(results);
  });
});

app.post("/api/addUser", (req, res) => {
  const query = "INSERT INTO `users` (nif, password, role) VALUES (?,?, ?)"
  const {nif, pass, confirmpass, role} = req.body.formData;
  if(pass !== confirmpass) return res.status(500).json({error: "Las Contraseñas no coinciden"})
  db.query(query, [nif, pass, role], (err, results) => {
    if (err) {
      console.error("Error al subir los datos:", err);
      return res.status(500).json({ error: "Este NIF ya esta registrado" });
    }
    console.log("Nuevo usuario añadido")
    res.status(200).json({success: true})
  });
} );

app.listen(5000, () => {
  console.log("Servidor corriendo en http://192.168.0.111:5000");
});