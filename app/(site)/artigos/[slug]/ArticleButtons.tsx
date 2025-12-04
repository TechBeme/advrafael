'use client';

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export function ArticleButtons() {
    return (
        <>
            <Link
                href="/contato"
                className={buttonClasses({ variant: "primary", size: "md" })}
            >
                Falar sobre o caso
            </Link>
            <Link
                href="/artigos"
                className={buttonClasses({ variant: "secondary", size: "md" })}
            >
                Voltar para artigos
            </Link>
        </>
    );
}
