import Image from "next/image";
import Link from "next/link";
import {
    ArrowRightIcon,
    CheckCircleIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { Section, Container } from "../ui/Section";
import { Badge } from "../ui/Badge";
import { buttonClasses } from "../ui/Button";
import { Card } from "../ui/Card";

type HomeHeroProps = {
    whatsappLink: string;
};

const highlights = [
    "Explicação objetiva de riscos e caminhos possíveis.",
    "Atendimento sob agendamento, presencial ou on-line.",
    "Respeito ao Código de Ética da OAB e à LGPD.",
];

export function HomeHero({ whatsappLink }: HomeHeroProps) {
    return (
        <Section className="pb-12 pt-10 md:pt-14">
            <Container className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className="space-y-6">
                    <Badge variant="outline">Direito Cível e do Consumidor · BH/MG</Badge>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">
                            Orientação jurídica clara, com foco em soluções proporcionais e seguras.
                        </h1>
                        <p className="text-lg text-muted">
                            Apoio a pessoas físicas e pequenas empresas em conflitos contratuais,
                            responsabilidade civil e demandas de consumo, com linguagem acessível e
                            alinhamento constante de expectativas.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/contato"
                            className={buttonClasses({ variant: "primary", size: "lg" })}
                        >
                            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                            Agendar contato
                        </Link>
                        <a
                            className={buttonClasses({ variant: "secondary", size: "lg" })}
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Abrir conversa no WhatsApp"
                        >
                            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                            WhatsApp
                        </a>
                    </div>
                    <ul className="grid gap-2 text-sm text-ink md:grid-cols-2">
                        {highlights.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-2 rounded-md bg-highlight/60 px-3 py-2"
                            >
                                <CheckCircleIcon className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Card className="overflow-hidden p-0">
                    <div className="relative">
                        <Image
                            alt="Retrato ilustrado de Rafael Vieira"
                            src="/images/rafael-portrait.svg"
                            width={800}
                            height={800}
                            priority
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white drop-shadow">
                            <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/80">
                                Rafael Vieira · OAB/MG
                            </p>
                            <p className="mt-1 text-lg font-semibold">
                                Advocacia cível e do consumidor com linguagem clara.
                            </p>
                            <p className="text-sm text-primary-foreground/90">
                                Atendimentos sob agendamento, presenciais ou on-line.
                            </p>
                        </div>
                    </div>
                </Card>
            </Container>
        </Section>
    );
}
