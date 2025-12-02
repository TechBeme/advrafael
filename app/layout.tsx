import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { validateStaticContent } from "@/lib/content-safety";
import { siteConfig } from "@/lib/seo";

const displayFont = localFont({
    src: [
        {
            path: "../public/fonts/playfair-display/playfair-display-400.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/playfair-display/playfair-display-600.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/playfair-display/playfair-display-700.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-display",
    display: "swap",
    preload: true,
});

const sansFont = localFont({
    src: [
        {
            path: "../public/fonts/source-sans-3/source-sans-3-400.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/source-sans-3/source-sans-3-500.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/source-sans-3/source-sans-3-600.woff2",
            weight: "600",
            style: "normal",
        },
    ],
    variable: "--font-sans",
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.shortName}`,
    },
    description: siteConfig.description,
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [`${siteConfig.url}${siteConfig.ogImage}`],
        type: "website",
    },
};

validateStaticContent();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${sansFont.variable} ${displayFont.variable}`}>
                {children}
            </body>
        </html>
    );
}
