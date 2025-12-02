'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
    Bars3Icon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { buttonClasses } from "../ui/Button";
import { cn } from "@/lib/utils";

type NavLink = {
    href: string;
    label: string;
};

const NAV_LINKS: NavLink[] = [
    { href: "/", label: "Início" },
    { href: "/#sobre", label: "Sobre" },
    { href: "/#areas", label: "Áreas" },
    { href: "/artigos", label: "Artigos" },
    { href: "/#faq", label: "FAQ" },
    { href: "/contato", label: "Contato" },
];

const WHATSAPP_LINK =
    "https://wa.me/5531990000000?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20conversa.";

export function NavBar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav aria-label="Navegação principal" className="relative">
            <button
                type="button"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                aria-controls="menu-principal"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-ink shadow-sm transition hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
                onClick={() => setOpen((prev) => !prev)}
            >
                {open ? (
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                    <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                )}
            </button>

            <div
                id="menu-principal"
                className={cn(
                    "absolute right-0 top-[calc(100%+0.75rem)] z-30 w-72 rounded-lg border border-border bg-surface p-4 shadow-soft md:static md:w-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none",
                    open ? "block" : "hidden md:block",
                )}
            >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                    <ul className="flex flex-col gap-2 text-sm font-medium text-ink md:flex-row md:items-center md:gap-4">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    className={cn(
                                        "flex items-center gap-2 rounded-full px-3 py-2 transition hover:text-primary",
                                        isActive(link.href) ? "bg-highlight text-primary" : "",
                                    )}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                        <Link
                            href="/contato"
                            className={buttonClasses({ variant: "secondary", size: "sm" })}
                            onClick={() => setOpen(false)}
                        >
                            <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                            Agendar contato
                        </Link>
                        <a
                            className={buttonClasses({ variant: "primary", size: "sm" })}
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Abrir conversa no WhatsApp"
                            onClick={() => setOpen(false)}
                        >
                            <ChatBubbleLeftRightIcon className="h-4 w-4" aria-hidden="true" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
