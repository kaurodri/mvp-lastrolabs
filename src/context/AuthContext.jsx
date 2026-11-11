import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { api } from '../mocks/api.js';

const SESSION_KEY = 'lastro-labs-demo:session';
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
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* sem persistência: a sessão vale só até recarregar */
  }
}

/** Sessão do usuário logado (perfil "medico" ou "operadora"). */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const login = useCallback(async ({ email, senha, perfil, lembrar }) => {
    const next = await api.login({ email, senha, perfil });
    writeSession(next, lembrar);
    setSession(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    writeSession(null, false);
    setSession(null);
  }, []);

  const value = useMemo(() => ({ session, login, logout }), [session, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
