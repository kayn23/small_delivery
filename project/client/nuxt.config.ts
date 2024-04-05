// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    host: 'http://localhost:3000',
  },
  devtools: { enabled: true },
  ssr: false,
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
})
