import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      fix: true, // Auto-perbaiki jika bisa
      include: ["src/**/*.js", "src/**/*.jsx"],
      exclude: ["node_modules"],
    }),
  ],
});
