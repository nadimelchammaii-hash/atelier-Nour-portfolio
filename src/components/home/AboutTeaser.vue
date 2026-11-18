<script setup>
defineProps({ image: { type: Object, required: true } })
const { t } = useI18n()
const localePath = useLocalePath()
const { num } = useProjects()
const stats = [
  { value: 12, key: 'years' },
  { value: 64, key: 'projects' },
  { value: 7, key: 'awards' },
]
</script>

<template>
  <section class="container-site pt-section">
    <SectionHeading index="02" :eyebrow="t('home.aboutEyebrow')" />

    <div class="grid-site mt-12 gap-y-12 md:mt-16">
      <div class="col-span-4 md:col-span-3 lg:col-span-5">
        <AppImage :src="image.src" :color="image.color" alt="" ratio="4/5" sizes="100vw md:50vw lg:42vw" reveal />
      </div>

      <div class="col-span-4 flex flex-col justify-between md:col-span-3 lg:col-span-6 lg:col-start-7">
        <div>
          <h2 class="font-display text-display-md" data-reveal>{{ t('home.aboutTitle') }}</h2>
          <p class="mt-8 max-w-prose text-ink-soft" data-reveal data-reveal-delay="0.1">{{ t('home.aboutText') }}</p>
          <div class="mt-10" data-reveal data-reveal-delay="0.15">
            <AppButton variant="outline" :to="localePath('/about')">{{ t('home.aboutLink') }}</AppButton>
          </div>
        </div>

        <dl class="mt-16 grid grid-cols-3 border-t border-stone-line pt-6">
          <div v-for="(s, i) in stats" :key="s.key" class="flex flex-col-reverse" data-reveal :data-reveal-delay="i * 0.08">
            <dt class="mt-2 text-xs text-stone">{{ t(`home.stats.${s.key}`) }}</dt>
            <dd class="font-display text-display-md">{{ num(s.value) }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
