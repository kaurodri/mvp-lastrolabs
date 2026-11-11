import { useEffect, useState } from 'react';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';
import TextInput from '../ui/TextInput.jsx';
import Select from '../ui/Select.jsx';
import { maskCpf } from '../../utils/cpf.js';

/** Formulário de edição dos dados do paciente e da solicitação. */
export default function PatientFormModal({ patient, examTypes, onSave, onClose }) {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (patient) setForm({ nome: patient.nome, cpf: patient.cpf, exame: patient.exame, origem: patient.origem });
  }, [patient]);

  if (!patient || !form) return null;

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const valid = form.nome.trim() && form.cpf.length === 14 && form.origem.trim();

  const submit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setSaving(true);
    try {
      await onSave(patient.id, { ...form, nome: form.nome.trim(), origem: form.origem.trim() });
      onClose();
    } catch {
      /* erro já informado por quem chamou; mantém o formulário aberto */
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open
      title="Editar paciente"
      onClose={saving ? () => {} : onClose}
      footer={
        <>
          <Button type="button" variant="secondary" size="md" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" form="patient-form" size="md" disabled={!valid || saving}>
            {saving ? 'Salvando…' : 'Salvar'}
          </Button>
        </>
      }
    >
      <form id="patient-form" onSubmit={submit} className="space-y-4 text-xs text-slate-700">
        <label className="block space-y-1.5">
          <span className="font-medium text-slate-600">Nome</span>
          <TextInput value={form.nome} onChange={set('nome')} autoFocus />
        </label>
        <label className="block space-y-1.5">
          <span className="font-medium text-slate-600">CPF</span>
          <TextInput
            value={form.cpf}
            inputMode="numeric"
            maxLength={14}
            onChange={(e) => setForm({ ...form, cpf: maskCpf(e.target.value) })}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="font-medium text-slate-600">Tipo de exame</span>
          <Select options={examTypes} value={form.exame} onChange={set('exame')} />
        </label>
        <label className="block space-y-1.5">
          <span className="font-medium text-slate-600">Origem</span>
          <TextInput value={form.origem} onChange={set('origem')} />
        </label>
      </form>
    </Modal>
  );
}
