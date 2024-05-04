<script setup>

import {useSettingsStore} from "../store/SettingsStore.js";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import {useAuthStore} from "../store/AuthStore.js";
import UserSidebar from "../components/UserSidebar.vue";

const auth = useAuthStore();

const settingsStore = useSettingsStore();

</script>

<template>
  <Head>
    <title>Helios</title>
    <meta name="description" content="Your page description">
  </Head>



  <div class="absolute  right-3 hidden md:flex top-3 justify-between w-full items-center transition-all duration-500 ease-in-out"
       :class="[
        settingsStore.getSideBarState() ? 'w-[calc(100%-14rem)]' : 'w-full',
      ]">
    <div class="transition-all duration-500 ease-in-out" :class="[
        settingsStore.getSideBarState() ? 'ml-[300px]' : 'ml-[100px]',
      ]">
    </div>
    <div class="block relative" x-data="{showChildren:false}" x-on:click.away="showChildren=false">
      <a href="#" class="flex items-center h-10 leading-10 px-4 rounded cursor-pointer no-underline  duration-100 mx-1 "
         x-on:click.prevent="showChildren=!showChildren">
        <div class="relative cursor-pointer">
          <img class="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
               alt="">
          <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
        </div>
      </a>
      <div
          class="bg-white shadow-md rounded border border-gray-300 text-sm absolute top-auto right-0 min-w-full w-56 z-30 mt-1"
          x-show="showChildren" x-transition:enter="transition ease duration-300 transform"
          x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0"
          x-transition:leave="transition ease duration-300 transform"
          x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-4"
          style="display: none;">
        <span class="absolute top-0 right-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 mr-8"></span>
        <div class="bg-white rounded w-full relative z-10 py-1">
          <ul class="list-reset">
            <li class="relative" x-data="{showChildren:false}" @mouseleave="showChildren=false"
                @mouseenter="showChildren=true">
              <a href="#"
                 class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer">
                <span class="flex-1">Profile</span> </a>
            </li>
            <hr>
            <li class="relative" x-data="{showChildren:false}" @mouseleave="showChildren=false"
                @mouseenter="showChildren=true">
              <a href="#" @click="auth.logout()"
                 class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer">
                <span class="flex-1">Logout</span> </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <UserSidebar class="transition-all duration-300 z-50 absolute top-0"></UserSidebar>

  <!-- main content start -->
  <div
      class="transition-all duration-500 ease-in-out"
      :class="[
        settingsStore.getSideBarState() ? 'md:w-[calc(100%-18rem)] md:ml-72 sm:ml-0 sm:w-full' : 'w-full',
      ]"
  >
    <section class="p-6 -z-40 mt-[70px] md:mt-[50px]">
      <div class=" mx-auto transition-all duration-500 ease-in-out"
           :class="[
        settingsStore.getSideBarState() ? 'ml-[0px]' : 'ml-[75px]',
      ]">
        <router-view/>
      </div>
    </section>
  </div>
  <!-- main content end -->
</template>
