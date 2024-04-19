<script setup>

import Button from "../../components/Button.vue";
import {useRouter} from "vue-router";
import {usePatientStore} from "../../store/PatientStore.js";

const router = useRouter()
const patientStore = usePatientStore();

const image_prev = ref(null)
const uploaded_image = ref(null)
let prediction = ref(null)
let isLoading = ref(false)

const changeImages = (e) => {
  isLoading.value = true;
  image_prev.value = null;
  prediction.value = null;
  const file = e.target.files[0];
  image_prev.value = URL.createObjectURL(file);
  uploaded_image.value = file;
  let form = new FormData();
  form.append('file', file)
  patientStore.getPredictions(form)
      .then((pred) => {
        prediction.value = pred.class;
        isLoading.value = false;
      }).catch(err => {
    console.log(err)
  });
}

const clearData = () => {
  isLoading.value = false;
  image_prev.value = null;
  prediction.value = null;
  uploaded_image.value = null;
}

</script>

<template>

  <div class="grid grid-cols-5 gap-8">
    <!-- Smaller portion with the card -->
    <div class="col-span-2 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4">
      <label for="images" class="block text-sm font-medium text-gray-700">Upload Image</label>
      <div class="relative w-full">
        <!-- Use a variable (e.g., isLoading) to track if the button is loading -->
        <input type="file"
               id="images"
               multiple
               class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
               @change="changeImages"
               accept="image/*">
        <button type="button"
                @click="uploadImages"
                :class="{ 'bg-blue-500 hover:bg-blue-600': !isLoading, 'bg-gray-400 cursor-not-allowed': isLoading }"
                class="text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-full">
          <!-- Show spinner when loading -->
          <span v-if="isLoading" class="mr-2 animate-spin">&#9696;</span>
          Select Images
        </button>
      </div>
      <div class="flex items-center justify-center w-full h-64 overflow-hidden">
        <img v-if="image_prev" :src="image_prev" alt="Preview Image"
             class="cursor-pointer object-cover rounded-lg shadow-lg">
        <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
          <span class="text-gray-500">No Image</span>
        </div>
      </div>
      <div v-if="prediction" class="bg-green-100 border border-green-300 rounded-lg p-2 text-green-800 font-medium">
        <span>Prediction: </span>
        <span class="italic">{{ prediction }}</span>
      </div>
      <button type="button"
              @click="clearData"
              class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-full mt-4">
        Clear
      </button>
    </div>

    <!-- Larger portion with dummy content about diabetic retinopathy -->
    <div class="col-span-3 bg-white shadow-lg rounded-lg p-6 space-y-4">
      <!-- Section 1: Introduction -->
      <div class="border-b pb-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Introduction</h2>
        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor libero eget ipsum
          ultricies consequat.</p>
      </div>

      <!-- Section 2: Causes -->
      <div class="border-b pb-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Causes</h2>
        <ul class="list-disc pl-4">
          <li class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li class="text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
          <li class="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </li>
        </ul>
      </div>

      <!-- Section 3: Symptoms -->
      <div class="border-b pb-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Symptoms</h2>
        <ul class="list-disc pl-4">
          <li class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li class="text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
          <li class="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </li>
        </ul>
      </div>

      <!-- Section 4: Treatment -->
      <div class="border-b pb-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Treatment</h2>
        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor libero eget ipsum
          ultricies consequat.</p>
      </div>

      <!-- Section 5: Prevention -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Prevention</h2>
        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor libero eget ipsum
          ultricies consequat.</p>
      </div>
    </div>
  </div>


</template>

