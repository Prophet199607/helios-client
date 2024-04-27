<script setup>

import {useAuthStore} from "../store/AuthStore.js";
const auth = useAuthStore();
import logo from '../assets/images/logo-white.png';
</script>

<template>
  <nav :class="{ 'bg-blue-500': isScrolled, 'bg-transparent': !isScrolled }" class="text-white py-4 absolute top-0 left-0 w-full z-50 transition-colors duration-300">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="flex justify-center">
        <img :src="logo" alt="" width="100">
      </div>
      <!-- Menu -->
      <ul class="flex items-center space-x-6">
        <li><a href="#" class="hover:text-gray-300">Home</a></li>
        <li><a href="#" class="hover:text-gray-300">About</a></li>
        <li><a href="#" class="hover:text-gray-300">Services</a></li>
        <li><a href="#" class="hover:text-gray-300">Contact</a></li>
        <li v-if="!auth.user">
          <div class="flex gap-5">
            <router-link :to="{name: 'login'}" class="hover:text-gray-300">Login</router-link>
            <router-link :to="{name: 'register'}" class="hover:text-gray-300">Register</router-link>
          </div>
        </li>
        <li v-if="auth.user">
          <div class="block relative" x-data="{showChildren:false}" x-on:click.away="showChildren=false">
            <a href="#" class="flex items-center h-10 leading-10 px-4 rounded cursor-pointer no-underline duration-100 mx-1 " x-on:click.prevent="showChildren=!showChildren">
              <div class="relative cursor-pointer">
                <img class="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="">
                <span class="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
            </a>
            <div class="bg-white shadow-md text-gray-800 rounded border border-gray-300 text-sm absolute top-auto right-0 min-w-full w-56 z-30 mt-1" x-show="showChildren" x-transition:enter="transition ease duration-300 transform" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease duration-300 transform" x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-4" style="display: none;">
              <span class="absolute top-0 right-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 mr-8"></span>
              <div class="bg-white rounded w-full relative z-10 py-1">
                <ul class="list-reset">
                  <li class="relative" x-data="{showChildren:false}" @mouseleave="showChildren=false" @mouseenter="showChildren=true">
                    <router-link :to="{name: 'my-profile'}" class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer">
                      <span class="flex-1">My Profile</span> </router-link>
                  </li>
                  <hr>
                  <li class="relative" x-data="{showChildren:false}" @mouseleave="showChildren=false" @mouseenter="showChildren=true">
                    <a href="#" @click="auth.logout()" class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer">
                      <span class="flex-1">Logout</span> </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>


</template>

<style scoped>

</style>
