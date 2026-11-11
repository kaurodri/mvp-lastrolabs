/** Dica que aparece acima do elemento ao passar o mouse ou focar (teclado/toque). */
export default function Tooltip({ text, children }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[230px] -translate-x-1/2 rounded-md bg-lastro-navy px-3 py-2 text-left text-xs font-normal leading-snug text-white opacity-0 shadow-soft transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {text}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-lastro-navy" />
      </span>
    </span>
  );
}
