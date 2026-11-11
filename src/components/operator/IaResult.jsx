import { CheckCircleSolidIcon, SparklesIcon, XCircleSolidIcon } from '../icons/Icons.jsx';
import Tooltip from '../ui/Tooltip.jsx';

/** Resultado da análise da IA: ✓ verde (procede) ou ✕ vermelho (diverge), com brilhos de IA. */
export default function IaResult({ ok }) {
  const text = ok ? 'A análise da IA procede com o laudo.' : 'A IA apontou divergência no laudo.';
  return (
    <Tooltip text={text}>
      <span className="inline-flex items-center gap-1" tabIndex={0} role="img" aria-label={text}>
        {ok ? (
          <CheckCircleSolidIcon className="h-5 w-5 text-green-600" />
        ) : (
          <XCircleSolidIcon className="h-5 w-5 text-red-600" />
        )}
        <SparklesIcon className="h-4 w-4 text-slate-400" />
      </span>
    </Tooltip>
  );
}
