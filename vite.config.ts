import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// For GitHub Pages at https://sushmoydatta.github.io/ keep base "/".
// For a project page (https://sushmoydatta.github.io/portfolio/) set base: "/portfolio/".
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
});
