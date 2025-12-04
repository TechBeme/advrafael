'use client';

import Image from "next/image";
import Link from "next/link";
import {
    FiArrowRight,
    FiCheckCircle,
    FiPhone,
    FiShield,
    FiCalendar,
    FiClock,
    FiCornerDownRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Section, Container } from "../ui/Section";
import { Badge } from "../ui/Badge";
import { buttonClasses } from "../ui/Button";
import { FadeIn, StaggerFadeIn } from "../ui/Animate";

type HomeHeroProps = {
    whatsappLink: string;
};

const highlights = [
    "Disputas contratuais, consumo e responsabilidade civil",
    "Cronograma de entregas e audiências definido desde a triagem",
    "Negociação estruturada; litígio quando necessário",
    "Reuniões presenciais em BH ou on-line com horário marcado",
];

export function HomeHero({ whatsappLink }: HomeHeroProps) {
    return (
        <Section className="relative isolate overflow-hidden pb-16 pt-16 md:pb-20 md:pt-24">
            <div className="absolute inset-0 -z-30">
                <Image
                    src="/images/hero-office-1.jpeg"
                    alt="Escritório de Rafael Vieira"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/45" />
            </div>

            <Container className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className="space-y-7 text-white">
                    <div className="inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-1 backdrop-blur">
                        <Badge variant="solid" className="bg-white/10 text-white">
                            Direito Cível e do Consumidor · Belo Horizonte / On-line
                        </Badge>
                    </div>
                    <FadeIn>
                        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/45 px-6 py-6 shadow-soft backdrop-blur">
                            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                                Disputas contratuais e consumo com cronograma fechado.
                            </h1>
                            <p className="text-lg text-white">
                                Atendimento direto do advogado em indenizações, contratos e defesa do consumidor.
                                Triagem rápida, definição de provas, prazos e reuniões já na primeira conversa.
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1} className="flex flex-wrap gap-3">
                        <Link
                            href="/contato"
                            className={buttonClasses({ variant: "primary", size: "lg" })}
                        >
                            <FiArrowRight className="h-5 w-5" aria-hidden="true" />
                            Agendar triagem
                        </Link>
                        <a
                            className={buttonClasses({ variant: "secondary", size: "lg" })}
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Abrir conversa no WhatsApp"
                        >
                            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                            WhatsApp
                        </a>
                    </FadeIn>
                    <StaggerFadeIn className="grid gap-3 md:grid-cols-2">
                        {highlights.map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-3 rounded-2xl border border-white/25 bg-black/30 px-4 py-3 shadow-card backdrop-blur"
                            >
                                <FiCheckCircle className="mt-0.5 h-5 w-5 text-accent" aria-hidden="true" />
                                <p className="text-sm text-white">{item}</p>
                            </div>
                        ))}
                    </StaggerFadeIn>
                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap gap-3 text-sm text-white/85">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 backdrop-blur">
                                <FiShield className="h-4 w-4 text-accent" aria-hidden="true" />
                                Atuação direta do advogado, sem esteira
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 backdrop-blur">
                                <FiPhone className="h-4 w-4 text-accent" aria-hidden="true" />
                                Resposta rápida em horário comercial
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.3} className="grid grid-cols-3 gap-3 text-white">
                        {[
                            { label: "Agenda em até", value: "24h", icon: <FiClock className="h-4 w-4" /> },
                            {
                                label: "Reunião",
                                value: "On-line ou BH",
                                icon: <FiCalendar className="h-4 w-4" />,
                            },
                            {
                                label: "Plano",
                                value: "Provas e estratégia alinhadas",
                                icon: <FiCornerDownRight className="h-4 w-4" />,
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-white/20 bg-black/30 px-3 py-2 shadow-inner backdrop-blur"
                            >
                                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                                    {item.icon}
                                    {item.label}
                                </div>
                                <p className="mt-1 text-sm font-semibold">{item.value}</p>
                            </div>
                        ))}
                    </FadeIn>
                </div>

                <div className="hidden items-center justify-end md:flex">
                    <div className="flex flex-col items-center gap-3 rounded-3xl border border-white/20 bg-black/40 px-6 py-6 shadow-soft backdrop-blur">
                        <div className="h-28 w-28 overflow-hidden rounded-full border border-white/30 shadow-card">
                            <Image
                                src="/images/hero-office-2.jpeg"
                                alt="Rafael Vieira"
                                width={320}
                                height={320}
                                className="h-full w-full object-cover"
                                priority
                            />
                        </div>
                        <div className="text-center text-white">
                            <p className="text-lg font-semibold">Rafael Vieira</p>
                            <p className="text-sm text-white/80">Advogado · Cível e Consumidor</p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
