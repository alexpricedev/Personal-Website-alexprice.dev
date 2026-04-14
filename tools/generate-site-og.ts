/**
 * Generates OG images (1200x630) for the site.
 *
 * Usage:
 *   bun run tools/generate-site-og.ts              → generates default site OG
 *   bun run tools/generate-site-og.ts vibe-code-audit → generates audit page OG
 *   bun run tools/generate-site-og.ts common-issues   → generates common issues OG
 *   bun run tools/generate-site-og.ts all             → generates all variants
 *
 * Renders a branded card using Puppeteer, saves to public/.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import puppeteer from "puppeteer-core";

interface OGVariant {
  outputPath: string;
  label: string;
  headline: string;
  tagline: string;
  cta: string;
  showHeadshot: boolean;
}

const variants: Record<string, OGVariant> = {
  default: {
    outputPath: "public/og-image.png",
    label: "Technical Consulting",
    headline: "The Backseat CTO",
    tagline:
      "Senior technical help, <em>by the hour.</em> Architecture, security &amp; honest guidance for founders.",
    cta: "From £75 / live session",
    showHeadshot: true,
  },
  "vibe-code-audit": {
    outputPath: "public/og-vibe-code-audit.png",
    label: "Vibe Code Audit",
    headline: "You built it with AI.<br>I'll check it.",
    tagline:
      "Security, architecture, performance &amp; code quality — <em>reviewed and reported.</em>",
    cta: "£199 flat fee",
    showHeadshot: true,
  },
  "common-issues": {
    outputPath: "public/og-common-issues.png",
    label: "Free Assessment",
    headline: "15 things AI gets wrong",
    tagline:
      "The hidden issues in your AI-generated codebase. <em>Find them before your users do.</em>",
    cta: "Free self-assessment",
    showHeadshot: false,
  },
};

function getHeadshotBase64(): string {
  const headshotPath = join(import.meta.dir, "../public/headshot.webp");
  const buffer = readFileSync(headshotPath);
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

function buildHTML(variant: OGVariant, headshotDataUrl: string): string {
  const headshotHTML = variant.showHeadshot
    ? `<div class="og-headshot"><img src="${headshotDataUrl}" alt="" /></div>`
    : "";

  const contentRightPad = variant.showHeadshot ? "300px" : "72px";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://api.fontshare.com">
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700,800&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Commit+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #888;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    .og {
      width: 1200px;
      height: 630px;
      background: #F4F0E8;
      position: relative;
      overflow: hidden;
    }

    /* Warm accent strip at top */
    .og::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #BF5540 0%, #D06A52 40%, transparent 100%);
    }

    /* Subtle texture overlay */
    .og::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 85% 15%, rgba(191, 85, 64, 0.06) 0%, transparent 50%),
                  radial-gradient(circle at 10% 85%, rgba(191, 85, 64, 0.03) 0%, transparent 40%);
      pointer-events: none;
    }

    .og-content {
      position: absolute;
      top: 40px;
      left: 72px;
      right: ${contentRightPad};
      bottom: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0;
      z-index: 1;
    }

    .og-label {
      font-family: 'Commit Mono', monospace;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #BF5540;
      margin-bottom: 16px;
    }

    .og-headline {
      font-family: 'General Sans', sans-serif;
      font-size: 56px;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: #1A1714;
      font-weight: 700;
    }

    .og-divider {
      width: 60px;
      height: 3px;
      background: #BF5540;
      border-radius: 2px;
      margin: 24px 0;
    }

    .og-tagline {
      font-family: 'Lora', serif;
      font-size: 26px;
      line-height: 1.5;
      color: #4A4540;
      font-weight: 400;
      z-index: 1;
    }

    .og-tagline em {
      color: #1A1714;
      font-style: italic;
      font-weight: 600;
    }

    .og-footer {
      position: absolute;
      left: 72px;
      right: 72px;
      bottom: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1;
    }

    .og-footer .site {
      font-family: 'Commit Mono', monospace;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #8A837A;
    }

    .og-footer .cta {
      font-family: 'General Sans', sans-serif;
      font-size: 22px;
      font-weight: 600;
      color: #FFFFFF;
      background: #BF5540;
      padding: 12px 32px;
      border-radius: 999px;
    }

    .og-headshot {
      position: absolute;
      right: 48px;
      top: 50%;
      transform: translateY(-50%);
      width: 210px;
      height: 210px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid rgba(191, 85, 64, 0.2);
      z-index: 1;
    }

    .og-headshot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

  </style>
</head>
<body>
  <div class="og" id="site-og">
    <div class="og-content">
      <div class="og-label">${variant.label}</div>
      <div class="og-headline">${variant.headline}</div>
      <div class="og-divider"></div>
      <div class="og-tagline">${variant.tagline}</div>
    </div>
    ${headshotHTML}
    <div class="og-footer">
      <span class="site">alexprice.dev</span>
      <span class="cta">${variant.cta}</span>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  const arg = process.argv[2] ?? "default";
  const headshotDataUrl = getHeadshotBase64();

  const variantsToGenerate =
    arg === "all" ? Object.keys(variants) : [arg];

  for (const key of variantsToGenerate) {
    const variant = variants[key];
    if (!variant) {
      process.stderr.write(
        `Unknown variant "${key}". Available: ${Object.keys(variants).join(", ")}, all\n`,
      );
      process.exit(1);
    }

    const html = buildHTML(variant, headshotDataUrl);
    const outputPath = join(import.meta.dir, "..", variant.outputPath);

    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 800, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // Wait for fonts to load
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          const timeout = setTimeout(resolve, 8000);
          document.fonts.ready.then(() => {
            clearTimeout(timeout);
            resolve();
          });
        }),
    );
    await new Promise((r) => setTimeout(r, 1000));

    const element = await page.$("#site-og");
    if (!element) {
      process.stderr.write("Could not find OG element\n");
      process.exit(1);
    }

    await element.screenshot({ path: outputPath, type: "png" });
    process.stdout.write(`Generated: ${outputPath}\n`);

    await browser.close();
  }
}

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
