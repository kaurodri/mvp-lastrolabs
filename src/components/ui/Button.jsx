const VARIANTS = {
  primary: 'bg-lastro-navy text-white hover:bg-lastro-deep disabled:opacity-60',
  accent: 'bg-lastro-cyan text-white hover:bg-lastro-teal disabled:opacity-60',
  outline: 'border border-lastro-navy bg-white text-lastro-navy hover:bg-slate-50 disabled:opacity-60',
  secondary: 'border border-slate-300 bg-white text-slate-700 hover:border-lastro-teal',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-60',
};

const SIZES = {
  sm: { button: 'h-8 px-3.5 text-xs', icon: 'h-3 w-3' },
  md: { button: 'h-10 px-5 text-sm', icon: 'h-4 w-4' },
  lg: { button: 'h-[50px] px-6 text-base', icon: 'h-5 w-5' },
};

/** Botão de ação (Buscar, Enviar, Salvar…). */
export default function Button({
  variant = 'primary',
  size = 'sm',
  icon: IconComponent,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:cursor-default ${VARIANTS[variant]} ${SIZES[size].button} ${className}`}
      {...props}
    >
      {children}
      {IconComponent && <IconComponent className={SIZES[size].icon} />}
    </button>
  );
}
