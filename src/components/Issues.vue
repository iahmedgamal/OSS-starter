<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Labels from './Labels.vue'

interface Label {
  id: number
  name: string
  color: string
  description: string | null
}

interface Issue {
  id: number
  title: string
  html_url: string
  labels: Label[]
  user: {
    login: string
    avatar_url: string
  }
}

const { data, isLoading, error } = useQuery<Issue[]>({
  queryKey: ['good-first-issues'],
  queryFn: () =>
    fetch('https://api.github.com/search/issues?q=is:issue+is:open+label:"good+first+issue"')
      .then((r) => r.json())
      .then((data) => data.items),
  staleTime: 1000 * 60 * 5, // 5 min cache
})
</script>

<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-if="error">{{ error }}</div>

  <div class="item-container" v-for="item in data">
    <div class="item">
      <a :href="`${item.html_url}`"> link </a>
      <span> {{ item.title }} </span>
      <img :src="`${item.user.avatar_url}`" />
    </div>

    <Labels :labels="item.labels" />
  </div>
</template>

<style>
.item-container {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary);
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  cursor: pointer;
  border: 2px solid transparent;
  border-left: 4px solid var(--color-accent);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.item-container:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 16px var(--color-accent-glow);
}

.item {
  display: flex;
  justify-content: space-between;
}

img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
</style>
