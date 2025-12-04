'use client';

import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '@/components/motion';

const faqs = [
    {
        question: 'Como funciona a primeira consulta?',
        answer:
            'Na primeira consulta, analiso detalhadamente o seu caso. Você apresenta a situação e os documentos disponíveis, e eu realizo uma avaliação inicial. Explico os caminhos possíveis, riscos envolvidos e perspectivas de êxito. A consulta é informativa e sem compromisso — você decide se deseja prosseguir após compreender todas as alternativas.',
    },
    {
        question: 'Posso entrar em contato fora do horário comercial?',
        answer:
            'Sim. Você pode enviar mensagens pelo chat ou WhatsApp a qualquer momento, e responderei assim que possível. Para questões que exijam análise mais aprofundada, agendamos uma consulta, que pode ser realizada presencialmente ou por videochamada.',
    },
    {
        question: 'Quais documentos preciso ter para começar?',
        answer:
            'Depende do tipo de caso. Em geral: documentos pessoais (RG, CPF), comprovante de residência e documentos relacionados à questão (contratos, notificações, comprovantes de pagamento, prints de conversas). Caso não possua algum documento, posso orientá-lo sobre como obtê-lo.',
    },
    {
        question: 'O atendimento é online ou presencial?',
        answer:
            'Ofereço ambas as modalidades. Para clientes em Belo Horizonte e região, o atendimento pode ser presencial. Para clientes de outras localidades ou que preferem praticidade, realizo atendimento 100% online por videochamada. Todo o processo pode ser conduzido digitalmente, incluindo assinatura de documentos.',
    },
    {
        question: 'Quanto tempo demora um processo judicial?',
        answer:
            'O prazo varia conforme o tipo e a complexidade do caso. Ações no Juizado Especial costumam ser resolvidas entre 6 meses e 1 ano. Processos na Justiça Comum podem levar de 2 a 4 anos. Sempre busco, prioritariamente, a resolução extrajudicial, que tende a ser mais célere. Na consulta, apresento uma estimativa mais precisa para o seu caso.',
    },
];

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border-b border-stone-200 last:border-b-0"
        >
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-accent"
                aria-expanded={isOpen}
            >
                <span className="pr-4 text-lg font-medium text-stone-900">{question}</span>
                <motion.span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500"
                    animate={{
                        backgroundColor: isOpen ? 'rgb(156 121 72 / 0.1)' : 'rgb(255 255 255)',
                        borderColor: isOpen ? 'rgb(156 121 72 / 0.3)' : 'rgb(231 229 228)',
                    }}
                >
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        {isOpen ? (
                            <FiMinus className="h-4 w-4 text-accent" />
                        ) : (
                            <FiPlus className="h-4 w-4" />
                        )}
                    </motion.div>
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pr-12">
                            <p className="leading-relaxed text-stone-600">{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative bg-background py-24 md:py-32">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface" />
            </div>

            <div className="container px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Coluna esquerda - Header */}
                    <FadeIn direction="left" className="lg:sticky lg:top-24 lg:self-start">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                            Perguntas Frequentes
                        </p>
                        <h2 className="mb-6 font-display text-3xl font-bold text-stone-900 md:text-4xl">
                            Dúvidas{' '}
                            <span className="text-accent">
                                comuns
                            </span>
                        </h2>
                        <p className="mb-8 text-lg text-stone-600">
                            Respostas diretas para as perguntas mais frequentes. Se sua dúvida não estiver aqui, entre em contato.
                        </p>

                        {/* Visual element */}
                        <div className="relative hidden lg:block">
                            <div className="absolute -left-4 top-0 h-32 w-px bg-gradient-to-b from-accent to-transparent" />
                            <div className="pl-6">
                                <p className="text-sm text-stone-500">
                                    &ldquo;Cada caso é único. Estas respostas são orientações gerais — sua situação pode
                                    apresentar particularidades que exigem análise específica.&rdquo;
                                </p>
                                <p className="mt-2 text-sm font-medium text-accent">Dr. Rafael Vieira</p>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Coluna direita - Accordion */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm md:p-8">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
