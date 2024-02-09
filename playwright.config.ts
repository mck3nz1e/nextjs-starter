import { defineConfig } from "@playwright/test";
const isCI = process.env.CI === "true";

export default defineConfig({
  testDir: "./e2e",
  reporter: [["html", { open: "never" }]],

  webServer: isCI
    ? undefined
    : {
        command: "npm run start",
        url: "http://localhost:3000",
      },
});
