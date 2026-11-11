const ROLES = [
  { value: 'medico', label: 'Médico' },
  { value: 'operadora', label: 'Operadora' },
];

/** Escolha do perfil de acesso: o selecionado fica ciano preenchido; o outro, só com contorno. */
export default function RoleToggle({ value, onChange }) {
  return (
    <div role="group" aria-label="Perfil de acesso" className="grid grid-cols-2 gap-3">
      {ROLES.map((role) => {
        const selected = role.value === value;
        return (
          <button
            key={role.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(role.value)}
            className={`h-[50px] rounded-xl border text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lastro-cyan/50 ${
              selected
                ? 'border-lastro-cyan bg-lastro-cyan text-white'
                : 'border-lastro-cyan bg-white text-ink hover:bg-cyan-50'
            }`}
          >
            {role.label}
          </button>
        );
      })}
    </div>
  );
}
