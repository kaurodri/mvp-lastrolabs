import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BellIcon, LogoutIcon, SettingsIcon, StethoscopeIcon } from '../icons/Icons.jsx';
import { useToast } from '../ui/Toast.jsx';
import { HOME } from '../../utils/routes.js';

const ICON_BUTTON =
  'flex h-10 w-10 items-center justify-center rounded-lg text-lastro-cyan transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lastro-cyan/60';

/**
 * Navegação principal.
 * Celular (< 768px): barra fixa no topo, 56px de altura.
 * A partir de 768px: barra lateral fixa à esquerda, 72px de largura.
 */
export default function Sidebar({ session, onLogout, onSettings }) {
  const notify = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  return (
    <aside className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between bg-lastro-navy px-4 md:inset-x-auto md:inset-y-0 md:left-0 md:h-auto md:w-[72px] md:flex-col md:px-0 md:py-5">
      <div className="flex items-center gap-1 md:flex-col md:gap-3">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            title={session.nome}
            className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-lastro-deep md:mr-0"
          >
            {session.iniciais}
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute left-0 top-12 z-40 w-60 rounded-xl bg-white p-2 text-sm shadow-soft ring-1 ring-slate-200 md:left-12 md:top-0"
            >
              <div className="px-3 py-2">
                <p className="font-semibold text-ink">{session.nome}</p>
                <p className="text-xs text-slate-500">{session.detalhe}</p>
                <p className="mt-0.5 truncate text-xs text-slate-400">{session.email}</p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={onLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-slate-700 transition hover:bg-slate-50"
              >
                <LogoutIcon className="h-4 w-4" />
                Sair
              </button>
            </div>
          )}
        </div>

        <NavLink
          to={HOME[session.perfil]}
          title="Início"
          aria-label="Início"
          className={({ isActive }) => `${ICON_BUTTON} ${isActive ? 'bg-white/10' : ''}`}
        >
          <StethoscopeIcon className="h-6 w-6" />
        </NavLink>

        <button
          type="button"
          title="Notificações"
          aria-label="Notificações"
          onClick={() => notify('Você não tem novas notificações.')}
          className={ICON_BUTTON}
        >
          <BellIcon className="h-6 w-6" />
        </button>
      </div>

      <button
        type="button"
        onClick={onSettings}
        aria-label="Configurações: restaurar dados iniciais"
        title="Restaurar dados iniciais"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>
    </aside>
  );
}
