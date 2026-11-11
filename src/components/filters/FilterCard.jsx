import { useState } from 'react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Switch from '../ui/Switch.jsx';
import TextInput from '../ui/TextInput.jsx';
import Select from '../ui/Select.jsx';
import { SearchIcon, SlidersIcon } from '../icons/Icons.jsx';

function Control({ field, id, value, onChange }) {
  if (field.type === 'select') {
    return (
      <Select
        id={id}
        placeholder={field.placeholder}
        options={field.options}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return (
    <TextInput
      id={id}
      type={field.type === 'date' ? 'date' : 'text'}
      inputMode={field.inputMode}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
      value={value}
      onChange={(e) => onChange(field.mask ? field.mask(e.target.value) : e.target.value)}
    />
  );
}

/**
 * Cartão de busca guiado por configuração de campos:
 *   { key, label, type?: 'text' | 'select' | 'date', placeholder, options?, mask?, inputMode?, maxLength? }
 * Guarda um rascunho e só aplica (onSearch) ao clicar em Buscar / Enter.
 * "Limpar" volta ao estado vazio e aplica na hora. O interruptor "Exames repetidos"
 * é sempre o campo `repetidos` do rascunho.
 */
export default function FilterCard({ title, panelTitle, fields, emptyValues, onSearch, idPrefix = 'filtro' }) {
  const [draft, setDraft] = useState(emptyValues);
  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    onSearch(draft);
  };
  const clear = () => {
    setDraft(emptyValues);
    onSearch(emptyValues);
  };

  return (
    <Card className="p-5 lg:p-6">
      <h2 className="text-lg font-semibold text-[#3D3A55]">{title}</h2>

      <form className="mt-4" onSubmit={submit}>
        <div className="rounded-lg border border-slate-200 bg-white shadow-soft">
          {panelTitle && (
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
              <span className="text-xs font-semibold text-slate-700">{panelTitle}</span>
              <SlidersIcon className="h-4 w-4 text-slate-600" />
            </div>
          )}
          <div className="grid gap-x-5 gap-y-4 p-4 md:grid-cols-2 lg:p-5 xl:grid-cols-4">
            {fields.map((f) => (
              <div key={f.key} className="min-w-0">
                <label htmlFor={`${idPrefix}-${f.key}`} className="mb-1.5 block text-xs font-medium text-slate-600">
                  {f.label}
                </label>
                <Control field={f} id={`${idPrefix}-${f.key}`} value={draft[f.key]} onChange={(v) => set(f.key, v)} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
          <Switch id={`${idPrefix}-repetidos`} label="Exames repetidos" checked={draft.repetidos} onChange={(v) => set('repetidos', v)} />
          <div className="flex gap-3">
            <Button type="button" variant="outline" size="md" onClick={clear} className="flex-1 sm:flex-none">
              Limpar
            </Button>
            <Button type="submit" size="md" icon={SearchIcon} className="flex-1 sm:flex-none">
              Buscar
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
