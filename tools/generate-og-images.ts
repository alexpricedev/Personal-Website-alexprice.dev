/**
 * Generates OG images (1200x630) for all insight articles.
 *
 * Usage: bun run tools/generate-og-images.ts
 *
 * Reads frontmatter from content/writing/*.md, renders each as a branded
 * card using Puppeteer, and saves to public/og/{slug}.png.
 * Also updates the article frontmatter with the image path if missing.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import puppeteer from "puppeteer-core";

const CONTENT_DIR = join(import.meta.dir, "../content/writing");
const OUTPUT_DIR = join(import.meta.dir, "../public/og");

interface Article {
  slug: string;
  title: string;
  pillar: string;
  description: string;
  filePath: string;
}

// Map pillars to accent variations for visual differentiation
const pillarAccents: Record<string, { color: string; bg: string }> = {
  startups: { color: "#BF5540", bg: "rgba(191, 85, 64, 0.08)" },
  leadership: { color: "#8B6E4E", bg: "rgba(139, 110, 78, 0.08)" },
  fundraising: { color: "#7B5E3B", bg: "rgba(123, 94, 59, 0.08)" },
  engineering: { color: "#5E7A5E", bg: "rgba(94, 122, 94, 0.08)" },
  ai: { color: "#6B6080", bg: "rgba(107, 96, 128, 0.08)" },
  default: { color: "#BF5540", bg: "rgba(191, 85, 64, 0.08)" },
};

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
      description: data.description ?? "",
      filePath,
    };
  });
}

function titleFontSize(title: string): number {
  const len = title.length;
  if (len <= 20) return 80;
  if (len <= 30) return 72;
  if (len <= 40) return 64;
  if (len <= 55) return 56;
  return 48;
}

function buildHTML(articles: Article[]): string {
  const cards = articles
    .map((a) => {
      const accent =
        pillarAccents[a.pillar] ?? pillarAccents["default"];
      const fontSize = titleFontSize(a.title);

      return `
    <div class="og" id="${a.slug}">
      <!-- Decorative accent elements -->
      <div class="og-accent-top" style="background: linear-gradient(90deg, ${accent.color} 0%, transparent 60%);"></div>
      <div class="og-accent-mark" style="color: ${accent.color};">\u201C</div>

      <div class="og-pillar" style="color: ${accent.color}; background: ${accent.bg};">${a.pillar}</div>
      <div class="og-title" style="font-size: ${fontSize}px">${a.title}</div>
      <div class="og-footer">
        <div class="og-footer-left">
          <span class="author">Alex Price</span>
          <span class="role">The Backseat CTO</span>
        </div>
        <span class="site">alexprice.dev</span>
      </div>
    </div>
  `;
    })
    .join("\n");

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
      flex-direction: column;
      align-items: center;
      padding: 40px;
      gap: 40px;
    }

    .og {
      width: 1200px;
      height: 630px;
      background: #F4F0E8;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      padding: 48px 72px;
    }

    .og-accent-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
    }

    /* Large decorative opening quote */
    .og-accent-mark {
      position: absolute;
      top: -30px;
      right: 40px;
      font-family: 'Lora', serif;
      font-size: 400px;
      font-weight: 400;
      opacity: 0.05;
      line-height: 1;
      pointer-events: none;
    }

    .og-pillar {
      font-family: 'Commit Mono', monospace;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 8px 20px;
      border-radius: 999px;
      align-self: flex-start;
      flex-shrink: 0;
    }

    .og-title {
      flex: 1;
      display: flex;
      align-items: center;
      padding-right: 48px;
      font-family: 'General Sans', sans-serif;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #1A1714;
      font-weight: 700;
    }

    .og-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 24px;
      border-top: 1px solid rgba(26, 23, 20, 0.1);
      flex-shrink: 0;
    }

    .og-footer-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .og-footer .author {
      font-family: 'General Sans', sans-serif;
      font-size: 22px;
      font-weight: 600;
      color: #1A1714;
    }

    .og-footer .role {
      font-family: 'Lora', serif;
      font-size: 18px;
      font-style: italic;
      color: #8A837A;
    }

    .og-footer .site {
      font-family: 'Commit Mono', monospace;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #8A837A;
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
  const imagePath = `/og/${article.slug}.png`;
  if (raw.includes(`image:`)) return;

  // Insert image field after the title line in frontmatter
  const updated = raw.replace(
    /^(---\n[\s\S]*?)(---)/m,
    `$1image: ${imagePath}\n$2`,
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
      }),
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
