<script setup lang="ts">
interface Label {
  id: number
  name: string
  color: string
  description: string | null
}

import { getReadableTextColor } from '@/utils/color'

defineProps<{
  labels: Label[]
}>()

function getLabelStyle(hex: string) {
  return {
    backgroundColor: `#${hex}`,
    color: getReadableTextColor(hex) === 'light' ? 'var(--color-primary)' : 'var(--color-text)',
  }
}
</script>

<template>
  <div class="labels">
    <div v-for="label in labels" class="label" :style="getLabelStyle(label.color)">
      <span>{{ label.name }}</span>
    </div>
  </div>
</template>

<style>
.labels {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
}

.label {
  border-radius: 10px;
  padding: 3px 6px;
  font-size: 0.75rem;
}

@media (min-width: 480px) {
  .labels {
    gap: 10px;
  }

  .label {
    padding: 5px 8px;
    font-size: 0.875rem;
  }
}
</style>
