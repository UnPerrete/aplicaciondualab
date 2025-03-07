import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
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

app.listen(5001, () => {
  console.log("Servidor corriendo en http://localhost:3306");
});