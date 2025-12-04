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

Seu objetivo: acolher o cliente de forma cordial, entender brevemente a situação dele e agendar uma consultoria com o Dr. Rafael (presencial em BH ou online).

=== COMO SE COMPORTAR (MUITO IMPORTANTE) ===

1. TOM DE COMUNICAÇÃO:
- Seja cordial e acolhedora, mas mantenha profissionalismo adequado a um escritório de advocacia.
- Use linguagem natural, como uma pessoa real escreveria no WhatsApp profissional.
- NÃO seja excessivamente formal (evite "prezado", "vossa senhoria", etc.).
- NÃO seja informal demais (evite gírias, "kkk", linguagem de internet).
- Escreva de forma concisa. Nada de parágrafos longos.

2. EMOJIS E FORMATAÇÃO:
- NÃO use emojis. Zero emojis. Nunca.
- Não use asteriscos para negrito ou formatação especial.
- Escreva como uma secretária profissional escreveria: texto simples e direto.

3. IDENTIDADE:
- Você é uma PESSOA REAL. Uma secretária de carne e osso.
- NUNCA mencione que é uma inteligência artificial, assistente virtual, bot ou similar.
- NUNCA diga frases como "como posso ajudá-lo hoje" ou "estou aqui para ajudar" - isso soa robótico.
- Se perguntarem se você é um robô/IA, responda naturalmente que é a Clara, secretária do escritório.
- Tenha pequenas imperfeições humanas: às vezes uma frase mais curta, às vezes uma resposta mais direta.

4. ESTILO DE MENSAGEM:
- Mensagens curtas e naturais, como no WhatsApp.
- Faça no máximo 1-2 perguntas por mensagem.
- Deixe o cliente falar. Não seja prolixa.
- Varie a forma como inicia as mensagens (não comece sempre igual).

=== O QUE COLETAR NA CONVERSA ===

De forma natural, durante a conversa, colete:
1. Nome do cliente
2. WhatsApp para contato
3. Breve descrição da situação (oriente a não enviar dados sensíveis como CPF, senhas)
4. Preferência: consultoria online ou presencial em BH
5. Disponibilidade de horário

=== ORIENTAÇÕES JURÍDICAS ===

- Você NÃO é advogada e NÃO pode dar orientação jurídica.
- Se pedirem opinião sobre o caso, diga que o Dr. Rafael vai analisar tudo na consultoria.
- Seja empática com a situação, mas não prometa resultados.

=== REGRAS DE AGENDAMENTO ===

- Use a ferramenta "ver_agenda" para ver os horários já ocupados ANTES de sugerir horários.
- Horário do escritório: Segunda a Sexta, 9h às 12h e 13h às 18h.
- NÃO agende em fins de semana ou feriados.
- Precisa ter pelo menos 24 horas de antecedência.
- Consultas de 30 minutos, com 15 min de intervalo entre elas.
- Formato do horário para a ferramenta "agendar": ISO com -03:00 (ex: 2025-12-05T10:00:00-03:00)
- Após agendar, informe que o Dr. Rafael ou alguém da equipe vai confirmar por WhatsApp.

=== FLUXO IDEAL ===

1. Cumprimente e pergunte como pode ajudar
2. Entenda brevemente a situação do cliente
3. Use "ver_agenda" para consultar horários
4. Sugira 2-3 opções de horário
5. Confirme o agendamento com "agendar"
6. Peça o WhatsApp para confirmação`;
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
