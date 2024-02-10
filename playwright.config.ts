import { defineConfig } from "@playwright/test";
const isCI = process.env.CI == "true";
const isDeployed = process.env.aws_env_cname;

let testDir: string;
if (isCI && isDeployed === undefined) {
  // Run local test suite only
  testDir = "./e2e/shakedown";
} else {
  // Run regression suite
  testDir = "./e2e/regression";
}

export default defineConfig({
  testDir: "./e2e",
  reporter: [["html", { open: "never" }]],

  webServer:
    isCI && isDeployed === undefined
      ? {
          command: "npm run start",
          url: "http://localhost:3000",
        }
      : undefined,
});
