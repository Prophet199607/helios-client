<script setup>
import HamburgerMenu from "./HamburgerMenu.vue";
import {useAuthStore} from "../store/AuthStore.js";
const auth = useAuthStore();

const connectPrint = () => {
  Android.connectPrint();
}

</script>

<template>
  <nav class="bg-blue-500 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <a href="#" class="text-xl font-bold">Helios</a>
      <!-- Menu -->
      <ul class="flex space-x-6">
        <li><a href="#" class="hover:text-gray-300">Home</a></li>
        <li><a href="#" class="hover:text-gray-300">About</a></li>
        <li><a href="#" class="hover:text-gray-300">Services</a></li>
        <li><a href="#" class="hover:text-gray-300">Contact</a></li>
        <li>
          <div class="flex gap-5">
            <router-link :to="{name: 'login'}" v-show="!auth.user" class="hover:text-gray-300">Login</router-link>
            <router-link :to="{name: 'register'}" v-show="!auth.user" class="hover:text-gray-300">Register</router-link>
            <a href="#" @click="auth.logout()" v-if="auth.user" class="hover:text-gray-300">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>
