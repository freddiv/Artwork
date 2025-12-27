<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: "Art Feathers and More",
  meta: [
    {
      name: "description",
      content:
        "Welcome to Art Feathers and More, a storefront for personal artwork.",
    },
  ],
});
</script>

<template>
  <div>
    <div class="p-4">
      <header class="mb-8">
        <h1
          class="text-4xl font-artistic font-bold text-center text-gray-800 drop-shadow-lg"
        >
          Welcome to Art Feathers and More
        </h1>
      </header>
      <h1
        class="text-4xl font-extrabold mb-4 font-artistic text-gray-800 drop-shadow-lg"
      >
        Welcome to Art Feathers and More
      </h1>
      Discover and purchase original artwork by Kathryn. Explore unique pieces,
      learn about the artist, and bring creativity into your space.
      <UButton
        class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
        >Browse Gallery</UButton
      >
    </div>
  </div>
</template>
