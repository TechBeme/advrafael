import {
    HeroSection,
    AreasSection,
    AboutSection,
    ProcessSection,
    FAQSection,
    ContactSection,
    FooterSection,
} from '@/components/sections';
import { ChatPopup } from '@/components/chat';
import { buildMetadata } from '@/lib/seo';
import { LandingNavbar } from '@/components/layout/LandingNavbar';

export const metadata = buildMetadata({
    title: 'Rafael Vieira | Advogado em BH - Direito Civil, Família e Empresarial',
    description:
        'Rafael Vieira, advogado em Belo Horizonte. Formado pela UFMG, com experiência em Direito do Consumidor, Contratos, Família, Civil e Empresarial. Atendimento online e presencial.',
    path: '/',
});

export default function HomePage() {
    return (
        <>
            <LandingNavbar />
            <main className="flex-1">
                <HeroSection />
                <AreasSection />
                <AboutSection />
                <ProcessSection />
                <FAQSection />
                <ContactSection />
            </main>
            <FooterSection />
            <ChatPopup />
        </>
    );
}
