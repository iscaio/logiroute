import { useEffect, useState, type ReactElement } from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import { NotificationService, type ToastPayload } from "../services/NotificationService";

const ESTILOS: Record<ToastPayload["tipo"], { border: string; bg: string; icon: ReactElement }> = {
  error: {
    border: "border-route-danger/40",
    bg: "bg-route-danger/10",
    icon: <XCircle className="size-5 text-route-danger shrink-0" />,
  },
  warning: {
    border: "border-route-transit/40",
    bg: "bg-route-transit/10",
    icon: <AlertTriangle className="size-5 text-route-transit shrink-0" />,
  },
  success: {
    border: "border-route-available/40",
    bg: "bg-route-available/10",
    icon: <CheckCircle2 className="size-5 text-route-available shrink-0" />,
  },
  info: {
    border: "border-manifest/40",
    bg: "bg-manifest/10",
    icon: <Info className="size-5 text-manifest shrink-0" />,
  },
};

export default function ToastHost() {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  useEffect(() => {
    NotificationService.registrarListener((toast) => {
      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000);
    });
    return () => NotificationService.removerListener();
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] flex w-[min(92vw,380px)] flex-col gap-2">
      {toasts.map((toast) => {
        const estilo = ESTILOS[toast.tipo];
        return (
          <div
            key={toast.id}
            role="alert"
            className={`animate-toast-in flex items-start gap-3 rounded-lg border ${estilo.border} ${estilo.bg} bg-graphite-800/95 px-4 py-3 shadow-xl backdrop-blur`}
          >
            {estilo.icon}
            <p className="flex-1 font-body text-sm leading-snug text-paper-200">{toast.mensagem}</p>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-paper-600 hover:text-paper-200 transition-colors"
              aria-label="Fechar notificação"
            >
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
