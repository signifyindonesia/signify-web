import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      fix: true, // Auto-perbaiki jika bisa
      include: ["src/**/*.js", "src/**/*.jsx"],
      exclude: ["node_modules"],
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Signify Indonesia",
        short_name: "Signify",
        description: "Aplikasi penerjemah bahasa isyarat real-time berbasis AI",
        theme_color: "#3B82F6",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // konfigurasi caching bisa disesuaikan jika perlu
      },
    }),
  ],
});
