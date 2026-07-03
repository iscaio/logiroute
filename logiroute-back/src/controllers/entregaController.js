const entregaService = require("../services/entregaService");

const iniciarEntrega = async (req, res) => {
  try {
    const { encomendaId, motoristaId } = req.body;
    const resultado = await entregaService.iniciarEntregaComSeguranca(
      encomendaId,
      motoristaId,
    );
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = { iniciarEntrega };
