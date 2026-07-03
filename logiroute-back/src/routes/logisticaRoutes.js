const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");

// Controllers
const {
  cadastrarMotorista,
  listarTodosMotoristas,
  listarMotoristasDisponiveis,
  buscarMotoristaPorId,
} = require("../controllers/motoristaController");

const {
  cadastroEncomenda,
  buscarEncomendaPorId,
  listarTodasEncomendas,
  iniciarEntrega,
  finalizarEntrega,
} = require("../controllers/encomendaController");

const {
  validadorMotorista,
  validadorEncomenda,
} = require("../middlewares/validadorLogistica");

// motorista
router.post("/cadastroMotorista", auth, validadorMotorista, cadastrarMotorista);
router.get("/motoristas", auth, listarMotoristasDisponiveis);
router.get("/motoristas/todos", auth, listarTodosMotoristas);
router.get("/motorista/:id", auth, buscarMotoristaPorId);

// encomendas
router.post("/encomendas/iniciar", auth, iniciarEntrega);
router.post("/encomendas/finalizar", auth, finalizarEntrega);
router.post("/cadastroEncomendas", auth, validadorEncomenda, cadastroEncomenda);
router.get("/encomenda/:id", auth, buscarEncomendaPorId);
router.get("/encomendas", auth, listarTodasEncomendas);

module.exports = router;
