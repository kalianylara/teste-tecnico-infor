const { Router }           = require("express");
const { PedidoController } = require("../controllers/pedidoController");

const router     = Router();
const controller = new PedidoController();

// Exercício 1 - Filtra pedidos válidos para faturamento.
router.get("/validar",     (req, res, next) => controller.validar(req, res, next));

// Exercício 2 - Identifica IDs duplicados na lista recebida.
router.post("/duplicatas", (req, res, next) => controller.duplicatas(req, res, next));

module.exports = router;