# Feature Specification: Landing Page Premium - Rafael Souza Vieira

**Feature Branch**: `001-site-institucional`  
**Created**: 2025-12-02  
**Updated**: 2025-12-03  
**Status**: In Progress  
**Input**: Redesign para landing page única com foco em TRAJETÓRIA PROFISSIONAL

**Compliance Note**: Todas as seções respeitam a Constituição do Projeto (conformidade OAB, linguagem informativa, proteção de dados LGPD).

---

## Visão Geral do Redesign

### Conceito
Landing page única, elegante e moderna com FOCO PRINCIPAL na **trajetória profissional prática**:
- **Experiência Prática**: Destaque para DAJ/UFMG, DPMG (Defensoria Pública), Projeto Direito Vivo
- **Autoridade**: UFMG (principal), OAB 9,60 (menção secundária)
- **Atendimento 24/7**: Chat popup com assistente sempre disponível
- **Conversão**: CTAs estratégicos com chat integrado

### Perfil do Advogado
- **Nome**: Rafael Souza Vieira
- **Formação**: Bacharel em Direito pela UFMG
- **OAB**: Aprovado 44º Exame, Direito Civil, nota 9,60/10
- **Áreas**: Direito Cível e Direito do Consumidor
- **Região**: Belo Horizonte / MG + Atendimento Online

### Experiência Profissional (FOCO PRINCIPAL)

#### 1. DAJ/UFMG - Divisão de Assistência Judiciária
- **O que é**: Projeto de extensão da Faculdade de Direito da UFMG, fundado em 1958
- **Comparação**: Similar ao Hospital das Clínicas para a Medicina
- **Atuação**: Prática advocatícia lado a lado com os melhores professores e advogados do Brasil
- **Aprendizado**: Orientação diária por professores renomados, trabalho em equipe, discussão de estratégias
- **Áreas atendidas**: Direito Civil, Direito do Consumidor, Direito de Família, Contratos

#### 2. Projeto Direito Vivo (DAJ/UFMG)
- **O que é**: Projeto de Extensão focado em Direito Empresarial
- **Público**: Microempresas e empresas de pequeno porte hipossuficientes
- **Serviços**: Consultoria e assessoria jurídica gratuita
- **Parcerias**: ACMINAS e IAMG
- **Experiência adicional**: Administração judicial em recuperações e falências

#### 3. DPMG - Defensoria Pública de Minas Gerais
- **Setor**: DESITS-CI (Defensoria Especializada de Segunda Instância e Tribunais Superiores - Cível)
- **Divisão**: Direito Privado (Câmaras Cíveis 9ª a 18ª e 20ª do TJMG)
- **Atividades**:
  - Acompanhamento de processos do interior e capital no TJMG
  - Atendimento e orientação a assistidos
  - Participação em sessões de conciliação e julgamento
  - Elaboração de acordos e recursos (inclusive para Tribunais Superiores)
- **Áreas de atuação**: Família, Infância/Juventude, Área Cível (posse, propriedade, contrato, plano de saúde, indenizações)

---

## Estrutura da Landing Page

### Seção 1: Hero
**Foco**: Impacto visual + credencial UFMG + CTA para chat/WhatsApp
- Background: foto profissional (rafael-1.jpeg)
- Headline: Foco no atendimento e experiência prática
- Badges: "UFMG" | "Atendimento 24/7" | "Direito Civil & Consumidor"
- CTA primário: Chat (abre popup)
- CTA secundário: WhatsApp
- Menção: "Atendimento 24 horas, 7 dias por semana"

### Seção 2: Trajetória Profissional (NOVA - DESTAQUE)
**Foco**: Experiência prática que diferencia
- **DAJ Card Grande**: Logo, descrição, o que fez lá, trabalho em equipe
- **Direito Vivo Card**: Logo, foco empresarial, microempresas
- **DPMG Card Grande**: Logo, Segunda Instância, áreas de atuação
- Linha do tempo visual conectando as experiências
- Fotos/logos das instituições

### Seção 3: Áreas de Atuação
**Mantém estrutura atual** - Direito Civil e Consumidor
- Contextualizar com a experiência prática
- "Experiência real atendendo casos de..."

### Seção 4: Sobre (Simplificado)
**Foco**: UFMG + breve menção valores
- Foto pessoal
- Texto breve sobre formação
- Valores: Clareza, Ética, Estratégia
- OAB 9,60 como menção secundária

### Seção 5: Processo de Atendimento
**Atualização**: Destacar atendimento 24/7
- Passo 1: "Fale comigo agora" (chat 24/7 ou WhatsApp)
- Passo 2: Análise do caso
- Passo 3: Acompanhamento contínuo

### Seção 6: FAQ
**Mantém estrutura atual**

### Seção 7: Contato
**Atualização**: Integrar com chat
- Formulário simples
- WhatsApp
- Indicador de "online agora"

### Seção 8: Footer
**Mantém estrutura atual**

---

## Chat Popup com Assistente (NOVO)

### Conceito
- Popup flutuante no canto inferior direito
- **Não mencionar que é IA**
- Aparece após alguns segundos com mensagens de boas-vindas
- Indicador "Online agora" 
- Atendimento 24/7

### Elementos do Popup
1. **Bolha de notificação**: Mostra que alguém está online
2. **Preview de mensagem**: "Olá! Posso ajudar você com alguma questão jurídica?"
3. **Botão de abrir**: Expande para chat completo
4. **Chat expandido**: 
   - Avatar do advogado (ou genérico)
   - Campo de input
   - Histórico de mensagens
   - Indicador "digitando..."

### Integração Vercel AI SDK
- Route handler em `/api/assistente`
- Streaming de respostas
- Contexto sobre áreas de atuação
- Coleta de lead (nome, WhatsApp, problema)

---

## Imagens Disponíveis

### Logos Institucionais
- `daj-logo.jpg` - Logo da DAJ/UFMG
- `direito-vivo-logo.jpg` - Logo do Projeto Direito Vivo
- `dpmg-logo.png` - Logo da Defensoria Pública de MG
- `ufmg-direito-logo.png` - Logo da Faculdade de Direito UFMG
- `ufmg-logo.jpg` - Logo da UFMG

### Fotos Pessoais
- `rafael-1.jpeg` - Foto principal (escritório)
- `rafael-2.jpeg` - Foto secundária
- `hero-office-1.jpeg` - Ambiente de escritório
- `hero-office-2.jpeg` - Ambiente alternativo

---

## Textos-Chave para Copywriting

### DAJ/UFMG
> "Na DAJ, trabalhei lado a lado com os melhores professores e advogados do Brasil, sendo orientado diariamente em casos reais. Aprendi a trabalhar em equipe, discutir estratégias e encontrar as melhores soluções para cada cliente."

### DPMG
> "Na Defensoria Pública de MG, atuei em Segunda Instância acompanhando processos de todo o estado, elaborando recursos e participando de sessões de julgamento no Tribunal de Justiça."

### Atendimento 24/7
> "Disponível 24 horas por dia, 7 dias por semana. Fale comigo agora e tenha uma orientação inicial sobre seu caso."
