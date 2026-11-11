import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { api } from '../mocks/api.js';

const SESSION_KEY = 'lastro-labs-demo:session';
const LEGACY_KEYS = ['lastro-labs-demo:remembered']; // guardados por versões anteriores
const AuthContext = createContext(null);

// A sessão vale só enquanto a aba está aberta (sessionStorage): ao reabrir a plataforma, a pessoa
// cai na tela de login, que já vem preenchida com os dados fictícios da demo.
function readSession() {
  try {
    localStorage.removeItem(SESSION_KEY); // sessões salvas por versões anteriores não entram mais direto
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; /* armazenamento indisponível */
  }
}

function writeSession(session) {
  try {
    if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* sem persistência: a sessão vale só até recarregar */
  }
}

/**
 * Sessão do usuário logado (perfil "medico" ou "operadora").
 * `splash` fica verdadeiro ao entrar na plataforma para mostrar a abertura animada.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);
  const [splash, setSplash] = useState(() => readSession() !== null);

  const login = useCallback(async ({ email, senha, perfil }) => {
    const next = await api.login({ email, senha, perfil });
    writeSession(next);
    setSession(next);
    setSplash(true);
    return next;
  }, []);

  const logout = useCallback(() => {
    writeSession(null);
    setSession(null);
    setSplash(false);
  }, []);

  const dismissSplash = useCallback(() => setSplash(false), []);

  const value = useMemo(
    () => ({ session, login, logout, splash, dismissSplash }),
    [session, login, logout, splash, dismissSplash],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
