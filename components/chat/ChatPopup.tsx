'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { FiMessageCircle, FiX, FiSend, FiMic, FiSquare } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const INITIAL_MESSAGES = [
    'Olá! Sou a Clara, assistente do Dr. Rafael Vieira. Posso ajudar você a agendar uma consultoria ou tirar dúvidas iniciais sobre nosso atendimento. Como posso ajudar?',
];

export function ChatPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/assistente',
        }),
    });

    const isLoading = status === 'streaming' || status === 'submitted';

    // Show notification after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasInteracted) {
                setShowNotification(true);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [hasInteracted]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Listen for openChat event
    useEffect(() => {
        const handleOpenChat = () => {
            setIsOpen(true);
            setShowNotification(false);
            setHasInteracted(true);
        };
        window.addEventListener('openChat', handleOpenChat);
        return () => window.removeEventListener('openChat', handleOpenChat);
    }, []);

    const handleOpen = () => {
        setIsOpen(true);
        setShowNotification(false);
        setHasInteracted(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        sendMessage({
            role: 'user',
            parts: [{ type: 'text', text: inputValue }],
        });
        setInputValue('');
    };

    // Get message content from parts
    const getMessageContent = (message: (typeof messages)[0]) => {
        if (!message.parts) return '';
        return message.parts
            .filter((part) => part.type === 'text')
            .map((part) => (part as { type: 'text'; text: string }).text)
            .join('');
    };

    // Audio recording functions
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                stream.getTracks().forEach(track => track.stop());
                await transcribeAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const transcribeAudio = async (audioBlob: Blob) => {
        setIsTranscribing(true);
        try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.webm');

            const response = await fetch('/api/assistente/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Transcription failed');

            const { text } = await response.json();
            if (text && text.trim()) {
                setInputValue(text);
                // Auto-send the transcribed message
                sendMessage({
                    role: 'user',
                    parts: [{ type: 'text', text: text }],
                });
                setInputValue('');
            }
        } catch (error) {
            console.error('Transcription error:', error);
            alert('Não foi possível transcrever o áudio. Tente novamente.');
        } finally {
            setIsTranscribing(false);
        }
    };

    return (
        <>
            {/* Notification Bubble */}
            <AnimatePresence>
                {showNotification && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="fixed bottom-24 right-6 z-50 max-w-[280px]"
                    >
                        <div
                            className="cursor-pointer rounded-2xl rounded-br-sm border border-stone-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl"
                            onClick={handleOpen}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                        <Image
                                            src="/images/clara.jpeg"
                                            alt="Clara"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="mb-1 text-xs text-stone-500">Clara · Assistente</p>
                                    <p className="text-sm font-medium text-stone-900">{INITIAL_MESSAGES[0]}</p>
                                </div>
                            </div>
                            <div className="mt-3 border-t border-stone-100 pt-3">
                                <button className="text-sm font-medium text-accent transition-colors hover:text-accent-dark">
                                    Clique para conversar →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Button */}
            <motion.button
                onClick={isOpen ? handleClose : handleOpen}
                className={cn(
                    'fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all',
                    isOpen
                        ? 'h-12 w-12 bg-stone-100 text-stone-700 hover:bg-stone-200'
                        : 'h-14 w-14 bg-accent text-white hover:shadow-xl'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
            >
                {isOpen ? (
                    <FiX className="h-5 w-5" />
                ) : (
                    <>
                        <FiMessageCircle className="h-6 w-6" />
                        {/* Online indicator */}
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-green-500">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                        </span>
                    </>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl"
                    >
                        {/* Header */}
                        <div className="border-b border-stone-100 bg-stone-50 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                        <Image
                                            src="/images/clara.jpeg"
                                            alt="Clara"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-stone-900">Clara</p>
                                    <p className="flex items-center gap-1 text-xs text-green-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                        Online
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[320px] space-y-4 overflow-y-auto bg-stone-50/50 p-4">
                            {/* Initial greeting */}
                            {messages.length === 0 && (
                                <div className="space-y-2">
                                    {INITIAL_MESSAGES.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.3 }}
                                            className="flex gap-2"
                                        >
                                            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                                <Image
                                                    src="/images/clara.jpeg"
                                                    alt="Clara"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-4 py-2 shadow-sm">
                                                <p className="text-sm text-stone-700">{msg}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Chat messages */}
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn('flex gap-2', message.role === 'user' && 'flex-row-reverse')}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                            <Image
                                                src="/images/clara.jpeg"
                                                alt="Clara"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div
                                        className={cn(
                                            'max-w-[80%] rounded-2xl px-4 py-2',
                                            message.role === 'user'
                                                ? 'rounded-tr-sm bg-accent text-white'
                                                : 'rounded-tl-sm bg-white text-stone-700 shadow-sm'
                                        )}
                                    >
                                        <p className="whitespace-pre-wrap text-sm">{getMessageContent(message)}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                        <Image
                                            src="/images/clara.jpeg"
                                            alt="Clara"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span
                                                className="h-2 w-2 animate-bounce rounded-full bg-stone-400"
                                                style={{ animationDelay: '0ms' }}
                                            />
                                            <span
                                                className="h-2 w-2 animate-bounce rounded-full bg-stone-400"
                                                style={{ animationDelay: '150ms' }}
                                            />
                                            <span
                                                className="h-2 w-2 animate-bounce rounded-full bg-stone-400"
                                                style={{ animationDelay: '300ms' }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="border-t border-stone-100 bg-white p-3">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={isTranscribing ? "Transcrevendo áudio..." : "Digite sua mensagem..."}
                                    className="flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                                    disabled={isLoading || isTranscribing}
                                />
                                {/* Audio button */}
                                <button
                                    type="button"
                                    onClick={isRecording ? stopRecording : startRecording}
                                    disabled={isLoading || isTranscribing}
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                                        isRecording
                                            ? "bg-red-500 text-white animate-pulse hover:bg-red-600"
                                            : "bg-stone-100 text-stone-600 hover:bg-stone-200",
                                        (isLoading || isTranscribing) && "opacity-50 cursor-not-allowed"
                                    )}
                                    title={isRecording ? "Parar gravação" : "Gravar áudio"}
                                >
                                    {isRecording ? <FiSquare className="h-4 w-4" /> : <FiMic className="h-4 w-4" />}
                                </button>
                                {/* Send button */}
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading || isTranscribing}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <FiSend className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
