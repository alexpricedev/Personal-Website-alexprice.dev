/**
 * Generates OG images (1200x630) for all insight articles.
 *
 * Usage: bun run tools/generate-og-images.ts
 *
 * Reads frontmatter from content/insights/*.md, renders each as a branded
 * card using Puppeteer, and saves to public/insight-images/{slug}.png.
 * Also updates the article frontmatter with the image path if missing.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import puppeteer from "puppeteer-core";

const CONTENT_DIR = join(import.meta.dir, "../content/insights");
const OUTPUT_DIR = join(import.meta.dir, "../public/insight-images");

interface Article {
  slug: string;
  title: string;
  pillar: string;
  filePath: string;
}

function getArticles(): Article[] {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const filePath = join(CONTENT_DIR, file);
    const raw = readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(".md", ""),
      title: data.title ?? file.replace(".md", "").replace(/-/g, " "),
      pillar: (data.pillar ?? "insights").toLowerCase(),
      filePath,
    };
  });
}

function titleFontSize(title: string): number {
  const len = title.length;
  if (len <= 25) return 92;
  if (len <= 35) return 84;
  if (len <= 45) return 72;
  return 64;
}

function buildHTML(articles: Article[]): string {
  const cards = articles
    .map(
      (a) => `
    <div class="og" id="${a.slug}">
      <div class="og-accent"></div>
      <div class="og-pillar">${a.pillar}</div>
      <div class="og-title" style="font-size: ${titleFontSize(a.title)}px">${a.title}</div>
      <div class="og-footer">
        <span class="author">Alex Price</span>
        <span class="sep"></span>
        <span class="site">alexprice.dev</span>
      </div>
    </div>
  `
    )
    .join("\n");

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
      flex-direction: column;
      align-items: center;
      padding: 40px;
      gap: 40px;
    }

    .og {
      width: 1200px;
      height: 630px;
      background: #0C0C0C;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
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

    .og-pillar {
      position: absolute;
      top: 48px;
      left: 72px;
      font-family: 'Geist Mono', monospace;
      font-size: 24px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #C9A96E;
      background: rgba(201, 169, 110, 0.12);
      padding: 12px 28px;
      border-radius: 999px;
    }

    .og-title {
      position: absolute;
      left: 72px;
      right: 72px;
      bottom: 130px;
      font-family: 'Instrument Serif', serif;
      font-size: 92px;
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: #E8E3DD;
      font-weight: 400;
    }

    .og-footer {
      position: absolute;
      left: 72px;
      bottom: 48px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .og-footer .author {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 34px;
      font-weight: 600;
      color: #E8E3DD;
    }

    .og-footer .sep {
      width: 2px;
      height: 24px;
      background: rgba(232, 227, 221, 0.15);
    }

    .og-footer .site {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 32px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #C9A96E;
    }
  </style>
</head>
<body>
${cards}
</body>
</html>`;
}

function ensureImageFrontmatter(article: Article): void {
  const raw = readFileSync(article.filePath, "utf-8");
  const imagePath = `/insight-images/${article.slug}.png`;
  if (raw.includes(`image:`)) return;

  // Insert image field after the title line in frontmatter
  const updated = raw.replace(
    /^(---\n[\s\S]*?)(---)/m,
    `$1image: ${imagePath}\n$2`
  );
  writeFileSync(article.filePath, updated, "utf-8");
}

async function main() {
  const articles = getArticles();
  const html = buildHTML(articles);

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

  for (const article of articles) {
    const element = await page.$(`#${article.slug}`);
    if (!element) {
      process.stderr.write(`Could not find element for ${article.slug}\n`);
      continue;
    }

    const outputPath = join(OUTPUT_DIR, `${article.slug}.png`);
    await element.screenshot({ path: outputPath, type: "png" });
    process.stdout.write(`Generated: ${outputPath}\n`);

    ensureImageFrontmatter(article);
  }

  await browser.close();
  process.stdout.write(`\nDone! Generated ${articles.length} OG images.\n`);
}

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
