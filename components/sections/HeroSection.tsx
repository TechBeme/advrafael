'use client';

import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMessageCircle, FiMapPin, FiGlobe } from 'react-icons/fi';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion';

const WHATSAPP_LINK =
    'https://wa.me/553190726984?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os%20jur%C3%ADdicos.';

const institutionLogos = [
    {
        src: '/images/ufmg-direito-logo.png',
        alt: 'UFMG Direito',
        name: 'UFMG',
        title: 'Universidade Federal de Minas Gerais',
        period: '2020 - 2025',
        description:
            'Bacharel em Direito pela melhor universidade federal do Brasil.',
    },
    {
        src: '/images/dpmg-logo.png',
        alt: 'Defensoria Pública de MG',
        name: 'Defensoria Pública',
        title: 'Defensoria Pública de MG',
        period: '2024 - 2025',
        description:
            'Atuei na Segunda Instância Cível, trabalhando com recursos para o TJMG, STJ e STF.',
    },
    {
        src: '/images/daj-logo.jpg',
        alt: 'DAJ UFMG',
        name: 'DAJ',
        title: 'Divisão de Assistência Judiciária',
        period: '2023 - 2024',
        description:
            'Atendimento jurídico em casos reais de Direito Civil, Família e Consumidor, sob orientação de professores doutores da UFMG.',
    },
    {
        src: '/images/direito-vivo-logo.jpg',
        alt: 'Direito Vivo',
        name: 'Direito Vivo',
        title: 'Projeto Direito Vivo',
        period: '2023 - 2024',
        description:
            'Consultoria jurídica para empresas e entidades sem fins lucrativos. Atuação em contratos e constituição societária.',
    },
];

export function HeroSection() {
    const openChat = () => {
        window.dispatchEvent(new CustomEvent('openChat'));
    };

    return (
        <section id="hero" className="relative overflow-hidden bg-surface pb-16 pt-28 md:pb-24 md:pt-32 lg:pb-32 lg:pt-40">
            <div className="container px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Content */}
                    <div className="order-2 lg:order-1">
                        <FadeIn delay={0.1}>
                            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
                                Advogado • OAB/MG 000.000
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-stone-900 md:text-5xl lg:text-6xl">
                                Dr. Rafael Vieira
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="mb-6 max-w-xl text-lg leading-relaxed text-stone-600 md:text-xl">
                                Graduado em Direito pela{' '}
                                <a href="https://www.direito.ufmg.br/?page_id=4044" target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-900 underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent">UFMG</a>, atuo com foco em{' '}
                                <strong className="text-stone-900">Direito Civil e Empresarial</strong>, combinando
                                experiência prática em processos judiciais, elaboração de peças e recursos, consultoria
                                jurídica estratégica e métodos consensuais de resolução de conflitos. Minha trajetória
                                inclui atuação relevante na{' '}
                                <a href="https://defensoria.mg.def.br/areas-de-atuacao/segunda-instancia-e-tribunais-superiores/" target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-900 underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent">Defensoria Pública de MG</a>, na{' '}
                                <a href="https://daj.direito.ufmg.br/historia/" target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-900 underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent">Assistência Judiciária da UFMG</a>{' '}
                                e no programa{' '}
                                <a href="https://direitovivo.direito.ufmg.br/quemsomos/" target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-900 underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent">Direito Vivo</a>, em parceria com{' '}
                                <a href="https://acminas.com.br/quem-somos/" target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-900 underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent">ACMINAS</a> e{' '}
                                <a href="https://iamg.org.br/institucional?tab=historia" target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-900 underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent">IAMG</a>.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="mb-6 space-y-2">
                                <div className="flex items-center gap-2 text-stone-600">
                                    <FiMapPin className="h-4 w-4 text-accent" />
                                    <span>Belo Horizonte, MG</span>
                                </div>
                                <div className="flex items-center gap-2 text-stone-600">
                                    <FiGlobe className="h-4 w-4 text-accent" />
                                    <span>Atendimento online para todo o Brasil</span>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.5}>
                            <div className="mb-6 flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                                </span>
                                <span className="text-sm text-stone-600">
                                    Disponível para atendimento online
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.6}>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button variant="primary" size="lg" glow className="group" onClick={openChat}>
                                    <FiMessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                                    Fale Comigo Agora
                                </Button>
                                <motion.button
                                    className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold border-green-600 bg-green-600 text-white"
                                    onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaWhatsapp className="h-5 w-5" />
                                    WhatsApp
                                </motion.button>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Photo */}
                    <div className="order-1 lg:order-2">
                        <FadeIn direction="right" delay={0.3}>
                            <div className="relative mx-auto max-w-md lg:max-w-none">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-stone-300/50">
                                    <Image
                                        src="/images/rafael-1.jpeg"
                                        alt="Rafael Vieira - Advogado"
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />

                                    {/* Institution logos overlay - bottom of photo */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 pt-12"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            {institutionLogos.map((logo, index) => (
                                                <div
                                                    key={logo.name}
                                                    className="group relative"
                                                >
                                                    <motion.div
                                                        className="relative flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-white/30 bg-white/95 p-1.5 shadow-lg backdrop-blur-sm transition-all hover:border-white hover:bg-white"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.9 + index * 0.1 }}
                                                        whileHover={{ scale: 1.1, y: -4 }}
                                                    >
                                                        <Image
                                                            src={logo.src}
                                                            alt={logo.alt}
                                                            fill
                                                            className="object-contain p-1"
                                                        />
                                                    </motion.div>

                                                    {/* Tooltip */}
                                                    <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-56 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100">
                                                        <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-xl">
                                                            <div className="mb-1.5 flex items-center justify-between">
                                                                <h4 className="text-sm font-semibold text-stone-900">
                                                                    {logo.name}
                                                                </h4>
                                                                <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                                                                    {logo.period}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs leading-relaxed text-stone-600">
                                                                {logo.description}
                                                            </p>
                                                        </div>
                                                        <div className="absolute left-1/2 top-full -translate-x-1/2">
                                                            <div className="h-0 w-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-center text-xs font-medium text-white/80">
                                            Formação e experiência
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Subtle background decoration */}
                                <div className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-stone-100 to-stone-50" />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
