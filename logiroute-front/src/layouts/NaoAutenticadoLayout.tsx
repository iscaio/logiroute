import { Outlet } from "react-router-dom";

export default function NaoAutenticadoLayout() {
  return (
    <div className="min-h-screen bg-graphite-900">
      <Outlet />
    </div>
  );
}
