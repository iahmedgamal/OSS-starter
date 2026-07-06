<script setup lang="ts">
import Labels from '@/components/Labels.vue'
import type { Issue } from '@/types/types'
import { marked } from 'marked'
import { useRouter } from 'vue-router'

defineProps<{ id: string }>()
const router = useRouter()
const issue = history.state.issue as Issue
const body = marked(issue.body ?? '')
</script>

<template>
  <div class="issue">
    <button class="back" @click="router.back()">← Back</button>

    <div class="meta">
      <span class="repo">{{
        issue.repository_url.replace('https://api.github.com/repos/', '')
      }}</span>
      <a :href="issue.html_url" target="_blank" class="gh-link">View on GitHub ↗</a>
    </div>

    <h1 class="title">{{ issue.title }}</h1>

    <div class="author">
      <img :src="issue.user.avatar_url" :alt="issue.user.login" />
      <span>{{ issue.user.login }}</span>
    </div>

    <Labels :labels="issue.labels" />

    <div class="body" v-html="body" />
  </div>
</template>

<style scoped>
.issue {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.back {
  background: none;
  border: none;
  color: var(--color-accent);
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  width: fit-content;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.repo {
  font-size: 0.8rem;
  color: var(--color-accent);
  opacity: 0.8;
}

.gh-link {
  font-size: 0.8rem;
  color: var(--color-accent);
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.4;
}

.author {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  opacity: 0.7;
}

.author img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.body {
  background-color: var(--color-primary);
  border-radius: 12px;
  padding: 20px;
  line-height: 1.7;
  font-size: 0.9rem;
  border-left: 3px solid var(--color-accent);
}
</style>
