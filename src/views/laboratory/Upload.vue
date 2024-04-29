<script setup>

import {ref} from "vue";
import {useAuthStore} from "../../store/AuthStore.js";
import {useAppointmentStore} from "../../store/AppointmentStore.js";
import toast from "../../plugins/toast.js";
import {useRouter} from "vue-router";
import Button from "../../components/Button.vue";
import {usePatientStore} from "../../store/PatientStore.js";
import {dateFormat1} from "../../utils/dateUtil.js";

const router = useRouter()
const auth = useAuthStore();
const appointmentStore = useAppointmentStore();
const patientStore = usePatientStore();

const searchText = ref("");
const appointments = ref(null);

const form = ref({
  isAccepted: false,
  status: 0,
  appointmentType: "",
  additionalMessage: "",
  preferredDate: "",
  preferredTime: "",
  patient: {
    patientId: "1"
  }
});

const submit = async () => {
  await appointmentStore.saveAppointment(form.value)
      .then(() => {
        toast("Appointment created successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
          router.push({name: 'appointments'})
        }, 3000)
      }).catch(err => {
        console.log(err)
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      })
}

const image_prev = ref(null)
const uploaded_image = ref(null)
let prediction = ref(null)
let hasAppointment = ref(false)

const onSearch = (e) => {
  patientStore.getPendingAppointmentsByPatientNic(searchText.value)
      .then((pred) => {
        appointments.value = pred.data;
        hasAppointment.value = true;
      }).catch(err => {
    console.log(err)
  });
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

const changeImages = (e) => {
  image_prev.value = null;
  prediction.value = null;
  const file = e.target.files[0];
  image_prev.value = URL.createObjectURL(file);
  uploaded_image.value = file;
  let form = new FormData();
  form.append('file', file)
}

const clearData = () => {
  hasAppointment.value = true;
  image_prev.value = null;
  prediction.value = null;
  uploaded_image.value = null;
}
</script>

<template>
  <div class="container p-6">
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

    <div class="grid grid-cols-1 md:grid-cols-5 gap-x-3">
      <div class="col-span-3">
        <div class="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden" v-for="appointment in appointments"
             :key="appointment.appointmentId">
          <div class="p-4">
            <h2 class="text-lg font-bold mb-2">Appointment Details</h2>
            <p class="text-gray-600 text-sm mb-2"><span class="font-bold">Appointment ID:</span>
              {{ appointment.appointmentId }}</p>
            <p class="text-gray-600 text-sm mb-2"><span class="font-bold">Status:</span>
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
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <Form @submit="submit" class="grid grid-cols-1 gap-6 text-sm">
          <div class="col-span-2 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 md:sticky top-0">
            <label for="image" class="block text-sm font-medium text-gray-700">Upload Retinal Image</label>

            <div class="flex items-center justify-center w-full h-64 overflow-hidden">
              <img v-if="image_prev" :src="image_prev" alt="Preview Image"
                   class="cursor-pointer object-cover rounded-lg shadow-lg">
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
                <span class="text-gray-500">No Image</span>
              </div>
            </div>
            <div class="relative w-full" v-if="hasAppointment">
              <input type="file"
                     id="images"
                     multiple
                     class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                     @change="changeImages"
                     accept="image/*">
              <button type="button"
                      @click="uploadImages"
                      class="text-gray-800 font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 bg-white
                       hover:bg-blue-600 ease-in-out w-full">
                Select Image
              </button>
            </div>
            <button v-else type="button"
                    class="text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 bg-gray-400
                    cursor-not-allowed ease-in-out w-full">
              Select Image
            </button>
            <button type="button"
                    v-if="hasAppointment"
                    @click="uploadImages"
                    class="text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 bg-blue-500 hover:bg-blue-600 ease-in-out w-full">
              Upload Image
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
