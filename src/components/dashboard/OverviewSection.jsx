import { RefreshIcon } from '../icons/Icons.jsx';
import { STATUS_STYLES } from '../ui/StatusBadge.jsx';
import { STATUS, countByStatus } from '../../utils/requests.js';
import { formatUpdatedAt } from '../../utils/dates.js';

const INDICATORS = [
  { status: STATUS.ERRO, label: 'Com erro' },
  { status: STATUS.ENVIADO, label: 'Enviados' },
  { status: STATUS.APROVADO, label: 'Aprovados' },
  { status: STATUS.EM_ANALISE, label: 'Em análise' },
];

/** "Acompanhamento Geral": título, hora da última atualização, botão de atualizar e 4 indicadores. */
export default function OverviewSection({ requests, loading, updatedAt, onRefresh }) {
  return (
    <section aria-labelledby="overview-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="overview-title" className="text-xl font-bold text-ink">
          Acompanhamento Geral{' '}
          <span className="text-sm font-normal italic text-ink-soft">(Atualizado em {formatUpdatedAt(updatedAt)})</span>
        </h2>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-accent transition hover:border-accent disabled:opacity-60"
        >
          <RefreshIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar página
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
        {INDICATORS.map(({ status, label }) => (
          <div key={status} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3.5 shadow-soft">
            <span className={`mt-2.5 h-2 w-2 shrink-0 rounded-full ${STATUS_STYLES[status].dot}`} />
            <div>
              <p className="text-2xl font-bold leading-tight text-lastro-navy">{loading ? '–' : countByStatus(requests, status)}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
