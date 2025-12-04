import type { ReactNode } from "react";

type SiteLayoutProps = {
    children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-ink">
            <a
                href="#conteudo-principal"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-background focus:shadow-glow"
            >
                Pular para o conteúdo principal
            </a>
            <div id="conteudo-principal" className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
}
