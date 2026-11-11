import { useState } from 'react';
import { AlertCircleIcon, ChevronUpIcon } from '../icons/Icons.jsx';
import { formatDate } from '../../utils/dates.js';

/** Exame anterior do paciente, expansível. Duplicidades já vêm abertas e destacadas. */
export default function HistoryItem({ item, duplicate }) {
  const [open, setOpen] = useState(duplicate);

  return (
    <li className="border-b border-slate-400/40 pb-3 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <span>
          <span className="block text-base font-medium text-lastro-navy">{item.exame}</span>
          <span className="flex items-center gap-1.5 text-sm text-slate-600">
            {formatDate(item.data)}
            {duplicate && (
              <>
                <em>(Duplicidade)</em>
                <AlertCircleIcon className="h-4 w-4 text-amber-500" />
              </>
            )}
          </span>
        </span>
        <ChevronUpIcon className={`mt-1 h-5 w-5 shrink-0 text-lastro-navy transition-transform ${open ? '' : 'rotate-180'}`} />
      </button>

      {open && (
        <div className="mt-3 flex gap-3 rounded-lg bg-white/60 p-4 text-sm leading-relaxed text-slate-700">
          {duplicate && <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />}
          <div>
            <p>
              <b className="font-semibold">Laudo:</b> {item.laudo}
            </p>
            <p>
              <b className="font-semibold">Local:</b> {item.local}
            </p>
            <p>
              <b className="font-semibold">Médico Responsável:</b> {item.medico}
            </p>
            {duplicate && (
              <p className="mt-2 text-xs italic text-slate-600">Apenas um alerta para que a operadora tenha conhecimento.</p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
