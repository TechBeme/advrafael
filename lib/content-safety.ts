import { practiceAreas } from "@/content/areas";
import { faqItems } from "@/content/faq";
import { professionalSummary, values } from "@/content/bio";

export const prohibitedPatterns = [
    /resultado\s+garantid[oa]/i,
    /(?<!sem\s)garantia\s+de\s+resultado/i,
    /vit[oó]ria\s+garantida/i,
    /causa\s+ganha/i,
    /somos\s+os\s+melhores/i,
    /promo[cç][aã]o\s+de\s+honor[áa]rios/i,
    /desconto\s+de\s+honor[áa]rios/i,
];

export function ensureNoProhibitedTerms(text: string, source: string) {
    for (const pattern of prohibitedPatterns) {
        if (pattern.test(text)) {
            throw new Error(`Termo proibido "${pattern}" encontrado em ${source}`);
        }
    }
}

export function validateStaticContent() {
    const contentPieces = [
        ...practiceAreas.map((area) => ({
            source: `content/areas/${area.slug}`,
            text: `${area.title} ${area.description} ${area.topics.join(" ")}`,
        })),
        ...faqItems.map((item) => ({
            source: `content/faq/${item.question}`,
            text: `${item.question} ${item.answer}`,
        })),
        {
            source: "content/bio/summary",
            text: `${professionalSummary.headline} ${professionalSummary.description}`,
        },
        ...values.map((value) => ({
            source: `content/bio/values/${value.title}`,
            text: `${value.title} ${value.description}`,
        })),
    ];

    contentPieces.forEach(({ text, source }) => ensureNoProhibitedTerms(text, source));
}
