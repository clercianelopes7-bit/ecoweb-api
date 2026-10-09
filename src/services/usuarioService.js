
const bcrypt = require("bcryptjs");
const prisma = require("../prisma");
const usuarioRepository = require("../repositories/usuarioRepository");

async function cadastrarUsuario(dados) {
  const { nome, email, senha } = dados;

  if (
    typeof nome !== "string" ||
    typeof email !== "string" ||
    typeof senha !== "string" ||
    !nome.trim() ||
    !email.trim() ||
    !senha
  ) {
    const erro = new Error("Nome, email e senha são obrigatórios.");
    erro.status = 400;
    throw erro;
  }

  if (senha.length < 8) {
    const erro = new Error("A senha deve ter pelo menos 8 caracteres.");
    erro.status = 400;
    throw erro;
  }

  const emailNormalizado = email.trim().toLowerCase();

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: emailNormalizado }
  });

  if (usuarioExistente) {
    const erro = new Error("Este email já está cadastrado.");
    erro.status = 409;
    throw erro;
  }

  const senhaProtegida = await bcrypt.hash(senha, 10);

  const usuario = await usuarioRepository.criarUsuario({
    nome: nome.trim(),
    email: emailNormalizado,
    senha: senhaProtegida
  });

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo
  };
}

async function listarUsuarios() {
  return await usuarioRepository.listarUsuarios();
}


async function buscarUsuarioPorId(id) {
  const usuarioId = Number(id);

  if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
    const erro = new Error("ID do usuário inválido.");
    erro.status = 400;
    throw erro;
  }

  const usuario = await usuarioRepository.buscarUsuarioPorId(usuarioId);

  if (!usuario) {
    const erro = new Error("Usuário não encontrado.");
    erro.status = 404;
    throw erro;
  }

  return usuario;
}

module.exports = {
  cadastrarUsuario,
  listarUsuarios,
  buscarUsuarioPorId
};
