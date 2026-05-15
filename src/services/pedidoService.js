const { PedidoRepository } = require("../repositories/pedidoRepository");

const pedidoRepository = new PedidoRepository();

class PedidoService {
  /**
   * Exercício 1 — Filtra pedidos válidos para faturamento.
   * São inválidos: pedidos cancelados e pedidos com valor total igual a zero.
   * @returns {Promise<{ validos: Object[], invalidos: Object[] }>}
   */
  async validarPedidos() {
    const todos = await pedidoRepository.findAll();

    const validos   = [];
    const invalidos = [];

    for (const pedido of todos) {
      if (pedido.status === "CANCELADO") {
        invalidos.push({ ...pedido, motivo: "Pedido cancelado" });
        continue;
      }

      if (pedido.valorTotal === 0) {
        invalidos.push({ ...pedido, motivo: "Valor total igual a zero" });
        continue;
      }

      validos.push(pedido);
    }

    return { validos, invalidos };
  }

  /**
   * Exercício 2 — Identifica pedidos duplicados em uma lista de IDs.
   * @param {number[]} ids
   * @returns {{ duplicados: number[], unicos: number[] }}
   */
  identificarDuplicatas(ids) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error("É necessário enviar uma lista de IDs");
    }

    return pedidoRepository.findDuplicatas(ids);
  }
}

module.exports = { PedidoService };