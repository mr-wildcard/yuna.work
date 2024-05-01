import { test, expect } from "@playwright/test";

test("Snapshot homepage", async ({ page }) => {
  await page.goto("/");

  await page.waitForFunction(() => document.fonts.ready);

  await expect(page.getByRole("list")).toHaveScreenshot();
});
