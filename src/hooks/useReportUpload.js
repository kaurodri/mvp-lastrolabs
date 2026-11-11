import { useEffect, useRef, useState } from 'react';
import { validateFile } from '../utils/files.js';

/**
 * Simula o upload de um arquivo com barra de progresso.
 * Valida formato e tamanho; ao chegar a 100% chama onComplete(file).
 * Retorna { upload: { file, progress } | null, error, start, cancel, clearError }.
 */
export default function useReportUpload({ onComplete }) {
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState(null);
  const timer = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const stop = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => stop, []); // para o intervalo ao sair da página

  useEffect(() => {
    if (!upload || upload.progress < 100) return;
    stop();
    Promise.resolve(onCompleteRef.current(upload.file)).finally(() => setUpload(null));
  }, [upload]);

  const start = (file) => {
    const problem = validateFile(file);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    stop();
    setUpload({ file, progress: 0 });
    timer.current = setInterval(() => {
      setUpload((u) => (u ? { ...u, progress: Math.min(100, u.progress + 5 + Math.random() * 10) } : u));
    }, 150);
  };

  const cancel = () => {
    stop();
    setUpload(null);
  };

  return { upload, error, start, cancel, clearError: () => setError(null) };
}
