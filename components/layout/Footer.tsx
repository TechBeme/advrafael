import Link from "next/link";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Container } from "../ui/Section";
import { buttonClasses } from "../ui/Button";

const NAV_ITEMS = [
    { href: "/#sobre", label: "Sobre" },
    { href: "/#areas", label: "Áreas de atuação" },
    { href: "/artigos", label: "Artigos" },
    { href: "/#faq", label: "FAQ" },
    { href: "/contato", label: "Contato" },
    { href: "/politica-de-privacidade", label: "Política de Privacidade" },
];

const CONTACT = {
    email: "contato@advrafael.com.br",
    whatsapp: "https://wa.me/5531990000000?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20conversa.",
    phoneDisplay: "(31) 99000-0000",
};

export default function Footer() {
    return (
        <footer className="border-t border-border bg-surface">
            <Container className="grid gap-10 py-12 md:grid-cols-3">
                <div className="space-y-3">
                    <p className="inline-flex items-center rounded-full bg-highlight px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Rafael Vieira
                    </p>
                    <h3 className="text-xl font-semibold text-ink">Advocacia Cível e do Consumidor</h3>
                    <p className="text-sm text-muted">
                        Atuação sob medida, com linguagem clara e atenção às particularidades de cada
                        caso. Atendimento em Belo Horizonte e Minas Gerais, com possibilidade de
                        reuniões on-line.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                        Navegação
                    </h4>
                    <ul className="mt-4 space-y-2 text-sm text-ink">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link
                                    className="inline-flex items-center gap-2 rounded-md px-2 py-1 transition hover:text-primary"
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                        Contato
                    </h4>
                    <div className="space-y-2 text-sm text-ink">
                        <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-2 shadow-sm">
                            <FiMapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                            <div>
                                <p className="font-semibold text-ink">Belo Horizonte / MG</p>
                                <p className="text-muted">Atendimento sob agendamento</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <a
                                className={buttonClasses({ variant: "secondary", size: "sm" })}
                                href={`mailto:${CONTACT.email}`}
                            >
                                <FiMail className="h-4 w-4" aria-hidden="true" />
                                {CONTACT.email}
                            </a>
                            <a
                                className={buttonClasses({ variant: "primary", size: "sm" })}
                                href={CONTACT.whatsapp}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Abrir conversa pelo WhatsApp"
                            >
                                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                                WhatsApp {CONTACT.phoneDisplay}
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="border-t border-border/70 bg-card/70">
                <Container className="flex flex-col gap-2 py-4 text-xs text-muted md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} Rafael Vieira. Todos os direitos reservados.</p>
                </Container>
            </div>
        </footer>
    );
}
