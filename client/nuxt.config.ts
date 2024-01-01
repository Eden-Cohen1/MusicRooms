// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-nocheck
export default defineNuxtConfig({
  target: "static",
  devtools: { enabled: true },
  head: {
    script: [{ src: "https://www.youtube.com/iframe_api" }],
  },
  modules: [
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    ["@pinia/nuxt", { autoImports: ["defineStore"] }],
  ],
  plugins: [{ src: "~/plugins/api.ts" }, "~/plugins/youtube.client.js"],
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  css: [
    "~/assets/main.css",
    "~/node_modules/lite-youtube-embed/src/lite-yt-embed.css",
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["lite-youtube"].includes(tag),
    },
  },
});
