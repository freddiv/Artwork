<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>
    
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Order Summary -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div v-if="cart.length === 0" class="text-gray-500 text-center py-8">
          Your cart is empty
        </div>
        
        <div v-else>
          <div v-for="item in cart" :key="item.id" class="flex justify-between items-center py-3 border-b">
            <div class="flex items-center space-x-3">
              <img :src="item.image" :alt="item.title" class="w-16 h-16 object-cover rounded">
              <div>
                <h3 class="font-medium">{{ item.title }}</h3>
                <p class="text-gray-500">Qty: {{ item.qty }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium">${{ (item.price * item.qty).toFixed(2) }}</p>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t">
            <div class="flex justify-between text-lg font-bold">
              <span>Total: ${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout Form -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
        
        <!-- Loading indicator -->
        <div v-if="loadingUserData" class="flex items-center justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-2 text-gray-600">Loading your information...</span>
        </div>
        
        <form v-else @submit.prevent="processOrder" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                v-model="shippingInfo.firstName"
                type="text"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                v-model="shippingInfo.lastName"
                type="text"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="shippingInfo.email"
              type="email"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              v-model="shippingInfo.address1"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

           <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
            <input
              v-model="shippingInfo.address2"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                v-model="shippingInfo.city"
                type="text"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                v-model="shippingInfo.state"
                type="text"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input
                v-model="shippingInfo.zipCode"
                type="text"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <div class="pt-4">
            <UButton
              type="submit"
              :loading="processing"
              :disabled="cart.length === 0"
              class="w-full focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
            >
              {{ processing ? 'Processing...' : `Place Order - $${total.toFixed(2)}` }}
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/useCart'
import { createOrder } from '@/composables/useOrder'

definePageMeta({
  layout: 'sidenav',
  title: 'Checkout',
  meta: [{ name: 'description', content: 'Complete your art feather purchase' }]
})

const { cart, clearCart } = useCart()
const processing = ref(false)

const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: ''
})

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
})

async function processOrder() {
  if (cart.value.length === 0) return
  
  processing.value = true
  try {
    const order = await createOrder(cart.value, total.value)
    
    // Clear cart after successful order
    clearCart()
    
    // Redirect to success page or show success message
    await navigateTo({
      path: '/order-confirmation',
      query: { orderId: order.id }
    })
  } catch (error) {
    console.error('Order failed:', error)
    // Handle error (show toast notification, etc.)
  } finally {
    processing.value = false
  }
}

// Pre-fill shipping info from user data
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const loadingUserData = ref(false)
console.log("Current user:", user)

// Load user profile and pre-fill form
const loadUserProfile = async () => {
  if (!user.value?.email) return
  
  loadingUserData.value = true
  try {
    // First, try to get existing user profile
    let { data: userProfile, error } = await supabase
      .from('users')
      .select('name, email, is_admin')
      .eq('email', user.value.email)
      .single()
    
    // If no profile exists, create one for confirmed user
    if (error && error.code === 'PGRST116' && user.value) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.value.id,
          email: user.value.email,
          name: user.value.user_metadata?.name || '',
          is_admin: false
        })
      
      if (!insertError) {
        // Fetch the newly created profile
        const { data } = await supabase
          .from('users')
          .select('name, email, is_admin')
          .eq('email', user.value.email)
          .single()
        userProfile = data
      }
    }
    
    if (userProfile) {
      // Pre-populate form with user data
      const nameParts = userProfile.name?.split(' ') || []
      shippingInfo.value.firstName = nameParts[0] || ''
      shippingInfo.value.lastName = nameParts.slice(1).join(' ') || ''
      shippingInfo.value.email = userProfile.email || user.value.email
      
      console.log('Loaded user profile:', userProfile)
      console.log('User role:', userProfile.is_admin ? 'admin' : 'customer')
    } else {
      // Fallback to just email
      shippingInfo.value.email = user.value.email
    }
  } catch (error) {
    console.error('Error loading user profile:', error)
    // Fallback to just email
    shippingInfo.value.email = user.value.email
  } finally {
    loadingUserData.value = false
  }
}

// Watch for user changes and load profile
watch(user, async (newUser) => {
  if (newUser) {
    await loadUserProfile()
  }
}, { immediate: true })
</script>