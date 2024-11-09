import { defineConfig } from "vite";
import pluginReact from "@vitejs/plugin-react";

const config = defineConfig({
  // Prevent absolute '/'-leading paths
  base: "",

  plugins: [pluginReact()],
});
export default config;
