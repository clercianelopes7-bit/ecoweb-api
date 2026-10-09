
const prisma = require("../prisma");

// Registrar uma ação sustentável
async function criarAcao(dados) {
  return await prisma.acaoSustentavel.create({
    data: dados
  });
}

// Listar as ações sustentáveis registradas
async function listarAcoes() {
  return await prisma.acaoSustentavel.findMany({
    include: {
      usuario: {
        select: {
          id: true,
          nome: true
        }
      }
    },
    orderBy: {
      dataRegistro: "desc"
    }
  });
}

module.exports = {
  criarAcao,
  listarAcoes
};
