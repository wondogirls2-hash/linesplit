import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { FOOTER_LINKS, SITE_NAME } from "@/lib/site";

type SiteFooterProps = {
  adSlotId?: string;
  note?: string;
};

export function SiteFooter({
  adSlotId = "paragraphsplitter-footer",
  note = `${SITE_NAME} processes text entirely in your browser. No accounts. No analytics on your content. No AI model in the loop.`,
}: SiteFooterProps) {
  return (
    <footer className="mt-14 space-y-6 border-t border-border/60 pt-8">
      <AdSlot position="footer" slotId={adSlotId} />
      <nav
        aria-label="Site"
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
      >
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium text-muted-foreground transition hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="text-center text-xs text-muted-foreground">{note}</p>
    </footer>
  );
}
