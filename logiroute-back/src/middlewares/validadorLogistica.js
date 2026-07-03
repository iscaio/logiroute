const validadorEncomenda = (req, res, next) => {
  const { nomeCliente, pesoPacote, tamanhoPacote, destinoDoPacote } = req.body;

  //Nome
  if (!nomeCliente?.trim()) {
    return res.status(400).json({
      erro: "O Nome do Cliente não ser vazio!",
    });
  }

  //peso
  if (!pesoPacote || pesoPacote <= 0) {
    return res.status(400).json({ erro: "O Peso não pode ser vazio!" });
  }
  //tamanho
  if (!tamanhoPacote || Object.keys(tamanhoPacote).length === 0) {
    return res.status(400).json({ erro: "O Tamanho não pode ser vazio!" });
  }

  const { largura, altura, comprimento } = tamanhoPacote;

  if ([largura, altura, comprimento].some((valor) => valor <= 0 || !valor)) {
    return res.status(400).json({
      erro: "Largura, Altura e Comprimento devem ser maiores que zero!",
    });
  }

  //destino
  if (!destinoDoPacote || Object.keys(destinoDoPacote).length === 0) {
    return res
      .status(400)
      .json({ erro: "As informações não podem esta em branco." });
  }

  if (
    !destinoDoPacote.endereco ||
    Object.keys(destinoDoPacote.endereco).length === 0
  ) {
    return res
      .status(400)
      .json({ erro: "As informações não podem esta em branco." });
  }

  const { cidade, estado, cep, rua, numero } = destinoDoPacote.endereco;

  if (
    [cidade, estado, cep, rua, numero].some(
      (valor) =>
        !valor || typeof valor !== "string" || valor.trim().length === 0,
    )
  ) {
    return res
      .status(400)
      .json({ erro: "As informações não podem esta em branco" });
  }

  next();
};

const validadorMotorista = (req, res, next) => {
  const { dadosMotorista, veiculo } = req.body;

  if (!dadosMotorista || Object.keys(dadosMotorista).length === 0) {
    return res
      .status(400)
      .json({ erro: "As informaçoes do motorista esta vazia!" });
  }

  const { nomeMotorista, cpf, telefone } = dadosMotorista;

  if (
    [nomeMotorista, cpf, telefone].some(
      (valor) =>
        !valor || typeof valor !== "string" || valor.trim().length === 0,
    )
  ) {
    return res
      .status(400)
      .json({ erro: "Nome, CPF e Telefone são obrigatórios!" });
  }

  //veiculo - pai
  if (!veiculo || Object.keys(veiculo).length === 0) {
    return res.status(400).json({ erro: "O dados não podem ser vazio!" });
  }

  const { modelo, placa, capacidadeMax } = veiculo;

  if (
    [modelo, placa].some(
      (valor) =>
        !valor || typeof valor !== "string" || valor.trim().length === 0,
    )
  ) {
    return res
      .status(400)
      .json({ erro: "Os valores não podem estar em branco!" });
  }
  if ([capacidadeMax].some((valor) => valor <= 0 || !valor)) {
    return res
      .status(400)
      .json({ erro: "Os valores não podem estar em branco!" });
  }

  next();
};
module.exports = { validadorEncomenda, validadorMotorista };
