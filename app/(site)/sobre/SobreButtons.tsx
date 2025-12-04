'use client';

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export function SobreButtons() {
    return (
        <>
            <Link
                href="/contato"
                className={buttonClasses({ variant: "primary", size: "sm" })}
            >
                Agendar contato
            </Link>
            <Link
                href="/artigos"
                className={buttonClasses({ variant: "secondary", size: "sm" })}
            >
                Ver artigos
            </Link>
        </>
    );
}
