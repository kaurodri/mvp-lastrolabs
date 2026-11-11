import { AlertCircleIcon } from '../icons/Icons.jsx';
import Tooltip from '../ui/Tooltip.jsx';

const MESSAGE = 'Duplicidade: veja os detalhes em "Ver mais".';

/** Alerta laranja ao lado do tipo de exame; o tooltip explica a duplicidade. */
export default function DuplicateAlert({ text = MESSAGE }) {
  return (
    <Tooltip text={text}>
      <button
        type="button"
        aria-label={text}
        className="flex shrink-0 rounded-full text-amber-500 transition hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <AlertCircleIcon className="h-[18px] w-[18px]" />
      </button>
    </Tooltip>
  );
}
