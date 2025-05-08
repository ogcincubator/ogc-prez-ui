// https://nuxt.com/docs/api/configuration/nuxt-config
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: [
      "@nuxtjs/tailwindcss",
      "shadcn-nuxt",
      "@nuxtjs/color-mode",
    ],
    extends: [
        "prez-ui"
    ],
    vite: {
        optimizeDeps: {
            include: ["@triply/yasgui"]
        }
    },
    css: [
        join(currentDir, './assets/css/ogc.css'),
    ],
});