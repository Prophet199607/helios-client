<script setup>

defineProps({
  svg_icon: String,
  title: String,
  title_class: String,
  value: String,
  bg_color: String
})
</script>

<template>
<!--  <div class="flex gap-x-3 items-center shadow-md px-4 py-4">-->
<!--    <div-->
<!--        class="w-16 h-16 p-4 rounded-full flex justify-center items-center text-white"-->
<!--        :class="bg_color"-->
<!--    >-->
<!--      <svg viewBox="0 0 482.085 482.085" width="60px" height="60px" fill="#fff">-->
<!--        <g><use :xlink:href="`#${svg_icon}`"></use></g>-->
<!--      </svg>-->
<!--    </div>-->
<!--    <div class="w-32">-->
<!--      <div :class="title_class">{{ title }}</div>-->
<!--      <div class="font-medium text-lg-c">{{ value }}</div>-->
<!--    </div>-->
<!--  </div>-->
  <div class="flex gap-x-3 items-center shadow-md px-4 py-4 rounded-2xl" :class="bg_color">
    <div class="w-32">
      <div class="font-bold text-xl">{{ value }}</div>
      <div :class="title_class">{{ title }}</div>
    </div>
    <div>
      <img :src="svg_icon" width="40" alt="">
    </div>
  </div>
</template>

<style scoped>

</style>
