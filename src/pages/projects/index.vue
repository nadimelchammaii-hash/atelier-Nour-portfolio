<script setup>
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { projects, categories } = useProjects()

useSeo({ title: () => t('projects.title'), description: () => t('projects.intro'), image: projects[0].cover.src })

// Filter state — synced to ?category= after hydration (pages are prerendered as "all")
const filter = ref('all')
const filtered = ref(false) // first render uses scroll reveals; later renders use the CSS stagger
const list = computed(() => (filter.value === 'all' ? projects : projects.filter((p) => p.category === filter.value)))
const counts = computed(() =>
  Object.fromEntries([['all', projects.length], ...categories.map((c) => [c, projects.filter((p) => p.category === c).length])]),
)

onMounted(() => {
  const q = route.query.category
  if (categories.includes(q)) {
    filtered.value = true
    filter.value = q
  }
})
watch(filter, (v) => {
  filtered.value = true
  router.replace({ query: v === 'all' ? {} : { category: v } })
})

// Alternating editorial layout: wide-left / tall-right offset
const slot = (i) =>
  i % 2 === 0
    ? { cls: 'lg:col-span-6', ratio: '4/3', sizes: '100vw md:50vw' }
    : { cls: 'lg:col-span-5 lg:col-start-8 lg:mt-40', ratio: '4/5', sizes: '100vw md:50vw lg:42vw' }
</script>

<template>
  <div class="container-site pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]">
    <header class="grid-site gap-y-8">
      <h1 class="font-display text-display-xl col-span-4 md:col-span-6 lg:col-span-7" data-intro="0">{{ t('projects.title') }}</h1>
      <p class="col-span-4 max-w-sm self-end text-ink-soft md:col-span-4 lg:col-span-4 lg:col-start-9" data-intro="2">
        {{ t('projects.intro') }}
      </p>
    </header>

    <div class="mt-14 flex flex-col gap-4 border-y border-stone-line py-4 md:mt-20 md:flex-row md:items-center md:justify-between" data-intro="3">
      <ProjectFilter v-model="filter" :counts="counts" />
      <p class="text-xs text-stone" aria-live="polite">{{ t('projects.count', { n: list.length }, list.length) }}</p>
    </div>

    <Transition name="grid" mode="out-in">
      <ul :key="filter" class="grid-site mt-12 gap-y-16 md:mt-20 lg:gap-y-10">
        <li
          v-for="(p, i) in list"
          :key="p.slug"
          class="card col-span-4 md:col-span-3"
          :class="slot(i).cls"
          :style="{ '--i': i }"
        >
          <ProjectCard :project="p" :index="projects.indexOf(p)" :ratio="slot(i).ratio" :sizes="slot(i).sizes" :reveal="!filtered && i > 1" :eager="!filtered && i === 0" heading-tag="h2" />
        </li>
        <li v-if="!list.length" class="col-span-full py-20 text-center text-stone">{{ t('projects.empty') }}</li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
/* Filtering: old grid fades out, new cards rise in with a short stagger */
.grid-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.grid-leave-to { opacity: 0; transform: translateY(8px); }
/* Vue times the enter phase from the <ul>'s own transition — keep it long enough for the stagger */
.grid-enter-active { transition: opacity 1.5s linear; }
.grid-enter-from { opacity: 0.99; }
.grid-enter-active .card {
  animation: card-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 70ms);
}
@keyframes card-in {
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: none; }
}
</style>
