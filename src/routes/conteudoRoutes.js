
const express = require("express");
const router = express.Router();

const conteudoController = require("../controllers/conteudoController");

// Cadastrar conteúdo educacional
router.post("/", conteudoController.cadastrar);

// Listar todos os conteúdos
router.get("/", conteudoController.listar);

// Buscar conteúdo pelo ID
router.get("/:id", conteudoController.buscarPorId);

module.exports = router;
