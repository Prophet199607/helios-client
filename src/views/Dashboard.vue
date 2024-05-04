
<script setup>
import DashboardCard from "../components/DashboardCard.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import user from '../assets/svg/user.svg';
import eye from '../assets/svg/eye.svg';
import sackDollar from '../assets/svg/sack-dollar.svg';
import userInjured from '../assets/svg/user-injured.svg';

</script>

<template>
  <Breadcrumbs :items="[]"
               class="absolute top-[20px] max-w-[250px]"></Breadcrumbs>
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
            :svg_icon="sackDollar"
            title="Total Collections"
            title_class="text-sm-c"
            value="LKR 0.00"
            bg_color="bg-teal-200"
        ></dashboard-card>
        <dashboard-card
            :svg_icon="userInjured"
            title="Daily patients"
            title_class="text-base-c"
            value="0"
            bg_color="bg-yellow-300"
        ></dashboard-card>
      </div>
    </div>
  </div>
</template>
