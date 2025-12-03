import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCalendar, FiClock, FiHome } from "react-icons/fi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Prose } from "@/components/content/Prose";
import { Container, Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { getArticleBySlug, getArticlesIndex } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export async function generateStaticParams() {
    const articles = await getArticlesIndex();
    return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolved = await params;
    try {
        const article = await getArticleBySlug(resolved.slug);
        return {
            title: `${article.meta.title} | ${siteConfig.shortName}`,
            description: article.meta.description,
            alternates: {
                canonical: `${siteConfig.url}/artigos/${article.meta.slug}`,
            },
            openGraph: {
                title: `${article.meta.title} | ${siteConfig.shortName}`,
                description: article.meta.description,
                url: `${siteConfig.url}/artigos/${article.meta.slug}`,
                siteName: siteConfig.name,
                images: [`${siteConfig.url}${siteConfig.ogImage}`],
                type: "article",
                publishedTime: article.meta.date,
                tags: article.meta.tags,
            },
        };
    } catch {
        return {
            title: "Artigo não encontrado | Rafael Vieira",
        };
    }
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolved = await params;
    try {
        const { meta, content } = await getArticleBySlug(resolved.slug);

        return (
            <>
                <Section className="pb-6 pt-8">
                    <Container className="space-y-4">
                        <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition hover:text-primary"
                            >
                                <FiHome className="h-4 w-4" aria-hidden="true" />
                                Início
                            </Link>
                            <span aria-hidden="true">/</span>
                            <Link
                                href="/artigos"
                                className="rounded-full px-2 py-1 transition hover:text-primary"
                            >
                                Artigos
                            </Link>
                            <span aria-hidden="true">/</span>
                            <span className="rounded-full px-2 py-1 text-ink">{meta.title}</span>
                        </nav>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-semibold leading-tight text-ink md:text-4xl">
                                {meta.title}
                            </h1>
                            <p className="text-base text-muted">{meta.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                                <span className="inline-flex items-center gap-1">
                                    <FiCalendar className="h-4 w-4" aria-hidden="true" />
                                    {format(new Date(meta.date), "dd 'de' MMMM 'de' yyyy", {
                                        locale: ptBR,
                                    })}
                                </span>
                                {meta.readingTime ? (
                                    <span className="inline-flex items-center gap-1">
                                        <FiClock className="h-4 w-4" aria-hidden="true" />
                                        {meta.readingTime}
                                    </span>
                                ) : null}
                                {meta.featured ? <Badge variant="outline">Em destaque</Badge> : null}
                                {meta.tags?.length
                                    ? meta.tags.map((tag) => (
                                          <Badge key={tag} variant="outline">
                                              {tag}
                                          </Badge>
                                      ))
                                    : null}
                            </div>
                        </div>

                    </Container>
                </Section>

                <Section className="pt-0">
                    <Container className="space-y-8">
                        <Prose>{content}</Prose>

                        <div className="flex flex-wrap gap-3">
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
                        </div>
                    </Container>
                </Section>
            </>
        );
    } catch {
        return notFound();
    }
}
