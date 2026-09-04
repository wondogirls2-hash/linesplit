import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team.`,
  keywords: ["contact", SITE_NAME, "support"],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPageShell
      title="Contact"
      description="Questions, feedback, or AdSense / partnership notes — we read every message."
    >
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Email</h2>
        <p>
          Reach us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${SITE_NAME} inquiry`)}`}
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          Please do not paste sensitive documents into email unless necessary —
          our tools are designed so you never need to send text to us for
          conversion.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">What to include</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>The page or tool you were using</li>
          <li>A short description of the issue or idea</li>
          <li>Browser and device (if reporting a bug)</li>
        </ul>
      </section>
    </LegalPageShell>
  );
}
