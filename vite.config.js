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
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "My React App",
        short_name: "MyApp",
        description: "My React PWA Application",
        start_url: "/",
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#0f172a",
        icons: [
          {
            src: "icons/icon-192.png", // আপনার public/icons ফোল্ডার অনুযায়ী
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png", // এখানে "/" এর বদলে "icons/" করা হয়েছে যাতে এরর না আসে
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // অ্যান্ড্রয়েড স্প্ল্যাশ স্ক্রিনের জন্য জরুরি
          },
        ],
      },
      workbox: {
        // অফলাইন মোড চালু করার জন্য ক্যাশিং কনফিগারেশন
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    // বড় ফাইলের কারণে অ্যাপ যাতে স্লো বা ক্রাশ না হয় তার সমাধান
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
