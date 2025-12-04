import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
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
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [
            {
                url: `${siteConfig.url}${siteConfig.ogImage}`,
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
        title: siteConfig.name,
        description: siteConfig.description,
        images: [`${siteConfig.url}${siteConfig.ogImage}`],
        creator: siteConfig.twitterHandle,
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/images/logo.png", type: "image/png" },
        ],
        apple: [
            { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/manifest.json",
    verification: {
        // google: "seu-codigo-google-search-console",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <head>
                <meta name="theme-color" content="#069494" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=no" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/images/logo.png" type="image/png" />
                <link rel="apple-touch-icon" href="/images/logo.png" />
            </head>
            <body className={`${sansFont.variable} ${displayFont.variable}`}>
                {children}
            </body>
        </html>
    );
}
