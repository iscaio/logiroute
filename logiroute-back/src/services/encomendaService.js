const prisma = require("./prismaClient");

const cadastroEncomenda = async (dadosEncomenda) => {
  const { nomeCliente, pesoPacote, tamanhoPacote, destinoDoPacote } =
    dadosEncomenda;

  const { rua, numero, cidade, estado, cep } = destinoDoPacote.endereco;

  const enderecoFormatado = `${rua}, ${numero} - ${cidade}/${estado}, CEP ${cep}`;

  return await prisma.encomenda.create({
    data: {
      nomeCliente,
      pesoPacote: parseFloat(pesoPacote),
      largura: parseFloat(tamanhoPacote.largura),
      altura: parseFloat(tamanhoPacote.altura),
      comprimento: parseFloat(tamanhoPacote.comprimento),
      destinoDoPacote: enderecoFormatado,
    },
  });
};

const buscarEncomendaPorId = async (encomendaId) => {
  return await prisma.encomenda.findUnique({
    where: { id: encomendaId },
  });
};

const listarTodasEncomendasBanco = async () => {
  return await prisma.encomenda.findMany();
};

module.exports = {
  cadastroEncomenda,
  buscarEncomendaPorId,
  listarTodasEncomendasBanco,
};
