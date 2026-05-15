const express        = require("express");
const pedidoRoutes   = require("./src/routes/pedidoRoutes");
const estoqueRoutes  = require("./src/routes/estoqueRoutes");
const authRoutes     = require("./src/routes/authRoutes");
const { errorHandler } = require("./src/middlewares/errorHandlerMiddlewares");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth",    authRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/estoque", estoqueRoutes);

app.get("/", (req, res) => {
  res.json({
    api: "Infor LN — Teste Técnico",
    endpoints: [
      { metodo: "POST", url: "/auth/login",        descricao: "Autenticação — retorna token JWT",        auth: false },
      { metodo: "GET",  url: "/pedidos/validar",    descricao: "Ex1 — Pedidos válidos para faturamento",  auth: false },
      { metodo: "POST", url: "/pedidos/duplicatas", descricao: "Ex2 — Identificar pedidos duplicados",    auth: false },
      { metodo: "GET",  url: "/estoque",            descricao: "Ex3 — Listar estoque atual",              auth: false },
      { metodo: "POST", url: "/estoque/vender",     descricao: "Ex3 — Realizar venda (requer token JWT)", auth: true  },
    ],
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n Servidor rodando em http://localhost:${PORT}`);
  console.log("─────────────────────────────────────────────────────");
  console.log("  POST /auth/login            body: { usuario, senha }");
  console.log("  GET  /pedidos/validar");
  console.log("  POST /pedidos/duplicatas    body: { ids: [...] }");
  console.log("  GET  /estoque");
  console.log("  POST /estoque/vender        body: { produtoId, quantidade }");
  console.log("─────────────────────────────────────────────────────\n");
});

module.exports = app;