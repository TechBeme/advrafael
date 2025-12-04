import type { Metadata } from "next";

export const siteConfig = {
    name: "Dr. Rafael Vieira | Advogado em BH",
    shortName: "Dr. Rafael Vieira",
    description:
        "Advogado em Belo Horizonte especializado em Direito Civil e Empresarial. Atendimento personalizado, consultoria jurídica estratégica e resolução de conflitos. Formado pela UFMG com experiência na Defensoria Pública de MG.",
    keywords: [
        "advogado belo horizonte",
        "advogado direito civil",
        "advogado direito empresarial",
        "advogado BH",
        "consultoria jurídica",
        "advogado contratos",
        "advogado UFMG",
        "direito civil bh",
        "advogado online",
        "consultoria empresarial",
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://advrafael.com.br",
    ogImage: "/og-image.jpeg",
    logo: "/images/logo.png",
    author: "Dr. Rafael Vieira",
    locale: "pt_BR",
    themeColor: "#069494",
    twitterHandle: "@advrafael",
};

export function buildMetadata({
    title,
    description,
    path,
    image,
}: {
    title?: string;
    description: string;
    path?: string;
    image?: string;
}): Metadata {
    const finalTitle = title ? `${title} | ${siteConfig.shortName}` : siteConfig.name;
    const canonical = path ? `${siteConfig.url}${path}` : siteConfig.url;
    const imageUrl = image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.ogImage}`;

    return {
        title: finalTitle,
        description,
        keywords: siteConfig.keywords,
        authors: [{ name: siteConfig.author }],
        creator: siteConfig.author,
        alternates: {
            canonical,
        },
        openGraph: {
            title: finalTitle,
            description,
            url: canonical,
            siteName: siteConfig.name,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: siteConfig.name,
                },
            ],
            locale: siteConfig.locale,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: finalTitle,
            description,
            images: [imageUrl],
            creator: siteConfig.twitterHandle,
        },
    };
}
