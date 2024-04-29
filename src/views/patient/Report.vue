<script setup>

import Button from "../../components/Button.vue";
import {useRouter} from "vue-router";
import {usePatientStore} from "../../store/PatientStore.js";
import {ref} from "vue";
import {dateFormat1} from "../../utils/dateUtil.js";
import {Field, Form} from "vee-validate";
import toast from "../../plugins/toast.js";

const router = useRouter()
const patientStore = usePatientStore();

const image_prev = ref(null)
const uploaded_image = ref(null)
let prediction = ref(null)
let isLoading = ref(false)
const searchText = ref("");
let hasAppointment = ref(false)
const appointments = ref(null);

const form = ref({
  reportStatus: "",
  status: 0,
  doctorRemark: "",
  patient: {
    patientId: "1"
  },
  appointment: {
    appointmentId: "1"
  }
})

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

const getAppointmentType = (type) => {
  switch (type) {
    case 1:
      return "Blood Glucose Monitoring";
    case 2:
      return "Diabetic Retinopathy Screening";
    case 3:
      return "Neuropathy Assessment";
    case 4:
      return "Foot Care Examination";
    case 5:
      return "Diabetes Education Session";
    case 6:
      return "Insulin Pump Consultation";
    case 7:
      return "Diabetes Medication Review";
    case 8:
      return "Nutritional Counseling";
    case 9:
      return "Kidney Function Test";
    case 10:
      return "Heart Health Evaluation";
    default:
      return "Unknown Type";
  }
}

const onSearch = (e) => {
  patientStore.getPendingAppointmentsByPatientNic(searchText.value)
      .then((pred) => {
        appointments.value = pred.data;
        hasAppointment.value = true;
      }).catch(err => {
    console.log(err)
  });
}

const submit = async ()  => {
  form.value.reportStatus = prediction.value;
  form.value.appointment.appointmentId = appointments.value[0].appointmentId;
  form.value.patient.patientId = 1;
  await patientStore.addDiagnosis(form.value)
      .then(() => {
        toast("Diagnosis updated successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
          router.push({name: 'dashboard'})
        }, 1000)
      }).catch(err => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      })
}

</script>

<template>

  <div class="flex justify-end mb-5">
    <div class="min-w-xl">
      <div class="relative w-[350px]">
        <input type="text" v-model="searchText" placeholder="Search..."
               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500">
        <button @click="onSearch" class="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white rounded-r-md">
          Search
        </button>
      </div>
    </div>
  </div>

  <div class="flex flex-col md:grid grid-cols-5 gap-8">
    <!-- Smaller portion with the card -->
    <div class="col-span-2 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 md:sticky top-0">
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
          Select Image
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
      <button v-if="prediction" type="button"
              @click="clearData"
              class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-full mt-4">
        Clear
      </button>
    </div>

    <!-- Larger portion with dummy content about diabetic retinopathy -->
    <div class="col-span-3">
      <div class="w-full bg-white shadow-md rounded-lg overflow-hidden" v-for="appointment in appointments"
           :key="appointment.appointmentId">
        <div class="p-4">
          <h2 class="text-lg font-bold mb-2">Appointment Details</h2>
          <p class="text-gray-600 text-sm mb-2"><span class="font-bold">Appointment ID:</span>
            {{ appointment.appointmentId }}</p>
          <p class="text-gray-600 text-sm mb-2"><span class="font-bold mr-2">Status:</span>
            <span class="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs">Pending</span>
          </p>
          <p class="text-gray-600 text-sm mb-2"><span class="font-bold">Type:</span>
            {{ getAppointmentType(appointment.appointmentType) }}</p>
          <p class="text-gray-600 text-sm mb-2"><span class="font-bold">Preferred Date:</span>
            {{ dateFormat1(appointment.preferredDate) }}</p>
          <p class="text-gray-600 text-sm mb-2"><span class="font-bold">Preferred Time:</span>
            {{ appointment.preferredTime }}</p>
          <p class="text-gray-600 text-sm mb-2"><span class="font-bold">Additional Message:</span>
            {{ appointment.additionalMessage }}</p>
          <Form class="w-full" @submit="submit">
            <div class="flex flex-col">
              <label for="message" class="mb-1 text-gray-600">Doctor Remark</label>
              <div class="flex flex-col w-[400px]">
                <Field v-model="form.doctorRemark" id="message" name="message" rows="3"
                       as="textarea"
                       placeholder="Any diagnosis results"
                       class="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring
                    focus:border-blue-500 flex-grow"></Field>
              </div>
            </div>
            <div class="flex mt-2 justify-start" v-if="prediction">
              <button type="submit"
                      class=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                Update</button>
            </div>
          </Form>
        </div>

      </div>
    </div>
  </div>


</template>

