import { NextResponse } from "next/server";
import { contactSchema, normalizePhone, sanitizeText } from "@/lib/validations";
import { sendContactMessage } from "@/lib/mailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    message: "Dados inválidos. Revise os campos obrigatórios.",
                    issues: parsed.error.flatten().fieldErrors,
                },
                { status: 400 },
            );
        }

        const sanitized = {
            name: sanitizeText(parsed.data.name),
            email: parsed.data.email.trim(),
            phone: normalizePhone(parsed.data.phone),
            reason: sanitizeText(parsed.data.reason),
            message: sanitizeText(parsed.data.message),
        };

        await sendContactMessage(sanitized);

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("[api/contato] erro ao processar", error);
        return NextResponse.json(
            { message: "Não foi possível registrar o contato no momento." },
            { status: 500 },
        );
    }
}
