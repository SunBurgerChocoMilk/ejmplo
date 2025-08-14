const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlBase = require("better-sqlite3");

const router = express.Router();
const db = new sqlBase("Base_de_datos.db");
const Clave = process.env.JWT_SECRET;

// Register
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    
    if (!username && !password) {
        return res.status(400).json({ mensaje: "No se ingresó ningún dato" });
    }
    if (!username || !password) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    // si el usuario ya existe:
    const existente = db.prepare("SELECT * FROM usuarios WHERE username = ?").get(username);
    if (existente) {
        return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    try {
        // hashedpassword encripta la contra
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Insertar u
        db.prepare("INSERT INTO usuarios (username, password) VALUES (?, ?)").run(username, hashedPassword);
        res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al registrar usuario", error: err.message });
    }
});

// Middleware para verificar token
function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ mensaje: "Formato de token inválido" });
    }

    try {
        const verificado = jwt.verify(token, Clave);
        req.usuario = verificado;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
}

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const usuario = db.prepare("SELECT * FROM usuarios WHERE username = ?").get(username);

    if (!usuario) {
        return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValida = await bcryptjs.compare(password, usuario.password);
    if (!passwordValida) {
        return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ username: usuario.username }, Clave, { expiresIn: "30m" });

    res.json({ mensaje: "Login exitoso", token });
});

// Ruta protegida
router.get("/perfil", verificarToken, (req, res) => {
    res.json({
        mensaje: "Acceso permitido",
        usuario: req.usuario
    });
});

module.exports = router;
