import type React from "react";

import { Footer } from "./footer";
import { Nav } from "./nav";

type LayoutProps = {
  title: string;
  description?: string;
  name: string;
  children: React.ReactNode;
};

export function Layout({ title, description, name, children }: LayoutProps) {
  const fullTitle =
    title === "Home" ? "Alex Price – Fractional CTO" : `${title} – Alex Price`;
  const metaDescription =
    description ||
    "Fractional CTO for Series A startups. Senior technical leadership without the cost and risk of a full-time hire.";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription} />
        <title>{fullTitle}</title>
        <link rel="stylesheet" href="/assets/main.css" />
      </head>
      <body data-page={name}>
        <header className="site-header">
          <div className="container">
            <Nav page={name} />
          </div>
        </header>
        <main>{children}</main>
        <Footer />
        <script type="module" src="/assets/main.js" />
      </body>
    </html>
  );
}
