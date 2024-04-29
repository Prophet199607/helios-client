<script setup>
import {useRouter} from "vue-router";
import SuccessButton from "../../components/SuccessButton.vue";
import 'vue-select/dist/vue-select.css';
import {Field, Form, ErrorMessage} from 'vee-validate';
import {ref} from "vue";
import DefaultButton from "../../components/DefaultButton.vue";

const customerStore = useCustomerStore();
const router = useRouter();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  nic: '',
  userType: '',
  isActive: true,
});
const submit = () => {
  console.log("okk")
}

</script>

<template>
  <div>
    <div class="mb-5 text-sm">
      <router-link :to="{name: 'patients'}" class="flex items-center gap-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
          <path fill="currentColor" d="M17.51 3.87L15.73 2.1L5.84 12l9.9 9.9l1.77-1.77L9.38 12z"/>
        </svg>
        Back
      </router-link>
    </div>
    <div class=" mx-auto bg-white p-6 rounded-lg shadow-lg">
      <Form @submit="submit" class="text-sm">
        <div class="flex items-center mb-4">
          <label for="firstName" class="block mb-1 w-[250px]">First Name</label>
          <div class="w-[550px]">
            <Field type="text" v-model="form.firstName" id="firstName" name="firstName"
                   placeholder="Enter your first name"
                   class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                   rules="required"/>
            <ErrorMessage name="firstName" class="text-red-500 text-xs"/>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <label for="lastName" class="block mb-1 w-[250px]">Last Name</label>
          <div class="w-[550px]">
            <Field type="text" v-model="form.lastName" id="lastName" name="lastName" placeholder="Enter your last name"
                   class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                   rules="required"/>
            <ErrorMessage name="lastName" class="text-red-500 text-xs"/>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <label for="email" class="block mb-1 w-[250px]">Email</label>
          <div class="w-[550px]">
            <Field type="email" v-model="form.email" id="email" name="email" placeholder="Enter your email address"
                   class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                   rules="required|email"/>
            <ErrorMessage name="email" class="text-red-500 text-xs"/>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <label for="contactNumber" class="block mb-1 w-[250px]">Contact Number</label>
          <div class="w-[550px]">
            <Field type="tel" v-model="form.contactNumber" id="contactNumber" name="contactNumber"
                   placeholder="Enter your contact number" class="w-full px-4 py-2 border rounded-md focus:outline-none
           focus:ring focus:border-blue-500"
                   rules="required"/>
            <ErrorMessage name="contactNumber" class="text-red-500 text-xs"/>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <label for="nic" class="block mb-1 w-[250px]">NIC</label>
          <div class="w-[550px]">
            <Field type="text" v-model="form.nic" id="nic" name="nic" placeholder="Enter your NIC number"
                   class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                   rules="required"/>
            <ErrorMessage name="nic" class="text-red-500 text-xs"/>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <label for="selectOption" class="block mb-1 w-[250px]">Select Option</label>
          <div class="w-[550px]">
            <Field as="select" v-model="form.userType" id="selectOption" name="selectOption"
                   class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                   rules="required">
              <option value="" disabled>User Type</option>
              <option value="doc">Doctor</option>
              <option value="lab">Laboratory User</option>
            </Field>
            <ErrorMessage name="selectOption" class="text-red-500 text-xs"/>
          </div>
        </div>
        <div class="flex gap-x-2 mt-5">
          <SuccessButton type="submit">Save</SuccessButton>
          <DefaultButton>Cancel</DefaultButton>
        </div>
      </Form>
    </div>
  </div>
</template>
