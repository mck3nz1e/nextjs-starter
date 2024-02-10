import { test, expect } from "@playwright/test";

test.describe("App Home Pag Shakedown Tests", () => {
  test.beforeEach(async ({ page }) => {
    const awsEnvCname = process.env.aws_env_cname; // Deployed URl string passed from GitHub workflow env
    const isDeployed = process.env.aws_env_cname !== undefined; // Check if the variable is defined

    if (isDeployed) {
      // If the env has been deployed then use deployed AWS URL
      let url = awsEnvCname as string;
      await page.goto(url);
    } else {
      // Use the local host
      await page.goto("http://localhost:3000");
    }
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

    // The new page should contain an h2 with "About Page"
    await expect(page.locator("h2")).toContainText("About");
  });
});
