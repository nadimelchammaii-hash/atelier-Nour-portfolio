<script setup>
/**
 * Contact page.
 * ⚠️ DEMO ONLY — this site is statically generated and has NO backend.
 *    `submit()` only simulates a network request and shows the success state.
 *    To make it real, POST `form` to a service such as Formspree, Web3Forms,
 *    Netlify Forms or a Vercel serverless function inside `submit()`.
 */
import { siteImages } from '~/data/projects'

const { t } = useI18n()
useSeo({ title: () => t('contact.title'), description: () => t('contact.lead'), image: siteImages.contact.src })

// Fictional studio details
const STUDIO = {
  email: 'studio@ateliernour.example',
  phone: '+961 1 000 000',
  phoneHref: 'tel:+9611000000',
  whatsapp: 'https://wa.me/9611000000', // demo number
}
const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
]

const form = reactive({ name: '', email: '', phone: '', message: '' })
const touched = reactive({ name: false, email: false, phone: false, message: false })
const status = ref('idle') // idle | sending | sent
const showSummary = ref(false)
const sentName = ref('')

const rules = {
  name: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  phone: (v) => !v.trim() || /^\+?[\d\s().-]{7,20}$/.test(v.trim()),
  message: (v) => v.trim().length >= 20,
}
const errors = computed(() => Object.fromEntries(Object.keys(rules).map((k) => [k, !rules[k](form[k])])))
const invalid = (k) => touched[k] && errors.value[k]
const hasErrors = computed(() => Object.values(errors.value).some(Boolean))

const fields = ref({})
async function submit() {
  Object.keys(touched).forEach((k) => (touched[k] = true))
  if (hasErrors.value) {
    showSummary.value = true
    const first = Object.keys(rules).find((k) => errors.value[k])
    fields.value[first]?.focus()
    return
  }
  showSummary.value = false
  status.value = 'sending'
  // Simulated request — replace with a real POST when connecting a form service
  await new Promise((r) => setTimeout(r, 900))
  sentName.value = form.name.trim().split(' ')[0]
  status.value = 'sent' // focus moves to the message in onAfterEnter (after the fade)
}

function onAfterEnter(el) {
  if (status.value === 'sent') el.focus()
}

function reset() {
  Object.assign(form, { name: '', email: '', phone: '', message: '' })
  Object.keys(touched).forEach((k) => (touched[k] = false))
  status.value = 'idle'
}

const inputCls =
  'peer block w-full border-0 border-b bg-transparent px-0 py-3 text-base text-ink placeholder:text-stone-light focus:outline-none focus:ring-0 transition-colors'
const lineCls = (k) => (invalid(k) ? 'border-clay-dark' : 'border-stone-line focus:border-ink')
</script>

<template>
  <div class="container-site pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]">
    <header class="grid-site gap-y-8">
      <div class="col-span-4 md:col-span-6 lg:col-span-7">
        <p class="eyebrow" data-intro="0">{{ t('contact.eyebrow') }}</p>
        <h1 class="font-display text-display-xl mt-6" data-intro="1">{{ t('contact.title') }}</h1>
      </div>
      <p class="col-span-4 max-w-sm self-end text-ink-soft md:col-span-4 lg:col-span-4 lg:col-start-9" data-intro="2">
        {{ t('contact.lead') }}
      </p>
    </header>

    <div class="grid-site mt-16 gap-y-16 border-t border-stone-line pt-12 md:mt-24 md:pt-16">
      <!-- Form -->
      <!-- reveal sits on the wrapper: the form is re-created after "send another message" -->
      <div class="col-span-4 md:col-span-6 lg:col-span-7" data-reveal>
        <Transition name="fade" mode="out-in" @after-enter="onAfterEnter">
          <form v-if="status !== 'sent'" novalidate class="space-y-10" @submit.prevent="submit">
            <p v-if="showSummary && hasErrors" role="alert" class="border-s-2 border-clay-dark ps-4 text-sm text-clay-dark">
              {{ t('contact.errors.summary') }}
            </p>

            <div class="grid gap-10 md:grid-cols-2">
              <!-- Name -->
              <div>
                <label for="f-name" class="eyebrow">{{ t('contact.form.name') }} <span aria-hidden="true">*</span></label>
                <input
                  id="f-name"
                  :ref="(el) => (fields.name = el)"
                  v-model="form.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  required
                  :aria-invalid="invalid('name')"
                  :aria-describedby="invalid('name') ? 'e-name' : undefined"
                  :class="[inputCls, lineCls('name')]"
                  @blur="touched.name = true"
                />
                <p v-if="invalid('name')" id="e-name" class="mt-2 text-xs text-clay-dark">{{ t('contact.errors.name') }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="f-email" class="eyebrow">{{ t('contact.form.email') }} <span aria-hidden="true">*</span></label>
                <input
                  id="f-email"
                  :ref="(el) => (fields.email = el)"
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  inputmode="email"
                  dir="ltr"
                  required
                  :aria-invalid="invalid('email')"
                  :aria-describedby="invalid('email') ? 'e-email' : undefined"
                  :class="[inputCls, lineCls('email'), 'rtl:text-right']"
                  @blur="touched.email = true"
                />
                <p v-if="invalid('email')" id="e-email" class="mt-2 text-xs text-clay-dark">{{ t('contact.errors.email') }}</p>
              </div>
            </div>

            <!-- Phone -->
            <div>
              <label for="f-phone" class="eyebrow">{{ t('contact.form.phone') }}</label>
              <input
                id="f-phone"
                :ref="(el) => (fields.phone = el)"
                v-model="form.phone"
                type="tel"
                name="phone"
                autocomplete="tel"
                inputmode="tel"
                dir="ltr"
                :aria-invalid="invalid('phone')"
                :aria-describedby="invalid('phone') ? 'e-phone' : undefined"
                :class="[inputCls, lineCls('phone'), 'rtl:text-right']"
                @blur="touched.phone = true"
              />
              <p v-if="invalid('phone')" id="e-phone" class="mt-2 text-xs text-clay-dark">{{ t('contact.errors.phone') }}</p>
            </div>

            <!-- Message -->
            <div>
              <label for="f-message" class="eyebrow">{{ t('contact.form.message') }} <span aria-hidden="true">*</span></label>
              <textarea
                id="f-message"
                :ref="(el) => (fields.message = el)"
                v-model="form.message"
                name="message"
                rows="5"
                required
                :placeholder="t('contact.form.messagePlaceholder')"
                :aria-invalid="invalid('message')"
                :aria-describedby="invalid('message') ? 'e-message' : undefined"
                :class="[inputCls, lineCls('message'), 'resize-y']"
                @blur="touched.message = true"
              />
              <p v-if="invalid('message')" id="e-message" class="mt-2 text-xs text-clay-dark">{{ t('contact.errors.message') }}</p>
            </div>

            <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <AppButton type="submit" :disabled="status === 'sending'">
                {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.submit') }}
              </AppButton>
              <p class="text-xs text-stone">{{ t('contact.form.demoNote') }}</p>
            </div>
          </form>

          <div v-else id="form-success" tabindex="-1" role="status" class="py-8 focus:outline-none">
            <span class="flex h-12 w-12 items-center justify-center border border-ink" aria-hidden="true">
              <svg class="h-4 w-5" viewBox="0 0 20 16" fill="none"><path d="M1 8l6 6L19 2" stroke="currentColor" stroke-width="1.3" /></svg>
            </span>
            <h2 class="font-display text-display-md mt-8">{{ t('contact.success.title', { name: sentName }) }}</h2>
            <p class="mt-4 max-w-prose text-ink-soft">{{ t('contact.success.text') }}</p>
            <button type="button" class="link-underline mt-10 text-sm" @click="reset">{{ t('contact.success.again') }}</button>
          </div>
        </Transition>
      </div>

      <!-- Details -->
      <aside class="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
        <div class="space-y-10">
          <div class="flex flex-col gap-3 sm:flex-row lg:flex-col" data-reveal>
            <AppButton :href="STUDIO.whatsapp" target="_blank" rel="noopener noreferrer">
              <span class="flex items-center gap-3">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z"/></svg>
                {{ t('contact.whatsapp') }}
              </span>
            </AppButton>
            <AppButton :href="STUDIO.phoneHref" variant="outline">
              <span class="flex items-center gap-3">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>
                {{ t('contact.call') }}
              </span>
            </AppButton>
          </div>

          <dl class="space-y-8 border-t border-stone-line pt-8 text-sm">
            <div data-reveal>
              <dt class="eyebrow mb-2">{{ t('contact.studio') }}</dt>
              <dd>{{ t('footer.address') }}<br /><span class="text-stone">{{ t('contact.hours') }}</span></dd>
            </div>
            <div data-reveal>
              <dt class="eyebrow mb-2">{{ t('contact.email') }}</dt>
              <dd><a :href="`mailto:${STUDIO.email}`" class="link-underline">{{ STUDIO.email }}</a></dd>
            </div>
            <div data-reveal>
              <dt class="eyebrow mb-2">{{ t('contact.phone') }}</dt>
              <dd><a :href="STUDIO.phoneHref" class="link-underline" dir="ltr">{{ STUDIO.phone }}</a></dd>
            </div>
            <div data-reveal>
              <dt class="eyebrow mb-2">{{ t('contact.social') }}</dt>
              <dd class="flex flex-wrap gap-x-6 gap-y-2">
                <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer" class="link-underline">{{ s.label }}</a>
              </dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
