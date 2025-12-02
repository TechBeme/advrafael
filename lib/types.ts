export type PracticeArea = {
    slug: string;
    title: string;
    description: string;
    topics: string[];
    featured?: boolean;
};

export type FAQItem = {
    question: string;
    answer: string;
    category?: string;
    requiresApproval?: boolean;
};

export type ArticleMeta = {
    slug: string;
    title: string;
    description: string;
    date: string;
    featured?: boolean;
    tags?: string[];
    readingTime?: string;
};
