import Link from "next/link";
import { Nav } from "@/components/Nav";
import { PrivacyBadge } from "@/components/PrivacyBadge";
import { ThemeToggle } from "@/components/ThemeToggle";

type SiteHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function SiteHeader({ title, description, eyebrow }: SiteHeaderProps) {
  return (
    <header className="mb-5 flex flex-col gap-4 sm:mb-6">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            ParagraphSplitter
          </span>
          <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
            free · offline-capable
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <PrivacyBadge />
          <ThemeToggle />
        </div>
      </div>

      <Nav />

      <div className="max-w-2xl space-y-2">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
    </header>
  );
}
