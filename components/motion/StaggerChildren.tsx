'use client';

import type { ReactNode } from "react";
import { Children } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type StaggerChildrenProps = {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    initialDelay?: number;
    once?: boolean;
};

export function StaggerChildren({
    children,
    className,
    staggerDelay = 0.1,
    initialDelay = 0,
    once = true,
}: StaggerChildrenProps) {
    const shouldReduceMotion = useReducedMotion();
    const items = Children.toArray(children);

    if (shouldReduceMotion) {
        return <div className={cn(className)}>{children}</div>;
    }

    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-50px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: initialDelay,
                    },
                },
            }}
        >
            {items.map((child, index) => (
                <motion.div
                    key={index}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                ease: [0.25, 0.1, 0.25, 1],
                            },
                        },
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

// Horizontal stagger variant
export function StaggerHorizontal({
    children,
    className,
    staggerDelay = 0.08,
    once = true,
}: StaggerChildrenProps) {
    const shouldReduceMotion = useReducedMotion();
    const items = Children.toArray(children);

    if (shouldReduceMotion) {
        return <div className={cn(className)}>{children}</div>;
    }

    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-30px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {items.map((child, index) => (
                <motion.div
                    key={index}
                    variants={{
                        hidden: { opacity: 0, x: -20, scale: 0.95 },
                        visible: {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            transition: {
                                duration: 0.4,
                                ease: "easeOut",
                            },
                        },
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}
