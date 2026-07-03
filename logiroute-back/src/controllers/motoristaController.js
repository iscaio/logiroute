const motoristaService = require("../services/motoristaService");

const cadastrarMotorista = async (req, res) => {
  try {
    const novoMotorista = await motoristaService.criarMotoristaBanco(req.body);
    return res.status(201).json({
      mensagem: "Motorista e veículo cadastrados com sucesso!",
      dados: novoMotorista,
    });
  } catch (error) {
    if (error.code === "P2002") {
      const campo = error.meta?.target?.[0] ?? "campo";
      return res.status(409).json({
        erro: `Já existe um motorista cadastrado com esse ${campo}.`,
      });
    }
    return res.status(500).json({
      erro: "Erro ao cadastrar motorista.",
      detalhes: error.message,
    });
  }
};
const listarTodosMotoristas = async (req, res) => {
  try {
    const todosMotoristas = await motoristaService.listarTodosBanco();
    return res.status(200).json(todosMotoristas);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar todos os motoristas.",
      detalhes: error.message,
    });
  }
};

const listarMotoristasDisponiveis = async (req, res) => {
  try {
    const disponiveis = await motoristaService.listarDisponiveisBanco();
    return res.status(200).json(disponiveis);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar motoristas disponíveis.",
      detalhes: error.message,
    });
  }
};

const buscarMotoristaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const motorista = await motoristaService.buscarPorIdBanco(id);

    if (!motorista) {
      return res.status(404).json({ erro: "Motorista não encontrado." });
    }

    return res.status(200).json(motorista);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar motorista pelo ID.",
      detalhes: error.message,
    });
  }
};

module.exports = {
  cadastrarMotorista,
  listarTodosMotoristas,
  listarMotoristasDisponiveis,
  buscarMotoristaPorId,
};
