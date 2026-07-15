<script setup lang="ts">
defineProps<{ languages: string[]; selected: string }>()
defineEmits<{ select: [lang: string] }>()
</script>

<template>
  <div class="lang-tabs">
    <button
      v-for="lang in languages"
      :key="lang"
      :class="{ active: selected === lang }"
      @click="$emit('select', lang)"
      :data-cy="`language-tab-${lang}`"
    >
      {{ lang }}
    </button>
  </div>
</template>

<style scoped>
.lang-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

button {
  padding: 4px 14px;
  border-radius: 20px;
  border: 1px solid var(--color-accent-glow);
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.85rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

button:hover,
button.active {
  border-color: var(--color-accent);
}

button.active {
  color: var(--color-accent);
  box-shadow: 0 0 10px var(--color-accent-glow);
}
</style>
