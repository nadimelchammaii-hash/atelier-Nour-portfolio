<script setup>
/** Previous / next project — large image tiles at the end of a project page. */
const props = defineProps({ slug: { type: String, required: true } })
const { t } = useI18n()
const localePath = useLocalePath()
const { tr, neighbours } = useProjects()
const nav = computed(() => neighbours(props.slug))
</script>

<template>
  <nav :aria-label="`${t('project.prev')} / ${t('project.next')}`" class="grid gap-x-8 gap-y-12 md:grid-cols-2">
    <NuxtLink
      v-for="(p, dir) in { prev: nav.prev, next: nav.next }"
      :key="dir"
      :to="localePath(`/projects/${p.slug}`)"
      class="group block"
      :class="dir === 'next' && 'md:text-end'"
      :rel="dir"
    >
      <p class="eyebrow mb-4 flex items-center gap-3" :class="dir === 'next' && 'md:justify-end'">
        <span v-if="dir === 'prev'" aria-hidden="true" class="inline-block transition-transform duration-500 group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1">←</span>
        {{ t(`project.${dir}`) }}
        <span v-if="dir === 'next'" aria-hidden="true" class="inline-block transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
      </p>
      <AppImage :src="p.cover.src" :color="p.cover.color" :alt="tr(p.title)" ratio="16/9" sizes="100vw md:50vw" zoom reveal />
      <p class="font-display text-display-sm mt-5">{{ tr(p.title) }}</p>
    </NuxtLink>
  </nav>
</template>
