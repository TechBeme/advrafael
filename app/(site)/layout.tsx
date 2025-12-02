import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type SiteLayoutProps = {
    children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-ink">
            <a
                href="#conteudo-principal"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-card"
            >
                Pular para o conteúdo principal
            </a>
            <Header />
            <main id="conteudo-principal" className="flex-1 bg-gradient-to-b from-highlight/30 via-background to-background">
                {children}
            </main>
            <Footer />
        </div>
    );
}
