const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando o plantio de dados (Seed)...");

  // ================= 1. USUÁRIOS =================
  const senhaHash = await bcrypt.hash("123456", 10);

  const usuario = await prisma.usuario.upsert({
    where: { email: "operador@empresa.com" },
    update: {},
    create: {
      nome: "Caio Andrade",
      email: "operador@empresa.com",
      password: senhaHash,
    },
  });
  console.log(` Usuário criado: ${usuario.nome}[cite: 1]`);

  // ================= 2. MOTORISTAS =================
  const motoristasMock = [
    {
      nomeMotorista: "Adriana Souza",
      cpf: "48291637005",
      telefone: "(83) 99123-4501",
      status: "DISPONIVEL",
      modeloVeiculo: "Volkswagen Delivery 9.170",
      placaVeiculo: "BRA2E19",
      capacidadeMax: 3500,
    },
    {
      nomeMotorista: "Marcos Vinícius Lima",
      cpf: "63520819044",
      telefone: "(83) 99876-2233",
      status: "EM_ROTA",
      modeloVeiculo: "Fiat Fiorino Furgão",
      placaVeiculo: "RJK4P30",
      capacidadeMax: 650,
    },
    {
      nomeMotorista: "Kaique Ferreira",
      cpf: "09177436027",
      telefone: "(83) 98812-0099",
      status: "EM_ROTA",
      modeloVeiculo: "Honda CG 160 (Moto)",
      placaVeiculo: "MTB9X21",
      capacidadeMax: 35,
    },
    {
      nomeMotorista: "Beatriz Nogueira",
      cpf: "21766394018",
      telefone: "(83) 99345-7712",
      status: "DISPONIVEL",
      modeloVeiculo: "Mercedes-Benz Sprinter 415",
      placaVeiculo: "SPT4L15",
      capacidadeMax: 5200,
    },
    {
      nomeMotorista: "Rogério Albuquerque",
      cpf: "55012874063",
      telefone: "(83) 98221-4488",
      status: "INATIVO",
      modeloVeiculo: "Yamaha Fazer 250 (Moto)",
      placaVeiculo: "MTY7Q88",
      capacidadeMax: 25,
    },
    {
      nomeMotorista: "Camila Duarte",
      cpf: "37489561052",
      telefone: "(83) 99667-3321",
      status: "DISPONIVEL",
      modeloVeiculo: "Iveco Daily 35S14",
      placaVeiculo: "IVC3D14",
      capacidadeMax: 3000,
    },
  ];

  for (const m of motoristasMock) {
    await prisma.motorista.create({ data: m });
  }
  console.log(` ${motoristasMock.length} Motoristas cadastrados.`);

  // ================= 3. ENCOMENDAS =================
  const encomendasMock = [
    {
      nomeCliente: "Oficina Torque Certo",
      pesoPacote: 42.5,
      largura: 45,
      altura: 30,
      comprimento: 60,
      destinoDoPacote:
        "Rua Marquês do Herval, 88 - Campina Grande/PB, CEP 58400-000",
      statusColeta: "AGUARDANDO_COLETA",
    },
    {
      nomeCliente: "Escritório Alves & Pontes",
      pesoPacote: 0.4,
      largura: 32,
      altura: 2,
      comprimento: 45,
      destinoDoPacote:
        "Av. Floriano Peixoto, 320 - Campina Grande/PB, CEP 58401-000",
      statusColeta: "AGUARDANDO_COLETA",
    },
    {
      nomeCliente: "Helena Ramos",
      pesoPacote: 14.2,
      largura: 48,
      altura: 38,
      comprimento: 42,
      destinoDoPacote:
        "Rua Cardoso Vieira, 640 - Campina Grande/PB, CEP 58402-000",
      statusColeta: "AGUARDANDO_COLETA",
    },
    {
      nomeCliente: "Construtora Alicerce",
      pesoPacote: 3800,
      largura: 120,
      altura: 110,
      comprimento: 120,
      destinoDoPacote: "BR-230, km 12 - Campina Grande/PB, CEP 58403-000",
      statusColeta: "AGUARDANDO_COLETA",
    },
    {
      nomeCliente: "Boutique Fio & Trama",
      pesoPacote: 2.1,
      largura: 25,
      altura: 20,
      comprimento: 30,
      destinoDoPacote:
        "Rua Miguel Couto, 210 - Campina Grande/PB, CEP 58404-000",
      statusColeta: "AGUARDANDO_COLETA",
    },
    {
      nomeCliente: "Tech Solutions LTDA",
      pesoPacote: 8.7,
      largura: 65,
      altura: 40,
      comprimento: 55,
      destinoDoPacote:
        "Rua Barão do Triunfo, 77 - Campina Grande/PB, CEP 58405-000",
      statusColeta: "AGUARDANDO_COLETA",
    },
  ];

  // Nota: Mapeei "statusColeta" do seu front para o campo "status" que usamos no back-end.
  for (const e of encomendasMock) {
    await prisma.encomenda.create({ data: e });
  }
  console.log(` ${encomendasMock.length} Encomendas cadastradas.`);

  console.log("Seed finalizado com sucesso! O banco está pronto.");
}

main()
  .catch((e) => {
    console.error("Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
