import { siteConfig } from "@/lib/seo";

export default async function sitemap() {
    const baseUrl = siteConfig.url.replace(/\/$/, "");

    const staticRoutes = [
        "",
        "/politica-de-privacidade",
    ];

    return staticRoutes.map((route) => ({
        url: `${baseUrl}${route || "/"}`,
        lastModified: new Date(),
        changefreq: "monthly",
        priority: route === "" ? 1 : 0.6,
    }));
}
