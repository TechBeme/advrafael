import Link from "next/link";
import { FiCalendar, FiClock } from "react-icons/fi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type { ArticleMeta } from "@/lib/types";

type ArticleListProps = {
    articles: ArticleMeta[];
};

export function ArticleList({ articles }: ArticleListProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
                <Card key={article.slug}>
                    <CardHeader
                        eyebrow={article.featured ? "Destaque" : undefined}
                        title={
                            <Link
                                href={`/artigos/${article.slug}`}
                                className="text-ink transition hover:text-primary"
                            >
                                {article.title}
                            </Link>
                        }
                        description={article.description}
                    />
                    <CardContent className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span className="inline-flex items-center gap-1">
                            <FiCalendar className="h-4 w-4" aria-hidden="true" />
                            {format(new Date(article.date), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                        {article.readingTime ? (
                            <span className="inline-flex items-center gap-1">
                                <FiClock className="h-4 w-4" aria-hidden="true" />
                                {article.readingTime}
                            </span>
                        ) : null}
                        {article.featured ? <Badge variant="solid">Em destaque</Badge> : null}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
