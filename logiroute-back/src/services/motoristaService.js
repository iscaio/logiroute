const prisma = require("./prismaClient");

const criarMotoristaBanco = async (dadosMotoristaCompleto) => {
  const { dadosMotorista, veiculo } = dadosMotoristaCompleto;

  return await prisma.motorista.create({
    data: {
      nomeMotorista: dadosMotorista.nomeMotorista,
      cpf: dadosMotorista.cpf,
      telefone: dadosMotorista.telefone,
      modeloVeiculo: veiculo.modelo,
      placaVeiculo: veiculo.placa,
      capacidadeMax: parseFloat(veiculo.capacidadeMax),
    },
  });
};

const listarTodosBanco = async () => {
  const motoristas = await prisma.motorista.findMany();
  return motoristas;
};

const listarDisponiveisBanco = async () => {
  return await prisma.motorista.findMany({
    where: { status: "DISPONIVEL" },
  });
};

const buscarPorIdBanco = async (idMotorista) => {
  return await prisma.motorista.findUnique({
    where: { id: idMotorista }, // Sem parseInt!
  });
};

const mudarStatusParaEmRotaBanco = async (idMotorista) => {
  return await prisma.motorista.update({
    where: { id: idMotorista },
    data: { status: "EM_ROTA" },
  });
};

module.exports = {
  criarMotoristaBanco,
  listarTodosBanco,
  listarDisponiveisBanco,
  buscarPorIdBanco,
  mudarStatusParaEmRotaBanco,
};
