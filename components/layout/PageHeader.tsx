import { Container } from "../ui/Section";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
    title: string;
    description?: string;
    kicker?: string;
    align?: "left" | "center";
};

export function PageHeader({
    title,
    description,
    kicker,
    align = "left",
}: PageHeaderProps) {
    return (
        <div className="border-b border-border bg-card/60">
            <Container
                className={cn(
                    "flex flex-col gap-4 py-10 md:py-14",
                    align === "center" && "items-center text-center",
                )}
            >
                {kicker ? <Badge variant="outline">{kicker}</Badge> : null}
                <div className="space-y-3 md:max-w-3xl">
                    <h1 className="text-3xl font-semibold leading-tight text-ink md:text-4xl">
                        {title}
                    </h1>
                    {description ? <p className="text-lg text-muted">{description}</p> : null}
                </div>
            </Container>
        </div>
    );
}
