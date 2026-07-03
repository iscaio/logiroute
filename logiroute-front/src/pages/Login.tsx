import { useRef, useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, Loader2, ArrowRight, Route as RouteIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { NotificationService } from "../services/NotificationService";
import PainelIdentidade from "../components/PainelIdentidade";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@empresa\.com$/;
const SENHA_MIN = 6;

export default function Login() {
  const { login, carregando } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaTocada, setSenhaTocada] = useState(false);

  const emailValido = EMAIL_REGEX.test(email);
  const senhaValida = senha.length >= SENHA_MIN;
  const formValido = emailValido && senhaValida;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formValido || carregando) return;

    const { sucesso, erro } = await login(email, senha);
    if (sucesso) {
      navigate("/", { replace: true });
    } else {
      setSenha("");
      setSenhaTocada(false);
      emailRef.current?.focus();
      NotificationService.error(erro ?? "Falha na autenticação.");
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <PainelIdentidade
        eyebrow="Manifesto de Carga · CD-01"
        titulo="Cada rota conta uma entrega no prazo certo."
        descricao="Acompanhe frotas, cubagem e despachos em tempo real — sem planilha, sem adivinhação."
      />

      {/* Painel de acesso */}
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-md bg-manifest/15">
              <RouteIcon className="size-5 text-manifest" strokeWidth={2.2} />
            </div>
            <span className="font-display text-[15px] font-semibold text-paper-100">LogiRoute</span>
          </div>

          <h2 className="font-display text-2xl font-semibold text-paper-100">
            Acessar painel
          </h2>
          <p className="mt-1.5 font-body text-sm text-paper-600">
            Entre com sua credencial corporativa para gerenciar a operação.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-body text-[13px] font-medium text-paper-200">
                E-mail corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-paper-600" />
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="nome@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-graphite-600 bg-graphite-800 py-2.5 pl-10 pr-3 font-body text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-600/70 focus:border-manifest"
                />
              </div>
              {email.length > 0 && !emailValido && (
                <p className="mt-1.5 font-mono text-[11px] text-route-danger">
                  Use seu e-mail corporativo no formato nome@empresa.com
                </p>
              )}
            </div>

            <div>
              <label htmlFor="senha" className="mb-1.5 block font-body text-[13px] font-medium text-paper-200">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-paper-600" />
                <input
                  id="senha"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Mínimo de 6 caracteres"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setSenhaTocada(true);
                  }}
                  className="w-full rounded-md border border-graphite-600 bg-graphite-800 py-2.5 pl-10 pr-3 font-body text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-600/70 focus:border-manifest"
                />
              </div>
              {senhaTocada && !senhaValida && (
                <p className="mt-1.5 font-mono text-[11px] text-route-danger">
                  A senha deve ter ao menos {SENHA_MIN} caracteres.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!formValido || carregando}
              className={`mt-2 flex items-center justify-center gap-2 rounded-md py-2.5 font-body text-sm font-medium transition-all ${
                formValido && !carregando
                  ? "cursor-pointer bg-manifest text-graphite-950 hover:bg-manifest-dark"
                  : "cursor-not-allowed bg-graphite-700 text-paper-600 opacity-60"
              }`}
            >
              {carregando ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Entrando…
                </>
              ) : (
                <>
                  Entrar no painel <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 font-mono text-[11px] text-paper-600">
            Demonstração: operador@empresa.com · senha 123456
          </p>

          <p className="mt-4 font-body text-[13px] text-paper-600">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" className="font-medium text-manifest hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
