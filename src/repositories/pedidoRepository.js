const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class PedidoRepository {
  /**
   * Retorna todos os pedidos cadastrados no banco.
   * @returns {Promise<Pedido[]>}
   */
  async findAll() {
    return prisma.pedido.findMany();
  }

  /**
   * Exercício 2 — Identifica duplicatas em uma lista de IDs recebida via integração.
   * Usa Map para contar ocorrências em O(n), sem precisar de consulta adicional ao banco.
   * @param {number[]} ids
   * @returns {{ duplicados: number[], unicos: number[] }}
   */
  findDuplicatas(ids) {
    const ocorrencias = new Map();

    for (const id of ids) {
      ocorrencias.set(id, (ocorrencias.get(id) ?? 0) + 1);
    }

    const duplicados = [];
    const unicos     = [];

    for (const [id, count] of ocorrencias) {
      if (count > 1) duplicados.push(id);
      else           unicos.push(id);
    }

    return { duplicados, unicos };
  }
}

module.exports = { PedidoRepository };