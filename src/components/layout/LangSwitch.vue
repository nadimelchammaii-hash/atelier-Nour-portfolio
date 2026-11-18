<script setup>
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const target = computed(() => (locale.value === 'en' ? 'ar' : 'en'))
</script>

<template>
  <NuxtLink
    :to="switchLocalePath(target)"
    :lang="target"
    :hreflang="target"
    :aria-label="`${t('lang.switch')}: ${t('lang.target')}`"
    class="inline-flex h-10 min-w-10 items-center justify-center border border-current px-3 text-xs tracking-[0.1em] transition-colors duration-300 hover:bg-ink hover:text-paper hover:border-ink"
  >
    <span :class="target === 'ar' ? 'font-arabic text-sm tracking-normal' : 'font-sans'">
      {{ target === 'ar' ? 'ع' : 'EN' }}
    </span>
  </NuxtLink>
</template>
