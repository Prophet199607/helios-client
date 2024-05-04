<script setup>
defineProps({
  items: {
    type: Array,
  },
});
</script>

<template>
  <div class="w-full text-left">
    <nav aria-label="breadcrumb" class="block w-full">
      <ol class="flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60 py-2 px-4">
        <li class="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900
        antialiased transition-colors duration-300 hover:text-pink-500">
          <router-link :to="{name: 'dashboard'}" class="opacity-60">
            <span>Dashboard</span>
          </router-link>
          <span class="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal
          text-blue-gray-500 antialiased" v-if="items.length !== 0">
          /
        </span>
        </li>
        <li class="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900
        antialiased transition-colors duration-300 hover:text-pink-500"
        v-for="(item, index) in items" :key="index">
          <router-link :to="{name: item.path_name}" class="opacity-60" href="#">
            <span>{{ item.name }}</span>
          </router-link>
          <span class="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal
          text-blue-gray-500 antialiased" v-if="item.hasMore">
          /
        </span>
        </li>
      </ol>
    </nav>
  </div>
</template>
