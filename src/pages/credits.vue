<script setup>
import { allCredits } from '~/data/projects'

const { t } = useI18n()
useSeo({ title: () => t('credits.title'), description: () => t('credits.lead') })

const credits = allCredits()
// Unsplash attribution guidelines: link to the photographer and to Unsplash with UTM params
const UTM = '?utm_source=atelier_nour_demo&utm_medium=referral'
</script>

<template>
  <div class="container-site pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]">
    <div class="grid-site gap-y-10">
      <div class="col-span-4 md:col-span-6 lg:col-span-5">
        <h1 class="font-display text-display-lg" data-intro="0">{{ t('credits.title') }}</h1>
      </div>
      <div class="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
        <p class="text-ink-soft" data-intro="0">{{ t('credits.lead') }}</p>

        <ul v-if="credits.length" class="mt-12 border-t border-stone-line" data-reveal>
          <li v-for="c in credits" :key="c.username" class="flex items-baseline justify-between gap-4 border-b border-stone-line py-4">
            <a :href="`https://unsplash.com/@${c.username}${UTM}`" target="_blank" rel="noopener noreferrer" class="link-underline">{{ c.name }}</a>
            <span class="text-xs text-stone" dir="ltr">@{{ c.username }}</span>
          </li>
        </ul>
        <p v-else class="mt-12 border-t border-stone-line pt-6 text-sm text-stone" data-reveal>{{ t('credits.pending') }}</p>

        <p class="mt-10 text-sm" data-reveal>
          <a :href="`https://unsplash.com/license${UTM}`" target="_blank" rel="noopener noreferrer" class="link-underline">{{ t('credits.license') }}</a>
        </p>
        <p class="mt-6 text-xs text-stone" data-reveal>{{ t('credits.disclaimer') }}</p>
      </div>
    </div>
  </div>
</template>
