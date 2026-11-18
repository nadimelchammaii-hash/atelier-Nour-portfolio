<script setup>
/**
 * Fullscreen image viewer.
 * - Esc closes; ←/→ navigate (mirrored in RTL); swipe on touch devices
 * - Focus is trapped inside and returned to the trigger on close
 * - Smooth scroll is paused while open
 */
const props = defineProps({
  images: { type: Array, required: true },
  title: { type: String, default: '' },
})
const index = defineModel('index', { type: Number, default: 0 })
const emit = defineEmits(['close'])

const { t, locale } = useI18n()
const { num } = useProjects()
const { $motion } = useNuxtApp()

const dialog = ref(null)
const closeBtn = ref(null)
const visible = ref(false)
const loaded = ref(false)
let opener = null

const total = computed(() => props.images.length)
const image = computed(() => props.images[index.value])
const rtl = computed(() => locale.value === 'ar')

function go(step) {
  loaded.value = false
  index.value = (index.value + step + total.value) % total.value
}
function close() {
  visible.value = false
  setTimeout(() => emit('close'), 300)
}

function onKey(e) {
  if (e.key === 'Escape') return close()
  if (e.key === 'ArrowRight') return go(rtl.value ? -1 : 1)
  if (e.key === 'ArrowLeft') return go(rtl.value ? 1 : -1)
  if (e.key === 'Tab') {
    // simple focus trap
    const f = [...dialog.value.querySelectorAll('button')]
    const first = f[0]
    const last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

// Swipe
let startX = null
function onPointerDown(e) {
  startX = e.clientX
}
function onPointerUp(e) {
  if (startX === null) return
  const dx = e.clientX - startX
  startX = null
  if (Math.abs(dx) < 50) return
  const forward = dx < 0 ? 1 : -1 // swipe left → next (LTR)
  go(rtl.value ? -forward : forward)
}

onMounted(() => {
  opener = document.activeElement
  $motion?.state.lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
  requestAnimationFrame(() => {
    visible.value = true
    closeBtn.value?.focus()
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
  $motion?.state.lenis?.start()
  opener?.focus?.()
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="t('lightbox.label')"
      class="fixed inset-0 z-[70] flex flex-col bg-ink/[0.97] text-paper transition-opacity duration-300"
      :class="visible ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Top bar -->
      <div class="container-site flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <p class="text-xs uppercase tracking-[0.14em] text-paper/70 rtl:tracking-normal rtl:text-sm" aria-live="polite">
          <span class="hidden sm:inline">{{ title }} — </span>{{ t('lightbox.counter', { n: num(index + 1), total: num(total) }) }}
        </p>
        <button ref="closeBtn" type="button" class="flex h-11 items-center gap-3 text-xs uppercase tracking-[0.14em] rtl:tracking-normal rtl:text-sm" @click="close">
          <span class="hidden sm:inline">{{ t('lightbox.close') }}</span>
          <svg class="h-4 w-4" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 1l14 14M15 1L1 15" stroke="currentColor" stroke-width="1.2" /></svg>
        </button>
      </div>

      <!-- Image -->
      <div class="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center px-gutter pb-6" @pointerdown="onPointerDown" @pointerup="onPointerUp">
        <Transition name="lb" mode="out-in">
          <NuxtImg
            :key="image.src + index"
            provider="unsplash"
            :src="image.src"
            :alt="t('project.imageAlt', { title, n: index + 1 })"
            sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw"
            :modifiers="{ auto: 'format' }"
            :quality="80"
            class="max-h-full max-w-full object-contain transition-opacity duration-500"
            :class="loaded ? 'opacity-100' : 'opacity-0'"
            draggable="false"
            @load="loaded = true"
          />
        </Transition>
        <div v-if="!loaded" class="pointer-events-none absolute inset-0 m-auto h-px w-16 animate-pulse bg-paper/40" aria-hidden="true" />

        <!-- Prev / next -->
        <button
          type="button"
          :aria-label="t('lightbox.prev')"
          class="group absolute inset-y-0 start-0 hidden w-1/4 items-center justify-start ps-gutter md:flex"
          @click="go(-1)"
        >
          <span class="flex h-12 w-12 items-center justify-center border border-paper/30 transition-colors group-hover:bg-paper group-hover:text-ink">
            <svg class="h-3.5 w-4 rotate-180 rtl:rotate-0" viewBox="0 0 16 14" fill="none" aria-hidden="true"><path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="1.2" /></svg>
          </span>
        </button>
        <button
          type="button"
          :aria-label="t('lightbox.next')"
          class="group absolute inset-y-0 end-0 hidden w-1/4 items-center justify-end pe-gutter md:flex"
          @click="go(1)"
        >
          <span class="flex h-12 w-12 items-center justify-center border border-paper/30 transition-colors group-hover:bg-paper group-hover:text-ink">
            <svg class="h-3.5 w-4 rtl:rotate-180" viewBox="0 0 16 14" fill="none" aria-hidden="true"><path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="1.2" /></svg>
          </span>
        </button>
      </div>

      <!-- Mobile controls -->
      <div class="container-site flex shrink-0 justify-between pb-6 md:hidden">
        <button type="button" class="h-11 px-2 text-xs uppercase tracking-[0.14em] rtl:tracking-normal rtl:text-sm" @click="go(-1)">{{ t('lightbox.prev') }}</button>
        <button type="button" class="h-11 px-2 text-xs uppercase tracking-[0.14em] rtl:tracking-normal rtl:text-sm" @click="go(1)">{{ t('lightbox.next') }}</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.lb-enter-active,
.lb-leave-active { transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.lb-enter-from { opacity: 0; transform: scale(0.985); }
.lb-leave-to { opacity: 0; }
</style>
