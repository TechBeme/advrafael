import { NextResponse } from "next/server";
import { convertToModelMessages, streamText, tool, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import {
    getCalendarEvents,
    createCalendarEvent,
    isSlotAvailable,
} from "@/lib/assistant/google-calendar";

export const maxDuration = 30;

const SLOT_DURATION_MINUTES = 30;

const systemPrompt = `
Você é Clara, assistente do Dr. Rafael Vieira, advogado especializado em Direito Civil e Empresarial em Belo Horizonte.

Seu objetivo: acolher o cliente, entender brevemente a situação e agendar uma consultoria (presencial em BH ou online).

Comportamento:
- Seja simpática, objetiva e profissional. Nada de juridiquês.
- Faça no máximo 2 perguntas por mensagem. Deixe o cliente falar.
- Não dê orientação jurídica. Diga que o Dr. Rafael analisará o caso na consultoria.
- Use emojis com moderação (máximo 1 por mensagem, se apropriado).

O que coletar naturalmente na conversa:
1. Nome do cliente
2. WhatsApp para contato
3. Breve descrição da situação (sem dados sensíveis como CPF, senhas, etc.)
4. Preferência: consultoria online ou presencial em BH
5. Disponibilidade de horário

Agendamento:
- IMPORTANTE: Use a ferramenta "ver_agenda" para consultar os horários já ocupados do Dr. Rafael.
- O escritório funciona de segunda a sexta, das 09:30 às 12:00 e das 14:00 às 18:30 (horário de Brasília).
- Consultas têm duração de 30 minutos.
- Proponha horários LIVRES dentro desses períodos.
- Quando o cliente confirmar um horário, use a ferramenta "agendar" para criar o evento no calendário.
- Informe que o Dr. Rafael ou a equipe confirmará por WhatsApp.

Fluxo ideal:
1. Entenda o caso do cliente
2. Use "ver_agenda" para ver os compromissos existentes
3. Proponha 2-3 horários livres
4. Quando confirmado, use "agendar" para registrar no calendário`;

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
        const now = new Date();
        const timeMax = new Date(now.getTime() + input.daysAhead * 24 * 60 * 60 * 1000);

        const result = await getCalendarEvents({
            timeMin: now,
            timeMax,
            maxResults: 50,
        });

        if (!result.ok) {
            return {
                success: false,
                message: result.message,
                events: [],
            };
        }

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

        return {
            success: true,
            message: `Encontrados ${formattedEvents.length} compromissos nos próximos ${input.daysAhead} dias.`,
            events: formattedEvents,
            horarioFuncionamento: "Seg-Sex: 09:30-12:00 e 14:00-18:30",
        };
    },
});

// Tool para agendar
const scheduleTool = tool({
    description:
        "Criar um agendamento no calendário do Dr. Rafael. Use após confirmar o horário com o cliente.",
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
        try {
            // Calcular horário de término (30 minutos depois)
            const startDate = new Date(input.startDateTime);
            const endDate = new Date(startDate.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
            const endDateTime = endDate.toISOString();

            // Verificar se o horário está livre
            const availability = await isSlotAvailable(input.startDateTime, endDateTime);
            if (!availability.available) {
                return {
                    success: false,
                    message: `Este horário já está ocupado${availability.conflictWith ? ` (${availability.conflictWith})` : ""}. Por favor, escolha outro horário.`,
                };
            }

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
            console.error("[assistente] erro ao agendar", error);
            return {
                success: false,
                message:
                    "Não consegui criar o agendamento agora. Informe ao cliente que entraremos em contato para confirmar.",
            };
        }
    },
});

export async function POST(request: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await request.json();

        const result = streamText({
            model: google("gemini-2.5-flash"),
            system: systemPrompt,
            messages: convertToModelMessages(messages),
            tools: {
                ver_agenda: viewCalendarTool,
                agendar: scheduleTool,
            },
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("[assistente] erro na rota", error);
        return NextResponse.json(
            { message: "Não foi possível iniciar a conversa agora." },
            { status: 500 },
        );
    }
}
