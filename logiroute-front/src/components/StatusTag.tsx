import type { StatusMotorista } from "../types";

const CONFIG: Record<StatusMotorista, { label: string; classes: string }> = {
  DISPONIVEL: { label: "Disponível", classes: "bg-route-available/12 text-route-available" },
  EM_ROTA: { label: "Em rota", classes: "bg-route-transit/12 text-route-transit" },
  INATIVO: { label: "Inativo", classes: "bg-route-idle/15 text-paper-600" },
};

export default function StatusTag({ status }: { status: StatusMotorista }) {
  const { label, classes } = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide ${classes}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
