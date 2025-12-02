import { expect, test, type Page } from "@playwright/test";
import axeCore, { type AxeResults } from "axe-core";

const axeSource = axeCore.source;

async function runAxe(page: Page) {
    await page.addScriptTag({ content: axeSource });

    const results = await page.evaluate(async () => {
        const axe = (window as typeof window & { axe: typeof import("axe-core") }).axe;
        return axe.run(document, { runOnly: ["wcag2a", "wcag2aa"] });
    });

    return results as AxeResults;
}

function formatViolations(violations: AxeResults["violations"]) {
    return violations
        .map((violation) => {
            const targets = violation.nodes.map((node) => node.target.join(" ")).join("; ");
            return `${violation.id}: ${violation.help} (${targets})`;
        })
        .join("\n");
}

test.describe("Acessibilidade (axe)", () => {
    test("Home sem violações críticas", async ({ page }) => {
        await page.goto("/");
        const results = await runAxe(page);
        expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
    });

    test("Contato sem violações críticas", async ({ page }) => {
        await page.goto("/contato");
        const results = await runAxe(page);
        expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
    });
});
