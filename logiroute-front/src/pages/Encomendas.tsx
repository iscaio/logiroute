import { useMemo, useState } from "react";
import { AlertCircle, Box, ChevronRight, RefreshCw } from "lucide-react";
import { useEncomendas } from "../hooks/useEncomendas";
import { SkeletonLinha } from "../components/Skeleton";
import ModalEncomenda from "../components/ModalEncomenda";
import SearchBar from "../components/SearchBar";
import type { StatusEncomenda } from "../types";

const STATUS_LABEL: Record<StatusEncomenda, { label: string; classes: string }> = {
  AGUARDANDO_COLETA: { label: "Aguardando coleta", classes: "bg-route-transit/12 text-route-transit" },
  EM_TRANSITO: { label: "Em transporte", classes: "bg-manifest/12 text-manifest" },
  ENTREGUE: { label: "Entregue", classes: "bg-route-available/12 text-route-available" },
};

export default function Encomendas() {
  const { encomendas, carregando, erro, recarregar } = useEncomendas();
  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);
  const [filtro, setFiltro] = useState("");

  const encomendasFiltradas = useMemo(() => {
    const termo = filtro.trim().toLowerCase();
    if (!termo) return encomendas;
    return encomendas.filter(
      (e) =>
        e.nomeCliente.toLowerCase().includes(termo) ||
        e.destinoDoPacote.toLowerCase().includes(termo)
    );
  }, [encomendas, filtro]);

  return (
    <div className="mx-auto max-w-3xl px-8 py-8">
      <header className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-manifest">
          Triagem de carga
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-semibold text-paper-100">
          Encomendas
        </h1>
        <p className="mt-1.5 font-body text-sm text-paper-600">
          Selecione um pacote para consultar peso, cubagem e status de coleta.
        </p>
      </header>

      <SearchBar
        filtro={filtro}
        onFiltroChange={setFiltro}
        placeholderFiltro="Filtrar por cliente ou destino…"
        onBuscarPorId={setIdSelecionado}
        placeholderId="Buscar por ID (UUID)"
      />

      {erro && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-route-danger/30 bg-route-danger/[0.06] px-4 py-3">
          <p className="flex items-center gap-2 font-body text-sm text-paper-200">
            <AlertCircle className="size-4 text-route-danger" />
            {erro}
          </p>
          <button
            onClick={recarregar}
            className="flex items-center gap-1.5 font-mono text-[11px] text-manifest hover:underline"
          >
            <RefreshCw className="size-3.5" /> Tentar novamente
          </button>
        </div>
      )}

      <div className="space-y-2.5">
        {carregando &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonLinha key={i} />)}

        {!carregando &&
          encomendasFiltradas.map((encomenda) => {
            const status = STATUS_LABEL[encomenda.status];
            return (
              <button
                key={encomenda.id}
                onClick={() => setIdSelecionado(encomenda.id)}
                className="flex w-full items-center gap-4 rounded-lg border border-graphite-700 bg-graphite-800 px-4 py-3.5 text-left transition-colors hover:border-manifest/40"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-manifest/10">
                  <Box className="size-4.5 text-manifest" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body text-[13.5px] font-medium text-paper-100">
                    {encomenda.nomeCliente}
                  </p>
                  <p className="truncate font-mono text-[11px] text-paper-600">
                    {encomenda.destinoDoPacote} · {encomenda.pesoPacote}kg
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${status.classes}`}>
                  {status.label}
                </span>
                <ChevronRight className="size-4 shrink-0 text-paper-600" />
              </button>
            );
          })}
      </div>

      {!carregando && encomendasFiltradas.length === 0 && (
        <p className="py-16 text-center font-body text-sm text-paper-600">
          Nenhuma encomenda corresponde ao filtro "{filtro}".
        </p>
      )}

      <ModalEncomenda id={idSelecionado} onFechar={() => setIdSelecionado(null)} />
    </div>
  );
}
