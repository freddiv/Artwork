<template>
  <div class="max-w-2xl mx-auto p-6 text-center">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Success Icon -->
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
        <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      
      <p class="text-lg text-gray-600 mb-6">
        Thank you for your purchase! Your order has been successfully placed.
      </p>

      <div v-if="orderId" class="bg-gray-50 rounded-lg p-4 mb-6">
        <p class="text-sm text-gray-500 mb-2">Order Number:</p>
        <p class="font-mono text-lg font-semibold text-gray-800">{{ orderId }}</p>
      </div>

      <div class="text-gray-600 mb-8">
        <p class="mb-2">You will receive an email confirmation shortly.</p>
        <p>We'll notify you when your artwork ships!</p>
      </div>

      <div class="space-x-4">
        <UButton 
          @click="navigateTo('/gallery')"
          class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </UButton>
        
        <UButton 
          @click="navigateTo('/')"
          variant="outline"
          class="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back to Home
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'sidenav',
  title: 'Order Confirmation',
  meta: [{ name: 'description', content: 'Your art feather order has been confirmed' }]
})

const route = useRoute()
const orderId = computed(() => route.query.orderId as string)
</script>