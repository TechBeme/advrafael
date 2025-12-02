import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { faqItems } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "FAQ",
    description: "Perguntas e respostas sobre atendimento, documentação e expectativas.",
    path: "/faq",
});

export default function FaqPage() {
    return (
        <>
            <PageHeader
                kicker="Perguntas frequentes"
                title="FAQ"
                description="Respostas curtas para dúvidas recorrentes sobre atendimento, documentação e expectativas."
            />

            <Section className="pb-6">
                <Container className="space-y-4">
                    <SectionHeader
                        eyebrow="Dúvidas comuns"
                        title="Esclarecimentos iniciais"
                        description="Informações gerais para orientar o envio de dados e a marcação de reuniões."
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        {faqItems.map((item) => (
                            <Card key={item.question}>
                                <CardContent className="space-y-2">
                                    <p className="text-sm font-semibold text-ink">{item.question}</p>
                                    <p className="text-sm text-muted">{item.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>
        </>
    );
}
