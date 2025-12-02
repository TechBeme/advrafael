import { expect, test } from "@playwright/test";

test("home renderiza hero informativo", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Orientação jurídica clara",
    );
    const main = page.locator("#conteudo-principal");
    await expect(main.getByRole("link", { name: "Agendar contato" })).toBeVisible();
});
