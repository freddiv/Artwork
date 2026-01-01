<template>
  <div class="container mx-auto py-8">
    <header class="mb-12 text-center">
      <h1
        class="text-5xl font-artistic font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent feather-text-shadow mb-4"
      >
        🎨 Gallery
      </h1>
      <p class="text-lg text-gray-600 mb-8">A collection of hand-painted feather artwork, where nature meets artistry</p>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <GalleryItem
        v-for="art in artwork"
        :key="art.id"
        :art="art"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "sidenav",
  title: "Gallery",
  meta: [{ name: "description", content: "Welcome to the art gallery page." }],
});

const artwork = ref([]);

async function fetchArtwork() {
  const res = await fetch("/api/artwork");
  artwork.value = await res.json();
}

console.log("Fetching artwork...", artwork.value);
fetchArtwork();
</script>

<style scoped>
.font-artistic {
  font-family: "Comic Sans MS", "Comic Neue", cursive, sans-serif;
}
</style>
