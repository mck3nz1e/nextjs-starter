import { test, expect } from "@playwright/test";

test.describe("App Home Page Regression Tests", () => {
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
    await expect(page.locator("h2")).toContainText("Hello World");
  });

  test("should have the expected text", async ({ page }) => {
    await expect(page.getByText("This is a test")).toBeVisible();
    await expect(page.getByText("This is also a test")).toBeVisible();
    await expect(page.getByText("About")).toBeVisible();
  });

  test("should navigate to the about page when about button clicked", async ({
    page,
  }) => {
    await page.click("text=About");
    await expect(page.locator("h2")).toContainText("About");
  });
});
