<script setup>
import {computed, onMounted} from "vue";
import {usePatientStore} from "../store/PatientStore.js";

const patientStore = usePatientStore();
import {dateFormat1} from "../utils/dateUtil.js";

const diagnoses = computed(() => {
  return patientStore.diagnoses;
})

onMounted(() => {
  patientStore.getDiagnoses();
})

</script>

<template>
  <div v-for="diagnosis in diagnoses" :key="diagnosis.diagnosisId" class="mb-3">
    <div class="bg-white rounded-lg shadow-lg p-4 w-full text-sm">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg font-bold">Patient Diagnosis <span class="bg-green-500 text-white text-sm font-medium bg-green px-2 py-1 rounded-md">Examined</span></h2>
        <span class="text-gray-500">Report ID: #{{ diagnosis.diagnosisId }}</span>
      </div>
      <div class="border-b border-gray-300 pb-3 mb-3">
        <div class="flex justify-between">
          <div>
            <h3 class="text-md font-semibold">Report Status:</h3>
            <p class="text-gray-700">{{ diagnosis.reportStatus }}</p>
          </div>
        </div>

      </div>
      <div class="border-b border-gray-300 pb-3 mb-3">
        <h3 class="text-md font-semibold">Doctor's Remark:</h3>
        <p class="text-gray-700">{{ diagnosis.doctorRemark }}</p>
      </div>
      <div class="flex justify-between">
        <div>
          <h3 class="text-md font-semibold">Appointment ID:</h3>
          <p class="text-gray-700">#{{ diagnosis.appointment.appointmentId }}</p>
        </div>
        <div>
          <h3 class="text-md font-semibold">Created Date:</h3>
          <p class="text-gray-700">{{ dateFormat1(diagnosis.createDate) }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
