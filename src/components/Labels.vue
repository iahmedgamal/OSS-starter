<script setup lang="ts">
interface Label {
  id: number
  name: string
  color: string
  description: string | null
}

defineProps<{
  labels: Label[]
}>()
</script>

<template>
  <div class="labels">
    <div v-for="label in labels" class="label" :style="{ backgroundColor: `#${label.color}` }">
      <span>{{ label.name }}</span>
    </div>
  </div>
</template>

<style>
.labels {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.label {
  /* border: 1px solid white; */
  border-radius: 10px;
  padding: 5px;
}
</style>
