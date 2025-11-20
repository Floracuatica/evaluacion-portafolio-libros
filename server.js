// server.js
const express = require("express");
const jwt = require("jsonwebtoken");

const usuarios = require("./data/usuarios");
const libros = require("./data/libros");
const auth = require("./middlewares/auth");

const app = express();
app.use(express.json());

const JWT_SECRET = "mi_clave_secreta_super_segura";

// Ruta pública de bienvenida
app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenida a la API de portafolio - módulo libros"
  });
});

// Registro de usuario (username, password)
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ mensaje: "username y password son obligatorios" });
  }

  const existente = usuarios.find((u) => u.username === username);
  if (existente) {
    return res.status(409).json({ mensaje: "El usuario ya existe" });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    username,
    password // para la evaluación lo dejamos en texto plano
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    mensaje: "Usuario registrado con éxito",
    usuario: { id: nuevoUsuario.id, username: nuevoUsuario.username }
  });
});

// Inicio de sesión con JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const usuario = usuarios.find(
    (u) => u.username === username && u.password === password
  );

  if (!usuario) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      username: usuario.username
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    mensaje: "Login exitoso",
    token
  });
});

// Listar libros (puede ser público)
app.get("/libros", (req, res) => {
  res.json(libros);
});

// Comprar libro (solo usuario con sesión activa)
app.post("/libros/:id/comprar", auth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { cantidad } = req.body;

  if (!cantidad || cantidad <= 0) {
    return res
      .status(400)
      .json({ mensaje: "Debes especificar una cantidad válida" });
  }

  const libro = libros.find((l) => l.id === id);

  if (!libro) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  if (libro.cantidad_disponible < cantidad) {
    return res.status(400).json({
      mensaje: "No hay stock suficiente para esta compra",
      stock_actual: libro.cantidad_disponible
    });
  }

  libro.cantidad_disponible -= cantidad;

  res.json({
    mensaje: "Compra realizada con éxito",
    libro
  });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});