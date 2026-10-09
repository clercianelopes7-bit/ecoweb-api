
const acaoService = require("../services/acaoService");

// Registrar uma ação sustentável
async function cadastrar(req, res) {
  try {
    const acao = await acaoService.cadastrarAcao(req.body);

    return res.status(201).json({
      mensagem: "Ação sustentável registrada com sucesso!",
      acao
    });
  } catch (erro) {
    console.error("Erro ao registrar ação:", erro.message);

    return res.status(erro.status || 500).json({
      mensagem: erro.status
        ? erro.message
        : "Erro interno ao registrar ação sustentável."
    });
  }
}

// Listar as ações sustentáveis
async function listar(req, res) {
  try {
    const acoes = await acaoService.listarAcoes();

    return res.status(200).json(acoes);
  } catch (erro) {
    console.error("Erro ao listar ações:", erro.message);

    return res.status(500).json({
      mensagem: "Erro interno ao listar ações sustentáveis."
    });
  }
}

module.exports = {
  cadastrar,
  listar
};
