<script setup>
import toast from "../plugins/toast.js";

document.addEventListener('DOMContentLoaded', function () {
  // Add smooth scrolling to all links with the class 'smooth-scroll'
  const scrollLinks = document.querySelectorAll('.smooth-scroll');
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

import { Form, Field, ErrorMessage } from 'vee-validate';
import {ref} from "vue";


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
</script>

<template>

  <!-- Hero Section -->
  <section id="header-section" class="relative bg-blue-500 text-white py-[250px] bg-cover bg-center filter brightness-80 contrast-125 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="lg:w-3/4 xl:w-2/4 p-[20px] relative z-10 h-100 ">
      <div>
        <h1 class="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">A better life starts with a
          beautiful
          Eyes.</h1>
        <p class="text-white text-xl md:text-2xl leading-snug mt-4">Welcome to the Helios. Your trusted Diabetic retinopathy prevension partner</p>
        <a href="#features" class="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold scroll-smooth">
          Make an Appointment</a>
      </div>
    </div>
  </section>

  <section id="services" class="bg-gray-100 py-20 p-5">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service 1: Retinopathy Screening -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">Retinopathy Screening</h3>
          <p class="text-gray-700 mb-4">Advanced screening techniques to detect diabetic retinopathy at early stages.</p>
          <a href="#" class="text-blue-500 hover:underline">Learn More</a>
        </div>

        <!-- Service 2: Diabetic Management -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">Diabetic Management</h3>
          <p class="text-gray-700 mb-4">Personalized management plans to control diabetes and prevent complications.</p>
          <a href="#" class="text-blue-500 hover:underline">Learn More</a>
        </div>

        <!-- Service 3: AI-based Diagnosis -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">AI-based Diagnosis</h3>
          <p class="text-gray-700 mb-4">Utilizing AI algorithms for accurate diagnosis and severity level assessment.</p>
          <a href="#" class="text-blue-500 hover:underline">Learn More</a>
        </div>
      </div>
    </div>
  </section>

  <div class="container mx-auto mt-10 grid grid-cols-3 gap-6">

    <!-- Left Section with Image Card -->
    <div class="rounded-lg overflow-hidden relative shadow-lg col-span-2">
      <div class="absolute inset-0 bg-blend-overlay"></div>
      <img src="../../public/images/appointment.jpg" alt="Doctor Image" class="w-full h-full object-cover" />
    </div>
    <!-- Right Section with Form Card -->
    <div class="container absolute right-32 mx-auto max-w-lg mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center mb-8">Make an Appointment</h1>
      <Form @submit="submit" class="grid grid-cols-2 gap-6 text-sm">
        <div>
          <label for="fullName" class="block mb-1 text-gray-600">Full Name</label>
          <Field type="text" v-model="form.fullName" id="fullName" name="fullName" placeholder="Enter your full name"
                 class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                 rules="required"/>
          <ErrorMessage name="fullName" class="text-red-500 text-xs"/>
        </div>
        <div>
          <label for="email" class="block mb-1 text-gray-600">Email</label>
          <Field type="email" v-model="form.email" id="email" name="email" placeholder="Enter your email address"
                 class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                 rules="required|email"/>
          <ErrorMessage name="email" class="text-red-500 text-xs"/>
        </div>
        <div>
          <label for="phone" class="block mb-1 text-gray-600">Phone Number</label>
          <Field type="tel" v-model="form.phone" id="phone" name="phone" placeholder="Enter your phone number"
                 class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                 rules="required"/>
          <ErrorMessage name="phone" class="text-red-500 text-xs"/>
        </div>
        <div>
          <label for="doctor" class="block mb-1 text-gray-600">Select Doctor</label>
          <select v-model="form.doctor" id="doctor" name="doctor"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  rules="required">
            <option disabled value="">Select a doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Brown">Dr. Brown</option>
          </select>
          <ErrorMessage name="doctor" class="text-red-500 text-xs"/>
        </div>
        <div>
          <label for="date" class="block mb-1 text-gray-600">Preferred Date</label>
          <Field type="date" v-model="form.date" id="date" name="date"
                 class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                 rules="required"/>
          <ErrorMessage name="date" class="text-red-500 text-xs"/>
        </div>
        <div>
          <label for="time" class="block mb-1 text-gray-600">Preferred Time</label>
          <Field type="time" v-model="form.time" id="time" name="time"
                 class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                 rules="required"/>
          <ErrorMessage name="time" class="text-red-500 text-xs"/>
        </div>
        <div class="col-span-2">
          <label for="message" class="block mb-1 text-gray-600">Additional Message (Optional)</label>
          <textarea v-model="form.message" id="message" name="message" rows="3" placeholder="Any additional information you'd like to provide"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"></textarea>
          <ErrorMessage name="message" class="text-red-500 text-xs"/>
        </div>
        <div class="col-span-2">
          <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Submit Appointment</button>
        </div>
      </Form>
    </div>
  </div>





  <!-- Features Section -->
  <section class="py-16" id="features">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Key Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">Fast Diagnosis</h3>
          <p class="text-gray-600">Get quick and accurate diagnosis results using our advanced ML model.</p>
        </div>
        <!-- Add more feature cards -->
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-blue-500 text-white py-8 text-center">
    <p>&copy; 2024 Helios - All rights reserved.</p>
  </footer>
</template>

<style scoped>
#header-section {
  background-image: url('../../images/cover-bg.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(80%) contrast(120%);
}
</style>
