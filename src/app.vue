<script setup>
const { t, locale } = useI18n()
const head = useLocaleHead({ seo: true })

// Google Fonts: woff2 subsets, font-display: swap. Arabic family only on Arabic pages.
const FONTS_LATIN = 'family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400'
const FONTS_ARABIC = '&family=IBM+Plex+Sans+Arabic:wght@200;300;400'
const fontsHref = computed(
  () => `https://fonts.googleapis.com/css2?${FONTS_LATIN}${locale.value === 'ar' ? FONTS_ARABIC : ''}&display=swap`,
)

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang, dir: head.value.htmlAttrs?.dir },
  link: [
    ...(head.value.link || []),
    // Non-blocking stylesheet: loads as "print" then switches to "all" — text paints in the fallback first
    { key: 'fonts', rel: 'stylesheet', href: fontsHref.value, media: 'print', onload: "this.media='all'" },
  ],
  noscript: [{ key: 'fonts-noscript', innerHTML: `<link rel="stylesheet" href="${fontsHref.value}">` }],
  meta: head.value.meta,
  titleTemplate: (title) => (title ? `${title} — ${t('site.name')}` : `${t('site.name')} — ${t('site.tagline')}`),
  script: [
    {
      // Runs before first paint: enables "hidden until revealed" styles only when
      // motion is allowed, so no-JS and reduced-motion users always see content.
      key: 'motion-flag',
      innerHTML:
        "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}",
      tagPosition: 'head',
    },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
