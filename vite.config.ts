import { defineConfig } from "vite";
import pluginReact from "@vitejs/plugin-react";

const config = defineConfig({
  // Prevent absolute '/'-leading paths
  base: "",

  server: {
    host: true,
  },

  plugins: [pluginReact()],
});
export default config;
