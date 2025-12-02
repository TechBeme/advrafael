import type { Metadata } from "next";

export const siteConfig = {
    name: "Rafael Vieira | Advocacia Cível e do Consumidor",
    shortName: "Rafael Vieira",
    description:
        "Orientação jurídica em Direito Cível e do Consumidor, com linguagem clara, ética profissional e foco em soluções proporcionais.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://advrafael.com.br",
    ogImage: "/og-default.svg",
};

export function buildMetadata({
    title,
    description,
    path,
}: {
    title?: string;
    description: string;
    path?: string;
}): Metadata {
    const finalTitle = title ? `${title} | ${siteConfig.shortName}` : siteConfig.name;
    const canonical = path ? `${siteConfig.url}${path}` : siteConfig.url;
    const imageUrl = `${siteConfig.url}${siteConfig.ogImage}`;

    return {
        title: finalTitle,
        description,
        alternates: {
            canonical,
        },
        openGraph: {
            title: finalTitle,
            description,
            url: canonical,
            siteName: siteConfig.name,
            images: [imageUrl],
            type: "website",
        },
    };
}
