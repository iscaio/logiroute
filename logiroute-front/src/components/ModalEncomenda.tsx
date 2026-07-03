import { useEffect, useState } from "react";
import { Copy, Check, Weight, Box, SearchX, MapPin } from "lucide-react";
import Modal from "./Modal";
import { SkeletonModal } from "./Skeleton";
import { buscarEncomendaPorId } from "../hooks/useEncomendas";
import type { Encomenda } from "../types";

const STATUS_LABEL: Record<Encomenda["status"], string> = {
  AGUARDANDO_COLETA: "Aguardando coleta",
  EM_TRANSITO: "Em transporte",
  ENTREGUE: "Entregue",
};

export default function ModalEncomenda({ id, onFechar }: { id: string | null; onFechar: () => void }) {
  const [encomenda, setEncomenda] = useState<Encomenda | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [naoEncontrada, setNaoEncontrada] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!id) {
      setEncomenda(null);
      setNaoEncontrada(false);
      return;
    }
    setCarregando(true);
    setNaoEncontrada(false);
    buscarEncomendaPorId(id)
      .then(setEncomenda)
      .catch(() => setNaoEncontrada(true))
      .finally(() => setCarregando(false));
  }, [id]);

  function copiarId() {
    if (!encomenda) return;
    navigator.clipboard.writeText(encomenda.id);
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 1500);
  }

  const cubagem = encomenda
    ? ((encomenda.largura * encomenda.altura * encomenda.comprimento) / 1_000_000).toFixed(3)
    : null;

  return (
    <Modal aberto={!!id} onFechar={onFechar} titulo="Ficha da encomenda" largura="max-w-lg">
      {carregando && <SkeletonModal />}

      {!carregando && naoEncontrada && (
        <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <SearchX className="size-8 text-paper-600" />
          <p className="font-body text-sm text-paper-600">
            Nenhuma encomenda encontrada com o ID <span className="font-mono text-paper-200">{id}</span>.
          </p>
        </div>
      )}

      {!carregando && encomenda && (
        <div className="p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={copiarId}
              className="flex items-center gap-1.5 rounded-md bg-graphite-900/60 px-2.5 py-1.5 font-mono text-[11px] text-paper-600 transition-colors hover:text-paper-200"
            >
              {copiado ? <Check className="size-3.5 text-route-available" /> : <Copy className="size-3.5" />}
              {encomenda.id}
            </button>
            <span className="rounded-full bg-manifest/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-manifest">
              {STATUS_LABEL[encomenda.status]}
            </span>
          </div>

          <h3 className="mt-4 font-display text-lg font-semibold text-paper-100">
            {encomenda.nomeCliente}
          </h3>
          <p className="mt-1 flex items-start gap-1.5 font-body text-[13px] text-paper-600">
            <MapPin className="mt-0.5 size-3.5 shrink-0" />
            {encomenda.destinoDoPacote}
          </p>

          <div className="waybill-edge my-5 h-px" />

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-graphite-700 bg-graphite-900/60 p-4">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-paper-600">
                <Weight className="size-3.5" /> Peso bruto
              </p>
              <p className="mt-1.5 font-display text-xl font-semibold text-paper-100">
                {encomenda.pesoPacote} <span className="text-sm font-body text-paper-600">kg</span>
              </p>
            </div>
            <div className="rounded-lg border border-graphite-700 bg-graphite-900/60 p-4">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-paper-600">
                <Box className="size-3.5" /> Cubagem
              </p>
              <p className="mt-1.5 font-display text-xl font-semibold text-paper-100">
                {cubagem} <span className="text-sm font-body text-paper-600">m³</span>
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg border border-graphite-700 bg-graphite-900/60 px-4 py-3 font-mono text-[12px] text-paper-600">
            <span>L {encomenda.largura}cm</span>
            <span className="text-graphite-600">×</span>
            <span>A {encomenda.altura}cm</span>
            <span className="text-graphite-600">×</span>
            <span>C {encomenda.comprimento}cm</span>
          </div>
        </div>
      )}
    </Modal>
  );
}
