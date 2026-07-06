<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Labels from './Labels.vue'
import { useRouter } from 'vue-router'
import type { IssuesResponse } from '@/types/types.ts'

const router = useRouter()
const { data, isLoading, error } = useQuery<IssuesResponse>({
  queryKey: ['good-first-issues'],
  queryFn: () =>
    fetch(
      'https://api.github.com/search/issues?q=is:issue+is:open+label:"good+first+issue"+no:assignee&sort=created&order=desc&per_page=100',
    ).then((r) => r.json()),
  staleTime: 1000 * 60 * 5,
})
</script>

<template>
  <div v-if="isLoading" class="state">Loading...</div>
  <div v-if="error" class="state error">Failed to load issues.</div>

  <p v-if="data" class="total">{{ data.total_count.toLocaleString() }} open good first issues</p>

  <div
    class="card"
    v-for="item in data?.items"
    :key="item.id"
    @click="
      router.push({ path: `/issue/${item.id}`, state: { issue: JSON.parse(JSON.stringify(item)) } })
    "
  >
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

<style>
.state {
  text-align: center;
  padding: 40px;
  opacity: 0.6;
}

.error {
  color: #f87171;
}

.total {
  font-size: 0.8rem;
  color: var(--color-accent);
  margin-bottom: 16px;
  opacity: 0.8;
}

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
  font-size: 0.75rem;
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
