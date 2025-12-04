'use client';

import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "glass" | "elevated" | "outline" | "gradient";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    variant?: CardVariant;
    padded?: boolean;
    hover?: boolean;
    glow?: boolean;
};

const variantClasses: Record<CardVariant, string> = {
    default: "bg-card border border-border shadow-elegant",
    glass: "bg-card/80 backdrop-blur-xl border border-border/50 shadow-elegant",
    elevated: "bg-card border border-border shadow-soft",
    outline: "bg-transparent border-2 border-border hover:border-accent/50",
    gradient: "bg-gradient-to-br from-card via-surface to-card border border-border/50 shadow-elegant",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
    function Card({
        className,
        children,
        variant = "default",
        padded = true,
        hover = false,
        glow = false,
        ...props
    }, ref) {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-2xl transition-all duration-300",
                    variantClasses[variant],
                    padded && "p-6 md:p-8",
                    hover && "hover:border-accent/40 hover:shadow-glow-sm hover:-translate-y-1",
                    glow && "shadow-glow",
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

// Motion-enabled card
export const MotionCard = forwardRef<HTMLDivElement, CardProps>(
    function MotionCard({
        className,
        children,
        variant = "default",
        padded = true,
        hover = true,
        glow = false,
        ...props
    }, ref) {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-2xl transition-colors duration-300",
                    variantClasses[variant],
                    padded && "p-6 md:p-8",
                    glow && "shadow-glow",
                    className,
                )}
                whileHover={hover ? {
                    y: -4,
                    boxShadow: "0 8px 30px rgb(0 0 0 / 0.08)",
                } : undefined}
                transition={{ duration: 0.3 }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

type CardHeaderProps = {
    title: ReactNode;
    eyebrow?: string;
    icon?: ReactNode;
    description?: ReactNode;
    centered?: boolean;
};

export function CardHeader({ title, eyebrow, icon, description, centered = false }: CardHeaderProps) {
    return (
        <div className={cn("space-y-3", centered && "text-center")}>
            {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {eyebrow}
                </p>
            )}
            <div className={cn(
                "flex items-start gap-4",
                centered && "flex-col items-center"
            )}>
                {icon && (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        {icon}
                    </span>
                )}
                <div className={cn("space-y-2", centered && "text-center")}>
                    <h3 className="text-xl font-semibold text-ink">{title}</h3>
                    {description && (
                        <p className="text-sm leading-relaxed text-muted">{description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("mt-5 space-y-3 text-sm text-muted leading-relaxed", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("mt-6 flex items-center gap-4 pt-4 border-t border-border/50", className)}>{children}</div>;
}

// Feature card with number/icon
type FeatureCardProps = {
    number?: number;
    icon?: ReactNode;
    title: string;
    description: string;
    className?: string;
};

export function FeatureCard({ number, icon, title, description, className }: FeatureCardProps) {
    return (
        <MotionCard variant="glass" className={className}>
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light text-background font-display text-xl font-bold">
                    {number ?? icon}
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-ink">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{description}</p>
                </div>
            </div>
        </MotionCard>
    );
}
