# Implementation Plan: Landing Page Premium - Rafael Souza Vieira

**Branch**: `001-site-institucional` | **Date**: 2025-12-02 | **Updated**: 2025-12-03  
**Spec**: specs/001-site-institucional/spec.md  
**Input**: Redesign completo para landing page única, moderna e de alta conversão

**Note**: Este plano foi atualizado para refletir a nova direção: landing page única com foco em design premium, animações modernas e conversão através de autoridade e confiança.

## Summary

Landing page única e moderna em Next.js (App Router) e TypeScript para o advogado Rafael Souza Vieira (BH/MG), com design premium dark mode, animações Framer Motion, seções de credenciais de elite (UFMG, CEFET-MG, OAB 9,60/10), áreas de atuação (Cível e Consumidor), FAQ interativo e formulário de contato. Foco em transmitir autoridade, competência e confiança através de neuromarketing e técnicas de UX modernas.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js (App Router) versão estável, React 19  
**Primary Dependencies**: 
- Next.js (App Router + React 19)
- Tailwind CSS (design tokens premium)
- Framer Motion (animações sofisticadas)
- React Icons (iconografia)
- Zod + React Hook Form (validação)
- clsx + tailwind-merge (utilidades CSS)

**Storage**: Sem banco; conteúdo estático em TypeScript; formulário via API route  
**Testing**: Vitest + Testing Library (componentes); Playwright (e2e)  
**Target Platform**: Vercel (SSG para landing, API serverless para contato)  
**Project Type**: Landing Page Premium (Single Page)  
**Performance Goals**: Lighthouse ≥ 90, LCP < 2.5s, CLS < 0.1  
**Constraints**: Conformidade OAB, linguagem informativa, mobile-first, LGPD  
**Scale/Scope**: Página única de alta conversão

## Constitution Check

- Conformidade OAB: conteúdo informativo, sem promessas de resultado ou linguagem mercantilista
- UX Premium: design escuro sofisticado, animações suaves, responsivo mobile-first
- Autoridade: destaque para credenciais (UFMG, CEFET-MG, OAB 9,60/10)
- Segurança/LGPD: formulário com coleta mínima, finalidade clara
- Performance: imagens otimizadas, lazy loading, code splitting

## Project Structure (Atualizada)

```text
app/
├── layout.tsx              # Layout raiz com fonts e metadata
├── page.tsx                # Landing page única (todas as seções)
├── robots.ts               # Configuração SEO
├── sitemap.ts              # Sitemap automático
├── api/
│   └── contato/route.ts    # POST formulário (validação + envio)
components/
├── sections/               # Seções da landing page
│   ├── HeroSection.tsx     # Hero com foto, headline, CTAs
│   ├── CredentialsSection.tsx  # Cards de credenciais animados
│   ├── AreasSection.tsx    # Áreas de atuação com hover effects
│   ├── AboutSection.tsx    # Sobre/Trajetória com timeline
│   ├── ProcessSection.tsx  # Como funciona (3 passos)
│   ├── FAQSection.tsx      # Accordion interativo
│   ├── ContactSection.tsx  # Formulário + WhatsApp
│   └── FooterSection.tsx   # Footer minimal
├── ui/                     # Design system atualizado
│   ├── Button.tsx          # Botões com gradiente dourado
│   ├── Card.tsx            # Cards com glassmorphism
│   ├── Badge.tsx           # Badges elegantes
│   ├── Input.tsx           # Inputs com focus dourado
│   ├── Textarea.tsx        # Textarea estilizado
│   ├── Accordion.tsx       # FAQ accordion animado
│   ├── ScrollIndicator.tsx # Indicador de scroll animado
│   └── FloatingWhatsApp.tsx # Botão flutuante WhatsApp
├── layout/                 # Componentes de layout
│   ├── Container.tsx       # Container responsivo
│   └── Section.tsx         # Wrapper de seção
└── motion/                 # Componentes de animação
    ├── FadeIn.tsx          # Fade com slide
    ├── StaggerChildren.tsx # Stagger em listas
    ├── Parallax.tsx        # Efeito parallax
    └── CountUp.tsx         # Números animados
content/
├── credentials.ts          # Dados das credenciais
├── areas.ts                # Áreas de atuação
├── faq.ts                  # Perguntas frequentes
└── contact.ts              # Informações de contato
lib/
├── validations.ts          # Schemas Zod
├── mailer.ts               # Envio de e-mail
├── seo.ts                  # Helpers de metadata
└── utils.ts                # Utilidades (cn, etc)
public/
├── images/
│   ├── 1.jpeg              # Foto hero (escritório luxuoso)
│   ├── 21.jpeg             # Foto close-up
│   └── og-image.jpg        # Open Graph image
└── fonts/                  # Fontes locais
styles/
└── globals.css             # Tailwind + tokens dark mode
tests/
├── components/             # Testes de componentes
└── e2e/                    # Testes end-to-end
```

## Design System Premium

### 1. Paleta de Cores (Dark Mode)
```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0b;
  --bg-secondary: #111113;
  --bg-tertiary: #1a1a1d;
  --bg-elevated: #222225;
  
  /* Accent - Dourado Elegante */
  --accent-gold: #c9a66c;
  --accent-gold-light: #e0c088;
  --accent-gold-dark: #a88a52;
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a0a0a5;
  --text-muted: #6b6b70;
  
  /* Borders */
  --border-default: #2a2a2d;
  --border-subtle: #1f1f22;
  
  /* Semantic */
  --success: #22c55e;
  --error: #ef4444;
}
```

### 2. Tipografia
- **Display**: Playfair Display (serif) - headings, números grandes
- **Body**: Source Sans 3 (sans-serif) - texto, UI
- **Scale**: clamp() para responsividade fluida

### 3. Animações (Framer Motion)
- **FadeIn**: opacity + translateY, ease-out 0.6s
- **Stagger**: delay incremental 0.08s entre items
- **Parallax**: scroll-linked com intensidade 0.2-0.4
- **Hover**: scale 1.02, shadow lift, border glow
- **Micro-interactions**: pulse em CTAs, ripple em cliques

### 4. Componentes Chave
- **Button Primary**: gradient dourado, hover lift + glow
- **Card**: bg-tertiary, border sutil, hover border-gold
- **Badge**: backdrop-blur, text-gold
- **Input**: bg-secondary, focus ring dourado
- **Accordion**: collapse suave, ícone rotativo

## Seções da Landing Page

### Seção 1: Hero (100vh)
**Layout**:
- Background: 1.jpeg com overlay gradiente escuro
- Conteúdo centralizado ou grid 60/40
- Badges de credencial no topo
- Headline grande com motion de entrada
- Subheadline com benefício
- CTAs: primário (WhatsApp) + secundário (scroll)
- Scroll indicator animado no bottom

**Motion**:
- Headline: fadeIn + slideUp, delay 0.2s
- Badges: stagger fadeIn
- CTAs: fadeIn com delay 0.4s
- Scroll indicator: bounce infinito

### Seção 2: Credenciais (py-24)
**Layout**:
- Grid 2x2 ou 4 colunas (responsive)
- Cards com ícone/número + título + descrição
- Foto secundária (21.jpeg) com parallax

**Conteúdo**:
1. UFMG - "Melhor universidade federal do Brasil"
2. CEFET-MG - "1º lugar na Rede Federal de Educação"
3. OAB - "Nota 9,60/10 no Exame de Ordem"
4. Experiência - "Defensoria Pública MG + DAJ/UFMG"

**Motion**:
- Cards: stagger fadeIn on scroll
- Números: countUp animation
- Foto: parallax sutil

### Seção 3: Áreas de Atuação (py-24)
**Layout**:
- 2 cards grandes lado a lado (stack mobile)
- Cada card com título, descrição, lista de tópicos
- Hover: expand, reveal CTA

**Conteúdo**:
- Direito Cível: contratos, indenizações, execuções
- Direito do Consumidor: planos, bancos, compras online

**Motion**:
- Cards: fadeIn alternado
- Hover: scale + border glow

### Seção 4: Sobre/Trajetória (py-24)
**Layout**:
- Split: texto + foto (ou timeline vertical)
- Narrativa em primeira pessoa breve
- Valores destacados (Clareza, Ética, Estratégia)

**Motion**:
- Timeline: reveal on scroll
- Foto: subtle parallax

### Seção 5: Processo (py-24)
**Layout**:
- 3 cards horizontais conectados por linha
- Cada passo: número, ícone, título, descrição

**Passos**:
1. Contato Inicial → 2. Análise → 3. Acompanhamento

**Motion**:
- Linha: draw animation
- Cards: stagger fadeIn

### Seção 6: FAQ (py-24)
**Layout**:
- Lista de accordions
- Aviso informativo no topo

**Motion**:
- Accordion: smooth collapse/expand
- Ícone: rotate on toggle

### Seção 7: Contato (py-24)
**Layout**:
- Grid: formulário + informações
- Formulário: nome, WhatsApp, mensagem
- Info: e-mail, WhatsApp link, região

**Motion**:
- Form: fadeIn
- Success: confetti ou checkmark animado

### Seção 8: Footer (py-8)
**Layout**:
- Minimal: logo, links, aviso OAB, copyright

## Implementação Mobile-First

### Breakpoints
- **mobile**: < 768px (padrão)
- **tablet**: 768px - 1024px
- **desktop**: > 1024px

### Adaptações Mobile
- Hero: stack vertical, CTAs full-width
- Credenciais: grid 1 coluna, cards mais compactos
- Áreas: stack vertical
- Processo: vertical com linha lateral
- Touch targets: mínimo 44px
- WhatsApp flutuante fixo

## Performance

### Otimizações
- Imagens: next/image com priority no hero, lazy loading resto
- Fonts: preload, font-display swap
- Motion: reduce-motion media query respeitada
- Code splitting: dynamic imports para seções below fold
- CSS: Tailwind purge, critical CSS inline

### Metas
- Lighthouse Performance: ≥ 90
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## Fluxo de Desenvolvimento

1. **Setup**: Atualizar design tokens (globals.css, tailwind.config.ts)
2. **Componentes**: Criar/atualizar UI components
3. **Seções**: Implementar cada seção da landing
4. **Integração**: Montar página única
5. **Motion**: Adicionar animações
6. **Responsividade**: Testar/ajustar breakpoints
7. **Performance**: Otimizar imagens, fonts, code
8. **Testes**: E2E das interações principais
9. **Deploy**: Vercel preview + production

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected |
|-----------|------------|------------------------------|
| Framer Motion | Animações sofisticadas essenciais para UX premium | CSS animations limitadas para parallax/stagger |
| Dark mode only | Visual de sofisticação adequado ao público-alvo | Light mode pareceria genérico |
| Single page | Conversão máxima, experiência imersiva | Multi-page fragmentaria a jornada |
