<script setup>

import {computed, onMounted} from "vue";
import {useAppointmentStore} from "../../../store/AppointmentStore.js";
import {dateFormat1} from "../../../utils/dateUtil.js";

const appointmentStore = useAppointmentStore();

const appointments = computed(() => {
  return appointmentStore.appointments;
})

onMounted(() => {
  appointmentStore.getAllPatientAppointments();
})
</script>

<template>
  <div class="w-full mt-5">
    <div class="overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table class="table-auto w-full border-collapse border border-gray-300 rounded-lg" aria-describedby>
        <thead>
        <tr class="text-gray-800">
          <th class="px-4 py-2 text-sm rounded-tl-lg">Appointment ID</th>
          <th class="px-4 py-2 text-sm">Status</th>
          <th class="px-4 py-2 text-sm">Type</th>
          <th class="px-4 py-2 text-sm">Preferred Date</th>
          <th class="px-4 py-2 text-sm">Preferred Time</th>
          <th class="px-4 py-2 text-sm">Additional Message</th>
        </tr>
        </thead>
        <tbody class="text-sm">
        <tr v-for="appointment in appointments" :key="appointment.appointmentId">
          <td class="border px-4 py-2">{{appointment.appointmentId}}</td>
          <td class="border px-4 py-2">
            <span class="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm" v-if="appointment.status === 0">Pending</span>
            <span class="bg-green-500 text-white px-2 py-1 rounded-md text-sm" v-if="appointment.status !== 0">Completed</span>
          </td>
          <td class="border px-4 py-2">Diabetic Retinopathy Screening</td>
          <td class="border px-4 py-2 text-right">{{dateFormat1(appointment.preferredDate)}}</td>
          <td class="border px-4 py-2 text-right">{{appointment.preferredTime}}</td>
          <td class="border px-4 py-2">{{appointment.additionalMessage}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
