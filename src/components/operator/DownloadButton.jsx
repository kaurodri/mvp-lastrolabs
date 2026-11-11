import { CloudDownloadIcon } from '../icons/Icons.jsx';

/** Baixa o laudo. Fica mais claro depois que a decisão (aprovar/reprovar) já foi tomada. */
export default function DownloadButton({ request, onClick }) {
  const decided = !!request.aprovacao;
  return (
    <button
      type="button"
      onClick={() => onClick(request)}
      aria-label={`Baixar laudo de ${request.nome}`}
      title="Baixar laudo"
      className={`inline-flex h-8 w-10 items-center justify-center rounded-md text-white transition ${
        decided ? 'bg-lastro-cyan/50 hover:bg-lastro-cyan' : 'bg-lastro-cyan hover:bg-lastro-teal'
      }`}
    >
      <CloudDownloadIcon className="h-5 w-5" />
    </button>
  );
}
