const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.pedido.deleteMany();
  await prisma.produto.deleteMany();

  // ─── Pedidos (Exercício 1) ───────────────────────────────────────────

  await prisma.pedido.createMany({
    data: [
      { valorTotal: 350.00, status: "APROVADO"  },
      { valorTotal: 0,      status: "PENDENTE"  },
      { valorTotal: 120.50, status: "CANCELADO" },
      { valorTotal: 780.00, status: "APROVADO"  },
      { valorTotal: 0,      status: "CANCELADO" },
      { valorTotal: 200.00, status: "FATURADO"  },
    ],
  });

  // ─── Produtos (Exercício 3) ────────────────────────────────────────────────
  await prisma.produto.createMany({
    data: [
      { nome: 'Monitor 24"',      estoqueAtual: 10, quantidadeMinima: 3 },
      { nome: "Teclado Mecânico", estoqueAtual: 5,  quantidadeMinima: 2 },
      { nome: "Mouse Gamer",      estoqueAtual: 20, quantidadeMinima: 5 },
    ],
  });

  console.log("Banco populado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro ao popular banco:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });