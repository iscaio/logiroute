import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { apiAuth } from "../services/api";
import { decodificarJWT } from "../utils/jwt";
import type { Usuario } from "../types";

interface AuthContextValue {
  usuario: Usuario | null;
  autenticado: boolean;
  carregando: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ sucesso: boolean; erro?: string }>;
  cadastrar: (
    nome: string,
    email: string,
    password: string,
  ) => Promise<{ sucesso: boolean; erro?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "@LogiRoute:token";
const USER_KEY = "@LogiRoute:usuario";

interface TokenPayload {
  id: string;
  nome: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  });
  const [carregando, setCarregando] = useState(false);

  function salvarSessao(token: string, email: string) {
    const payload = decodificarJWT<TokenPayload>(token);
    const usuarioLogado: Usuario = {
      id: payload?.id ?? "",
      nome: payload?.nome ?? email,
      email,
    };
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioLogado));
    setUsuario(usuarioLogado);
  }

  const login = useCallback(async (email: string, password: string) => {
    setCarregando(true);
    try {
      const { data } = await apiAuth.post("/api/auth/login", {
        email,
        password,
      });
      salvarSessao(data.token, email);
      return { sucesso: true };
    } catch (err: any) {
      const status = err?.response?.status;
      const mensagemBack = err?.response?.data?.message;
      const erro =
        status === 404
          ? "Usuário não encontrado."
          : status === 401
            ? "Senha inválida. Tente novamente."
            : (mensagemBack ??
              "Não foi possível conectar ao servidor. Tente novamente em instantes.");
      return { sucesso: false, erro };
    } finally {
      setCarregando(false);
    }
  }, []);

  const cadastrar = useCallback(
    async (nome: string, email: string, password: string) => {
      setCarregando(true);
      try {
        await apiAuth.post("/api/auth/cadastro", { nome, email, password });
        const { data } = await apiAuth.post("/api/auth/login", {
          email,
          password,
        });
        salvarSessao(data.token, email);
        return { sucesso: true };
      } catch (err: any) {
        const status = err?.response?.status;
        const mensagemBack = err?.response?.data?.message;
        const erro =
          status === 409 || mensagemBack?.toLowerCase().includes("único")
            ? "Já existe uma conta cadastrada com este e-mail."
            : (mensagemBack ??
              "Não foi possível criar a conta. Tente novamente em instantes.");
        return { sucesso: false, erro };
      } finally {
        setCarregando(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado: !!usuario,
        carregando,
        login,
        cadastrar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  return ctx;
}
