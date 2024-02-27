<script setup>
import {useSettingsStore} from "../store/SettingsStore.js";

const settings = useSettingsStore();

const toggle = () => {
  settings.toggleSidebar()
}

</script>

<template>
  <div @click="toggle" class="cursor-pointer p-0">
    <div :class="{ 'hidden': settings.isSidebarOpen, 'block': !settings.isSidebarOpen }">
      <div class="w-6 h-1 mb-1 bg-white"></div>
      <div class="w-6 h-1 mb-1 bg-white"></div>
      <div class="w-6 h-1 bg-white"></div>
    </div>
    <div :class="{ 'hidden': !settings.isSidebarOpen, 'block': settings.isSidebarOpen }">
      <div class="w-6 h-1 mb-1 bg-white transform rotate-45 origin-center"></div>
      <div class="w-6 h-1 mb-1 bg-white opacity-0"></div>
      <div class="w-6 h-1 bg-white transform -rotate-45 origin-center"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
