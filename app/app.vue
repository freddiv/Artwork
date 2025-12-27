<script setup lang="ts">
const toaster = { position: "top-right" };
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp :toaster="toaster">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
