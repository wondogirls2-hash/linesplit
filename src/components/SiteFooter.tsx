import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { FOOTER_LINKS, SITE_NAME } from "@/lib/site";
import { TOOL_NAV_ORDER, TOOLS } from "@/lib/toolsCatalog";

type SiteFooterProps = {
  adSlotId?: string;
  note?: string;
};

export function SiteFooter({
  adSlotId = "paragraphsplitter-footer",
  note = `${SITE_NAME} processes text entirely in your browser. No accounts. No analytics on your content. No AI model in the loop.`,
}: SiteFooterProps) {
  return (
    <footer className="mt-14 space-y-8 border-t border-border/60 pt-8">
      <AdSlot position="footer" slotId={adSlotId} />

      <div className="grid gap-8 sm:grid-cols-2">
        <nav aria-label="Tools" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Tools
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li>
              <Link
                href="/tools"
                className="font-medium text-muted-foreground transition hover:text-primary"
              >
                All tools
              </Link>
            </li>
            {TOOL_NAV_ORDER.map((id) => {
              const tool = TOOLS[id];
              return (
                <li key={tool.id}>
                  <Link
                    href={tool.href}
                    className="font-medium text-muted-foreground transition hover:text-primary"
                  >
                    {tool.navLabel}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav aria-label="Site" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Site
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-medium text-muted-foreground transition hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="text-center text-xs text-muted-foreground">{note}</p>
    </footer>
  );
}
