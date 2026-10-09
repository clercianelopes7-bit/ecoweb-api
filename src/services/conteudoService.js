
const prisma = require("../prisma");
const conteudoRepository = require("../repositories/conteudoRepository");

// Cadastrar um conteúdo educacional
async function cadastrarConteudo(dados) {
  const { titulo, descricao, usuarioId } = dados;

  if (
    typeof titulo !== "string" ||
    typeof descricao !== "string" ||
    !titulo.trim() ||
    !descricao.trim() ||
    !Number.isInteger(usuarioId) ||
    usuarioId <= 0
  ) {
    const erro = new Error(
      "Título, descrição e ID válido do usuário são obrigatórios."
    );
    erro.status = 400;
    throw erro;
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId }
  });

  if (!usuario) {
    const erro = new Error("Usuário não encontrado.");
    erro.status = 404;
    throw erro;
  }

  return await conteudoRepository.criarConteudo({
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    usuarioId
  });
}

// Listar conteúdos educacionais
async function listarConteudos() {
  return await conteudoRepository.listarConteudos();
}


async function buscarConteudoPorId(id) {
  const conteudoId = Number(id);

  if (!Number.isSafeInteger(conteudoId) || conteudoId <= 0) {
    const erro = new Error("ID do conteúdo inválido.");
    erro.status = 400;
    throw erro;
  }

  const conteudo = await conteudoRepository.buscarConteudoPorId(conteudoId);

  if (!conteudo) {
    const erro = new Error("Conteúdo não encontrado.");
    erro.status = 404;
    throw erro;
  }

  return conteudo;
}

module.exports = {
  cadastrarConteudo,
  listarConteudos,
  buscarConteudoPorId
};
