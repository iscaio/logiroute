import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RotaPublica() {
  const { autenticado } = useAuth();
  if (autenticado) return <Navigate to="/" replace />;
  return <Outlet />;
}
