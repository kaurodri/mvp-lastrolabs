import StatusBadge from '../ui/StatusBadge.jsx';
import Button from '../ui/Button.jsx';
import { ExternalLinkIcon } from '../icons/Icons.jsx';
import LaudoButton from './LaudoButton.jsx';
import { ExamCell } from './doctorColumns.jsx';

/** Versão em cartão de uma linha da tabela do médico (celular e tablet). */
export default function DoctorCard({ request, onLaudo, onDetails }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 text-sm text-slate-500">
          <p className="line-clamp-2 text-[15px] font-medium text-slate-800">{request.nome}</p>
          <div className="mt-1">
            <ExamCell request={request} />
          </div>
        </div>
        <StatusBadge status={request.status} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <LaudoButton request={request} onClick={onLaudo} />
        <Button variant="secondary" icon={ExternalLinkIcon} onClick={() => onDetails(request)}>
          Ver mais
        </Button>
      </div>
    </>
  );
}
