<script setup>
import {ref} from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import {useAuthStore} from "../../store/AuthStore.js";
import toast from "../../plugins/toast.js";
import {useRouter} from "vue-router";
const auth = useAuthStore();
const router = useRouter();

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

const requiredValidation = (value) => {
  if (!value) {
    return 'This field is required!';
  }
  return true;
}



const submit = async ()  => {
  authForm.value.email = form.value.email;
  authForm.value.fullName = form.value.firstName + ' ' + form.value.lastName;
  form.value.user = authForm.value;
  await auth.register(form.value)
      .then(() => {

      }).catch(err => {
        console.log(err)
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      })
}
</script>

<template>
  <div class="absolute top-5 left-5 text-blue-500 text-sm cursor-pointer" @click="router.push({name: 'index'})">
    <i class="fa fa-arrow-left" aria-hidden="true"></i> back to Home
  </div>
  <div class="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center mb-4">Registration Form</h1>
    <Form @submit="submit" class="space-y-4">
      <div>
        <label for="firstName" class="block mb-1">First Name</label>
        <Field type="text" v-model="form.firstName" id="firstName" name="firstName" placeholder="Enter your first name"
               class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
               rules="required"/>
        <ErrorMessage name="firstName" class="text-red-500 text-xs"/>
      </div>
      <div>
        <label for="lastName" class="block mb-1">Last Name</label>
        <Field type="text" v-model="form.lastName" id="lastName" name="lastName" placeholder="Enter your last name"
               class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
               rules="required"/>
        <ErrorMessage name="lastName" class="text-red-500 text-xs"/>
      </div>
      <div>
        <label for="email" class="block mb-1">Email</label>
        <Field type="email" v-model="form.email" id="email" name="email" placeholder="Enter your email address"
               class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
               rules="required|email"/>
        <ErrorMessage name="email" class="text-red-500 text-xs"/>
      </div>
      <div>
        <label for="contactNumber" class="block mb-1">Contact Number</label>
        <Field type="tel" v-model="form.contactNumber" id="contactNumber" name="contactNumber"
               placeholder="Enter your contact number" class="w-full px-4 py-2 border rounded-md focus:outline-none
               focus:ring focus:border-blue-500"
               rules="required"/>
        <ErrorMessage name="contactNumber" class="text-red-500 text-xs"/>
      </div>
      <div>
        <label for="nic" class="block mb-1">NIC</label>
        <Field type="text" v-model="form.nic" id="nic" name="nic" placeholder="Enter your NIC number"
               class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
               rules="required"/>
        <ErrorMessage name="nic" class="text-red-500 text-xs"/>
      </div>
      <div>
        <label for="address1" class="block mb-1">Address Line 1</label>
        <Field type="text" v-model="form.address1" id="address1" name="address1" placeholder="Enter your address"
               class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
               rules="required"/>
        <ErrorMessage name="address1" class="text-red-500 text-xs"/>
      </div>
      <div>
        <label for="address2" class="block mb-1">Address Line 2</label>
        <Field type="text" v-model="form.address2" id="address2" name="address2"
               placeholder="Enter your address (optional)" class="w-full px-4 py-2 border rounded-md focus:outline-none
               focus:ring focus:border-blue-500"
               rules="required"/>
        <ErrorMessage name="address2" class="text-red-500 text-xs"/>
      </div>
      <div>
        <label for="userName" class="block mb-1">Username</label>
        <Field type="text" v-model="authForm.userName" id="userName" name="userName" placeholder="Choose a userName"
               class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
               rules="required"/>
        <ErrorMessage name="userName" class="text-red-500 text-xs"/>
      </div>
      <div>
        <label for="password" class="block mb-1">Password</label>
        <Field type="password" v-model="authForm.password" id="password" name="password"
               placeholder="Enter your password" class="w-full px-4 py-2 border rounded-md
               focus:outline-none focus:ring focus:border-blue-500"
               rules="required"/>
        <ErrorMessage name="password" class="text-red-500 text-xs"/>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600
      transition-colors duration-300">Register</button>
    </Form>
  </div>
</template>

<style scoped>

</style>
