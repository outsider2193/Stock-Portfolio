const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const tailwindcssPostcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");

module.exports = defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcssPostcss(), autoprefixer()],
    },
  },
});
