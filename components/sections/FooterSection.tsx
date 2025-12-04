'use client';

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { FadeIn } from '@/components/motion';

const WHATSAPP_NUMBER = '5531975321410';

export function FooterSection() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-stone-200 py-12 md:py-16">
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-white" />

            <div className="container px-6">
                <FadeIn>
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        {/* Logo e info */}
                        <div className="text-center md:text-left">
                            <p className="mb-1 font-display text-xl font-semibold text-stone-900">
                                Rafael Vieira
                            </p>
                            <p className="text-sm text-stone-600">Advogado | OAB/MG 000.000</p>
                        </div>

                        {/* Social links */}
                        <div className="flex items-center gap-4">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-all hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-500"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:contato@advrafael.com.br"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                                aria-label="E-mail"
                            >
                                <FiMail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-8 h-px bg-stone-200" />

                    {/* Bottom row */}
                    <div className="flex flex-col items-center justify-between gap-4 text-sm text-stone-500 md:flex-row">
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                            <Link
                                href="/politica-de-privacidade"
                                className="transition-colors hover:text-accent"
                            >
                                Política de Privacidade
                            </Link>
                            <span className="hidden text-stone-300 md:inline">|</span>
                            <span className="flex items-center gap-1">
                                <FiMapPin className="h-3 w-3" />
                                Belo Horizonte, MG
                            </span>
                        </div>

                        <p className="text-center">
                            © {currentYear} Rafael Vieira. Todos os direitos reservados.
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-8 border-t border-stone-100 pt-6">
                        <p className="mx-auto max-w-3xl text-center text-xs text-stone-400">
                            Este site tem caráter informativo e não constitui aconselhamento jurídico. A relação
                            advogado-cliente só se estabelece mediante contratação formal. Responsável técnico:
                            Rafael Vieira, OAB/MG 000.000.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </footer>
    );
}
