import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./content/**/*.{md,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--color-background))",
                surface: "rgb(var(--color-surface))",
                card: "rgb(var(--color-card))",
                border: "rgb(var(--color-border))",
                ink: "rgb(var(--color-ink))",
                muted: "rgb(var(--color-muted))",
                primary: {
                    DEFAULT: "rgb(var(--color-primary))",
                    foreground: "rgb(var(--color-primary-foreground))",
                },
                accent: {
                    DEFAULT: "rgb(var(--color-accent))",
                    foreground: "rgb(var(--color-accent-foreground))",
                },
                highlight: "rgb(var(--color-highlight))",
                success: "rgb(var(--color-success))",
                warning: "rgb(var(--color-warning))",
                danger: "rgb(var(--color-danger))",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
                display: ["var(--font-display)", "Georgia", "serif"],
                mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1.5rem",
                    lg: "2rem",
                },
                screens: {
                    "2xl": "1200px",
                },
            },
            borderRadius: {
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
                sm: "var(--radius-sm)",
            },
            boxShadow: {
                card: "0 12px 40px -22px rgba(15, 23, 42, 0.35)",
                soft: "0 16px 70px -45px rgba(15, 23, 42, 0.35)",
                outline: "0 0 0 3px rgba(23, 55, 94, 0.18)",
            },
            backgroundImage: {
                "grid-overlay":
                    "radial-gradient(circle at 1px 1px, rgba(23, 55, 94, 0.08) 1px, transparent 0)",
            },
        },
    },
    plugins: [typography],
};

export default config;
