import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const base = process.env.SEO_QA_BASE_URL ?? "http://127.0.0.1:3100";
const executablePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const pages = ["/", "/agency-crm", "/client-portal", "/project-management-for-agencies", "/agency-invoicing", "/client-management-software", "/agency-operations", "/compare/clickup", "/pricing", "/blog/what-is-agency-crm"];
const viewports = [
  { width: 320, height: 800 }, { width: 375, height: 812 }, { width: 390, height: 844 },
  { width: 768, height: 1024 }, { width: 1024, height: 900 }, { width: 1440, height: 1000 },
];

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const tab = await browser.newPage();
const results = [];
const errors = [];
for (const viewport of viewports) {
  await tab.setViewport({ ...viewport, deviceScaleFactor: 1 });
  for (const pagePath of pages) {
    const response = await tab.goto(`${base}${pagePath}`, { waitUntil: "networkidle0", timeout: 30_000 });
    const metrics = await tab.evaluate(() => {
      const h1 = document.querySelector("h1");
      const h1Rect = h1?.getBoundingClientRect();
      const main = document.querySelector("main");
      const mobileButton = document.querySelector('button[aria-label="Toggle menu"]');
      const styles = mobileButton ? getComputedStyle(mobileButton) : null;
      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        h1Count: document.querySelectorAll("h1").length,
        h1Visible: Boolean(h1Rect && h1Rect.width > 0 && h1Rect.height > 0),
        h1Fits: Boolean(h1Rect && h1Rect.left >= -1 && h1Rect.right <= window.innerWidth + 1),
        mainTextLength: main?.innerText.length ?? 0,
        mobileButtonVisible: styles ? styles.display !== "none" && styles.visibility !== "hidden" : false,
      };
    });
    const item = { page: pagePath, viewport: `${viewport.width}x${viewport.height}`, status: response?.status() ?? 0, ...metrics };
    results.push(item);
    if (item.status !== 200) errors.push(`${item.page} at ${item.viewport}: HTTP ${item.status}`);
    if (item.documentWidth > item.viewportWidth + 1) errors.push(`${item.page} at ${item.viewport}: horizontal overflow ${item.documentWidth}px > ${item.viewportWidth}px`);
    if (item.h1Count !== 1 || !item.h1Visible || !item.h1Fits) errors.push(`${item.page} at ${item.viewport}: invalid H1 layout`);
    if (item.mainTextLength < 300) errors.push(`${item.page} at ${item.viewport}: main content appears missing`);
    if (viewport.width <= 768 && !item.mobileButtonVisible) errors.push(`${item.page} at ${item.viewport}: mobile navigation control is not visible`);
  }
}
const screenshotDir = path.join(os.tmpdir(), "trysarion-seo-qa");
fs.mkdirSync(screenshotDir, { recursive: true });
await tab.setViewport({ width: 320, height: 800, deviceScaleFactor: 1 });
await tab.goto(`${base}/agency-crm`, { waitUntil: "networkidle0" });
await tab.screenshot({ path: path.join(screenshotDir, "agency-crm-320.png"), fullPage: true });
await tab.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await tab.goto(`${base}/compare/clickup`, { waitUntil: "networkidle0" });
await tab.screenshot({ path: path.join(screenshotDir, "compare-clickup-1440.png"), fullPage: true });
await browser.close();

console.log(JSON.stringify({ checks: results.length, pages: pages.length, viewports: viewports.map(v => v.width), screenshots: screenshotDir, errors }, null, 2));
if (errors.length) process.exitCode = 1;
