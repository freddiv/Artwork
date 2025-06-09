<template>
<div class="layout-container bg-gray-100 flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-xl font-bold">Chat AI</h1>
      <nav class="mt-2">
        <ul class="flex space-x-4">
          <li><NuxtLink to="/" class="text-white hover:underline">Home</NuxtLink></li> 
          <li><NuxtLink to="/chats" class="text-white hover:underline">Chats</NuxtLink></li>
          </ul>      
      </nav>
    </header>
    <main class="flex-1 p-4">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 mt-4">
      <p>&copy; 2023 My Nuxt App</p>
    </footer>
 </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>