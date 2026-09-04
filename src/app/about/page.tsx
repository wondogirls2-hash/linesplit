import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: `Why ${SITE_NAME} exists — privacy-first text tools that never upload your documents.`,
  keywords: ["about", SITE_NAME, "privacy-first text tools"],
  path: "/about",
});

export default function AboutPage() {
  return (
    <LegalPageShell
      title={`About ${SITE_NAME}`}
      description="A small toolkit for formatting text without ChatGPT, accounts, or uploads."
    >
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Why we built this</h2>
        <p>
          Writers, students, and editors often need a simple job done well: split
          a paragraph into sentences, remove awkward line breaks from PDFs, or
          clean a list. Those jobs should not require pasting private drafts into
          a chat model or creating an account.
        </p>
        <p>
          {SITE_NAME} is a set of focused, client-side utilities — starting with a
          sentence splitter — that run entirely in your browser.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Our principles</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-foreground">Privacy first</strong>{" "}
            — your text never leaves this device for conversion.
          </li>
          <li>
            <strong className="font-semibold text-foreground">No AI rewrites</strong>{" "}
            — we change line breaks and formatting, not your wording.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Zero prompting</strong>{" "}
            — paste once; get a result without engineering a prompt.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Honest monetization</strong>{" "}
            — optional ads (with consent) fund the free tools and never touch
            your document content.
          </li>
        </ul>
      </section>
    </LegalPageShell>
  );
}
