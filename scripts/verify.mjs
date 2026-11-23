import assert from "node:assert/strict";
import { preview } from "astro";
import { chromium, webkit } from "playwright";
import AxeBuilder from "@axe-core/playwright";

// Run against the actual static output, on a loopback port chosen by the OS.
const server = await preview({
  server: { host: "127.0.0.1", port: 0 },
  logLevel: "silent",
});
const root = "http://127.0.0.1:" + server.port;
const routes = [
  "/",
  "/studio/",
  "/about/",
  "/contact/",
  ...["aroma", "hospitality", "technology"].map(
    (slug) => "/divisions/" + slug + "/",
  ),
];
const failures = [];

async function checkLayout(page, width, height, route) {
  await page.setViewportSize({ width, height });
  const response = await page.goto(root + route);
  assert.equal(response.status(), 200, route);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("h1").count(), 1, route);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - innerWidth,
  );
  assert.ok(overflow <= 1, `${route} at ${width}px overflows by ${overflow}px`);
}

async function allRoutes(page) {
  const destinations = new Set();
  for (const route of routes) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await checkLayout(page, width, width < 700 ? 844 : 900, route);
      if (width === 390 || width === 1440) {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        for (const issue of result.violations)
          failures.push(
            `${route} ${width}px ${issue.id}: ${issue.nodes.map((node) => node.target).join(", ")}`,
          );
      }
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    const missingImages = await page
      .locator("img")
      .evaluateAll(async (images) => {
        return (
          await Promise.all(
            images.map(async (image) => {
              image.loading = "eager";
              try {
                await image.decode();
                return "";
              } catch {
                return image.src;
              }
            }),
          )
        ).filter(Boolean);
      });
    assert.deepEqual(missingImages, [], route);
    const links = await page
      .locator("a[href]")
      .evaluateAll((anchors) => anchors.map((a) => a.href));
    for (const href of links)
      if (href.startsWith(root + "/")) destinations.add(href);
  }
  for (const href of destinations) {
    const url = new URL(href);
    const response = await page.request.get(href);
    assert.equal(response.status(), 200, href);
    if (url.hash)
      assert.ok(
        (await response.text()).includes('id="' + url.hash.slice(1) + '"'),
        href,
      );
  }
  console.log(
    "35 responsive route checks, 14 accessibility scans and " +
      destinations.size +
      " internal link targets.",
  );
}

async function testHome(page) {
  await page.goto(root);
  const next = page.getByRole("button", { name: "Next environment study" });
  for (const label of [
    "The dining room",
    "The workplace",
    "The arrival hall",
  ]) {
    await next.click();
    await page
      .getByText(label, { exact: true })
      .filter({ visible: true })
      .first()
      .waitFor();
    assert.equal(await page.locator("[data-scene-name]").textContent(), label);
  }
  await page
    .getByRole("button", { name: "Previous environment study" })
    .click();
  await page
    .getByText("The workplace", { exact: true })
    .filter({ visible: true })
    .first()
    .waitFor();
  assert.equal(
    await page.locator("[data-scene-name]").textContent(),
    "The workplace",
  );
  await page.getByText("Tomwood ED", { exact: true }).click();
  assert.equal(
    await page.locator(".scent-index details[open] summary>span").textContent(),
    "Tomwood ED",
  );
  const menu = page.locator(".division-menu summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  assert.ok(await page.locator(".drop-links").isVisible());
  await page.keyboard.press("Escape");
  assert.ok(await menu.evaluate((el) => el === document.activeElement));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-nav summary").click();
  await page
    .locator(".mobile-panel")
    .getByRole("link", { name: "Global Technology" })
    .click();
  assert.equal(new URL(page.url()).pathname, "/divisions/technology/");
  await page.getByRole("link", { name: "Discuss a project" }).click();
  assert.match(
    await page.getByLabel("Subject").inputValue(),
    /Global Technology/,
  );
  assert.ok(
    await page
      .locator("#inquiry-message")
      .evaluate((field) => !field.checkValidity()),
  );
}

async function testStudio(page) {
  await page.goto(root + "/studio/");
  const spaceOptions = page.locator('label:has(input[name="space"])');
  const scentOptions = page.locator('label:has(input[name="scent"])');
  const briefs = new Set();
  for (const space of await spaceOptions.all()) {
    for (const scent of await scentOptions.all()) {
      await space.click();
      await scent.click();
      const href = await page.locator("[data-inquire]").getAttribute("href");
      const brief = new URL(href, root).searchParams.get("brief");
      assert.ok(
        brief.includes(await page.locator("[data-brief-scent]").textContent()),
      );
      assert.ok(
        brief.includes(await page.locator("[data-brief-space]").textContent()),
      );
      briefs.add(brief);
    }
  }
  assert.equal(briefs.size, 9);
  await page.reload();
  assert.equal(
    await page.locator("[data-brief-scent]").textContent(),
    "Black Tea Accord",
  );
  await page.locator('input[name="scent"]:checked').focus();
  await page.keyboard.press("ArrowUp");
  assert.equal(
    await page.locator("[data-brief-scent]").textContent(),
    "Ginger Blossom",
  );
  const href = await page.locator("[data-inquire]").getAttribute("href");
  const brief = new URL(href, root).searchParams.get("brief");
  // Deny clipboard access inside this isolated tab to exercise manual copy.
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Clipboard unavailable");
        },
      },
    }),
  );
  await page.getByRole("button", { name: "Copy brief" }).click();
  assert.equal(
    await page.locator("[data-manual-copy] textarea").inputValue(),
    brief,
  );
  await page.locator("[data-inquire]").click();
  assert.equal(await page.getByLabel("Your project").inputValue(), brief);
  assert.equal(
    await page.locator("#inquiry-form").getAttribute("action"),
    "mailto:info@globaldwc.com",
  );
}

async function noJavaScript(browser) {
  const ctx = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await ctx.newPage();
  await page.goto(root);
  assert.equal(await page.locator(".scene-buttons").isVisible(), false);
  await page.locator(".mobile-nav summary").click();
  await page
    .locator(".mobile-panel")
    .getByRole("link", { name: "Atmosphere Studio" })
    .click();
  assert.ok(
    await page
      .getByRole("heading", { name: "A study for a hotel lobby" })
      .isVisible(),
  );
  assert.match(
    await page
      .getByRole("link", { name: "Email this sample brief" })
      .getAttribute("href"),
    /^mailto:info@globaldwc.com/,
  );
  await ctx.close();
}

try {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch();
    try {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      page.on("pageerror", (error) => failures.push(String(error)));
      page.on("response", (response) => {
        if (response.status() >= 400)
          failures.push(response.status() + " " + response.url());
      });
      if (engine === chromium) await allRoutes(page);
      await testHome(page);
      await testStudio(page);
      await noJavaScript(browser);
      console.log(
        engine.name(),
        browser.version(),
        "passed navigation, carousel, scent notes, Studio, enquiry and JS-off checks.",
      );
    } finally {
      await browser.close();
    }
  }
  assert.deepEqual(failures, []);
} finally {
  await server.stop();
}
