/**
 * Motion system — Lenis smooth scroll + GSAP reveals driven by IntersectionObserver.
 *
 * Declarative API, used in templates:
 *   data-reveal                 fade + slide up when the element enters the viewport
 *   data-reveal-delay="0.15"    optional stagger offset (seconds)
 *   data-reveal-img             clip-path wipe + inner image de-zoom (wrap an <img>)
 *   data-intro                  above-the-fold entrance — pure CSS, see main.css (not handled here)
 *
 * Robustness rules (content must never stay hidden):
 * - Every element gets its own IntersectionObserver entry — there are no global triggers
 *   that a route change could kill before they fire.
 * - A MutationObserver picks up any new [data-reveal] node automatically (route changes,
 *   language switches, filtering, lightbox…), so no manual re-scan is needed.
 * - If GSAP can't load, or the user prefers reduced motion, everything is shown at once.
 * - GSAP / Lenis are imported on idle so they never compete with first paint.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const state = { gsap: null, lenis: null, enabled: !reduced }

  const SELECTOR = '[data-reveal]:not([data-revealed]), [data-reveal-img]:not([data-revealed])'

  /* ---------- Library loading ---------- */
  const ready = (async () => {
    if (reduced) {
      root.classList.remove('motion')
      return
    }
    try {
      await new Promise((r) => ('requestIdleCallback' in window ? requestIdleCallback(r, { timeout: 1200 }) : setTimeout(r, 200)))
      const [{ gsap }, { default: Lenis }] = await Promise.all([import('gsap'), import('lenis')])
      const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
      Object.assign(state, { gsap, lenis })
    } catch (err) {
      root.classList.remove('motion') // never leave content hidden
      state.enabled = false
      console.warn('[motion] disabled:', err)
    }
  })()

  /* ---------- Reveal animations ---------- */
  function showStatic(el) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    el.style.clipPath = 'none'
  }

  async function animate(el) {
    await ready
    const { gsap } = state
    if (!gsap || !el.isConnected) return showStatic(el)
    const delay = parseFloat(el.dataset.revealDelay || 0)

    if (el.hasAttribute('data-reveal-img')) {
      const img = el.querySelector('img')
      // The wrapper keeps its final inline clip-path (clearing it would re-apply the hidden CSS state);
      // the <img> transform IS cleared so the hover zoom classes work again afterwards.
      const tl = gsap.timeline()
      tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', delay })
      if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'expo.out', clearProps: 'transform' }, '<')
    } else {
      gsap.to(el, { opacity: 1, y: 0, duration: 1.1, delay, ease: 'expo.out' })
    }
  }

  // Fires when an element is ~8% into the viewport; elements already on screen fire right away
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        io.unobserve(e.target)
        animate(e.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )

  function scan(scope = document) {
    const els = scope.querySelectorAll ? scope.querySelectorAll(SELECTOR) : []
    for (const el of els) {
      el.setAttribute('data-revealed', '') // = "registered"; the observer does the rest
      if (!state.enabled) showStatic(el)
      else io.observe(el)
    }
  }

  // Watch for new content anywhere in the app (batched to one scan per frame)
  let queued = false
  const mo = new MutationObserver(() => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      scan()
    })
  })

  nuxtApp.hook('app:mounted', () => {
    scan()
    mo.observe(document.body, { childList: true, subtree: true })
  })

  /* ---------- Smooth scroll across route changes ---------- */
  const router = useRouter()
  router.afterEach((to, from) => {
    // New page (not just a hash / query change): jump Lenis to the top so it agrees with the router
    if (to.path !== from.path) state.lenis?.scrollTo(0, { immediate: true, force: true })
  })
  // Make sure smooth scroll is always running again after any navigation / transition
  const resume = () => state.lenis?.start()
  nuxtApp.hook('page:finish', resume)
  nuxtApp.hook('page:transition:finish', () => {
    resume()
    scan()
  })

  return { provide: { motion: { ready, scan, state } } }
})
