import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-24 pt-16 sm:px-6">
      <main className="flex-1 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          404
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          That URL does not exist. Try the homepage tools or browse related
          utilities.
        </p>
        <p>
          <Link
            href="/"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            ← Back to ParagraphSplitter
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
