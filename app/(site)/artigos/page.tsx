import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleList } from "@/components/content/ArticleList";
import { getArticlesIndex } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Artigos",
    description: "Textos em linguagem acessível sobre temas de Direito Cível e do Consumidor.",
    path: "/artigos",
});

export default async function ArtigosPage() {
    const articles = await getArticlesIndex();

    return (
        <>
            <PageHeader
                kicker="Conteúdo"
                title="Artigos e materiais de apoio"
                description="Textos em linguagem acessível sobre temas de Direito Cível e do Consumidor."
            />
            <Section>
                <Container className="space-y-4">
                    <ArticleList articles={articles} />
                </Container>
            </Section>
        </>
    );
}
