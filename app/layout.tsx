import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Utilify — Free Online Developer & Text Utility Tools",
  description:
    "Fast, private, zero-server utility tools: JSON formatter, Base64, URL encoder, password generator, color palette, CSS shadow and more. Runs entirely in your browser.",
  openGraph: {
    title: "Utilify — All-in-One Online Utility Tools",
    description:
      "JSON, Base64, URL, password, palette, CSS shadow — all in one fast browser-based dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5549712635720663"
          crossOrigin="anonymous"
        />
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
