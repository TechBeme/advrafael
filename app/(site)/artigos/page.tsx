import { Alert } from "@/components/ui/Alert";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleList } from "@/components/content/ArticleList";
import { getArticlesIndex } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Artigos",
    description:
        "Textos informativos em linguagem acessível sobre temas de Direito Cível e do Consumidor, sem promessas de resultado.",
    path: "/artigos",
});

export default async function ArtigosPage() {
    const articles = await getArticlesIndex();

    return (
        <>
            <PageHeader
                kicker="Conteúdo informativo"
                title="Artigos e materiais de apoio"
                description="Textos em linguagem acessível sobre temas de Direito Cível e do Consumidor, revisados para manter tom informativo e ético."
            />
            <Section>
                <Container className="space-y-4">
                    <Alert tone="info" title="Aviso de caráter geral">
                        <p>
                            Os artigos têm finalidade educativa e não substituem consulta jurídica
                            individual. Sempre considere as particularidades do seu caso antes de
                            tomar decisões.
                        </p>
                    </Alert>
                    <ArticleList articles={articles} />
                    <Alert tone="warning" title="Conteúdo em atualização">
                        <p>
                            Rascunhos passam por revisão do advogado responsável antes da publicação
                            definitiva. Sugestões de temas podem ser enviadas pelo formulário de
                            contato.
                        </p>
                    </Alert>
                </Container>
            </Section>
        </>
    );
}
