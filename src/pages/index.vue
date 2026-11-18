<script setup>
import { siteImages } from '~/data/projects'

definePageMeta({ overlayHeader: true })
const { t } = useI18n()
useSeo({ description: () => t('home.philosophy') + ' ' + t('site.description'), image: siteImages.hero.src })
</script>

<template>
  <div>
    <HomeHero :image="siteImages.hero" />
    <FeaturedProjects />
    <AboutTeaser :image="siteImages.about" />
    <ContactCta />
  </div>
</template>
