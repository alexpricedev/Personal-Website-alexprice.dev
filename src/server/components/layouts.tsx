import { SITE_URL } from "@server/config";
import type React from "react";
import { Footer } from "./footer";
import { Nav } from "./nav";

const DEFAULT_OG_IMAGE = `${SITE_URL}/headshot2.webp`;

type LayoutProps = {
  title: string;
  description?: string;
  name: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  children: React.ReactNode;
};

export function Layout({
  title,
  description,
  name,
  path = "/",
  ogImage,
  ogType = "website",
  publishedTime,
  children,
}: LayoutProps) {
  const fullTitle =
    title === "Home" ? "Alex Price – Fractional CTO" : `${title} – Alex Price`;
  const metaDescription =
    description ||
    "Fractional CTO for Series A startups. Senior technical leadership without the cost and risk of a full-time hire.";
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImageUrl = ogImage ? `${SITE_URL}${ogImage}` : DEFAULT_OG_IMAGE;

  const jsonLd =
    ogType === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: metaDescription,
          image: ogImageUrl,
          datePublished: publishedTime,
          author: {
            "@type": "Person",
            name: "Alex Price",
            url: SITE_URL,
          },
          publisher: {
            "@type": "Person",
            name: "Alex Price",
            url: SITE_URL,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Alex Price",
          url: SITE_URL,
          jobTitle: "Fractional CTO",
          description: metaDescription,
          image: DEFAULT_OG_IMAGE,
          sameAs: ["https://linkedin.com/in/alexpricecto"],
        };

  return (
    <html lang="en" data-theme="sunset">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription} />
        <title>{fullTitle}</title>

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Alex Price" />
        <meta property="og:type" content={ogType} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:locale" content="en_GB" />
        {ogType === "article" && publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="stylesheet" href="/assets/main.css" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-base-100" data-page={name}>
        <Nav page={name} />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
        <script type="module" src="/assets/main.js" />
      </body>
    </html>
  );
}
