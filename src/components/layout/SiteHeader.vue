<script setup>
/**
 * Minimal top bar.
 * - Transparent with light text over a full-bleed hero (pages set `definePageMeta({ overlayHeader: true })`)
 * - Turns solid once scrolled, hides on scroll down, reappears on scroll up
 * - Full-screen overlay menu below `md`
 */
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { $motion } = useNuxtApp()

const links = computed(() => [
  { to: localePath('/projects'), label: t('nav.projects') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/contact'), label: t('nav.contact') },
])

const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 40
  hidden.value = !open.value && y > 240 && y > lastY
  lastY = y
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const overlay = computed(() => route.meta.overlayHeader && !scrolled.value && !open.value)

// Mobile menu
function toggle(v = !open.value) {
  open.value = v
  if (v) $motion?.state.lenis?.stop()
  else $motion?.state.lenis?.start()
  document.documentElement.style.overflow = v ? 'hidden' : ''
}
watch(() => route.fullPath, () => open.value && toggle(false))
function onKey(e) {
  if (e.key === 'Escape' && open.value) toggle(false)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500 ease-out"
    :class="[
      hidden ? '-translate-y-full' : 'translate-y-0',
      overlay ? 'border-b border-transparent text-paper' : 'border-b border-stone-line/70 bg-paper/90 text-ink backdrop-blur-md',
    ]"
  >
    <div class="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="relative z-10 flex items-baseline gap-3" :aria-label="t('site.name')">
        <span class="font-display text-2xl leading-none tracking-tight md:text-[1.7rem]">{{ t('site.name') }}</span>
        <span class="eyebrow hidden !text-current opacity-60 lg:inline">{{ t('site.tagline') }}</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav :aria-label="t('nav.main')" class="hidden items-center gap-10 md:flex">
        <ul class="flex items-center gap-8 text-sm">
          <li v-for="l in links" :key="l.to">
            <NuxtLink :to="l.to" class="link-underline py-1">{{ l.label }}</NuxtLink>
          </li>
        </ul>
        <LangSwitch />
      </nav>

      <!-- Mobile controls -->
      <div class="relative z-10 flex items-center gap-3 md:hidden">
        <LangSwitch />
        <button
          type="button"
          class="flex h-10 items-center gap-3 px-1 text-xs uppercase tracking-[0.14em] rtl:tracking-normal rtl:text-sm"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="toggle()"
        >
          <span>{{ open ? t('nav.close') : t('nav.menu') }}</span>
          <span class="relative block h-2.5 w-6" aria-hidden="true">
            <span class="absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500" :class="open && 'translate-y-[5px] rotate-45'" />
            <span class="absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500" :class="open && '-translate-y-[4px] -rotate-45'" />
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile overlay menu — teleported: the header's transform would otherwise trap `position: fixed` -->
    <Teleport to="body">
    <Transition name="menu">
      <div v-if="open" id="mobile-menu" class="fixed inset-0 z-40 flex flex-col bg-paper pt-[var(--header-h)] text-ink md:hidden">
        <nav :aria-label="t('nav.main')" class="container-site flex flex-1 flex-col justify-center">
          <ul>
            <li v-for="(l, i) in [{ to: localePath('/'), label: t('nav.home') }, ...links]" :key="l.to" class="hairline">
              <NuxtLink
                :to="l.to"
                class="menu-item flex items-baseline justify-between py-5 font-display text-5xl"
                :style="{ transitionDelay: `${0.08 + i * 0.06}s` }"
              >
                {{ l.label }}
                <span class="font-sans text-xs text-stone">0{{ i + 1 }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <p class="container-site pb-8 text-xs text-stone">{{ t('site.demoNotice') }}</p>
      </div>
    </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active { transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.menu-enter-from,
.menu-leave-to { opacity: 0; }
.menu-enter-active .menu-item { transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s; }
.menu-enter-from .menu-item { transform: translateY(40%); opacity: 0; }
</style>
