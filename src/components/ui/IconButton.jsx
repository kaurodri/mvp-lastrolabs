const TONES = {
  default:
    'border-slate-300 bg-white text-slate-700 hover:border-lastro-teal hover:text-lastro-deep disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400',
  danger:
    'border-slate-300 bg-white text-slate-700 hover:border-red-400 hover:text-red-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400',
  // Sobre fundos coloridos (painel lateral)
  soft: 'border-slate-400/50 bg-white/40 text-lastro-navy hover:bg-white/80 disabled:opacity-50',
  // Ícones azuis do cartão de upload
  accent: 'border-slate-200 bg-white text-accent hover:border-accent disabled:opacity-40',
};

/** Botão quadrado 36×36 só com ícone (editar, excluir, setas da paginação). */
export default function IconButton({ icon: IconComponent, label, tone = 'default', className = '', ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition disabled:cursor-not-allowed ${TONES[tone]} ${className}`}
      {...props}
    >
      <IconComponent />
    </button>
  );
}
