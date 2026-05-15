const { PedidoService } = require("../services/pedidoService");

const pedidoService = new PedidoService();

class PedidoController {

  // Exercício 1 — Retorna pedidos separados entre válidos e inválidos para faturamento.
  async validar(req, res, next) {
    try {
      const { validos, invalidos } = await pedidoService.validarPedidos();

      return res.status(200).json({
        sucesso: true,
        data: {
          totalValidos:   validos.length,
          totalInvalidos: invalidos.length,
          validos,
          invalidos,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  // Exercício 2 — Recebe uma lista de IDs e retorna quais estão duplicados.
  async duplicatas(req, res, next) {
    try {
      const { ids }   = req.body;
      const resultado = pedidoService.identificarDuplicatas(ids);

      return res.status(200).json({ sucesso: true, data: resultado });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { PedidoController };