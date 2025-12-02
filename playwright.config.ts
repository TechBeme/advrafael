import { defineConfig, devices } from "@playwright/test";

const port = process.env.PORT ?? "4000";
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`;

export default defineConfig({
    testDir: "./tests/e2e",
    retries: 0,
    use: {
        baseURL,
        trace: "on-first-retry",
        headless: true,
    },
    webServer: {
        command: `npm run dev -- --hostname 0.0.0.0 --port ${port}`,
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120000,
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
