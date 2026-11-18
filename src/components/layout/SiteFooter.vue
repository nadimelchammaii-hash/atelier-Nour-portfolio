<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()

// Demo contact details — all fictional
const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
]

const { $motion } = useNuxtApp()
function toTop() {
  if ($motion?.state.lenis) $motion.state.lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="mt-section bg-ink text-paper">
    <div class="container-site pb-10 pt-16 md:pt-24">
      <div class="grid-site gap-y-12">
        <div class="col-span-4 md:col-span-6 lg:col-span-6">
          <p class="font-display text-display-md max-w-xl">{{ t('site.name') }}</p>
          <p class="eyebrow mt-4 !text-stone-light">{{ t('site.tagline') }}</p>
        </div>

        <div class="col-span-2 md:col-span-2 lg:col-span-2">
          <p class="eyebrow mb-5 !text-stone-light">{{ t('footer.studio') }}</p>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink :to="localePath('/projects')" class="link-underline">{{ t('nav.projects') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/about')" class="link-underline">{{ t('nav.about') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contact')" class="link-underline">{{ t('nav.contact') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/credits')" class="link-underline">{{ t('nav.credits') }}</NuxtLink></li>
          </ul>
        </div>

        <div class="col-span-2 md:col-span-2 lg:col-span-2">
          <p class="eyebrow mb-5 !text-stone-light">{{ t('footer.follow') }}</p>
          <ul class="space-y-2 text-sm">
            <li v-for="s in socials" :key="s.label">
              <a :href="s.href" target="_blank" rel="noopener noreferrer" class="link-underline">{{ s.label }}</a>
            </li>
          </ul>
        </div>

        <div class="col-span-4 md:col-span-2 lg:col-span-2">
          <p class="eyebrow mb-5 !text-stone-light">{{ t('footer.enquiries') }}</p>
          <ul class="space-y-2 text-sm">
            <li><a href="mailto:studio@ateliernour.example" class="link-underline">studio@ateliernour.example</a></li>
            <li><a href="tel:+9611000000" class="link-underline" dir="ltr">+961 1 000 000</a></li>
            <li class="text-stone-light">{{ t('footer.address') }}</li>
          </ul>
        </div>
      </div>

      <div class="mt-20 flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs text-stone-light md:flex-row md:items-center md:justify-between">
        <p>© {{ year }} {{ t('site.name') }}. {{ t('footer.rights') }} · {{ t('site.demoNotice') }}</p>
        <div class="flex items-center gap-6">
          <NuxtLink :to="localePath('/credits')" class="link-underline">{{ t('footer.photos') }}</NuxtLink>
          <button type="button" class="link-underline" @click="toTop">{{ t('footer.backToTop') }} ↑</button>
        </div>
      </div>
    </div>
  </footer>
</template>
