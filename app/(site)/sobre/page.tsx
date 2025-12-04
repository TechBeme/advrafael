import Image from "next/image";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { FadeIn, StaggerFadeIn } from "@/components/ui/Animate";
import { professionalSummary, values as officeValues } from "@/content/bio";
import { buildMetadata } from "@/lib/seo";
import { SobreButtons } from "./SobreButtons";

export const metadata = buildMetadata({
    title: "Sobre",
    description:
        "Conheça a atuação de Rafael Vieira em Direito Cível e do Consumidor, com postura ética e linguagem clara.",
    path: "/sobre",
});

const education = [
    {
        title: "Bacharel em Direito",
        org: "Universidade Federal de Minas Gerais (UFMG)",
        period: "2020 – 2025",
        note: "Monografia: moderação de conteúdo em plataformas digitais (responsabilidade civil do TikTok).",
    },
    {
        title: "Ensino Médio Técnico",
        org: "CEFET-MG, Belo Horizonte",
        period: "2016 – 2018",
        note: "",
    },
];

const experience = [
    {
        title: "Estágio | Divisão de Assistência Judiciária (DAJ/UFMG)",
        period: "2023 – 2024",
        detail: "Atendimento e peças em demandas cíveis e consumeristas; foco em provas e rito processual.",
    },
    {
        title: "Estágio | Defensoria Pública de Minas Gerais",
        period: "2024",
        detail: "Apoio em audiências, peticionamento e análise de casos de vulnerabilidade social.",
    },
];

const languages = [
    "Português — fluente",
    "Inglês — leitura avançada, conversação intermediária",
    "Espanhol — leitura e conversação básicas",
];

export default function SobrePage() {
    return (
        <>
            <PageHeader
                kicker="Perfil profissional"
                title={professionalSummary.name}
                description={professionalSummary.headline}
            />

            <Section className="pb-10">
                <Container className="space-y-4">
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                        <FadeIn>
                            <Card className="bg-white/90 shadow-soft">
                                <CardHeader
                                    title="Atuação e forma de trabalho"
                                    description={professionalSummary.description}
                                />
                                <CardContent className="mt-4 space-y-3 text-sm text-muted">
                                    <p>
                                        Foco em mapear riscos, organizar provas e construir estratégias
                                        viáveis — seja para negociar ou litigar. Cada caso começa com
                                        triagem rápida, definição de prazos e expectativas alinhadas.
                                    </p>
                                    <p>
                                        Atendimento direto comigo, presencial em Belo Horizonte ou on-line.
                                        Comunicação clara, check-ins frequentes e previsibilidade de custos.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <SobreButtons />
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <Card className="overflow-hidden bg-white/90 shadow-soft lg:p-0">
                                <div className="grid gap-0 lg:grid-cols-[0.45fr_0.55fr] lg:items-stretch">
                                    <div className="relative min-h-[260px] bg-gradient-to-br from-primary/80 via-primary to-ink/90">
                                        <Image
                                            alt="Rafael Vieira"
                                            src="/images/rafael-portrait.svg"
                                            fill
                                            className="object-cover mix-blend-luminosity"
                                        />
                                    </div>
                                    <div className="space-y-2 p-6 text-sm text-muted">
                                        <p className="text-base font-semibold text-ink">
                                            Rafael Souza Vieira
                                        </p>
                                        <p>OAB/MG · Belo Horizonte / Contagem</p>
                                        <p>Interesse especial em responsabilidade civil e consumo digital.</p>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>
                    </div>
                </Container>
            </Section>

            <Section className="py-10">
                <Container className="space-y-6">
                    <SectionHeader
                        eyebrow="Valores"
                        title="Postura no atendimento"
                        description="Princípios que orientam a relação com clientes e parceiros."
                    />
                    <StaggerFadeIn className="grid gap-4 md:grid-cols-3">
                        {officeValues.map((item) => (
                            <Card key={item.title} className="bg-white/90 shadow-soft">
                                <CardHeader title={item.title} />
                                <CardContent className="text-sm text-muted">
                                    <p>{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </StaggerFadeIn>
                </Container>
            </Section>

            <Section className="pb-16">
                <Container className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-start">
                    <FadeIn>
                        <Card className="bg-white/90 shadow-soft">
                            <CardHeader title="Formação e atualização" />
                            <CardContent className="mt-4 space-y-2 text-sm text-muted">
                                <ul className="space-y-2">
                                    {education.map((item) => (
                                        <li
                                            key={item.title}
                                            className="flex items-start gap-2 rounded-md bg-highlight/60 px-3 py-2"
                                        >
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span>
                                                <span className="font-semibold text-ink">{item.title}</span>{" "}
                                                — {item.org} ({item.period}){item.note ? ` · ${item.note}` : ""}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <Card className="bg-white/90 shadow-soft">
                            <CardHeader title="Experiência e idiomas" />
                            <CardContent className="mt-4 space-y-4 text-sm text-muted">
                                <div className="space-y-3">
                                    {experience.map((item) => (
                                        <div key={item.title} className="rounded-md bg-highlight/60 p-3">
                                            <p className="text-sm font-semibold text-ink">{item.title}</p>
                                            <p className="text-xs uppercase tracking-[0.2em] text-primary">
                                                {item.period}
                                            </p>
                                            <p className="text-sm text-muted">{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-ink">Idiomas</p>
                                    <ul className="mt-2 space-y-1">
                                        {languages.map((item) => (
                                            <li key={item} className="text-sm text-muted">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </Container>
            </Section>
        </>
    );
}
