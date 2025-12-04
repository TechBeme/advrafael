import { z } from "zod";

// Regex para detectar padrões perigosos
const DANGEROUS_PATTERNS = [
    /<script\b[^>]*>/gi,           // Script tags
    /<iframe\b[^>]*>/gi,           // Iframes
    /<object\b[^>]*>/gi,           // Objects
    /<embed\b[^>]*>/gi,            // Embeds
    /<link\b[^>]*>/gi,             // Links (CSS injection)
    /<style\b[^>]*>/gi,            // Style tags
    /javascript:/gi,                // Javascript protocol
    /data:/gi,                      // Data URLs
    /vbscript:/gi,                  // VBScript
    /on\w+\s*=/gi,                  // Event handlers (onclick, onerror, etc.)
    /&#/g,                          // HTML entities encoding
    /%3C/gi,                        // URL encoded <
    /%3E/gi,                        // URL encoded >
];

// Regex para URLs (para remover ou alertar)
const URL_PATTERN = /https?:\/\/[^\s]+/gi;

// Caracteres de controle e especiais perigosos para email headers
const HEADER_INJECTION_PATTERN = /[\r\n\x00-\x1f]/g;

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Informe seu nome completo.")
        .max(120, "Nome muito longo.")
        .refine(
            (val) => !DANGEROUS_PATTERNS.some(p => p.test(val)),
            "Nome contém caracteres inválidos."
        )
        .refine(
            (val) => !URL_PATTERN.test(val),
            "Nome não pode conter URLs."
        ),
    phone: z
        .string()
        .trim()
        .min(8, "Informe um telefone ou WhatsApp.")
        .max(30, "Telefone muito longo.")
        .regex(/^[\d\s()+\-]+$/, "Telefone contém caracteres inválidos."),
    message: z
        .string()
        .trim()
        .min(20, "Descreva o essencial do caso em pelo menos 20 caracteres.")
        .max(1500, "Mensagem muito longa.")
        .refine(
            (val) => !DANGEROUS_PATTERNS.some(p => p.test(val)),
            "Mensagem contém conteúdo não permitido."
        ),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/**
 * Sanitiza texto removendo:
 * - Tags HTML
 * - Caracteres de controle (previne header injection)
 * - Múltiplos espaços
 */
export function sanitizeText(value: string): string {
    return value
        .replace(/<[^>]*>?/gm, "")           // Remove HTML tags
        .replace(HEADER_INJECTION_PATTERN, " ") // Remove caracteres de controle
        .replace(/\s+/g, " ")                 // Normaliza espaços
        .trim();
}

/**
 * Normaliza telefone mantendo apenas dígitos e formatação básica
 */
export function normalizePhone(value: string): string {
    return value.replace(/[^\d+\s()-]/g, "").trim();
}
