import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME } from "@/lib/site";

type LegalPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function LegalPageShell({
  title,
  description,
  children,
}: LegalPageShellProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-24 pt-6 sm:px-6">
      <header className="mb-8 space-y-3">
        <Link
          href="/"
          className="inline-block text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          ← {SITE_NAME}
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>
      <main className="prose-legal flex-1 space-y-6 text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </main>
      <SiteFooter
        adSlotId="legal-footer"
        note={`${SITE_NAME} tools run locally in your browser. Ads (if accepted) are separate from your text.`}
      />
    </div>
  );
}
