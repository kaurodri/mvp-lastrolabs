import { STATUS } from '../../utils/requests.js';

// Cores do design system para cada status. `dot` também é usado nos indicadores do painel.
export const STATUS_STYLES = {
  [STATUS.PENDENTE]: { box: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
  [STATUS.EM_ANALISE]: { box: 'bg-cyan-50 text-[#0A7C91]', dot: 'bg-lastro-cyan' },
  [STATUS.ERRO]: { box: 'bg-red-50 text-[#B42318]', dot: 'bg-red-600' },
  [STATUS.ENVIADO]: { box: 'bg-blue-50 text-[#1D4ED8]', dot: 'bg-blue-600' },
  [STATUS.APROVADO]: { box: 'bg-emerald-50 text-[#0F7A43]', dot: 'bg-emerald-600' },
};

/** Selo arredondado com ponto colorido do status do envio. */
export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES[STATUS.PENDENTE];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style.box}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}
