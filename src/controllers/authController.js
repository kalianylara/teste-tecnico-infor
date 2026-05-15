const jwt = require("jsonwebtoken");

const JWT_SECRET  = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";
const AUTH_USER   = process.env.AUTH_USER;
const AUTH_PASS   = process.env.AUTH_PASS;

class AuthController {
  login(req, res, next) {
    try {
      const { usuario, senha } = req.body;

      if (!usuario || !senha) {
        const err = new Error("Usuário e senha são obrigatórios");
        err.status = 400;
        throw err;
      }

      if (usuario !== AUTH_USER || senha !== AUTH_PASS) {
        const err = new Error("Usuário ou senha inválidos");
        err.status = 401;
        throw err;
      }

      const token = jwt.sign({ nome: usuario }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

      return res.status(200).json({ sucesso: true, token, expiraEm: JWT_EXPIRES });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { AuthController };