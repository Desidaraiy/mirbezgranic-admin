import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: false },
  buildModules: [
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['chart.js']
  },
  css: [
    '@/assets/css/main.css',
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  // middleware: ["route"]
  plugins: ['~/plugins/route'],
  server: {
    host: 'localhost',
    port: 5000
  },
})