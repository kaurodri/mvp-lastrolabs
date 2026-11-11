import { useState } from 'react';
import { ChevronDownIcon, PencilIcon } from '../icons/Icons.jsx';

const LABELS = { sim: 'Sim', nao: 'Não' };

/**
 * Decisão da operadora: "Selecionar ▾" até escolher Sim/Não;
 * depois mostra a escolha com um lápis para alterar.
 */
export default function ApprovalSelect({ patientName, value, onChange }) {
  const [editing, setEditing] = useState(false);

  if (value && !editing) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-slate-700">
        {LABELS[value]}
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label={`Alterar aprovação de ${patientName}`}
          title="Alterar"
          className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-lastro-deep"
        >
          <PencilIcon className="h-3.5 w-3.5" />
        </button>
      </span>
    );
  }

  return (
    <span className="relative inline-flex items-center rounded-md hover:bg-slate-100 focus-within:ring-2 focus-within:ring-lastro-cyan/40">
      <select
        aria-label={`Aprovar laudo de ${patientName}`}
        autoFocus={editing}
        value={value ?? ''}
        onChange={(e) => {
          setEditing(false);
          onChange(e.target.value || null);
        }}
        onBlur={() => setEditing(false)}
        className="cursor-pointer appearance-none rounded-md bg-transparent py-1 pl-2 pr-6 text-sm text-slate-700 focus:outline-none"
      >
        <option value="">Selecionar</option>
        <option value="sim">Sim</option>
        <option value="nao">Não</option>
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-1.5 h-3.5 w-3.5 text-slate-500" />
    </span>
  );
}
