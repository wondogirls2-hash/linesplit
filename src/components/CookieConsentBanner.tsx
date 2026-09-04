"use client";

import Link from "next/link";
import { useAdConsent } from "@/components/AdConsentProvider";
import { Button } from "@/components/ui/button";

export function CookieConsentBanner() {
  const { ready, status, accept, reject } = useAdConsent();

  if (!ready || status !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and advertising consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-card/95 p-4 shadow-soft backdrop-blur-md sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl space-y-1.5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Cookies &amp; ads</p>
          <p>
            Your pasted text always stays in your browser. Separately, if you
            accept, we may show Google AdSense ads that use cookies or device
            info for delivery and measurement — never your document content.{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={reject}>
            Reject
          </Button>
          <Button type="button" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
