// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-nocheck
export default defineNuxtConfig({
  base: "/client/",
  target: "static",
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
  ],
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  css: ["~/assets/main.css"],
});
