import { describe, expect, it } from "vitest";
import { getArticlesIndex } from "@/lib/content";

describe("content loader", () => {
    it("retorna artigos ordenados por data com metadados básicos", async () => {
        const articles = await getArticlesIndex();
        expect(articles.length).toBeGreaterThan(0);
        expect(articles[0].date >= articles[articles.length - 1].date).toBe(true);
        expect(articles[0]).toHaveProperty("readingTime");
        expect(articles[0]).toHaveProperty("description");
    });
});
