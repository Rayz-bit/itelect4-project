import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  // npm run dev and npm run build skip this block. npm test reads it.
  test: {
    // A pretend browser page inside Node, so render() has a document.
    environment: "jsdom",
    // Runs before every test file.
    setupFiles: ["./src/test/setup.ts"],
    // request() in client.ts needs VITE_API_URL. The tests never call this
    // address, so a fixed fake value means they need no .env, on your laptop
    // or on GitHub. (Not a localhost address, so your localhost check stays clean.)
    env: { VITE_API_URL: "https://api.example.test" },
  },
});