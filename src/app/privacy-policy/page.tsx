import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/LegalPageShell";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles your text, cookies, and Google AdSense advertising.`,
  keywords: ["privacy policy", "cookies", "AdSense", SITE_NAME],
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description={`Last updated: September 4, 2026. This policy explains what ${SITE_NAME} does — and does not — collect.`}
    >
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          1. Your text stays in your browser
        </h2>
        <p>
          All text conversion tools on {SITE_NAME} (sentence splitting, remove
          line breaks, find &amp; replace, and related utilities) run{" "}
          <strong className="font-semibold text-foreground">
            100% in your browser
          </strong>
          . Your pasted content is not uploaded to our servers, not stored in a
          database, and not sent to an AI model. Closing or refreshing the page
          clears in-memory text unless you keep a copy yourself (for example via
          your clipboard or the optional Recent history stored only in your own
          browser&apos;s localStorage).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          2. Advertising is separate from your documents
        </h2>
        <p>
          {SITE_NAME} may display ads through{" "}
          <strong className="font-semibold text-foreground">
            Google AdSense
          </strong>{" "}
          to keep the tools free. AdSense can use cookies and device or
          connection information to deliver, measure, and (where allowed)
          personalize ads.
        </p>
        <p>
          <strong className="font-semibold text-foreground">
            Important distinction:
          </strong>{" "}
          advertising technology does{" "}
          <em className="not-italic font-medium text-foreground">not</em> receive
          the paragraphs or documents you paste into our tools. Ad cookies and
          device signals are unrelated to your text content. Declining ads does
          not reduce the functionality of the converters.
        </p>
        <p>
          Learn more in{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            className="font-medium text-primary underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s advertising / ads technologies policy
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          3. Cookies &amp; consent
        </h2>
        <p>
          On your first visit we show a consent banner. Choosing{" "}
          <strong className="font-semibold text-foreground">Accept</strong>{" "}
          allows AdSense scripts and ad cookies to load. Choosing{" "}
          <strong className="font-semibold text-foreground">Reject</strong>{" "}
          keeps the site fully usable without loading advertising scripts.
        </p>
        <p>
          We also store a small preference flag in localStorage so we remember
          your Accept/Reject choice. That flag is not your document text.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          4. Opt out of personalized ads
        </h2>
        <p>
          You can control Google ad personalization at any time via{" "}
          <a
            href="https://adssettings.google.com/"
            className="font-medium text-primary underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          . You may also use browser controls to block third-party cookies, or
          reject ads on this site through our banner (clear site data to see
          the banner again).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
        <p>
          Questions about this policy:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          . Site:{" "}
          <Link
            href="/"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {SITE_URL}
          </Link>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
