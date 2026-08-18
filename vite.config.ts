import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Keeps the dev server on CRA's old port. Change it here, or override
    // per-run with `npm run dev -- --port 3001`.
    port: 3000,
  },
  build: {
    // CRA emitted to build/; keep that so existing deploy config still works.
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
});
