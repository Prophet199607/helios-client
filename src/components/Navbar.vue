<script setup>
import HamburgerMenu from "./HamburgerMenu.vue";
import {useAuthStore} from "../store/AuthStore.js";
const auth = useAuthStore();

const connectPrint = () => {
  Android.connectPrint();
}

</script>

<template>
  <nav class="flex flex-col md:flex-row justify-between w-full">
    <ul class="flex space-x-6">
      <li class="mt-3 md:mt-0">
        <HamburgerMenu></HamburgerMenu>
      </li>
      <li>
        <router-link to="/collections" class="text-white">Dinapala Group (pvt) Ltd</router-link>
      </li>
    </ul>
    <ul class="flex gap-x-3">
      <router-link to="/login" v-if="!auth.user">Login</router-link>
      <li class="text-white ml-[49px] md:ml-auto text-xs md:text-base">
        Welcome! <span class="font-bold">{{ auth.user?.Emp_Name }}</span>
        <div class="font-semibold block lg:hidden">{{ auth.user.loca }}</div>
      </li>
      <li class="text-white hidden md:block">|</li>
      <li class="text-white ml-[49px] md:ml-auto text-xs md:text-base hidden md:block">
        <span class="font-semibold">{{ auth.user.loca }}</span>
      </li>
      <div @click="auth.logout()" v-if="auth.user" class="cursor-pointer text-white hidden md:flex items-center gap-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3h-2v10h2zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.932 8.932 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83"/></svg>
        Logout</div>
    </ul>
    <ul class="absolute right-2 top-5">
      <li class="text-white cursor-pointer md:ml-auto text-xs md:text-base lg:hidden block" @click="connectPrint" >
        <div class="flex justify-end w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3m-3 11H8v-5h8zm3-7c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m-1-9H6v4h12z"/></svg>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
