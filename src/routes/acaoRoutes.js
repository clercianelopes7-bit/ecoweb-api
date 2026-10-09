
const express = require("express");
const router = express.Router();

const acaoController = require("../controllers/acaoController");

// Registrar uma ação sustentável
router.post("/", acaoController.cadastrar);

// Listar as ações sustentáveis
router.get("/", acaoController.listar);

module.exports = router;
