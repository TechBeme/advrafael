import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Informe seu nome completo.")
        .max(120, "Nome muito longo."),
    email: z.string().trim().email("E-mail inválido.").optional().or(z.literal('')),
    phone: z
        .string()
        .trim()
        .min(8, "Informe um telefone ou WhatsApp.")
        .max(30, "Telefone muito longo."),
    reason: z
        .string()
        .trim()
        .min(3, "Motivo do contato é obrigatório.")
        .max(120, "Motivo muito longo."),
    message: z
        .string()
        .trim()
        .min(20, "Descreva o essencial do caso em pelo menos 20 caracteres.")
        .max(1500, "Mensagem muito longa."),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export function sanitizeText(value: string) {
    return value.replace(/<[^>]*>?/gm, "").trim();
}

export function normalizePhone(value: string) {
    return value.replace(/[^\d+\s()-]/g, "");
}
