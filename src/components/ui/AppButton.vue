<script setup>
/** Boxed button / link with a sliding arrow. Arrow mirrors automatically in RTL. */
const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'solid' }, // solid | outline | light
  arrow: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
})

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))
const variants = {
  solid: 'bg-ink text-paper hover:bg-clay border-ink hover:border-clay',
  outline: 'border-ink text-ink hover:bg-ink hover:text-paper',
  light: 'border-paper/70 text-paper hover:bg-paper hover:text-ink',
}
</script>

<template>
  <component
    :is="tag"
    :to="to || undefined"
    :href="href || undefined"
    :type="!to && !href ? type : undefined"
    :disabled="disabled || undefined"
    class="group/btn inline-flex min-h-12 items-center justify-between gap-6 border px-5 py-3 text-xs font-normal uppercase tracking-[0.14em] transition-colors duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 rtl:tracking-normal rtl:text-sm"
    :class="variants[variant]"
  >
    <span><slot /></span>
    <svg
      v-if="arrow"
      class="h-3.5 w-4 shrink-0 transition-transform duration-500 ease-out group-hover/btn:translate-x-1 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-1"
      viewBox="0 0 16 14"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="1.2" />
    </svg>
  </component>
</template>
