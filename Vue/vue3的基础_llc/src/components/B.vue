<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
const objb = defineProps(["b"])
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
  <!-- <h1>我是B组件</h1> -->
  <!-- <div>{{ objb.b.b }}</div>
  <button @click="objb.b.b++">点我B</button> -->
  <div>
    <!-- <h1>我是B组件</h1> -->
    <slot name="b" :b="arr">b的插槽</slot>
    <slot name="bb" :bb="arr">b的插槽</slot>
  </div>
</template>

<style scoped></style>
