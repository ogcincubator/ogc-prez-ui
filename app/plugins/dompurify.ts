import VueDOMPurifyHTML from 'vue-dompurify-html';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDOMPurifyHTML, {
    namedConfigurations: {
      mathml: {
        USE_PROFILES: {
          mathMl: true,
        },
      },
    },
  });
});