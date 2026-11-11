import { useMemo, useState } from 'react';

/**
 * Filtros por coluna, ordenação e paginação sobre uma lista já filtrada pela busca.
 *
 * columnMatch  { chave: (linha, valoresSelecionados) => boolean }
 * sortValue    { chave: (linha) => valor comparável }
 */
export default function usePagedList(rows, { columnMatch = {}, sortValue = {}, initialPageSize = 4 } = {}) {
  const [columnFilters, setColumnFilters] = useState({});
  const [sort, setSort] = useState({ key: null, dir: null });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const visible = useMemo(() => {
    let list = rows.filter((r) =>
      Object.entries(columnFilters).every(([key, selected]) => !selected.length || columnMatch[key](r, selected)),
    );
    if (sort.key) {
      const get = sortValue[sort.key];
      const factor = sort.dir === 'desc' ? -1 : 1;
      list = [...list].sort((a, b) => String(get(a)).localeCompare(String(get(b)), 'pt-BR') * factor);
    }
    return list;
  }, [rows, columnFilters, sort, columnMatch, sortValue]);

  const totalPages = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  return {
    pageItems: visible.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    totalCount: visible.length,
    page: currentPage,
    totalPages,
    pageSize,
    sort,
    setPage,
    setSort,
    setPageSize: (n) => {
      setPageSizeState(n);
      setPage(1);
    },
    /** Alterna crescente → decrescente → sem ordem. */
    toggleSort: (key) =>
      setSort((s) =>
        s.key !== key ? { key, dir: 'asc' } : s.dir === 'asc' ? { key, dir: 'desc' } : { key: null, dir: null },
      ),
    getColumnFilter: (key) => columnFilters[key] ?? [],
    setColumnFilter: (key, selected) => {
      setColumnFilters((cf) => ({ ...cf, [key]: selected }));
      setPage(1);
    },
  };
}
