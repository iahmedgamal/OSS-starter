<script setup lang="ts">
withDefaults(
  defineProps<{
    msg: string
  }>(),
  {
    msg: '',
  },
)
</script>

<template>
  <RouterLink to="/">
    <h1>{{ msg }}</h1>
  </RouterLink>
  <div class="title"></div>
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
