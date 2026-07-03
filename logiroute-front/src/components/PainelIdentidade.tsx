import { Route as RouteIcon } from "lucide-react";

interface Props {
  eyebrow: string;
  titulo: string;
  descricao: string;
}

export default function PainelIdentidade({ eyebrow, titulo, descricao }: Props) {
  return (
    <section className="relative hidden overflow-hidden bg-graphite-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#8992A3 1px, transparent 1px), linear-gradient(90deg, #8992A3 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="relative flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-md bg-manifest/15">
          <RouteIcon className="size-5 text-manifest" strokeWidth={2.2} />
        </div>
        <span className="font-display text-[15px] font-semibold text-paper-100">LogiRoute</span>
      </div>

      <div className="relative max-w-md">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-manifest">{eyebrow}</p>
        <h1 className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.1] text-paper-100">
          {titulo}
        </h1>
        <p className="mt-5 font-body text-[15px] leading-relaxed text-paper-600">{descricao}</p>
      </div>

      <div className="relative flex items-center gap-6 border-t border-graphite-700 pt-6 font-mono text-[11px] text-paper-600">
        <span>FROTA ATIVA · 24H</span>
        <span className="h-1 w-1 rounded-full bg-paper-600" />
        <span>REDE CG · JPA · REC</span>
      </div>
    </section>
  );
}
