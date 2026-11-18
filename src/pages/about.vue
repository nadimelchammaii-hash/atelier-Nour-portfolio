<script setup>
import { siteImages } from '~/data/projects'

const { t, tm } = useI18n()
useSeo({ title: () => t('about.title'), description: () => t('about.lead'), image: siteImages.studio.src })

// Arrays from the locale files: read the length with tm(), translate each field by key path
const list = (key, fields) =>
  Array.from({ length: tm(key).length }, (_, i) =>
    fields ? Object.fromEntries(fields.map((f) => [f, t(`${key}.${i}.${f}`)])) : t(`${key}.${i}`),
  )
const bio = computed(() => list('about.bio'))
const principles = computed(() => list('about.principles', ['title', 'text']))
const timeline = computed(() => list('about.timeline', ['year', 'title', 'text']))
const services = computed(() => list('about.services', ['title', 'text']))
const { num } = useProjects()
const pad = (i) => num(i + 1, { minimumIntegerDigits: 2 })
</script>

<template>
  <div>
    <!-- Intro -->
    <section class="container-site pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]">
      <p class="eyebrow" data-intro="0">{{ t('about.eyebrow') }}</p>
      <h1 class="font-display text-display-lg mt-8 max-w-6xl" data-intro="1">{{ t('about.lead') }}</h1>
    </section>

    <section class="pt-16 md:pt-24">
      <AppImage :src="siteImages.studio.src" :color="siteImages.studio.color" alt="" ratio="21/9" sizes="100vw" reveal class="max-md:!aspect-[4/3]" />
    </section>

    <!-- Bio -->
    <section class="container-site pt-section">
      <SectionHeading index="01" :eyebrow="t('about.bioEyebrow')" />
      <div class="grid-site mt-12 gap-y-10 md:mt-16">
        <div class="col-span-4 md:col-span-3 lg:col-span-4">
          <AppImage :src="siteImages.portrait.src" :color="siteImages.portrait.color" :alt="t('about.bioName')" ratio="4/5" sizes="100vw md:50vw lg:33vw" reveal />
        </div>
        <div class="col-span-4 md:col-span-3 lg:col-span-6 lg:col-start-7">
          <h2 class="font-display text-display-md" data-reveal>{{ t('about.bioName') }}</h2>
          <p class="eyebrow mt-3" data-reveal>{{ t('about.bioRole') }}</p>
          <div class="mt-10 max-w-prose space-y-6 text-ink-soft">
            <p v-for="(p, i) in bio" :key="i" data-reveal>{{ p }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section class="container-site pt-section">
      <SectionHeading index="02" :eyebrow="t('about.philosophyEyebrow')" :title="t('about.philosophyTitle')" />
      <ol class="mt-16 grid gap-x-8 gap-y-12 md:mt-24 md:grid-cols-3">
        <li v-for="(p, i) in principles" :key="i" class="border-t border-stone-line pt-6" data-reveal :data-reveal-delay="i * 0.08">
          <span class="font-display text-lg text-clay-dark">{{ pad(i) }}</span>
          <h3 class="font-display text-display-sm mt-6">{{ p.title }}</h3>
          <p class="mt-4 max-w-sm text-ink-soft">{{ p.text }}</p>
        </li>
      </ol>
    </section>

    <!-- Timeline -->
    <section class="container-site pt-section">
      <div class="grid-site gap-y-12">
        <div class="col-span-4 md:col-span-6 lg:col-span-4">
          <div class="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHeading index="03" :eyebrow="t('about.timelineEyebrow')" :title="t('about.timelineTitle')" />
          </div>
        </div>
        <ol class="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-6 lg:pt-24">
          <li
            v-for="(item, i) in timeline"
            :key="i"
            class="grid grid-cols-[5rem_1fr] gap-6 border-t border-stone-line py-8 md:grid-cols-[8rem_1fr]"
            data-reveal
          >
            <span class="font-display text-display-sm text-stone">{{ item.year }}</span>
            <div>
              <h3 class="text-base font-normal">{{ item.title }}</h3>
              <p class="mt-2 text-sm text-ink-soft">{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Services -->
    <section class="container-site pt-section">
      <SectionHeading index="04" :eyebrow="t('about.servicesEyebrow')" :title="t('about.servicesTitle')" />
      <ul class="mt-16 grid border-t border-stone-line sm:grid-cols-2 lg:grid-cols-4 md:mt-24">
        <li
          v-for="(s, i) in services"
          :key="i"
          class="border-b border-stone-line py-8 sm:pe-8 lg:border-b-0 lg:border-e lg:px-8 lg:first:ps-0 lg:last:border-e-0"
          data-reveal
          :data-reveal-delay="i * 0.06"
        >
          <span class="text-xs text-stone">{{ pad(i) }}</span>
          <h3 class="font-display text-display-sm mt-8">{{ s.title }}</h3>
          <p class="mt-4 text-sm text-ink-soft">{{ s.text }}</p>
        </li>
      </ul>
    </section>

    <ContactCta />
  </div>
</template>
