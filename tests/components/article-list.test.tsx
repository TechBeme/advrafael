import { render, screen } from "@testing-library/react";
import { ArticleList } from "@/components/content/ArticleList";
import type { ArticleMeta } from "@/lib/types";

const sampleArticles: ArticleMeta[] = [
    {
        slug: "exemplo-1",
        title: "Exemplo de artigo destacado",
        description: "Resumo de teste para artigo em destaque.",
        date: "2025-02-10T00:00:00.000Z",
        featured: true,
        tags: ["teste"],
        readingTime: "2 min de leitura",
    },
    {
        slug: "exemplo-2",
        title: "Segundo artigo",
        description: "Outro resumo de teste.",
        date: "2025-02-01T00:00:00.000Z",
        featured: false,
        tags: [],
        readingTime: "3 min de leitura",
    },
];

describe("ArticleList", () => {
    it("renderiza links e destaque", () => {
        render(<ArticleList articles={sampleArticles} />);

        expect(
            screen.getByRole("link", { name: "Exemplo de artigo destacado" }),
        ).toHaveAttribute("href", "/artigos/exemplo-1");
        expect(screen.getAllByText(/em destaque/i).length).toBeGreaterThan(0);
        expect(screen.getByText("Resumo de teste para artigo em destaque.")).toBeInTheDocument();
    });
});
