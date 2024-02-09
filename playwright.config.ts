import { defineConfig } from "@playwright/test";
const isCI = process.env.CI == "true";
const isDeployed = process.env.aws_env_cname;
const date = new Date();

export default defineConfig({
  testDir: "./e2e",
  reporter: [
    [
      "html",
      {
        open: "never",
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
