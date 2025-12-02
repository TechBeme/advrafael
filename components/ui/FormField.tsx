import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
    id: string;
    label: string;
    required?: boolean;
    hint?: string;
    error?: string;
    children: ReactNode;
    className?: string;
};

export function FormField({
    id,
    label,
    required,
    hint,
    error,
    children,
    className,
}: FormFieldProps) {
    return (
        <div className={cn("space-y-2", className)}>
            <label className="block text-sm font-semibold text-ink" htmlFor={id}>
                {label}{" "}
                {required ? <span className="text-danger" aria-hidden="true">*</span> : null}
            </label>
            {children}
            {hint ? <p className="text-xs text-muted">{hint}</p> : null}
            {error ? <p className="text-xs text-danger" role="alert">{error}</p> : null}
        </div>
    );
}
