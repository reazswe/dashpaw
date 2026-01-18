import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My React App",
        short_name: "MyApp",
        description: "My React PWA Application",
        start_url: "/",
        display: "standalone", // 🔥 browser header hide হবে
        background_color: "#0f172a",
        theme_color: "#0f172a",
        icons: [
          {
            src: "icons/icon-192.png", // এখানে পাথাটি ঠিক করুন
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
