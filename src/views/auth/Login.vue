<script>
import axios from "axios";
const api = axios.create({
  baseURL: "http://124.43.6.45:4545/api",
});
export default {
  layout: null
}
</script>

<script setup>

import {onMounted, ref} from "vue";
import {useAuthStore} from "../../store/AuthStore.js";
const auth = useAuthStore();

import logo from '../../assets/images/logo.png';

const form = ref({
  username: '',
  password: '',
  loca: 'Select a location',
});

const locations = ref([]);

const submit = async ()  => {
  auth.login(form.value)
}

const loadAllLocations = async () => {
  try {
    const {data} = await api.get('/Users/GetAllLocations');
    locations.value = data.locations;
  } catch (error) {

  }
}

onMounted(() => {
  loadAllLocations();
})

</script>

<template>
  <section class="flex flex-col md:flex-row h-screen items-center">

    <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img src="https://source.unsplash.com/random" alt="" class="w-full h-full object-cover">
    </div>

    <div class="bg-white w-full md:max-w-md lg:max-w-full  md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

      <div class="w-full h-100">
        <div class="flex justify-center">
          <img :src="logo" alt="" width="150">
        </div>
        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-5">Log in to your account</h1>

        <form class="mt-3" @submit.prevent="submit">
          <div class="mb-6">
            <label for="email" class="block mb-2 capitalize font-semibold text-base text-gray-700">Location</label>
            <v-select v-model="form.loca" :options="locations" label="Description" :reduce="locations => locations.Code"
                      class="uppercase text-[15px]"></v-select>
            <!--            <div v-if="$page.props.errors.loca" class="text-red-500 text-lg mt-1"-->
            <!--                 v-text="$page.props.errors.loca"></div>-->
          </div>

          <div>
            <label class="block mb-2 capitalize font-semibold text-base text-gray-700" for="email">Username</label>
            <input type="text" name="" id="username" v-model="form.username" placeholder="Enter your username"
                   class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            >
            <!--            <div v-if="$page.props.errors.username" class="text-red-500 font-normal text-xs mt-1"-->
            <!--                 v-text="$page.props.errors.username"></div>-->
          </div>

          <div class="mt-4">
            <label class="block mb-2 capitalize font-semibold text-base text-gray-700" for="password">Password</label>
            <input type="password" v-model="form.password" id="password" placeholder="Enter Password"
                   class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border
                               focus:border-blue-500
                                            focus:bg-white focus:outline-none">
            <!--            <div v-if="$page.props.errors.password" class="text-red-500 font-normal text-xs mt-1"-->
            <!--                 v-text="$page.props.errors.password"></div>-->
          </div>

<!--          <div class="text-right mt-2">-->
<!--            <a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">-->
<!--              Forgot-->
<!--              Password?</a>-->
<!--          </div>-->

          <button type="submit" class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400
                    text-white font-semibold rounded-lg px-4 py-3 mt-6"
                  :class="{'cursor-not-allowed bg-blue-300': form.processing}"
                  :disabled="form.processing">Log In
          </button>
        </form>
      </div>
    </div>

  </section>
</template>

<style scoped>
::v-deep(.vs__search) {
  padding: 2px 4px;
}
::v-deep(.vs1__listbox)  {
  font-size: 0.50rem !important;
}
</style>
