import { expect, test } from "@playwright/test";

test("envia formulário de contato com dados válidos", async ({ page }) => {
    await page.goto("/contato");

    await page.getByLabel("Nome completo").fill("Usuário de Teste");
    await page.getByLabel("E-mail").fill("teste@example.com");
    await page.getByLabel("Telefone ou WhatsApp").fill("(31) 90000-0000");
    await page.getByLabel("Motivo do contato").selectOption("Consulta em Direito Cível");
    await page
        .getByLabel("Resumo da situação")
        .fill("Mensagem curta para verificar o envio do formulário de contato.");

    await page.getByRole("button", { name: "Enviar contato" }).click();

    await expect(page.getByText("Contato recebido")).toBeVisible();
});
