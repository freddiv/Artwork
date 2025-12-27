<template>
  <div class="container mx-auto py-8">
    <header class="mb-8">
      <h1
        class="text-4xl font-artistic font-bold text-center text-gray-800 drop-shadow-lg"
      >
        Shopping Cart
      </h1>
    </header>
    <div v-if="cart.length" class="bg-white rounded-lg shadow-lg p-6">
      <div
        v-for="item in cart"
        :key="item.id"
        class="flex items-center justify-between mb-4"
      >
        <div class="flex items-center gap-4">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-20 h-20 object-cover rounded"
          />
          <div>
            <h2 class="text-lg font-artistic font-bold">{{ item.title }}</h2>
            <p class="text-gray-700">${{ item.price }} x {{ item.qty }}</p>
          </div>
        </div>
        <UButton
          @click="removeFromCart(item.id)"
          class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-red-700 hover:bg-red-600 transition-colors"
          >Remove</UButton
        >
      </div>
      <div class="flex justify-between items-center mt-8">
        <span class="text-xl font-bold text-gray-800">Total: ${{ total }}</span>
        <UButton
          @click="checkout"
          class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-green-700 hover:bg-green-600 transition-colors"
          >Checkout</UButton
        >
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-16">
      Your cart is empty.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "@/composables/useCart";
import { createOrder } from "@/composables/useOrder";
import { computed, ref } from "vue";

const { cart, removeFromCart, clearCart } = useCart();
console.log("Current cart:", cart.value);
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)
);

const email = ref("");
const password = ref("");
const loading = ref(false);
const checkoutError = ref("");
const orderSuccess = ref(false);

async function checkout() {
  checkoutError.value = "";
  if (!user.value) {
    // Redirect to login page for checkout
    await navigateTo("/login");
    return;
  }
  loading.value = true;
  try {
    await createOrder(cart.value, total.value);
    orderSuccess.value = true;
    clearCart();
  } catch (e) {
    checkoutError.value = e.message || "Order failed.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.font-artistic {
  font-family: "Comic Sans MS", "Comic Neue", cursive, sans-serif;
}
</style>
