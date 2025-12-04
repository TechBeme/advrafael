'use client';

import { FiMessageCircle, FiSearch, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { motion } from 'motion/react';
import { FadeIn, StaggerChildren } from '@/components/motion';
import { Button } from '@/components/ui/Button';

const steps = [
    {
        number: '01',
        icon: <FiMessageCircle className="h-6 w-6" />,
        title: 'Primeiro Contato',
        description:
            'Inicie uma conversa pelo chat ou WhatsApp. Apresente brevemente seu caso para que eu possa compreender como ajudá-lo.',
        detail: 'Disponível para contato',
    },
    {
        number: '02',
        icon: <FiSearch className="h-6 w-6" />,
        title: 'Análise do Caso',
        description:
            'Avalio os documentos e fatos, explico riscos e possibilidades, e apresento as estratégias mais adequadas.',
        detail: 'Consulta detalhada e transparente',
    },
    {
        number: '03',
        icon: <FiCheckCircle className="h-6 w-6" />,
        title: 'Acompanhamento',
        description:
            'Caso decida prosseguir, conduzo toda a parte jurídica mantendo você informado em cada etapa do processo.',
        detail: 'Comunicação clara e constante',
    },
];

export function ProcessSection() {
    const openChat = () => {
        window.dispatchEvent(new CustomEvent('openChat'));
    };

    return (
        <section id="processo" className="relative overflow-hidden bg-surface py-24 md:py-32">
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-surface/20 to-background" />

            <div className="container px-6">
                {/* Header da seção */}
                <FadeIn className="mb-16 text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        Como Funciona
                    </p>
                    <h2 className="mb-6 font-display text-3xl font-bold text-stone-900 md:text-4xl lg:text-5xl">
                        Atendimento{' '}
                        <span className="text-accent">
                            simples e direto
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-stone-600">
                        Sem burocracia ou termos confusos. Você compreende cada etapa e participa das decisões.
                    </p>
                </FadeIn>

                {/* Steps */}
                <div className="relative mx-auto max-w-4xl">
                    {/* Linha conectora - desktop - centralizada com os ícones */}
                    <div className="absolute left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] top-[24px] hidden h-0.5 bg-gradient-to-r from-accent/30 via-accent to-accent/30 lg:block" />

                    <StaggerChildren className="grid gap-8 lg:grid-cols-3" staggerDelay={0.2}>
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                className="relative"
                                whileHover={{ y: -4 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {/* Linha conectora mobile */}
                                {index < steps.length - 1 && (
                                    <div className="absolute bottom-0 left-[24px] top-[48px] w-px bg-gradient-to-b from-accent to-accent/20 lg:hidden" />
                                )}

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Número com ícone */}
                                    <div className="relative mb-6">
                                        <motion.div
                                            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {step.icon}
                                        </motion.div>
                                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-accent/50 bg-white text-xs font-bold text-accent">
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Conteúdo */}
                                    <div className="w-full rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                                        <h3 className="mb-3 font-display text-xl font-semibold text-stone-900">
                                            {step.title}
                                        </h3>
                                        <p className="mb-4 text-stone-600">{step.description}</p>
                                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                            {step.detail}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </StaggerChildren>
                </div>

                {/* CTA */}
                <FadeIn delay={0.6} className="mt-16 text-center">
                    <p className="mb-6 text-stone-600">Pronto para dar o primeiro passo?</p>
                    <Button variant="primary" size="lg" onClick={openChat} className="group">
                        Iniciar Conversa
                        <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </FadeIn>
            </div>
        </section>
    );
}
