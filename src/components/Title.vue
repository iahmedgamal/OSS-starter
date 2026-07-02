<script setup lang="ts">
withDefaults(defineProps<{
  msg: string
}>(), {
  msg: ''
})
</script>

<template>
  <div class="title">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  margin-left: 10px;
  font-weight: 500;
  font-size: 2.6rem;
  text-align: center;
}

@media (min-width: 1024px) {
  h1 {
    text-align: left;
  }
}
</style>
