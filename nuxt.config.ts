// https://nuxt.com/docs/api/configuration/nuxt-config

const appTitle = process.env.PREZ_APP_TITLE || 'OGC RAINBOW';

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
      title: appTitle,
    } 
  },

  runtimeConfig: {
    public: {
      prezApiEndpoint: process.env.NUXT_PUBLIC_PREZ_API_ENDPOINT,
      appTitle: appTitle,
    }
  },

})
