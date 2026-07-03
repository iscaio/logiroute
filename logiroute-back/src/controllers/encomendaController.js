const encomendaService = require("../services/encomendaService");
const prisma = require("../services/prismaClient");

const cadastroEncomenda = async (req, res) => {
  try {
    const encomendaSalva = await encomendaService.cadastroEncomenda(req.body);

    return res.status(201).json({
      mensagem: "Encomenda cadastrada com sucesso!",
      dados: encomendaSalva,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao cadastrar encomenda.",
      detalhes: error.message,
    });
  }
};

const buscarEncomendaPorId = async (req, res) => {
  try {
    const { id } = req.params; //uuid

    const encomendaEncontrada = await encomendaService.buscarEncomendaPorId(id);

    if (!encomendaEncontrada) {
      return res.status(404).json({ erro: "Encomenda não encontrada!" });
    }

    return res.status(200).json(encomendaEncontrada);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar a encomenda pelo ID.",
      detalhes: error.message,
    });
  }
};

const listarTodasEncomendas = async (req, res) => {
  try {
    const lista = await encomendaService.listarTodasEncomendasBanco();
    return res.status(200).json(lista);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar todas as encomendas.",
      detalhes: error.message,
    });
  }
};

const iniciarEntrega = async (req, res) => {
  try {
    const { encomendaId, motoristaId } = req.body;

    if (!encomendaId || !motoristaId) {
      return res.status(400).json({
        erro: "É necessário enviar o encomendaId e o motoristaId.",
      });
    }

    // O $transaction executa  atualizações ao mesmo tempo (ler mais sobre)
    const [encomendaAtualizada, motoristaAtualizado] =
      await prisma.$transaction([
        prisma.encomenda.update({
          where: { id: encomendaId },
          data: {
            status: "EM_TRANSITO",
            motoristaId: motoristaId,
          },
        }),

        prisma.motorista.update({
          where: { id: motoristaId },
          data: { status: "EM_ROTA" },
        }),
      ]);

    return res.status(200).json({
      mensagem: "Entrega alocada e iniciada com sucesso!",
      encomenda: encomendaAtualizada,
      motorista: motoristaAtualizado,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao alocar a entrega.",
      detalhes: error.message,
    });
  }
};

const finalizarEntrega = async (req, res) => {
  try {
    const { encomendaId, motoristaId } = req.body;

    if (!encomendaId || !motoristaId) {
      return res.status(400).json({
        erro: "É necessário enviar o encomendaId e o motoristaId.",
      });
    }

    const [encomendaAtualizada, motoristaAtualizado] =
      await prisma.$transaction([
        prisma.encomenda.update({
          where: { id: encomendaId },
          data: { status: "ENTREGUE" },
        }),

        prisma.motorista.update({
          where: { id: motoristaId },
          data: { status: "DISPONIVEL" },
        }),
      ]);

    return res.status(200).json({
      mensagem: "Entrega finalizada com sucesso! Motorista liberado.",
      encomenda: encomendaAtualizada,
      motorista: motoristaAtualizado,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao finalizar a entrega.",
      detalhes: error.message,
    });
  }
};

module.exports = {
  cadastroEncomenda,
  buscarEncomendaPorId,
  listarTodasEncomendas,
  iniciarEntrega,
  finalizarEntrega,
};
