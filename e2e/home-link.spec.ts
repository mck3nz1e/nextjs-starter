import { test, expect } from "@playwright/test";

test.describe("App Home Page", () => {
  test.beforeEach(async ({ page }) => {
    const awsEnvCname = process.env._aws_env_cname as string;
    const isDeployed = process.env.aws_env_cname !== undefined; // Check if the variable is defined
    let url: string;

    if (isDeployed) {
      console.log(`Testing in deployed environment: ${awsEnvCname}`);
      url = awsEnvCname;
    } else {
      console.log(`Testing in local environment`);
      url = "http://localhost:3000";
    }
    await page.goto(url);
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
