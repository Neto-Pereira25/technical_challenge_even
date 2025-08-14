# 🧠 Tech Conference - Sistema de Inscrição de Participantes

Este projeto foi desenvolvido como parte de um **desafio técnico** com foco em habilidades de desenvolvimento front-end utilizando **React**, **TypeScript** e boas práticas de arquitetura de software.

O objetivo era criar uma aplicação SPA que permitisse a inscrição, edição e exclusão de participantes em um evento fictício de tecnologia — o _Tech Conference 2025_ — mantendo uma experiência amigável, validada e responsiva.

---

## 🚀 Visão Geral da Aplicação

A aplicação oferece as seguintes funcionalidades principais:

- 📋 Formulário de inscrição com validação de dados (nome e e-mail)
- 🧾 Listagem de participantes cadastrados
- ✏️ Edição dos dados do participante
- 🗑️ Remoção de participantes com confirmação
- 💾 Persistência local dos dados via `localStorage`
- 📱 Responsividade para dispositivos móveis
- 🔔 Notificações visuais via _toast_

A interface foi desenhada para ser intuitiva, clara e com boa usabilidade tanto em desktop quanto em mobile.

---

## 🗂️ Estrutura do Projeto

```bash
src/
├── components/
│ ├── ConfirmDeleteModal.tsx
│ ├── EditParticipantModal.tsx
│ ├── EventRegistration.tsx
│ ├── ParticipanForm.tsx
│ └── ParticipanList.tsx
│
├── pages/
│ ├── Index.tsx
│ └── NotFound.tsx
│
├── routes/
│ └── AppRoutes.tsx
│
├── schema/
│ └── participant.schema.tsx
│
├── types/
│ └── Participant.ts
│
├── utils/
│ └── participantUtils.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

---

## 🛠️ Tecnologias Utilizadas

- **React** — biblioteca principal da aplicação
- **TypeScript** — tipagem estática para maior segurança e legibilidade
- **React Bootstrap** — estilização baseada em componentes responsivos
- **Zod** — validação de dados de forma declarativa
- **React Toastify** — exibição de mensagens e alertas ao usuário
- **Lucide React** — ícones modernos baseados em SVG

---

## 💻 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**

```bash
git clone git@github.com:Neto-Pereira25/technical_challenge_even3.git
```

2. **Acesse a pasta do projeto**

```bash
cd pratical-development
```

3. **Instale as dependências**

```bash
npm install
# ou
yarn
```

4. **Execute a aplicação em modo desenvolvimento**

```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação em: http://localhost:5173**

---

## ⚙️ Decisões Técnicas

- Zod foi escolhido pela sua integração simples com TypeScript e facilidade de gerar mensagens de erro detalhadas para o usuário.

- React Bootstrap oferece uma forma rápida e responsiva de montar interfaces padronizadas, o que agilizou o desenvolvimento visual da aplicação.

- Componentização: a aplicação foi dividida em componentes específicos com responsabilidade única, seguindo os princípios do SOLID, principalmente o Single Responsibility Principle.

- Validações e lógica isoladas: extraídas para funções utilitárias para manter o código mais limpo, testável e reutilizável.

- Responsividade: Foi priorizado o uso de flex-wrap, gap, e breakpoints do Bootstrap para garantir usabilidade em dispositivos móveis.

---

## 👨‍💻 Sobre o Desenvolvedor

Sou um desenvolvedor full stack com experiência prática na árae de desenvolvimento web e análise de dados. Possuo conhecimento sólido em linguagens de programação como:

- Java
- Python
- JavaScript
- TypeScript
- Node.js

Além de experiência com banco de dados relacionais (Postgres e MySQL), não relacionais (MongoDB) e versionamento de código utilizando Git. Destaco-me pela versatilidade, proatividade, facilidade de aprendizado e bom relacionamento em trabalhos colaborativos.

---

## 📬 Contato

Caso queira entrar em contato para dúvidas, feedbacks ou oportunidades:

- LinkedIn: [Neto Pereira](https://www.linkedin.com/in/jose-neto-programador/)

- E-mail: devneto203@gmail.com

- GitHub: [Neto Pereira](https://github.com/Neto-Pereira25)

---

Feito com 💙 para o Desafio Técnico do Even3.
