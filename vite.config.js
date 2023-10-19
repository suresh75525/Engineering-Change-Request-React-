import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all";

export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  server: {
    port: 5001,
  },
  build: {
    chunkSizeWarningLimit: 1000 * 1024,
  },
});
