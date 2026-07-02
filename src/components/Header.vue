<script setup lang="ts">
import Title from './Title.vue';

withDefaults(defineProps<{
    bgColor?: string
}>(), {
    bgColor: 'var(--color-primary)'
})
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
.wrapper{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:  space-between;
}

nav{
    margin-right: 10px;
}
</style>