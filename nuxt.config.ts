export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    preset: 'cloudflare-pages',
    experimental: {
      asyncContext: true,
      tasks: true,
    },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  eslint: {
    checker: true,
  },
  modules: ['@nuxt/eslint', 'nitro-cloudflare-dev'],
  ssr: false,
})
