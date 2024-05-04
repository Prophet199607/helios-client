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
  <div class="flex gap-x-3 items-center justify-between shadow-md px-4 py-4 rounded-2xl" :class="bg_color">
    <div class="w-32">
      <div class="font-bold text-xl">{{ value }}</div>
      <div :class="title_class">{{ title }}</div>
    </div>
    <div>
      <img :src="svg_icon" width="40" alt="">
    </div>
  </div>
</template>
