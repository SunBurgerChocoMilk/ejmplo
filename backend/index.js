require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlBase = require("better-sqlite3");

const app = express();

const db = new sqlBase("Base_de_datos.db");

// Middlewares - orden correcto para que afecten a todas las rutas
app.use(cors());
app.use(express.json());

// Crear la tabla usuarios si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )
`).run();

console.log("Base de datos y tabla creadas");


const rutas = require("./rutas");
app.use("/", rutas);

 
app.get("/", (req, res) => {
    res.send("vida feliz.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


