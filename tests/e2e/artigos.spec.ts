import { expect, test } from "@playwright/test";

test("lista artigos e abre detalhe", async ({ page }) => {
    await page.goto("/artigos");
    await expect(page.getByRole("heading", { name: "Artigos e materiais de apoio" })).toBeVisible();

    const articleLink = page.getByRole("link", {
        name: "Como organizar documentos para um caso de consumo",
    });
    await expect(articleLink).toBeVisible();
    await articleLink.click();

    await expect(
        page.getByRole("heading", { name: "Como organizar documentos para um caso de consumo" }),
    ).toBeVisible();
    await expect(page.getByText("caráter geral", { exact: false })).toBeVisible();
});
