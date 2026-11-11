import { useEffect } from 'react';
import { CloseIcon } from '../icons/Icons.jsx';

/** Painel lateral deslizante (direita). Fecha com Esc, clique fora ou no X. Tela cheia no celular. */
export default function Drawer({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 animate-fade-in bg-lastro-navy/15" onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-y-0 right-0 flex w-full animate-slide-in flex-col overflow-y-auto bg-drawer p-6 shadow-2xl sm:w-[460px] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar painel"
          className="-mr-1 -mt-1 ml-auto rounded-md p-1 text-lastro-navy transition hover:bg-white/50"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        {children}
      </aside>
    </div>
  );
}
