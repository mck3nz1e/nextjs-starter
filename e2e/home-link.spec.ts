import { test, expect } from "@playwright/test";

test.describe("App Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("screenshot", {
      body: screenshot,
      contentType: "image/png",
    });
  });

  test("should navigate to the home page", async ({ page }) => {
    // The new page should contain an h2 with "About Page"
    await expect(page.locator("h2")).toContainText("Hello World");
  });

  test("should navigate to the about page when about button clicked", async ({
    page,
  }) => {
    // Find an element with the text 'About Page' and click on it
    await page.click("text=About");

    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL("http://localhost:3000/about");

    // The new page should contain an h2 with "About Page"
    await expect(page.locator("h2")).toContainText("About");
  });
});
