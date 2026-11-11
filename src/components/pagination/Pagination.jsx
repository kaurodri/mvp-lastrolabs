import IconButton from '../ui/IconButton.jsx';
import Select from '../ui/Select.jsx';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons.jsx';

const SmallLeft = (p) => <ChevronLeftIcon className="h-3.5 w-3.5" {...p} />;
const SmallRight = (p) => <ChevronRightIcon className="h-3.5 w-3.5" {...p} />;

/**
 * Rodapé da tabela em três blocos: contagem | páginas | itens por página.
 * No celular a contagem fica numa linha própria e os demais blocos centralizados.
 */
export default function Pagination({
  noun = 'pacientes',
  page,
  totalPages,
  totalCount,
  onPageChange,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  return (
    <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-between" aria-label="Paginação">
      <p className="w-full text-center text-sm text-slate-500 sm:w-auto sm:text-left">
        Mostrando <span className="font-medium text-slate-700">{from}–{to}</span> de{' '}
        <span className="font-medium text-slate-700">{totalCount}</span> {noun}
      </p>

      <div className="flex items-center gap-1.5">
        <IconButton icon={SmallLeft} label="Página anterior" disabled={page === 1} onClick={() => onPageChange(page - 1)} />
        {pages.map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === page ? 'page' : undefined}
            onClick={() => onPageChange(n)}
            className={`h-9 min-w-9 rounded-md border bg-white px-2 text-sm transition ${
              n === page ? 'border-blue-600 font-medium text-blue-600' : 'border-slate-300 text-slate-700 hover:border-lastro-teal'
            }`}
          >
            {n}
          </button>
        ))}
        <IconButton
          icon={SmallRight}
          label="Próxima página"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Select
          aria-label="Itens por página"
          className="w-[84px]"
          selectClassName="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-lastro-teal focus:outline-none"
          options={pageSizeOptions}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        />
        por página
      </div>
    </nav>
  );
}
