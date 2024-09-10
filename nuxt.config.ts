// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const appTitle = process.env.NUXT_PUBLIC_APP_TITLE || 'OGC RAINBOW';

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  extends:
    (process.env.PREZ_LAYER_EXTENDS ? 
      process.env.PREZ_LAYER_EXTENDS.split(",") : []),

  app: {
    head: {
      title: process.env.NUXT_PUBLIC_APP_TITLE,
    } 
  },

  runtimeConfig: {
    public: {
      prezApiEndpoint: process.env.NUXT_PUBLIC_PREZ_API_ENDPOINT,
      appTitle: 'OGC RAINBOW',
    }
  },

  css: [
    join(currentDir, './assets/css/ogc.css'),
  ],

})
