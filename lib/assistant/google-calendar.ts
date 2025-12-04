import { createSign } from "crypto";

export type CalendarEvent = {
    id: string;
    summary: string;
    start: string;
    end: string;
    status: string;
};

export type CreateEventInput = {
    summary: string;
    description?: string;
    startDateTime: string; // ISO format
    endDateTime: string; // ISO format
    attendeeEmail?: string;
    attendeeName?: string;
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";

function getCalendarConfig() {
    const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n");

    return {
        calendarId,
        clientEmail,
        privateKey,
        isReady: Boolean(clientEmail && privateKey),
    };
}

async function getAccessToken(email: string, key: string) {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: email,
        scope: CALENDAR_SCOPE,
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
        const errorText = await response.text();
        throw new Error(`Token request failed: ${response.status} - ${errorText}`);
    }

    const json = (await response.json()) as { access_token?: string };
    if (!json.access_token) {
        throw new Error("Token response missing access_token");
    }

    return json.access_token;
}

/**
 * Busca eventos do calendário em um período
 */
export async function getCalendarEvents(options?: {
    timeMin?: Date;
    timeMax?: Date;
    maxResults?: number;
}): Promise<{ ok: true; events: CalendarEvent[] } | { ok: false; message: string }> {
    const config = getCalendarConfig();
    if (!config.isReady) {
        return {
            ok: false,
            message: "Google Calendar não configurado",
        };
    }

    try {
        const accessToken = await getAccessToken(config.clientEmail!, config.privateKey!);

        const now = new Date();
        const timeMin = options?.timeMin ?? now;
        const timeMax = options?.timeMax ?? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias

        const params = new URLSearchParams({
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            maxResults: String(options?.maxResults ?? 50),
            singleEvents: "true",
            orderBy: "startTime",
        });

        const url = `${CALENDAR_API_BASE}/calendars/${encodeURIComponent(config.calendarId)}/events?${params}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Calendar API error: ${response.status} - ${errorText}`);
        }

        const data = (await response.json()) as {
            items?: Array<{
                id: string;
                summary?: string;
                start?: { dateTime?: string; date?: string };
                end?: { dateTime?: string; date?: string };
                status?: string;
            }>;
        };

        const events: CalendarEvent[] = (data.items ?? [])
            .filter((item) => item.status !== "cancelled")
            .map((item) => ({
                id: item.id,
                summary: item.summary ?? "Sem título",
                start: item.start?.dateTime ?? item.start?.date ?? "",
                end: item.end?.dateTime ?? item.end?.date ?? "",
                status: item.status ?? "confirmed",
            }));

        return { ok: true, events };
    } catch (error) {
        console.error("[google-calendar] erro ao buscar eventos", error);
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Erro ao buscar agenda",
        };
    }
}

/**
 * Cria um evento no calendário
 */
export async function createCalendarEvent(
    input: CreateEventInput,
): Promise<{ ok: true; eventId: string; htmlLink: string } | { ok: false; message: string }> {
    const config = getCalendarConfig();
    if (!config.isReady) {
        return {
            ok: false,
            message: "Google Calendar não configurado",
        };
    }

    try {
        const accessToken = await getAccessToken(config.clientEmail!, config.privateKey!);

        const eventBody: Record<string, unknown> = {
            summary: input.summary,
            description: input.description ?? "",
            start: {
                dateTime: input.startDateTime,
                timeZone: "America/Sao_Paulo",
            },
            end: {
                dateTime: input.endDateTime,
                timeZone: "America/Sao_Paulo",
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 60 },
                    { method: "popup", minutes: 30 },
                ],
            },
        };

        // Adicionar participante se tiver email
        if (input.attendeeEmail) {
            eventBody.attendees = [
                {
                    email: input.attendeeEmail,
                    displayName: input.attendeeName ?? input.attendeeEmail,
                },
            ];
            eventBody.sendUpdates = "all"; // Enviar convite por email
        }

        const url = `${CALENDAR_API_BASE}/calendars/${encodeURIComponent(config.calendarId)}/events`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Calendar API error: ${response.status} - ${errorText}`);
        }

        const data = (await response.json()) as { id: string; htmlLink: string };

        return {
            ok: true,
            eventId: data.id,
            htmlLink: data.htmlLink,
        };
    } catch (error) {
        console.error("[google-calendar] erro ao criar evento", error);
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Erro ao criar evento",
        };
    }
}

/**
 * Verifica se um horário específico está livre
 */
export async function isSlotAvailable(
    startDateTime: string,
    endDateTime: string,
): Promise<{ available: boolean; conflictWith?: string }> {
    const result = await getCalendarEvents({
        timeMin: new Date(startDateTime),
        timeMax: new Date(endDateTime),
    });

    if (!result.ok) {
        // Em caso de erro, assumir disponível para não bloquear
        return { available: true };
    }

    const conflict = result.events.find((event) => {
        const eventStart = new Date(event.start).getTime();
        const eventEnd = new Date(event.end).getTime();
        const slotStart = new Date(startDateTime).getTime();
        const slotEnd = new Date(endDateTime).getTime();

        // Verificar sobreposição
        return slotStart < eventEnd && slotEnd > eventStart;
    });

    if (conflict) {
        return { available: false, conflictWith: conflict.summary };
    }

    return { available: true };
}
