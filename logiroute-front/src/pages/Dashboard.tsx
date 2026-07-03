import { useMemo, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useMotoristas } from "../hooks/useMotoristas";
import MotoristaCard from "../components/MotoristaCard";
import { SkeletonCard } from "../components/Skeleton";
import ModalAlocarEntrega from "../components/ModalAlocarEntrega";
import ModalMotorista from "../components/ModalMotorista";
import SearchBar from "../components/SearchBar";
import type { Motorista } from "../types";

export default function Dashboard() {
  const { motoristas, carregando, erro, recarregar } = useMotoristas();
  const [motoristaAlocar, setMotoristaAlocar] = useState<Motorista | null>(null);
  const [filtro, setFiltro] = useState("");
  const [idBuscado, setIdBuscado] = useState<string | null>(null);

  const motoristasFiltrados = useMemo(() => {
    const termo = filtro.trim().toLowerCase();
    if (!termo) return motoristas;
    return motoristas.filter(
      (m) =>
        m.nomeMotorista.toLowerCase().includes(termo) ||
        m.modeloVeiculo.toLowerCase().includes(termo) ||
        m.placaVeiculo.toLowerCase().includes(termo)
    );
  }, [motoristas, filtro]);

  const contagem = useMemo(
    () => ({
      disponivel: motoristas.filter((m) => m.status === "DISPONIVEL").length,
      emRota: motoristas.filter((m) => m.status === "EM_ROTA").length,
      inativo: motoristas.filter((m) => m.status === "INATIVO").length,
    }),
    [motoristas]
  );

  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-manifest">
            Frotas · Tempo real
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-semibold text-paper-100">
            Grid de frotas
          </h1>
        </div>
        <div className="flex gap-3 font-mono text-[11.5px] text-paper-600">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-route-available" /> {contagem.disponivel} disponíveis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-route-transit" /> {contagem.emRota} em rota
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-route-idle" /> {contagem.inativo} inativos
          </span>
        </div>
      </header>

      <SearchBar
        filtro={filtro}
        onFiltroChange={setFiltro}
        placeholderFiltro="Filtrar por nome, modelo ou placa…"
        onBuscarPorId={setIdBuscado}
        placeholderId="Buscar por ID (UUID)"
      />

      {erro && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-route-danger/30 bg-route-danger/[0.06] px-4 py-3">
          <p className="flex items-center gap-2 font-body text-sm text-paper-200">
            <AlertCircle className="size-4 text-route-danger" />
            {erro}
          </p>
          <button
            onClick={recarregar}
            className="flex items-center gap-1.5 font-mono text-[11px] text-manifest hover:underline"
          >
            <RefreshCw className="size-3.5" /> Tentar novamente
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {carregando &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {!carregando &&
          motoristasFiltrados.map((motorista) => (
            <MotoristaCard key={motorista.id} motorista={motorista} onAlocar={setMotoristaAlocar} />
          ))}
      </div>

      {!carregando && motoristasFiltrados.length === 0 && (
        <p className="py-16 text-center font-body text-sm text-paper-600">
          Nenhum motorista corresponde ao filtro "{filtro}".
        </p>
      )}

      <ModalAlocarEntrega
        motorista={motoristaAlocar}
        onFechar={() => setMotoristaAlocar(null)}
        onDespachoConcluido={recarregar}
      />
      <ModalMotorista id={idBuscado} onFechar={() => setIdBuscado(null)} />
    </div>
  );
}
