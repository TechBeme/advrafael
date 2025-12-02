import { render, screen } from "@testing-library/react";

function SmokeComponent() {
    return (
        <section>
            <h1>Ambiente de testes</h1>
            <p>Render de verificação inicial.</p>
        </section>
    );
}

describe("Ambiente de testes", () => {
    it("renderiza conteúdo básico", () => {
        render(<SmokeComponent />);
        expect(screen.getByText("Ambiente de testes")).toBeInTheDocument();
        expect(screen.getByText("Render de verificação inicial.")).toBeInTheDocument();
    });
});
