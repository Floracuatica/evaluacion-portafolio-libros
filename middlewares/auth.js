// middlewares/auth.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mi_clave_secreta_super_segura";

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ mensaje: "Falta header de autorización" });
  }

  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({ mensaje: "Formato de autorización inválido" });
  }

  const token = partes[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
}

module.exports = auth;