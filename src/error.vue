<script setup>
const props = defineProps({ error: { type: Object, default: null } })
const { t } = useI18n()
const localePath = useLocalePath()
const is404 = computed(() => props.error?.statusCode === 404)
useHead({ title: () => (is404.value ? '404' : t('error.generic')) })
</script>

<template>
  <NuxtLayout>
    <section class="container-site flex min-h-[70svh] flex-col justify-end pb-10 pt-[calc(var(--header-h)+4rem)]">
      <p class="font-display text-display-xl text-stone-light">{{ error?.statusCode || 500 }}</p>
      <div class="hairline mt-8 flex flex-col gap-6 pt-6 md:flex-row md:items-center md:justify-between">
        <h1 class="font-display text-display-sm">{{ is404 ? t('error.notFound') : t('error.generic') }}</h1>
        <AppButton variant="outline" @click="clearError({ redirect: localePath('/') })">{{ t('error.home') }}</AppButton>
      </div>
    </section>
  </NuxtLayout>
</template>
