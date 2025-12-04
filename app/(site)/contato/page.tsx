import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/content/ContactForm";
import { FadeIn, StaggerFadeIn } from "@/components/ui/Animate";
import { buildMetadata } from "@/lib/seo";
import { ContactButtons } from "./ContactButtons";

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
            <Section className="relative overflow-hidden pb-20">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-white to-accent/5" />
                <div className="absolute inset-0 -z-20 opacity-70">
                    <Image
                        src="/images/hero-office-1.jpeg"
                        alt="Escritório de Rafael Vieira"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white" />
                </div>
                <Container className="space-y-8">
                    <FadeIn className="grid gap-6 rounded-2xl border border-border/60 bg-white/85 p-6 shadow-soft backdrop-blur md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-8">
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
                                <ContactButtons email={CONTACT.email} whatsapp={CONTACT.whatsapp} />
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
