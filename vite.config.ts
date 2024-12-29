import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/utils/constants"),
      "@hooks": path.resolve(__dirname, "./src/utils/hooks"),
      "@interfaces": path.resolve(__dirname, "./src/utils/interfaces"),
    },
  },
});
