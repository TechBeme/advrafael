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
                background: "rgb(var(--color-background) / <alpha-value>)",
                surface: "rgb(var(--color-surface) / <alpha-value>)",
                "surface-alt": "rgb(var(--color-surface-alt) / <alpha-value>)",
                card: "rgb(var(--color-card) / <alpha-value>)",
                elevated: "rgb(var(--color-elevated) / <alpha-value>)",
                border: "rgb(var(--color-border) / <alpha-value>)",
                "border-subtle": "rgb(var(--color-border-subtle) / <alpha-value>)",
                ink: "rgb(var(--color-ink) / <alpha-value>)",
                muted: "rgb(var(--color-muted) / <alpha-value>)",
                subtle: "rgb(var(--color-subtle) / <alpha-value>)",
                primary: {
                    DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
                    foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
                },
                accent: {
                    DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
                    light: "rgb(var(--color-accent-light) / <alpha-value>)",
                    dark: "rgb(var(--color-accent-dark) / <alpha-value>)",
                    foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)",
                },
                highlight: "rgb(var(--color-highlight) / <alpha-value>)",
                success: "rgb(var(--color-success) / <alpha-value>)",
                warning: "rgb(var(--color-warning) / <alpha-value>)",
                danger: "rgb(var(--color-danger) / <alpha-value>)",
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
                "2xl": "var(--radius-lg)",
                lg: "var(--radius-md)",
                md: "var(--radius-sm)",
                sm: "8px",
            },
            boxShadow: {
                card: "0 4px 24px -4px rgb(0 0 0 / 0.08)",
                soft: "0 8px 32px -8px rgb(0 0 0 / 0.1)",
                glow: "0 0 20px rgb(6 148 148 / 0.15), 0 0 40px rgb(6 148 148 / 0.05)",
                "glow-sm": "0 0 10px rgb(6 148 148 / 0.1)",
                outline: "0 0 0 2px rgb(6 148 148 / 0.3)",
                elegant: "0 4px 20px rgb(0 0 0 / 0.04), 0 2px 6px rgb(0 0 0 / 0.02)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-warm": "linear-gradient(180deg, rgb(250 250 252) 0%, rgb(244 245 247) 100%)",
                "grid-overlay": "radial-gradient(circle at 1px 1px, rgba(27 59 95 / 0.03) 1px, transparent 0)",
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "slide-up": "slideUp 0.6s ease-out forwards",
                "pulse-slow": "pulse 3s ease-in-out infinite",
                "bounce-slow": "bounce 2s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [typography],
};

export default config;
