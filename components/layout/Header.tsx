import Link from "next/link";
import { NavBar } from "./NavBar";
import { Container } from "../ui/Section";

export default function Header() {
    return (
        <header className="sticky top-0 z-30 border-b border-border/80 bg-white/90 backdrop-blur">
            <Container className="flex items-center justify-between gap-4 py-4">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-highlight"
                    aria-label="Rafael Vieira, advocacia cível e do consumidor em Belo Horizonte"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold uppercase text-primary-foreground shadow-card">
                        RV
                    </span>
                    <span className="leading-tight">
                        <span className="block font-display text-lg font-semibold text-ink transition group-hover:text-primary">
                            Rafael Vieira
                        </span>
                        <span className="block text-xs font-medium uppercase tracking-[0.2em] text-muted">
                            Advocacia Cível e do Consumidor · BH/MG
                        </span>
                    </span>
                </Link>
                <NavBar />
            </Container>
        </header>
    );
}
