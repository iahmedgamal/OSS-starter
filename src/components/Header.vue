<script setup lang="ts">
import Title from './Title.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Title msg="OSS Starter" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/languages">Languages</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  max-width: 760px;
  margin: 0 auto;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-accent-glow);
  margin-bottom: 24px;
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav {
  display: flex;
  gap: 8px;
}

nav a {
  padding: 6px 14px;
  border-radius: 8px;
  border: 2px solid transparent;
  color: var(--color-text);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

nav a:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 16px var(--color-accent-glow);
}

nav a.router-link-exact-active {
  border-left-color: var(--color-accent);
}
</style>
