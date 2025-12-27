<template>
  <div class="container mx-auto py-8">
    <header class="mb-8">
      <h1
        class="text-4xl font-artistic font-bold text-center text-gray-800 drop-shadow-lg"
      >
        Gallery
      </h1>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div
        v-for="art in artwork"
        :key="art.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center"
      >
        <NuxtLink :to="`/artwork/${art.id}`" class="w-full">
          <img
            :src="art.image"
            :alt="art.title"
            class="w-full h-64 object-cover transition-transform duration-200 hover:scale-105"
          />
        </NuxtLink>
        <div class="p-4 flex-1 flex flex-col justify-between w-full">
          <NuxtLink :to="`/artwork/${art.id}`">
            <h3
              class="text-xl font-artistic font-semibold mb-2 text-gray-800 hover:underline"
            >
              {{ art.title }}
            </h3>
          </NuxtLink>
          <p class="text-gray-700 mb-4">{{ art.description }}</p>
          <div class="flex items-center justify-between mt-auto">
            <span class="text-lg font-bold text-gray-800"
              >${{ art.price }}</span
            >
            <UButton
              @click="addToCart(art)"
              class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
              >Add to Cart</UButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCart } from "@/composables/useCart";
definePageMeta({
  layout: "sidenav",
  title: "Gallery",
  meta: [{ name: "description", content: "Welcome to the art gallery page." }],
});
const artwork = ref([]);
const { addToCart: addItemToCart } = useCart();

async function fetchArtwork() {
  const res = await fetch("/api/artwork");
  artwork.value = await res.json();
}
console.log("Fetching artwork...", artwork.value);

fetchArtwork();

function addToCart(art) {
  addItemToCart(art);
  const toast = useToast();
  console.log("Adding to cart:", toast);
  toast.add({
    title: "Added to Cart!",
    description: `${art.title} has been added to your cart.`,
    icon: "i-heroicons-check-circle",
    color: "primary",
    timeout: 3000,
  });
}
</script>

<style scoped>
.font-artistic {
  font-family: "Comic Sans MS", "Comic Neue", cursive, sans-serif;
}
</style>
