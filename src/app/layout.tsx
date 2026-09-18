import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AdConsentProvider } from "@/components/AdConsentProvider";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import {
  ADSENSE_CLIENT_ID,
  GA_MEASUREMENT_ID,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  title: {
    default:
      "Text & Paragraph Splitter | Split Text by Sentences, Length, or Lines",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Free online text splitter. Break long essays, articles, and AI prompts into readable paragraphs, sentences, character counts, or custom delimiters instantly.",
  keywords: [
    "paragraph splitter",
    "text splitter",
    "split text by line",
    "split sentences online",
    "bulk text chunker",
    "paragraph break generator",
  ],
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: `${SITE_URL}/`,
    title: "Online Paragraph & Text Splitter - Fast, Free & Private",
    description:
      "Split large text chunks by characters, lines, or sentences. Perfect for copywriters, bloggers, and LLM prompt formatting.",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Paragraph & Text Splitter - Fast, Free & Private",
    description:
      "Split large text chunks by characters, lines, or sentences. Perfect for copywriters, bloggers, and LLM prompt formatting.",
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* AdSense site verification / ads loader — required in <head> on every page */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
        {/* Google Analytics (gtag.js) — must be in HTML for GA property verification */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`.trim(),
          }}
        />
        {/* Site identity JSON-LD — reinforces preferred host vs foreign canonical confusion */}
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: SITE_NAME,
              url: `${SITE_URL}/`,
              inLanguage: "en",
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                url: `${SITE_URL}/`,
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AdConsentProvider>
            {children}
            <CookieConsentBanner />
            <Toaster position="bottom-center" richColors closeButton />
            <Analytics />
          </AdConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

