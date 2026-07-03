import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Truck, UserPlus } from "lucide-react";
import FormField from "../components/FormField";
import { criarMotorista } from "../hooks/useMotoristas";
import { NotificationService } from "../services/NotificationService";
import { formatarCPF, formatarPlaca, formatarTelefone, validarCPF, validarPlaca, validarTelefone } from "../utils/validators";

interface Estado {
  nome: string;
  cpf: string;
  telefone: string;
  placa: string;
  modelo: string;
  capacidadeMax: string;
}

const VAZIO: Estado = { nome: "", cpf: "", telefone: "", placa: "", modelo: "", capacidadeMax: "" };

export default function CadastroMotorista() {
  const navigate = useNavigate();
  const [dados, setDados] = useState<Estado>(VAZIO);
  const [tocado, setTocado] = useState<Partial<Record<keyof Estado, boolean>>>({});
  const [enviando, setEnviando] = useState(false);

  function atualizar<K extends keyof Estado>(campo: K, valor: string) {
    setDados((prev) => ({ ...prev, [campo]: valor }));
  }

  function marcarTocado(campo: keyof Estado) {
    setTocado((prev) => ({ ...prev, [campo]: true }));
  }

  const erros: Partial<Record<keyof Estado, string>> = {};
  if (!dados.nome.trim()) erros.nome = "Informe o nome completo do motorista.";
  if (dados.cpf && !validarCPF(dados.cpf)) erros.cpf = "CPF inválido. Confira os números digitados.";
  if (!dados.cpf) erros.cpf = "Informe o CPF.";
  if (dados.telefone && !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido.";
  if (!dados.telefone) erros.telefone = "Informe o telefone.";
  if (!dados.placa) erros.placa = "Informe a placa.";
  else if (!validarPlaca(dados.placa)) erros.placa = "Placa inválida. Use o padrão ABC1234 ou ABC1D23.";
  if (!dados.modelo.trim()) erros.modelo = "Informe o modelo do veículo.";
  if (!dados.capacidadeMax) erros.capacidadeMax = "Informe a capacidade máxima de carga.";
  else if (Number(dados.capacidadeMax) <= 0) erros.capacidadeMax = "A capacidade deve ser maior que zero.";

  const formValido = Object.keys(erros).length === 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTocado({
      nome: true, cpf: true, telefone: true, placa: true, modelo: true, capacidadeMax: true,
    });
    if (!formValido) return;

    setEnviando(true);
    try {
      const motorista = await criarMotorista({
        dadosMotorista: {
          nomeMotorista: dados.nome.trim(),
          cpf: dados.cpf,
          telefone: dados.telefone,
        },
        veiculo: {
          placa: formatarPlaca(dados.placa),
          modelo: dados.modelo.trim(),
          capacidadeMax: Number(dados.capacidadeMax),
        },
      });
      NotificationService.success(`Motorista ${motorista.nomeMotorista} cadastrado e disponível na frota.`);
      setDados(VAZIO);
      setTocado({});
      navigate("/");
    } catch {
      NotificationService.error("Não foi possível cadastrar o motorista. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-8 py-8">
      <header className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-manifest">
          Cadastro · Frota
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-semibold text-paper-100">
          Novo motorista
        </h1>
        <p className="mt-1.5 font-body text-sm text-paper-600">
          Cadastre o motorista e o veículo associado. Ele entra na frota como disponível.
        </p>
      </header>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <section className="rounded-lg border border-graphite-700 bg-graphite-800 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-[13.5px] font-semibold text-paper-100">
            <UserPlus className="size-4 text-manifest" /> Dados do motorista
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FormField
                id="nome"
                label="Nome completo"
                placeholder="Ex.: João da Silva"
                value={dados.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
                onBlur={() => marcarTocado("nome")}
                erro={tocado.nome ? erros.nome : undefined}
              />
            </div>
            <FormField
              id="cpf"
              label="CPF"
              placeholder="000.000.000-00"
              inputMode="numeric"
              value={dados.cpf}
              onChange={(e) => atualizar("cpf", formatarCPF(e.target.value))}
              onBlur={() => marcarTocado("cpf")}
              erro={tocado.cpf ? erros.cpf : undefined}
            />
            <FormField
              id="telefone"
              label="Telefone"
              placeholder="(00) 00000-0000"
              inputMode="numeric"
              value={dados.telefone}
              onChange={(e) => atualizar("telefone", formatarTelefone(e.target.value))}
              onBlur={() => marcarTocado("telefone")}
              erro={tocado.telefone ? erros.telefone : undefined}
            />
          </div>
        </section>

        <section className="rounded-lg border border-graphite-700 bg-graphite-800 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-[13.5px] font-semibold text-paper-100">
            <Truck className="size-4 text-manifest" /> Veículo associado
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="placa"
              label="Placa"
              placeholder="ABC1D23"
              value={dados.placa}
              onChange={(e) => atualizar("placa", formatarPlaca(e.target.value))}
              onBlur={() => marcarTocado("placa")}
              erro={tocado.placa ? erros.placa : undefined}
            />
            <FormField
              id="modelo"
              label="Modelo do veículo"
              placeholder="Ex.: Fiat Fiorino Furgão"
              value={dados.modelo}
              onChange={(e) => atualizar("modelo", e.target.value)}
              onBlur={() => marcarTocado("modelo")}
              erro={tocado.modelo ? erros.modelo : undefined}
            />
            <FormField
              id="capacidadeMax"
              label="Capacidade máxima de peso"
              placeholder="0"
              type="number"
              min={0}
              sufixo="kg"
              value={dados.capacidadeMax}
              onChange={(e) => atualizar("capacidadeMax", e.target.value)}
              onBlur={() => marcarTocado("capacidadeMax")}
              erro={tocado.capacidadeMax ? erros.capacidadeMax : undefined}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={enviando}
          className="flex items-center justify-center gap-2 rounded-md bg-manifest px-5 py-2.5 font-body text-sm font-medium text-graphite-950 transition-colors hover:bg-manifest-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Cadastrando…
            </>
          ) : (
            "Cadastrar motorista"
          )}
        </button>
      </form>
    </div>
  );
}
