'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { contactSchema, type ContactPayload } from "@/lib/validations";
import { cn } from "@/lib/utils";

const reasonOptions = [
    "Consulta em Direito Cível",
    "Consulta em Direito do Consumidor",
    "Análise de documentos",
    "Outro assunto jurídico",
];

type Status = "idle" | "success" | "error";

export function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactPayload>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (values: ContactPayload) => {
        setStatus("idle");
        try {
            const response = await fetch("/api/contato", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Falha ao enviar contato");
            }

            setStatus("success");
            reset();
        } catch (error) {
            console.error("Erro ao enviar contato", error);
            setStatus("error");
        }
    };

    const fieldClass =
        "block w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition placeholder:text-muted/90 focus:border-primary focus:ring-2 focus:ring-primary/15 focus-visible:outline-none aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20";

    return (
        <div className="space-y-4">
            {status === "success" ? (
                <Alert tone="success" title="Contato recebido">
                    <p>
                        Obrigado por enviar as informações. Em breve retornaremos com a confirmação do
                        atendimento.
                    </p>
                </Alert>
            ) : null}
            {status === "error" ? (
                <Alert tone="danger" title="Não foi possível enviar">
                    <p>
                        Ocorreu um erro ao registrar sua mensagem. Tente novamente e, se persistir,
                        utilize os canais diretos.
                    </p>
                </Alert>
            ) : null}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        id="name"
                        label="Nome completo"
                        required
                        error={errors.name?.message}
                    >
                        <Input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                    </FormField>
                    <FormField
                        id="email"
                        label="E-mail"
                        required
                        error={errors.email?.message}
                    >
                        <Input
                            id="email"
                            type="email"
                            placeholder="voce@email.com"
                            aria-invalid={!!errors.email}
                            autoComplete="email"
                            {...register("email")}
                        />
                    </FormField>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        id="phone"
                        label="Telefone ou WhatsApp"
                        required
                        error={errors.phone?.message}
                        hint="Use DDD e, se possível, informe um horário preferencial."
                    >
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="(31) 9 0000-0000"
                            aria-invalid={!!errors.phone}
                            autoComplete="tel"
                            {...register("phone")}
                        />
                    </FormField>
                    <FormField
                        id="reason"
                        label="Motivo do contato"
                        required
                        error={errors.reason?.message}
                    >
                        <select
                            id="reason"
                            className={cn(fieldClass)}
                            aria-invalid={!!errors.reason}
                            {...register("reason")}
                        >
                            <option value="">Selecione</option>
                            {reasonOptions.map((reason) => (
                                <option key={reason} value={reason}>
                                    {reason}
                                </option>
                            ))}
                        </select>
                    </FormField>
                </div>

                <FormField
                    id="message"
                    label="Resumo da situação"
                    required
                    error={errors.message?.message}
                    hint="Compartilhe apenas o necessário para a triagem inicial. Evite dados sensíveis sem orientação."
                >
                    <Textarea
                        id="message"
                        placeholder="Descreva em poucas linhas o que ocorreu, prazos e documentos que possui."
                        rows={6}
                        aria-invalid={!!errors.message}
                        {...register("message")}
                    />
                </FormField>

                <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar contato"}
                </Button>
            </form>
        </div>
    );
}
