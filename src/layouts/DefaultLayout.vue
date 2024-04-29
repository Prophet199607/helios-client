<script setup>

import Navbar from "../components/Navbar.vue";
import {useSettingsStore} from "../store/SettingsStore.js";
import Footer from "../components/Footer.vue";

const settingsStore = useSettingsStore();

</script>

<template>
  <Head>
    <title>Helios</title>
    <meta name="description" content="Your page description">
  </Head>

  <div>
    <Navbar></Navbar>
    <router-view/>
    <Footer></Footer>
  </div>

</template>

<style scoped>

</style>
