<script setup>
import {useSettingsStore} from "../store/SettingsStore.js";
import {useAuthStore} from "../store/AuthStore.js";
const settings = useSettingsStore();
const auth = useAuthStore();

const closeSidebar = () => {
  alert(0)
}

</script>

<template>
  <transition name="fade" mode="out-in">
    <div class="absolute z-50 w-[300px] h-[calc(100%-58px)] bg-white p-3 text-white my-settings shadow-2xl"
         :class="{ 'hidden': !settings.isSidebarOpen, 'md:flex': settings.isSidebarOpen }">
      <ul class="flex flex-col gap-y-1">
        <li @click="settings.toggleSidebar" class=" px-2 rounded">
          <router-link :to="{name: 'home'}" class="no-underline text-base text-gray-800 capitalize font-semibold flex items-center
          gap-x-3 w-[260px] hover:no-underline hover:bg-blue-100 hover:text-gray-800 px-3 py-3 rounded-md"
          active-class="bg-blue-900 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>
            Home
          </router-link>
        </li>
        <li @click="settings.toggleSidebar" class=" px-2 rounded">
          <router-link :to="{name: 'collections-index'}" class="no-underline text-base text-gray-800 capitalize font-semibold flex items-center
          gap-x-3 w-[260px] hover:no-underline hover:bg-blue-100 hover:text-gray-800 px-3 py-3 rounded-md"
                       active-class="bg-blue-900 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15c0-1.09 1.01-1.85 2.7-1.85c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61c0 2.31 1.91 3.46 4.7 4.13c2.5.6 3 1.48 3 2.41c0 .69-.49 1.79-2.7 1.79c-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55c0-2.84-2.43-3.81-4.7-4.4"/></svg>
            Collections
          </router-link>
        </li>
        <li @click="settings.toggleSidebar" class=" px-2 rounded">
          <router-link :to="{name: 'sales-orders-index'}" class="no-underline text-base text-gray-800 capitalize font-semibold flex items-center
          gap-x-3 w-[260px] hover:no-underline hover:bg-blue-100 hover:text-gray-800 px-3 py-3 rounded-md"
                       active-class="bg-blue-900 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M13 10h-2V8h2zm0-4h-2V1h2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2m-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03L21 4.96L19.25 4l-3.7 7H8.53L4.27 2H1v2h2l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7z"/></svg>
            Sales Order
          </router-link>
        </li>
        <li @click="auth.logout()" class=" px-2 rounded">
          <div class="no-underline text-base text-gray-800 capitalize font-semibold flex items-center
          gap-x-3 w-[260px] hover:no-underline hover:bg-blue-100 hover:text-gray-800 px-3 py-3 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3h-2v10h2zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.932 8.932 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83"/></svg>
            Logout
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.my-settings {
  transition-property: opacity, transform;
  transition-duration: 0.3s;
}
</style>
