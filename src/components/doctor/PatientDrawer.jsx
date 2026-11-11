import Drawer from '../ui/Drawer.jsx';
import IconButton from '../ui/IconButton.jsx';
import StatusBadge from '../ui/StatusBadge.jsx';
import { BookIcon, FilePlusIcon, PencilIcon, TrashIcon } from '../icons/Icons.jsx';
import { formatDate } from '../../utils/dates.js';
import { isDuplicateEntry } from '../../utils/requests.js';
import HistoryItem from './HistoryItem.jsx';

function Field({ label, children }) {
  return (
    <p>
      <span className="font-medium text-slate-600">{label}:</span> {children}
    </p>
  );
}

/** "Ver mais": histórico do paciente e detalhes da solicitação atual. */
export default function PatientDrawer({ request, onClose, onEdit, onDelete }) {
  return (
    <Drawer open={!!request} title={request ? `Paciente: ${request.nome}` : ''} onClose={onClose}>
      {request && (
        <>
          <h2 className="mt-1 text-2xl text-lastro-navy">
            <b className="font-semibold">Paciente:</b> {request.nome}
          </h2>

          <section className="mt-8" aria-labelledby="drawer-history">
            <h3 id="drawer-history" className="flex items-center gap-2.5 text-xl font-semibold text-lastro-navy">
              <BookIcon className="h-6 w-6" />
              Histórico
            </h3>
            {request.historico.length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">Nenhum exame anterior registrado.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {request.historico.map((item) => (
                  <HistoryItem key={`${item.exame}-${item.data}`} item={item} duplicate={isDuplicateEntry(request, item)} />
                ))}
              </ul>
            )}
          </section>

          <section className="mt-8" aria-labelledby="drawer-current">
            <h3 id="drawer-current" className="flex items-center gap-2.5 text-xl font-semibold text-lastro-navy">
              <FilePlusIcon className="h-6 w-6" />
              Solicitação atual
            </h3>
            <div className="mt-4 space-y-1.5 text-[15px] text-lastro-navy">
              <Field label="Exame">{request.exame}</Field>
              <Field label="Guia">{request.guia}</Field>
              <Field label="Médico(a)">{request.medico}</Field>
              <Field label="Executante">{request.executante}</Field>
              <Field label="Data da solicitação">{formatDate(request.dataSolicitacao)}</Field>
            </div>

            <div className="mt-6 flex items-center gap-3 text-[15px] text-lastro-navy">
              <span className="font-medium text-slate-600">Status do envio:</span>
              <StatusBadge status={request.status} />
            </div>

            <div className="mt-5 flex gap-2">
              <IconButton tone="soft" icon={PencilIcon} label="Editar paciente" onClick={() => onEdit(request)} />
              <IconButton tone="soft" icon={TrashIcon} label="Excluir solicitação" onClick={() => onDelete(request)} />
            </div>
          </section>
        </>
      )}
    </Drawer>
  );
}
