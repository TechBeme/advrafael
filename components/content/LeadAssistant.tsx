'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { FiMessageCircle, FiSend, FiX, FiClock, FiVolume2, FiVolumeX } from "react-icons/fi";
import { cn } from "@/lib/utils";

const initialMessages: UIMessage[] = [
    {
        id: "saudacao-inicial",
        role: "assistant",
        parts: [
            {
                type: "text",
                text: "Olá! Sou a assistente do Rafael. Posso entender rapidamente o que aconteceu e já alinhar um horário? Conte em poucas linhas o que você precisa resolver.",
            },
        ],
    },
];

const quickPrompts = [
    "Preciso de ajuda em um problema de consumo",
    "Tenho um prazo ou audiência urgente",
    "Quero marcar uma reunião para analisar documentos",
];

function playToneWithOscillator() {
    try {
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        const beep = (frequency: number, start: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = frequency;
            gain.gain.setValueAtTime(0.0001, now + start);
            gain.gain.exponentialRampToValueAtTime(0.2, now + start + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
            osc.connect(gain).connect(ctx.destination);
            osc.start(now + start);
            osc.stop(now + start + duration + 0.02);
        };

        beep(932, 0, 0.18);
        beep(1244, 0.22, 0.18);
    } catch {
        // ignore fallback errors
    }
}

export function LeadAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [soundEnabled, setSoundEnabled] = useState(true);
    const latestAssistantId = useRef<string | null>(null);
    const initialPingDoneRef = useRef(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const transport = useMemo(
        () =>
            new DefaultChatTransport({
                api: "/api/assistente",
            }),
        [],
    );

    const { messages, sendMessage, status, error, clearError } = useChat({
        id: "assistente-leads",
        messages: initialMessages,
        transport,
        resume: true,
    });

    useEffect(() => {
        audioRef.current = new Audio("/sounds/whatsapp-chime.wav");
        audioRef.current.volume = 0.8;
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    const playNotification = useCallback(() => {
        if (!soundEnabled) return;
        const sound = audioRef.current;

        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => playToneWithOscillator());
            return;
        }

        playToneWithOscillator();
    }, [soundEnabled]);

    useEffect(() => {
        const last = messages[messages.length - 1];
        if (!last || last.role !== "assistant") return;
        if (last.id === "saudacao-inicial" && isOpen && !initialPingDoneRef.current) {
            playNotification();
            initialPingDoneRef.current = true;
            latestAssistantId.current = last.id;
            return;
        }

        if (latestAssistantId.current === last.id) return;
        latestAssistantId.current = last.id;

        playNotification();
    }, [messages, isOpen, playNotification]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        sendMessage({
            role: "user",
            parts: [{ type: "text", text: trimmed }],
        });
        setInput("");
        clearError?.();
    };

    const handleQuickPrompt = (prompt: string) => {
        sendMessage({
            role: "user",
            parts: [{ type: "text", text: prompt }],
        });
        clearError?.();
        setIsOpen(true);
    };

    const visibleMessages = messages.filter((message) => message.role !== "system");
    const isStreaming = status === "streaming" || status === "submitted";

    return (
        <div className="fixed bottom-4 right-4 z-40 w-[min(460px,calc(100%-1.5rem))] space-y-2 md:bottom-6 md:right-6">
            <div
                className={cn(
                    "transition-all duration-300",
                    isOpen
                        ? "opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0 drop-shadow-none",
                )}
            >
                <div className="rounded-2xl border border-border/80 bg-white/95 p-4 shadow-soft backdrop-blur">
                    <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                Assistente IA
                            </p>
                            <p className="text-sm font-semibold text-ink">Triagem rápida com o time</p>
                            <p className="flex items-center gap-1 text-xs text-muted">
                                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                On-line agora · responde em segundos
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="rounded-full border border-border bg-highlight p-2 text-primary transition hover:border-primary hover:text-primary"
                                onClick={() => setSoundEnabled((prev) => !prev)}
                                aria-label={soundEnabled ? "Desativar som" : "Ativar som"}
                            >
                                {soundEnabled ? (
                                    <FiVolume2 className="h-4 w-4" aria-hidden="true" />
                                ) : (
                                    <FiVolumeX className="h-4 w-4" aria-hidden="true" />
                                )}
                            </button>
                            <button
                                type="button"
                                className="rounded-full border border-border bg-highlight p-2 text-primary transition hover:border-primary hover:text-primary"
                                onClick={() => setIsOpen(false)}
                                aria-label="Minimizar chat"
                            >
                                <FiX className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div className="mb-3 flex items-center gap-2 rounded-lg bg-highlight px-3 py-2 text-xs text-muted">
                        <FiClock className="h-4 w-4 text-primary" aria-hidden="true" />
                        <span>
                            A meta é entender a urgência e já reservar um horário. Envie sua mensagem no seu
                            ritmo.
                        </span>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                        {quickPrompts.map((prompt) => (
                            <button
                                key={prompt}
                                type="button"
                                className="rounded-full border border-border bg-highlight px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-primary hover:text-primary"
                                onClick={() => handleQuickPrompt(prompt)}
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>

                    <div className="mb-3 max-h-[46vh] space-y-3 overflow-y-auto pr-1">
                        {visibleMessages.map((message) => {
                            const isAssistant = message.role === "assistant";
                            const text = message.parts
                                .filter((part) => part.type === "text")
                                .map((part) => ("text" in part ? part.text : ""))
                                .join(" ");

                            return (
                                <div
                                    key={message.id}
                                    className={cn("flex", isAssistant ? "justify-start" : "justify-end")}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[90%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                                            isAssistant
                                                ? "rounded-bl-sm bg-highlight text-ink"
                                                : "rounded-br-sm bg-primary text-primary-foreground",
                                        )}
                                    >
                                        {text || "…"}
                                    </div>
                                </div>
                            );
                        })}
                        {isStreaming ? (
                            <div className="flex items-center gap-2 text-xs text-muted">
                                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" />
                                Rafael está analisando sua mensagem...
                            </div>
                        ) : null}
                        {error ? (
                            <div className="text-xs text-danger">
                                Não consegui responder agora. Tente de novo em alguns segundos.
                            </div>
                        ) : null}
                    </div>

                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <label className="sr-only" htmlFor="assistente-input">
                            Enviar mensagem
                        </label>
                        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 shadow-inner focus-within:border-primary focus-within:shadow-outline">
                            <input
                                id="assistente-input"
                                className="flex-1 border-none bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
                                placeholder="Conte o que aconteceu e quando precisa resolver"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:translate-x-px hover:shadow-card disabled:opacity-60"
                                disabled={!input.trim()}
                            >
                                <FiSend className="h-4 w-4" aria-hidden="true" />
                                Enviar
                            </button>
                        </div>
                        <p className="text-[11px] text-muted">
                            Evite dados sensíveis aqui. Usamos IA apenas para agilizar a triagem e o agendamento.
                        </p>
                    </form>
                </div>
            </div>

            {!isOpen ? (
                <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-full border border-primary/30 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:translate-y-[-2px] hover:shadow-card"
                    onClick={() => setIsOpen(true)}
                >
                    <span className="flex items-center gap-2">
                        <FiMessageCircle className="h-4 w-4" aria-hidden="true" />
                        Assistente disponível agora
                    </span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </button>
            ) : null}
        </div>
    );
}
