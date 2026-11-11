// Ícones de traço simples (stroke) usados na interface.
// Todos aceitam className e herdam a cor via currentColor.

function Icon({ className = 'h-4 w-4', strokeWidth = 1.6, children, ...props }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SettingsIcon = (p) => (
  <Icon {...p}>
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </Icon>
);

export const SlidersIcon = (p) => (
  <Icon {...p}>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Icon>
);

export const ChevronDownIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const ChevronLeftIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Icon>
);

export const ChevronRightIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M9 6l6 6-6 6" />
  </Icon>
);

export const SearchIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Icon>
);

export const SortIcon = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M7 12h10M10 17h4" />
  </Icon>
);

export const FilterIcon = (p) => (
  <Icon {...p}>
    <path d="M4 5h16l-6 7.5V19l-4-2v-4.5L4 5z" />
  </Icon>
);

export const ArrowUpRightIcon = (p) => (
  <Icon strokeWidth={2.4} {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Icon>
);

export const PencilIcon = (p) => (
  <Icon {...p}>
    <path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" />
  </Icon>
);

export const TrashIcon = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </Icon>
);

// ── Ícones adicionados para login, painel, duplicidade, drawer e envio ──

export const StethoscopeIcon = (p) => (
  <Icon {...p}>
    <path d="M11 2v2M5 2v2" />
    <path d="M5 3H4a2 2 0 00-2 2v4a6 6 0 0012 0V5a2 2 0 00-2-2h-1" />
    <path d="M8 15a6 6 0 0012 0v-3" />
    <circle cx="20" cy="10" r="2" />
  </Icon>
);

export const BellIcon = (p) => (
  <Icon {...p}>
    <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 003.4 0" />
  </Icon>
);

export const AlertCircleIcon = (p) => (
  <Icon strokeWidth={1.8} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5h.01" />
  </Icon>
);

export const RefreshIcon = (p) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </Icon>
);

export const ExternalLinkIcon = (p) => (
  <Icon {...p}>
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6M10 14L21 3" />
  </Icon>
);

export const EyeIcon = (p) => (
  <Icon {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const EyeOffIcon = (p) => (
  <Icon {...p}>
    <path d="M10.6 6.1A10 10 0 0112 6c6.4 0 10 6 10 6a17 17 0 01-3.2 3.9M6.6 7.6A17 17 0 002 12s3.6 6 10 6a9.7 9.7 0 004.4-1" />
    <path d="M9.9 9.9a3 3 0 004.2 4.2M3 3l18 18" />
  </Icon>
);

export const CloudUploadIcon = (p) => (
  <Icon {...p}>
    <path d="M12 13v8M8 17l4-4 4 4" />
    <path d="M4 14.9A7 7 0 1115.7 8h1.8a4.5 4.5 0 012.5 8.2" />
  </Icon>
);

export const CloudDownloadIcon = (p) => (
  <Icon {...p}>
    <path d="M12 13v8l-4-4M12 21l4-4" />
    <path d="M4.4 15.3A7 7 0 1115.7 8h1.8a4.5 4.5 0 012.5 8.2" />
  </Icon>
);

export const FileCheckIcon = (p) => (
  <Icon {...p}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M9 15l2 2 4-4" />
  </Icon>
);

export const FilePlusIcon = (p) => (
  <Icon {...p}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M12 18v-6M9 15h6" />
  </Icon>
);

export const BookIcon = (p) => (
  <Icon {...p}>
    <path d="M2 4h6a4 4 0 014 4v13a3 3 0 00-3-3H2z" />
    <path d="M22 4h-6a4 4 0 00-4 4v13a3 3 0 013-3h7z" />
  </Icon>
);

export const CloseIcon = (p) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </Icon>
);

export const ChevronUpIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M18 15l-6-6-6 6" />
  </Icon>
);

export const LogoutIcon = (p) => (
  <Icon {...p}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
  </Icon>
);

/** Círculo preenchido com ✓ (usa currentColor). */
export const CheckCircleSolidIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Círculo preenchido com ✕ (usa currentColor). */
export const XCircleSolidIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <path d="M8 8l8 8M16 8l-8 8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/** Brilhos que indicam conteúdo analisado por IA. */
export const SparklesIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 4l1.9 5.1L17 11l-5.1 1.9L10 18l-1.9-5.1L3 11l5.1-1.9z" />
    <path d="M18.5 3l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
  </svg>
);

export const CheckIcon = (p) => (
  <Icon strokeWidth={2.4} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </Icon>
);
