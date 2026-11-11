import { useEffect, useState } from 'react';
import logoWhiteUrl from '../../assets/logo-lastro-labs-white.svg';

const SHOW_MS = 1700; // tempo com a logo na tela
const FADE_MS = 450; // saída suave

/**
 * Tela de abertura ao entrar na plataforma: logo branca animada sobre o azul da marca.
 * Some sozinha (onDone). Com "reduzir movimento" ativo no sistema, só aparece rapidamente, sem animação.
 */
export default function SplashScreen({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = reduced ? 500 : SHOW_MS;
    const fade = reduced ? 0 : FADE_MS;
    const t1 = setTimeout(() => setLeaving(true), show);
    const t2 = setTimeout(onDone, show + fade);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      role="status"
      aria-label="Carregando Lastro.Labs"
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-lastro-navy ${
        leaving ? 'pointer-events-none animate-splash-out' : ''
      }`}
    >
      <img src={logoWhiteUrl} alt="" className="w-[220px] animate-splash-logo motion-reduce:animate-none sm:w-[300px]" />
      <span className="mt-10 block h-0.5 w-28 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
        <span className="block h-full w-1/2 animate-splash-bar rounded-full bg-lastro-cyan motion-reduce:animate-none" />
      </span>
    </div>
  );
}
