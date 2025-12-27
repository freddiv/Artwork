<template>
  <div v-if="artwork" class="container mx-auto py-8">
    <header class="mb-8">
      <h1
        class="text-4xl font-artistic font-bold text-center text-gray-800 drop-shadow-lg"
      >
        Artwork Details
      </h1>
    </header>
    <div class="flex flex-col md:flex-row gap-8">
      <img
        :src="artwork.image"
        :alt="artwork.title"
        class="w-full md:w-1/2 h-96 object-contain rounded-lg shadow-lg"
      />
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h2
            class="text-3xl font-artistic font-bold mb-4 text-gray-800 drop-shadow-lg"
          >
            {{ artwork.title }}
          </h2>
          <p class="text-lg text-gray-700 mb-4">{{ artwork.description }}</p>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-2xl font-bold text-gray-800"
            >${{ artwork.price }}</span
          >
          <UButton
            @click="addToCart(artwork)"
            class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
            >Add to Cart</UButton
          >
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-16 text-gray-500">Artwork not found.</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useCart } from "@/composables/useCart";
definePageMeta({
  layout: "sidenav",
  title: "Artwork Details",
  meta: [
    { name: "description", content: "Detailed view of the selected artwork." },
  ],
});
const route = useRoute();
const artwork = ref(null);
const { addToCart: addItemToCart } = useCart();

async function fetchArtwork() {
  const res = await fetch("/api/artwork");
  const data = await res.json();
  artwork.value = data.find((a) => a.id === Number(route.params.id));
}

function addToCart(art) {
  addItemToCart(art);
  const toast = useToast();
  toast.add({
    title: "Added to Cart!",
    description: `${art.title} has been added to your cart.`,
    icon: "i-heroicons-check-circle",
    color: "primary",
    timeout: 3000,
  });
}

onMounted(fetchArtwork);
</script>

<style scoped>
.font-artistic {
  font-family: "Comic Sans MS", "Comic Neue", cursive, sans-serif;
}
</style>
