import StatusBadge from '../ui/StatusBadge.jsx';
import DuplicateAlert from '../exams/DuplicateAlert.jsx';
import { ExternalLinkIcon } from '../icons/Icons.jsx';
import LaudoButton from './LaudoButton.jsx';
import { STATUS_LIST, hasDuplicate, laudoAction } from '../../utils/requests.js';

export const LAUDO_OPTIONS = ['Enviar', 'Acompanhar'];

// Regras de filtro e ordenação por coluna (usadas por usePagedList).
export const DOCTOR_COLUMN_MATCH = {
  laudo: (r, selected) => selected.includes(laudoAction(r)),
  status: (r, selected) => selected.includes(r.status),
};
export const DOCTOR_SORT_VALUE = {
  exame: (r) => r.exame,
  laudo: laudoAction,
  status: (r) => r.status,
};
export const DOCTOR_SORT_OPTIONS = [
  { value: 'exame:asc', label: 'Tipo de exame (A–Z)' },
  { value: 'exame:desc', label: 'Tipo de exame (Z–A)' },
  { value: 'laudo:asc', label: 'Laudo: acompanhar primeiro' },
  { value: 'laudo:desc', label: 'Laudo: enviar primeiro' },
  { value: 'status:asc', label: 'Status (A–Z)' },
  { value: 'status:desc', label: 'Status (Z–A)' },
];

/** Tipo de exame com o alerta de duplicidade ao lado, quando houver. */
export function ExamCell({ request }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="truncate" title={request.exame}>
        {request.exame}
      </span>
      {hasDuplicate(request) && <DuplicateAlert />}
    </div>
  );
}

export function DetailsButton({ request, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(request)}
      aria-label={`Ver mais sobre ${request.nome}`}
      title="Ver mais"
      className="rounded-md p-2 text-lastro-navy transition hover:bg-slate-100 hover:text-lastro-deep"
    >
      <ExternalLinkIcon className="h-[18px] w-[18px]" />
    </button>
  );
}

/** Colunas da tabela do médico: Nome | Tipo de exame | Laudo | Status do envio | Ver mais. */
export function buildDoctorColumns({ onLaudo, onDetails }) {
  return [
    {
      key: 'nome',
      header: 'Nome do Paciente',
      width: 'w-[28%]',
      skeleton: 'w-3/4',
      render: (r) => (
        <span className="block truncate" title={r.nome}>
          {r.nome}
        </span>
      ),
    },
    { key: 'exame', header: 'Tipo de exame', width: 'w-[26%]', sortable: true, render: (r) => <ExamCell request={r} /> },
    {
      key: 'laudo',
      header: 'Laudo',
      width: 'w-[170px] xl:w-[190px]',
      sortable: true,
      filter: { options: LAUDO_OPTIONS },
      skeleton: 'w-20',
      render: (r) => <LaudoButton request={r} onClick={onLaudo} />,
    },
    {
      key: 'status',
      header: 'Status do envio',
      width: 'w-[190px] xl:w-[210px]',
      sortable: true,
      filter: { options: STATUS_LIST },
      skeleton: 'w-24',
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: 'ver',
      header: 'Ver mais',
      width: 'w-[100px] xl:w-[120px]',
      align: 'center',
      skeleton: 'w-6',
      render: (r) => <DetailsButton request={r} onClick={onDetails} />,
    },
  ];
}
