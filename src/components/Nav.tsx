"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOL_NAV_ORDER, TOOLS } from "@/lib/toolsCatalog";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Tools"
      className="flex w-full flex-wrap items-center gap-x-1 gap-y-1 text-[12px] sm:text-[13px]"
    >
      <span className="mr-1 font-semibold text-muted-foreground">Tools:</span>
      {TOOL_NAV_ORDER.map((id, index) => {
        const tool = TOOLS[id];
        const active =
          tool.href === "/"
            ? pathname === "/"
            : pathname === tool.href || pathname.startsWith(`${tool.href}/`);

        return (
          <span key={tool.id} className="inline-flex items-center">
            {index > 0 && (
              <span className="mx-1 text-muted-foreground/40" aria-hidden>
                |
              </span>
            )}
            <Link
              href={tool.href}
              className={cn(
                "rounded-md px-1.5 py-0.5 transition hover:text-primary",
                active
                  ? "font-semibold text-primary"
                  : "font-medium text-muted-foreground"
              )}
            >
              {tool.navLabel}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
