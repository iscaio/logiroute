import { useEffect, useState } from "react";
import { Copy, Check, IdCard, Phone, Truck, SearchX } from "lucide-react";
import Modal from "./Modal";
import { SkeletonModal } from "./Skeleton";
import StatusTag from "./StatusTag";
import { buscarMotoristaPorId } from "../hooks/useMotoristas";
import type { Motorista } from "../types";

interface Props {
  id: string | null;
  onFechar: () => void;
}

export default function ModalMotorista({ id, onFechar }: Props) {
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!id) {
      setMotorista(null);
      setNaoEncontrado(false);
      return;
    }
    setCarregando(true);
    setNaoEncontrado(false);
    buscarMotoristaPorId(id)
      .then(setMotorista)
      .catch(() => setNaoEncontrado(true))
      .finally(() => setCarregando(false));
  }, [id]);

  function copiarId() {
    if (!motorista) return;
    navigator.clipboard.writeText(motorista.id);
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 1500);
  }

  return (
    <Modal aberto={!!id} onFechar={onFechar} titulo="Ficha do motorista" largura="max-w-lg">
      {carregando && <SkeletonModal />}

      {!carregando && naoEncontrado && (
        <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <SearchX className="size-8 text-paper-600" />
          <p className="font-body text-sm text-paper-600">
            Nenhum motorista encontrado com o ID <span className="font-mono text-paper-200">{id}</span>.
          </p>
        </div>
      )}

      {!carregando && motorista && (
        <div className="p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={copiarId}
              className="flex items-center gap-1.5 rounded-md bg-graphite-900/60 px-2.5 py-1.5 font-mono text-[11px] text-paper-600 transition-colors hover:text-paper-200"
            >
              {copiado ? <Check className="size-3.5 text-route-available" /> : <Copy className="size-3.5" />}
              {motorista.id}
            </button>
            <StatusTag status={motorista.status} />
          </div>

          <h3 className="mt-4 font-display text-lg font-semibold text-paper-100">
            {motorista.nomeMotorista}
          </h3>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[12px] text-paper-600">
            <span className="flex items-center gap-1.5">
              <IdCard className="size-3.5" /> {motorista.cpf}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="size-3.5" /> {motorista.telefone}
            </span>
          </div>

          <div className="waybill-edge my-5 h-px" />

          <div className="rounded-lg border border-graphite-700 bg-graphite-900/60 p-4">
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-paper-600">
              <Truck className="size-3.5" /> Veículo
            </p>
            <p className="mt-1.5 font-body text-sm text-paper-100">{motorista.modeloVeiculo}</p>
            <p className="mt-1 font-mono text-[11px] text-paper-600">
              Placa {motorista.placaVeiculo} · capacidade máx. {motorista.capacidadeMax}kg
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
