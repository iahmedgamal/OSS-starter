<script setup lang="ts">
import Labels from './Labels.vue'
import type { Issue } from '@/types/types'

defineProps<{ item: Issue }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <div class="card" @click="$emit('click')">
    <div class="card-top">
      <a :href="item.html_url" target="_blank" @click.stop class="repo">
        {{ item.repository_url.replace('https://api.github.com/repos/', '') }} ↗
      </a>
      <img :src="item.user.avatar_url" :alt="item.user.login" />
    </div>
    <p class="title">{{ item.title }}</p>
    <Labels :labels="item.labels" />
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--color-primary);
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid transparent;
  border-left: 3px solid var(--color-accent);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 16px var(--color-accent-glow);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.repo {
  font-size: 1.5rem;
  color: var(--color-accent);
  opacity: 0.8;
}

.title {
  font-size: 0.95rem;
  line-height: 1.4;
}

img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
</style>
