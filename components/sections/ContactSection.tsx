'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiSend, FiMessageCircle, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'motion/react';
import { Button, MotionButton } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { FadeIn } from '@/components/motion';

const contactSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    whatsapp: z
        .string()
        .min(10, 'WhatsApp inválido')
        .regex(/^[\d\s()-]+$/, 'Formato inválido'),
    mensagem: z.string().min(10, 'Conte um pouco mais sobre seu caso'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const WHATSAPP_NUMBER = '553190726984';
const WHATSAPP_MESSAGE = encodeURIComponent(
    'Olá! Vim pelo site e gostaria de tirar uma dúvida sobre meu caso.'
);

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Mapear campos do formulário para o formato da API
            const payload = {
                name: data.nome,
                email: '', // E-mail não é coletado no formulário
                phone: data.whatsapp,
                reason: 'Contato via site',
                message: data.mensagem,
            };

            const response = await fetch('/api/contato', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Erro ao enviar');

            setSubmitStatus('success');
            reset();
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openChat = () => {
        window.dispatchEvent(new CustomEvent('openChat'));
    };

    return (
        <section id="contato" className="relative overflow-hidden bg-background py-24 md:py-32">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-background to-background" />
                <div className="absolute bottom-0 left-0 h-1/2 w-1/2 rounded-full bg-accent/5 blur-[100px]" />
            </div>

            <div className="container px-6">
                <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Coluna esquerda - Formulário */}
                    <FadeIn direction="left">
                        <div className="mb-8">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                                Contato
                            </p>
                            <h2 className="mb-4 font-display text-3xl font-bold text-stone-900 md:text-4xl">
                                Agende sua{' '}
                                <span className="text-accent">consultoria</span>
                            </h2>
                            <p className="text-lg text-stone-600">
                                Atendimento presencial em Belo Horizonte ou online para todo o Brasil
                            </p>
                        </div>

                        <Card variant="elevated" className="p-6 md:p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Nome */}
                                <div>
                                    <label
                                        htmlFor="nome"
                                        className="mb-2 block text-sm font-medium text-stone-900"
                                    >
                                        Nome
                                    </label>
                                    <input
                                        id="nome"
                                        type="text"
                                        placeholder="Seu nome completo"
                                        {...register('nome')}
                                        className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                                    />
                                    {errors.nome && (
                                        <p className="mt-1 text-sm text-red-500">{errors.nome.message}</p>
                                    )}
                                </div>

                                {/* WhatsApp */}
                                <div>
                                    <label
                                        htmlFor="whatsapp"
                                        className="mb-2 block text-sm font-medium text-stone-900"
                                    >
                                        WhatsApp
                                    </label>
                                    <input
                                        id="whatsapp"
                                        type="tel"
                                        placeholder="(31) 99999-9999"
                                        {...register('whatsapp')}
                                        className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                                    />
                                    {errors.whatsapp && (
                                        <p className="mt-1 text-sm text-red-500">{errors.whatsapp.message}</p>
                                    )}
                                </div>

                                {/* Mensagem */}
                                <div>
                                    <label
                                        htmlFor="mensagem"
                                        className="mb-2 block text-sm font-medium text-stone-900"
                                    >
                                        Como posso ajudar?
                                    </label>
                                    <textarea
                                        id="mensagem"
                                        rows={4}
                                        placeholder="Conte brevemente sobre sua situação..."
                                        {...register('mensagem')}
                                        className="w-full resize-none rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                                    />
                                    {errors.mensagem && (
                                        <p className="mt-1 text-sm text-red-500">{errors.mensagem.message}</p>
                                    )}
                                </div>

                                {/* Submit */}
                                <MotionButton
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                >
                                    {!isSubmitting && (
                                        <>
                                            <FiSend className="h-5 w-5" />
                                            Enviar Mensagem
                                        </>
                                    )}
                                </MotionButton>

                                {/* Status messages */}
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
                                    >
                                        <FiCheck className="h-5 w-5" />
                                        <span>Mensagem enviada! Retornarei em breve.</span>
                                    </motion.div>
                                )}
                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
                                    >
                                        <FiAlertCircle className="h-5 w-5" />
                                        <span>Erro ao enviar. Tente pelo WhatsApp.</span>
                                    </motion.div>
                                )}
                            </form>
                        </Card>
                    </FadeIn>

                    {/* Coluna direita - Cards empilhados */}
                    <FadeIn direction="right" delay={0.2} className="flex flex-col gap-4">
                        {/* Card Chat */}
                        <Card variant="glass" className="flex-1">
                            <CardContent className="flex h-full flex-col p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                                        <FiMessageCircle className="h-6 w-6" />
                                        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                                        </span>
                                    </span>
                                    <p className="font-semibold text-stone-900">Atendimento Online</p>
                                </div>
                                <p className="mb-6 flex-1 text-stone-600">
                                    Agende sua consultoria presencial ou por videochamada de forma rápida pelo chat.
                                </p>
                                <Button variant="primary" onClick={openChat} className="w-full">
                                    Agendar pelo Chat
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Card WhatsApp */}
                        <Card variant="glass" className="flex-1">
                            <CardContent className="flex h-full flex-col p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                                        <FaWhatsapp className="h-6 w-6" />
                                    </span>
                                    <p className="font-semibold text-stone-900">WhatsApp</p>
                                </div>
                                <p className="mb-6 flex-1 text-stone-600">
                                    Prefere agendar diretamente pelo celular? Entre em contato pelo WhatsApp e responderemos em breve.
                                </p>
                                <motion.a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-medium text-white"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaWhatsapp className="h-4 w-4" />
                                    Abrir WhatsApp
                                </motion.a>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
