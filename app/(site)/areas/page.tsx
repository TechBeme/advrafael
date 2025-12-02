import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { buttonClasses } from "@/components/ui/Button";
import { practiceAreas } from "@/content/areas";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Áreas de atuação",
    description:
        "Direito Cível e Direito do Consumidor com foco em prevenção de riscos, negociação e atuação responsável.",
    path: "/areas",
});

export default function AreasPage() {
    return (
        <>
            <PageHeader
                kicker="Cível e Consumidor"
                title="Áreas de atuação"
                description="Atendimento voltado a Direito Cível e do Consumidor, com foco em esclarecer riscos e alinhar expectativas desde o início."
            />

            <Section className="pb-6">
                <Container className="space-y-4">
                    <SectionHeader
                        eyebrow="Situações comuns"
                        title="Temas tratados com frequência"
                        description="Orientação sobre documentação, provas e alternativas de negociação ou judicialização."
                        actions={
                            <Link
                                href="/contato"
                                className={buttonClasses({ variant: "primary", size: "sm" })}
                            >
                                Falar sobre um caso
                            </Link>
                        }
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                        {practiceAreas.map((area) => (
                            <Card key={area.slug}>
                                <CardHeader
                                    eyebrow="Área principal"
                                    title={area.title}
                                    description={area.description}
                                />
                                <CardContent className="mt-4 space-y-2">
                                    <ul className="space-y-2 text-sm text-ink">
                                        {area.topics.map((topic) => (
                                            <li
                                                key={topic}
                                                className="flex items-start gap-2 rounded-md bg-highlight/60 px-3 py-2"
                                            >
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                                <span>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>
        </>
    );
}
