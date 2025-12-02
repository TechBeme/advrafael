import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    { className, rows = 4, ...props },
    ref,
) {
    return (
        <textarea
            ref={ref}
            rows={rows}
            className={cn(
                "block w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition",
                "placeholder:text-muted/90 focus:border-primary focus:ring-2 focus:ring-primary/15 focus-visible:outline-none",
                "aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20",
                className,
            )}
            {...props}
        />
    );
});
