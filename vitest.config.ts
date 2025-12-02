import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./tests/setupTests.ts",
        css: true,
        reporters: ["default"],
        include: ["tests/**/*.{test,spec}.{ts,tsx}"],
        pool: "threads",
        exclude: ["tests/e2e/**", "node_modules/**", ".next/**"],
        coverage: {
            reporter: ["text", "lcov"],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
        },
    },
});
