<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import IssueCard from './IssueCard.vue'
import LanguageTabs from './LanguageTabs.vue'
import { useRouter } from 'vue-router'
import type { IssuesResponse } from '@/types/types.ts'
import { resolveLanguage } from '@/utils/languages'

const router = useRouter()
const languages: string[] = JSON.parse(localStorage.getItem('oss_languages') || '[]')
const selected = ref(languages[0] ?? '')

function buildUrl(lang: string) {
  const url = new URL('https://api.github.com/search/issues')
  url.searchParams.set(
    'q',
    `is:issue is:open label:"good first issue" no:assignee language:${resolveLanguage(lang).toLowerCase()}`,
  )
  url.searchParams.set('sort', 'created')
  url.searchParams.set('order', 'desc')
  url.searchParams.set('per_page', '100')
  return url.toString()
}

const { data, isLoading, error } = useQuery<IssuesResponse>({
  queryKey: ['good-first-issues', selected],
  queryFn: () => fetch(buildUrl(selected.value)).then((r) => r.json()),
  staleTime: 1000 * 60 * 5,
})
</script>

<template>
  <LanguageTabs :languages="languages" :selected="selected" @select="selected = $event" />

  <div v-if="isLoading" class="state">Loading...</div>
  <div v-if="error" class="state error">Failed to load issues.</div>

  <p v-if="data" class="total">{{ data.total_count.toLocaleString() }} open good first issues</p>

  <IssueCard
    v-for="item in data?.items"
    :key="item.id"
    :item="item"
    @click="
      router.push({ path: `/issue/${item.id}`, state: { issue: JSON.parse(JSON.stringify(item)) } })
    "
  />
</template>

<style scoped>
.state {
  text-align: center;
  padding: 40px;
  opacity: 0.6;
}

.error {
  color: var(--color-accent);
}

.total {
  font-size: 0.8rem;
  color: var(--color-accent);
  margin-bottom: 16px;
  opacity: 0.8;
}
</style>
