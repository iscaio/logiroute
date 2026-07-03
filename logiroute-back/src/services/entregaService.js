const prisma = require("./prismaClient");

/**
 * @param {string|number} encomendaId
 * @param {string|number} motoristaId
 */
const iniciarEntregaComSeguranca = async (encomendaId, motoristaId) => {
  const encomenda = await prisma.encomenda.findUnique({
    where: { id: encomendaId },
  });

  const motorista = await prisma.motorista.findUnique({
    where: { id: motoristaId },
  });

  if (!encomenda || !motorista) {
    throw new Error(
      "Encomenda ou Motorista não foram encontrados no banco de dados.",
    );
  }

  if (motorista.status !== "DISPONIVEL") {
    throw new Error(
      `O motorista ${motorista.nomeMotorista} não está disponível. Status atual: ${motorista.status}`,
    );
  }

  const { pesoPacote, largura, altura, comprimento } = encomenda;
  const { capacidadeMax, modeloVeiculo } = motorista;

  if (pesoPacote > capacidadeMax) {
    throw new Error(
      `Bloqueio: Carga pesada demais (${pesoPacote}kg) para o veículo ${modeloVeiculo} (Capacidade Max: ${capacidadeMax}kg).`,
    );
  }

  if (modeloVeiculo.toLowerCase().includes("moto") && largura > 60) {
    throw new Error(
      "Bloqueio: A largura do pacote excede o limite seguro para transporte de moto (60cm).",
    );
  }

  const resultadoOperacao = await prisma.$transaction([
    prisma.motorista.update({
      where: { id: motorista.id },
      data: { status: "EM_ROTA" },
    }),
    prisma.encomenda.update({
      where: { id: encomenda.id },
      data: { statusColeta: "EM_TRANSPORTE" },
    }),
  ]);

  return {
    mensagem: "Entrega autorizada e iniciada com sucesso!",
    motorista: resultadoOperacao[0].nomeMotorista,
    veiculo: resultadoOperacao[0].modeloVeiculo,
    statusMotorista: resultadoOperacao[0].status,
    statusEncomenda: resultadoOperacao[1].statusColeta,
  };
};

module.exports = { iniciarEntregaComSeguranca };
