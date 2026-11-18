import { siteImages } from '~/data/projects'

/**
 * Per-page SEO: title, description, canonical, Open Graph & Twitter.
 * `image` is an Unsplash path (e.g. "photo-…"); it's turned into a 1200×630 OG image.
 */
export function useSeo({ title, description, image, type = 'website' } = {}) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const { siteUrl } = useRuntimeConfig().public

  const resolve = (v) => (typeof v === 'function' ? v() : unref(v))

  const ogImage = computed(() => {
    const img = resolve(image)
    return img
      ? `https://images.unsplash.com/${img}?w=1200&h=630&fit=crop&q=75&fm=jpg`
      : `https://images.unsplash.com/${siteImages.hero.src}?w=1200&h=630&fit=crop&q=75&fm=jpg`
  })

  useSeoMeta({
    title: () => resolve(title),
    description: () => resolve(description) || t('site.description'),
    ogTitle: () => (resolve(title) ? `${resolve(title)} — ${t('site.name')}` : t('site.name')),
    ogDescription: () => resolve(description) || t('site.description'),
    ogType: type,
    ogUrl: () => `${siteUrl}${route.path}`,
    ogImage: () => ogImage.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogSiteName: () => t('site.name'),
    ogLocale: () => (locale.value === 'ar' ? 'ar_LB' : 'en_US'),
    twitterCard: 'summary_large_image',
    twitterImage: () => ogImage.value,
  })
}
