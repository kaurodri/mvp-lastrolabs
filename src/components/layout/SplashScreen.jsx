import { useCallback, useEffect, useRef, useState } from 'react';
import { SYMBOL_D, WORDMARK_D } from './brandPaths.js';

/**
 * Abertura animada ao entrar na plataforma (a mesma do protótipo).
 * Some sozinha em ~2,9 s; dá para pular com o botão "Pular" ou clicando em qualquer lugar.
 * Com "reduzir movimento" ativo no sistema, aparece por 1 s sem animação.
 * As animações ficam em index.css (classes .splash-*).
 */
export default function SplashScreen({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  const finish = useCallback(
    (delay) => {
      if (finished.current) return;
      finished.current = true;
      setLeaving(true);
      setTimeout(onDone, delay);
    },
    [onDone],
  );

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => finish(reduced ? 200 : 600), reduced ? 1000 : 2900);
    return () => clearTimeout(timer);
  }, [finish]);

  return (
    <div
      className={`splash fixed inset-0 z-[100] flex flex-col items-center justify-center ${leaving ? 'splash-leave' : ''}`}
      onClick={() => finish(450)}
      role="status"
      aria-label="Carregando Lastro.Labs"
    >
      <div className="splash-mark-wrap flex flex-col items-center">
        <div className="relative">
          <span className="splash-ring" aria-hidden="true" />
          <svg className="splash-mark h-[88px] w-[96px] sm:h-[104px] sm:w-[113px]" viewBox="-2 -2 118 109" aria-hidden="true">
            <path className="splash-path" d={SYMBOL_D} pathLength="1" />
          </svg>
        </div>
        <svg className="splash-word mt-7 h-6 w-auto sm:h-7" viewBox="458 631 190 31" aria-hidden="true">
          {WORDMARK_D.map((d, i) => (
            <path key={i} d={d} fill="#fff" />
          ))}
        </svg>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          finish(450);
        }}
        className="splash-skip absolute bottom-6 right-6 rounded-full border border-white/40 px-4 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/10"
      >
        Pular
      </button>
    </div>
  );
}
