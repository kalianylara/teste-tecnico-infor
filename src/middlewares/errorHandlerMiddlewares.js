function errorHandler(err, req, res, next) {
  console.error(`[ERRO] ${err.message}`);

  return res.status(err.status || 500).json({
    sucesso:  false,
    mensagem: err.message || "Erro interno do servidor",
  });
}

module.exports = { errorHandler };