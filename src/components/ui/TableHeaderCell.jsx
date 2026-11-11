/**
 * Célula de cabeçalho: título à esquerda (ou centralizado) e ações (filtro/ordenar) à direita.
 * O título quebra de linha em vez de ser cortado.
 */
export default function TableHeaderCell({
  children,
  actions,
  align = 'left',
  bordered = true,
  padding = 'px-4 xl:px-6',
}) {
  return (
    <th className={`py-3 font-medium ${padding} ${bordered ? 'border-r border-slate-200' : ''}`}>
      <div className={`flex items-center gap-2 ${align === 'center' ? 'justify-center' : 'justify-between'}`}>
        <span className="min-w-0 leading-tight">{children}</span>
        {actions && <span className="flex shrink-0 items-center gap-2">{actions}</span>}
      </div>
    </th>
  );
}
