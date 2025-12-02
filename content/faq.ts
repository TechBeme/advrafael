import type { FAQItem } from "@/lib/types";

export const faqItems: FAQItem[] = [
    {
        question: "O envio do formulário cria relação advogado-cliente?",
        answer:
            "Não. As informações iniciais servem apenas para triagem. A relação profissional depende de análise do caso, aceite formal e contrato de honorários.",
        category: "Atendimento",
        requiresApproval: true,
    },
    {
        question: "Quais documentos costumam ser solicitados na análise preliminar?",
        answer:
            "Documentos de identificação, provas do fato (contratos, protocolos, notas fiscais), registros de conversas e comprovantes de pagamento. Apenas o estritamente necessário é solicitado na fase inicial.",
        category: "Documentos",
        requiresApproval: true,
    },
    {
        question: "É possível atendimento on-line?",
        answer:
            "Sim. Reuniões podem ocorrer por vídeo ou telefone, sempre com o mesmo cuidado quanto à privacidade e à clareza das orientações.",
        category: "Atendimento",
        requiresApproval: true,
    },
    {
        question: "Como são tratados prazos e expectativas?",
        answer:
            "Cada caso possui prazos e riscos próprios. As expectativas são alinhadas com transparência, sem garantias de resultado e com atualização ao longo do andamento.",
        category: "Expectativas",
        requiresApproval: true,
    },
];
