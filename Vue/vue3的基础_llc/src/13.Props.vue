<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
// import { $ref } from "vue/macros"
import my from "./components/Props.vue"
const a = ref(0)
const obj = ref({
  age: 20,
})
</script>

<template>
  <div>
    <h1>1111</h1>
    <button @click="a++">点我</button>
    <hr />
    <my :a="a" :obj="obj" :max="'我是一个字符串'"></my>
  </div>
</template>

<style scoped></style>
