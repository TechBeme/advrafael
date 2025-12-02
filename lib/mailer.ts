import nodemailer from "nodemailer";
import type { ContactPayload } from "./validations";

const mailConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    secure: process.env.SMTP_SECURE === "true",
};

const transportReady =
    mailConfig.host && mailConfig.port && mailConfig.from && mailConfig.to;

export async function sendContactMessage(payload: ContactPayload) {
    if (!transportReady) {
        console.info("[contato] Mensagem registrada (modo log)", {
            ...payload,
            message: payload.message.slice(0, 400),
        });
        return;
    }

    const transporter = nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
        auth:
            mailConfig.user && mailConfig.pass
                ? {
                      user: mailConfig.user,
                      pass: mailConfig.pass,
                  }
                : undefined,
    });

    await transporter.sendMail({
        from: mailConfig.from,
        to: mailConfig.to,
        replyTo: payload.email,
        subject: `Site - contato: ${payload.reason}`,
        text: formatPlainText(payload),
    });
}

function formatPlainText(payload: ContactPayload) {
    return [
        `Nome: ${payload.name}`,
        `E-mail: ${payload.email}`,
        `Telefone/WhatsApp: ${payload.phone}`,
        `Motivo: ${payload.reason}`,
        "",
        payload.message,
    ].join("\n");
}
