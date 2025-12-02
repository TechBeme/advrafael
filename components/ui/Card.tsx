import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    padded?: boolean;
};

export function Card({ className, children, padded = true, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-lg border border-border bg-surface shadow-card transition",
                className,
                padded && "p-6 md:p-8",
            )}
            {...props}
        >
            {children}
        </div>
    );
}

type CardHeaderProps = {
    title: ReactNode;
    eyebrow?: string;
    icon?: ReactNode;
    description?: ReactNode;
};

export function CardHeader({ title, eyebrow, icon, description }: CardHeaderProps) {
    return (
        <div className="space-y-3">
            {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {eyebrow}
                </p>
            ) : null}
            <div className="flex items-start gap-3">
                {icon ? (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-highlight text-primary">
                        {icon}
                    </span>
                ) : null}
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-ink">{title}</h3>
                    {description ? (
                        <p className="text-sm text-muted">{description}</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("mt-4 space-y-3 text-sm text-ink", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("mt-6 flex items-center gap-3", className)}>{children}</div>;
}
