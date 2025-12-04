import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "solid" | "outline" | "glass" | "accent" | "success" | "warning";

type BadgeProps = {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: "sm" | "md";
    icon?: ReactNode;
    className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
    solid: "bg-surface text-muted border border-border",
    outline: "border border-accent/30 text-accent bg-transparent",
    glass: "bg-surface/50 backdrop-blur-md text-ink border border-border/50",
    accent: "bg-accent/10 text-accent border border-accent/20",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
};

const sizeClasses = {
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3.5 py-1.5 text-xs",
};

export function Badge({
    children,
    variant = "solid",
    size = "md",
    icon,
    className
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider transition-colors",
                variantClasses[variant],
                sizeClasses[size],
                className,
            )}
        >
            {icon && <span className="opacity-80">{icon}</span>}
            {children}
        </span>
    );
}

// Credential badge with emphasis
type CredentialBadgeProps = {
    label: string;
    value: string;
    icon?: ReactNode;
    className?: string;
};

export function CredentialBadge({ label, value, icon, className }: CredentialBadgeProps) {
    return (
        <div className={cn(
            "inline-flex items-center gap-3 rounded-full bg-surface/60 backdrop-blur-md px-4 py-2 border border-border/50",
            className
        )}>
            {icon && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                    {icon}
                </span>
            )}
            <div className="flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                    {label}
                </span>
                <span className="text-sm font-semibold text-ink">
                    {value}
                </span>
            </div>
        </div>
    );
}

// Floating badge for overlays
export function FloatingBadge({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-xl px-4 py-2 text-sm font-medium text-ink shadow-soft border border-border/30",
                className,
            )}
        >
            {children}
        </span>
    );
}
