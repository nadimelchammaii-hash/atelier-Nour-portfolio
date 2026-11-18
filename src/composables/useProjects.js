import { projects, categories } from '~/data/projects'

/** Locale-aware helpers around src/data/projects.js */
export function useProjects() {
  const { locale } = useI18n()

  /** Pick the current-locale string from an { en, ar } object */
  const tr = (field) => (field && typeof field === 'object' ? field[locale.value] ?? field.en : field)

  const bySlug = (slug) => projects.find((p) => p.slug === slug)
  const featured = computed(() => projects.filter((p) => p.featured))

  /** Previous / next project (wraps around) */
  const neighbours = (slug) => {
    const i = projects.findIndex((p) => p.slug === slug)
    const n = projects.length
    return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] }
  }

  /** Localised number formatting (Arabic-Indic digits in AR) */
  const num = (v, opts = {}) => new Intl.NumberFormat(locale.value === 'ar' ? 'ar-EG' : 'en-US', opts).format(v)
  const year = (v) => num(v, { useGrouping: false })

  return { projects, categories, tr, bySlug, featured, neighbours, num, year }
}
