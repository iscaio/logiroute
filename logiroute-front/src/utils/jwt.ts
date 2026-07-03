export function decodificarJWT<T = Record<string, unknown>>(
  token: string,
): T | null {
  try {
    const payload = token.split(".")[1];
    const normalizado = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodificado = atob(normalizado);
    return JSON.parse(decodificado) as T;
  } catch {
    return null;
  }
}
