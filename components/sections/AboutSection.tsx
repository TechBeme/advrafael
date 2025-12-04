'use client';

import Image from 'next/image';
import { FadeIn } from '@/components/motion';

const timeline = [
    {
        id: 'ufmg',
        type: 'education',
        title: 'Bacharel em Direito — UFMG',
        organization: 'Universidade Federal de Minas Gerais',
        period: '2020 - 2025',
        description:
            'Graduação na instituição que ocupa o 1º lugar entre as universidades federais do Brasil. Cinco anos de formação rigorosa, com acesso a professores doutores referência nacional e uma grade curricular completa que me preparou para atuar em qualquer área do Direito.',
        logo: '/images/ufmg-direito-logo.png',
    },
    {
        id: 'daj',
        type: 'experience',
        title: 'DAJ/UFMG — Divisão de Assistência Judiciária',
        organization: 'Projeto de Extensão da UFMG',
        period: '2023 - 2024',
        description:
            'Atuei diretamente em casos reais de Direito Civil, Família e Consumidor. Fui responsável por atendimentos, elaboração de peças processuais e acompanhamento de audiências, sempre sob orientação de professores doutores da UFMG.',
        logo: '/images/daj-logo.jpg',
    },
    {
        id: 'direito-vivo',
        type: 'experience',
        title: 'Projeto Direito Vivo',
        organization: 'Núcleo de Direito Empresarial — UFMG',
        period: '2023 - 2024',
        description:
            'Prestei consultoria jurídica para empresas de diversos portes e entidades sem fins lucrativos. Atuei na elaboração e revisão de contratos, constituição societária e análise de riscos.',
        logo: '/images/direito-vivo-logo.jpg',
    },
    {
        id: 'dpmg',
        type: 'experience',
        title: 'Defensoria Pública de Minas Gerais',
        organization: 'DESITS-CI — Segunda Instância Cível',
        period: '2024 - 2025',
        description:
            'Atuei na elaboração de recursos para o Tribunal de Justiça de Minas Gerais, Superior Tribunal de Justiça e Supremo Tribunal Federal. Experiência de alto nível em contencioso cível, desenvolvendo argumentação jurídica para instâncias superiores.',
        logo: '/images/dpmg-logo.png',
    },
    {
        id: 'oab',
        type: 'achievement',
        title: 'Aprovação na OAB',
        organization: 'Ordem dos Advogados do Brasil - MG',
        period: '2025',
        description:
            'Aprovado no 44º Exame de Ordem com nota 9,60 de 10 na prova prático-profissional de Direito Civil — uma das maiores notas do exame.',
        logo: '/images/OAB-MG.png',
        highlight: '9,60/10',
    },
    {
        id: 'escritorio',
        type: 'milestone',
        title: 'Escritório de Advocacia',
        organization: 'Advocacia própria — Belo Horizonte/MG',
        period: '2025',
        description:
            'Após anos de preparação em instituições de excelência, inaugurei meu escritório. Atendo clientes de todo o Brasil com a mesma dedicação e rigor técnico desenvolvidos ao longo da minha formação.',
        logo: '/images/rafael-1.jpeg',
    },
];

export function AboutSection() {
    return (
        <section id="sobre" className="relative overflow-hidden bg-surface py-24 md:py-32">
            <div className="container px-6">
                {/* Header */}
                <FadeIn className="mb-16 text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        Formação e Experiência
                    </p>
                    <h2 className="mb-6 font-display text-3xl font-bold text-stone-900 md:text-4xl lg:text-5xl">
                        Quem sou{' '}
                        <span className="text-accent">
                            eu
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-stone-600">
                        Formado pela UFMG, construí minha experiência em instituições de referência antes de abrir meu próprio escritório.
                    </p>
                </FadeIn>

                {/* Photo - before timeline */}
                <FadeIn delay={0.2} className="mb-16">
                    <div className="relative mx-auto max-w-2xl">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 shadow-xl">
                            <Image
                                src="/images/rafael-2.jpeg"
                                alt="Rafael Vieira - Advogado"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                        </div>
                    </div>
                </FadeIn>

                {/* Timeline */}
                <div className="mx-auto max-w-3xl">
                    <div className="relative">
                        {/* Timeline items */}
                        <div className="space-y-10">
                            {timeline.map((item, index) => {
                                const isLast = index === timeline.length - 1;
                                return (
                                    <FadeIn key={item.id} delay={index * 0.1}>
                                        <div className="relative flex gap-6 md:gap-8">
                                            {/* Timeline line segment - only between items, starts from center of logo */}
                                            {!isLast && (
                                                <div className="absolute left-[27px] top-14 bottom-[-40px] w-0.5 bg-gradient-to-b from-accent to-accent/30 md:left-[35px] md:top-[72px]" />
                                            )}

                                            {/* Logo as timeline marker */}
                                            <div className="relative z-10 flex-shrink-0">
                                                <div
                                                    className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-lg ring-2 ring-accent md:h-[72px] md:w-[72px]"
                                                >
                                                    <Image
                                                        src={item.logo}
                                                        alt={item.organization}
                                                        width={72}
                                                        height={72}
                                                        className={
                                                            item.id === 'escritorio'
                                                                ? 'h-full w-full object-cover'
                                                                : 'h-full w-full object-contain p-2'
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {/* Content Card */}
                                            <div className="flex-1 pt-1">
                                                {/* Card */}
                                                <div className="relative rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-accent/30 hover:shadow-md md:p-6">
                                                    {/* Date in top right */}
                                                    <span className="absolute right-4 top-4 rounded-lg bg-accent/10 px-3 py-1 text-sm font-semibold text-accent md:right-6 md:top-5">
                                                        {item.period}
                                                    </span>

                                                    <h3 className="mb-1 pr-24 text-lg font-bold text-stone-900">
                                                        {item.title}
                                                        {'highlight' in item && item.highlight && (
                                                            <span className="ml-2 inline-flex items-center rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent align-middle">
                                                                Nota: {item.highlight}
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <p className="mb-3 text-sm font-medium text-accent">
                                                        {item.organization}
                                                    </p>
                                                    <p className="text-sm leading-relaxed text-stone-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </FadeIn>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
