<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <div class="text-center">
        <div v-if="loading" class="space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="text-gray-600">Confirming your authentication...</p>
          <p class="text-sm text-gray-500">This may take a few seconds</p>
        </div>
        <div v-else-if="error" class="text-red-600">
          <p class="mb-4">There was an error confirming your authentication.</p>
          <UButton 
            @click="navigateTo('/login')"
            class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
          >
            Back to Login
          </UButton>
        </div>
        <div v-else-if="confirmed" class="text-green-600">
          <p class="mb-4">Authentication confirmed! Redirecting...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'sidenav',
  title: 'Confirming Authentication',
  meta: [{ name: 'description', content: 'Confirming your authentication' }]
})

const user = useSupabaseUser()
const session = useSupabaseSession()
const supabase = useSupabaseClient()
const route = useRoute()

const loading = ref(true)
const error = ref(false)
const confirmed = ref(false)

// Debug auth state
console.log("=== CONFIRM PAGE DEBUG ===")
console.log("Initial user:", user.value)
console.log("Initial session:", session.value)
console.log("Route query:", route.query)

// Handle auth confirmation
onMounted(async () => {
  console.log("Confirm page mounted")
  
  // Give a moment for auth state to initialize
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Check if we already have a user
  if (user.value) {
    console.log("User already authenticated:", user.value)
    confirmed.value = true
    loading.value = false
    setTimeout(() => navigateTo('/checkout'), 1000)
    return
  }
  
  // Try to get session manually if not available
  try {
    const { data, error: authError } = await supabase.auth.getSession()
    console.log("Manual session check:", data)
    
    if (authError) {
      console.error("Auth error:", authError)
      error.value = true
      loading.value = false
      return
    }
    
    if (data.session) {
      console.log("Session found, user should be available soon")
      // Wait a bit more for reactivity to kick in
      setTimeout(() => {
        if (user.value) {
          confirmed.value = true
          loading.value = false
          navigateTo('/checkout')
        } else {
          console.log("Still no user after session found")
          error.value = true
          loading.value = false
        }
      }, 2000)
    } else {
      console.log("No session found")
      setTimeout(() => {
        loading.value = false
        error.value = true
      }, 3000)
    }
  } catch (err) {
    console.error("Error checking session:", err)
    loading.value = false
    error.value = true
  }
})

// Watch for user changes
watch(user, (newUser) => {
  console.log("User changed in confirm page:", newUser)
  if (newUser && !confirmed.value) {
    confirmed.value = true
    loading.value = false
    setTimeout(() => navigateTo('/checkout'), 1000)
  }
}, { immediate: true })

// Watch for session changes
watch(session, (newSession) => {
  console.log("Session changed in confirm page:", newSession)
}, { immediate: true })
</script>