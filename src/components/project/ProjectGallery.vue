<script setup>
/**
 * Editorial gallery: wide images (16/9, 3/2) span the full width, portrait
 * images (4/5) sit side by side. Clicking opens the fullscreen lightbox,
 * which is a lazy component — its code only downloads on first open.
 */
const props = defineProps({
  images: { type: Array, required: true },
  title: { type: String, required: true },
})
const { t } = useI18n()

const isWide = (im) => {
  const [w, h] = im.ratio.split('/').map(Number)
  return w / h > 1
}

const open = ref(false)
const current = ref(0)
function show(i) {
  current.value = i
  open.value = true
}
</script>

<template>
  <div>
    <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <li v-for="(im, i) in images" :key="i" :class="isWide(im) ? 'md:col-span-2' : ''">
        <button
          type="button"
          class="group relative block w-full cursor-zoom-in"
          :aria-label="t('project.openImage', { n: i + 1, total: images.length })"
          @click="show(i)"
        >
          <AppImage
            :src="im.src"
            :color="im.color"
            :ratio="im.ratio"
            :alt="t('project.imageAlt', { title, n: i + 1 })"
            :sizes="isWide(im) ? '100vw' : '100vw md:50vw'"
            reveal
            zoom
          />
        </button>
      </li>
    </ul>

    <LazyLightbox v-if="open" v-model:index="current" :images="images" :title="title" @close="open = false" />
  </div>
</template>
