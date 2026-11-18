<script setup>
/** Category filter — a radio-style button group with counts. */
const model = defineModel({ type: String, default: 'all' })
const props = defineProps({ counts: { type: Object, required: true } })
const { t } = useI18n()
const { categories, num } = useProjects()
const options = computed(() => ['all', ...categories])
</script>

<template>
  <div role="group" :aria-label="t('projects.filterLabel')" class="flex flex-wrap gap-x-8 gap-y-3">
    <button
      v-for="c in options"
      :key="c"
      type="button"
      :aria-pressed="model === c"
      class="group flex items-baseline gap-2 py-2 text-sm transition-colors duration-300"
      :class="model === c ? 'text-ink' : 'text-stone hover:text-ink'"
      @click="model = c"
    >
      <span class="relative">
        {{ t(`categories.${c}`) }}
        <span
          class="absolute -bottom-1 start-0 h-px bg-current transition-[width] duration-500 ease-out"
          :class="model === c ? 'w-full' : 'w-0 group-hover:w-full'"
        />
      </span>
      <sup class="text-[10px] text-stone">{{ num(props.counts[c] ?? 0) }}</sup>
    </button>
  </div>
</template>
