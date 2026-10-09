
const usuarioService = require("../services/usuarioService");

// Cadastrar um novo usuário
async function cadastrar(req, res) {
  try {
    const usuario = await usuarioService.cadastrarUsuario(req.body);

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario
    });
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro.message);

    return res.status(erro.status || 500).json({
      mensagem: erro.status
        ? erro.message
        : "Erro interno ao cadastrar usuário."
    });
  }
}

// Listar os usuários cadastrados
async function listar(req, res) {
  try {
    const usuarios = await usuarioService.listarUsuarios();

    return res.status(200).json(usuarios);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro.message);

    return res.status(500).json({
      mensagem: "Erro interno ao listar usuários."
    });
  }
}


async function buscarPorId(req, res) {
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(req.params.id);

    return res.status(200).json(usuario);
  } catch (erro) {
    console.error("Erro ao buscar usuário:", erro.message);

    return res.status(erro.status || 500).json({
      mensagem: erro.status
        ? erro.message
        : "Erro interno ao buscar usuário."
    });
  }
}

module.exports = {
  cadastrar,
  listar,
  buscarPorId
};

