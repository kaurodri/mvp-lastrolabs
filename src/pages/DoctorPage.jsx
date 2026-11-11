import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import OverviewSection from '../components/dashboard/OverviewSection.jsx';
import FilterCard from '../components/filters/FilterCard.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import CardList from '../components/ui/CardList.jsx';
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import Pagination from '../components/pagination/Pagination.jsx';
import DoctorCard from '../components/doctor/DoctorCard.jsx';
import PatientDrawer from '../components/doctor/PatientDrawer.jsx';
import PatientFormModal from '../components/doctor/PatientFormModal.jsx';
import {
  DOCTOR_COLUMN_MATCH,
  DOCTOR_SORT_OPTIONS,
  DOCTOR_SORT_VALUE,
  LAUDO_OPTIONS,
  buildDoctorColumns,
} from '../components/doctor/doctorColumns.jsx';
import useAsync from '../hooks/useAsync.js';
import usePagedList from '../hooks/usePagedList.js';
import { api } from '../mocks/api.js';
import { EMPTY_PATIENT_FILTERS, matchesPatient } from '../utils/filters.js';
import { maskCpf } from '../utils/cpf.js';
import { STATUS_LIST } from '../utils/requests.js';

const PAGE_SIZE_OPTIONS = [4, 10, 20];

/** Espaço do Médico: acompanhamento geral, busca e lista de solicitações. */
export default function DoctorPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const requests = useAsync(api.listRequests, []);
  const exams = useAsync(api.getExamTypes, []);

  const [filters, setFilters] = useState(EMPTY_PATIENT_FILTERS);
  const [updatedAt, setUpdatedAt] = useState(() => new Date());
  const [detailsId, setDetailsId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const searched = useMemo(() => requests.data.filter((r) => matchesPatient(r, filters)), [requests.data, filters]);
  const list = usePagedList(searched, {
    columnMatch: DOCTOR_COLUMN_MATCH,
    sortValue: DOCTOR_SORT_VALUE,
    initialPageSize: PAGE_SIZE_OPTIONS[0],
  });

  const details = requests.data.find((r) => r.id === detailsId) ?? null;
  const searchFields = useMemo(
    () => [
      { key: 'nome', label: 'Nome', placeholder: 'Paciente' },
      { key: 'cpf', label: 'CPF', placeholder: '000.000.000-00', mask: maskCpf, maxLength: 14, inputMode: 'numeric' },
      { key: 'exame', label: 'Tipo de exame', type: 'select', placeholder: 'Ex: Ressonância Magnética', options: exams.data },
      { key: 'origem', label: 'Origem', placeholder: 'Solicitação' },
    ],
    [exams.data],
  );

  const goToUpload = (r) => navigate(`/medico/envio/${r.id}`);
  const openDetails = (r) => setDetailsId(r.id);
  const columns = buildDoctorColumns({ onLaudo: goToUpload, onDetails: openDetails });

  const refresh = () => {
    requests.reload();
    setUpdatedAt(new Date());
  };

  const search = (f) => {
    setFilters(f);
    list.setPage(1);
  };

  const save = async (id, changes) => {
    try {
      const updated = await api.updateRequest(id, changes);
      requests.setData((all) => all.map((r) => (r.id === id ? updated : r)));
      notify('Dados do paciente atualizados.');
    } catch (err) {
      notify(err.message || 'Não foi possível salvar.', 'error');
      throw err;
    }
  };

  const remove = async () => {
    try {
      await api.deleteRequest(deleting.id);
      requests.setData((all) => all.filter((r) => r.id !== deleting.id));
      setDetailsId(null);
      notify(`Solicitação de ${deleting.nome} excluída.`);
    } catch (err) {
      notify(err.message || 'Não foi possível excluir.', 'error');
      throw err;
    }
  };

  return (
    <>
      <PageHeader title="Espaço do Médico" subtitle="Gestão, acompanhamento e envio de exames." />

      <div className="mt-6 space-y-6 lg:mt-8 lg:space-y-8">
        <OverviewSection requests={requests.data} loading={requests.loading} updatedAt={updatedAt} onRefresh={refresh} />

        <FilterCard
          title="Buscar paciente"
          panelTitle="Filtro"
          fields={searchFields}
          emptyValues={EMPTY_PATIENT_FILTERS}
          onSearch={search}
        />

        <Card className="p-4 lg:p-6">
          {/* Tabela a partir de 1024px; cartões abaixo disso. */}
          <div className="hidden lg:block">
            <DataTable
              columns={columns}
              rows={list.pageItems}
              loading={requests.loading}
              skeletonCount={list.pageSize}
              sort={list.sort}
              onSort={list.toggleSort}
              getColumnFilter={list.getColumnFilter}
              onColumnFilter={list.setColumnFilter}
              emptyText="Nenhum paciente encontrado."
            />
          </div>
          <div className="lg:hidden">
            <CardList
              items={list.pageItems}
              loading={requests.loading}
              skeletonCount={list.pageSize}
              renderCard={(r) => <DoctorCard request={r} onLaudo={goToUpload} onDetails={openDetails} />}
              filters={[
                { key: 'laudo', label: 'laudo', options: LAUDO_OPTIONS, selected: list.getColumnFilter('laudo'), onChange: (s) => list.setColumnFilter('laudo', s) },
                { key: 'status', label: 'status', options: STATUS_LIST, selected: list.getColumnFilter('status'), onChange: (s) => list.setColumnFilter('status', s) },
              ]}
              sortOptions={DOCTOR_SORT_OPTIONS}
              sort={list.sort}
              onSortSet={list.setSort}
              emptyText="Nenhum paciente encontrado."
            />
          </div>

          <Pagination
            page={list.page}
            totalPages={list.totalPages}
            totalCount={list.totalCount}
            onPageChange={list.setPage}
            pageSize={list.pageSize}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onPageSizeChange={list.setPageSize}
          />
        </Card>
      </div>

      <PatientDrawer request={details} onClose={() => setDetailsId(null)} onEdit={setEditing} onDelete={setDeleting} />

      <PatientFormModal patient={editing} examTypes={exams.data} onSave={save} onClose={() => setEditing(null)} />

      <ConfirmDialog
        open={!!deleting}
        title="Excluir solicitação"
        message={deleting && `Tem certeza que deseja excluir a solicitação de ${deleting.nome}?`}
        confirmLabel="Excluir"
        onConfirm={remove}
        onClose={() => setDeleting(null)}
      />
    </>
  );
}
