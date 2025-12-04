'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { FadeIn } from '@/components/motion';
import { FiCalendar } from 'react-icons/fi';

interface Experience {
    id: string;
    title: string;
    organization: string;
    organizationUrl?: string;
    period: string;
    description: string;
    highlights: string[];
    logo: string;
}

const experiences: Experience[] = [
    {
        id: 'dpmg',
        title: 'Estágio na Defensoria Pública',
        organization: 'Defensoria Pública do Estado de Minas Gerais',
        organizationUrl: 'https://defensoria.mg.def.br/areas-de-atuacao/segunda-instancia-e-tribunais-superiores/',
        period: '2023 - Atual',
        description:
            'Atuo na Divisão de Segunda Instância Cível, analisando recursos e elaborando peças jurídicas em processos de família, contratos e indenizações. Trabalho diretamente com defensores públicos experientes em casos que tramitam no Tribunal de Justiça de MG.',
        highlights: [
            'Recursos cíveis',
            'Direito de família',
            'Contratos',
            'Indenizações',
        ],
        logo: '/images/dpmg-logo.png',
    },
    {
        id: 'direito-vivo',
        title: 'Extensão Universitária - Direito Vivo',
        organization: 'Faculdade de Direito da UFMG',
        organizationUrl: 'https://direitovivo.direito.ufmg.br/quemsomos/',
        period: '2022 - 2023',
        description:
            'Participei do projeto de extensão Direito Vivo, prestando orientação jurídica gratuita para a comunidade. Atendi pessoas em situação de vulnerabilidade, ajudando em questões de família, consumidor e contratos, sempre sob supervisão de professores doutores da UFMG.',
        highlights: [
            'Atendimento ao público',
            'Direito de família',
            'Direito do consumidor',
            'Orientação jurídica',
        ],
        logo: '/images/direito-vivo-logo.jpg',
    },
    {
        id: 'daj',
        title: 'Divisão de Assistência Judiciária',
        organization: 'Faculdade de Direito da UFMG',
        organizationUrl: 'https://daj.direito.ufmg.br/historia/',
        period: '2021 - 2022',
        description:
            'Atuei no projeto de extensão mais antigo da UFMG, fundado em 1958. Participei de atendimentos, audiências e acompanhamento processual de pessoas que não têm condições de pagar advogado, aprendendo na prática com professores doutores e advogados experientes.',
        highlights: [
            'Atendimento jurídico',
            'Audiências',
            'Prática processual',
            'Trabalho em equipe',
        ],
        logo: '/images/daj-logo.jpg',
    },
];

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative"
        >
            {/* Timeline line */}
            {index < experiences.length - 1 && (
                <div className="absolute left-6 top-32 h-full w-0.5 bg-gradient-to-b from-accent/40 to-stone-200 md:left-1/2 md:-translate-x-1/2" />
            )}

            <div
                className={`relative flex flex-col gap-6 md:flex-row md:items-start ${isEven ? '' : 'md:flex-row-reverse'}`}
            >
                {/* Logo */}
                <div className="flex items-start gap-4 md:w-1/2 md:justify-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative z-10 overflow-hidden rounded-2xl border-2 border-stone-200 bg-white p-2 shadow-lg transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-xl"
                    >
                        <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-white md:h-28 md:w-28">
                            <Image
                                src={experience.logo}
                                alt={experience.organization}
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                    </motion.div>

                    {/* Period badge - mobile */}
                    <div className="md:hidden">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
                            <FiCalendar className="h-3.5 w-3.5" />
                            {experience.period}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2">
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-lg md:p-8">
                        {/* Period badge - desktop */}
                        <div className="mb-4 hidden md:block">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
                                <FiCalendar className="h-3.5 w-3.5" />
                                {experience.period}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-stone-900 md:text-2xl">{experience.title}</h3>
                        {experience.organizationUrl ? (
                            <a
                                href={experience.organizationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-block text-sm font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-dark"
                            >
                                {experience.organization}
                            </a>
                        ) : (
                            <p className="mt-1 text-sm font-medium text-accent">{experience.organization}</p>
                        )}

                        <p className="mt-4 leading-relaxed text-stone-600">{experience.description}</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {experience.highlights.map((highlight) => (
                                <span
                                    key={highlight}
                                    className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700"
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function ExperienceSection() {
    return (
        <Section id="experiencia" className="relative overflow-hidden bg-background">
            <div className="relative mx-auto max-w-5xl px-4">
                <FadeIn className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl lg:text-5xl">
                        Minha{' '}
                        <span className="text-accent">
                            Experiência
                        </span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
                        Durante a faculdade, busquei experiência prática em instituições de referência. Aprendi
                        com profissionais experientes e atendi centenas de pessoas em situações reais.
                    </p>
                </FadeIn>

                <div className="space-y-12 md:space-y-16">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={experience.id} experience={experience} index={index} />
                    ))}
                </div>
            </div>
        </Section>
    );
}
