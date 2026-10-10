
const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./src/routes/usuarioRoutes");
const conteudoRoutes = require("./src/routes/conteudoRoutes");
const acaoRoutes = require("./src/routes/acaoRoutes");

const app = express();
const PORT = 3000;
app.use(cors({
  origin: "http://localhost:5173"
}));

// Permite receber dados em formato JSON
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    mensagem: "EcoWeb API funcionando com sucesso!"
  });
});

// Rotas de usuários
app.use("/api/usuarios", usuarioRoutes);

// Rotas de conteúdos educacionais
app.use("/api/conteudos", conteudoRoutes);

// Rotas de ações sustentáveis
app.use("/api/acoes", acaoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor EcoWeb rodando em http://localhost:${PORT}`);
});

