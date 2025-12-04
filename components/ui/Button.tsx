'use client';

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "link";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    glow?: boolean;
};

const baseClasses =
    "relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-accent text-white shadow-md hover:bg-accent-dark hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
    secondary:
        "border border-border bg-card/80 text-ink hover:border-accent/50 hover:bg-card hover:text-accent active:scale-[0.98]",
    ghost:
        "text-muted hover:text-ink hover:bg-surface active:bg-surface",
    outline:
        "border-2 border-accent/50 text-accent hover:border-accent hover:bg-accent/10 active:scale-[0.98]",
    link:
        "text-accent underline-offset-4 hover:text-accent-dark hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
    icon: "h-10 w-10 p-0",
};

export function buttonClasses({
    variant = "primary",
    size = "md",
    className,
    fullWidth,
    glow,
}: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    fullWidth?: boolean;
    glow?: boolean;
}) {
    return cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        glow && variant === "primary" && "shadow-glow",
        className,
    );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(
        {
            className,
            variant = "primary",
            size = "md",
            fullWidth = false,
            loading = false,
            glow = false,
            disabled,
            children,
            ...props
        },
        ref
    ) {
        return (
            <button
                ref={ref}
                className={buttonClasses({ variant, size, className, fullWidth, glow })}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <>
                        <LoadingSpinner />
                        <span className="opacity-0">{children}</span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

// Animated button with motion
export const MotionButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function MotionButton(
        {
            className,
            variant = "primary",
            size = "md",
            fullWidth = false,
            loading = false,
            glow = false,
            disabled,
            children,
            ...props
        },
        ref
    ) {
        // Separate motion props from HTML button props to avoid type conflicts
        const { onAnimationStart, onDragStart, onDragEnd, onDrag, ...buttonProps } = props;

        return (
            <motion.button
                ref={ref}
                className={buttonClasses({ variant, size, className, fullWidth, glow })}
                disabled={disabled || loading}
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
                {...buttonProps}
            >
                {loading ? (
                    <>
                        <LoadingSpinner />
                        <span className="opacity-0">{children}</span>
                    </>
                ) : (
                    children
                )}
            </motion.button>
        );
    }
);

function LoadingSpinner() {
    return (
        <svg
            className="absolute h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}
