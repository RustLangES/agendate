import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["nitro-cloudflare-dev", "@primevue/nuxt-module"],
  primevue: {
    // usePrimeVue: true,
    autoImport: true,
    options: {
      theme: {
        preset: Aura,
      }
    }
  },
  nitro: {
    preset: "cloudflare-pages"
  },
  site: {
    url: 'https://agendate.rustlang-es.org',
    name: 'Agenda una reunion con el equipo de RustLangES',
    defaultLocale: 'es'
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: "preconnect", href:"https://fonts.googleapis.com" },
        { rel: "preconnect", href:"https://fonts.gstatic.com", crossorigin: true },
        { rel: 'stylesheet', href:"https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" },
        { rel: 'stylesheet', href:"https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" },
      ]
    }
  },
})
