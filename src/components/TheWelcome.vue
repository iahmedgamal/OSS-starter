<script setup lang="ts" >
  import {ref} from 'vue'
  const counter = ref(0)
  const increment = ()=>{
   counter.value++ 
  }
</script>

<template>
 hey 
 <h3>
 {{ counter }} 
 </h3>
 <button @click="increment">Counter</button>
</template>
