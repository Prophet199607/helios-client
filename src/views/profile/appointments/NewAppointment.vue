<script setup>

import {ErrorMessage, Field, Form} from "vee-validate";
import {computed, onMounted, ref} from "vue";
import {useAuthStore} from "../../../store/AuthStore.js";
const auth = useAuthStore();

const minDate = ref(null);
const minTime = ref(null);

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

const loggedUser = computed(() => {
  return auth.user;
})

const submit = async ()  => {
  // await auth.register(form.value)
  //     .then(() => {
  //
  //     }).catch(err => {
  //       console.log(err)
  //       toast.error(err.response.data.message, {
  //         position: toast.POSITION.TOP_RIGHT
  //       });
  //     })
}

onMounted(() => {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const currentTimeString = currentDate.toTimeString().split(' ')[0];

  minDate.value = currentDateString;
  minTime.value = currentTimeString;

});
</script>

<template>
  <div class="container max-w-2xl p-6">
    <h2 class="mb-10">New Appointment</h2>
    <Form @submit="submit" class="grid grid-cols-1 gap-6 text-sm">
      <div class="flex justify-between items-center">
        <label for="fullName" class="mb-1 text-gray-600">Full Name</label>
        <div class="flex flex-col w-[400px]">
          <Field type="text" :value="loggedUser.user.fullName" id="fullName" disabled name="fullName" as="input" rules="required"
                 placeholder="Enter your full name"
                 class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 flex-grow"
                 />
          <ErrorMessage name="fullName" class="text-red-500 text-xs mt-[5px] ml-[5px]"/>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <label for="email" class="mb-1 text-gray-600">Email</label>
        <div class="flex flex-col w-[400px]">
          <Field type="email" :value="loggedUser.user.email" id="email" disabled name="email"  as="input" rules="required|email"
                 placeholder="Enter your email address"
                 class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 flex-grow"
                 />
          <ErrorMessage name="email" class="text-red-500 text-xs mt-[5px] ml-[5px]"/>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <label for="doctor" class="mb-1 text-gray-600">Select Doctor</label>
        <div class="flex flex-col w-[400px]">
          <Field v-model="form.doctor" id="doctor" name="doctor"
                 as="select" rules="required"
                  class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 flex-grow"
                  >
            <option disabled value="">Select a doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Brown">Dr. Brown</option>
          </Field>
          <ErrorMessage name="doctor" class="text-red-500 text-xs mt-[5px] ml-[5px]"/>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <label for="date" class="mb-1 text-gray-600">Preferred Date</label>
        <div class="flex flex-col w-[400px]">
          <Field type="date" v-model="form.date" id="date" name="date"
                 as="input" rules="required"
                 class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 flex-grow"
                 ref="dateInput" :min="minDate" />
          <ErrorMessage name="date" class="text-red-500 text-xs mt-[5px] ml-[5px]"/>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <label for="time" class="mb-1 text-gray-600">Preferred Time</label>
        <div class="flex flex-col w-[400px]">
          <Field type="time" v-model="form.time" id="time" name="time"
                 as="input" rules="required"
                 class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 flex-grow"
                 ref="timeInput" :min="minTime"/>
          <ErrorMessage name="time" class="text-red-500 text-xs mt-[5px] ml-[5px]"/>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <label for="message" class="mb-1 text-gray-600">Additional Message (Optional)</label>
        <div class="flex flex-col w-[400px]">
          <Field v-model="form.message" id="message" name="message" rows="3"
                 as="textarea"
                    placeholder="Any additional information you'd like to provide"
                    class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring
                    focus:border-blue-500 flex-grow"></Field>
        </div>
      </div>
      <div class="flex justify-center">
        <button type="submit"
                class=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Submit
          Appointment</button>
      </div>
    </Form>
  </div>

</template>

<style scoped>

</style>
