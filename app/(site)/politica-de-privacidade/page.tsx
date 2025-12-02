import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

const sections = [
    {
        title: "Coleta mínima",
        content:
            "Na etapa inicial, são solicitados apenas nome, e-mail, telefone/WhatsApp e breve descrição do caso. Dados sensíveis só são coletados após avaliação de necessidade e consentimento.",
    },
    {
        title: "Finalidade e uso",
        content:
            "As informações servem para retorno do contato, organização de agenda e análise preliminar. Não há compartilhamento comercial. Bases legais: execução de contrato e interesse legítimo, quando aplicável.",
    },
    {
        title: "Retenção e segurança",
        content:
            "Dados ficam armazenados pelo tempo necessário à triagem ou execução dos serviços contratados. Medidas administrativas e tecnológicas são adotadas para reduzir riscos de acesso indevido.",
    },
    {
        title: "Direitos do titular",
        content:
            "É possível solicitar confirmação de tratamento, correção ou eliminação de dados quando cabível. Pedidos podem ser encaminhados pelo e-mail de contato.",
    },
];

export const metadata = buildMetadata({
    title: "Política de Privacidade",
    description: "Resumo sobre coleta mínima, finalidade e segurança dos dados enviados pelo site.",
    path: "/politica-de-privacidade",
});

export default function PoliticaPage() {
    return (
        <>
            <PageHeader
                kicker="Proteção de dados"
                title="Política de Privacidade"
                description="Coleta mínima, finalidade e cuidados com os dados enviados pelo site."
            />
            <Section className="pb-6">
                <Container className="space-y-4">
                    <SectionHeader
                        eyebrow="Transparência"
                        title="Como os dados são tratados"
                        description="Resumo em linguagem simples sobre uso e proteção das informações fornecidas."
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        {sections.map((item) => (
                            <Card key={item.title}>
                                <CardHeader title={item.title} />
                                <CardContent className="text-sm text-muted">
                                    <p>{item.content}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>
        </>
    );
}
