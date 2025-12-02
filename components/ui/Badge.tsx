import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "solid" | "outline";

type BadgeProps = {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
};

export function Badge({ children, variant = "solid", className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                variant === "solid"
                    ? "bg-highlight text-primary"
                    : "border border-border text-muted",
                className,
            )}
        >
            {children}
        </span>
    );
}
