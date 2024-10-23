// https://nuxt.com/docs/api/configuration/nuxt-config
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import type {ModuleOptions} from "@nuxtjs/tailwindcss";

const appTitle = process.env.NUXT_PUBLIC_APP_TITLE || 'OGC RAINBOW';

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},

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

  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@ogc/nuxt3-dynamic-pages-module',
  ],

  runtimeConfig: {
    dynamicPagesPath: null,
    public: {
      prezApiEndpoint: process.env.NUXT_PUBLIC_PREZ_API_ENDPOINT,
      appTitle: appTitle,
    }
  },

  css: [
    join(currentDir, './assets/css/ogc.css'),
  ],

  tailwindcss: {
    cssPath: false,
  } satisfies Partial<ModuleOptions>,

})
