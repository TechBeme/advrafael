import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProseProps = {
    children: ReactNode;
    className?: string;
};

export function Prose({ children, className }: ProseProps) {
    return (
        <div
            className={cn(
                "prose prose-slate max-w-none",
                "prose-headings:font-display prose-headings:text-ink",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:text-accent",
                "prose-strong:text-ink",
                "prose-blockquote:border-l-primary prose-blockquote:bg-highlight/60 prose-blockquote:px-4 prose-blockquote:text-ink",
                "prose-code:rounded-md prose-code:bg-highlight/70 prose-code:px-1.5 prose-code:py-0.5",
                "prose-img:rounded-lg prose-img:shadow-sm",
                className,
            )}
        >
            {children}
        </div>
    );
}
