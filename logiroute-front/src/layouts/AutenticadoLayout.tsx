import { NavLink, Outlet } from "react-router-dom";
import { Truck, Package, LogOut, Route as RouteIcon, UserPlus, PackagePlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Frotas", icon: Truck, end: true },
  { to: "/encomendas", label: "Cargas", icon: Package, end: false },
];

const NAV_CADASTROS = [
  { to: "/motoristas/novo", label: "Novo motorista", icon: UserPlus, end: true },
  { to: "/encomendas/nova", label: "Nova encomenda", icon: PackagePlus, end: true },
];

export default function AutenticadoLayout() {
  const { usuario, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-graphite-900">
      <aside className="flex w-[248px] shrink-0 flex-col border-r border-graphite-700 bg-graphite-800/60">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <div className="flex size-9 items-center justify-center rounded-md bg-manifest/15">
            <RouteIcon className="size-5 text-manifest" strokeWidth={2.2} />
          </div>
          <div>
            <p className="font-display text-[15px] font-semibold leading-none text-paper-100">
              LogiRoute
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper-600">
              Painel de Frotas
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 font-body text-sm transition-colors ${
                  isActive
                    ? "bg-manifest/10 text-manifest"
                    : "text-paper-600 hover:bg-graphite-700/60 hover:text-paper-200"
                }`
              }
            >
              <Icon className="size-4.5" strokeWidth={2} />
              {label}
            </NavLink>
          ))}

          <p className="mb-1 mt-5 px-3 font-mono text-[10px] uppercase tracking-widest text-paper-600">
            Cadastros
          </p>
          {NAV_CADASTROS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 font-body text-sm transition-colors ${
                  isActive
                    ? "bg-manifest/10 text-manifest"
                    : "text-paper-600 hover:bg-graphite-700/60 hover:text-paper-200"
                }`
              }
            >
              <Icon className="size-4.5" strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-graphite-700 px-4 py-4">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-full bg-graphite-700 font-display text-xs font-semibold text-paper-200">
              {usuario?.nome?.charAt(0) ?? "?"}
            </div>
            <div className="min-w-0">
              <p className="truncate font-body text-[13px] font-medium text-paper-200">
                {usuario?.nome}
              </p>
              <p className="truncate font-mono text-[10px] text-paper-600">{usuario?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 font-body text-[13px] text-paper-600 transition-colors hover:bg-route-danger/10 hover:text-route-danger"
          >
            <LogOut className="size-4" strokeWidth={2} />
            Encerrar sessão
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
