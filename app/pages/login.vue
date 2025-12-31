<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Required to complete your purchase
        </p>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-8">
        <!-- Login Form -->
        <form v-if="!showSignUp" @submit.prevent="signIn" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              v-model="credentials.email"
              type="email"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div v-if="error" class="text-red-600 text-sm">
            {{ error.message }}
          </div>

          <div>
            <UButton
              type="submit"
              :loading="loading"
              class="w-full focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
            >
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </UButton>
          </div>

          <div class="text-center">
            <button
              type="button"
              @click="showSignUp = true"
              class="text-sm text-blue-600 hover:text-blue-500"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>

        <!-- Sign Up Form -->
        <form v-else @submit.prevent="signUp" class="space-y-6">
          <div>            <label for="signup-first-name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="signup-name"
              v-model="credentials.firstName"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div>            <label for="signup-last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="signup-name"
              v-model="credentials.lastName"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div>
            <label for="signup-email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="signup-email"
              v-model="credentials.email"
              type="email"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div>
            <label for="signup-password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="signup-password"
              v-model="credentials.password"
              type="password"
              required
              minlength="6"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <p class="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
          </div>

          <div v-if="error" class="text-red-600 text-sm">
            {{ error.message }}
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="credentials.confirmPassword"
              type="password"
              required
              minlength="6"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <p class="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
          </div>

          <div v-if="error" class="text-red-600 text-sm">
            {{ error.message }}
          </div>

          <div v-if="signUpSuccess" class="text-green-600 text-sm">
            Account created! Please check your email and click the confirmation link, then sign in below.
          </div>

          <div>
            <UButton
              type="submit"
              :loading="loading"
              class="w-full focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors"
            >
              {{ loading ? 'Creating account...' : 'Create account' }}
            </UButton>
          </div>

          <div class="text-center">
            <button
              type="button"
              @click="showSignUp = false; signUpSuccess = false"
              class="text-sm text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>

      <div class="text-center">
        <NuxtLink 
          to="/"
          class="text-sm text-gray-600 hover:text-gray-500"
        >
          ← Back to gallery
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  layout: 'sidenav',
  title: 'Login',
  meta: [{ name: 'description', content: 'Sign in to complete your purchase' }]
})

const { signInWithEmail, signUpWithEmail, error } = useAuth()
const user = useSupabaseUser()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const showSignUp = ref(false)
const signUpSuccess = ref(false)

const credentials = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Redirect if already logged in
watch(user, (newUser) => {
  if (newUser) {
    const redirectTo = route.query.redirect as string || '/checkout'
    navigateTo(redirectTo)
  }
}, { immediate: true })

async function signIn() {
  loading.value = true
  try {
    await signInWithEmail(credentials.value.email, credentials.value.password)
    if (!error.value) {
      // Always redirect to checkout after successful signin
      await navigateTo('/checkout')
    }
  } finally {
    loading.value = false
  }
}

async function signUp() {
  loading.value = true
  try {
    await signUpWithEmail(credentials.value.email, credentials.value.password, {
      name: credentials.value.name,
      role: 'customer'
    })
    if (!error.value) {
      signUpSuccess.value = true
      showSignUp.value = false
      credentials.value.password = '' // Clear password for security
    }
  } finally {
    loading.value = false
  }
}
</script>