// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    host: 'http://localhost:3000/api',
  },
  appConfig: {
    host: 'http://localhost:3000/api',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'FastDelivery',
    },
  },
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  pinia: {
    storesDirs: ['./store/**'],
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'vForm',
      Field: 'vField',
      FieldArray: 'vFieldArray',
      ErrorMessage: 'vErrorMessage',
    },
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
  css: ['~/styles/index.sass'],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/_colors.sass"\n',
        },
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as element;`,
        },
      },
    },
  },
  colorMode: {
    classSuffix: '',
  },
})
