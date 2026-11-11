/** Interruptor com rótulo (ex.: "Exames repetidos"). */
export default function Switch({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-slate-700">
      {label}
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="relative h-5 w-9 rounded-full bg-slate-200 transition after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-lastro-cyan peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-lastro-cyan/40" />
    </label>
  );
}
