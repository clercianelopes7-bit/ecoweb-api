
const prisma = require("../prisma");

// Cadastrar um conteúdo educacional
async function criarConteudo(dados) {
  return await prisma.conteudo.create({
    data: dados
  });
}

// Listar os conteúdos cadastrados
async function listarConteudos() {
  return await prisma.conteudo.findMany({
    include: {
      usuario: {
        select: {
          id: true,
          nome: true
        }
      }
    }
  });
}


async function buscarConteudoPorId(id) {
  return await prisma.conteudo.findUnique({
    where: { id },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true
        }
      }
    }
  });
}

module.exports = {
  criarConteudo,
  listarConteudos,
  buscarConteudoPorId
};

