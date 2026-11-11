import { addDays, formatLongDate, parseISODate } from './dates.js';
import { STATUS } from './requests.js';

// Estado visual de cada etapa do rastreio, de acordo com o status da solicitação.
const STEP_STATES = {
  [STATUS.PENDENTE]: ['todo', 'todo', 'todo'],
  [STATUS.ENVIADO]: ['done', 'todo', 'todo'],
  [STATUS.EM_ANALISE]: ['done', 'current', 'todo'],
  [STATUS.APROVADO]: ['done', 'done', 'done'],
  [STATUS.ERRO]: ['done', 'done', 'error'],
};

const STEP_LABELS = ['Envio de laudo', 'Em Análise', 'Aprovação'];
const STEP_OFFSETS = [0, 2, 8]; // dias após o envio

/** Monta as 3 etapas do rastreio. Antes do envio, as datas são uma previsão a partir de hoje. */
export function buildTimeline(request, today = new Date()) {
  const base = request.dataEnvio ? parseISODate(request.dataEnvio) : today;
  const states = STEP_STATES[request.status] ?? STEP_STATES[STATUS.PENDENTE];
  return STEP_LABELS.map((label, i) => ({
    label,
    date: formatLongDate(addDays(base, STEP_OFFSETS[i])),
    state: states[i],
  }));
}
