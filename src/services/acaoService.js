
const prisma = require("../prisma");
const acaoRepository = require("../repositories/acaoRepository");

// Registrar uma ação sustentável
async function cadastrarAcao(dados) {
  const { descricao, impactoAmbiental, usuarioId } = dados;

  if (
    typeof descricao !== "string" ||
    typeof impactoAmbiental !== "string" ||
    !descricao.trim() ||
    !impactoAmbiental.trim() ||
    !Number.isInteger(usuarioId) ||
    usuarioId <= 0
  ) {
    const erro = new Error(
      "Descrição, impacto ambiental e ID válido do usuário são obrigatórios."
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

  return await acaoRepository.criarAcao({
    descricao: descricao.trim(),
    impactoAmbiental: impactoAmbiental.trim(),
    usuarioId
  });
}

// Listar as ações sustentáveis
async function listarAcoes() {
  return await acaoRepository.listarAcoes();
}

module.exports = {
  cadastrarAcao,
  listarAcoes
};
