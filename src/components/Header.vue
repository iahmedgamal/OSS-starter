<script setup lang="ts">
import Title from './Title.vue'

withDefaults(
  defineProps<{
    bgColor?: string
  }>(),
  {
    bgColor: 'var(--color-primary)',
  },
)
</script>

<template>
  <header :style="{ backgroundColor: bgColor }">
    <div class="wrapper">
      <Title msg="OSS Starter" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  height: 100px;
  display: flex;
  align-items: center;
}
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav {
  margin-right: 10px;
  display: flex;
  gap: 8px;
}

nav a {
  padding: 6px 14px;
  border-radius: 8px;
  border: 2px solid transparent;
  text-decoration: none;
  color: var(--color-text);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

nav a:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 16px var(--color-accent-glow);
}

nav a.router-link-exact-active {
  border-color: transparent;
  border-left-color: var(--color-accent);
  box-shadow: none;
}
</style>
