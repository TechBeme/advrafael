import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import {
    educationAndMemberships,
    professionalSummary,
    values as officeValues,
} from "@/content/bio";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Sobre",
    description:
        "Conheça a atuação de Rafael Vieira em Direito Cível e do Consumidor, com postura ética e linguagem clara.",
    path: "/sobre",
});

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
                    <Alert tone="info" title="Conteúdo em revisão do advogado">
                        <p>
                            Texto biográfico elaborado em linguagem informativa. Publicação final
                            depende de aprovação do profissional responsável, conforme Código de Ética
                            da OAB.
                        </p>
                    </Alert>
                    <Card>
                        <CardHeader
                            title="Atuação e forma de trabalho"
                            description={professionalSummary.description}
                        />
                        <CardContent className="mt-4 space-y-3 text-sm text-muted">
                            <p>
                                Antes de qualquer medida, o caso é analisado em triagem inicial para
                                entender documentos, prazos e riscos. As estratégias priorizam
                                soluções proporcionais, com transparência sobre custos e alternativas
                                de negociação.
                            </p>
                            <p>
                                O atendimento é realizado diretamente pelo advogado, com suporte
                                enxuto. Reuniões podem ocorrer presencialmente em Belo Horizonte ou de
                                forma on-line, sempre com os devidos cuidados de privacidade e
                                segurança de dados.
                            </p>
                            <Link
                                href="/contato"
                                className={buttonClasses({ variant: "primary", size: "sm" })}
                            >
                                Falar sobre o caso
                            </Link>
                        </CardContent>
                    </Card>
                </Container>
            </Section>

            <Section className="py-10">
                <Container className="space-y-6">
                    <SectionHeader
                        eyebrow="Valores"
                        title="Postura no atendimento"
                        description="Princípios que orientam a relação com clientes e parceiros."
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                        {officeValues.map((item) => (
                            <Card key={item.title}>
                                <CardHeader title={item.title} />
                                <CardContent className="text-sm text-muted">
                                    <p>{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section className="pb-16">
                <Container className="grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-start">
                    <Card>
                        <CardHeader title="Formação e atualização" />
                        <CardContent className="mt-4 space-y-2 text-sm text-muted">
                            <ul className="space-y-2">
                                {educationAndMemberships.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 rounded-md bg-highlight/60 px-3 py-2"
                                    >
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p>
                                Atualizações constantes em processo civil, técnicas de negociação e
                                responsabilidade civil, para manter a orientação alinhada às melhores
                                práticas.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            title="Compromisso com ética e LGPD"
                            description="Coleta mínima de dados pessoais e transparência sobre finalidade e retenção."
                        />
                        <CardContent className="mt-4 space-y-3 text-sm text-muted">
                            <p>
                                A comunicação segue o Código de Ética da OAB e evita qualquer promessa
                                de resultado. Dados sensíveis só são solicitados quando necessários e
                                mediante consentimento informado.
                            </p>
                            <p>
                                Relatórios de andamento são fornecidos com linguagem clara, respeitando
                                sigilo profissional e limitações legais.
                            </p>
                        </CardContent>
                    </Card>
                </Container>
            </Section>
        </>
    );
}
