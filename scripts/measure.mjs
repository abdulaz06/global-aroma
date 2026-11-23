import { preview } from "astro";
import { chromium } from "playwright";

// Local lab measurements. Hosting, devices and real-user traffic will differ.
const server = await preview({
  server: { host: "127.0.0.1", port: 0 },
  logLevel: "silent",
});
try {
  const browser = await chromium.launch();
  try {
    for (let run = 1; run <= 3; run++) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      await session.send("Network.enable");
      await session.send("Network.setCacheDisabled", { cacheDisabled: true });
      await session.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 1600000 / 8,
        uploadThroughput: 750000 / 8,
      });
      await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await page.addInitScript(() => {
        window.sample = { lcpMs: 0, cls: 0 };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.sample.lcpMs = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.sample.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto("http://127.0.0.1:" + server.port, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      const result = await page.evaluate(() => {
        const requests = [
          ...performance.getEntriesByType("navigation"),
          ...performance.getEntriesByType("resource"),
        ];
        return {
          ...window.sample,
          transferBytes: requests.reduce((total, r) => total + r.transferSize, 0),
          hero: new URL(document.querySelector(".hero-photo img").currentSrc).pathname,
        };
      });
      console.log({ run, ...result });
      await context.close();
    }
  } finally {
    await browser.close();
  }
} finally {
  await server.stop();
}
