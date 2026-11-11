import { useCallback, useEffect, useState } from 'react';

/**
 * Executa uma função assíncrona ao montar e expõe
 * { data, loading, error, reload, setData }.
 * `fn` precisa ter identidade estável (função fora do componente ou useCallback).
 * `setData` aceita um valor ou uma função (atual) => novo, para atualizar sem recarregar.
 */
export default function useAsync(fn, initialData = null) {
  const [state, setState] = useState({ data: initialData, loading: true, error: null });

  const reload = useCallback(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => active && setState((s) => ({ ...s, loading: false, error })));
    return () => {
      active = false;
    };
  }, [fn]);

  useEffect(() => reload(), [reload]);

  const setData = useCallback(
    (updater) =>
      setState((s) => ({ ...s, data: typeof updater === 'function' ? updater(s.data) : updater })),
    [],
  );

  return { ...state, reload, setData };
}
