const { Router }            = require("express");
const { EstoqueController } = require("../controllers/estoqueController");
const { autenticar }        = require("../middlewares/authMiddlewares");

const router     = Router();
const controller = new EstoqueController();

// Exercício 3 - Lista todos os produtos com situação de estoque (pública).
router.get("/",       (req, res, next) => controller.listar(req, res, next));

// Exercício 3 - Processa venda e atualiza estoque (requer JWT).
router.post("/vender", autenticar, (req, res, next) => controller.vender(req, res, next));

module.exports = router;