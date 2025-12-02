---

description: "Task list for feature implementation"
---

# Tasks: Site institucional Rafael Vieira

**Input**: plan.md e spec.md em `specs/001-site-institucional/`  
**Prerequisites**: Constituição atual (ética OAB/LGPD), plano técnico aprovado

## Fase 1: Setup do projeto e infraestrutura

- [x] T001 Criar app Next.js (App Router, TS, Tailwind) com `npm create next-app` (Files: package.json, next.config.js, tsconfig.json, app/, styles/globals.css, tailwind.config.js) — Aceite: projeto roda com `npm run dev`.
- [x] T002 Configurar ESLint/Prettier (Next + Tailwind + A11y) e scripts `lint`, `test`, `build` (Files: package.json scripts, .eslintrc, prettier config) — Aceite: `npm run lint` passa.
- [x] T003 Configurar Vitest + Testing Library e setup de tests (Files: vitest.config.ts, jest-dom setup, tsconfig paths) — Aceite: teste de smoke inicial passa.
- [x] T004 Adicionar Playwright opcional para smoke e2e (Files: package.json scripts, playwright.config.ts) — Aceite: `npm run test:e2e` roda stub de home.
- [x] T005 Criar estrutura de pastas base (app/(site)/, app/api/contato, components/ui|layout|content, lib, content/artigos, content/faq, public/images) — Aceite: pastas e arquivos placeholder criados.

## Fase 2: Layout base e navegação

- [x] T010 Definir tokens de design (cores, tipografia via next/font, espaçamentos) e Tailwind config (Files: tailwind.config.js, styles/globals.css) — Aceite: classes utilitárias disponíveis e cores documentadas.
- [x] T011 Criar layout base `app/(site)/layout.tsx` com skip link, header, footer, aviso informativo (Files: app/(site)/layout.tsx, components/layout/Header.tsx, Footer.tsx) — Aceite: layout renderiza em / com navegação funcional.
- [x] T012 Implementar componente de navegação e CTA (WhatsApp/e-mail) respeitando OAB (Files: components/layout/NavBar.tsx) — Aceite: links corretos, sem linguagem mercantilista.
- [x] T013 Criar componentes de UI (Button variants, Card, Section/Container, Badge, Input/Textarea, Alert) (Files: components/ui/*) — Aceite: stories/preview manual mostram estados foco/hover.
- [x] T014 Criar páginas vazias com heading semântico: home, sobre, areas, artigos, faq, contato, política (Files: app/(site)/*/page.tsx) — Aceite: rotas acessíveis sem erro.

## Fase 3: Páginas de conteúdo estático

- [x] T020 Implementar Home com hero (foto), resumo, CTAs, destaques de áreas e artigos em destaque (Files: app/(site)/page.tsx, components/content/HomeHero.tsx) — Aceite: carrega sem dados dinâmicos; CTAs visíveis.
- [x] T021 Implementar página Sobre com biografia, formação, missão/valores em tom sóbrio (Files: app/(site)/sobre/page.tsx, content data) — Aceite: texto em pt-BR, sem promessas; **requere aprovação do advogado**.
- [x] T022 Implementar página Áreas (Cível, Consumidor) com cards de situações típicas (Files: app/(site)/areas/page.tsx, content/areas.ts) — Aceite: exemplos claros sem prometer resultado.
- [x] T023 Implementar FAQ com itens estáticos e aviso de caráter geral (Files: app/(site)/faq/page.tsx, content/faq.ts) — Aceite: aviso visível; **requere aprovação do advogado** para perguntas/respostas.
- [x] T024 Implementar Política de Privacidade/avisos legais (Files: app/(site)/politica-de-privacidade/page.tsx) — Aceite: texto explica uso de dados, ausência de vínculo; **requere aprovação do advogado**.

## Fase 4: Módulo de artigos

- [x] T030 Definir schema de artigos (zod) e loader de conteúdo MDX (Files: lib/content.ts, content/artigos/*.mdx, types) — Aceite: loader retorna lista ordenada e valida metadados.
- [x] T031 Criar página de listagem de artigos com resumo/data e suporte a destaque (Files: app/(site)/artigos/page.tsx, components/content/ArticleList.tsx) — Aceite: renderiza mock de 2 artigos, aviso informativo no topo/rodapé.
- [x] T032 Criar página de detalhe `[slug]` com breadcrumbs, aviso informativo, CTA discreto (Files: app/(site)/artigos/[slug]/page.tsx) — Aceite: renderiza MDX, retorna 404 amigável se slug inexistente.
- [x] T033 Adicionar layout MDX (tipografia, code blocks se usados) (Files: components/content/Prose.tsx, styles) — Aceite: leitura confortável, contraste adequado.

## Fase 5: Contato e formulário

- [x] T040 Implementar UI do formulário (nome, e-mail, telefone/WhatsApp, motivo, mensagem) com validação cliente (zod) (Files: app/(site)/contato/page.tsx, components/ui/FormControls) — Aceite: erros de validação exibidos inline.
- [x] T041 Implementar API route `/api/contato` com validação servidor (zod), sanitização e respostas 200/400/500 (Files: app/api/contato/route.ts, lib/validations.ts) — Aceite: retorna 400 para payload inválido.
- [x] T042 Criar mailer/log stub configurável por env (Files: lib/mailer.ts) — Aceite: em dev loga com segurança; em prod usa env para transporte (a definir).
- [x] T043 Tratar erros e mostrar mensagens de sucesso/falha; fallback para WhatsApp/e-mail (Files: app/(site)/contato/page.tsx) — Aceite: estados de carregamento e erro cobertos.
- [x] T044 Revisar textos do formulário e avisos de privacidade/LGPD (Files: app/(site)/contato/page.tsx) — Aceite: linguagem informativa; **requere aprovação do advogado**.

## Fase 6: SEO, acessibilidade e refinamentos

- [x] T050 Configurar metadata default no layout (title/description OG padrão) e por página (Files: app/(site)/layout.tsx, page metadata exports) — Aceite: metadados exibidos conforme spec.
- [x] T051 Adicionar og:image default e ajustar `next-sitemap`/rotas de sitemap/robots (Files: public/og-default.jpg, app/sitemap.ts, app/robots.ts) — Aceite: sitemap gera URLs principais.
- [x] T052 Garantir headings hierárquicos, alt text em imagens, foco visível, contraste AA (Files: componentes e pages) — Aceite: checagem manual + `axe` sem violações críticas.
- [x] T053 Implementar checagem de termos proibidos (regex) em conteúdo de artigos/áreas/faq (Files: lib/content.ts ou lint script) — Aceite: build falha se termos bloqueados aparecem.

## Fase 7: Testes, ajustes finais e deploy

- [x] T060 Tests unit/component: loaders de conteúdo, componentes UI críticos, layout (Files: tests/unit, tests/components) — Aceite: vitest passa.
- [x] T061 Tests e2e smoke: abrir home, listar artigos, abrir artigo, enviar contato (mock) (Files: tests/e2e) — Aceite: playwright passa em dev ou preview.
- [ ] T062 Revisão de acessibilidade manual (navegação teclado, mobile viewport) e performance em rede lenta (Files: n/a, uso de devtools) — Aceite: sem bloqueios; imagens otimizadas.
- [ ] T063 Revisão de conteúdo sensível (sobre, áreas, FAQ, política, avisos) com aprovação do advogado (Files: páginas de conteúdo) — Aceite: **requere aprovação do advogado** documentada.
- [x] T064 Rodar `npm run lint`, `npm run test`, `npm run build` (Files: n/a) — Aceite: todos passam.
- [ ] T065 Preparar deploy na Vercel: configurar projeto, variáveis de mailer (se usadas), verificar preview (Files: Vercel dashboard, .env.example) — Aceite: preview build ok e fluxos principais funcionam.

## Notas

- Todas as tarefas devem respeitar: OAB (sem promessas, sem linguagem mercantilista), avisos informativos, LGPD (coleta mínima, finalidade clara), UX sóbria em português.
- Tarefas marcadas como “requere aprovação do advogado” precisam de revisão explícita antes de publicar.
