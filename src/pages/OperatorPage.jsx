import { useMemo, useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import FilterCard from '../components/filters/FilterCard.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import CardList from '../components/ui/CardList.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import Pagination from '../components/pagination/Pagination.jsx';
import OperatorCard from '../components/operator/OperatorCard.jsx';
import {
  OPERATOR_SORT_OPTIONS,
  OPERATOR_SORT_VALUE,
  buildOperatorColumns,
} from '../components/operator/operatorColumns.jsx';
import useAsync from '../hooks/useAsync.js';
import usePagedList from '../hooks/usePagedList.js';
import { api } from '../mocks/api.js';
import { EMPTY_OPERATOR_FILTERS, matchesOperator } from '../utils/filters.js';

const PAGE_SIZE_OPTIONS = [4, 10, 20];

/** Espaço do Operador: baixar o laudo, conferir a análise da IA e aprovar ou reprovar. */
export default function OperatorPage() {
  const notify = useToast();
  const requests = useAsync(api.listRequests, []);
  const exams = useAsync(api.getExamTypes, []);
  const [filters, setFilters] = useState(EMPTY_OPERATOR_FILTERS);

  // A operadora só vê solicitações cujo laudo já foi enviado pelo médico.
  const received = useMemo(() => requests.data.filter((r) => r.arquivo), [requests.data]);
  const searched = useMemo(() => received.filter((r) => matchesOperator(r, filters)), [received, filters]);
  const list = usePagedList(searched, { sortValue: OPERATOR_SORT_VALUE, initialPageSize: PAGE_SIZE_OPTIONS[0] });

  const searchFields = useMemo(
    () => [
      { key: 'exame', label: 'Tipo de exame', type: 'select', placeholder: 'Ex: Ressonância Magnética', options: exams.data },
      { key: 'dataEnvio', label: 'Data de envio', type: 'date' },
      { key: 'medico', label: 'Médico(a) Responsável', placeholder: 'Nome' },
      { key: 'origem', label: 'Origem', placeholder: 'Solicitação' },
    ],
    [exams.data],
  );

  const replace = (updated) => requests.setData((all) => all.map((r) => (r.id === updated.id ? updated : r)));

  const download = async (r) => {
    try {
      replace(await api.startAnalysis(r.id));
      notify(`Download do laudo de ${r.nome} iniciado.`);
    } catch (err) {
      notify(err.message || 'Não foi possível baixar o laudo.', 'error');
    }
  };

  const review = async (r, decision) => {
    try {
      replace(await api.reviewReport(r.id, decision));
      if (decision === 'sim') notify(`Laudo de ${r.nome} aprovado.`);
      else if (decision === 'nao') notify(`Laudo de ${r.nome} reprovado. O médico precisará reenviar.`);
    } catch (err) {
      notify(err.message || 'Não foi possível registrar a decisão.', 'error');
    }
  };

  const columns = buildOperatorColumns({ onDownload: download, onReview: review });

  return (
    <>
      <PageHeader
        title="Espaço do Operador"
        subtitle="Faça o download do arquivo, confira se a análise da IA procede e aprove o laudo recebido."
      />

      <div className="mt-6 space-y-6 lg:mt-8 lg:space-y-8">
        <FilterCard
          title="Filtro"
          fields={searchFields}
          emptyValues={EMPTY_OPERATOR_FILTERS}
          onSearch={(f) => {
            setFilters(f);
            list.setPage(1);
          }}
          idPrefix="operador"
        />

        <Card className="p-4 lg:p-6">
          {/* Tabela de 7 colunas a partir de 1280px; cartões abaixo disso. */}
          <div className="hidden xl:block">
            <DataTable
              columns={columns}
              rows={list.pageItems}
              loading={requests.loading}
              skeletonCount={list.pageSize}
              sort={list.sort}
              onSort={list.toggleSort}
              minWidth="min-w-[1000px]"
              dense
              emptyText="Nenhum laudo encontrado."
            />
          </div>
          <div className="xl:hidden">
            <CardList
              items={list.pageItems}
              loading={requests.loading}
              skeletonCount={list.pageSize}
              renderCard={(r) => <OperatorCard request={r} onDownload={download} onReview={review} />}
              sortOptions={OPERATOR_SORT_OPTIONS}
              sort={list.sort}
              onSortSet={list.setSort}
              emptyText="Nenhum laudo encontrado."
            />
          </div>

          <Pagination
            noun="laudos"
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
    </>
  );
}
