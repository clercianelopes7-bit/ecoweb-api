
const conteudoService = require("../services/conteudoService");

// Cadastrar conteúdo educacional
async function cadastrar(req, res) {
  try {
    const conteudo = await conteudoService.cadastrarConteudo(req.body);

    return res.status(201).json({
      mensagem: "Conteúdo cadastrado com sucesso!",
      conteudo
    });
  } catch (erro) {
    console.error("Erro ao cadastrar conteúdo:", erro.message);

    return res.status(erro.status || 500).json({
      mensagem: erro.status
        ? erro.message
        : "Erro interno ao cadastrar conteúdo."
    });
  }
}

// Listar conteúdos educacionais
async function listar(req, res) {
  try {
    const conteudos = await conteudoService.listarConteudos();

    return res.status(200).json(conteudos);
  } catch (erro) {
    console.error("Erro ao listar conteúdos:", erro.message);

    return res.status(500).json({
      mensagem: "Erro interno ao listar conteúdos."
    });
  }
}


async function buscarPorId(req, res) {
  try {
    const conteudo = await conteudoService.buscarConteudoPorId(req.params.id);

    return res.status(200).json(conteudo);
  } catch (erro) {
    console.error("Erro ao buscar conteúdo:", erro.message);

    return res.status(erro.status || 500).json({
      mensagem: erro.status
        ? erro.message
        : "Erro interno ao buscar conteúdo."
    });
  }
}

module.exports = {
  cadastrar,
  listar,
  buscarPorId
};
