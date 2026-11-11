import Button from '../ui/Button.jsx';
import { CloudDownloadIcon } from '../icons/Icons.jsx';
import { ExamCell } from '../doctor/doctorColumns.jsx';
import ApprovalSelect from './ApprovalSelect.jsx';
import IaResult from './IaResult.jsx';

/** Versão em cartão de uma linha da tabela da operadora (abaixo de 1280px). */
export default function OperatorCard({ request, onDownload, onReview }) {
  return (
    <>
      <p className="line-clamp-2 text-[15px] font-medium text-slate-800">{request.nome}</p>
      <div className="mt-1 text-sm text-slate-500">
        <ExamCell request={request} />
        <p className="mt-1 truncate">
          {request.medico} · {request.especialidade}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-slate-100 pt-4">
        <Button variant="accent" icon={CloudDownloadIcon} onClick={() => onDownload(request)} aria-label={`Baixar laudo de ${request.nome}`}>
          Baixar laudo
        </Button>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <IaResult ok={request.iaOk} />
          <span className="flex items-center gap-1">
            Aprovar:
            <ApprovalSelect patientName={request.nome} value={request.aprovacao} onChange={(d) => onReview(request, d)} />
          </span>
        </div>
      </div>
    </>
  );
}
