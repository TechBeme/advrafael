import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { Container } from "../ui/Section";

export function InformationalNotice() {
    return (
        <div className="border-b border-border bg-highlight/70">
            <Container className="flex items-start gap-3 py-3 text-sm text-ink">
                <ShieldCheckIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                <div className="space-y-0.5">
                    <p className="font-semibold leading-snug">Conteúdo informativo</p>
                    <p className="leading-relaxed text-muted">
                        Informações gerais e educativas, alinhadas ao Código de Ética da OAB. Cada
                        situação exige avaliação individual e atendimento agendado.
                    </p>
                </div>
            </Container>
        </div>
    );
}
