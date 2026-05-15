const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ProdutoRepository {
  /**
   * Retorna todos os produtos cadastrados no banco.
   * @returns {Promise<Produto[]>}
   */
  async findAll() {
    return prisma.produto.findMany();
  }

  /**
   * Busca um produto pelo ID.
   * @param {number} id
   * @returns {Promise<Produto | null>}
   */
  async findById(id) {
    return prisma.produto.findUnique({ where: { id } });
  }

  /**
   * Atualiza o estoque de um produto após uma venda.
   * @param {number} id
   * @param {number} novoEstoque
   * @returns {Promise<Produto>}
   */
  async updateEstoque(id, novoEstoque) {
    return prisma.produto.update({
      where: { id },
      data:  { estoqueAtual: novoEstoque },
    });
  }
}

module.exports = { ProdutoRepository };