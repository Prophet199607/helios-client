<script setup>
import DashboardCard from "../components/DashboardCard.vue";
import {ref} from "vue";

import user from '../assets/svg/user.svg';
import eye from '../assets/svg/eye.svg';

const expanded = ref(false)
</script>

<template>
  <div>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
        <dashboard-card
            :svg_icon="user"
            title="Total Patients"
            title_class="text-base-c"
            value="15"
            bg_color="bg-green-200"
        ></dashboard-card>
        <dashboard-card
            :svg_icon="eye"
            title="DR Cases"
            title_class="text-base-c"
            value="5"
            bg_color="bg-red-200"
        ></dashboard-card>
        <dashboard-card
            svg_icon="payment_company"
            title="Total Collections"
            title_class="text-sm-c"
            value="LKR 0.00"
            bg_color="bg-teal-200"
        ></dashboard-card>
        <dashboard-card
            svg_icon="cash_payment"
            title="Daily patients"
            title_class="text-base-c"
            value="LKR 0.00"
            bg_color="bg-yellow-300"
        ></dashboard-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
