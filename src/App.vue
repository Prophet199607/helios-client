<script setup>
import {useAuthStore} from "./store/AuthStore.js";
import {onMounted} from "vue";

const auth = useAuthStore();



onMounted(() => {
  auth.checkUserLogStatus();
})

</script>

<template>
  <router-view />
</template>

<style scoped>

</style>
