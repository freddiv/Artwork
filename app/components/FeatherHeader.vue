<template>
  <header class="feather-bg text-white p-6 relative overflow-hidden">
      <!-- Decorative feather-like elements -->
      <div class="absolute top-2 left-4 w-3 h-12 bg-white opacity-10 rounded-full transform rotate-45"></div>
      <div class="absolute top-4 left-8 w-2 h-8 bg-white opacity-20 rounded-full transform rotate-30"></div>
      <div class="absolute bottom-2 right-8 w-4 h-16 bg-white opacity-10 rounded-full transform -rotate-45"></div>
      <div class="absolute bottom-4 right-12 w-2 h-10 bg-white opacity-15 rounded-full transform -rotate-30"></div>
      
      <div class="flex items-center justify-between relative z-10">
        <h1 class="text-4xl font-bold feather-text-shadow">🪶 Art Feathers and More</h1>
        <nav class="flex items-center space-x-8">
          <ul class="flex space-x-6">
            <li>
              <NuxtLink to="/" class="text-white hover:text-indigo-400 hover:bg-white hover:bg-opacity-20 focus-visible:text-indigo-400 focus-visible:bg-white focus-visible:bg-opacity-20 px-3 py-2 rounded-lg hover:shadow-lg focus-visible:shadow-lg" active-class="!text-indigo-400 font-semibold bg-white bg-opacity-20"
                >🏠 Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/gallery" class="text-white hover:text-indigo-400 hover:bg-white hover:bg-opacity-20 focus-visible:text-indigo-400 focus-visible:bg-white focus-visible:bg-opacity-20 px-3 py-2 rounded-lg hover:shadow-lg focus-visible:shadow-lg" active-class="!text-indigo-400 font-semibold bg-white bg-opacity-20"
                >🎨 Gallery</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/cart" class="text-white hover:text-indigo-400 hover:bg-white hover:bg-opacity-20 focus-visible:text-indigo-400 focus-visible:bg-white focus-visible:bg-opacity-20 px-3 py-2 rounded-lg hover:shadow-lg focus-visible:shadow-lg" active-class="!text-indigo-400 font-semibold bg-white bg-opacity-20"
                >🛒 Cart</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/checkout" class="text-white hover:text-indigo-400 hover:bg-white hover:bg-opacity-20 focus-visible:text-indigo-400 focus-visible:bg-white focus-visible:bg-opacity-20 px-3 py-2 rounded-lg hover:shadow-lg focus-visible:shadow-lg" active-class="!text-indigo-400 font-semibold bg-white bg-opacity-20"
                >💳 Checkout</NuxtLink
              >
            </li>
          </ul>
          
          <!-- User Info -->
          <div v-if="user" class="flex items-center space-x-3 border-l border-gray-600 pl-4">
            <div class="text-sm">
              <div class="text-white">{{ displayName }}</div>
            </div>
            <button @click="handleSignOut" class="text-gray-300 hover:text-white text-sm">
              Sign Out
            </button>
          </div>
          
          <div v-else>
            <NuxtLink to="/login" class="text-white hover:underline">
              Sign In
            </NuxtLink>
          </div>
        </nav>
      </div>
    </header>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const session = useSupabaseSession()
const supabase = useSupabaseClient()
const { signOut } = useAuth()

// Debug authentication state
console.log("=== AUTH DEBUG ===")
console.log("Current user:", user.value)
console.log("Current session:", session.value)
console.log("Is client side:", import.meta.client)

// Watch for changes
watch(user, (newUser) => {
  console.log("User changed:", newUser)
}, { immediate: true })

watch(session, (newSession) => {
  console.log("Session changed:", newSession)
}, { immediate: true })

// Check auth state on client side
if (import.meta.client) {
  onMounted(async () => {
    console.log("Component mounted, checking auth...")
    const { data } = await supabase.auth.getUser()
    console.log("Direct auth check:", data)
  })
}

// Simple display name from user email
const displayName = computed(() => {
  if (!user.value?.email) return null
  return user.value.email.split('@')[0] // Use part before @ as display name
})

const handleSignOut = async () => {
  await signOut()
  await navigateTo('/')
}
</script>

<style>

</style>