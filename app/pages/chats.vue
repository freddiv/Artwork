<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Chats Page</h1>
    <p class="mb-4">This is the chats page of our Nuxt application.</p>
    <UButton
      class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
      >Start a new chat</UButton
    >
    <div class="mt-4">Chat</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "sidenav",
  title: "Home Page",
  meta: [
    {
      name: "description",
      content: "Welcome to the home page of our Nuxt application.",
    },
  ],
});
</script>

<style></style>
