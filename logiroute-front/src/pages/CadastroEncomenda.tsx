import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Loader2, MapPin, Ruler } from "lucide-react";
import FormField from "../components/FormField";
import { criarEncomenda } from "../hooks/useEncomendas";
import { NotificationService } from "../services/NotificationService";

interface Estado {
  nomeCliente: string;
  pesoPacote: string;
  largura: string;
  altura: string;
  comprimento: string;
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
}

const VAZIO: Estado = {
  nomeCliente: "",
  pesoPacote: "",
  largura: "",
  altura: "",
  comprimento: "",
  rua: "",
  numero: "",
  cidade: "",
  estado: "",
  cep: "",
};

const UFS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export default function CadastroEncomenda() {
  const navigate = useNavigate();
  const [dados, setDados] = useState<Estado>(VAZIO);
  const [tocado, setTocado] = useState<Partial<Record<keyof Estado, boolean>>>(
    {},
  );
  const [enviando, setEnviando] = useState(false);

  function atualizar<K extends keyof Estado>(campo: K, valor: string) {
    setDados((prev) => ({ ...prev, [campo]: valor }));
  }

  function marcarTocado(campo: keyof Estado) {
    setTocado((prev) => ({ ...prev, [campo]: true }));
  }

  const erros: Partial<Record<keyof Estado, string>> = {};
  if (!dados.nomeCliente.trim())
    erros.nomeCliente = "Informe o nome do cliente.";
  if (!dados.pesoPacote) erros.pesoPacote = "Informe o peso.";
  else if (Number(dados.pesoPacote) <= 0)
    erros.pesoPacote = "O peso deve ser maior que zero.";
  if (!dados.largura) erros.largura = "Informe a largura.";
  else if (Number(dados.largura) <= 0)
    erros.largura = "A largura deve ser maior que zero.";
  if (!dados.altura) erros.altura = "Informe a altura.";
  else if (Number(dados.altura) <= 0)
    erros.altura = "A altura deve ser maior que zero.";
  if (!dados.comprimento) erros.comprimento = "Informe o comprimento.";
  else if (Number(dados.comprimento) <= 0)
    erros.comprimento = "O comprimento deve ser maior que zero.";
  if (!dados.rua.trim()) erros.rua = "Informe a rua.";
  if (!dados.numero.trim()) erros.numero = "Informe o número.";
  if (!dados.cidade.trim()) erros.cidade = "Informe a cidade.";
  if (!dados.estado) erros.estado = "Selecione o estado.";
  if (!dados.cep.trim()) erros.cep = "Informe o CEP.";

  const formValido = Object.keys(erros).length === 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTocado({
      nomeCliente: true,
      pesoPacote: true,
      largura: true,
      altura: true,
      comprimento: true,
      rua: true,
      numero: true,
      cidade: true,
      estado: true,
      cep: true,
    });
    if (!formValido) return;

    setEnviando(true);
    try {
      const encomenda = await criarEncomenda({
        nomeCliente: dados.nomeCliente.trim(),
        pesoPacote: Number(dados.pesoPacote),
        tamanhoPacote: {
          largura: Number(dados.largura),
          altura: Number(dados.altura),
          comprimento: Number(dados.comprimento),
        },
        destinoDoPacote: {
          endereco: {
            rua: dados.rua.trim(),
            numero: dados.numero.trim(),
            cidade: dados.cidade.trim(),
            estado: dados.estado,
            cep: dados.cep.trim(),
          },
        },
      });
      NotificationService.success(
        `Encomenda de ${encomenda.nomeCliente} cadastrada e aguardando coleta.`,
      );
      setDados(VAZIO);
      setTocado({});
      navigate("/encomendas");
    } catch (err: any) {
      const mensagem =
        err?.response?.data?.erro ??
        "Não foi possível cadastrar a encomenda. Tente novamente.";
      NotificationService.error(mensagem);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-8 py-8">
      <header className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-manifest">
          Cadastro · Carga
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-semibold text-paper-100">
          Nova encomenda
        </h1>
        <p className="mt-1.5 font-body text-sm text-paper-600">
          As dimensões definem a cubagem usada na triagem e na validação de
          despacho.
        </p>
      </header>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <section className="rounded-lg border border-graphite-700 bg-graphite-800 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-[13.5px] font-semibold text-paper-100">
            <Box className="size-4 text-manifest" /> Dados da carga
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="nomeCliente"
              label="Nome do cliente"
              placeholder="Nome ou razão social"
              value={dados.nomeCliente}
              onChange={(e) => atualizar("nomeCliente", e.target.value)}
              onBlur={() => marcarTocado("nomeCliente")}
              erro={tocado.nomeCliente ? erros.nomeCliente : undefined}
            />
            <FormField
              id="pesoPacote"
              label="Peso"
              placeholder="0"
              type="number"
              min={0}
              step="0.1"
              sufixo="kg"
              value={dados.pesoPacote}
              onChange={(e) => atualizar("pesoPacote", e.target.value)}
              onBlur={() => marcarTocado("pesoPacote")}
              erro={tocado.pesoPacote ? erros.pesoPacote : undefined}
            />
          </div>
        </section>

        <section className="rounded-lg border border-graphite-700 bg-graphite-800 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-[13.5px] font-semibold text-paper-100">
            <MapPin className="size-4 text-manifest" /> Endereço de entrega
          </h2>
          <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
            <FormField
              id="rua"
              label="Rua"
              placeholder="Nome da rua"
              value={dados.rua}
              onChange={(e) => atualizar("rua", e.target.value)}
              onBlur={() => marcarTocado("rua")}
              erro={tocado.rua ? erros.rua : undefined}
            />
            <FormField
              id="numero"
              label="Número"
              placeholder="0"
              value={dados.numero}
              onChange={(e) => atualizar("numero", e.target.value)}
              onBlur={() => marcarTocado("numero")}
              erro={tocado.numero ? erros.numero : undefined}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <FormField
              id="cidade"
              label="Cidade"
              placeholder="Ex.: Campina Grande"
              value={dados.cidade}
              onChange={(e) => atualizar("cidade", e.target.value)}
              onBlur={() => marcarTocado("cidade")}
              erro={tocado.cidade ? erros.cidade : undefined}
            />
            <div>
              <label
                htmlFor="estado"
                className="mb-1.5 block font-body text-[13px] font-medium text-paper-200"
              >
                Estado
              </label>
              <select
                id="estado"
                value={dados.estado}
                onChange={(e) => atualizar("estado", e.target.value)}
                onBlur={() => marcarTocado("estado")}
                className={`w-full rounded-md border bg-graphite-800 py-2.5 px-3 font-body text-sm text-paper-100 outline-none transition-colors ${
                  tocado.estado && erros.estado
                    ? "border-route-danger/60"
                    : "border-graphite-600 focus:border-manifest"
                }`}
              >
                <option value="">UF</option>
                {UFS.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
              {tocado.estado && erros.estado && (
                <p className="mt-1.5 font-mono text-[11px] text-route-danger">
                  {erros.estado}
                </p>
              )}
            </div>
            <FormField
              id="cep"
              label="CEP"
              placeholder="00000-000"
              value={dados.cep}
              onChange={(e) => atualizar("cep", e.target.value)}
              onBlur={() => marcarTocado("cep")}
              erro={tocado.cep ? erros.cep : undefined}
            />
          </div>
        </section>

        <section className="rounded-lg border border-graphite-700 bg-graphite-800 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-[13.5px] font-semibold text-paper-100">
            <Ruler className="size-4 text-manifest" /> Dimensões
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              id="largura"
              label="Largura"
              placeholder="0"
              type="number"
              min={0}
              sufixo="cm"
              value={dados.largura}
              onChange={(e) => atualizar("largura", e.target.value)}
              onBlur={() => marcarTocado("largura")}
              erro={tocado.largura ? erros.largura : undefined}
            />
            <FormField
              id="altura"
              label="Altura"
              placeholder="0"
              type="number"
              min={0}
              sufixo="cm"
              value={dados.altura}
              onChange={(e) => atualizar("altura", e.target.value)}
              onBlur={() => marcarTocado("altura")}
              erro={tocado.altura ? erros.altura : undefined}
            />
            <FormField
              id="comprimento"
              label="Comprimento"
              placeholder="0"
              type="number"
              min={0}
              sufixo="cm"
              value={dados.comprimento}
              onChange={(e) => atualizar("comprimento", e.target.value)}
              onBlur={() => marcarTocado("comprimento")}
              erro={tocado.comprimento ? erros.comprimento : undefined}
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-paper-600">
            Cubagem estimada:{" "}
            {dados.largura && dados.altura && dados.comprimento
              ? (
                  (Number(dados.largura) *
                    Number(dados.altura) *
                    Number(dados.comprimento)) /
                  1_000_000
                ).toFixed(3)
              : "0.000"}{" "}
            m³
          </p>
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
            "Cadastrar encomenda"
          )}
        </button>
      </form>
    </div>
  );
}
