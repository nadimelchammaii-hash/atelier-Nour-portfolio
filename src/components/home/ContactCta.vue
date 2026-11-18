<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="container-site pt-section">
    <div class="hairline grid-site gap-y-10 pt-10 md:pt-16">
      <p class="eyebrow col-span-4 md:col-span-6 lg:col-span-3" data-reveal>{{ t('home.ctaEyebrow') }}</p>
      <div class="col-span-4 md:col-span-6 lg:col-span-9">
        <h2 class="font-display text-display-lg max-w-5xl" data-reveal>{{ t('home.ctaTitle') }}</h2>
        <div class="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p class="max-w-md text-ink-soft" data-reveal data-reveal-delay="0.1">{{ t('home.ctaText') }}</p>
          <div data-reveal data-reveal-delay="0.15">
            <AppButton :to="localePath('/contact')">{{ t('common.getInTouch') }}</AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
