'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type CountUpProps = {
    end: number;
    start?: number;
    duration?: number;
    delay?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    once?: boolean;
};

export function CountUp({
    end,
    start = 0,
    duration = 2,
    delay = 0,
    decimals = 0,
    prefix = "",
    suffix = "",
    className,
    once = true,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });
    const shouldReduceMotion = useReducedMotion();

    // Initialize with end value if reduce motion is preferred
    const [count, setCount] = useState(() => shouldReduceMotion ? end : start);

    useEffect(() => {
        if (!isInView) return;

        // If reduce motion, we already set end value in useState initializer
        if (shouldReduceMotion) return;

        const startTime = performance.now() + delay * 1000;
        const endTime = startTime + duration * 1000;

        const updateCount = (currentTime: number) => {
            if (currentTime < startTime) {
                requestAnimationFrame(updateCount);
                return;
            }

            if (currentTime >= endTime) {
                setCount(end);
                return;
            }

            const progress = (currentTime - startTime) / (duration * 1000);
            // Ease out cubic for natural feel
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = start + (end - start) * easedProgress;
            setCount(currentCount);
            requestAnimationFrame(updateCount);
        };

        requestAnimationFrame(updateCount);
    }, [isInView, start, end, duration, delay, shouldReduceMotion]);

    const displayValue = decimals > 0
        ? count.toFixed(decimals)
        : Math.round(count).toString();

    return (
        <span ref={ref} className={cn("tabular-nums", className)}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}

// Animated number with formatting
type AnimatedNumberProps = {
    value: number;
    className?: string;
    format?: (n: number) => string;
};

export function AnimatedNumber({
    value,
    className,
    format = (n) => n.toLocaleString('pt-BR'),
}: AnimatedNumberProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <span className={cn("tabular-nums", className)}>{format(value)}</span>;
    }

    return (
        <motion.span
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("tabular-nums", className)}
        >
            {format(value)}
        </motion.span>
    );
}

// Typewriter effect for text
type TypewriterProps = {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    cursor?: boolean;
};

export function Typewriter({
    text,
    speed = 50,
    delay = 0,
    className,
    cursor = true,
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!isInView) return;

        if (shouldReduceMotion) {
            setDisplayedText(text);
            setShowCursor(false);
            return;
        }

        const timeout = setTimeout(() => {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => setShowCursor(false), 500);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isInView, text, speed, delay, shouldReduceMotion]);

    return (
        <span ref={ref} className={cn(className)}>
            {displayedText}
            {cursor && showCursor && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 align-middle"
                />
            )}
        </span>
    );
}
