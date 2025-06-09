<template>
   <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>   
  </UApp>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const variable = ref(42);
console.log(`The value of the variable is: ${variable.value}`);
</script>