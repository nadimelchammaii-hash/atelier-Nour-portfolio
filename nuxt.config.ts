// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://atelier-nour.vercel.app'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  srcDir: 'src/',
  // Lets `NUXT_BUILD_DIR=.nuxt-build nuxi generate` run while a dev server holds .nuxt
  buildDir: process.env.NUXT_BUILD_DIR || '.nuxt',
  devtools: { enabled: false },
  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/i18n'],

  // main.css holds the @tailwind directives (registered via tailwindcss.cssPath below)

  // <AppImage>, <SiteHeader>… without folder prefixes
  components: [{ path: '~/components', pathPrefix: false }],

  runtimeConfig: {
    public: { siteUrl: SITE_URL },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#F5F3EF' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://images.unsplash.com' },
      ],
    },
  },

  /* ---------- Images ---------- */
  image: {
    provider: 'unsplash',
    // auto=format → Unsplash serves AVIF/WebP depending on browser support
    format: ['webp'],
    quality: 70,
    // Breakpoints used to build srcset (mirrors Tailwind screens + 2x for retina)
    screens: { xs: 380, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1600, '2xl': 1920, '3xl': 2560 },
    presets: {
      cover: { modifiers: { fit: 'cover', quality: 72 } },
      thumb: { modifiers: { fit: 'cover', quality: 65 } },
    },
  },

  /* ---------- i18n ---------- */
  i18n: {
    baseUrl: SITE_URL,
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    restructureDir: 'src', // locale files live in src/locales
    langDir: 'locales',
    lazy: true,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', language: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.json' },
    ],
    detectBrowserLanguage: false,
    bundle: { optimizeTranslationDirective: false },
  },

  /* ---------- Fonts ----------
   * Google Fonts CSS (woff2 subsets only, display=swap), loaded without blocking first paint —
   * see app.vue. The Arabic family is only requested on Arabic pages. */

  /* ---------- Static generation ---------- */
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/ar', '/sitemap.xml', '/robots.txt'],
      failOnError: true,
    },
  },

  tailwindcss: { viewer: false, cssPath: '~/assets/css/main.css' },

  experimental: {
    payloadExtraction: true,
  },
})
