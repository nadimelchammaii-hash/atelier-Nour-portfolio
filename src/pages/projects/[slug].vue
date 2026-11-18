<script setup>
definePageMeta({ overlayHeader: true })

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { tr, bySlug } = useProjects()

const project = computed(() => bySlug(route.params.slug))
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeo({
  title: () => tr(project.value.title),
  description: () => tr(project.value.excerpt),
  image: () => project.value.cover.src,
  type: 'article',
})
</script>

<template>
  <article v-if="project">
    <!-- Cover -->
    <header class="relative h-[85svh] min-h-[520px] w-full overflow-hidden bg-ink text-paper">
      <AppImage
        :src="project.cover.src"
        :color="project.cover.color"
        :alt="tr(project.title)"
        ratio="16/9"
        sizes="100vw"
        eager
        class="!absolute inset-0 h-full !aspect-auto"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/35" aria-hidden="true" />
      <div class="container-site absolute inset-x-0 bottom-0 pb-8 md:pb-12">
        <NuxtLink :to="localePath('/projects')" class="eyebrow link-underline mb-6 inline-block !text-paper/75" data-intro="0">
          <span aria-hidden="true" class="inline-block rtl:-scale-x-100">←</span> {{ t('project.back') }}
        </NuxtLink>
        <h1 class="font-display text-display-lg max-w-5xl" data-intro="1">{{ tr(project.title) }}</h1>
        <p class="mt-4 text-paper/80" data-intro="3">{{ tr(project.location) }}</p>
      </div>
    </header>

    <!-- Info + description -->
    <section class="container-site pt-16 md:pt-24">
      <div data-reveal><ProjectMeta :project="project" /></div>

      <div class="grid-site mt-16 gap-y-8 md:mt-24">
        <div class="col-span-4 md:col-span-2 lg:col-span-4">
          <p class="eyebrow lg:sticky lg:top-[calc(var(--header-h)+2rem)]" data-reveal>{{ t('project.overview') }}</p>
        </div>
        <div class="col-span-4 md:col-span-4 lg:col-span-7 lg:col-start-6">
          <p class="font-display text-display-sm" data-reveal>{{ tr(project.excerpt) }}</p>
          <div class="mt-10 max-w-prose space-y-6 text-ink-soft">
            <p v-for="(para, i) in tr(project.description)" :key="i" data-reveal>{{ para }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="container-site pt-section" :aria-label="t('project.gallery')">
      <ProjectGallery :images="project.gallery" :title="tr(project.title)" />
    </section>

    <!-- Prev / next -->
    <section class="container-site pt-section">
      <div class="hairline pt-10 md:pt-16">
        <ProjectNav :slug="project.slug" />
      </div>
    </section>
  </article>
</template>
