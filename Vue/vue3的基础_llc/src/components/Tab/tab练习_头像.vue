<script setup>
import { computed } from "vue"
const tx1 = defineProps(["src", "rate"])

const color = computed(() => {
  if (tx1.rate == 1) {
    return "rgb(254, 45, 70)"
  } else if (tx1.rate == 2) {
    return "rgb(245, 102, 1)"
  } else {
    return "rgb(247, 169, 1)"
  }
})
</script>

<template>
  <div class="img">
    <img :src="tx1.src" alt="" />
    <span>{{ tx1.rate }}</span>
  </div>
</template>

<style scoped>
.img {
  width: 100px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}
/* 图片 */
.img img {
  width: 100%;

  vertical-align: top;
}
/* 排名 */
.img span {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: v-bind(color);
  top: 0;
  left: 0;
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
