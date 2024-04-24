<script setup>

</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="max-w-md mx-auto bg-white rounded p-5 shadow-md">
      <div class="text-center mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             class="h-12 w-12 mx-auto text-red-500">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V3z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 8h8M9 12h6m-7 4h4" />
        </svg>
        <h1 class="text-2xl font-bold">404 - Page Not Found</h1>
        <p class="text-gray-500">The page you are looking for might have been removed or is temporarily unavailable.</p>
      </div>
      <router-link :to="{name: 'index'}" class="block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Go to Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>