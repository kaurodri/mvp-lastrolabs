import TableHeaderCell from './TableHeaderCell.jsx';
import SortButton from './SortButton.jsx';
import ColumnFilter from './ColumnFilter.jsx';

/**
 * Tabela genérica, guiada por configuração de colunas:
 *   { key, header, width, align?, sortable?, filter?: { options }, skeleton?, render(row) }
 * Colunas em proporção (table-fixed) acompanham a largura da tela; abaixo de
 * `minWidth` a tabela rola na horizontal em vez de espremer.
 */
export default function DataTable({
  columns,
  rows,
  loading = false,
  skeletonCount = 4,
  sort,
  onSort,
  getColumnFilter,
  onColumnFilter,
  emptyText = 'Nenhum resultado encontrado.',
  minWidth = 'min-w-[760px]',
  dense = false, // espaçamento interno menor, para tabelas com muitas colunas
}) {
  const last = columns.length - 1;
  const cellPadding = dense ? 'px-3' : 'px-4 xl:px-6';

  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${minWidth} table-fixed border-collapse text-left`}>
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} className={c.width} />
          ))}
        </colgroup>

        <thead>
          <tr className="text-[13px] text-slate-500">
            {columns.map((c, i) => {
              const filter = c.filter && (
                <ColumnFilter
                  label={c.header.toLowerCase()}
                  options={c.filter.options}
                  selected={getColumnFilter(c.key)}
                  onChange={(sel) => onColumnFilter(c.key, sel)}
                />
              );
              const sorter = c.sortable && (
                <SortButton
                  label={c.header.toLowerCase()}
                  direction={sort.key === c.key ? sort.dir : null}
                  onClick={() => onSort(c.key)}
                />
              );
              return (
                <TableHeaderCell
                  key={c.key}
                  align={c.align}
                  padding={cellPadding}
                  bordered={i < last}
                  actions={filter || sorter ? <>{filter}{sorter}</> : null}
                >
                  {c.header}
                </TableHeaderCell>
              );
            })}
          </tr>
        </thead>

        <tbody className="text-sm text-slate-700 lg:text-[15px]">
          {loading ? (
            Array.from({ length: skeletonCount }, (_, i) => (
              <tr key={i} className={`h-14 border-b border-slate-200 ${i % 2 === 0 ? 'bg-row' : 'bg-white'}`} aria-hidden="true">
                {columns.map((c, j) => (
                  <td key={c.key} className={`${cellPadding} ${j < last ? 'border-r border-slate-200' : ''}`}>
                    <div className={`h-3 animate-pulse rounded bg-slate-200 ${c.skeleton ?? 'w-2/3'} ${c.align === 'center' ? 'mx-auto' : ''}`} />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-sm text-slate-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={row.id} className={`h-14 border-b border-slate-200 ${i % 2 === 0 ? 'bg-row' : 'bg-white'}`}>
                {columns.map((c, j) => (
                  <td
                    key={c.key}
                    className={`${cellPadding} ${j < last ? 'border-r border-slate-200' : ''} ${c.align === 'center' ? 'text-center' : ''}`}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
