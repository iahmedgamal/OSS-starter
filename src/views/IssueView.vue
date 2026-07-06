<script setup lang="ts">
import Labels from '@/components/Labels.vue';
import Title from '@/components/Title.vue';
import type { Issue } from '@/types/types';
import { marked } from 'marked'

const props = defineProps<{ id: string }>()
const issue = history.state.issue as Issue;
const body = marked(issue.body ?? '')

</script>


<template>
    <Title :msg="issue.title" />
    <p v-html="body"/>

    <a :href="`${issue.html_url}`"> link </a>
    <Labels :labels="issue.labels" />

</template>

<style scoped></style>
