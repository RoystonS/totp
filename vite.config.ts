import { defineConfig } from "vite";
import pluginReact from "@vitejs/plugin-react";

const config = defineConfig({
  // Prevent absolute '/'-leading paths
  base: "",

  server: {
    host: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [pluginReact()],
});
export default config;
