import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
};

const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-primary",
    secondary:
        "border border-border bg-surface text-ink shadow-sm hover:border-primary/40 hover:text-primary focus-visible:outline-primary",
    ghost: "text-ink hover:bg-highlight focus-visible:outline-primary",
    link: "text-primary underline-offset-4 hover:text-accent focus-visible:outline-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
};

export function buttonClasses({
    variant = "primary",
    size = "md",
    className,
    fullWidth,
}: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    fullWidth?: boolean;
}) {
    return cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
    );
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonClasses({ variant, size, className, fullWidth })}
            {...props}
        />
    );
}
