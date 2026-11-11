// Regras de negócio sobre as solicitações de exame.

export const STATUS = {
  PENDENTE: 'Pendente',
  EM_ANALISE: 'Em análise',
  ERRO: 'Erro',
  ENVIADO: 'Enviado',
  APROVADO: 'Aprovado',
};

export const STATUS_LIST = Object.values(STATUS);

/** Laudo ainda precisa ser enviado (ou reenviado, se foi reprovado). */
export const needsSend = (r) => r.status === STATUS.PENDENTE || r.status === STATUS.ERRO;

/** Ação exibida na coluna Laudo do médico. */
export const laudoAction = (r) => (needsSend(r) ? 'Enviar' : 'Acompanhar');

/** O exame atual já aparece no histórico do paciente. */
export const hasDuplicate = (r) => r.historico.some((h) => h.exame === r.exame);

export const isDuplicateEntry = (r, h) => h.exame === r.exame;

/** Laudo travado para alteração enquanto está sendo analisado ou depois de aprovado. */
export const isLocked = (r) => r.status === STATUS.EM_ANALISE || r.status === STATUS.APROVADO;

export const countByStatus = (requests, status) => requests.filter((r) => r.status === status).length;
