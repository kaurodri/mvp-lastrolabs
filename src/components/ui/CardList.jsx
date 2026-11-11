import ColumnFilter from './ColumnFilter.jsx';
import Select from './Select.jsx';

/**
 * Lista de cartões usada no lugar da tabela em telas menores.
 * Os filtros e a ordenação das colunas passam para uma barra acima da lista.
 *
 *   filters      [{ key, label, options, selected, onChange }]
 *   sortOptions  [{ value: 'chave:asc', label }]
 */
export default function CardList({
  items,
  loading,
  skeletonCount = 4,
  renderCard,
  filters = [],
  sortOptions = [],
  sort,
  onSortSet,
  emptyText = 'Nenhum resultado encontrado.',
}) {
  const hasToolbar = filters.length > 0 || sortOptions.length > 0;

  return (
    <div>
      {hasToolbar && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <ColumnFilter key={f.key} variant="pill" align="left" label={f.label} options={f.options} selected={f.selected} onChange={f.onChange} />
          ))}
          {sortOptions.length > 0 && (
            <Select
              aria-label="Ordenar"
              className="min-w-[190px] flex-1 sm:max-w-[260px] sm:flex-none"
              selectClassName="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-lastro-teal focus:outline-none"
              options={[{ value: '', label: 'Sem ordenação' }, ...sortOptions]}
              value={sort.key ? `${sort.key}:${sort.dir}` : ''}
              onChange={(e) => {
                const [key, dir] = e.target.value.split(':');
                onSortSet(key ? { key, dir } : { key: null, dir: null });
              }}
            />
          )}
        </div>
      )}

      <ul className={`grid gap-3 sm:grid-cols-2 ${hasToolbar ? 'mt-4' : ''}`}>
        {loading ? (
          Array.from({ length: skeletonCount }, (_, i) => (
            <li key={i} className="min-w-0 rounded-lg border border-slate-200 bg-white p-4" aria-hidden="true">
              <div className="space-y-2">
                <div className="h-3.5 w-40 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
              </div>
              <div className="mt-4 h-8 w-24 animate-pulse rounded-md bg-slate-200" />
            </li>
          ))
        ) : items.length === 0 ? (
          <li className="py-10 text-center text-sm text-slate-500 sm:col-span-2">{emptyText}</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
              {renderCard(item)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
