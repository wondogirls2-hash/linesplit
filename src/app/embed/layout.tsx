import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Embed — ${SITE_NAME}`,
  description: `Embeddable paragraph splitter widget from ${SITE_NAME}.`,
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/embed`,
  },
};

/** Minimal wrapper for the iframe widget (inherits root html/body). */
export default function EmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
