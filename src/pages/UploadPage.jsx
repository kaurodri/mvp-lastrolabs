import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import UploadCard from '../components/upload/UploadCard.jsx';
import UploadTimeline from '../components/upload/UploadTimeline.jsx';
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import useAsync from '../hooks/useAsync.js';
import useReportUpload from '../hooks/useReportUpload.js';
import { api } from '../mocks/api.js';
import { formatBytes } from '../utils/files.js';
import { isLocked } from '../utils/requests.js';
import { buildTimeline } from '../utils/timeline.js';

const BREADCRUMB = [{ label: 'Página principal', to: '/medico' }, { label: 'Envio de exames' }];

/**
 * Envio de documentos de uma solicitação.
 * "Enviar" abre esta tela vazia; "Acompanhar" abre com o laudo já enviado e o rastreio.
 */
export default function UploadPage() {
  const { id } = useParams();
  const notify = useToast();
  const fetchRequest = useCallback(() => api.getRequest(Number(id)), [id]);
  const { data: request, loading, error, setData } = useAsync(fetchRequest, null);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const { upload, error: fileError, start, cancel } = useReportUpload({
    onComplete: async (file) => {
      try {
        setData(await api.uploadReport(request.id, { nome: file.name, tamanho: formatBytes(file.size) }));
        notify('Laudo enviado com sucesso.');
      } catch (err) {
        notify(err.message || 'Não foi possível enviar o laudo.', 'error');
      }
    },
  });

  const remove = async () => {
    try {
      setData(await api.removeReport(request.id));
      notify('Arquivo excluído.');
    } catch (err) {
      notify(err.message || 'Não foi possível excluir o arquivo.', 'error');
      throw err;
    }
  };

  const steps = useMemo(() => (request ? buildTimeline(request) : []), [request]);

  if (error) {
    return (
      <>
        <PageHeader title="Envio de documentos" breadcrumb={BREADCRUMB} />
        <p className="mt-8 text-slate-600">
          Não encontramos esta solicitação.{' '}
          <Link to="/medico" className="font-medium text-lastro-deep underline">
            Voltar para a página principal
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Envio de documentos"
        subtitle="Envie seu arquivo, aguarde a submissão de envio e rastreie cada etapa."
        breadcrumb={BREADCRUMB}
      />

      <div className="mt-6 max-w-[960px] space-y-6 lg:mt-8 lg:space-y-8">
        {loading || !request ? (
          <div className="h-[230px] animate-pulse rounded-2xl bg-white" aria-busy="true" aria-label="Carregando" />
        ) : (
          <>
            <UploadCard
              file={request.arquivo}
              upload={upload}
              error={fileError}
              locked={isLocked(request)}
              onPick={start}
              onCancel={cancel}
              onRemove={() => setConfirmRemove(true)}
            />
            <UploadTimeline steps={steps} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={confirmRemove}
        title="Excluir arquivo"
        message="O laudo enviado será removido e a solicitação voltará para Pendente."
        confirmLabel="Excluir"
        onConfirm={remove}
        onClose={() => setConfirmRemove(false)}
      />
    </>
  );
}
