import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import type { ArticleMeta } from "./types";
import { ensureNoProhibitedTerms } from "./content-safety";

const articlesDir = path.join(process.cwd(), "content/artigos");

const articleFrontmatterSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    slug: z.string().optional(),
    featured: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
});

function estimateReadingTime(text: string) {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min de leitura`;
}

async function loadArticleFiles() {
    const files = await fs.readdir(articlesDir);
    return files.filter((file) => file.endsWith(".mdx"));
}

export const getArticlesIndex = cache(async (): Promise<ArticleMeta[]> => {
    const files = await loadArticleFiles();
    const entries: ArticleMeta[] = [];

    for (const file of files) {
        const fullPath = path.join(articlesDir, file);
        const raw = await fs.readFile(fullPath, "utf-8");
        const { data, content } = matter(raw);
        ensureNoProhibitedTerms(JSON.stringify(data) + content, fullPath);

        const parsed = articleFrontmatterSchema.parse(data);
        const slug = parsed.slug ?? file.replace(/\.mdx$/, "");

        entries.push({
            slug,
            title: parsed.title,
            description: parsed.description,
            date: parsed.date.toISOString(),
            featured: parsed.featured ?? false,
            tags: parsed.tags ?? [],
            readingTime: estimateReadingTime(content),
        });
    }

    return entries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
});

export async function getFeaturedArticles(limit = 2) {
    const articles = await getArticlesIndex();
    return articles.filter((article) => article.featured).slice(0, limit);
}

export const getArticleBySlug = cache(async (slug: string) => {
    const fullPath = path.join(articlesDir, `${slug}.mdx`);
    const source = await fs.readFile(fullPath, "utf-8");
    const { data, content } = matter(source);
    ensureNoProhibitedTerms(JSON.stringify(data) + content, fullPath);

    const parsed = articleFrontmatterSchema.parse({ ...data, slug });
    const compiled = await compileMDX({
        source: content,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: "wrap",
                            properties: { className: "anchor-link" },
                        },
                    ],
                ],
            },
        },
    });

    const meta: ArticleMeta = {
        slug,
        title: parsed.title,
        description: parsed.description,
        date: parsed.date.toISOString(),
        featured: parsed.featured ?? false,
        tags: parsed.tags ?? [],
        readingTime: estimateReadingTime(content),
    };

    return { meta, content: compiled.content };
});
