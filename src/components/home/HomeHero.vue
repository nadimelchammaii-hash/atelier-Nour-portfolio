<script setup>
/** Full-screen hero — the only eagerly loaded (LCP) image on the site. */
const props = defineProps({ image: { type: Object, required: true } })
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative h-svh min-h-[600px] w-full overflow-hidden bg-ink text-paper">
    <AppImage
      :src="image.src"
      :color="image.color"
      alt=""
      ratio="16/9"
      sizes="100vw"
      eager
      class="hero-img !absolute inset-0 h-full !aspect-auto"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/35" aria-hidden="true" />

    <div class="container-site absolute inset-x-0 bottom-0 pb-8 md:pb-12">
      <p class="eyebrow mb-5 !text-paper/75" data-intro="0">{{ t('site.tagline') }}</p>
      <h1 class="font-display text-display-xl font-light" data-intro="1">{{ t('site.name') }}</h1>

      <div class="mt-8 grid gap-6 border-t border-paper/25 pt-6 md:grid-cols-12 md:items-end">
        <p class="max-w-md text-base text-paper/85 md:col-span-6 md:text-lg" data-intro="3">
          {{ t('home.philosophy') }}
        </p>
        <div class="flex items-center justify-between gap-6 md:col-span-6 md:justify-end" data-intro="4">
          <span class="eyebrow hidden items-center gap-3 !text-paper/60 md:flex" aria-hidden="true">
            <span class="scroll-line block h-8 w-px bg-paper/50" />{{ t('common.scroll') }}
          </span>
          <AppButton variant="light" :to="localePath('/projects')">{{ t('common.viewAll') }}</AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Slow settle on load — transform only, so it never delays LCP */
.hero-img :deep(img) { animation: hero-settle 2.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes hero-settle { from { transform: scale(1.08); } to { transform: scale(1); } }

.scroll-line { transform-origin: top; animation: scroll-line 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
@keyframes scroll-line {
  0% { transform: scaleY(0); transform-origin: top; }
  45% { transform: scaleY(1); transform-origin: top; }
  55% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
</style>
