
const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

// Cadastrar usuário
router.post("/", usuarioController.cadastrar);

// Listar todos os usuários
router.get("/", usuarioController.listar);

// Buscar usuário pelo ID
router.get("/:id", usuarioController.buscarPorId);

module.exports = router;

