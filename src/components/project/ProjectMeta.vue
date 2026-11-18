<script setup>
/** Location / Year / Area / Category in a hairline definition row. */
defineProps({ project: { type: Object, required: true } })
const { t } = useI18n()
const { tr, num, year } = useProjects()
</script>

<template>
  <dl class="grid grid-cols-2 border-t border-stone-line md:grid-cols-4">
    <div class="border-b border-stone-line py-5 pe-4 md:border-b-0">
      <dt class="eyebrow mb-2">{{ t('project.location') }}</dt>
      <dd>{{ tr(project.location) }}</dd>
    </div>
    <div class="border-b border-stone-line py-5 pe-4 md:border-b-0">
      <dt class="eyebrow mb-2">{{ t('project.year') }}</dt>
      <dd>{{ year(project.year) }}</dd>
    </div>
    <div class="py-5 pe-4">
      <dt class="eyebrow mb-2">{{ t('project.area') }}</dt>
      <dd>{{ num(project.area) }} {{ t('project.areaUnit') }}</dd>
    </div>
    <div class="py-5 pe-4">
      <dt class="eyebrow mb-2">{{ t('project.category') }}</dt>
      <dd>{{ t(`categories.${project.category}`) }}</dd>
    </div>
  </dl>
</template>
