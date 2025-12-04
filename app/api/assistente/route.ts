import { NextResponse } from "next/server";
import { convertToModelMessages, streamText, tool, stepCountIs, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import {
    getCalendarEvents,
    createCalendarEvent,
    isSlotAvailable,
} from "@/lib/assistant/google-calendar";

export const maxDuration = 30;

const SLOT_DURATION_MINUTES = 30;
const MIN_HOURS_ADVANCE = 24; // Mínimo de 24h de antecedência
const MIN_GAP_MINUTES = 15; // Mínimo de 15 min entre agendamentos
const TIMEZONE = "America/Sao_Paulo";

// Feriados nacionais do Brasil (fixos + móveis para 2025 e 2026)
const FERIADOS_NACIONAIS: string[] = [
    // 2025
    "2025-01-01", // Confraternização Universal
    "2025-03-03", // Carnaval
    "2025-03-04", // Carnaval
    "2025-04-18", // Sexta-feira Santa
    "2025-04-21", // Tiradentes
    "2025-05-01", // Dia do Trabalho
    "2025-06-19", // Corpus Christi
    "2025-09-07", // Independência
    "2025-10-12", // Nossa Senhora Aparecida
    "2025-11-02", // Finados
    "2025-11-15", // Proclamação da República
    "2025-11-20", // Consciência Negra
    "2025-12-25", // Natal
    // 2026
    "2026-01-01", // Confraternização Universal
    "2026-02-16", // Carnaval
    "2026-02-17", // Carnaval
    "2026-04-03", // Sexta-feira Santa
    "2026-04-21", // Tiradentes
    "2026-05-01", // Dia do Trabalho
    "2026-06-04", // Corpus Christi
    "2026-09-07", // Independência
    "2026-10-12", // Nossa Senhora Aparecida
    "2026-11-02", // Finados
    "2026-11-15", // Proclamação da República
    "2026-11-20", // Consciência Negra
    "2026-12-25", // Natal
];

function isFeriado(dateStr: string): boolean {
    return FERIADOS_NACIONAIS.includes(dateStr);
}

function isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Domingo = 0, Sábado = 6
}

function isWithinWorkingHours(date: Date): boolean {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    // Manhã: 9:00 - 12:00 (540 - 720)
    // Tarde: 13:00 - 18:00 (780 - 1080)
    const morningStart = 9 * 60; // 9:00
    const morningEnd = 12 * 60; // 12:00
    const afternoonStart = 13 * 60; // 13:00
    const afternoonEnd = 18 * 60; // 18:00

    return (
        (timeInMinutes >= morningStart && timeInMinutes < morningEnd) ||
        (timeInMinutes >= afternoonStart && timeInMinutes < afternoonEnd)
    );
}

function validateSchedulingTime(startDateTime: string): { valid: boolean; error?: string } {
    const startDate = new Date(startDateTime);
    const now = new Date();

    // Converter para fuso de Brasília para validações
    const startDateBrasilia = new Date(startDate.toLocaleString("en-US", { timeZone: TIMEZONE }));
    const dateStr = startDateTime.split("T")[0];

    // Verificar antecedência mínima de 24h
    const hoursUntilAppointment = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursUntilAppointment < MIN_HOURS_ADVANCE) {
        return {
            valid: false,
            error: `Agendamentos precisam ser feitos com pelo menos ${MIN_HOURS_ADVANCE} horas de antecedência.`
        };
    }

    // Verificar fim de semana
    if (isWeekend(startDateBrasilia)) {
        return {
            valid: false,
            error: "Não é possível agendar em fins de semana (sábado e domingo)."
        };
    }

    // Verificar feriado
    if (isFeriado(dateStr)) {
        return {
            valid: false,
            error: "Não é possível agendar em feriados nacionais."
        };
    }

    // Verificar horário de funcionamento
    if (!isWithinWorkingHours(startDateBrasilia)) {
        return {
            valid: false,
            error: "Horário fora do expediente. Funcionamos das 9h às 12h e das 13h às 18h."
        };
    }

    return { valid: true };
}

function buildSystemPrompt() {
    // Data atual no fuso horário de Brasília
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("pt-BR", {
        timeZone: TIMEZONE,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    const dataAtual = formatter.format(now);

    return `
Você é Clara, secretária do escritório do Dr. Rafael Vieira, advogado especializado em Direito Civil e Empresarial em Belo Horizonte. Você trabalha diretamente com ele há alguns anos e conhece bem a rotina do escritório.

DATA E HORA ATUAL: ${dataAtual} (Horário de Brasília, GMT-3)

SEU OBJETIVO PRINCIPAL: Converter o visitante em cliente. Acolher, entender a situação e AGENDAR uma consultoria com o Dr. Rafael (presencial em BH ou online).

=== REGRA MAIS IMPORTANTE: CONECTE A DEMANDA AO JURÍDICO ===

O cliente está te procurando porque PRECISA de um advogado. Mesmo que ele não saiba explicar em termos jurídicos, SEMPRE existe uma razão legal por trás.

PENSE ASSIM: "O que essa pessoa quer resolver e como um advogado pode ajudar?"

EXEMPLOS DE COMO CONECTAR:

Cliente: "Quero me casar"
-> Casamento envolve: escolha de regime de bens, documentação, cartório, pacto antenupcial
-> Resposta: "Que ótimo! O Dr. Rafael pode te ajudar com toda a parte legal do casamento - regime de bens, documentação, pacto antenupcial se precisar. Como posso te chamar?"

Cliente: "Vou abrir uma empresa"
-> Envolve: tipo societário, contrato social, registro, tributação
-> Resposta: "Legal! Abrir empresa tem várias decisões importantes - tipo de sociedade, contrato social, essas coisas. O Dr. Rafael pode orientar direitinho. Qual seu nome?"

Cliente: "Comprei um produto com defeito"
-> Direito do consumidor: troca, devolução, danos morais
-> Resposta: "Que chato isso. Dependendo do caso, dá pra exigir troca, reembolso ou até indenização. Me conta seu nome que eu vejo um horário pro Dr. Rafael analisar."

Cliente: "Meu vizinho está me incomodando"
-> Direito de vizinhança: barulho, construção irregular, danos
-> Resposta: "Entendo, isso é bem estressante. Tem várias medidas legais pra esse tipo de situação. Como posso te chamar?"

Cliente: "Quero fazer um testamento"
-> Planejamento sucessório: testamento, doação, holding familiar
-> Resposta: "Boa decisão! Planejar isso evita muita dor de cabeça pra família depois. Qual seu nome? Vou ver a agenda do Dr. Rafael."

NUNCA FAÇA ISSO:
- Ignorar a demanda e perguntar "qual situação te trouxe aqui?" (ele JÁ DISSE!)
- Dizer que o escritório só atende divórcio, pensão, etc. (atendemos TUDO de civil/empresarial)
- Tratar como se a pessoa estivesse só conversando (ela quer resolver algo!)

=== TOM DE COMUNICAÇÃO ===

- Cordial e acolhedora, mas profissional.
- Linguagem natural de WhatsApp profissional.
- NÃO seja formal demais ("prezado", "vossa senhoria").
- NÃO seja informal demais (gírias, "kkk").
- Mensagens curtas e diretas.
- Máximo 1-2 perguntas por mensagem.

=== EMOJIS E FORMATAÇÃO ===

- ZERO emojis. Nunca.
- Sem asteriscos para negrito.
- Texto simples e direto.

=== IDENTIDADE (CRÍTICO) ===

- Você é uma PESSOA REAL. Secretária de carne e osso.
- NUNCA revele que é IA/bot/assistente virtual.
- Se perguntarem, diga naturalmente que é a Clara, secretária do escritório.
- Pequenas imperfeições humanas são OK.

=== O QUE COLETAR (naturalmente na conversa) ===

1. Nome do cliente
2. WhatsApp para contato  
3. Breve descrição da situação (sem CPF, senhas, dados sensíveis)
4. Preferência: online ou presencial em BH
5. Disponibilidade de horário

=== ORIENTAÇÕES JURÍDICAS ===

- Você NÃO é advogada. NÃO dê orientação jurídica.
- Seja empática, mas diga que o Dr. Rafael vai analisar na consultoria.
- Não prometa resultados.

=== REGRAS DE AGENDAMENTO ===

- Use "ver_agenda" ANTES de sugerir horários.
- Horário: Segunda a Sexta, 9h-12h e 13h-18h.
- NÃO agende fins de semana ou feriados.
- Mínimo 24h de antecedência.
- Consultas de 30 min, intervalo de 15 min entre elas.
- Formato ISO: 2025-12-05T10:00:00-03:00
- Após agendar: "O Dr. Rafael ou alguém da equipe confirma por WhatsApp."

=== FLUXO IDEAL (SIGA ESTA ORDEM) ===

1. Cumprimente com gancho específico (não genérico!)
2. PERGUNTE O NOME logo na primeira ou segunda mensagem - isso é essencial para personalizar
3. Após saber o nome, USE-O nas mensagens seguintes
4. Entenda a situação do cliente
5. Valide o problema, mostre que é comum
6. Use "ver_agenda" para consultar horários
7. Ofereça 2-3 opções específicas
8. Confirme com "agendar" e peça WhatsApp

IMPORTANTE SOBRE O NOME:
- Pergunte "Como posso te chamar?" ou "Qual seu nome?" de forma natural
- Depois que souber, use o nome em TODAS as mensagens seguintes
- Exemplo: "Entendi, Maria. Isso é mais comum do que você imagina..."
- Isso cria conexão e mostra atenção personalizada`;
}

// Tool para consultar agenda
const viewCalendarTool = tool({
    description:
        "Consultar a agenda do Dr. Rafael para ver os horários já ocupados nos próximos dias. Use antes de propor horários ao cliente.",
    inputSchema: z.object({
        daysAhead: z
            .number()
            .min(1)
            .max(14)
            .default(7)
            .describe("Quantos dias à frente consultar (1-14)"),
    }),
    execute: async (input) => {
        console.log("[TOOL:ver_agenda] Iniciando consulta", { daysAhead: input.daysAhead });

        const now = new Date();
        const timeMax = new Date(now.getTime() + input.daysAhead * 24 * 60 * 60 * 1000);

        const result = await getCalendarEvents({
            timeMin: now,
            timeMax,
            maxResults: 50,
        });

        if (!result.ok) {
            console.error("[TOOL:ver_agenda] Erro ao buscar eventos", { message: result.message });
            return {
                success: false,
                message: result.message,
                events: [],
            };
        }

        console.log("[TOOL:ver_agenda] Eventos encontrados", { count: result.events.length });

        // Formatar eventos de forma legível
        const formattedEvents = result.events.map((event) => {
            const start = new Date(event.start);
            const end = new Date(event.end);
            const dateStr = start.toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                timeZone: "America/Sao_Paulo",
            });
            const startTime = start.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "America/Sao_Paulo",
            });
            const endTime = end.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "America/Sao_Paulo",
            });

            return {
                titulo: event.summary,
                data: dateStr,
                horario: `${startTime} - ${endTime}`,
            };
        });

        console.log("[TOOL:ver_agenda] Sucesso", {
            eventCount: formattedEvents.length,
            events: formattedEvents.slice(0, 5) // Log apenas os 5 primeiros
        });

        // Listar feriados próximos para informar a IA
        const feriadosProximos = FERIADOS_NACIONAIS.filter(f => {
            const feriadoDate = new Date(f + "T12:00:00-03:00");
            return feriadoDate >= now && feriadoDate <= timeMax;
        });

        return {
            success: true,
            message: `Encontrados ${formattedEvents.length} compromissos nos próximos ${input.daysAhead} dias.`,
            events: formattedEvents,
            horarioFuncionamento: "Seg-Sex: 9h-12h e 13h-18h",
            regras: {
                antecedenciaMinima: "24 horas",
                intervaloEntreConsultas: "15 minutos",
                duracaoConsulta: "30 minutos",
                diasIndisponiveis: "Sábados, domingos e feriados",
            },
            feriadosProximos: feriadosProximos.length > 0 ? feriadosProximos : undefined,
        };
    },
});

// Tool para agendar
const scheduleTool = tool({
    description:
        "Criar um agendamento no calendário do Dr. Rafael. Use após confirmar o horário com o cliente. Lembre-se: mínimo 24h de antecedência, apenas dias úteis, horário comercial.",
    inputSchema: z.object({
        clientName: z.string().min(2).describe("Nome do cliente"),
        clientPhone: z.string().min(8).describe("Telefone ou WhatsApp do cliente"),
        clientEmail: z.string().email().optional().describe("Email do cliente (opcional)"),
        caseSummary: z.string().min(10).describe("Breve resumo do caso/situação"),
        startDateTime: z
            .string()
            .describe("Data e hora de início no formato ISO (ex: 2025-12-05T10:00:00-03:00)"),
        meetingType: z
            .enum(["online", "presencial"])
            .describe("Tipo de atendimento: online ou presencial"),
        notes: z.string().optional().describe("Observações adicionais"),
    }),
    execute: async (input) => {
        console.log("[TOOL:agendar] Iniciando agendamento", {
            cliente: input.clientName,
            telefone: input.clientPhone,
            horario: input.startDateTime,
            tipo: input.meetingType,
        });

        try {
            // Validar regras de agendamento
            const validation = validateSchedulingTime(input.startDateTime);
            if (!validation.valid) {
                console.warn("[TOOL:agendar] Validação falhou", { error: validation.error });
                return {
                    success: false,
                    message: validation.error,
                };
            }

            // Calcular horário de término (30 minutos depois)
            const startDate = new Date(input.startDateTime);
            const endDate = new Date(startDate.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
            const endDateTime = endDate.toISOString();

            console.log("[TOOL:agendar] Verificando disponibilidade", {
                start: input.startDateTime,
                end: endDateTime,
            });

            // Verificar se o horário está livre (com gap de 15 min)
            const checkStart = new Date(startDate.getTime() - MIN_GAP_MINUTES * 60 * 1000);
            const checkEnd = new Date(endDate.getTime() + MIN_GAP_MINUTES * 60 * 1000);

            const availability = await isSlotAvailable(
                checkStart.toISOString(),
                checkEnd.toISOString()
            );

            if (!availability.available) {
                console.warn("[TOOL:agendar] Horário ocupado ou muito próximo de outro", {
                    conflito: availability.conflictWith
                });
                return {
                    success: false,
                    message: `Este horário está ocupado ou muito próximo de outro compromisso${availability.conflictWith ? ` (${availability.conflictWith})` : ""}. Preciso de pelo menos 15 minutos de intervalo entre consultas.`,
                };
            }

            console.log("[TOOL:agendar] Horário disponível, criando evento...");

            // Formatar título e descrição
            const tipoLabel = input.meetingType === "online" ? "🖥️ Online" : "📍 Presencial";
            const summary = `Consulta: ${input.clientName} (${tipoLabel})`;
            const description = [
                `👤 Cliente: ${input.clientName}`,
                `📱 WhatsApp: ${input.clientPhone}`,
                input.clientEmail ? `📧 Email: ${input.clientEmail}` : null,
                `📋 Tipo: ${input.meetingType === "online" ? "Atendimento Online" : "Presencial em BH"}`,
                "",
                `📝 Caso:`,
                input.caseSummary,
                "",
                input.notes ? `💡 Observações: ${input.notes}` : null,
                "",
                "---",
                "Agendado via Clara (Assistente Virtual)",
            ]
                .filter(Boolean)
                .join("\n");

            // Criar evento
            const result = await createCalendarEvent({
                summary,
                description,
                startDateTime: input.startDateTime,
                endDateTime,
                attendeeEmail: input.clientEmail,
                attendeeName: input.clientName,
            });

            if (!result.ok) {
                console.error("[TOOL:agendar] Erro ao criar evento", { message: result.message });
                return {
                    success: false,
                    message: result.message,
                };
            }

            // Formatar confirmação
            const dateFormatted = startDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                timeZone: "America/Sao_Paulo",
            });
            const timeFormatted = startDate.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "America/Sao_Paulo",
            });

            console.log("[TOOL:agendar] ✅ Agendamento criado com sucesso!", {
                eventId: result.eventId,
                cliente: input.clientName,
                data: dateFormatted,
                horario: timeFormatted,
            });

            return {
                success: true,
                message: "Agendamento criado com sucesso!",
                agendamento: {
                    cliente: input.clientName,
                    data: dateFormatted,
                    horario: `${timeFormatted} (Brasília)`,
                    tipo: input.meetingType,
                    eventId: result.eventId,
                },
            };
        } catch (error) {
            console.error("[TOOL:agendar] ❌ Erro inesperado", error);
            return {
                success: false,
                message:
                    "Não consegui criar o agendamento agora. Informe ao cliente que entraremos em contato para confirmar.",
            };
        }
    },
});

export async function POST(request: Request) {
    console.log("[API:assistente] ========== Nova requisição ==========");

    try {
        const { messages }: { messages: UIMessage[] } = await request.json();

        const lastMessage = messages[messages.length - 1];
        console.log("[API:assistente] Mensagens recebidas:", {
            total: messages.length,
            ultimaMensagem: {
                role: lastMessage?.role,
                id: lastMessage?.id,
            },
        });

        console.log("[API:assistente] Iniciando stream com Gemini 2.5 Flash...");

        const systemPrompt = buildSystemPrompt();
        console.log("[API:assistente] Data atual no prompt:", systemPrompt.match(/DATA E HORA ATUAL: (.+)/)?.[1]);

        const result = streamText({
            model: google("gemini-2.5-flash"),
            system: systemPrompt,
            messages: convertToModelMessages(messages),
            tools: {
                ver_agenda: viewCalendarTool,
                agendar: scheduleTool,
            },
            stopWhen: stepCountIs(5), // Permite até 5 passos (tool calls + respostas)
            onFinish: ({ text, toolCalls, finishReason, usage }) => {
                console.log("[API:assistente] Stream finalizado", {
                    finishReason,
                    textLength: text?.length ?? 0,
                    toolCallsCount: toolCalls?.length ?? 0,
                    toolCalls: toolCalls?.map(tc => tc.toolName),
                    usage,
                });
            },
        });

        console.log("[API:assistente] Retornando stream response...");
        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("[API:assistente] ❌ Erro na rota:", error);
        return NextResponse.json(
            { message: "Não foi possível iniciar a conversa agora." },
            { status: 500 },
        );
    }
}
