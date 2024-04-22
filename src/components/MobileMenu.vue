<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();
defineProps(() => {
  menus: Array
})

const open = ref(false)
const subMenuOpen = ref(false)

const toggleSubMenu = () => {
  subMenuOpen.value =!subMenuOpen.value
}

const navigateToPage = (pathName) => {
  open.value = false;
  subMenuOpen.value = false;
  router.push({ name: pathName });
}
</script>

<template>
  <div class="bg-black md:hidden sm:flex transition-all overflow-hidden duration-500 z-50 flex-col gap-0 p-2 w-full absolute top-[0] left-0"
       :class="[open ? 'h-[1000px]' : 'h-[80px]']">
    <div class="flex items-center justify-between">
      <div class="flex gap-5 items-center px-3 py-2-1">
        <img
            class="w-[60px] h-[60px] rounded-full "
            src="https://tailwindcomponents.com/storage/avatars/uMR3f506SK0GdtIRAeZRVIBDOd5osmWeZ8Rvn2Oh.jpg"
            alt="profile picture"
        >
        <div>
          <div class="text-white font-bold text-2xl">Admin</div>
          <div class="text-sm text-zinc-500 font-semibold">admin@helios.com</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 transition-all duration-600  px-4 py-2 rounded-3xl">
      <a href="#"
         class="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250">
        <div>
          <svg class="h-7 w-7" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="12" cy="13" r="2" />
            <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
            <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
          </svg>
        </div>
        Dashboard
      </a>
      <div>
        <a @click="toggleSubMenu"
           class="text-white bg-black flex justify-between items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250">
          <div class="flex items-center gap-2">
            <div>
              <svg class="h-7 w-7" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                   stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            Manage Patients
          </div>
          <svg :class="subMenuOpen ? 'transform rotate-90' : ''" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path v-show="!subMenuOpen" fill-rule="evenodd" clip-rule="evenodd" d="M12.707 8.293a1 1 0 0 0-1.414 0L10 9.586 8.707 8.293a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414z"/>
            <path v-show="subMenuOpen" fill-rule="evenodd" clip-rule="evenodd" d="M8.293 7.707a1 1 0 0 1 1.414 0L10 8.414l1.293-1.293a1 1 0 1 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414z"/>
          </svg>
        </a>
        <div v-show="subMenuOpen" class="flex flex-col gap-2 transition-all duration-600  px-4 py-2 rounded-3xl">
          <div  @click="navigateToPage('patients-create')" class="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250">
            <div>
              <svg class="h-7 w-7" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                   stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7v8a2 2 0 002 2h6a2 2 0 002-2v-8m-4 0v-2a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2m-4 0H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            New Patient
          </div>
          <div @click="navigateToPage('patients-report')" class="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250">
            <div>
              <svg class="h-7 w-7" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                   stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
              </svg>
            </div>
            Patient Report
          </div>
        </div>
      </div>
      <a class="flex items-center gap-2 text-white hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250">
        <div>
          <svg class="h-7 w-7" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
          </svg>
        </div>
        Sign out
      </a>
    </div>
  </div>
  <div
      class="absolute top-6 right-6 text-white cursor-pointer z-50 md:hidden sm:flex"
      @click="open = !open"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
      <path
          fill-rule="evenodd"
          d="M2.75 4.75a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h14.5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1H3.75zm0 5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h14.5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1H3.75zM2.75 14.75a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h14.5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1H3.75z"
          clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<style scoped>

</style>