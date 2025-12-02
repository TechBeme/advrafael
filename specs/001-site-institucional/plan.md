# Implementation Plan: Site institucional Rafael Vieira

**Branch**: `001-site-institucional` | **Date**: 2025-12-02 | **Spec**: specs/001-site-institucional/spec.md  
**Input**: Feature specification from `/specs/001-site-institucional/spec.md`

**Note**: Este template é preenchido manualmente seguindo `/speckit.plan`. Constitution Check deve ser atendido antes de iniciar execução.

## Summary

Site institucional em Next.js (App Router) e TypeScript para o advogado Rafael Vieira (BH/MG), com páginas institucionais (Home, Sobre, Áreas, Artigos, FAQ, Contato, Política de Privacidade), foco em ética OAB, UX sóbria em português, responsividade mobile-first e formulários seguros/LGPD. Conteúdo editorial em Markdown/MDX com SSG/ISR; formulário com validação cliente/servidor e fallback de contato via WhatsApp/e-mail.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js (App Router) na versão estável mais recente, React estável compatível  
**Primary Dependencies**: Next.js (inclui React/React-DOM); estilização com Tailwind CSS; ícones opcionais via @heroicons/react (se necessário)  
**Storage**: Sem banco; conteúdo em arquivos Markdown/MDX versionados; submissões de contato enviadas via API route com transporte de e-mail/log (configurável)  
**Testing**: Vitest + @testing-library/react para unidades/integração de componentes; Playwright para e2e leve das rotas principais  
**Target Platform**: Vercel (SSG/ISR para páginas, API routes em serverless)  
**Project Type**: Web (App Router)  
**Performance Goals**: Home em ≤2s (3G simulado), LCP baixo com imagens otimizadas; payload inicial leve  
**Constraints**: Sem edição manual de package.json (usar npm/npx); dependências mínimas; conteúdo informativo sem promessas; design system simples; mobile-first  
**Scale/Scope**: Baixo volume, leitura pública + formulários simples

## Constitution Check

- Conformidade OAB: conteúdo estritamente informativo (sem promessas de resultado, sem linguagem mercantilista/comparativa, sem depoimentos inadequados ou casos identificáveis) e avisos claros de que nada substitui consulta jurídica.
- UX/Acessibilidade: texto em português claro para leigos, visual sóbrio de escritório de advocacia, responsivo/mobile-first, headings semânticos, contraste e navegação por teclado.
- Stack/Build: Next.js + TypeScript em versões estáveis; dependências instaladas via npm/npx (não editar package.json manualmente); design system simples aplicado (cores, tipografia, espaçamentos, botões/cards).
- Segurança/LGPD: formulários coletam apenas dados mínimos para contato, informam finalidade/uso/retorno; entradas sanitizadas; proteção contra XSS/CSRF; evitar armazenamento de dados sensíveis.
- Qualidade/Testes: separação de layout/conteúdo/lógica; cada rota/componente crítico acompanhado de teste automatizado ou verificação manual descrita; execução local simples (`npm install` + comando único de start) e preparada para Vercel.

## Project Structure

```text
app/                       # App Router
├── (site)/                # Rotas públicas
│   ├── layout.tsx         # Layout base (header/footer, avisos informativos)
│   ├── page.tsx           # Home (hero, áreas, destaques)
│   ├── sobre/page.tsx
│   ├── areas/page.tsx
│   ├── artigos/
│   │   ├── page.tsx       # Lista
│   │   └── [slug]/page.tsx# Detalhe
│   ├── faq/page.tsx
│   ├── contato/page.tsx
│   ├── politica-de-privacidade/page.tsx
│   └── manifesto-oab.tsx? # Aviso/ética se necessário
├── api/
│   └── contato/route.ts   # POST formulário (validação + envio)
components/
├── ui/                    # Design system: Button, Card, Section, Badge, Heading, Input/Textarea, Alert
├── layout/                # Header, Footer, Nav, PageShell, CTA strip
├── content/               # Blocks para áreas, artigos, faq list
content/
├── artigos/               # *.mdx com metadados (slug, title, description, date, tags, destaque)
└── faq/                   # faq.yml ou faq.ts para itens
lib/
├── content.ts             # loaders Markdown/MDX, schema zod
├── seo.ts                 # helpers de metadata Open Graph
├── validations.ts         # zod schemas de formulário
└── mailer.ts              # wrapper de envio/log (stub configurável)
public/
├── images/rafael.jpg      # foto otimizada
├── og-default.jpg
└── favicon.ico
styles/
└── globals.css            # Tailwind + tokens
tests/
├── unit/                  # helpers/lib
├── components/            # ui/layout
├── pages/                 # render de rotas principais com Testing Library
└── e2e/                   # Playwright smoke (home, artigos, contato)
```

**Structure Decision**: App Router com conteúdo em arquivos Markdown/MDX sob `content/`, rotas públicas em `app/(site)/`, API de contato em `app/api/contato/route.ts`, design system em `components/ui`. SSG/ISR para rotas informativas; API serverless apenas para envio de formulários.

## 1. Visão Geral e Estratégia de Renderização
- Páginas institucionais, artigos e FAQ servidos via SSG com revalidate (ISR) para manter performance e permitir atualização de conteúdo.  
- Artigos em MDX com frontmatter (slug, title, description, date, tags, destaque, ogImage opcional).  
- Areas/FAQ em dados estáticos (TS/JSON/YAML) carregados em build; sem CMS externo.  
- API route apenas para contato (POST), sem persistência local (envio por e-mail ou log).

## 2. Camada de Apresentação (UI/Design System)
- Estilização: Tailwind CSS (tokens em `globals.css` + `tailwind.config.js`).  
- Paleta sóbria (exemplo): `--bg: #0f172a`, `--surface: #111827`, `--card: #f8fafc`, `--primary: #1f2937`, `--accent: #0ea5e9`, `--text: #0b1220`, com estados de foco/hover claros.  
- Tipografia: fonte serif para headings (ex.: "Playfair Display" ou similar), sans-serif legível para corpo (ex.: "Inter" ou equivalente), ambos via `next/font`.  
- Componentes básicos: Button (variants primary/ghost), Card, Section/Container, PageHeader, Badge, ListItem, CTA strip, Form controls (Input, Textarea, Select), Alert.  
- Responsividade: grid flexível com breakpoints Tailwind; imagens com `next/image` e tamanhos otimizados; prioridade mobile-first.  
- Acessibilidade: headings semânticos, `aria-label` em botões de contato, foco visível, contraste AA, labels associados a inputs, skip link no topo.

## 3. Dados e Conteúdo
- **Áreas de atuação**: array estático em `content/areas.ts` (slug, título, descrição curta, tópicos). Render em "Áreas" e destaques na Home.  
- **Artigos**: arquivos `content/artigos/*.mdx` com metadados; loader em `lib/content.ts` com schema zod; gerar lista ordenada por data, com flag `featured` para homepage.  
- **FAQ**: `content/faq.ts` ou YAML parseado; campos: pergunta, resposta, categoria opcional.  
- **Avisos**: componente `InformationalNotice` para reforço OAB/LGPD no rodapé de artigos, FAQ e formulário.

## 4. Funcionalidades por Página
- **Home**: hero com foto/resumo, CTAs (Contato/WhatsApp), blocos de áreas, artigos destacados, faixa de credibilidade/BH-MG.  
- **Sobre**: biografia, formação, experiência, missão/valores, foto, CTA discreta.  
- **Áreas**: seções Cível e Consumidor com cards de situações típicas; link para contato.  
- **Artigos**: lista paginada simples ou ordenada; detalhe com aviso informativo, breadcrumbs, navegação para artigos relacionados.  
- **FAQ**: lista de perguntas/respostas; aviso de caráter geral.  
- **Contato**: formulário com validação, canais diretos (e-mail, WhatsApp), mensagem de confirmação; mostrar região atendida (BH/MG).  
- **Política de Privacidade**: texto claro sobre coleta/uso de dados do formulário e ausência de vínculo advogado-cliente pelo envio.

## 5. Formulário de Contato
- Cliente: validação com zod + react-hook-form (opcional) ou validação própria leve; campos obrigatórios (nome, e-mail, telefone/WhatsApp, motivo, mensagem).  
- Servidor: API POST `/api/contato` valida payload com zod, sanitiza textos, limita tamanho, responde 200/400/500.  
- Entrega: stub de mailer que pode enviar via serviço (configurável por env) ou registrar log seguro; nunca persiste dados desnecessários.  
- Erros: mensagens amigáveis; fallback com links diretos de e-mail/WhatsApp.  
- Segurança: rate limiting simples (middleware) se necessário; CSRF mitigado por mesma origem e reCAPTCHA opcional futura (documentar).

## 6. SEO e Metadados
- Usar Metadata API do App Router para títulos, descrições e Open Graph/og:image por página; default em `app/(site)/layout.tsx`.  
- URLs amigáveis: `/sobre`, `/areas`, `/artigos/[slug]`, `/faq`, `/contato`, `/politica-de-privacidade`.  
- Headings hierárquicos (h1 por página, h2 para seções).  
- Sitemap/robots via rotas `app/sitemap.ts` e `app/robots.txt` automáticas do Next.  
- Preview social: og:image padrão em `public/og-default.jpg`; opcional gerar imagem estática por artigo (placeholder inicial).

## 7. Testes e Qualidade
- Lint/Format: ESLint (Next + Tailwind + accessibility), Prettier.  
- Unit/Component: Vitest + @testing-library/react (componentes ui/layout, lib content loaders).  
- E2E: Playwright smoke (home render, listar artigos, abrir artigo, submeter contato com sucesso/erro).  
- Acessibilidade: checagens básicas com `@testing-library/jest-dom` e `axe-core` opcional em testes de componentes críticos.  
- Checar termos proibidos: utilitário de lint de conteúdo (regex simples) ao carregar/artigos.

## 8. Segurança e LGPD
- Coletar apenas dados mínimos; informar finalidade e ausência de relação contratual no formulário e política.  
- Sanitizar inputs; limitar tamanho; remover HTML não confiável; usar `Content-Security-Policy` básica (sem inline perigoso).  
- Não armazenar dados sensíveis; logs minimizados e, se usados, sem incluir mensagem completa em produção.  
- Cookies não necessários inicialmente; se adicionados (analytics consentido), documentar base legal.

## 9. Fluxo de Desenvolvimento e Deploy
- Comandos: `npm install`; `npm run dev`; `npm run lint`; `npm run test` (vitest); `npm run test:e2e` (playwright, opcional); `npm run build` (Next).  
- Branching: `001-site-institucional` seguindo padrão numérico; PRs documentam validação (lint + testes).  
- Deploy: conectar repositório na Vercel, apontar build `npm run build`, usar preview per-PR; proteger variável de mailer.  
- Pré-deploy checks: lint, vitest, build; opcional smoke de Playwright em preview.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| _None_ | | |
