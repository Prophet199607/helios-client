<script setup>

import {ref, computed } from "vue";
import {useRouter} from "vue-router";
import {useSettingsStore} from "../store/SettingsStore.js";
const settingsStore = useSettingsStore();
const router = useRouter();

import logo from '../assets/images/logo.png';

const submenuOpen_before_close = ref(0);
const submenuLv2Open_before_close = ref(0)
const selectedMenu = ref(1);
const selectedSubMenu = ref(0);
const selectedSubMenuLv2 = ref(0);

const submenuOpen = computed({
  get() {
    return settingsStore.getSubmenuStatus()
  },
  set(newValue) {
    settingsStore.setSubmenuStatus(newValue)
  }
})

const submenuLv2Open = computed({
  get() {
    return settingsStore.getSubmenuLv2Status()
  },
  set(newValue) {
    settingsStore.setSubmenuLv2Status(newValue)
  }
})

const menus = ref([
  {
    id: 1,
    title: "Dashboard",
    icon: "ri-dashboard-fill",
    pathName: "Home",
  },
  {
    id: 2,
    title: "Manage Patients",
    icon: "ri-team-fill",
    submenu: true,
    submenuItem: [
      {
        id: 2.1,
        title: "New patient",
        pathName: "FleetTrackingDashboard",
      },
      {
        id: 2.1,
        title: "Patient Reports",
        pathName: "patients-report",
      },
    ],
  },
])

const toggleSidebar = () => {
  if (settingsStore.getSideBarState()) {
    submenuOpen_before_close.value = submenuOpen.value;
    submenuLv2Open_before_close.value = submenuLv2Open.value;
    submenuOpen.value = 0;
    submenuLv2Open.value = 0;
  } else {
    submenuOpen.value = submenuOpen_before_close.value;
    submenuLv2Open.value = submenuLv2Open_before_close.value;
  }
  settingsStore.toggleSidebar(!settingsStore.getSideBarState())
}

const toggleSubmenu = (menu_id) => {
  submenuLv2Open.value = 0;
  if (submenuOpen.value === menu_id) {
    submenuOpen.value = 0;
    return;
  }
  submenuOpen.value = menu_id;
}

const toggleSubmenuLv2 = (menu_id) => {
  if (submenuLv2Open.value === menu_id) {
    submenuLv2Open.value = 0;
    return;
  }
  submenuLv2Open.value = menu_id;
}

const navigateToPage = (pathName, id, submenu, submenuLv2, hasSubmenu) => {
  selectedMenu.value = id;
  selectedSubMenu.value = submenu;
  selectedSubMenuLv2.value = submenuLv2;
  if (!hasSubmenu) {
    router.push({ name: pathName });
  }
}

</script>

<template>
  <div>
    <!-- sidebar header start -->
    <div
        class="fixed z-50 h-14 p-[14px] pt-4 transition-all duration-500 ease-in-out bg-white"
        :class="[settingsStore.getSideBarState() ? 'w-72' : 'w-16']"
        style="z-index: 100"
    >
      <div class="inline-flex items-center gap-x-2">
        <img class="transition-all duration-500 ease-in-out cursor-pointer block min-w-[40px]" :src="logo" alt="logo" width="50"
             :class="{ 'rotate-[360deg]': settingsStore.getSideBarState() }">
        <div
            class="text-gray-800 origin-left font-medium text-xl-c transition-all duration-500 ease-in-out"
        >
          <div class="flex items-center justify-start w-full gap-x-2 transition-all duration-500 ease-in-out">
            <span class="flex font-bold uppercase transition-all duration-500 ease-in-out origin-left"
                  :class="{ 'text-[0px]': !settingsStore.getSideBarState() }">HELIOS </span>
          </div>
        </div>
      </div>
    </div>
    <!-- sidebar header end -->
    <!-- sidebar content start -->
    <div
        class="h-screen shadow-2xl bg-white p-3 pt-12 transition-all duration-500 ease-in-out fixed overflow-auto sidebar z-50"
        style="height: 100vh"
        :class="[settingsStore.getSideBarState() ? 'w-72' : 'w-16']"
    >
      <div>
        <!-- menu level 1 start -->
        <ul class="pt-2 mt-5">
          <div v-for="(menu, index) in menus" :key="index">
            <li
                class="text-gray-800 text-sm-c flex items-center gap-x-4 cursor-pointer py-1 px-2 hover:bg-indigo-100 hover:text-gray-600 rounded-md my-1"
                :class="{ 'bg-indigo-500 text-white': selectedMenu === menu.id && !menu.submenu }"
                @click="navigateToPage(menu.pathName, menu.id, 0, 0, menu.submenu)"
            >
                <span>
                  <i class="text-2xl block float-left" :class="menu.icon"></i>
                </span>
              <span
                  class="text-sm font-medium flex-1 transition-all duration-500 ease-in-out flex justify-between items-center"
                  :class="{ hidden: !settingsStore.getSideBarState() }"
                  @click="menu.submenu ? toggleSubmenu(menu.id) : null"
              >
                  {{ menu.title }}
                  <i
                      class="fa fa-chevron-down"
                      :class="{ 'rotate-180': submenuOpen === menu.id }"
                      aria-hidden="true"
                      v-if="menu.submenu"
                  ></i>
                </span>
            </li>
            <!-- menu level 2 start -->
            <ul
                v-if="menu.submenu && submenuOpen === menu.id"
                class="transition-all duration-500 ease-in-out"
            >
              <div
                  v-for="(submenu, index) in menu.submenuItem"
                  :key="index"
                  :to="{ name: submenu.pathName }"
              >
                <li
                    class="text-gray-800 text-sm-c flex items-center transition-all duration-500 ease-in-out gap-x-4 cursor-pointer p-2 px-8 hover:bg-gray-100 hover:text-gray-600 rounded-md mt-1"
                    :class="{ 'bg-gray-900': selectedSubMenu === submenu.id }"
                    @click="navigateToPage(submenu.pathName, menu.id, submenu.id, 0)"
                >
                    <span
                        class="text-sm-c font-medium flex-1 transition-all duration-500 ease-in-out flex justify-between items-center"
                        :class="{ hidden: !settingsStore.getSideBarState() }"
                        @click="submenu.submenulv2 ? toggleSubmenuLv2(submenu.id) : null"
                    >
                      {{ submenu.title }}
                      <i
                          class="fa fa-chevron-down"
                          :class="{ 'rotate-180': submenuLv2Open === submenu.id }"
                          aria-hidden="true"
                          v-if="submenu.submenulv2"
                      ></i>
                    </span>
                </li>
                <!-- menu level 3 start -->
                <ul v-if="submenu.submenulv2 && submenuLv2Open === submenu.id">
                  <div
                      v-for="(submenuLv2, index) in submenu.submenuItemlv2"
                      :key="index"
                      :to="{ name: submenuLv2.pathName }"
                  >
                    <li
                        class="text-gray-800 text-sm-c flex items-center gap-x-4 cursor-pointer p-2 px-12 hover:bg-gray-100 hover:text-gray-600 rounded-md mt-1"
                        :class="{
                          'bg-gray-900': selectedSubMenuLv2 === submenuLv2.id,
                        }"
                        @click="
                          navigateToPage(
                            submenuLv2.pathName,
                            menu.id,
                            submenu.id,
                            submenuLv2.id
                          )
                        "
                    >
                        <span
                            class="text-sm-c font-medium flex-1 transition-all duration-500 ease-in-out flex justify-between items-center"
                            :class="{
                            hidden: !settingsStore.getSideBarState(),
                          }"
                        >
                          {{ submenuLv2.title }}
                        </span>
                    </li>
                  </div>
                </ul>
                <!-- menu level 3 end -->
              </div>
            </ul>
            <!-- menu level 2 end -->
          </div>
        </ul>
        <!-- menu level 1 end -->
      </div>
      <!-- sidebar footer start -->
      <div
          class="fixed bottom-0 bg-primary text-gray-800 h-10 left-0 right-0 cursor-pointer transition-all duration-500 ease-in-out"
          :class="[settingsStore.getSideBarState() ? 'w-72' : 'w-16']"
          @click="toggleSidebar"
      >
        <div class="flex justify-between items-center px-5">
          <div
              class="flex justify-center items-center text-gray-800 font-bold text-base-c"
          >
            <i
                class="ri-arrow-left-s-line z-50 text-3xl text-white transition-all duration-500 ease-in-out"
                :class="[
                  settingsStore.getSideBarState() ? 'rotate-0' : 'rotate-180',
                ]"
            ></i>
          </div>
        </div>
      </div>
      <!-- sidebar footer end -->
    </div>
    <!-- sidebar content end -->
  </div>
</template>

<style scoped>

</style>
