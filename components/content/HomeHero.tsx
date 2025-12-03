'use client';

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiPhone, FiShield } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "motion/react";
import { Section, Container } from "../ui/Section";
import { Badge } from "../ui/Badge";
import { buttonClasses } from "../ui/Button";
import { Card } from "../ui/Card";
import { FadeIn, StaggerFadeIn } from "../ui/Animate";

type HomeHeroProps = {
    whatsappLink: string;
};

const highlights = [
    "Explicação objetiva de riscos e caminhos possíveis",
    "Alinhamento de expectativas e previsibilidade",
    "Negociação preparada e litígio quando necessário",
    "Atendimento presencial ou on-line",
];

export function HomeHero({ whatsappLink }: HomeHeroProps) {
    return (
        <Section className="relative overflow-hidden pb-16 pt-14 md:pt-20">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(23,55,94,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(12,124,117,0.14),transparent_30%),linear-gradient(135deg,rgba(23,55,94,0.06),rgba(12,124,117,0.05))]" />
            <Container className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                <div className="space-y-8">
                    <Badge variant="outline">Direito Cível e do Consumidor · BH/MG</Badge>
                    <FadeIn>
                        <div className="space-y-5">
                            <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">
                                Decisões jurídicas com clareza, estratégia e ritmo de negócio.
                            </h1>
                            <p className="text-lg text-muted">
                                Assessoria para pessoas físicas e pequenas empresas em contratos,
                                responsabilidade civil e consumo. Diagnóstico rápido, plano de ação
                                transparente e acompanhamento próximo.
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1} className="flex flex-wrap gap-3">
                        <Link
                            href="/contato"
                            className={buttonClasses({ variant: "primary", size: "lg" })}
                        >
                            <FiArrowRight className="h-5 w-5" aria-hidden="true" />
                            Falar agora
                        </Link>
                        <a
                            className={buttonClasses({ variant: "secondary", size: "lg" })}
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Abrir conversa no WhatsApp"
                        >
                            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                            WhatsApp direto
                        </a>
                    </FadeIn>
                    <StaggerFadeIn className="grid gap-3 md:grid-cols-2">
                        {highlights.map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-3 rounded-xl border border-border bg-white/90 px-4 py-3 shadow-card backdrop-blur"
                            >
                                <FiCheckCircle className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                <p className="text-sm text-ink">{item}</p>
                            </div>
                        ))}
                    </StaggerFadeIn>
                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap gap-3 text-sm text-muted">
                            <div className="inline-flex items-center gap-2 rounded-full bg-highlight px-3 py-2">
                                <FiShield className="h-4 w-4 text-primary" aria-hidden="true" />
                                Atendimento sob agendamento, foco em previsibilidade
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-highlight px-3 py-2">
                                <FiPhone className="h-4 w-4 text-primary" aria-hidden="true" />
                                Resposta em horário comercial
                            </div>
                        </div>
                    </FadeIn>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Card className="overflow-hidden p-0 shadow-soft">
                        <div className="relative">
                            <Image
                                alt="Retrato de Rafael Vieira"
                                src="/images/rafael-portrait.svg"
                                width={800}
                                height={800}
                                priority
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white drop-shadow">
                                <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/80">
                                    Rafael Vieira · OAB/MG
                                </p>
                                <p className="mt-1 text-lg font-semibold">
                                    Advocacia cível e do consumidor com linguagem clara.
                                </p>
                                <p className="text-sm text-primary-foreground/90">
                                    Atendimento próximo, presencial ou on-line.
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </Container>
        </Section>
    );
}
