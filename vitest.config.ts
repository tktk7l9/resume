import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      // UI layer (components + App Router pages) and the pure logic it leans on.
      include: ["src/app/**", "src/components/**", "src/i18n/**", "src/lib/**"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        // Rendered by next/og at build time; jsdom cannot execute ImageResponse.
        "src/app/opengraph-image.tsx",
        // Static SVG file, not a module.
        "src/app/icon.svg",
      ],
      reporter: ["text", "json-summary"],
      thresholds: {
        // Behavioural UI tests (Testing Library). Measured 2026-10-01:
        // components 98.4% lines / app 99.2% lines; the floor sits two
        // points under that so a refactor does not trip CI.
        "src/components/**": { lines: 96, statements: 95, functions: 98 },
        "src/app/**": { lines: 97, statements: 95, functions: 98 },
      },
    },
  },
});
