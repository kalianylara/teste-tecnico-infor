class Produto {
  /**
   * @param {number} id
   * @param {string} nome
   * @param {number} estoqueAtual
   * @param {number} quantidadeMinima
   */
  constructor(id, nome, estoqueAtual, quantidadeMinima) {
    this.id               = id;
    this.nome             = nome;
    this.estoqueAtual     = estoqueAtual;
    this.quantidadeMinima = quantidadeMinima;
  }

  /**
   * Valida a estrutura mínima do produto antes de processá-lo.
   * @returns {{ valido: boolean, erros: string[] }}
   */
  validarEstrutura() {
    const erros = [];

    if (typeof this.id !== "number")
      erros.push("id deve ser um número");
    if (typeof this.nome !== "string" || !this.nome.trim())
      erros.push("nome é obrigatório");
    if (typeof this.estoqueAtual !== "number" || this.estoqueAtual < 0)
      erros.push("estoqueAtual deve ser um número >= 0");
    if (typeof this.quantidadeMinima !== "number" || this.quantidadeMinima < 0)
      erros.push("quantidadeMinima deve ser um número >= 0");

    return { valido: erros.length === 0, erros };
  }
}

module.exports = { Produto };