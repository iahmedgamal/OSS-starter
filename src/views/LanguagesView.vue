<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LanguageInput from '@/components/LanguageInput.vue'

const router = useRouter()
const languages = ref<string[]>([])

onMounted(() => {
  languages.value = JSON.parse(localStorage.getItem('oss_languages') || '[]')
})

function add(lang: string) {
  if (languages.value.includes(lang)) return
  languages.value.push(lang)
}

function remove(lang: string) {
  languages.value = languages.value.filter((l) => l !== lang)
}

function findIssues() {
  localStorage.setItem('oss_languages', JSON.stringify(languages.value))
  router.push('/')
}
</script>

<template>
  <main>
    <h2>Your Languages</h2>
    <p class="hint">Add the languages you work with to filter good first issues.</p>

    <LanguageInput :added="languages" @add="add" />

    <div class="tags" v-if="languages.length">
      <span class="tag" v-for="lang in languages" :key="lang">
        {{ lang }}
        <button class="remove" @click="remove(lang)">×</button>
      </span>
    </div>
    <p class="empty" v-else>No languages added yet.</p>

    <button data-cy="find-issues" class="find-issues" :disabled="!languages.length" @click="findIssues">Find Issues →</button>
  </main>
</template>

<style scoped>
main {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 16px;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.hint {
  font-size: 0.85rem;
  opacity: 0.6;
  margin-bottom: 24px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--color-primary);
  border: 1px solid var(--color-accent);
  font-size: 0.85rem;
}

.remove {
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
}

.remove:hover {
  opacity: 1;
}

.empty {
  opacity: 0.4;
  font-size: 0.85rem;
  margin-bottom: 32px;
}

.find-issues {
  padding: 10px 24px;
  font-size: 1rem;
  background: var(--color-accent);
  color: var(--color-background);
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.find-issues:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
