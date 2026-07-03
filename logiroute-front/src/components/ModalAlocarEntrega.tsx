import { useEffect, useState } from "react";
import { Box, Loader2, Weight } from "lucide-react";
import Modal from "./Modal";
import { SkeletonLinha } from "./Skeleton";
import { useEncomendas, iniciarDespacho } from "../hooks/useEncomendas";
import { validarDespachoLogistico } from "../hooks/useValidadorDespacho";
import { NotificationService } from "../services/NotificationService";
import type { Encomenda, Motorista } from "../types";

interface Props {
  motorista: Motorista | null;
  onFechar: () => void;
  onDespachoConcluido: () => void;
}

export default function ModalAlocarEntrega({ motorista, onFechar, onDespachoConcluido }: Props) {
  const { encomendas, carregando, recarregar } = useEncomendas();
  const [despachandoId, setDespachandoId] = useState<string | null>(null);

  useEffect(() => {
    if (motorista) recarregar();
  }, [motorista, recarregar]);

  const pendentes = encomendas.filter((e) => e.status === "AGUARDANDO_COLETA");

  async function handleDespachar(encomenda: Encomenda) {
    if (!motorista) return;

    // Gatekeeper client-side: bloqueia requisições com dados operacionalmente inválidos
    const autorizado = validarDespachoLogistico(encomenda, motorista);
    if (!autorizado) return;

    setDespachandoId(encomenda.id);
    try {
      await iniciarDespacho(motorista.id, encomenda.id);
      NotificationService.success(
        `Despacho confirmado: ${motorista.nomeMotorista} está a caminho de ${encomenda.destinoDoPacote}.`
      );
      onDespachoConcluido();
      onFechar();
    } catch (err: any) {
      const mensagem = err?.response?.data?.erro ?? "Não foi possível concluir o despacho. Tente novamente.";
      NotificationService.error(mensagem);
    } finally {
      setDespachandoId(null);
    }
  }

  return (
    <Modal
      aberto={!!motorista}
      onFechar={onFechar}
      titulo="Alocar entrega"
      subtitulo={motorista ? `${motorista.nomeMotorista} · ${motorista.modeloVeiculo}` : undefined}
      largura="max-w-lg"
    >
      <div className="max-h-[60vh] space-y-2.5 overflow-y-auto scrollbar-thin p-6">
        {carregando &&
          Array.from({ length: 3 }).map((_, i) => <SkeletonLinha key={i} />)}

        {!carregando && pendentes.length === 0 && (
          <p className="py-8 text-center font-body text-sm text-paper-600">
            Nenhuma encomenda aguardando coleta no momento.
          </p>
        )}

        {!carregando &&
          pendentes.map((encomenda) => (
            <div
              key={encomenda.id}
              className="flex items-center gap-4 rounded-lg border border-graphite-700 bg-graphite-900/60 px-4 py-3.5"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-manifest/10">
                <Box className="size-4.5 text-manifest" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-[13.5px] font-medium text-paper-100">
                  {encomenda.nomeCliente}
                </p>
                <p className="truncate font-mono text-[11px] text-paper-600">
                  {encomenda.destinoDoPacote}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-paper-600">
                <Weight className="size-3.5" />
                {encomenda.pesoPacote}kg
              </div>
              <button
                onClick={() => handleDespachar(encomenda)}
                disabled={despachandoId !== null}
                className="flex shrink-0 items-center gap-1.5 rounded-md bg-manifest px-3 py-2 font-body text-[12.5px] font-medium text-graphite-950 transition-colors hover:bg-manifest-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {despachandoId === encomenda.id ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  "Despachar"
                )}
              </button>
            </div>
          ))}
      </div>
    </Modal>
  );
}
