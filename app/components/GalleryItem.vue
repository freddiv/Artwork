<template>
  <div class="feather-card rounded-2xl overflow-hidden flex flex-col items-center group">
    <NuxtLink :to="`/artwork/${art.id}`" class="w-full relative overflow-hidden group">
      <img
        :src="art.image"
        :alt="art.title"
        class="w-full h-64 object-cover group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100"></div>
    </NuxtLink>
    <div class="p-6 flex-1 flex flex-col justify-between w-full">
      <NuxtLink :to="`/artwork/${art.id}`">
        <h3
          class="text-xl font-artistic font-semibold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-600"
        >
          {{ art.title }}
        </h3>
      </NuxtLink>
      <p class="text-gray-600 mb-6 leading-relaxed">{{ art.description }}</p>
      <div class="flex items-center justify-between mt-auto">
        <span class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          ${{ art.price }}
        </span>
        <FeatherButton
          feather-variant="primary"
          @click="handleAddToCart"
        >
          🛒 Add to Cart
        </FeatherButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "@/composables/useCart";
import FeatherButton from "./ui/FeatherButton.vue";

// Define props interface
interface Props {
  art: {
    id: number | string
    title: string
    image: string
    description: string
    price: number
  }
}

const props = defineProps<Props>()

// Use cart composable
const { addToCart: addItemToCart } = useCart()

function handleAddToCart() {
  addItemToCart(props.art)
  const toast = useToast()
  console.log("Adding to cart:", toast)
  toast.add({
    title: "Added to Cart!",
    description: `${props.art.title} has been added to your cart.`,
    icon: "i-heroicons-check-circle",
    color: "primary",
    timeout: 3000,
  })
}
</script>

<style scoped>
.font-artistic {
  font-family: "Comic Sans MS", "Comic Neue", cursive, sans-serif;
}
</style>