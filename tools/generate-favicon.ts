/**
 * Generates favicons from the glasses SVG brand mark.
 *
 * Usage: bun run tools/generate-favicon.ts
 *
 * Renders the nav glasses icon at multiple sizes using Puppeteer
 * and saves favicon.ico, favicon-16x16.png, and favicon-32x32.png
 * to the public/ directory.
 */

import { join } from "node:path";
import puppeteer from "puppeteer-core";

const OUTPUT_DIR = join(import.meta.dir, "../public");

const GLASSES_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#D06A52" d="m21.948 11.684l-2-6A.997.997 0 0 0 19 5h-3v2h2.279l1.334 4H15c-1.103 0-2 .897-2 2h-2c0-1.103-.897-2-2-2H4.387l1.334-4H8V5H5a.998.998 0 0 0-.948.684l-2 6l.012.004A.928.928 0 0 0 2 12v4c0 1.654 1.346 3 3 3h3c1.654 0 3-1.346 3-3v-1h2v1c0 1.654 1.346 3 3 3h3c1.654 0 3-1.346 3-3v-4a.964.964 0 0 0-.063-.313l.011-.003zM9 16c0 .551-.448 1-1 1H5c-.552 0-1-.449-1-1v-3h5v3zm11 0c0 .551-.448 1-1 1h-3c-.552 0-1-.449-1-1v-3h5v3z"/>
</svg>`;

function buildHTML(size: number): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:transparent;">
  <div id="icon" style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;background:#131210;border-radius:${Math.round(size * 0.15)}px;">
    ${GLASSES_SVG.replace('viewBox="0 0 24 24"', `viewBox="0 0 24 24" width="${Math.round(size * 0.7)}" height="${Math.round(size * 0.7)}"`)}
  </div>
</body>
</html>`;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const sizes = [
    { size: 16, output: "favicon-16x16.png" },
    { size: 32, output: "favicon-32x32.png" },
    { size: 48, output: "favicon.ico" },
  ];

  for (const { size, output } of sizes) {
    const page = await browser.newPage();
    await page.setViewport({
      width: size,
      height: size,
      deviceScaleFactor: 1,
    });
    await page.setContent(buildHTML(size), {
      waitUntil: "domcontentloaded",
    });

    const element = await page.$("#icon");
    if (!element) {
      process.stderr.write(`Could not find icon element for ${size}px\n`);
      continue;
    }

    const outputPath = join(OUTPUT_DIR, output);
    await element.screenshot({
      path: outputPath,
      type: "png",
      omitBackground: true,
    });

    process.stdout.write(`Generated: ${output} (${size}x${size})\n`);
    await page.close();
  }

  await browser.close();
  process.stdout.write("\nDone! Favicons generated in public/\n");
}

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
