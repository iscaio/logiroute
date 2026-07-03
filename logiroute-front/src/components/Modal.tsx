import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
  aberto: boolean;
  onFechar: () => void;
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
  largura?: string;
}

export default function Modal({ aberto, onFechar, titulo, subtitulo, children, largura = "max-w-md" }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar();
    }
    if (aberto) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-graphite-950/70 backdrop-blur-sm"
        onClick={onFechar}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${largura} max-h-[85vh] overflow-y-auto scrollbar-thin rounded-xl border border-graphite-600 bg-graphite-800 shadow-2xl animate-toast-in`}
      >
        <div className="flex items-start justify-between border-b border-graphite-700 px-6 py-5">
          <div>
            <h2 className="font-display text-lg font-semibold text-paper-100">{titulo}</h2>
            {subtitulo && <p className="mt-0.5 font-mono text-[11px] text-paper-600">{subtitulo}</p>}
          </div>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="rounded-md p-1.5 text-paper-600 transition-colors hover:bg-graphite-700 hover:text-paper-200"
          >
            <X className="size-4.5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
