<script setup>

import Navbar from "../components/Navbar.vue";
import {useSettingsStore} from "../store/SettingsStore.js";

const settingsStore = useSettingsStore();

</script>

<template>
  <Head>
    <title>My app</title>
    <meta name="description" content="Your page description">
  </Head>

  <div>
    <Navbar></Navbar>
    <router-view/>
  </div>

</template>

<style scoped>

</style>
