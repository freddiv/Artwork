<script setup lang="ts">
definePageMeta({
    layout: 'default',
    title: 'Home Page',
    meta: [
        { name: 'description', content: 'Welcome to the home page of our Nuxt application.' }
    ]
});

</script>

<template>
  <div>
    <NuxtPage />
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Welcome to My Nuxt CHAT APP</h1>
      <p class="mb-4">This is a simple example of a Nuxt application using the UApp component.</p>
      <UButton>Click me!</UButton>
    </div>
  </div>
</template>