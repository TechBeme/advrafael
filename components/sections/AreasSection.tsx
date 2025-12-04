'use client';

import { FiFileText, FiUsers, FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'motion/react';
import { MotionCard, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn, StaggerChildren } from '@/components/motion';

const areas = [
    {
        id: 'civil',
        title: 'Direito Civil',
        description:
            'Resolução de conflitos patrimoniais, contratuais e indenizatórios.',
        icon: <FiFileText className="h-6 w-6" />,
        topics: [
            { title: 'Contratos', description: 'Elaboração, revisão e inadimplemento' },
            { title: 'Indenizações', description: 'Danos materiais e morais' },
            { title: 'Cobranças', description: 'Recuperação de créditos e dívidas' },
            { title: 'Posse e Propriedade', description: 'Questões imobiliárias' },
            { title: 'Responsabilidade Civil', description: 'Reparação de danos' },
        ],
    },
    {
        id: 'consumidor',
        title: 'Direito do Consumidor',
        description:
            'Defesa dos seus direitos nas relações de consumo.',
        icon: <FiShoppingCart className="h-6 w-6" />,
        topics: [
            { title: 'Negativação Indevida', description: 'Inclusão indevida em cadastros de inadimplentes' },
            { title: 'Cobranças Abusivas', description: 'Valores indevidos' },
            { title: 'Produtos com Defeito', description: 'Troca ou reembolso' },
            { title: 'Serviços não Prestados', description: 'Descumprimento de contrato' },
            { title: 'Planos de Saúde', description: 'Negativas de cobertura' },
        ],
    },
    {
        id: 'familia',
        title: 'Direito de Família',
        description:
            'Orientação em questões familiares com foco em soluções.',
        icon: <FiUsers className="h-6 w-6" />,
        topics: [
            { title: 'Divórcio', description: 'Consensual ou litigioso' },
            { title: 'Pensão Alimentícia', description: 'Fixação e revisão' },
            { title: 'Guarda de Filhos', description: 'Compartilhada ou unilateral' },
            { title: 'Partilha de Bens', description: 'Divisão do patrimônio' },
            { title: 'União Estável', description: 'Reconhecimento e dissolução' },
        ],
    },
];

export function AreasSection() {
    return (
        <section id="areas" className="relative bg-background py-24 md:py-32">
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-surface to-background" />

            <div className="container px-6">
                {/* Header da seção */}
                <FadeIn className="mb-16 text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        Áreas de Atuação
                    </p>
                    <h2 className="mb-6 font-display text-3xl font-bold text-stone-900 md:text-4xl lg:text-5xl">
                        Como posso{' '}
                        <span className="text-accent">
                            ajudar você
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-stone-600">
                        Atuo em Direito Civil, Consumidor e Família, sempre com foco em soluções claras e que preservem seus interesses.
                    </p>
                </FadeIn>

                {/* Cards de áreas */}
                <StaggerChildren className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3" staggerDelay={0.1}>
                    {areas.map((area) => (
                        <MotionCard key={area.id} variant="elevated" className="relative overflow-hidden">
                            <CardHeader icon={area.icon} title={area.title} description={area.description} />

                            <CardContent className="mt-4">
                                {/* Topics */}
                                <div className="space-y-2">
                                    {area.topics.map((topic) => (
                                        <motion.div
                                            key={topic.title}
                                            initial={{ opacity: 0.8 }}
                                            whileHover={{ opacity: 1, x: 2 }}
                                            className="rounded-lg border border-stone-200 bg-white/50 px-3 py-2 transition-colors hover:border-accent/30"
                                        >
                                            <p className="text-sm font-medium text-stone-900">{topic.title}</p>
                                            <p className="text-xs text-stone-500">{topic.description}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="mt-4 border-t border-stone-200 pt-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="group w-full text-xs"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Falar sobre {area.title.toLowerCase().replace('direito ', '').replace('do ', '').replace('de ', '')}
                                        <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </CardContent>

                            {/* Decorative accent */}
                            <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-accent/10 to-transparent" />
                        </MotionCard>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    );
}
