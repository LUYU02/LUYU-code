<script setup>
import { computed } from "vue"

const jdt1 = defineProps(["hot", "maxHot"])
const width = computed(() => {
  return (jdt1.hot / jdt1.maxHot) * 100 + "%"
})
</script>
<template>
  <div class="hot-bar">
    <div class="inner">{{ jdt1.hot }}热度</div>
  </div>
</template>
<style scoped>
.hot-bar {
  background-color: rgb(3, 37, 103);
  border-radius: 20px;
  text-indent: 0.5em;
  overflow: hidden;
}
.inner {
  border-radius: 20px;
  background-image: linear-gradient(90deg, rgb(187, 3, 52) 50%, rgb(66, 2, 12));
  white-space: nowrap;
  width: v-bind(width);
}
</style>
