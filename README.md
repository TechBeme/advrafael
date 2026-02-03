<div align="center">

# ⚖️ Dr. Rafael Vieira — Advogado

**Site institucional com assistente virtual inteligente e agendamento automatizado**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-5.0-000?logo=vercel)](https://sdk.vercel.ai/)
[![Google Calendar](https://img.shields.io/badge/Google%20Calendar-API-4285F4?logo=googlecalendar)](https://developers.google.com/calendar)

**🌐 [advrafael.com.br](https://advrafael.com.br)**

**Idiomas:** [🇺🇸 English](README.en.md) • [🇪🇸 Español](README.es.md)

</div>

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Sobre o Desenvolvedor](#-sobre-o-desenvolvedor)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Deploy](#-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

Landing page institucional moderna para escritório de advocacia, desenvolvida com foco em **conversão** e **experiência do usuário**. O diferencial é a **Clara**, assistente virtual com IA que conversa naturalmente com visitantes, entende suas necessidades jurídicas e agenda consultorias diretamente no Google Calendar do advogado.

### ✨ Destaques

| Recurso | Descrição |
|---------|-----------|
| 🤖 **Assistente IA** | Clara usa Gemini 2.5 Flash para conversas naturais em português |
| 📅 **Agendamento Automático** | Integração com Google Calendar via Service Account |
| 🎙️ **Entrada por Voz** | Transcrição de áudio em tempo real com Whisper |
| 📱 **Design Responsivo** | Interface fluida do mobile ao desktop |
| ⚡ **Performance** | SSR com Next.js 16 e otimização de imagens |
| ♿ **Acessibilidade** | Conformidade WCAG AA, skip links e foco visível |
| 🔒 **Conformidade** | LGPD e normas da OAB respeitadas |

---

## 👨‍💻 Sobre o Desenvolvedor

<div align="center">

**Desenvolvido por Rafael Vieira (TechBeme)**

[![GitHub](https://img.shields.io/badge/GitHub-TechBeme-181717?logo=github)](https://github.com/TechBeme)
[![Fiverr](https://img.shields.io/badge/Fiverr-Tech__Be-1DBF73?logo=fiverr)](https://www.fiverr.com/tech_be)
[![Upwork](https://img.shields.io/badge/Upwork-Profile-14a800?logo=upwork)](https://www.upwork.com/freelancers/~01f0abcf70bbd95376)
[![Email](https://img.shields.io/badge/Email-contact@techbe.me-EA4335?logo=gmail)](mailto:contact@techbe.me)

**Desenvolvedor Full-Stack & Especialista em Automação com IA**

Especializado em **web scraping**, **sistemas de automação**, **aplicações web modernas** e **integrações de IA**.

### 💼 Principais Competências

- 🔍 Web Scraping & Extração de Dados
- ⚡ Automação de Processos & Workflows
- 💻 Desenvolvimento Full-Stack (Next.js, React, Python, TypeScript)
- 🤖 Integrações de IA (OpenAI, Anthropic, Google Gemini, sistemas RAG)
- 📊 Design & Otimização de Bancos de Dados
- 🎨 Desenvolvimento de UI/UX Modernas

### 🌍 Idiomas

🇺🇸 **Inglês** • 🇧🇷 **Português** • 🇪🇸 **Espanhol**

### 📬 Contato

**Email**: [contact@techbe.me](mailto:contact@techbe.me)

</div>

---

## 🚀 Funcionalidades

### 🤖 Assistente Virtual Clara

A Clara é uma assistente conversacional que:

- **Acolhe** o visitante e entende sua situação jurídica
- **Coleta** informações (nome, WhatsApp, preferência de atendimento)
- **Consulta** a agenda do Dr. Rafael em tempo real
- **Agenda** consultorias respeitando regras de negócio:
  - ⏰ Horário comercial: 9h-12h e 13h-18h (Brasília)
  - 📆 Apenas dias úteis (sem feriados nacionais)
  - ⏳ Mínimo 24h de antecedência
  - 🕐 Consultas de 1 hora com 15 min de intervalo

```
📱 Usuário: "Preciso de ajuda com um contrato"
🤖 Clara: "Olá! Posso ajudar sim. Contratos é uma das 
    especialidades do Dr. Rafael. Me conta um pouco 
    mais: é elaboração de um novo contrato ou revisão 
    de um existente?"
```

### 🎙️ Transcrição de Voz

- Gravação de áudio diretamente no chat
- Transcrição via API Whisper (Google)
- Conversão automática para texto
- Experiência mobile-first

### 📄 Seções da Landing Page

| Seção | Conteúdo |
|-------|----------|
| **Hero** | Apresentação com credenciais (UFMG, Defensoria Pública, DAJ) |
| **Áreas de Atuação** | Direito Civil, Consumidor e Família com tópicos detalhados |
| **Sobre** | Trajetória profissional e diferencial do atendimento |
| **Processo** | Como funciona o atendimento em 4 etapas |
| **FAQ** | Perguntas frequentes em acordeão |
| **Contato** | Formulário validado + integração WhatsApp |

### 📧 Sistema de Contato

- Validação de campos com Zod
- Envio via SMTP (Nodemailer)
- Feedback visual de sucesso/erro
- Fallback para log em desenvolvimento

---

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.0.7 | Framework React com App Router |
| React | 19.2.1 | Biblioteca de UI |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | 3.4 | Estilização utility-first |
| Motion | 12.x | Animações fluidas |
| React Icons | 5.5 | Ícones (Feather + Font Awesome) |

### Backend & IA
| Tecnologia | Uso |
|------------|-----|
| Vercel AI SDK | Streaming de IA e tool calling |
| Google Gemini 2.5 Flash | Modelo de linguagem da Clara |
| Google Calendar API | Leitura e criação de eventos |
| Nodemailer | Envio de e-mails SMTP |

### Qualidade
| Ferramenta | Uso |
|------------|-----|
| ESLint | Linting de código |
| Prettier | Formatação consistente |
| Zod | Validação de schemas |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Landing   │  │   Chat      │  │   Formulário        │  │
│  │   Page      │  │   Popup     │  │   de Contato        │  │
│  └─────────────┘  └──────┬──────┘  └──────────┬──────────┘  │
│                          │                     │             │
└──────────────────────────┼─────────────────────┼─────────────┘
                           │                     │
                           ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      API ROUTES                              │
│  ┌──────────────────────┐      ┌───────────────────────┐    │
│  │  /api/assistente     │      │  /api/contato         │    │
│  │  ├── POST (chat)     │      │  └── POST (email)     │    │
│  │  └── /transcribe     │      └───────────────────────┘    │
│  └──────────┬───────────┘                                   │
│             │                                                │
│             ▼                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              TOOL CALLING (AI SDK)                    │   │
│  │   ┌─────────────┐          ┌─────────────────┐       │   │
│  │   │ ver_agenda  │          │    agendar      │       │   │
│  │   │ (leitura)   │          │  (criação)      │       │   │
│  │   └──────┬──────┘          └────────┬────────┘       │   │
│  └──────────┼─────────────────────────┼─────────────────┘   │
│             │                          │                     │
└─────────────┼──────────────────────────┼─────────────────────┘
              │                          │
              ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVIÇOS EXTERNOS                         │
│  ┌─────────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Google Gemini   │  │   Google    │  │   SMTP          │  │
│  │ 2.5 Flash       │  │  Calendar   │  │  (Fastmail)     │  │
│  └─────────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Google Cloud (para Calendar API)
- Chave de API do Google Gemini

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/TechBeme/advrafael.git
cd advrafael

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:4000** 🚀

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# ═══════════════════════════════════════════════════════════
# SITE
# ═══════════════════════════════════════════════════════════
NEXT_PUBLIC_SITE_URL=https://advrafael.com.br

# ═══════════════════════════════════════════════════════════
# INTELIGÊNCIA ARTIFICIAL (Gemini)
# ═══════════════════════════════════════════════════════════
GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_gemini

# ═══════════════════════════════════════════════════════════
# GOOGLE CALENDAR (Service Account)
# ═══════════════════════════════════════════════════════════
GOOGLE_CALENDAR_ID=seu_calendario@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=service@projeto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# ═══════════════════════════════════════════════════════════
# EMAIL (SMTP)
# ═══════════════════════════════════════════════════════════
SMTP_HOST=smtp.fastmail.com
SMTP_PORT=465
SMTP_USER=contato@advrafael.com.br
SMTP_PASS=sua_senha_de_app
SMTP_SECURE=true
MAIL_FROM="Dr. Rafael Vieira <contato@advrafael.com.br>"
MAIL_TO=contato@advrafael.com.br
```

### Configurando o Google Calendar

1. **Crie um projeto** no [Google Cloud Console](https://console.cloud.google.com/)
2. **Ative a API** do Google Calendar
3. **Crie uma Service Account**:
   - Vá em "IAM & Admin" → "Service Accounts"
   - Clique em "Create Service Account"
   - Baixe a chave JSON
4. **Compartilhe o calendário**:
   - No Google Calendar, vá em Configurações do calendário
   - Em "Compartilhar com pessoas específicas", adicione o email da Service Account
   - Dê permissão de "Fazer alterações nos eventos"
5. **Configure as variáveis**:
   - `GOOGLE_CALENDAR_ID`: ID do calendário (encontre em Configurações)
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Campo `client_email` do JSON
   - `GOOGLE_SERVICE_ACCOUNT_KEY`: Campo `private_key` do JSON

---

## 🚀 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TechBeme/advrafael)

1. Clique no botão acima ou importe manualmente
2. Configure as variáveis de ambiente no painel da Vercel
3. O build acontece automaticamente a cada push

### Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento (localhost:4000)
npm run build    # Build de produção
npm run start    # Serve o build
npm run lint     # Verifica erros de lint
npm run format   # Formata o código
```

---

## 📁 Estrutura do Projeto

```
advrafael/
├── app/                          # App Router (Next.js 16)
│   ├── (site)/                   # Grupo de rotas públicas
│   │   ├── page.tsx              # Landing page principal
│   │   └── politica-de-privacidade/
│   ├── api/                      # API Routes
│   │   ├── assistente/           # Chat IA + Transcrição
│   │   │   ├── route.ts          # Streaming de mensagens
│   │   │   └── transcribe/       # Whisper API
│   │   └── contato/              # Envio de e-mail
│   ├── layout.tsx                # Layout raiz
│   ├── robots.ts                 # robots.txt dinâmico
│   └── sitemap.ts                # sitemap.xml dinâmico
│
├── components/
│   ├── chat/                     # ChatPopup (Clara)
│   ├── layout/                   # LandingNavbar, PageHeader
│   ├── motion/                   # FadeIn, Parallax, CountUp
│   ├── sections/                 # Hero, Areas, About, FAQ...
│   └── ui/                       # Button, Card, Badge, Section
│
├── lib/
│   ├── assistant/                # Google Calendar + Scheduling
│   ├── mailer.ts                 # Nodemailer config
│   ├── seo.ts                    # Metadata helpers
│   ├── utils.ts                  # cn(), helpers
│   └── validations.ts            # Schemas Zod
│
├── public/
│   ├── fonts/                    # Playfair Display, Source Sans
│   └── images/                   # Logos, fotos
│
└── styles/
    └── globals.css               # Tailwind + Custom properties
```

---

## 🎨 Design System

### Paleta de Cores

| Token | Cor | Uso |
|-------|-----|-----|
| `--color-accent` | `#0ea5e9` | CTAs, links, destaques |
| `--color-surface` | `#fafaf9` | Fundos de cards |
| `--color-background` | `#f5f5f4` | Fundo geral |
| `--color-stone-900` | `#1c1917` | Textos principais |

### Tipografia

- **Display**: Playfair Display (headings)
- **Body**: Source Sans 3 (parágrafos)

### Componentes Principais

- **Button**: 4 variantes (primary, secondary, ghost, link)
- **Card**: Superfície com hover elevado
- **Badge**: Labels categorizadas
- **Section**: Container com padding responsivo

---

## 📝 Licença

Este projeto é **código proprietário** e está protegido por direitos autorais.

**Restrições:**
- ❌ Modificação não autorizada
- ❌ Uso comercial sem permissão
- ❌ Redistribuição
- ❌ Sublicenciamento

Para uso autorizado, entre em contato: [contact@techbe.me](mailto:contact@techbe.me)

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🛡️ Aviso Legal

Este software é fornecido "como está", sem garantias de qualquer tipo. O desenvolvedor não se responsabiliza por danos diretos ou indiretos resultantes do uso deste código.

---

<div align="center">

**Desenvolvido com ⚖️ por [Rafael Vieira (TechBeme)](https://github.com/TechBeme)**

[![GitHub](https://img.shields.io/badge/GitHub-TechBeme-181717?logo=github)](https://github.com/TechBeme)
[![Email](https://img.shields.io/badge/Email-contact@techbe.me-EA4335?logo=gmail)](mailto:contact@techbe.me)

© 2026 Rafael Vieira. Todos os direitos reservados.

</div>

Componentes reutilizáveis em `components/ui/`:

```tsx
<Button variant="primary" size="lg">Agendar Consultoria</Button>
<Card variant="elevated">...</Card>
<Badge variant="accent">Destaque</Badge>
<Section id="areas" variant="light">...</Section>
```

---

## 📞 Contato & Autor

<div align="center">

**Desenvolvido por Rafael Vieira**

[![GitHub](https://img.shields.io/badge/GitHub-TechBeme-181717?logo=github)](https://github.com/TechBeme)
[![Fiverr](https://img.shields.io/badge/Fiverr-Tech__Be-1DBF73?logo=fiverr)](https://www.fiverr.com/tech_be)
[![Upwork](https://img.shields.io/badge/Upwork-Profile-14a800?logo=upwork)](https://www.upwork.com/freelancers/~01f0abcf70bbd95376)
[![Email](https://img.shields.io/badge/Email-contact@techbe.me-EA4335?logo=gmail)](mailto:contact@techbe.me)

### 🚀 Precisa de um projeto similar?

Desenvolvo soluções completas com **Next.js**, **IA conversacional**, 
**automações** e **integrações**. Entre em contato para um orçamento!

</div>

---

<div align="center">

**⚖️ Este projeto foi desenvolvido respeitando as normas da OAB e a LGPD.**

Feito com ❤️ em Belo Horizonte, Brasil

</div>
