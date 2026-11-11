# Lastro.Labs · Espaço do Médico e do Operador (demo)

Demonstração navegável da plataforma **Lastro.Labs**: o médico acompanha as solicitações de exame e envia o laudo; a operadora baixa o laudo, confere a análise da IA e aprova ou reprova.

> **Todos os dados são fictícios.** Nada é enviado para servidores: a "API" é simulada no próprio navegador.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:5173.

Para gerar a versão estática (pasta `dist/`, pronta para publicar em qualquer hospedagem estática, sem configurar o servidor, pois as rotas usam `#`):

```bash
npm run build
npm run preview
```

## Telas

| Rota | Tela |
|---|---|
| `/#/login` | Login com escolha de perfil (**Médico** ou **Operadora**) |
| `/#/medico` | **Espaço do Médico**: acompanhamento geral, busca e lista de solicitações, com o painel "Ver mais" |
| `/#/medico/envio/:id` | **Envio de documentos**: upload do laudo (3 estados) e rastreio das etapas |
| `/#/operador` | **Espaço do Operador**: download do laudo, análise da IA e aprovação |

**Login da demo:** qualquer e-mail válido com qualquer senha preenchida funciona. O perfil escolhido define para qual tela você vai.

## História que a demo conta

1. Entre como **Médico**. Na primeira linha, *Aline Costa* está **Pendente**, com um alerta de **duplicidade** (passe o mouse no ícone laranja).
2. Clique em **Ver mais** para ver o histórico do paciente e os detalhes da solicitação.
3. Clique em **Enviar**, escolha um PDF, JPEG ou ZIP de até 10 MB e acompanhe o upload. O status passa para **Enviado**.
4. Saia (menu do avatar → *Sair*) e entre como **Operadora**. O laudo recém-enviado aparece na lista.
5. Baixe o laudo (o status vira **Em análise**), confira o ícone da análise da IA e escolha **Sim** ou **Não** em *Aprovar*.
6. Volte como **Médico**: o status agora é **Aprovado** (ou **Erro**, e o botão volta a ser **Enviar** para reenviar).

Dá para refazer tudo do zero clicando na engrenagem da barra lateral (*Restaurar dados iniciais*).

## Dados mockados

| Arquivo | Para que serve |
|---|---|
| [`src/mocks/seed.js`](src/mocks/seed.js) | Dados iniciais: perfis, tipos de exame e as 20 solicitações (com histórico). **Edite aqui para mudar o conteúdo da demo.** |
| [`src/mocks/api.js`](src/mocks/api.js) | API simulada: funções assíncronas com latência artificial (250–600 ms) e persistência no `localStorage`. Médico e operadora compartilham os mesmos dados. |

Depois de editar o `seed.js`, restaure os dados pela engrenagem (ou limpe o `localStorage`), porque o navegador guarda o estado anterior.

Para ligar a um backend real, reimplemente as funções de `src/mocks/api.js` usando `fetch`, mantendo as mesmas assinaturas. Os componentes não precisam mudar.

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · React Router 7

## Estrutura

```
src/
├── pages/            LoginPage, DoctorPage, UploadPage, OperatorPage
├── context/          AuthContext (sessão do usuário)
├── mocks/            dados fictícios + API simulada
├── hooks/            useAsync, usePagedList (filtro/ordenação/paginação), useReportUpload
├── utils/            regras das solicitações, filtros, datas, arquivos, rastreio
├── components/
│   ├── layout/       ProtectedLayout, Sidebar, PageHeader, Logo
│   ├── ui/           Button, IconButton, TextInput, Select, Switch, Tooltip, StatusBadge,
│   │                 Card, Modal, ConfirmDialog, Drawer, Toast,
│   │                 DataTable, CardList, ColumnFilter, SortButton, TableHeaderCell
│   ├── filters/      FilterCard (busca guiada por configuração de campos)
│   ├── dashboard/    OverviewSection (Acompanhamento Geral)
│   ├── exams/        DuplicateAlert
│   ├── doctor/       colunas da tabela, LaudoButton, DoctorCard, PatientDrawer,
│   │                 HistoryItem, PatientFormModal
│   ├── operator/     colunas da tabela, OperatorCard, ApprovalSelect, IaResult, DownloadButton
│   ├── upload/       UploadCard, UploadTimeline
│   ├── auth/         RoleToggle, PasswordInput
│   ├── pagination/   Pagination
│   └── icons/        Icons
└── index.css         tokens de cor do styleguide (lastro-navy, lastro-cyan…)
```

Responsivo: tabelas a partir de 1024px (operador, 1280px); abaixo disso viram cartões. A barra lateral vira barra superior no celular.

Outros arquivos na raiz:

- `styleguidelabs.svg`: styleguide de onde vieram a logo e as cores
- `prototipo-html/`: primeira versão em HTML + Tailwind, sem React
