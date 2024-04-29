<script setup>

import {ref, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useSettingsStore} from "../store/SettingsStore.js";

const settingsStore = useSettingsStore();
const router = useRouter();
const route = useRoute();

import logo from '../assets/images/logo.png';
import MobileMenu from "./MobileMenu.vue";
import {useAuthStore} from "../store/AuthStore.js";

const auth = useAuthStore();

const selectedMenu = ref(1);
const selectedSubMenu = ref(0);
const selectedSubMenuLv2 = ref(0);

const userRole = computed(() => auth.role)

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
    title: "My Diagnosis",
    icon: "ri-pulse-line",
    pathName: "my-profile",
    authRoles: ['ROLE_USER']
  },
  {
    id: 2,
    title: "My Appointments",
    icon: "ri-calendar-line",
    pathName: "appointments",
    authRoles: ['ROLE_USER']
  },
])

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
    router.push({name: pathName});
  }
}

const checkCurrentRoute = (route_name) => {
  return route.name === route_name;
}

</script>

<template>
  <div class="hidden md:block absolute top-0 z-[100]">
    <!-- sidebar header start -->
    <div
        class="fixed z-50 h-14 p-[14px] pt-4 transition-all duration-500 ease-in-out bg-white border-r border-r-gray-100"
        :class="[settingsStore.getSideBarState() ? 'w-72' : 'w-16']"
        style="z-index: 100"
    >
      <div class="inline-flex items-center gap-x-2">
        <img class="transition-all duration-500 ease-in-out cursor-pointer block min-w-[40px]" :src="logo" alt="logo"
             width="50"
             :class="{ 'rotate-[360deg]': settingsStore.getSideBarState() }" @click="router.push({name: 'index'})">
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
        class="h-screen border-r border-r-gray-100 bg-white p-3 pt-12 transition-all duration-500 ease-in-out fixed overflow-auto sidebar z-50"
        style="height: 100vh"
        :class="[settingsStore.getSideBarState() ? 'w-72' : 'w-16']"
    >
      <div>
        <!-- menu level 1 start -->
        <ul class="pt-2 mt-5">
          <li
              class="text-sm-c flex items-center gap-x-4 cursor-pointer py-1 px-2 hover:bg-indigo-100
              hover:text-gray-600 rounded-md my-1 bg-indigo-800 text-white"
          >
                <span>
                  <i class="ri-add-line text-2xl block float-left"></i>
                </span>
            <router-link :to="{name: 'appointment-create'}"
                         class="text-sm font-medium flex-1 transition-all duration-500 py-2 ease-in-out flex justify-between items-center"
            >
              Make New Appointment
            </router-link>
          </li>
          <div v-for="(menu, index) in menus" :key="index">
            <li v-if="menu.authRoles.includes(userRole)"
                class="text-gray-800 text-sm-c flex items-center gap-x-4 cursor-pointer py-1 px-2 hover:bg-indigo-100 hover:text-gray-600 rounded-md my-1"
                :class="{ 'bg-indigo-500 text-white': checkCurrentRoute(menu.pathName) }"
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
                    v-if="submenu.authRoles.includes(userRole)"
                    class="text-gray-800 text-sm-c flex items-center transition-all duration-500 ease-in-out
                    gap-x-4 cursor-pointer p-2 px-8 hover:bg-gray-100 hover:text-gray-600 rounded-md mt-1"
                    :class="{ 'bg-indigo-500 text-white': checkCurrentRoute(submenu.pathName) }"
                    @click="navigateToPage(submenu.pathName, menu.id, submenu.id, 0)"
                >
                    <span
                        class="text-sm-c font-medium flex-1 transition-all duration-500 ease-in-out flex
                        justify-between items-center"
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
    </div>
    <!-- sidebar content end -->
  </div>
  <MobileMenu class="md:hidden" :menus="menus"></MobileMenu>
</template>

<style scoped>

</style>
