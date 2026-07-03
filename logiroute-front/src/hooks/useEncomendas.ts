import { useCallback, useEffect, useState } from "react";
import { apiLogistica as api } from "../services/api";
import type { DespachoResponse, Encomenda, NovaEncomendaInput } from "../types";

export function useEncomendas() {
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const { data } = await api.get<Encomenda[]>("/api/encomendas");
      setEncomendas(data);
    } catch {
      setErro("Não foi possível carregar a triagem de cargas.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { encomendas, carregando, erro, recarregar };
}

export async function buscarEncomendaPorId(id: string) {
  const { data } = await api.get<Encomenda>(`/api/encomenda/${id}`);
  return data;
}

export async function criarEncomenda(payload: NovaEncomendaInput) {
  const { data } = await api.post<{ mensagem: string; dados: Encomenda }>(
    "/api/cadastroEncomendas",
    payload,
  );
  return data.dados;
}

export async function iniciarDespacho(
  motoristaId: string,
  idEncomenda: string,
) {
  const { data } = await api.post<DespachoResponse>("/api/encomendas/iniciar", {
    motoristaId,
    encomendaId: idEncomenda, //(outra forma de fazer)
  });
  return data;
}
