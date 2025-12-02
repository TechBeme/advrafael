import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

type ContainerProps = HTMLAttributes<HTMLElement> & {
    as?: keyof HTMLElementTagNameMap;
};

export function Container({ as: Component = "div", className, ...props }: ContainerProps) {
    const Tag = Component as keyof HTMLElementTagNameMap;
    return <Tag className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)} {...props} />;
}

type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
    return <section className={cn("py-14 md:py-20", className)} {...props} />;
}

type SectionHeaderProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    actions?: ReactNode;
};

export function SectionHeader({
    eyebrow,
    title,
    description,
    align = "left",
    actions,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
                align === "center" && "items-center text-center",
            )}
        >
            <div className={cn("space-y-3", align === "center" && "md:mx-auto md:max-w-3xl")}>
                {eyebrow ? <Badge variant="outline">{eyebrow}</Badge> : null}
                <div className="space-y-3">
                    <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl">
                        {title}
                    </h2>
                    {description ? <p className="text-lg text-muted">{description}</p> : null}
                </div>
            </div>
            {actions ? <div className="flex gap-3">{actions}</div> : null}
        </div>
    );
}
