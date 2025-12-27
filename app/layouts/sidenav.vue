<template>
  <div
    class="layout-container bg-gray-100 flex flex-col min-h-screen font-comic"
  >
    <header class="bg-gray-800 text-white p-4">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Art Feathers and More</h1>
        <nav class="flex items-center">
          <ul class="flex space-x-4">
            <li>
              <NuxtLink to="/" class="text-white hover:underline"
                >Welcome to Art Feathers and More</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/gallery" class="text-white hover:underline"
                >Gallery</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/chats" class="text-white hover:underline"
                >Chats</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/cart" class="text-white hover:underline"
                >Cart</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="flex-1 p-4">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 mt-4">
      <p>&copy; 2025 Art Feathers and More</p>
    </footer>
  </div>
</template>

<script lang="ts" setup></script>

<style>
.font-comic {
  font-family: "Comic Sans MS", cursive, sans-serif;
}
</style>
