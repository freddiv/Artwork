<template>
  <ClientOnly>
  <div
    class="layout-container bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col min-h-screen font-comic relative overflow-hidden feather-background"
  >
    <!-- Artistic background pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
      <div class="absolute top-32 right-20 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
      <div class="absolute bottom-20 left-32 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-40 right-10 w-28 h-28 bg-indigo-300 rounded-full blur-2xl"></div>
    </div>
    
    <FeatherHeader />
    <main class="flex-1 p-6 relative z-20">
      <slot />
    </main>
    <footer class="feather-bg text-white p-6 mt-8 relative">
      <div class="relative z-10">
        <p class="text-center text-lg feather-text-shadow">&copy; 2025 Art Feathers and More - Where Art Takes Flight</p>
      </div>
    </footer>
  </div>
  </ClientOnly>
</template>

<script lang="ts" setup></script>

<style>
.font-comic {
  font-family: "Comic Sans MS", cursive, sans-serif;
}
</style>
