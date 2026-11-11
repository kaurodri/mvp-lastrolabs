// ─────────────────────────────────────────────────────────────
// DADOS FICTÍCIOS — usados apenas para demonstração da plataforma.
// Nomes, CPFs, guias e CRMs são inventados e não pertencem a pessoas reais.
// Edite este arquivo para mudar o que aparece na demo.
//
// Cada item de `requests` é uma solicitação de exame de um paciente:
//   status      Pendente | Em análise | Erro | Enviado | Aprovado
//   arquivo     laudo enviado pelo médico (null enquanto Pendente)
//   iaOk        resultado da análise da IA sobre o laudo (true/false)
//   aprovacao   decisão da operadora: 'sim' (→ Aprovado) | 'nao' (→ Erro) | null
//   historico   exames anteriores; se repete o exame atual, é uma duplicidade
// ─────────────────────────────────────────────────────────────
import { STATUS } from '../utils/requests.js';

const { PENDENTE, EM_ANALISE, ERRO, ENVIADO, APROVADO } = STATUS;

const hist = (exame, data, laudo, local, medico) => ({ exame, data, laudo, local, medico });
const file = (nome, tamanho) => ({ nome, tamanho });

export const SEED = {
  profiles: {
    medico: { perfil: 'medico', nome: 'Dra. Camila Rezende', iniciais: 'CR', detalhe: 'Médica · Radiologia' },
    operadora: { perfil: 'operadora', nome: 'Marina Alves', iniciais: 'MA', detalhe: 'Operadora' },
  },

  examTypes: [
    'Ressonância Magnética',
    'Raio X',
    'Tomografia',
    'Ultrassonografia',
    'Mamografia',
    'Densitometria Óssea',
  ],

  requests: [
    {
      id: 1, nome: 'Aline Costa', cpf: '123.456.789-00', exame: 'Ressonância Magnética', origem: 'Solicitação',
      status: PENDENTE, medico: 'Dra. Renata Faria', especialidade: 'Ortopedia',
      guia: 'GU-2026-004556', executante: 'Clínica Imagem Center', dataSolicitacao: '2026-11-10',
      dataEnvio: null, arquivo: null, iaOk: null, aprovacao: null,
      historico: [
        hist('Raio X', '2026-04-03', 'Sem alterações significativas.', 'Clínica Imagem', 'Dra. Paula Nogueira CRM 00000'),
        hist('Tomografia', '2026-08-12', 'Achados dentro da normalidade.', 'Hospital Central', 'Dr. Eduardo Prado CRM 00000'),
        hist('Ressonância Magnética', '2026-08-12', 'Discreta protrusão discal L4-L5.', 'Clínica Imagem', 'Dr Wilson CRM 00000'),
      ],
    },
    {
      id: 2, nome: 'Aline Ramalho', cpf: '234.567.890-11', exame: 'Raio X', origem: 'Solicitação',
      status: ERRO, medico: 'Dr. Caio Mendes', especialidade: 'Pediatria',
      guia: 'GU-2026-004571', executante: 'Clínica Imagem Center', dataSolicitacao: '2026-10-25',
      dataEnvio: '2026-10-28', arquivo: file('Laudo Raio X.pdf', '420 KB'), iaOk: false, aprovacao: 'nao',
      historico: [hist('Ultrassonografia', '2026-02-18', 'Exame sem particularidades.', 'Clínica Vida', 'Dra. Helena Duarte CRM 00000')],
    },
    {
      id: 3, nome: 'Aline de Jesus Pereira Pires', cpf: '345.678.901-22', exame: 'Ultrassonografia', origem: 'Retorno',
      status: ENVIADO, medico: 'Dra. Helena Duarte', especialidade: 'Ginecologia',
      guia: 'GU-2026-004602', executante: 'Clínica Vida', dataSolicitacao: '2026-11-02',
      dataEnvio: '2026-11-05', arquivo: file('Laudo Ultrassonografia.pdf', '1,2 MB'), iaOk: false, aprovacao: null,
      historico: [],
    },
    {
      id: 4, nome: 'Aline Rosário da Costa Lima', cpf: '456.789.012-33', exame: 'Mamografia', origem: 'Solicitação',
      status: APROVADO, medico: 'Dra. Marcela Teixeira', especialidade: 'Mastologia',
      guia: 'GU-2026-004388', executante: 'Centro de Diagnóstico Norte', dataSolicitacao: '2026-10-14',
      dataEnvio: '2026-10-20', arquivo: file('Laudo Mamografia.pdf', '980 KB'), iaOk: true, aprovacao: 'sim',
      historico: [hist('Ultrassonografia', '2025-10-09', 'Cistos simples, sem sinais de malignidade.', 'Centro de Diagnóstico Norte', 'Dra. Marcela Teixeira CRM 00000')],
    },
    {
      id: 5, nome: 'Bruno Almeida', cpf: '567.890.123-44', exame: 'Tomografia', origem: 'Solicitação',
      status: EM_ANALISE, medico: 'Dr. Eduardo Prado', especialidade: 'Neurologia',
      guia: 'GU-2026-004640', executante: 'Hospital Central', dataSolicitacao: '2026-10-30',
      dataEnvio: '2026-11-03', arquivo: file('Laudo Tomografia.pdf', '1,8 MB'), iaOk: true, aprovacao: null,
      historico: [hist('Tomografia', '2026-06-14', 'Sem alterações intracranianas.', 'Hospital Central', 'Dr. Eduardo Prado CRM 00000')],
    },
    {
      id: 6, nome: 'Carla Menezes', cpf: '678.901.234-55', exame: 'Ultrassonografia', origem: 'Solicitação',
      status: ENVIADO, medico: 'Dra. Helena Duarte', especialidade: 'Ginecologia',
      guia: 'GU-2026-004655', executante: 'Clínica Vida', dataSolicitacao: '2026-11-04',
      dataEnvio: '2026-11-07', arquivo: file('Laudo Ultrassonografia.pdf', '760 KB'), iaOk: true, aprovacao: null,
      historico: [],
    },
    {
      id: 7, nome: 'Daniel Souza', cpf: '789.012.345-66', exame: 'Raio X', origem: 'Retorno',
      status: APROVADO, medico: 'Dr. Caio Mendes', especialidade: 'Ortopedia',
      guia: 'GU-2026-004311', executante: 'Clínica Imagem Center', dataSolicitacao: '2026-10-08',
      dataEnvio: '2026-10-15', arquivo: file('Laudo Raio X.pdf', '510 KB'), iaOk: true, aprovacao: 'sim',
      historico: [],
    },
    {
      id: 8, nome: 'Eduarda Lima', cpf: '890.123.456-77', exame: 'Ressonância Magnética', origem: 'Solicitação',
      status: EM_ANALISE, medico: 'Dr. Eduardo Prado', especialidade: 'Neurologia',
      guia: 'GU-2026-004667', executante: 'Hospital Central', dataSolicitacao: '2026-10-29',
      dataEnvio: '2026-11-02', arquivo: file('Laudo Ressonância.pdf', '2,4 MB'), iaOk: false, aprovacao: null,
      historico: [hist('Ressonância Magnética', '2026-09-30', 'Pequena lesão em substância branca, inespecífica.', 'Hospital Central', 'Dr. Eduardo Prado CRM 00000')],
    },
    {
      id: 9, nome: 'Fábio Nunes', cpf: '901.234.567-88', exame: 'Tomografia', origem: 'Solicitação',
      status: PENDENTE, medico: 'Dr. Renato Alves', especialidade: 'Pneumologia',
      guia: 'GU-2026-004690', executante: 'Hospital Central', dataSolicitacao: '2026-11-09',
      dataEnvio: null, arquivo: null, iaOk: null, aprovacao: null,
      historico: [],
    },
    {
      id: 10, nome: 'Gabriela Rocha', cpf: '012.345.678-99', exame: 'Mamografia', origem: 'Solicitação',
      status: APROVADO, medico: 'Dra. Marcela Teixeira', especialidade: 'Mastologia',
      guia: 'GU-2026-004402', executante: 'Centro de Diagnóstico Norte', dataSolicitacao: '2026-10-16',
      dataEnvio: '2026-10-22', arquivo: file('Laudo Mamografia.pdf', '890 KB'), iaOk: true, aprovacao: 'sim',
      historico: [],
    },
    {
      id: 11, nome: 'Helena Martins', cpf: '111.222.333-44', exame: 'Ultrassonografia', origem: 'Retorno',
      status: ERRO, medico: 'Dra. Helena Duarte', especialidade: 'Ginecologia',
      guia: 'GU-2026-004599', executante: 'Clínica Vida', dataSolicitacao: '2026-10-26',
      dataEnvio: '2026-10-30', arquivo: file('Laudo Ultrassonografia.pdf', '700 KB'), iaOk: false, aprovacao: 'nao',
      historico: [],
    },
    {
      id: 12, nome: 'Igor Teixeira', cpf: '222.333.444-55', exame: 'Densitometria Óssea', origem: 'Solicitação',
      status: ENVIADO, medico: 'Dra. Paula Nogueira', especialidade: 'Endocrinologia',
      guia: 'GU-2026-004701', executante: 'Centro de Diagnóstico Norte', dataSolicitacao: '2026-11-05',
      dataEnvio: '2026-11-08', arquivo: file('Laudo Densitometria.pdf', '640 KB'), iaOk: true, aprovacao: null,
      historico: [],
    },
    {
      id: 13, nome: 'Juliana Prado', cpf: '333.444.555-66', exame: 'Ressonância Magnética', origem: 'Solicitação',
      status: EM_ANALISE, medico: 'Dr. Eduardo Prado', especialidade: 'Neurologia',
      guia: 'GU-2026-004679', executante: 'Clínica Imagem Center', dataSolicitacao: '2026-10-31',
      dataEnvio: '2026-11-04', arquivo: file('Laudo Ressonância.pdf', '2,1 MB'), iaOk: true, aprovacao: null,
      historico: [],
    },
    {
      id: 14, nome: 'Lucas Barros', cpf: '444.555.666-77', exame: 'Tomografia', origem: 'Solicitação',
      status: PENDENTE, medico: 'Dr. Renato Alves', especialidade: 'Pneumologia',
      guia: 'GU-2026-004712', executante: 'Hospital Central', dataSolicitacao: '2026-11-10',
      dataEnvio: null, arquivo: null, iaOk: null, aprovacao: null,
      historico: [hist('Tomografia', '2026-09-02', 'Nódulo pulmonar de 4 mm, sem necessidade de seguimento.', 'Hospital Central', 'Dr. Renato Alves CRM 00000')],
    },
    {
      id: 15, nome: 'Mariana Dias', cpf: '555.666.777-88', exame: 'Mamografia', origem: 'Retorno',
      status: APROVADO, medico: 'Dra. Marcela Teixeira', especialidade: 'Mastologia',
      guia: 'GU-2026-004420', executante: 'Centro de Diagnóstico Norte', dataSolicitacao: '2026-10-17',
      dataEnvio: '2026-10-23', arquivo: file('Laudo Mamografia.pdf', '910 KB'), iaOk: true, aprovacao: 'sim',
      historico: [],
    },
    {
      id: 16, nome: 'Nicolas Freitas', cpf: '666.777.888-99', exame: 'Ultrassonografia', origem: 'Solicitação',
      status: ENVIADO, medico: 'Dra. Helena Duarte', especialidade: 'Ginecologia',
      guia: 'GU-2026-004725', executante: 'Clínica Vida', dataSolicitacao: '2026-11-06',
      dataEnvio: '2026-11-09', arquivo: file('Laudo Ultrassonografia.pdf', '810 KB'), iaOk: true, aprovacao: null,
      historico: [],
    },
    {
      id: 17, nome: 'Otávio Ribeiro', cpf: '777.888.999-00', exame: 'Raio X', origem: 'Solicitação',
      status: ERRO, medico: 'Dr. Caio Mendes', especialidade: 'Ortopedia',
      guia: 'GU-2026-004588', executante: 'Clínica Imagem Center', dataSolicitacao: '2026-10-24',
      dataEnvio: '2026-10-27', arquivo: file('Laudo Raio X.pdf', '380 KB'), iaOk: false, aprovacao: 'nao',
      historico: [],
    },
    {
      id: 18, nome: 'Patrícia Gomes', cpf: '888.999.000-11', exame: 'Densitometria Óssea', origem: 'Solicitação',
      status: APROVADO, medico: 'Dra. Paula Nogueira', especialidade: 'Endocrinologia',
      guia: 'GU-2026-004433', executante: 'Centro de Diagnóstico Norte', dataSolicitacao: '2026-10-18',
      dataEnvio: '2026-10-24', arquivo: file('Laudo Densitometria.pdf', '600 KB'), iaOk: true, aprovacao: 'sim',
      historico: [],
    },
    {
      id: 19, nome: 'Rafael Cardoso', cpf: '999.000.111-22', exame: 'Tomografia', origem: 'Retorno',
      status: EM_ANALISE, medico: 'Dr. Renato Alves', especialidade: 'Pneumologia',
      guia: 'GU-2026-004691', executante: 'Hospital Central', dataSolicitacao: '2026-10-30',
      dataEnvio: '2026-11-03', arquivo: file('Laudo Tomografia.pdf', '1,6 MB'), iaOk: true, aprovacao: null,
      historico: [],
    },
    {
      id: 20, nome: 'Sofia Andrade', cpf: '010.203.040-50', exame: 'Ressonância Magnética', origem: 'Solicitação',
      status: PENDENTE, medico: 'Dr. Eduardo Prado', especialidade: 'Neurologia',
      guia: 'GU-2026-004733', executante: 'Clínica Imagem Center', dataSolicitacao: '2026-11-10',
      dataEnvio: null, arquivo: null, iaOk: null, aprovacao: null,
      historico: [],
    },
  ],
};
