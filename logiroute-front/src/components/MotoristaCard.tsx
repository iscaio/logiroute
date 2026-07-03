import { IdCard, Truck } from "lucide-react";
import type { Motorista } from "../types";
import StatusTag from "./StatusTag";

const BORDA_STATUS: Record<Motorista["status"], string> = {
  DISPONIVEL: "border-route-available/35 hover:border-route-available/60",
  EM_ROTA: "border-route-transit/35 hover:border-route-transit/60",
  INATIVO: "border-graphite-700",
};

interface Props {
  motorista: Motorista;
  onAlocar: (motorista: Motorista) => void;
}

export default function MotoristaCard({ motorista, onAlocar }: Props) {
  const inativo = motorista.status === "INATIVO";

  return (
    <div
      className={`group relative rounded-lg border bg-graphite-800 p-5 transition-colors ${
        BORDA_STATUS[motorista.status]
      } ${inativo ? "opacity-60 grayscale" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-[15px] font-semibold text-paper-100">
            {motorista.nomeMotorista}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 truncate font-body text-[12.5px] text-paper-600">
            <Truck className="size-3.5 shrink-0" />
            {motorista.modeloVeiculo}
          </p>
        </div>
        <StatusTag status={motorista.status} />
      </div>

      <div className="waybill-edge my-4 h-px" />

      <div className="mb-4 flex items-center justify-between font-mono text-[11px] text-paper-600">
        <span className="flex items-center gap-1.5">
          <IdCard className="size-3.5" />
          {motorista.placaVeiculo}
        </span>
        <span>{motorista.capacidadeMax}kg máx.</span>
      </div>

      {motorista.status === "DISPONIVEL" && (
        <button
          onClick={() => onAlocar(motorista)}
          className="w-full rounded-md bg-manifest py-2.5 font-body text-[13px] font-medium text-graphite-950 transition-colors hover:bg-manifest-dark"
        >
          Alocar entrega
        </button>
      )}

      {motorista.status === "EM_ROTA" && (
        <div className="w-full rounded-md border border-graphite-600 py-2.5 text-center font-body text-[13px] text-paper-600">
          Em rota de entrega
        </div>
      )}
    </div>
  );
}
