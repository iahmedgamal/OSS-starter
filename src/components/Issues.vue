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
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary);
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
}

.item-container:hover {
  background-color: var(--color-background);
  color: white;
  cursor: pointer;
  border: 1px solid white;
  scale: 1.02;
}

img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
</style>
