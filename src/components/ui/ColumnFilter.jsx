import { useEffect, useRef, useState } from 'react';
import { FilterIcon } from '../icons/Icons.jsx';

/**
 * Funil que abre uma lista de opções para filtrar uma coluna.
 * variant="icon": só o ícone (cabeçalho da tabela).
 * variant="pill": botão com texto (barra de filtros do celular).
 */
export default function ColumnFilter({ label, options, selected, onChange, variant = 'icon', align = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = selected.length > 0;

  useEffect(() => {
    if (!open) return;
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const toggle = (opt) =>
    onChange(selected.includes(opt) ? selected.filter((o) => o !== opt) : [...selected, opt]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={`Filtrar ${label}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={
          variant === 'pill'
            ? `flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm ${active ? 'border-lastro-teal bg-lastro-cyan/10 text-lastro-deep' : 'border-slate-300 bg-white text-slate-700'}`
            : `flex ${active ? 'text-lastro-teal' : 'text-slate-500 hover:text-lastro-navy'}`
        }
      >
        <FilterIcon />
        {variant === 'pill' && (
          <span className="capitalize">
            {label}
            {active && ` (${selected.length})`}
          </span>
        )}
      </button>
      {open && (
        <div
          className={`absolute z-10 w-48 rounded-md border border-slate-200 bg-white p-2 text-sm font-normal shadow-soft ${
            align === 'left' ? 'left-0' : 'right-0'
          } ${variant === 'pill' ? 'top-11' : 'top-6'}`}
        >
          {options.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-slate-50">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="accent-lastro-navy"
              />
              {opt}
            </label>
          ))}
          {active && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="mt-1 w-full rounded px-2 py-1 text-left text-xs text-lastro-deep hover:bg-slate-50"
            >
              Limpar filtro
            </button>
          )}
        </div>
      )}
    </div>
  );
}
