import { createSign } from "crypto";
import { sanitizeText } from "@/lib/validations";
import type { SlotSuggestion } from "./scheduling";

export type LeadBooking = {
    name: string;
    phone: string;
    email?: string;
    caseSummary: string;
    urgency: "alta" | "media" | "baixa";
    slot?: SlotSuggestion;
    preferredChannel?: string;
    timezone?: string;
    notes?: string;
    source?: string;
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function getSheetsConfig() {
    const sheetId = process.env.GOOGLE_SHEETS_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE ?? "Leads!A1";
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n");

    return {
        sheetId,
        range,
        clientEmail,
        privateKey,
        isReady: Boolean(sheetId && range && clientEmail && privateKey),
    };
}

async function getAccessToken(email: string, key: string) {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: email,
        scope: SHEETS_SCOPE,
        aud: GOOGLE_TOKEN_URL,
        exp: now + 3600,
        iat: now,
    };

    const encodedHeader = Buffer.from(
        JSON.stringify({ alg: "RS256", typ: "JWT" }),
    ).toString("base64url");
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const toSign = `${encodedHeader}.${encodedPayload}`;

    const signer = createSign("RSA-SHA256");
    signer.update(toSign);
    const signature = signer.sign(key, "base64url");

    const assertion = `${toSign}.${signature}`;

    const response = await fetch(GOOGLE_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion,
        }),
    });

    if (!response.ok) {
        throw new Error(`Token request failed: ${response.status}`);
    }

    const json = (await response.json()) as { access_token?: string };
    if (!json.access_token) {
        throw new Error("Token response missing access_token");
    }

    return json.access_token;
}

export async function appendLeadToSheet(payload: LeadBooking) {
    const config = getSheetsConfig();
    if (!config.isReady) {
        return {
            ok: false as const,
            message: "Google Sheets não configurado",
        };
    }

    const accessToken = await getAccessToken(config.clientEmail!, config.privateKey!);

    const safeNotes = sanitizeText(payload.notes ?? "").slice(0, 600);
    const safeSummary = sanitizeText(payload.caseSummary).slice(0, 1500);
    const slotLabel = payload.slot?.label ?? "A combinar";
    const slotIso = payload.slot?.iso ?? "-";

    const values = [
        [
            new Date().toISOString(),
            sanitizeText(payload.name),
            sanitizeText(payload.phone),
            payload.email?.trim() ?? "-",
            safeSummary,
            payload.urgency,
            slotLabel,
            slotIso,
            payload.timezone ?? "America/Sao_Paulo",
            payload.preferredChannel ?? "online",
            safeNotes || "-",
            payload.source ?? "assistente-ia",
        ],
    ];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/${encodeURIComponent(
        config.range,
    )}:append?valueInputOption=USER_ENTERED`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha ao gravar planilha: ${response.status} - ${errorText}`);
    }

    return { ok: true as const, message: "Registro salvo na agenda" };
}
