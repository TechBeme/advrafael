import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { buttonClasses } from "@/components/ui/Button";
import { ContactForm } from "@/components/content/ContactForm";
import { FadeIn, StaggerFadeIn } from "@/components/ui/Animate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Contato",
    description: "Formulário validado e canais diretos para agendar atendimento com Rafael Vieira.",
    path: "/contato",
});

const CONTACT = {
    email: "contato@advrafael.com.br",
    whatsapp: "https://wa.me/5531990000000?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20conversa.",
    phoneDisplay: "(31) 99000-0000",
};

export default function ContatoPage() {
    return (
        <>
            <PageHeader
                kicker="Atendimento sob agendamento"
                title="Contato"
                description="Envie uma mensagem ou utilize os canais diretos. O retorno ocorre após triagem inicial."
            />
            <Section className="pb-20">
                <Container className="space-y-8">
                    {/* eslint-disable-next-line tailwindcss/classnames-order */}
                    <FadeIn className="grid md:grid-cols-[1.1fr_0.9fr] md:items-center gap-6 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-primary/8 via-white to-accent/5 shadow-soft">
                        <div className="space-y-3">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                                Triagem em etapas
                            </p>
                            <h2 className="text-2xl font-semibold text-ink md:text-3xl">
                                Resumo do caso, documentos essenciais e retorno ágil.
                            </h2>
                            <p className="text-base text-muted">
                                Envie seu contexto pelo formulário ou fale direto no WhatsApp. Resposta em horário comercial,
                                com indicação de próximos passos e documentos necessários.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    className={buttonClasses({ variant: "primary", size: "md" })}
                                    href={CONTACT.whatsapp}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                                    WhatsApp direto
                                </a>
                                <a
                                    className={buttonClasses({ variant: "secondary", size: "md" })}
                                    href={`mailto:${CONTACT.email}`}
                                >
                                    <FiMail className="h-5 w-5" aria-hidden="true" />
                                    {CONTACT.email}
                                </a>
                            </div>
                        </div>
                        <Card className="bg-white/90 shadow-card">
                            <CardHeader
                                title="Formulário de contato"
                                description="Preencha os campos para triagem inicial. Evite dados sensíveis sem orientação."
                            />
                            <CardContent className="mt-4">
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </FadeIn>

                    <StaggerFadeIn className="grid gap-4 md:grid-cols-3">
                        <Card className="bg-white/90 shadow-soft">
                            <CardHeader title="Resposta rápida" />
                            <CardContent className="text-sm text-muted">
                                Triagem em horário comercial, com indicação de horários para reunião e documentos prioritários.
                            </CardContent>
                        </Card>
                        <Card className="bg-white/90 shadow-soft">
                            <CardHeader title="Reunião em BH ou on-line" />
                            <CardContent className="text-sm text-muted">
                                Escolha presencial em Belo Horizonte ou encontro virtual para avançar na estratégia.
                            </CardContent>
                        </Card>
                        <Card className="bg-white/90 shadow-soft">
                            <CardHeader title="Transparência de custos" />
                            <CardContent className="text-sm text-muted">
                                Honorários combinados após triagem e definição de escopo, com previsibilidade de etapas.
                            </CardContent>
                        </Card>
                    </StaggerFadeIn>
                </Container>
            </Section>
        </>
    );
}
