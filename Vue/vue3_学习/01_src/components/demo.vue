<script setup>
import usePoint from "../hooks/usePoint"
import { ref, defineProps } from "vue"
const point = usePoint()
const f = ref(true)
const props = defineProps(["flag"])
const zz = () => {
  try {
    throw new Error("我出错了")
  } catch (error) {
    throw new Error("我出错了")
  }
}
</script>

<template>
  <div style="width: 300px; height: 300px; background-color: #bfa">
    {{ point.x }}--{{ point.y }}
    <button @click="zz">点我</button>
    <h1 v-show="f">小江来了!</h1>
  </div>
</template>

<style scoped></style>
