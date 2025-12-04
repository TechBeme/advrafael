type TimeRange = {
    start: string; // HH:mm
    end: string; // HH:mm
};

type DateParts = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    weekdayLabel: string;
};

export type SlotSuggestion = {
    iso: string;
    label: string;
    dayKey: string;
};

const SLOT_DURATION_MINUTES = 30;
const TIMEZONE = "America/Sao_Paulo";
const WORKING_WINDOWS: TimeRange[] = [
    { start: "09:30", end: "12:00" },
    { start: "14:00", end: "18:30" },
];
const MAX_DAYS_AHEAD = 7;
const MAX_SLOTS = 6;

function getZonedParts(date: Date): DateParts {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
        timeZone: TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
        hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
    const weekdayLabel =
        parts.find((p) => p.type === "weekday")?.value.replace("-feira", "").trim() ?? "";

    return {
        year: get("year"),
        month: get("month"),
        day: get("day"),
        hour: get("hour"),
        minute: get("minute"),
        weekdayLabel,
    };
}

function pad(value: number) {
    return value.toString().padStart(2, "0");
}

function parseTime(value: string) {
    const [hours, minutes] = value.split(":").map((item) => Number(item));
    return { hours, minutes };
}

function addDays(date: Date, days: number) {
    const copy = new Date(date);
    copy.setUTCDate(copy.getUTCDate() + days);
    return copy;
}

function formatSlot(parts: DateParts, minutesOfDay: number): SlotSuggestion {
    const hour = Math.floor(minutesOfDay / 60);
    const minute = minutesOfDay % 60;

    const iso = [
        `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`,
        `T${pad(hour)}:${pad(minute)}:00-03:00`,
    ].join("");

    const label = `${parts.weekdayLabel}, ${pad(parts.day)}/${pad(parts.month)} às ${pad(hour)}:${pad(minute)} (Brasília)`;

    return {
        iso,
        label,
        dayKey: `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`,
    };
}

function minutesSinceMidnight(time: string) {
    const { hours, minutes } = parseTime(time);
    return hours * 60 + minutes;
}

export function getAvailableSlots(options?: {
    urgency?: "alta" | "media" | "baixa";
    now?: Date;
    maxResults?: number;
}) {
    const now = options?.now ?? new Date();
    const nowParts = getZonedParts(now);
    const nowMinutes = nowParts.hour * 60 + nowParts.minute + 60; // buffer of 1h to evitar encaixe apertado

    const slots: SlotSuggestion[] = [];

    for (let offset = 0; offset <= MAX_DAYS_AHEAD; offset += 1) {
        if (slots.length >= (options?.maxResults ?? MAX_SLOTS)) break;

        const day = addDays(now, offset);
        const parts = getZonedParts(day);
        const weekday = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            timeZone: TIMEZONE,
        }).format(day);

        // Skip weekends to manter agenda enxuta
        if (weekday === "Sat" || weekday === "Sun") continue;

        const minMinutes = offset === 0 ? nowMinutes : 0;

        for (const window of WORKING_WINDOWS) {
            const start = minutesSinceMidnight(window.start);
            const end = minutesSinceMidnight(window.end);

            for (let cursor = start; cursor + SLOT_DURATION_MINUTES <= end; cursor += SLOT_DURATION_MINUTES) {
                if (cursor < minMinutes) continue;

                slots.push(formatSlot(parts, cursor));
                if (slots.length >= (options?.maxResults ?? MAX_SLOTS)) break;
            }
            if (slots.length >= (options?.maxResults ?? MAX_SLOTS)) break;
        }
    }

    return slots;
}

export function buildAvailabilitySummary(slots: SlotSuggestion[]) {
    return slots.map((slot) => `- ${slot.label} | ISO: ${slot.iso}`).join("\n");
}
