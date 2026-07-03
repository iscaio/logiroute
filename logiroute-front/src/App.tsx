import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RotaPrivada from "./routes/RotaPrivada";
import RotaPublica from "./routes/RotaPublica";
import AutenticadoLayout from "./layouts/AutenticadoLayout";
import NaoAutenticadoLayout from "./layouts/NaoAutenticadoLayout";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Encomendas from "./pages/Encomendas";
import CadastroMotorista from "./pages/CadastroMotorista";
import CadastroEncomenda from "./pages/CadastroEncomenda";
import ToastHost from "./components/ToastHost";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastHost />
        <Routes>
          <Route element={<RotaPublica />}>
            <Route element={<NaoAutenticadoLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Route>
          </Route>

          <Route element={<RotaPrivada />}>
            <Route element={<AutenticadoLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/encomendas" element={<Encomendas />} />
              <Route path="/motoristas/novo" element={<CadastroMotorista />} />
              <Route path="/encomendas/nova" element={<CadastroEncomenda />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
