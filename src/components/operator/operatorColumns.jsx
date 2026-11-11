import { ExamCell } from '../doctor/doctorColumns.jsx';
import ApprovalSelect from './ApprovalSelect.jsx';
import DownloadButton from './DownloadButton.jsx';
import IaResult from './IaResult.jsx';

// Ordenação por coluna (usada por usePagedList). O operador não tem filtro por coluna.
export const OPERATOR_SORT_VALUE = {
  medico: (r) => r.medico,
  especialidade: (r) => r.especialidade,
  exame: (r) => r.exame,
  laudo: (r) => (r.aprovacao ? '1' : '0'), // sem decisão primeiro
  ia: (r) => (r.iaOk ? '1' : '0'), // divergências primeiro
  aprovar: (r) => r.aprovacao ?? '',
};

export const OPERATOR_SORT_OPTIONS = [
  { value: 'medico:asc', label: 'Médico(a) (A–Z)' },
  { value: 'especialidade:asc', label: 'Especialidade (A–Z)' },
  { value: 'exame:asc', label: 'Tipo de exame (A–Z)' },
  { value: 'laudo:asc', label: 'Laudo: sem decisão primeiro' },
  { value: 'ia:asc', label: 'Análise IA: divergências primeiro' },
  { value: 'aprovar:asc', label: 'Aprovar (A–Z)' },
];

const text = (value) => (
  <span className="block truncate" title={value}>
    {value}
  </span>
);

/**
 * Colunas da tabela da operadora:
 * Nome | Médico(a) Responsável | Especialidade | Tipo de Exame | Laudo | Análise IA | Aprovar
 */
export function buildOperatorColumns({ onDownload, onReview }) {
  return [
    { key: 'nome', header: 'Nome do Paciente', width: 'w-[20%]', skeleton: 'w-3/4', render: (r) => text(r.nome) },
    { key: 'medico', header: 'Médico(a) Responsável', width: 'w-[17%]', sortable: true, render: (r) => text(r.medico) },
    { key: 'especialidade', header: 'Especialidade Médica', width: 'w-[16%]', sortable: true, render: (r) => text(r.especialidade) },
    { key: 'exame', header: 'Tipo de Exame', width: 'w-[19%]', sortable: true, render: (r) => <ExamCell request={r} /> },
    {
      key: 'laudo',
      header: 'Laudo',
      width: 'w-[84px]',
      align: 'center',
      sortable: true,
      skeleton: 'w-8',
      render: (r) => <DownloadButton request={r} onClick={onDownload} />,
    },
    {
      key: 'ia',
      header: 'Análise IA',
      width: 'w-[104px]',
      align: 'center',
      sortable: true,
      skeleton: 'w-10',
      render: (r) => <IaResult ok={r.iaOk} />,
    },
    {
      key: 'aprovar',
      header: 'Aprovar',
      width: 'w-[128px]',
      align: 'center',
      sortable: true,
      skeleton: 'w-20',
      render: (r) => (
        <ApprovalSelect patientName={r.nome} value={r.aprovacao} onChange={(decision) => onReview(r, decision)} />
      ),
    },
  ];
}
