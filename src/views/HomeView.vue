<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Issues from '../components/Issues.vue'

const router = useRouter()

onMounted(() => {
  const langs = JSON.parse(localStorage.getItem('oss_languages') || '[]')
  if (!langs.length) router.push('/languages')
})
</script>

<template>
  <main>
    <Issues />
  </main>
</template>
