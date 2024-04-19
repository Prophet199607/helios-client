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

      <div class="grid grid-cols-1 md:grid-cols-4 gap-2" v-if="expanded">
        <dashboard-card
            svg_icon="card_payment"
            title="Card payments"
            title_class="text-base-c"
            value="LKR 0.00"
            bg_color="bg-purple-300"
        ></dashboard-card>
        <dashboard-card
            svg_icon="wallt_paymt"
            title="Wallet payments"
            title_class="text-base-c"
            value="LKR 0.00"
            bg_color="bg-pink-500"
        ></dashboard-card>
        <dashboard-card
            svg_icon="new_user"
            title="New Users"
            title_class="text-base-c"
            value="0"
            bg_color="bg-pink-800"
        ></dashboard-card>
        <dashboard-card
            svg_icon="number_trip"
            title="Completed Trips"
            title_class="text-base-c"
            value="0"
            bg_color="bg-green-400"
        ></dashboard-card>
        <dashboard-card
            svg_icon="trip_cancelled"
            title="Cancelled Trips"
            title_class="text-base-c"
            value="0"
            bg_color="bg-red-700"
        ></dashboard-card>
        <dashboard-card
            svg_icon="active_passenger"
            title="Active Passengers"
            title_class="text-base-c"
            value="0"
            bg_color="bg-amber-500"
        ></dashboard-card>
        <dashboard-card
            svg_icon="driv_rech"
            title="Driver Recharge"
            title_class="text-base-c"
            value="LKR 0.00"
            bg_color="bg-yellow-600"
        ></dashboard-card>
        <dashboard-card
            svg_icon="sub_driv"
            title="Subscribed Drivers"
            title_class="text-base-c"
            value="0"
            bg_color="bg-orange-600"
        ></dashboard-card>
        <dashboard-card
            svg_icon="com_driv"
            title="Commission Drivers"
            title_class="text-base-c"
            value="0"
            bg_color="bg-brown-900"
        ></dashboard-card>
        <dashboard-card
            svg_icon="sub_rev"
            title="Subscribed Revenue"
            title_class="text-base-c"
            value="LKR 0.00"
            bg_color="bg-lime-500"
        ></dashboard-card>
        <dashboard-card
            svg_icon="wal_rec_amt"
            title="Passenger Wallet Recharge Amount"
            title_class="text-sm-c"
            value="LKR 0.00"
            bg_color="bg-emerald-600"
        ></dashboard-card>
        <dashboard-card
            svg_icon="driv_rech"
            title="Total tax amount"
            title_class="text-base-c"
            value="LKR 0.00"
            bg_color="bg-sky-500"
        ></dashboard-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
