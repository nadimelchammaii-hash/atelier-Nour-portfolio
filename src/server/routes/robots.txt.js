// Prerendered to /robots.txt at build time.
export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.canonicalBase || '').replace(/\/$/, '')
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
})
