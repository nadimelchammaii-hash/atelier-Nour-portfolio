// Prerendered to /sitemap.xml at build time (see nitro.prerender.routes).
// Lists every page in both languages with hreflang alternates.
import { projects } from '~/data/projects'

export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.siteUrl || '').replace(/\/$/, '')
  const paths = ['/', '/projects', '/about', '/contact', '/credits', ...projects.map((p) => `/projects/${p.slug}`)]
  const loc = (lang, path) => base + (lang === 'ar' ? (path === '/' ? '/ar' : `/ar${path}`) : path)

  const urls = paths.flatMap((path) =>
    ['en', 'ar'].map(
      (lang) => `  <url>
    <loc>${loc(lang, path)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${loc('en', path)}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${loc('ar', path)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('en', path)}"/>
  </url>`,
    ),
  )

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
})
