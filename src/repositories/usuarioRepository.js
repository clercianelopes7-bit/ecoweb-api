
const prisma = require("../prisma");

// Cadastrar um usuário
async function criarUsuario(dados) {
  return await prisma.usuario.create({
    data: dados
  });
}

// Listar todos os usuários
async function listarUsuarios() {
  return await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      tipo: true
    }
  });
}

// Buscar um usuário pelo ID
async function buscarUsuarioPorId(id) {
  return await prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      tipo: true
    }
  });
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId
};
