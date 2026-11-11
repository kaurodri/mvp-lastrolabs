import { SortIcon } from '../icons/Icons.jsx';

/** Ícone de ordenação; alterna asc → desc → sem ordem. */
export default function SortButton({ label, direction, onClick }) {
  const title = direction === 'asc' ? 'Ordem crescente' : direction === 'desc' ? 'Ordem decrescente' : `Ordenar por ${label}`;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      title={title}
      className={`flex transition ${direction ? 'text-lastro-teal' : 'text-slate-500 hover:text-lastro-navy'} ${direction === 'desc' ? 'rotate-180' : ''}`}
    >
      <SortIcon />
    </button>
  );
}
