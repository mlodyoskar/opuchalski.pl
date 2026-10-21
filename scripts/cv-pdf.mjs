// Prints public/cv.html to the PDF served at /cv.
// First run needs a browser: pnpm exec playwright install chromium
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const html = new URL('../public/cv.html', import.meta.url);
const pdf = fileURLToPath(
  new URL('../public/CV_Oskar_Puchalski.pdf', import.meta.url)
);

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(html.href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: pdf, preferCSSPageSize: true, printBackground: true });
} finally {
  await browser.close();
}

console.log(`Wrote ${pdf}`);
