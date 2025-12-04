'use client';

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
    children: ReactNode;
    className?: string;
    speed?: number; // -1 to 1, negative = opposite direction
    offset?: [string, string]; // Start and end scroll positions
};

export function Parallax({
    children,
    className,
    speed = 0.3,
    offset = ["start end", "end start"],
}: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as ["start end", "end start"],
    });

    // Transform scroll progress to Y offset
    const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

    if (shouldReduceMotion) {
        return <div ref={ref} className={cn(className)}>{children}</div>;
    }

    return (
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}

// Parallax for background images
type ParallaxImageProps = {
    src: string;
    alt: string;
    className?: string;
    speed?: number;
    overlay?: boolean;
};

export function ParallaxImage({
    src,
    alt,
    className,
    speed = 0.2,
    overlay = true,
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * -50, speed * 50]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

    if (shouldReduceMotion) {
        return (
            <div ref={ref} className={cn("relative overflow-hidden", className)}>
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                />
                {overlay && (
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
                )}
            </div>
        );
    }

    return (
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
            <motion.img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                style={{ y, scale }}
            />
            {overlay && (
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
            )}
        </div>
    );
}

// Scale on scroll effect
type ScaleOnScrollProps = {
    children: ReactNode;
    className?: string;
    scaleRange?: [number, number];
};

export function ScaleOnScroll({
    children,
    className,
    scaleRange = [0.9, 1],
}: ScaleOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

    if (shouldReduceMotion) {
        return <div ref={ref} className={cn(className)}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            className={cn(className)}
            style={{ scale, opacity }}
        >
            {children}
        </motion.div>
    );
}
