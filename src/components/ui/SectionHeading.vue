<script setup>
/** Hairline + index number + eyebrow, then large display title. */
defineProps({
  index: { type: String, default: '' }, // "01"
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  as: { type: String, default: 'h2' },
})
</script>

<template>
  <header>
    <div class="hairline flex items-baseline justify-between pt-4" data-reveal>
      <span class="eyebrow">{{ eyebrow }}</span>
      <span v-if="index" class="font-display text-lg text-stone">{{ index }}</span>
    </div>
    <component :is="as" v-if="title" class="font-display text-display-md mt-8 max-w-4xl md:mt-12" data-reveal data-reveal-delay="0.08">
      {{ title }}
    </component>
    <slot />
  </header>
</template>
