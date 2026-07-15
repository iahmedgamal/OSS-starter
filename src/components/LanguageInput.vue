<script setup lang="ts">
import { ref, computed } from 'vue'
import { ALL_LANGUAGES } from '@/utils/languages'

const props = defineProps<{ added: string[] }>()
const emit = defineEmits<{ add: [lang: string] }>()

const input = ref('')

const suggestions = computed(() => {
  const q = input.value.trim().toLowerCase()
  if (!q) return []
  return ALL_LANGUAGES.filter((l) => l.toLowerCase().includes(q) && !props.added.includes(l)).slice(
    0,
    6,
  )
})

function add(lang = input.value.trim()) {
  if (!lang) return
  emit('add', lang)
  input.value = ''
}
</script>

<template>
  <div class="input-wrap">
    <div class="input-row">
      <input data-cy="language-input" v-model="input" placeholder="e.g. TypeScript" @keydown.enter="add()"
        autocomplete="off" />
      <button @click="add()">Add</button>
    </div>
    <ul class="suggestions" v-if="suggestions.length">
      <li v-for="s in suggestions" :key="s" @mousedown.prevent="add(s)" data-cy="language-suggestion">{{ s }}</li>
    </ul>
  </div>
</template>

<style scoped>
.input-wrap {
  position: relative;
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-accent-glow);
  background: var(--color-primary);
  color: var(--color-text);
  font-size: 0.95rem;
  outline: none;
}

input:focus {
  border-color: var(--color-accent);
}

button {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--color-accent);
  background: transparent;
  color: var(--color-accent);
  cursor: pointer;
  font-size: 0.95rem;
}

button:hover {
  box-shadow: 0 0 12px var(--color-accent-glow);
}

.suggestions {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 60px;
  background: var(--color-primary);
  border: 1px solid var(--color-accent-glow);
  border-radius: 8px;
  list-style: none;
  overflow: hidden;
  z-index: 10;
}

.suggestions li {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
}

.suggestions li:hover {
  background: var(--color-accent-glow);
}
</style>
