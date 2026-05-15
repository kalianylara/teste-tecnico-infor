const { ProdutoRepository } = require("../repositories/produtoRepository");

const produtoRepository = new ProdutoRepository();

class EstoqueService {
  /**
   * Exercício 3 — Realiza a venda de um produto, decrementando o estoque.
   * Lança erro se o produto não existir ou se o estoque for insuficiente.
   * @param {number} produtoId
   * @param {number} quantidade
   * @returns {Promise<{ produto: Object, abaixoDoMinimo: boolean }>}
   */
  async vender(produtoId, quantidade) {
    if (!produtoId || typeof produtoId !== "number") {
      throw new Error("produtoId inválido");
    }

    if (!quantidade || quantidade <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = await produtoRepository.findById(produtoId);

    if (!produto) {
      throw new Error(`Produto #${produtoId} não encontrado`);
    }

    if (quantidade > produto.estoqueAtual) {
      throw new Error(
        `Estoque insuficiente. Disponível: ${produto.estoqueAtual}, Solicitado: ${quantidade}`
      );
    }

    const novoEstoque       = produto.estoqueAtual - quantidade;
    const produtoAtualizado = await produtoRepository.updateEstoque(produtoId, novoEstoque);

    // Verifica se o novo saldo ficou abaixo da quantidade mínima
    const abaixoDoMinimo = produtoAtualizado.estoqueAtual < produtoAtualizado.quantidadeMinima;

    return { produto: produtoAtualizado, abaixoDoMinimo };
  }

  /**
   * Retorna todos os produtos com indicação de estoque abaixo do mínimo.
   * @returns {Promise<Object[]>}
   */
  async listarEstoque() {
    const produtos = await produtoRepository.findAll();

    return produtos.map((p) => ({
      ...p,
      abaixoDoMinimo: p.estoqueAtual < p.quantidadeMinima,
    }));
  }
}

module.exports = { EstoqueService };