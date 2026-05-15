const STATUS_PERMITIDOS = ["PENDENTE", "APROVADO", "CANCELADO", "FATURADO"];

class Pedido {
  /**
   * @param {number} id
   * @param {number} valorTotal
   * @param {string} status
   */
  constructor(id, valorTotal, status) {
    this.id         = id;
    this.valorTotal = valorTotal;
    this.status     = status;
  }

  /**
   * Valida a estrutura mínima do pedido antes de processá-lo.
   * @returns {{ valido: boolean, erros: string[] }}
   */
  validarEstrutura() {
    const erros = [];

    if (typeof this.id !== "number")
      erros.push("id deve ser um número");
    if (typeof this.valorTotal !== "number")
      erros.push("valorTotal deve ser um número");
    if (!STATUS_PERMITIDOS.includes(this.status))
      erros.push(`status inválido. Permitidos: ${STATUS_PERMITIDOS.join(", ")}`);

    return { valido: erros.length === 0, erros };
  }
}

module.exports = { Pedido, STATUS_PERMITIDOS };