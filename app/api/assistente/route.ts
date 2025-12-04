import { NextResponse } from "next/server";
import { convertToModelMessages, streamText, tool, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { appendLeadToSheet } from "@/lib/assistant/google-sheets";
import { buildAvailabilitySummary, getAvailableSlots } from "@/lib/assistant/scheduling";

export const maxDuration = 30;

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
- Proponha horários da lista "Disponibilidade" abaixo (horário de Brasília).
- Quando o cliente confirmar, use a ferramenta "agendar" para registrar.
- Informe que o Dr. Rafael ou a equipe confirmará por WhatsApp.

Disponibilidade:`;

const scheduleTool = tool({
    description: "Registrar lead e agendar horário na planilha",
    inputSchema: z.object({
        name: z.string().min(2).describe("Nome do cliente"),
        phone: z.string().min(8).describe("Telefone ou WhatsApp"),
        email: z.string().email().optional(),
        city: z.string().optional(),
        caseSummary: z.string().min(10).describe("Resumo do caso"),
        urgency: z.enum(["alta", "media", "baixa"]).describe("Urgência percebida"),
        slotIso: z.string().optional().describe("Horário no formato ISO com timezone"),
        slotLabel: z.string().describe("Texto amigável do horário combinado"),
        timezone: z.string().default("America/Sao_Paulo"),
        preferredChannel: z.string().optional().describe("online / presencial / telefone"),
        notes: z.string().optional().describe("Observações úteis ou preferências"),
    }),
    execute: async (input) => {
        try {
            const slot = input.slotIso
                ? {
                    iso: input.slotIso,
                    label: input.slotLabel,
                    dayKey: input.slotIso.split("T")[0],
                }
                : undefined;

            const result = await appendLeadToSheet({
                name: input.name,
                phone: input.phone,
                email: input.email,
                caseSummary: input.caseSummary,
                urgency: input.urgency,
                slot,
                preferredChannel: input.preferredChannel,
                timezone: input.timezone,
                notes: [input.notes, input.city].filter(Boolean).join(" · "),
                source: "assistente-ia",
            });

            return {
                saved: result.ok,
                message: result.message ?? "Registro processado",
                slot: slot?.label ?? input.slotLabel,
            };
        } catch (error) {
            console.error("[assistente] erro ao registrar lead", error);
            return {
                saved: false,
                message: "Não consegui salvar na agenda agora. Avise que vamos confirmar manualmente.",
                slot: input.slotLabel,
            };
        }
    },
});

export async function POST(request: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await request.json();

        const slots = getAvailableSlots({ maxResults: 6 });
        const slotsText = buildAvailabilitySummary(slots);

        const result = streamText({
            model: google("gemini-2.5-flash"),
            system: `${systemPrompt}\n${slotsText}`,
            messages: convertToModelMessages(messages),
            tools: {
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
