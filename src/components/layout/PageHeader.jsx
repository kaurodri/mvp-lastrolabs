import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

/** Trilha de navegação: "Página principal › Envio de exames". */
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Trilha de navegação" className="flex items-center gap-2 text-sm text-slate-500">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">›</span>}
          {item.to ? (
            <Link to={item.to} className="transition hover:text-lastro-deep">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/**
 * Logo em linha própria no topo (à direita), com a trilha de navegação à esquerda
 * quando houver, e abaixo o título e o subtítulo da página.
 */
export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <header>
      <div className="flex items-center justify-between gap-4">
        {breadcrumb ? <Breadcrumb items={breadcrumb} /> : <span />}
        <Logo className="h-7 w-auto sm:h-8 lg:h-9" />
      </div>
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[26px] lg:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft sm:mt-1.5 sm:text-base lg:text-lg">{subtitle}</p>}
      </div>
    </header>
  );
}
