import Link from "next/link";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HomeHero } from "@/components/content/HomeHero";
import { practiceAreas } from "@/content/areas";
import { values } from "@/content/bio";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { getFeaturedArticles } from "@/lib/content";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata = buildMetadata({
    description: siteConfig.description,
    path: "/",
});

const WHATSAPP_LINK =
    "https://wa.me/5531990000000?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20conversa.";

export default async function HomePage() {
    const featuredArticles = await getFeaturedArticles(2);
    return (
        <>
            <HomeHero whatsappLink={WHATSAPP_LINK} />

            <Section className="pb-6">
                <Container className="space-y-8">
                    <SectionHeader
                        eyebrow="Áreas em destaque"
                        title="Cível e Consumidor com atenção às particularidades de cada caso"
                        description="Atendimentos sob medida para prevenir litígios, estruturar provas e conduzir negociações responsáveis."
                        actions={
                            <Link
                                href="/areas"
                                className={buttonClasses({ variant: "secondary", size: "sm" })}
                            >
                                Ver todas as áreas
                            </Link>
                        }
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                        {practiceAreas.map((area) => (
                            <Card key={area.slug}>
                                <CardHeader
                                    eyebrow="Atuação principal"
                                    title={area.title}
                                    description={area.description}
                                />
                                <CardContent className="mt-4 space-y-2">
                                    {area.topics.slice(0, 4).map((topic) => (
                                        <div
                                            key={topic}
                                            className="flex items-start gap-2 rounded-md bg-highlight/70 px-3 py-2 text-sm text-ink"
                                        >
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span>{topic}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section className="pb-6">
                <Container className="space-y-6">
                    <SectionHeader
                        eyebrow="Conteúdo"
                        title="Artigos e materiais"
                        description="Textos em linguagem clara sobre temas cíveis e do consumidor."
                        actions={
                            <Link
                                href="/artigos"
                                className={buttonClasses({ variant: "secondary", size: "sm" })}
                            >
                                Acessar artigos
                            </Link>
                        }
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        {featuredArticles.length === 0 ? (
                            <p className="text-sm text-muted">
                                Os primeiros textos estão sendo preparados e entrarão em breve.
                            </p>
                        ) : (
                            featuredArticles.map((article) => (
                                <Card key={article.slug}>
                                    <CardHeader
                                        eyebrow="Rascunho editorial"
                                        title={article.title}
                                        description={article.description}
                                    />
                                    <CardContent className="mt-4 flex items-center gap-2 text-sm text-muted">
                                        <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                                        <span>
                                            {format(
                                                new Date(article.date),
                                                "dd 'de' MMMM 'de' yyyy",
                                                {
                                                    locale: ptBR,
                                                },
                                            )}
                                        </span>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </Container>
            </Section>

            <Section className="pb-16">
                <Container className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
                    <Card>
                        <CardHeader
                            eyebrow="Sobre"
                            title="Quem atende"
                            description="Atuação direta do advogado, com atendimento enxuto e comunicação objetiva."
                        />
                        <CardContent className="mt-4 space-y-2 text-sm text-muted">
                            <p>
                                Rafael Vieira atende demandas cíveis e consumeristas em Belo Horizonte
                                e Minas Gerais, com possibilidade de reuniões on-line. A condução dos
                                casos é acompanhada de explicação de riscos, estimativa de prazos e
                                cuidados com provas.
                            </p>
                            <Link
                                href="/sobre"
                                className={buttonClasses({ variant: "primary", size: "sm" })}
                            >
                                Conhecer trajetória
                            </Link>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            eyebrow="Postura"
                            title="Compromissos do escritório"
                            description="Valores que orientam o atendimento diário."
                        />
                        <CardContent className="mt-4 space-y-3">
                            {values.map((item) => (
                                <div key={item.title} className="rounded-md bg-highlight/70 p-3">
                                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                                    <p className="text-sm text-muted">{item.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </Container>
            </Section>
        </>
    );
}
