<script setup>
/** Project tile: image (slight zoom on hover) + "TITLE — LOCATION" meta row. */
const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
  ratio: { type: String, default: '4/5' },
  sizes: { type: String, default: '100vw md:50vw' },
  reveal: { type: Boolean, default: true },
  headingTag: { type: String, default: 'h3' },
  eager: { type: Boolean, default: false }, // above-the-fold card: load immediately, no wipe
})
const { t } = useI18n()
const localePath = useLocalePath()
const { tr, year } = useProjects()
const number = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <NuxtLink :to="localePath(`/projects/${project.slug}`)" class="group block">
    <AppImage
      :src="project.cover.src"
      :color="project.cover.color"
      :alt="tr(project.title)"
      :ratio="ratio"
      :sizes="sizes"
      :reveal="reveal && !eager"
      :eager="eager"
      zoom
    />
    <div class="mt-4 flex items-baseline justify-between gap-4 border-t border-stone-line pt-3" :data-reveal="reveal ? '' : undefined">
      <div class="flex items-baseline gap-4">
        <span class="font-display text-lg text-stone" aria-hidden="true">{{ number }}</span>
        <component :is="headingTag" class="text-xs font-normal uppercase tracking-[0.12em] rtl:text-sm rtl:tracking-normal">
          <span class="link-underline">{{ tr(project.title) }}</span>
        </component>
      </div>
      <p class="shrink-0 text-xs uppercase tracking-[0.12em] text-stone rtl:text-sm rtl:tracking-normal">
        {{ tr(project.location).split(/[,،]/)[0] }} · {{ year(project.year) }}
      </p>
    </div>
    <span class="sr-only">{{ t(`categories.${project.category}`) }}</span>
  </NuxtLink>
</template>
