<script setup>
/** Asymmetric editorial grid of featured projects (big / small, offset). */
const { t } = useI18n()
const localePath = useLocalePath()
const { featured } = useProjects()

// Layout slots on the 12-col grid — cycles if more projects are featured
const slots = [
  { cls: 'lg:col-span-7', ratio: '3/2', sizes: '100vw md:50vw lg:58vw' },
  { cls: 'lg:col-span-4 lg:col-start-9 lg:mt-40', ratio: '4/5', sizes: '100vw md:50vw lg:33vw' },
  { cls: 'lg:col-span-4 lg:col-start-2', ratio: '4/5', sizes: '100vw md:50vw lg:33vw' },
  { cls: 'lg:col-span-6 lg:col-start-7 lg:mt-28', ratio: '3/2', sizes: '100vw md:50vw lg:50vw' },
]
</script>

<template>
  <section class="container-site pt-section">
    <SectionHeading index="01" :eyebrow="t('home.featuredEyebrow')" :title="t('home.featuredTitle')" />

    <ul class="grid-site mt-16 gap-y-16 md:mt-24 lg:gap-y-24">
      <li v-for="(p, i) in featured" :key="p.slug" class="col-span-4 md:col-span-3" :class="slots[i % slots.length].cls">
        <ProjectCard :project="p" :index="i" :ratio="slots[i % slots.length].ratio" :sizes="slots[i % slots.length].sizes" />
      </li>
    </ul>

    <div class="mt-20 flex justify-center" data-reveal>
      <AppButton variant="outline" :to="localePath('/projects')">{{ t('common.viewAll') }}</AppButton>
    </div>
  </section>
</template>
