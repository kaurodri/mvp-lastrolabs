import { normalize } from './text.js';
import { onlyDigits } from './cpf.js';
import { hasDuplicate } from './requests.js';

// ── Espaço do Médico ───────────────────────────────────────────
export const EMPTY_PATIENT_FILTERS = { nome: '', cpf: '', exame: '', origem: '', repetidos: false };

export function matchesPatient(r, f) {
  const nome = normalize(f.nome.trim());
  const cpf = onlyDigits(f.cpf);
  const origem = normalize(f.origem.trim());
  return (
    (!nome || normalize(r.nome).includes(nome)) &&
    (!cpf || onlyDigits(r.cpf).startsWith(cpf)) &&
    (!f.exame || r.exame === f.exame) &&
    (!origem || normalize(r.origem).includes(origem)) &&
    (!f.repetidos || hasDuplicate(r))
  );
}

// ── Espaço do Operador ─────────────────────────────────────────
export const EMPTY_OPERATOR_FILTERS = { exame: '', dataEnvio: '', medico: '', origem: '', repetidos: false };

export function matchesOperator(r, f) {
  const medico = normalize(f.medico.trim());
  const origem = normalize(f.origem.trim());
  return (
    (!f.exame || r.exame === f.exame) &&
    (!f.dataEnvio || r.dataEnvio === f.dataEnvio) &&
    (!medico || normalize(r.medico).includes(medico)) &&
    (!origem || normalize(r.origem).includes(origem)) &&
    (!f.repetidos || hasDuplicate(r))
  );
}
