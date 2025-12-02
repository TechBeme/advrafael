# Feature Specification: Site institucional Rafael Vieira

**Feature Branch**: `001-site-institucional`  
**Created**: 2025-12-02  
**Status**: Draft  
**Input**: User description: "Quero que você gere uma especificação completa (requisitos e histórias de usuário) para um site institucional de advocacia..."

**Compliance Note**: Todas as histórias, requisitos e textos devem respeitar a Constituição do Projeto (conformidade OAB, linguagem informativa sem promessas ou comparações, UX sóbria em português, responsiva e acessível, proteção de dados conforme LGPD).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Entender quem é o advogado (Priority: P1)

Visitante (pessoa física/pequena empresa) quer saber rapidamente quem é Rafael Vieira e se parece confiável.

**Why this priority**: É a porta de entrada para qualquer contato; estabelece credibilidade imediata.

**Independent Test**: Usuário acessa a home, lê apresentação breve e consegue localizar link para saber mais sobre biografia/valores.

**Acceptance Scenarios**:

1. **Given** acesso à home em celular, **When** o visitante rola a página, **Then** vê foto, resumo profissional e link/CTA para "Sobre".
2. **Given** visitante busca legitimidade, **When** lê a seção de apresentação, **Then** encontra menção a atuação em BH/MG e áreas Cível/Consumidor sem promessas de resultado.

---

### User Story 2 - Confirmar área de atuação e serviços (Priority: P1)

Visitante quer saber se o advogado atua no tipo de problema dele em Direito Cível ou do Consumidor.

**Why this priority**: Necessário para qualificar leads e reduzir dúvidas.

**Independent Test**: Usuário navega até "Áreas de Atuação" e identifica seção que corresponde ao seu problema com linguagem clara.

**Acceptance Scenarios**:

1. **Given** visitante em "Áreas de Atuação", **When** abre a área de Direito Cível, **Then** vê lista de situações típicas (contratos, responsabilidade civil, execuções) em linguagem simples.
2. **Given** visitante com problema de consumo, **When** acessa a seção de Direito do Consumidor, **Then** encontra exemplos (bancos, planos de saúde, compras online) sem prometer resultado.

---

### User Story 3 - Consumir conteúdo informativo (Priority: P2)

Visitante busca texto genérico para entender um tema jurídico antes de contatar.

**Why this priority**: Artigos reforçam autoridade e ajudam no SEO de forma ética.

**Independent Test**: Usuário acessa "Conteúdos", abre um artigo e lê texto informativo com aviso de caráter geral.

**Acceptance Scenarios**:

1. **Given** lista de artigos, **When** usuário seleciona um item, **Then** é levado à página do artigo com título, data, resumo e conteúdo completo.
2. **Given** artigo aberto, **When** chega ao final, **Then** vê aviso de que o texto é informativo e CTA discreto para contato.

---

### User Story 4 - Entrar em contato (Priority: P1)

Visitante decide enviar mensagem ou chamar no WhatsApp para agendar consulta.

**Why this priority**: Conversão principal do site.

**Independent Test**: Usuário preenche formulário com campos obrigatórios e recebe confirmação sem erros; opção de abrir WhatsApp funciona.

**Acceptance Scenarios**:

1. **Given** formulário de contato, **When** usuário preenche nome, e-mail, telefone/WhatsApp, motivo e mensagem válidos, **Then** o envio é aceito, mostra confirmação e CTA para retorno.
2. **Given** botão de WhatsApp, **When** usuário clica em dispositivo móvel, **Then** o app abre com mensagem inicial genérica (sem dados sensíveis pré-preenchidos).

---

### User Story 5 - Acesso móvel com conexão limitada (Priority: P1)

Visitante acessa pelo celular em rede lenta.

**Why this priority**: Público prioritário é mobile; experiência deve ser fluida.

**Independent Test**: Site carrega rapidamente em conexão limitada; conteúdo principal e CTAs são visíveis sem assets pesados.

**Acceptance Scenarios**:

1. **Given** rede lenta simulada, **When** usuário acessa a home, **Then** layout permanece legível, imagens otimizadas e textos carregam primeiro.
2. **Given** navegação por toque/teclado, **When** usuário percorre menus e botões, **Then** foco e contraste são adequados, sem bloqueios de navegação.

### Edge Cases

- O que acontece se o formulário é enviado com campos obrigatórios vazios ou e-mail inválido? → Mostrar validação clara sem enviar dados.
- Como o sistema lida com indisponibilidade temporária do backend de formulários? → Exibir mensagem de erro genérica e canal alternativo (WhatsApp/e-mail).
- Artigo removido ou inexistente acessado por URL direta? → Página 404 com instrução para voltar aos conteúdos ou contato.
- Conteúdo carregado em rede muito lenta? → Priorizar texto e placeholders leves, evitando travamentos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Disponibilizar página inicial com foto/apresentação do advogado, CTA de contato e destaques das áreas Cível e Consumidor.
- **FR-002**: Oferecer página "Sobre" com biografia, formação, experiência, missão/valores, em linguagem acessível e profissional.
- **FR-003**: Exibir página "Áreas de Atuação" com seções para Direito Cível (contratos, responsabilidade civil, cobranças/execuções) e Direito do Consumidor (serviços/bancos/planos de saúde/compras online), listando situações típicas sem prometer resultados.
- **FR-004**: Incluir página "Conteúdos/Artigos" com listagem (título, resumo, data) e página de detalhe com conteúdo completo e aviso informativo.
- **FR-005**: Permitir destaque de artigos selecionados na página inicial.
- **FR-006**: Fornecer página "FAQ" com perguntas e respostas genéricas e aviso de que não substituem consulta individual.
- **FR-007**: Implementar página "Contato" com formulário (nome, e-mail, telefone/WhatsApp, motivo do contato, mensagem) e canais diretos (e-mail, WhatsApp, região BH/MG).
- **FR-008**: Validar campos obrigatórios e formato de e-mail; exibir confirmação de envio ou mensagem de erro amigável.
- **FR-009**: Incluir avisos de caráter informativo em páginas de conteúdo e FAQ, reforçando ausência de promessa de resultado.
- **FR-010**: Disponibilizar Política de Privacidade/avisos legais explicando uso dos dados do formulário e ausência de vínculo advogado-cliente pelo envio.
- **FR-011**: Fornecer mecanismo de metadados de SEO por página (título, descrição, imagem/social preview) configurável.
- **FR-012**: Exibir CTAs de contato visíveis em pontos estratégicos (cabeçalho/rodapé/seção de contato) sem apelos mercantilistas.
- **FR-013**: Bloquear linguagem proibida por OAB (garantia de vitória, comparações comerciais, promoções de honorários); revisar conteúdo editorial antes de publicação.
- **FR-014**: Suportar renderização responsiva mobile-first, com navegação simples e consistente.

### Key Entities

- **Artigo**: título, slug/URL, data de publicação, resumo, conteúdo, destaque (bool), metadados de SEO.
- **FAQ Item**: pergunta, resposta, categoria/opcional, indicador de exibir em destaque.
- **Contato**: nome, e-mail, telefone/WhatsApp, motivo, mensagem, data/hora de envio, status (enviado/erro), confirmação exibida.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuário em mobile carrega a home em ≤2s em conexão 3G simulada e encontra CTA de contato sem rolagem excessiva.
- **SC-002**: 100% das páginas principais exibem aviso informativo e nenhum termo proibido pela OAB.
- **SC-003**: Formulário de contato valida campos obrigatórios e formato de e-mail em 100% dos envios de teste; confirmações/erros são exibidos em até 1s.
- **SC-004**: Pelo menos 1 fluxo de teste por história (home/sobre/áreas, artigos, contato) é coberto por teste automatizado ou procedimento manual documentado.
- **SC-005**: Todos os artigos listados mostram data e resumo; 404 amigável para slugs inexistentes.
