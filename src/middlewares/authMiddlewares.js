const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não fornecido" });
  }

  // Espera o formato: "Bearer <token>"
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Formato inválido. Use: Bearer <token>" });
  }

  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ sucesso: false, mensagem: "Token inválido ou expirado" });
  }
}

module.exports = { autenticar };