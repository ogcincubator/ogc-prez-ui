// https://nuxt.com/docs/api/configuration/nuxt-config
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

const appTitle = process.env.NUXT_PUBLIC_APP_TITLE || 'OGC RAINBOW';

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {enabled: true},
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/color-mode", "nuxt-gtag"],
  extends: [
    "prez-ui",
  ],
  vite: {
    optimizeDeps: {
      include: ["@triply/yasgui"],
    },
  },
  css: [
    join(currentDir, './assets/css/ogc.css'),
  ],
  app: {
    head: {
      title: appTitle,
      link: [
        {rel: 'icon', href: 'https://www.ogc.org/wp-content/uploads/2022/06/favicon_2-3.png'},
        {rel: 'apple-touch-icon', href: 'https://www.ogc.org/wp-content/uploads/2022/06/favicon_2-3.png'},
      ],
    },
  },
  runtimeConfig: {
    public: {
      appTitle: appTitle,
      staticPagesGraphURI: "urn:prez:static-pages",
    },
  },
  ssr: false,
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  gtag: {
    enabled: !!process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    id: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  },
});