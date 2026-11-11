import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '../components/layout/Logo.jsx';
import RoleToggle from '../components/auth/RoleToggle.jsx';
import PasswordInput from '../components/auth/PasswordInput.jsx';
import Button from '../components/ui/Button.jsx';
import TextInput from '../components/ui/TextInput.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { DEMO_LOGINS } from '../mocks/seed.js';
import { HOME } from '../utils/routes.js';
import logoMarkUrl from '../assets/logo-mark.svg';

const LABEL = 'mb-2 block text-[15px] text-ink-soft';

/** Login: escolhe o perfil (Médico / Operadora) e entra com e-mail e senha. */
export default function LoginPage() {
  const { session, login } = useAuth();
  const navigate = useNavigate();
  const notify = useToast();

  // Os campos já vêm preenchidos com os dados fictícios da demo (ver DEMO_LOGINS em mocks/seed.js).
  const [perfil, setPerfil] = useState('medico');
  const [email, setEmail] = useState(DEMO_LOGINS.medico.email);
  const [senha, setSenha] = useState(DEMO_LOGINS.medico.senha);
  const [lembrar, setLembrar] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to={HOME[session.perfil]} replace />;

  // Ao trocar de perfil, os exemplos acompanham, a menos que a pessoa já tenha editado os campos.
  const changePerfil = (next) => {
    const current = DEMO_LOGINS[perfil];
    if (email === current.email && senha === current.senha) {
      setEmail(DEMO_LOGINS[next].email);
      setSenha(DEMO_LOGINS[next].senha);
    }
    setPerfil(next);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !senha) {
      setError('Informe seu e-mail e sua senha.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const next = await login({ email, senha, perfil });
      navigate(HOME[next.perfil], { replace: true });
    } catch (err) {
      setError(err.message || 'Não foi possível entrar.');
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 py-10">
      {/* Marca d'água da logo, no canto inferior esquerdo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -left-6 h-[150px] w-[170px] bg-[#cdeef5] opacity-80 sm:bottom-[10%] sm:left-[8%] sm:h-[200px] sm:w-[220px]"
        style={{
          WebkitMask: `url("${logoMarkUrl}") center / contain no-repeat`,
          mask: `url("${logoMarkUrl}") center / contain no-repeat`,
        }}
      />

      <main className="relative w-full max-w-[372px]">
        <Logo className="mx-auto h-12 w-auto sm:h-14" />

        <form onSubmit={submit} noValidate className="mt-12 sm:mt-16">
          <RoleToggle value={perfil} onChange={changePerfil} />

          <div className="mt-8">
            <label htmlFor="login-email" className={LABEL}>
              Email
            </label>
            <TextInput
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[46px]! rounded-lg! border-slate-200! px-4! text-[15px]! placeholder:not-italic!"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="login-senha" className={LABEL}>
              Senha
            </label>
            <PasswordInput
              id="login-senha"
              autoComplete="current-password"
              placeholder="Entre com sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="h-[46px]! rounded-lg! border-slate-200! px-4! text-[15px]! placeholder:not-italic!"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-ink">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="h-4 w-4 rounded accent-lastro-navy"
              />
              Lembrar
            </label>
            <button
              type="button"
              onClick={() => notify('Função indisponível no momento.')}
              className="text-red-500 transition hover:text-red-600 hover:underline"
            >
              Esqueci a senha
            </button>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" disabled={loading} className="mt-6 w-full rounded-lg! font-bold!">
            {loading ? 'Entrando…' : 'Login'}
          </Button>
        </form>
      </main>
    </div>
  );
}
