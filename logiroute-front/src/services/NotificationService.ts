export type ToastTipo = "error" | "warning" | "success" | "info";

export interface ToastPayload {
  id: string;
  tipo: ToastTipo;
  mensagem: string;
}

type Listener = (toast: ToastPayload) => void;

let listener: Listener | null = null;

function emitir(tipo: ToastTipo, mensagem: string) {
  const toast: ToastPayload = { id: crypto.randomUUID(), tipo, mensagem };
  if (listener) listener(toast);
  else console.warn(`[Toast:${tipo}]`, mensagem);
}

export const NotificationService = {
  registrarListener(fn: Listener) {
    listener = fn;
  },
  removerListener() {
    listener = null;
  },
  error(mensagem: string) {
    emitir("error", mensagem);
  },
  warning(mensagem: string) {
    emitir("warning", mensagem);
  },
  success(mensagem: string) {
    emitir("success", mensagem);
  },
  info(mensagem: string) {
    emitir("info", mensagem);
  },
};
