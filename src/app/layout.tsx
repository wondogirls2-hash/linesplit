import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Sentence splitter online`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Free privacy-first text tools: sentence splitter, remove line breaks, find & replace, and more. Runs 100% in your browser.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
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
    images: [OG_IMAGE_PATH],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
