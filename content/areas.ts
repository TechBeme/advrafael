import type { PracticeArea } from "@/lib/types";

export const practiceAreas: PracticeArea[] = [
    {
        slug: "direito-civil",
        title: "Direito Cível",
        description:
            "Apoio em conflitos contratuais, responsabilidade civil e cobranças, com explicação clara de riscos e caminhos possíveis.",
        topics: [
            "Elaboração e revisão de contratos para prevenir litígios.",
            "Responsabilidade civil e reparação de danos materiais ou morais.",
            "Cobranças, execuções e cumprimento de sentença com abordagem pragmática.",
            "Negociação extrajudicial, acordos e planejamento de provas.",
        ],
        featured: true,
    },
    {
        slug: "direito-do-consumidor",
        title: "Direito do Consumidor",
        description:
            "Orientação para consumidores em situações de desequilíbrio com fornecedores, buscando soluções proporcionais e éticas.",
        topics: [
            "Planos de saúde: negativas de cobertura, reajustes e rede credenciada.",
            "Instituições financeiras: cobranças indevidas, contratos e assédio ao consumo.",
            "Vícios de produto ou serviço, garantia e trocas.",
            "Compras on-line, atraso ou não entrega e publicidade enganosa.",
            "Negativação e proteção de dados do consumidor.",
        ],
        featured: true,
    },
];
