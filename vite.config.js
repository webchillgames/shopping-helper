import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/shopping-helper/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8080,
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/base.scss';`,
      },
    },
  },
});
