<script setup>
const { t, locale } = useI18n()
const head = useLocaleHead({ seo: true })

/*
 * Google Fonts (woff2 subsets, font-display: swap), loaded WITHOUT blocking first paint.
 * The stylesheets are injected by a tiny inline script rather than declared with useHead:
 * the usual `media="print" onload="this.media='all'"` trick gets reset by the head manager
 * during hydration, which left the fonts unapplied. Script-inserted stylesheets never block
 * rendering, and the Arabic family is only requested when an Arabic page is shown.
 */
const GF = 'https://fonts.googleapis.com/css2?'
const FONTS_LATIN = `${GF}family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400&display=swap`
const FONTS_ARABIC = `${GF}family=IBM+Plex+Sans+Arabic:wght@200;300;400&display=swap`
const fontLoader = `(function(d){function a(id,h){if(d.getElementById(id))return;var l=d.createElement('link');l.id=id;l.rel='stylesheet';l.href=h;d.head.appendChild(l)}a('gf-latin','${FONTS_LATIN}');if(d.documentElement.lang==='ar')a('gf-arabic','${FONTS_ARABIC}')})(document)`

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang, dir: head.value.htmlAttrs?.dir },
  link: head.value.link,
  meta: head.value.meta,
  noscript: [{ key: 'fonts-noscript', innerHTML: `<link rel="stylesheet" href="${FONTS_LATIN}"><link rel="stylesheet" href="${FONTS_ARABIC}">` }],
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
    { key: 'font-loader', innerHTML: fontLoader, tagPosition: 'head' },
  ],
}))

// Switching to Arabic client-side (no page reload): add the Arabic family on demand
if (import.meta.client) {
  const ensureArabic = (l) => {
    if (l !== 'ar' || document.getElementById('gf-arabic')) return
    const link = Object.assign(document.createElement('link'), { id: 'gf-arabic', rel: 'stylesheet', href: FONTS_ARABIC })
    document.head.appendChild(link)
  }
  watch(locale, ensureArabic, { immediate: true })
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
