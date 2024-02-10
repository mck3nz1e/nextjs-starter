import { defineConfig } from "@playwright/test";
const isCI = process.env.CI == "true";
const isDeployed = process.env.aws_env_cname;

export default defineConfig({
  testDir: "./e2e",
  reporter: [
    ["html", { open: "never" }],
    [
      "@estruyf/github-actions-reporter",
      {
        title: "Playwright Test Summary",
        useDetails: true,
        showError: true,
      },
    ],
  ],

  webServer:
    isCI && isDeployed === undefined
      ? {
          command: "npm run start",
          url: "http://localhost:3000",
        }
      : undefined,
});
