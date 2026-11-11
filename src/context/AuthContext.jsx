import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { api } from '../mocks/api.js';

const SESSION_KEY = 'lastro-labs-demo:session';
const REMEMBER_KEY = 'lastro-labs-demo:remembered';
const AuthContext = createContext(null);

function readSession() {
  for (const storage of [() => localStorage, () => sessionStorage]) {
    try {
      const raw = storage().getItem(SESSION_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* armazenamento indisponível */
    }
  }
  return null;
}

function writeSession(session, remember) {
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    if (session) (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* sem persistência: a sessão vale só até recarregar */
  }
}

/** E-mail e perfil guardados pelo "Lembrar", para preencher o login na próxima visita. Nunca guarda a senha. */
export function readRemembered() {
  try {
    return JSON.parse(localStorage.getItem(REMEMBER_KEY)) ?? null;
  } catch {
    return null;
  }
}

function writeRemembered(data) {
  try {
    if (data) localStorage.setItem(REMEMBER_KEY, JSON.stringify(data));
    else localStorage.removeItem(REMEMBER_KEY);
  } catch {
    /* sem persistência */
  }
}

/**
 * Sessão do usuário logado (perfil "medico" ou "operadora").
 * `splash` fica verdadeiro ao entrar na plataforma (login ou sessão salva) para mostrar a abertura animada.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);
  const [splash, setSplash] = useState(() => readSession() !== null);

  const login = useCallback(async ({ email, senha, perfil, lembrar }) => {
    const next = await api.login({ email, senha, perfil });
    writeSession(next, lembrar);
    writeRemembered(lembrar ? { email: next.email, perfil } : null);
    setSession(next);
    setSplash(true);
    return next;
  }, []);

  const logout = useCallback(() => {
    writeSession(null, false);
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
