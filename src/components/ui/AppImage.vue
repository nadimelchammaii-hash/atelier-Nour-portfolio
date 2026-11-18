<script setup>
/**
 * Optimised Unsplash image.
 * - Fixed aspect-ratio box → zero layout shift
 * - Solid dominant-colour placeholder, image fades in once decoded
 * - Responsive srcset/sizes via @nuxt/image (Unsplash provider, WebP)
 * - Lazy by default; pass `eager` for the LCP/hero image only
 * - `reveal` adds the clip-path wipe on scroll (see plugins/motion.client.js)
 */
const props = defineProps({
  src: { type: String, required: true }, // Unsplash path, e.g. "photo-1600585154340-be6161a56a0c"
  alt: { type: String, default: '' },
  ratio: { type: String, default: '4/3' }, // "w/h"
  sizes: { type: String, default: '100vw' }, // @nuxt/image sizes syntax: "100vw md:50vw lg:33vw"
  color: { type: String, default: '#D9D4CC' },
  eager: { type: Boolean, default: false },
  reveal: { type: Boolean, default: false },
  revealDelay: { type: [Number, String], default: 0 },
  zoom: { type: Boolean, default: false }, // slight scale on hover of a parent `.group`
  position: { type: String, default: 'center' }, // object-position
  imgClass: { type: String, default: '' },
})

const [rw, rh] = props.ratio.split('/').map(Number)
// Base intrinsic size — @nuxt/image keeps this ratio for every srcset width
const width = 1600
const height = Math.round((width * rh) / rw)

/**
 * @nuxt/image only emits srcset candidates for the breakpoints named in `sizes`
 * (a bare "100vw" maps to a 1px screen → 1–2px images). Expand the shorthand so every
 * breakpoint gets a candidate, carrying the last value forward: "100vw lg:50vw" →
 * "xs:100vw sm:100vw md:100vw lg:50vw xl:50vw …".
 */
const SCREENS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', '2xl']
const fullSizes = computed(() => {
  const map = {}
  for (const entry of props.sizes.split(/\s+/).filter(Boolean)) {
    const [k, v] = entry.includes(':') ? entry.split(':') : ['xs', entry]
    map[k] = v
  }
  let last = map.xs || '100vw'
  return SCREENS.map((s) => `${s}:${(last = map[s] || last)}`).join(' ')
})

const loaded = ref(props.eager)
const imgRef = ref(null)

onMounted(() => {
  const el = imgRef.value?.$el
  if (el?.complete && el.naturalWidth) loaded.value = true
})
</script>

<template>
  <div
    class="relative overflow-hidden"
    :style="{ aspectRatio: `${rw} / ${rh}`, backgroundColor: color }"
    :data-reveal-img="reveal ? '' : undefined"
    :data-reveal-delay="reveal && revealDelay ? revealDelay : undefined"
  >
    <NuxtImg
      ref="imgRef"
      provider="unsplash"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :sizes="fullSizes"
      fit="cover"
      :modifiers="{ auto: 'format' }"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      :preload="eager ? { fetchPriority: 'high' } : false"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1.2s] ease-out"
      :class="[
        loaded ? 'opacity-100' : 'opacity-0',
        zoom ? 'group-hover:scale-[1.04] group-focus-visible:scale-[1.04]' : '',
        imgClass,
      ]"
      :style="{ objectPosition: position }"
      @load="loaded = true"
    />
  </div>
</template>
