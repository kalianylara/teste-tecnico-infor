const { EstoqueService } = require("../services/estoqueService");

const estoqueService = new EstoqueService();

class EstoqueController {
  async listar(req, res, next) {
    try {
      const produtos = await estoqueService.listarEstoque();
      return res.status(200).json({ sucesso: true, data: produtos });
    } catch (err) {
      next(err);
    }
  }

  // Exercício 3 — Processa a venda e retorna alerta se o estoque ficar abaixo do mínimo.  
  async vender(req, res, next) {
    try {
      const { produtoId, quantidade } = req.body;
      const resultado = await estoqueService.vender(Number(produtoId), Number(quantidade));

      return res.status(200).json({
        sucesso: true,
        alerta:  resultado.abaixoDoMinimo
          ? `⚠️ Estoque de "${resultado.produto.nome}" abaixo do mínimo!`
          : null,
        data: resultado.produto,
      });
    } catch (err) {
      if (err.message.includes("não encontrado")) err.status = 404;
      if (err.message.includes("insuficiente"))   err.status = 400;
      next(err);
    }
  }
}

module.exports = { EstoqueController };