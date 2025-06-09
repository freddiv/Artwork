<template>
  <div class="layout-container bg-gray-50">
    <header class="bg-gray-500 text-white p-4">
      <h1 class="text-xl font-bold">My Nuxt App</h1>
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
    <footer class="bg-gray-500 text-white p-4 mt-4">
      <p>&copy; 2023 My Nuxt App</p>
    </footer>
 </div>
</template>

<style lang="postcss" scoped>
.layout-container {
  height: calc(100vh - 4rem);
  background-color: var(--ui-bg);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


</style>