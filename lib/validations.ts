import { z } from "zod";

/**
 * Sanitiza para texto puro - remove TUDO que não seja texto básico
 * Mantém apenas: letras, números, espaços e pontuação básica
 */
function toRawText(value: string): string {
    return value
        // Remove qualquer tag HTML/XML (incluindo malformadas)
        .replace(/<[^>]*>?/gm, "")
        .replace(/<[^>]*$/gm, "")
        // Remove URLs
        .replace(/https?:\/\/[^\s]*/gi, "")
        .replace(/www\.[^\s]*/gi, "")
        .replace(/ftp:\/\/[^\s]*/gi, "")
        // Remove protocolos perigosos
        .replace(/javascript:[^\s]*/gi, "")
        .replace(/data:[^\s]*/gi, "")
        .replace(/vbscript:[^\s]*/gi, "")
        .replace(/file:[^\s]*/gi, "")
        // Remove HTML entities
        .replace(/&[#\w]+;/g, "")
        // Remove URL encoding
        .replace(/%[0-9A-Fa-f]{2}/g, "")
        // Remove caracteres de controle (0x00-0x1F, 0x7F)
        .replace(/[\x00-\x1F\x7F]/g, "")
        // Remove caracteres Unicode perigosos (RTL override, zero-width, etc)
        .replace(/[\u200B-\u200F\u202A-\u202E\uFEFF]/g, "")
        // Remove backslashes (escape sequences)
        .replace(/\\/g, "")
        // Remove múltiplos espaços
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Verifica se o texto contém padrões suspeitos
 */
function hasSuspiciousContent(value: string): boolean {
    const suspicious = [
        /<[^>]*>/,                    // Qualquer tag
        /javascript\s*:/i,            // JS protocol
        /data\s*:/i,                  // Data URL
        /vbscript\s*:/i,              // VBScript
        /on\w+\s*=/i,                 // Event handlers
        /&[#\w]+;/,                   // HTML entities
        /%[0-9A-Fa-f]{2}/,            // URL encoding
        /\beval\s*\(/i,               // eval()
        /\bexpression\s*\(/i,         // CSS expression
        /\burl\s*\(/i,                // CSS url()
        /@import/i,                   // CSS import
        /\bsrcdoc\s*=/i,              // srcdoc attribute
        /\bformaction\s*=/i,          // formaction attribute
        /\bxlink:href/i,              // SVG xlink
        /\bbase64/i,                  // Base64 encoding
    ];
    return suspicious.some(pattern => pattern.test(value));
}

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Informe seu nome completo.")
        .max(120, "Nome muito longo.")
        .transform(toRawText)
        .refine(val => val.length >= 3, "Informe seu nome completo.")
        .refine(val => !hasSuspiciousContent(val), "Nome contém caracteres inválidos."),
    phone: z
        .string()
        .trim()
        .min(8, "Informe um telefone ou WhatsApp.")
        .max(30, "Telefone muito longo.")
        // Telefone: APENAS dígitos, +, (), -, espaços
        .transform(val => val.replace(/[^\d+\s()-]/g, "").trim())
        .refine(val => val.length >= 8, "Telefone inválido."),
    message: z
        .string()
        .trim()
        .min(20, "Descreva o essencial do caso em pelo menos 20 caracteres.")
        .max(1500, "Mensagem muito longa.")
        .transform(toRawText)
        .refine(val => val.length >= 20, "Descreva o essencial do caso.")
        .refine(val => !hasSuspiciousContent(val), "Mensagem contém conteúdo não permitido."),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/**
 * Sanitização final antes de enviar (dupla proteção)
 */
export function sanitizeText(value: string): string {
    return toRawText(value);
}

/**
 * Normaliza telefone - apenas dígitos e formatação básica
 */
export function normalizePhone(value: string): string {
    return value.replace(/[^\d+\s()-]/g, "").trim();
}
