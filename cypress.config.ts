import { defineConfig } from "cypress";

require("dotenv").config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
    env: {
      ...process.env,
      REACT_APP_API_URL: "https://dev.tryber.me/api",
    },
    baseUrl: "http://localhost:3000",
    experimentalStudio: true,
    video: false,
    screenshotOnRunFailure: false,
    testIsolation: true,
    viewportHeight: 768,
    viewportWidth: 1366,
  },
});
