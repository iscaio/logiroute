// Espelha exatamente os models do prisma/schema.prisma do back-end.

export type StatusMotorista = "DISPONIVEL" | "EM_ROTA" | "INATIVO";

export interface Motorista {
  id: string;
  nomeMotorista: string;
  cpf: string;
  telefone: string;
  status: StatusMotorista;
  modeloVeiculo: string;
  placaVeiculo: string;
  capacidadeMax: number; // kg
  createdAt: string;
}

export type StatusEncomenda = "AGUARDANDO_COLETA" | "EM_TRANSITO" | "ENTREGUE";

export interface Encomenda {
  id: string; // UUID (Prisma), não _id
  nomeCliente: string;
  pesoPacote: number; // kg
  largura: number; // cm
  altura: number; // cm
  comprimento: number; // cm
  destinoDoPacote: string; // string única, já formatada pelo back
  status: StatusEncomenda;
  createdAt: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  createdAt?: string;
  cargo?: string;
}

// ---------- Payloads enviados pelo front ----------

export interface LoginInput {
  email: string;
  password: string;
}

// POST /api/auth/login → { message, token }  (sem "usuario"!)
export interface LoginResponse {
  message: string;
  token: string;
}

export interface CadastroUsuarioInput {
  nome: string;
  email: string;
  password: string;
}
export interface CadastroUsuarioResponse {
  message: string;
  user: Usuario;
}

// Payload aninhado exigido pelo validadorMotorista
export interface NovoMotoristaInput {
  dadosMotorista: {
    nomeMotorista: string;
    cpf: string;
    telefone: string;
  };
  veiculo: {
    modelo: string;
    placa: string;
    capacidadeMax: number;
  };
}

export interface EnderecoEncomenda {
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
}

// Payload
export interface NovaEncomendaInput {
  nomeCliente: string;
  pesoPacote: number;
  tamanhoPacote: {
    largura: number;
    altura: number;
    comprimento: number;
  };
  destinoDoPacote: {
    endereco: EnderecoEncomenda;
  };
}

export interface DespachoResponse {
  mensagem: string;
  encomenda: Encomenda;
  motorista: Motorista;
}
