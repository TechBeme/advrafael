import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { buttonClasses } from "@/components/ui/Button";
import { ContactForm } from "@/components/content/ContactForm";
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
            <Section>
                <Container className="space-y-4">
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        <Card>
                            <CardHeader
                                title="Formulário de contato"
                                description="Preencha os campos para triagem inicial. Evite dados sensíveis sem orientação."
                            />
                            <CardContent className="mt-4">
                                <ContactForm />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader
                                title="Canais diretos"
                                description="Escolha o melhor caminho para iniciar a conversa."
                            />
                            <CardContent className="mt-4 space-y-3">
                                <a
                                    className={buttonClasses({
                                        variant: "secondary",
                                        size: "md",
                                        fullWidth: true,
                                    })}
                                    href={`mailto:${CONTACT.email}`}
                            >
                                    <FiMail className="h-5 w-5" aria-hidden="true" />
                                    {CONTACT.email}
                                </a>
                                <a
                                    className={buttonClasses({
                                        variant: "primary",
                                        size: "md",
                                        fullWidth: true,
                                    })}
                                    href={CONTACT.whatsapp}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Abrir conversa pelo WhatsApp"
                                >
                                    <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                                    WhatsApp {CONTACT.phoneDisplay}
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </Section>
        </>
    );
}
