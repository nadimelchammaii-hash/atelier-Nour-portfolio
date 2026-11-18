# Atelier Nour — Architecture & Interiors (demo)

A bilingual (English / Arabic, full RTL) portfolio site for a **fictional** architecture studio, built as a showcase template.

**Stack:** Nuxt 3 (static generation) · Tailwind CSS · @nuxt/image (Unsplash) · @nuxtjs/i18n · GSAP ScrollTrigger + Lenis

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static site → .output/public
npm run preview    # serve the generated site
```

## Editing content

| What | Where |
| --- | --- |
| Projects (text EN/AR, year, area, category, images) | `src/data/projects.js` |
| Image library (Unsplash IDs, placeholder colour, photographer) | `I` object at the top of `src/data/projects.js` |
| UI text, About page, contact page copy | `src/locales/en.json`, `src/locales/ar.json` |
| Colours, fonts, type scale | `tailwind.config.js` |
| Studio contact details | `src/pages/contact.vue` (`STUDIO`), `src/components/layout/SiteFooter.vue` |

Pages, routes (`/projects/<slug>` and `/ar/projects/<slug>`), filters, the sitemap and the credits page are all generated from the data file.

## Notes

- **Contact form is a demo**: it validates and shows a success state but sends nothing (no backend). Connect a form service (Formspree, Web3Forms…) in `submit()` in `src/pages/contact.vue`.
- **Images** are hot-linked from Unsplash's CDN with responsive `srcset`, `auto=format` (AVIF/WebP) and fixed aspect ratios. All are credited on `/credits`.
- **Motion** respects `prefers-reduced-motion`; above-the-fold text animates with CSS only so it never delays the first paint.
- **Fonts** load from Google Fonts without blocking rendering; the Arabic family is only requested on Arabic pages.
- The production URL (canonical URLs, hreflang, Open Graph, sitemap) defaults to `https://ateliernourhaddad.vercel.app`. For another domain, set the environment variable `SITE_URL`.

## Deploying to Vercel

Import the repository in Vercel (framework preset: Nuxt). `vercel.json` already sets the build command (`npm run generate`), the output directory (`.output/public`) and long-term caching for hashed assets. If you move to a custom domain, add the environment variable `SITE_URL` (e.g. `https://your-domain.com`) and redeploy.

## Lighthouse (mobile, simulated throttling, local gzip server)

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home (EN) | 95 | 100 | 100 | 100 |
| Home (AR) | 97 | 100 | 100 | 100 |
| Projects | 94 | 100 | 100 | 100 |
| Project detail | 90 | 100 | 100 | 100 |
| About | 96 | 100 | 100 | 100 |
| Contact (AR) | 97 | 100 | 100 | 100 |

---

Atelier Nour, its founder and its projects are fictional. Photography via [Unsplash](https://unsplash.com).
