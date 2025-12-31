<script setup lang="ts">
definePageMeta({
  layout: "sidenav",
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
    <div class="feather-card p-8 mx-4 rounded-2xl">
      <h1
        class="text-5xl font-extrabold mb-6 font-artistic bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent feather-text-shadow"
      >
        🪶 Welcome to Art Feathers and More
      </h1>
      <p class="text-lg text-gray-700 mb-8 leading-relaxed">
        Discover and purchase original artwork by Kathryn. Explore unique pieces of hand-painted feather art,
        learn about the artist, and bring natural creativity into your space. Each piece captures the delicate
        beauty and intricate patterns found in nature's most elegant creations.
      </p>
      <UButton
        class="feather-button text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl"
        @click="navigateTo('/gallery')"
        >🎨 Browse Gallery</UButton
      >
    </div>
  </div>
</template>
