'use client';

import Image from 'next/image';
import { FiBookOpen, FiUsers, FiMapPin } from 'react-icons/fi';
import { MotionCard, CardHeader, CardContent } from '@/components/ui/Card';
import { FadeIn, StaggerChildren } from '@/components/motion';

const credentials = [
    {
        icon: <FiBookOpen className="h-6 w-6" />,
        title: 'Formação UFMG',
        subtitle: 'Excelência Acadêmica',
        description:
            'Bacharel em Direito pela Universidade Federal de Minas Gerais, reconhecida como a melhor universidade federal do Brasil.',
        highlight: 'UFMG',
        highlightLabel: 'Federal do Brasil',
    },
    {
        icon: <FiUsers className="h-6 w-6" />,
        title: 'Prática Real',
        subtitle: 'Experiência em Instituições',
        description:
            'Atuação na Defensoria Pública de MG e Divisão de Assistência Judiciária da UFMG, com atendimento a centenas de clientes.',
        highlight: '500+',
        highlightLabel: 'Atendimentos',
    },
    {
        icon: <FiMapPin className="h-6 w-6" />,
        title: 'Belo Horizonte',
        subtitle: 'Presencial e Online',
        description:
            'Atendimento em Belo Horizonte e região metropolitana, além de consultorias online para todo o Brasil.',
        highlight: 'BH',
        highlightLabel: 'e Online',
    },
];

export function CredentialsSection() {
    return (
        <section id="credenciais" className="relative overflow-hidden bg-surface py-24 md:py-32">
            {/* Background sutil */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
                <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
            </div>

            <div className="container px-6">
                {/* Header da seção */}
                <FadeIn className="mb-16 text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        Por que me escolher
                    </p>
                    <h2 className="mb-6 font-display text-3xl font-bold text-stone-900 md:text-4xl lg:text-5xl">
                        Advocacia com{' '}
                        <span className="text-accent">
                            Dedicação e Experiência
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-stone-600">
                        Combinação de formação acadêmica de excelência com experiência prática em instituições de
                        referência.
                    </p>
                </FadeIn>

                {/* Grid de credenciais */}
                <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
                    {credentials.map((cred) => (
                        <MotionCard key={cred.title} variant="glass" className="group relative overflow-hidden">
                            {/* Highlight number */}
                            <div className="absolute -right-2 -top-2 flex flex-col items-end">
                                <span className="font-display text-5xl font-bold text-accent/10 transition-colors group-hover:text-accent/20">
                                    {cred.highlight}
                                </span>
                            </div>

                            <CardHeader icon={cred.icon} title={cred.title} eyebrow={cred.subtitle} />
                            <CardContent>
                                <p>{cred.description}</p>
                            </CardContent>

                            {/* Badge no rodapé */}
                            <div className="mt-4 border-t border-stone-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs uppercase tracking-wider text-stone-500">
                                        {cred.highlightLabel}
                                    </span>
                                    <span className="font-display text-lg font-bold text-accent">{cred.highlight}</span>
                                </div>
                            </div>
                        </MotionCard>
                    ))}
                </StaggerChildren>

                {/* Foto com parallax */}
                <FadeIn delay={0.3} className="mt-16">
                    <div className="relative mx-auto max-w-5xl">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-200 shadow-xl">
                            <Image
                                src="/images/rafael-2.jpeg"
                                alt="Rafael Souza Vieira - Advogado"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 1000px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />

                            {/* Info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <h3 className="mb-1 font-display text-2xl font-bold text-white">
                                            Rafael Souza Vieira
                                        </h3>
                                        <p className="text-stone-300">
                                            Advogado • OAB/MG 231.766 • Direito Civil e de Família
                                        </p>
                                    </div>
                                    <div className="hidden items-center gap-6 md:flex">
                                        <div className="text-right">
                                            <p className="font-display text-3xl font-bold text-accent">UFMG</p>
                                            <p className="text-xs uppercase tracking-wider text-stone-400">
                                                Formação
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
