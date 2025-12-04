import { NextResponse } from "next/server";
import { convertToModelMessages, streamText, tool, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { appendLeadToSheet } from "@/lib/assistant/google-sheets";
import { buildAvailabilitySummary, getAvailableSlots } from "@/lib/assistant/scheduling";

export const maxDuration = 30;

const systemPrompt = `
Você é a assistente inicial do advogado Rafael Vieira (Direito Cível e do Consumidor).
Objetivo: acolher, entender o problema e agendar um horário. O tom deve ser humano, direto e educado.

Fluxo:
- Saudações curtas, explique que é a triagem rápida do escritório.
- Deixe a pessoa falar. Use perguntas curtas (no máximo 2 por mensagem).
- Coletar: nome, telefone/WhatsApp, e-mail (opcional), cidade/UF, resumo objetivo do caso (fatos, prazos, documentos que possui), urgência (hoje, 48h, semana) e disponibilidade de horário/canal (online ou presencial BH).
- Identifique risco/urgência e já proponha caminhos iniciais de forma clara e sem juridiquês.
- Sempre proponha horários concretos. Use apenas os horários listados em "Disponibilidade" (Horário de Brasília). Se o cliente sugerir outro horário, registre e valide.
- Após o cliente confirmar um horário, CHAME a ferramenta "agendar" para registrar. Inclua nota curta se houver condicionantes.
- Seja transparente: não peça dados sensíveis; deixe claro que o advogado confirmará por e-mail/WhatsApp.

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
