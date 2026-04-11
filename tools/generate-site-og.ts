/**
 * Generates OG images (1200x630) for the site.
 *
 * Usage:
 *   bun run tools/generate-site-og.ts              → generates default site OG
 *   bun run tools/generate-site-og.ts vibe-code-audit → generates audit page OG
 *   bun run tools/generate-site-og.ts common-issues   → generates common issues OG
 *
 * Renders a branded card using Puppeteer, saves to public/.
 */

import { join } from "node:path";
import puppeteer from "puppeteer-core";

interface OGVariant {
  outputPath: string;
  label: string;
  title: string;
  tagline: string;
  services: string[];
  footerLeft: string;
  footerRight: string;
}

const variants: Record<string, OGVariant> = {
  default: {
    outputPath: "public/og-image.png",
    label: "Technical Consulting",
    title: "Alex Price",
    tagline:
      'Senior technical help, <em>by the hour.</em><br>Architecture, security &amp; honest guidance.',
    services: ["Architecture", "Security", "Code Review", "AI Guidance"],
    footerLeft: "alexprice.dev",
    footerRight: "From £75 / session",
  },
  "vibe-code-audit": {
    outputPath: "public/og-vibe-code-audit.png",
    label: "Vibe Code Audit",
    title: "Alex Price",
    tagline:
      'You built it with AI.<br>I\'ll tell you if it\'s <em>going to hold up.</em>',
    services: ["Security", "Architecture", "Performance", "Code Quality"],
    footerLeft: "alexprice.dev",
    footerRight: "£150 flat fee",
  },
  "common-issues": {
    outputPath: "public/og-common-issues.png",
    label: "Free Resource",
    title: "Alex Price",
    tagline:
      '10 things AI tools <em>get wrong</em><br>in your codebase.',
    services: ["Security", "Architecture", "Performance", "Reliability"],
    footerLeft: "alexprice.dev",
    footerRight: "Free self-assessment",
  },
};

function buildHTML(variant: OGVariant): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://api.fontshare.com">
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet">
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
      background: #131210;
      position: relative;
      overflow: hidden;
    }

    .og-accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(180deg, #D06A52 0%, transparent 80%);
      opacity: 0.6;
    }

    .og-label {
      position: absolute;
      top: 48px;
      left: 72px;
      font-family: 'Commit Mono', monospace;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #D06A52;
      background: rgba(208, 106, 82, 0.12);
      padding: 10px 24px;
      border-radius: 999px;
    }

    .og-name {
      position: absolute;
      top: 130px;
      left: 72px;
      right: 72px;
      font-family: 'General Sans', sans-serif;
      font-size: 96px;
      line-height: 1.0;
      letter-spacing: -0.03em;
      color: #EDE8DE;
      font-weight: 700;
    }

    .og-tagline {
      position: absolute;
      top: 250px;
      left: 72px;
      right: 200px;
      font-family: 'Lora', serif;
      font-size: 32px;
      line-height: 1.4;
      color: #B5AFA7;
      font-weight: 400;
    }

    .og-tagline em {
      color: #EDE8DE;
      font-style: italic;
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
      font-family: 'Commit Mono', monospace;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #6B6560;
      padding: 8px 20px;
      border: 1px solid rgba(237, 232, 222, 0.12);
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
      font-family: 'General Sans', sans-serif;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #D06A52;
    }

    .og-footer .sep {
      width: 2px;
      height: 20px;
      background: rgba(237, 232, 222, 0.12);
    }

    .og-footer .price {
      font-family: 'General Sans', sans-serif;
      font-size: 26px;
      font-weight: 500;
      color: #EDE8DE;
    }
  </style>
</head>
<body>
  <div class="og" id="site-og">
    <div class="og-accent"></div>
    <div class="og-label">${variant.label}</div>
    <div class="og-name">${variant.title}</div>
    <div class="og-tagline">${variant.tagline}</div>
    <div class="og-services">
      ${variant.services.map((s) => `<span>${s}</span>`).join("\n      ")}
    </div>
    <div class="og-footer">
      <span class="site">${variant.footerLeft}</span>
      <span class="sep"></span>
      <span class="price">${variant.footerRight}</span>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  const arg = process.argv[2] ?? "default";
  const variant = variants[arg];
  if (!variant) {
    process.stderr.write(
      `Unknown variant "${arg}". Available: ${Object.keys(variants).join(", ")}\n`,
    );
    process.exit(1);
  }

  const html = buildHTML(variant);
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

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
