import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const text = {
  color: '#000',
  hoverColor: '#000',
  mutedColor: '#000',
  hoverMutedColor: '#000'
}
const content = {
  background: '{orange.0}',
  hoverBackground: '{orange.100}',
  borderColor: '{orange.200}',
  color: '#000',
  hoverColor: '#000'
}

const base = {
  50: '{orange.50}',
  100: '{orange.100}',
  200: '{orange.200}',
  300: '{orange.300}',
  400: '{orange.400}',
  500: '{orange.500}',
  600: '{orange.600}',
  700: '{orange.700}',
  800: '{orange.800}',
  900: '{orange.900}',
  950: '{orange.950}'
}


const button = {
  root: {
    text: { secondary: { color: '#000', }, },
    primary: {
      background: '{orange.100}',
      hoverBackground: '{orange.100}',
      activeBackground: '{orange.100}',
      borderColor: '#000',
      hoverBorderColor: '#000',
      activeBorderColor: '#000',
      color: '#000',
      hoverColor: '#000',
      activeColor: '#000',
      focusRing: {
        color: '{primary.color}',
        shadow: 'none'
      }
    },
  },
}

const panel = {
  background: '#fdba744d',
  borderRadius: 0,
  color: '#000',
}

const RustLangESPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0'
    },
  },
  semantic: {
    primary: base,
  },
  colorScheme: {
    light: {
      text,
      content,
      surface: base,
    },
    dark: {
      text,
      content,
      surface: base,
    },
  },
  components: {
    card: {
      root: {
        background: '#fdba744d',
        borderRadius: 0,
        color: '#000',
      },
    },
    datepicker: {
      panel,
      header: panel,
      selectMonth: { color: '#000', },
      selectYear: { color: '#000', },
      weekDay: { color: '#000', },
      date: { color: '#000', },
    },
    button: {
      colorScheme: {
        dark: button,
        light: button,
      },
    },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  devtools: { enabled: true },
  modules: ["nitro-cloudflare-dev", "@primevue/nuxt-module"],
  primevue: {
    autoImport: false,
    options: {
      theme: {
        preset: RustLangESPreset,
      }
    },
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
