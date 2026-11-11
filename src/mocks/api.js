// ─────────────────────────────────────────────────────────────
// API SIMULADA (mock) — não faz nenhuma chamada de rede.
//
// Imita um backend real: toda função é assíncrona e tem latência
// artificial, então a UI já lida com carregamento como faria em produção.
// As alterações ficam salvas no localStorage do navegador e podem ser
// desfeitas com resetDemo().
//
// Médico e operadora enxergam os mesmos dados: quando o médico envia um
// laudo, ele aparece para a operadora; quando a operadora aprova ou
// reprova, o médico vê o novo status.
//
// Para ligar a um backend de verdade, basta reimplementar estas funções
// com fetch() mantendo as mesmas assinaturas.
// ─────────────────────────────────────────────────────────────
import { SEED } from './seed.js';
import { STATUS } from '../utils/requests.js';
import { toISODate } from '../utils/dates.js';

const STORAGE_KEY = 'lastro-labs-demo:v2';
const LATENCY_MS = { min: 250, max: 600 };
const EDITABLE_FIELDS = ['nome', 'cpf', 'exame', 'origem'];

const clone = (v) => JSON.parse(JSON.stringify(v));
const wait = () =>
  new Promise((r) => setTimeout(r, LATENCY_MS.min + Math.random() * (LATENCY_MS.max - LATENCY_MS.min)));

/** Os dados salvos só valem se tiverem o formato atual (lista de solicitações completas). */
const isValidSaved = (s) =>
  !!s &&
  Array.isArray(s.requests) &&
  Array.isArray(s.examTypes) &&
  s.requests.every((r) => r && typeof r.status === 'string' && Array.isArray(r.historico));

function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // Os perfis são fixos: vêm sempre do seed. Só solicitações e tipos de exame ficam salvos.
      if (isValidSaved(saved)) return { ...clone(SEED), requests: saved.requests, examTypes: saved.examTypes };
      localStorage.removeItem(STORAGE_KEY); // formato antigo ou corrompido: volta aos dados originais
    }
  } catch {
    /* localStorage indisponível (aba anônima, bloqueio) ou JSON inválido: usa os dados originais */
  }
  return clone(SEED);
}

let db = loadDb();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    /* sem persistência: a demo continua funcionando em memória */
  }
}

function find(id) {
  const r = db.requests.find((x) => x.id === id);
  if (!r) throw new Error('Solicitação não encontrada.');
  return r;
}

export const api = {
  // ── Autenticação ─────────────────────────────────────────────
  /** Aceita qualquer e-mail válido com qualquer senha preenchida. */
  async login({ email, senha, perfil }) {
    await wait();
    if (!/^\S+@\S+\.\S+$/.test(email.trim()) || !senha) {
      throw new Error('Informe um e-mail válido e a senha.');
    }
    const profile = db.profiles[perfil];
    if (!profile) throw new Error('Perfil de acesso inválido.');
    return { ...clone(profile), email: email.trim() };
  },

  // ── Consultas ────────────────────────────────────────────────
  async getExamTypes() {
    await wait();
    return clone(db.examTypes);
  },

  async listRequests() {
    await wait();
    return clone(db.requests);
  },

  async getRequest(id) {
    await wait();
    return clone(find(id));
  },

  // ── Médico ───────────────────────────────────────────────────
  async updateRequest(id, changes) {
    await wait();
    const r = find(id);
    EDITABLE_FIELDS.forEach((f) => f in changes && (r[f] = changes[f]));
    persist();
    return clone(r);
  },

  async deleteRequest(id) {
    await wait();
    find(id);
    db.requests = db.requests.filter((r) => r.id !== id);
    persist();
  },

  /** Registra o laudo enviado: o status passa a "Enviado" e a operadora passa a ver a solicitação. */
  async uploadReport(id, { nome, tamanho }) {
    await wait();
    const r = find(id);
    Object.assign(r, {
      arquivo: { nome, tamanho },
      status: STATUS.ENVIADO,
      dataEnvio: toISODate(new Date()),
      iaOk: true,
      aprovacao: null,
    });
    persist();
    return clone(r);
  },

  /** Remove o laudo enviado e volta a solicitação para "Pendente". */
  async removeReport(id) {
    await wait();
    const r = find(id);
    Object.assign(r, { arquivo: null, status: STATUS.PENDENTE, dataEnvio: null, iaOk: null, aprovacao: null });
    persist();
    return clone(r);
  },

  // ── Operadora ────────────────────────────────────────────────
  /** Ao baixar o laudo, uma solicitação "Enviado" passa a "Em análise". */
  async startAnalysis(id) {
    await wait();
    const r = find(id);
    if (r.status === STATUS.ENVIADO) r.status = STATUS.EM_ANALISE;
    persist();
    return clone(r);
  },

  /** decisao: 'sim' (aprova) | 'nao' (reprova → o médico precisa reenviar) | null (volta para análise). */
  async reviewReport(id, decisao) {
    await wait();
    const r = find(id);
    r.aprovacao = decisao;
    r.status = decisao === 'sim' ? STATUS.APROVADO : decisao === 'nao' ? STATUS.ERRO : STATUS.EM_ANALISE;
    persist();
    return clone(r);
  },

  // ── Demo ─────────────────────────────────────────────────────
  /** Volta todos os dados para o estado original da demo. */
  async resetDemo() {
    await wait();
    db = clone(SEED);
    persist();
  },
};
