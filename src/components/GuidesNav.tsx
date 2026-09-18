"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LONG_TAIL_NAV_ORDER, LONG_TAIL_PAGES } from "@/lib/longTailPages";
import { cn } from "@/lib/utils";

/** Secondary nav for long-tail SEO landings */
export function GuidesNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Guides"
      className="flex w-full flex-wrap items-center gap-x-1 gap-y-1 text-[12px] sm:text-[13px]"
    >
      <span className="mr-1 font-semibold text-muted-foreground">Guides:</span>
      {LONG_TAIL_NAV_ORDER.map((id, index) => {
        const page = LONG_TAIL_PAGES[id];
        const active = pathname === page.href;

        return (
          <span key={page.id} className="inline-flex items-center">
            {index > 0 && (
              <span className="mx-1 text-muted-foreground/40" aria-hidden>
                |
              </span>
            )}
            <Link
              href={page.href}
              className={cn(
                "rounded-md px-1.5 py-0.5 transition hover:text-primary",
                active
                  ? "font-semibold text-primary"
                  : "font-medium text-muted-foreground"
              )}
            >
              {page.navLabel}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
