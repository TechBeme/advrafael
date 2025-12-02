import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AlertTone = "info" | "success" | "warning" | "danger";

const toneClasses: Record<AlertTone, string> = {
    info: "border-primary/30 bg-highlight text-ink",
    success: "border-success/30 bg-success/5 text-success",
    warning: "border-warning/40 bg-warning/5 text-warning",
    danger: "border-danger/30 bg-danger/5 text-danger",
};

type AlertProps = {
    tone?: AlertTone;
    title?: string;
    children: ReactNode;
    className?: string;
};

export function Alert({ tone = "info", title, children, className }: AlertProps) {
    const liveRole = tone === "danger" || tone === "warning" ? "alert" : "status";

    return (
        <div
            className={cn(
                "rounded-lg border px-4 py-3 text-sm shadow-sm",
                toneClasses[tone],
                className,
            )}
            role={liveRole}
        >
            {title ? <p className="font-semibold">{title}</p> : null}
            <div className={title ? "mt-1 space-y-1" : "space-y-1"}>{children}</div>
        </div>
    );
}
