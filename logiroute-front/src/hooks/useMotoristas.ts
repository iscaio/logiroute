import { useCallback, useEffect, useState } from "react";
import { apiLogistica as api } from "../services/api";
import type { Motorista, NovoMotoristaInput } from "../types";

const ROTA_LISTAR_TODOS = "/api/motoristas/todos";

export function useMotoristas() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const { data } = await api.get<Motorista[]>(ROTA_LISTAR_TODOS);
      setMotoristas(data);
    } catch {
      setErro("Não foi possível carregar a frota. Verifique sua conexão.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { motoristas, carregando, erro, recarregar };
}

export async function buscarMotoristaPorId(id: string) {
  const { data } = await api.get<Motorista>(`/api/motorista/${id}`);
  return data;
}

export async function criarMotorista(payload: NovoMotoristaInput) {
  const { data } = await api.post<{ mensagem: string; dados: Motorista }>(
    "/api/cadastroMotorista",
    payload,
  );
  return data.dados;
}
