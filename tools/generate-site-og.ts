/**
 * Generates the default site OG image (1200x630) for alexprice.dev.
 *
 * Usage: bun run tools/generate-site-og.ts
 *
 * Renders a branded card with the site's current messaging using Puppeteer,
 * saves to public/og-image.png.
 */

import { join } from "node:path";
import puppeteer from "puppeteer-core";

const OUTPUT_PATH = join(import.meta.dir, "../public/og-image.png");

function buildHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    .og {
      width: 1200px;
      height: 630px;
      background: #0C0C0C;
      position: relative;
      overflow: hidden;
    }

    .og::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 50% at 30% 60%, rgba(201, 169, 110, 0.04) 0%, transparent 70%);
    }

    .og-accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(180deg, #C9A96E 0%, transparent 80%);
      opacity: 0.6;
    }

    .og-label {
      position: absolute;
      top: 48px;
      left: 72px;
      font-family: 'Geist Mono', monospace;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #C9A96E;
      background: rgba(201, 169, 110, 0.12);
      padding: 10px 24px;
      border-radius: 999px;
    }

    .og-name {
      position: absolute;
      top: 130px;
      left: 72px;
      right: 72px;
      font-family: 'Instrument Serif', serif;
      font-size: 96px;
      line-height: 1.0;
      letter-spacing: -0.03em;
      color: #E8E3DD;
      font-weight: 400;
    }

    .og-tagline {
      position: absolute;
      top: 250px;
      left: 72px;
      right: 200px;
      font-family: 'Instrument Sans', sans-serif;
      font-size: 36px;
      line-height: 1.35;
      color: #A8A29E;
      font-weight: 400;
    }

    .og-tagline em {
      color: #E8E3DD;
      font-style: normal;
      font-weight: 600;
    }

    .og-services {
      position: absolute;
      bottom: 100px;
      left: 72px;
      display: flex;
      gap: 16px;
    }

    .og-services span {
      font-family: 'Geist Mono', monospace;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #5C5955;
      padding: 8px 20px;
      border: 1px solid rgba(232, 227, 221, 0.08);
      border-radius: 999px;
    }

    .og-footer {
      position: absolute;
      left: 72px;
      bottom: 44px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .og-footer .site {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #C9A96E;
    }

    .og-footer .sep {
      width: 2px;
      height: 20px;
      background: rgba(232, 227, 221, 0.15);
    }

    .og-footer .price {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 26px;
      font-weight: 500;
      color: #E8E3DD;
    }
  </style>
</head>
<body>
  <div class="og" id="site-og">
    <div class="og-accent"></div>
    <div class="og-label">Technical Consulting</div>
    <div class="og-name">Alex Price</div>
    <div class="og-tagline">
      Senior technical help, <em>by the hour.</em><br>
      Architecture, security &amp; honest guidance.
    </div>
    <div class="og-services">
      <span>Architecture</span>
      <span>Security</span>
      <span>Code Review</span>
      <span>AI Guidance</span>
    </div>
    <div class="og-footer">
      <span class="site">alexprice.dev</span>
      <span class="sep"></span>
      <span class="price">From £75 / session</span>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  const html = buildHTML();

  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 800, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // Wait for Google Fonts to load
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        const timeout = setTimeout(resolve, 8000);
        document.fonts.ready.then(() => {
          clearTimeout(timeout);
          resolve();
        });
      })
  );
  // Extra pause for font rendering
  await new Promise((r) => setTimeout(r, 1000));

  const element = await page.$("#site-og");
  if (!element) {
    process.stderr.write("Could not find OG element\n");
    process.exit(1);
  }

  await element.screenshot({ path: OUTPUT_PATH, type: "png" });
  process.stdout.write(`Generated: ${OUTPUT_PATH}\n`);

  await browser.close();
}

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
