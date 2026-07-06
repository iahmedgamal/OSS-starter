<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Labels from './Labels.vue'
import { useRouter } from 'vue-router'
import type { IssuesResponse } from '@/types/types.ts'



const router = useRouter()
const { data, isLoading, error } = useQuery<IssuesResponse>({
  queryKey: ['good-first-issues'],
  queryFn: () =>
    fetch('https://api.github.com/search/issues?q=is:issue+is:open+label:"good+first+issue"+no:assignee&sort=created&order=desc&per_page=100')
      .then((r) => r.json()),
  staleTime: 1000 * 60 * 5, // 5 min cache
})
</script>

<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-if="error">{{ error }}</div>

  <p v-if="data" class="total">{{ data.total_count.toLocaleString() }} good first issues available</p>

  <div class="item-container" v-for="item in data?.items" :key="item.id">
    <div class="item" @click="router.push({path: `/issue/${item.id}` , state: {issue: JSON.parse(JSON.stringify(item))}})">
      <span> {{ item.title }} </span>
      <img :src="`${item.user.avatar_url}`" />
    </div>

    <Labels :labels="item.labels" />
  </div>
</template>

<style>
.total {
  text-align: center;
  color: var(--color-accent);
  font-size: 0.85rem;
  margin: 8px 0;
}

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
