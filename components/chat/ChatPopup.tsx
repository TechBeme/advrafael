'use client';

import { useState, useRef, useEffect, FormEvent, useCallback } from 'react';
import { useChat, type UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { FiMessageCircle, FiX, FiSend, FiMic, FiSquare } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

// Variações de mensagem inicial - será escolhida aleatoriamente
const INITIAL_MESSAGES = [
    'Oi! Aqui é a Clara, do escritório do Dr. Rafael. Você está passando por algum problema que precisa de um advogado?',
    'Oi! Sou a Clara, do escritório do Dr. Rafael. Me conta, o que está acontecendo?',
    'Oi! Aqui é a Clara, secretária do Dr. Rafael. Está precisando de ajuda com alguma situação?',
    'Oi! Clara aqui, do escritório do Dr. Rafael. Tem algo te preocupando que a gente possa ajudar?',
    'Oi! Sou a Clara, do escritório do Dr. Rafael. Qual situação te trouxe aqui hoje?',
];

// Função para pegar mensagem aleatória
function getRandomInitialMessage() {
    return INITIAL_MESSAGES[Math.floor(Math.random() * INITIAL_MESSAGES.length)];
}

// Configurações de delay para parecer humano
const READING_SPEED_MS_PER_CHAR = 80; // Tempo para "ler" cada caractere da mensagem do usuário
const TYPING_SPEED_MS_PER_CHAR = 40; // Tempo para "digitar" cada caractere da resposta
const MIN_READING_DELAY_MS = 2000; // Mínimo de tempo de leitura
const MAX_READING_DELAY_MS = 8000; // Máximo de tempo de leitura
const MIN_TYPING_DELAY_MS = 2500; // Mínimo de tempo mostrando "digitando"
const MAX_TYPING_DELAY_MS = 8000; // Máximo de tempo mostrando "digitando"
const USER_IDLE_TIMEOUT_MS = 60000; // 60 segundos para considerar que usuário terminou de digitar

// Calcula delay de leitura baseado no tamanho da mensagem do usuário
function calculateReadingDelay(userMessage: string): number {
    const charCount = userMessage.length;
    const readingTime = charCount * READING_SPEED_MS_PER_CHAR;
    return Math.min(Math.max(readingTime, MIN_READING_DELAY_MS), MAX_READING_DELAY_MS);
}

// Calcula delay de "digitação" baseado no tamanho da resposta
function calculateTypingDelay(responseLength: number): number {
    const typingTime = responseLength * TYPING_SPEED_MS_PER_CHAR;
    // Adiciona variação aleatória de ±15%
    const variation = typingTime * (0.85 + Math.random() * 0.3);
    return Math.min(Math.max(variation, MIN_TYPING_DELAY_MS), MAX_TYPING_DELAY_MS);
}

export function ChatPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [initialMessage] = useState(() => getRandomInitialMessage());

    // Estados para controle de delays humanizados
    const [isTypingIndicatorVisible, setIsTypingIndicatorVisible] = useState(false); // Mostra "digitando..."
    const [visibleMessages, setVisibleMessages] = useState<UIMessage[]>([]); // Mensagens realmente mostradas na UI
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    
    // Refs para controle de timing (precisam ser refs para funcionar dentro de async/await)
    const userTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const responseQueueRef = useRef<{ message: UIMessage; readingDelay: number; typingDelay: number }[]>([]);
    const isProcessingQueueRef = useRef(false);
    const isUserTypingRef = useRef(false); // Ref para checar em tempo real
    const currentDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Para cancelar delays em andamento
    const shouldCancelRef = useRef(false); // Flag para cancelar processamento

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/assistente',
        }),
    });

    const actualIsLoading = status === 'streaming' || status === 'submitted';

    // Get message content from parts
    const getMessageContent = useCallback((message: UIMessage) => {
        if (!message.parts) return '';
        return message.parts
            .filter((part) => part.type === 'text')
            .map((part) => (part as { type: 'text'; text: string }).text)
            .join('');
    }, []);

    // Cancela todo o processamento pendente
    const cancelPendingProcessing = useCallback(() => {
        shouldCancelRef.current = true;
        setIsTypingIndicatorVisible(false);
        
        // Cancela qualquer delay em andamento
        if (currentDelayTimeoutRef.current) {
            clearTimeout(currentDelayTimeoutRef.current);
            currentDelayTimeoutRef.current = null;
        }
        
        isProcessingQueueRef.current = false;
    }, []);

    // Função de delay cancelável
    const cancelableDelay = useCallback((ms: number): Promise<boolean> => {
        return new Promise((resolve) => {
            currentDelayTimeoutRef.current = setTimeout(() => {
                currentDelayTimeoutRef.current = null;
                // Retorna true se NÃO foi cancelado
                resolve(!shouldCancelRef.current && !isUserTypingRef.current);
            }, ms);
        });
    }, []);

    // Processa a fila de respostas pendentes
    const processResponseQueue = useCallback(async () => {
        if (isProcessingQueueRef.current || responseQueueRef.current.length === 0) return;
        if (isUserTypingRef.current) return;

        isProcessingQueueRef.current = true;
        shouldCancelRef.current = false;

        while (responseQueueRef.current.length > 0) {
            // Verifica se deve cancelar
            if (shouldCancelRef.current || isUserTypingRef.current) {
                setIsTypingIndicatorVisible(false);
                isProcessingQueueRef.current = false;
                return;
            }

            const item = responseQueueRef.current[0];

            // Fase 1: Tempo de leitura (nada acontece na UI)
            const continueAfterReading = await cancelableDelay(item.readingDelay);
            if (!continueAfterReading) {
                isProcessingQueueRef.current = false;
                return;
            }

            // Fase 2: Tempo de digitação (mostra indicador)
            setIsTypingIndicatorVisible(true);
            const continueAfterTyping = await cancelableDelay(item.typingDelay);
            if (!continueAfterTyping) {
                setIsTypingIndicatorVisible(false);
                isProcessingQueueRef.current = false;
                return;
            }

            // Fase 3: Mostra a mensagem
            setIsTypingIndicatorVisible(false);
            setVisibleMessages(prev => [...prev, item.message]);
            responseQueueRef.current.shift();
        }

        isProcessingQueueRef.current = false;
    }, [cancelableDelay]);

    // Quando usuário para de digitar E input está vazio, processa a fila
    useEffect(() => {
        if (!isUserTypingRef.current && inputValue === '' && responseQueueRef.current.length > 0) {
            shouldCancelRef.current = false;
            processResponseQueue();
        }
    }, [inputValue, processResponseQueue]);

    // Monitora novas mensagens do assistant e adiciona à fila
    useEffect(() => {
        if (status === 'ready' && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];

            // Se é mensagem do assistant que ainda não está visível
            if (lastMessage.role === 'assistant') {
                const isAlreadyVisible = visibleMessages.some(m => m.id === lastMessage.id);
                const isInQueue = responseQueueRef.current.some(item => item.message.id === lastMessage.id);

                if (!isAlreadyVisible && !isInQueue) {
                    const responseText = getMessageContent(lastMessage);
                    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                    const userMsgText = lastUserMsg ? getMessageContent(lastUserMsg) : '';

                    responseQueueRef.current.push({
                        message: lastMessage,
                        readingDelay: calculateReadingDelay(userMsgText),
                        typingDelay: calculateTypingDelay(responseText.length),
                    });

                    // Só inicia processamento se usuário não está digitando E input está vazio
                    if (!isUserTypingRef.current && inputValue === '') {
                        processResponseQueue();
                    }
                }
            }
        }
    }, [messages, status, visibleMessages, getMessageContent, inputValue, processResponseQueue]);

    // Sincroniza mensagens do usuário imediatamente
    useEffect(() => {
        const userMessages = messages.filter(m => m.role === 'user');
        const visibleUserMessages = visibleMessages.filter(m => m.role === 'user');

        if (userMessages.length > visibleUserMessages.length) {
            // Adiciona mensagens do usuário que ainda não estão visíveis
            const newUserMessages = userMessages.filter(
                um => !visibleMessages.some(vm => vm.id === um.id)
            );
            if (newUserMessages.length > 0) {
                setVisibleMessages(prev => [...prev, ...newUserMessages]);
            }
        }
    }, [messages, visibleMessages]);

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
    }, [visibleMessages, isTypingIndicatorVisible]);

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

    // Detecta quando usuário está digitando e cancela processamento da Clara
    const handleInputChange = (value: string) => {
        setInputValue(value);

        // Limpa timeout anterior
        if (userTypingTimeoutRef.current) {
            clearTimeout(userTypingTimeoutRef.current);
            userTypingTimeoutRef.current = null;
        }

        if (value.length > 0) {
            // Usuário está digitando - CANCELA TUDO
            isUserTypingRef.current = true;
            cancelPendingProcessing();

            // Se usuário não enviar em 60s, considera que terminou (timeout)
            userTypingTimeoutRef.current = setTimeout(() => {
                isUserTypingRef.current = false;
                // Após timeout, se ainda tem texto, processa a fila
                if (responseQueueRef.current.length > 0) {
                    shouldCancelRef.current = false;
                    processResponseQueue();
                }
            }, USER_IDLE_TIMEOUT_MS);
        } else {
            // Input está vazio - usuário apagou tudo
            isUserTypingRef.current = false;
            // Se tem respostas pendentes e não está processando, inicia
            if (responseQueueRef.current.length > 0 && !isProcessingQueueRef.current) {
                shouldCancelRef.current = false;
                processResponseQueue();
            }
        }
    };

    // Envia mensagem e processa
    const handleSendMessage = useCallback((text: string) => {
        // Limpa o timeout de digitação
        if (userTypingTimeoutRef.current) {
            clearTimeout(userTypingTimeoutRef.current);
            userTypingTimeoutRef.current = null;
        }
        
        isUserTypingRef.current = false;

        // Envia a mensagem para a API
        sendMessage({
            role: 'user',
            parts: [{ type: 'text', text }],
        });
    }, [sendMessage]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const text = inputValue.trim();
        setInputValue('');
        handleSendMessage(text);
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
                setInputValue('');
                isUserTypingRef.current = false;
                handleSendMessage(text.trim());
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
                                    <p className="mb-1 text-xs text-stone-500">Clara · Secretária</p>
                                    <p className="text-sm font-medium text-stone-900">{initialMessage}</p>
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
                            {visibleMessages.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
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
                                        <p className="text-sm text-stone-700">{initialMessage}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Chat messages */}
                            {visibleMessages.map((message) => (
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
                                        {message.role === 'user' ? (
                                            <p className="whitespace-pre-wrap text-sm">{getMessageContent(message)}</p>
                                        ) : (
                                            <div className="prose prose-sm prose-stone max-w-none text-sm [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_strong]:text-stone-800 [&_a]:text-accent [&_a]:underline">
                                                <ReactMarkdown>{getMessageContent(message)}</ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator - mostra apenas durante fase de digitação */}
                            {isTypingIndicatorVisible && (
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
                                        <div className="flex items-center gap-2">
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
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    placeholder={isTranscribing ? "Transcrevendo áudio..." : "Digite sua mensagem..."}
                                    className="flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                                    disabled={isTranscribing}
                                />
                                {/* Audio button */}
                                <button
                                    type="button"
                                    onClick={isRecording ? stopRecording : startRecording}
                                    disabled={isTranscribing}
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                                        isRecording
                                            ? "bg-red-500 text-white animate-pulse hover:bg-red-600"
                                            : "bg-stone-100 text-stone-600 hover:bg-stone-200",
                                        isTranscribing && "opacity-50 cursor-not-allowed"
                                    )}
                                    title={isRecording ? "Parar gravação" : "Gravar áudio"}
                                >
                                    {isRecording ? <FiSquare className="h-4 w-4" /> : <FiMic className="h-4 w-4" />}
                                </button>
                                {/* Send button */}
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTranscribing}
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
