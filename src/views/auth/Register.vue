<script setup>
import {ref} from "vue";
import {useAuthStore} from "../../store/AuthStore.js";
const auth = useAuthStore();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  nic: '',
  address1: '',
  address2: '',
  isActive: true,
});

const authForm = ref({
  email: '',
  fullName: '',
  userName: '',
  password: '',
})

const submit = async ()  => {
  authForm.value.email = form.value.email;
  authForm.value.fullName = form.value.firstName + ' ' + form.value.lastName;
  form.value.user = authForm.value;
  await auth.register(form.value)
}
</script>

<template>
  <div class="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center mb-4">Registration Form</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label for="firstName" class="block mb-1">First Name</label>
        <input type="text" v-model="form.firstName" id="firstName" name="firstName" placeholder="Enter your first name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <div>
        <label for="lastName" class="block mb-1">Last Name</label>
        <input type="text" v-model="form.lastName" id="lastName" name="lastName" placeholder="Enter your last name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <div>
        <label for="email" class="block mb-1">Email</label>
        <input type="email" v-model="form.email" id="email" name="email" placeholder="Enter your email address" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <div>
        <label for="contactNumber" class="block mb-1">Contact Number</label>
        <input type="tel" v-model="form.contactNumber" id="contactNumber" name="contactNumber" placeholder="Enter your contact number" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <div>
        <label for="nic" class="block mb-1">NIC</label>
        <input type="text" v-model="form.nic" id="nic" name="nic" placeholder="Enter your NIC number" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <div>
        <label for="address1" class="block mb-1">Address Line 1</label>
        <input type="text" v-model="form.address1" id="address1" name="address1" placeholder="Enter your address" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <div>
        <label for="address2" class="block mb-1">Address Line 2</label>
        <input type="text" v-model="form.address2" id="address2" name="address2" placeholder="Enter your address (optional)" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <div>
        <label for="userName" class="block mb-1">Username</label>
        <input type="text" v-model="authForm.userName" id="userName" name="userName" placeholder="Choose a userName" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <div>
        <label for="password" class="block mb-1">Password</label>
        <input type="password" v-model="authForm.password" id="password" name="password" placeholder="Enter your password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Register</button>
    </form>
  </div>
</template>

<style scoped>

</style>
