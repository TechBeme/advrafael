'use client';

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type FadeInProps = {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
    once?: boolean;
};

const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
};

export function FadeIn({
    children,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    className,
    once = true,
}: FadeInProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={cn(className)}>{children}</div>;
    }

    return (
        <motion.div
            className={cn(className)}
            initial={{ opacity: 0, ...directionOffset[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once, margin: "-50px" }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing
            }}
        >
            {children}
        </motion.div>
    );
}

// Variant for use with AnimatePresence
export function FadeInOut({
    children,
    delay = 0,
    duration = 0.4,
    className,
}: Omit<FadeInProps, 'direction' | 'once'>) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={cn(className)}>{children}</div>;
    }

    return (
        <motion.div
            className={cn(className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, delay }}
        >
            {children}
        </motion.div>
    );
}
