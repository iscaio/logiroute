import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, Loader2, ArrowRight, User, Route as RouteIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { NotificationService } from "../services/NotificationService";
import PainelIdentidade from "../components/PainelIdentidade";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@empresa\.com$/;
const SENHA_MIN = 6;

export default function Cadastro() {
  const { cadastrar, carregando } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tocado, setTocado] = useState<Record<string, boolean>>({});

  const nomeValido = nome.trim().length >= 3;
  const emailValido = EMAIL_REGEX.test(email);
  const senhaValida = senha.length >= SENHA_MIN;
  const senhasConferem = confirmarSenha.length > 0 && confirmarSenha === senha;
  const formValido = nomeValido && emailValido && senhaValida && senhasConferem;

  function marcarTocado(campo: string) {
    setTocado((prev) => ({ ...prev, [campo]: true }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTocado({ nome: true, email: true, senha: true, confirmarSenha: true });
    if (!formValido || carregando) return;

    const { sucesso, erro } = await cadastrar(nome.trim(), email, senha);
    if (sucesso) {
      NotificationService.success(`Conta criada com sucesso. Bem-vindo(a), ${nome.trim()}!`);
      navigate("/", { replace: true });
    } else {
      NotificationService.error(erro ?? "Falha ao criar a conta.");
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <PainelIdentidade
        eyebrow="Cadastro de Operador"
        titulo="Toda operação começa com um acesso."
        descricao="Crie sua conta corporativa e comece a gerenciar frotas, cargas e despachos em minutos."
      />

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-md bg-manifest/15">
              <RouteIcon className="size-5 text-manifest" strokeWidth={2.2} />
            </div>
            <span className="font-display text-[15px] font-semibold text-paper-100">LogiRoute</span>
          </div>

          <h2 className="font-display text-2xl font-semibold text-paper-100">Criar conta</h2>
          <p className="mt-1.5 font-body text-sm text-paper-600">
            Cadastre-se com sua credencial corporativa para acessar o painel.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="nome" className="mb-1.5 block font-body text-[13px] font-medium text-paper-200">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-paper-600" />
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={() => marcarTocado("nome")}
                  className="w-full rounded-md border border-graphite-600 bg-graphite-800 py-2.5 pl-10 pr-3 font-body text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-600/70 focus:border-manifest"
                />
              </div>
              {tocado.nome && !nomeValido && (
                <p className="mt-1.5 font-mono text-[11px] text-route-danger">
                  Informe seu nome completo.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-body text-[13px] font-medium text-paper-200">
                E-mail corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-paper-600" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="nome@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => marcarTocado("email")}
                  className="w-full rounded-md border border-graphite-600 bg-graphite-800 py-2.5 pl-10 pr-3 font-body text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-600/70 focus:border-manifest"
                />
              </div>
              {tocado.email && !emailValido && (
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
                  autoComplete="new-password"
                  placeholder="Mínimo de 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  onBlur={() => marcarTocado("senha")}
                  className="w-full rounded-md border border-graphite-600 bg-graphite-800 py-2.5 pl-10 pr-3 font-body text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-600/70 focus:border-manifest"
                />
              </div>
              {tocado.senha && !senhaValida && (
                <p className="mt-1.5 font-mono text-[11px] text-route-danger">
                  A senha deve ter ao menos {SENHA_MIN} caracteres.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="mb-1.5 block font-body text-[13px] font-medium text-paper-200">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-paper-600" />
                <input
                  id="confirmarSenha"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repita a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  onBlur={() => marcarTocado("confirmarSenha")}
                  className="w-full rounded-md border border-graphite-600 bg-graphite-800 py-2.5 pl-10 pr-3 font-body text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-600/70 focus:border-manifest"
                />
              </div>
              {tocado.confirmarSenha && !senhasConferem && (
                <p className="mt-1.5 font-mono text-[11px] text-route-danger">
                  As senhas não coincidem.
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
                  <Loader2 className="size-4 animate-spin" /> Criando conta…
                </>
              ) : (
                <>
                  Criar conta <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 font-body text-[13px] text-paper-600">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-manifest hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
