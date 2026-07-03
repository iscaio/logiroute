import { useState, type FormEvent } from "react";
import { Search, Hash } from "lucide-react";

interface Props {
  filtro: string;
  onFiltroChange: (valor: string) => void;
  placeholderFiltro: string;
  onBuscarPorId: (id: string) => void;
  placeholderId: string;
}

export default function SearchBar({
  filtro,
  onFiltroChange,
  placeholderFiltro,
  onBuscarPorId,
  placeholderId,
}: Props) {
  const [idBusca, setIdBusca] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const valor = idBusca.trim();
    if (valor) onBuscarPorId(valor);
  }

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-paper-600" />
        <input
          type="text"
          value={filtro}
          onChange={(e) => onFiltroChange(e.target.value)}
          placeholder={placeholderFiltro}
          className="w-full rounded-md border border-graphite-600 bg-graphite-800 py-2.5 pl-10 pr-3 font-body text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-600/70 focus:border-manifest"
        />
      </div>

      <form onSubmit={handleSubmit} className="relative sm:w-72">
        <Hash className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-paper-600" />
        <input
          type="text"
          value={idBusca}
          onChange={(e) => setIdBusca(e.target.value)}
          placeholder={placeholderId}
          className="w-full rounded-md border border-graphite-600 bg-graphite-800 py-2.5 pl-10 pr-20 font-mono text-[13px] text-paper-100 outline-none transition-colors placeholder:font-body placeholder:text-paper-600/70 focus:border-manifest"
        />
        <button
          type="submit"
          disabled={!idBusca.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded px-2.5 py-1.5 font-body text-[12px] font-medium text-manifest transition-colors hover:bg-manifest/10 disabled:cursor-not-allowed disabled:text-paper-600"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
