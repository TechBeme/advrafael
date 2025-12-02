'use client';

import type { ReactNode } from "react";
import { Children } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type FadeInProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
    return (
        <motion.div
            className={cn(className)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );
}

type StaggerProps = {
    children: ReactNode;
    className?: string;
    stagger?: number;
};

export function StaggerFadeIn({ children, className, stagger = 0.08 }: StaggerProps) {
    const items = Children.toArray(children);
    return (
        <div className={cn("grid gap-4", className)}>
            {items.map((child, index) => (
                <FadeIn key={index} delay={index * stagger}>
                    {child}
                </FadeIn>
            ))}
        </div>
    );
}
