# advrafael

Aplicação Next.js 16 (App Router) com TypeScript e Tailwind para o site institucional de Rafael Vieira (Direito Cível e do Consumidor), com conteúdo informativo, formulário de contato validado e avisos de conformidade OAB/LGPD.

## Requisitos
- Node.js 18+ e npm.

## Instalação e scripts
- `npm install`
- `npm run dev` — inicia em `http://localhost:4000` (Playwright usa essa porta para e2e)
- `npm run lint` — ESLint (Next + Tailwind + acessibilidade)
- `npm run test` — Vitest (unitário/componente)
- `npm run test:e2e` — Playwright (smoke das rotas + checagem axe em `tests/e2e/accessibility.spec.ts`)
- `npm run build` — build de produção
- `npm run start` — serve o build gerado

## Variáveis de ambiente
Defina em `.env.local` (veja `.env.example`):
- `NEXT_PUBLIC_SITE_URL` — URL canônica (ex.: `https://advrafael.com.br`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` — transporte SMTP opcional
- `MAIL_FROM`, `MAIL_TO` — remetente/destino do formulário

Sem SMTP configurado, o mailer faz log seguro em modo dev/preview.

## Qualidade e testes
- Lint cobre padrões Next/Tailwind/A11y.
- Vitest: loaders de conteúdo e componentes principais (`tests/unit`, `tests/components`).
- Playwright: fluxo smoke (home, artigos, contato) e varredura axe (home e contato).
- Build de produção: `next build --webpack` (já executado por `npm run build`).

## Deploy na Vercel
1. Importar o repositório na Vercel e apontar build para `npm run build` (instalação padrão `npm install`).
2. Definir envs acima no projeto/preview.
3. Habilitar domínio e preview; validar páginas públicas, navegação, artigos e envio de contato (com SMTP real ou log).
4. Mantendo `NEXT_PUBLIC_SITE_URL` atualizado, os metadados/canonical ficam corretos.

## Acessibilidade e conteúdo
- Skip link e foco visível global; navegação mobile com `aria-expanded`/`aria-controls`.
- Paleta ajustada para contraste AA (highlight e avisos de warning revistos).
- Imagem principal com `alt` descritivo; headings hierárquicos por página.
- Axe sem violações críticas em home e contato (`tests/e2e/accessibility.spec.ts`).
- Textos de Sobre/FAQ/Política/Contato seguem tom informativo e ainda exigem aprovação formal do advogado antes de publicar.
