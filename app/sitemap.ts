import { getArticlesIndex } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export default async function sitemap() {
    const baseUrl = siteConfig.url.replace(/\/$/, "");

    const staticRoutes = [
        "",
        "/sobre",
        "/areas",
        "/artigos",
        "/faq",
        "/contato",
        "/politica-de-privacidade",
    ];

    const articles = await getArticlesIndex();

    const articleRoutes = articles.map((article) => `/artigos/${article.slug}`);

    return [...staticRoutes, ...articleRoutes].map((route) => ({
        url: `${baseUrl}${route || "/"}`,
        lastModified: new Date(),
        changefreq: "monthly",
        priority: route === "" ? 1 : 0.6,
    }));
}
