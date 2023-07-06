<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
const obj = defineProps(["c"])
</script>

<template>
  <!--   <h1>我是C组件</h1>
  <div>{{ objc.c[0] }}</div>
  <button @click="objc.c[0]++">点我A</button> -->
  <h2>cccc</h2>
  {{ obj }}
  <hr />
  {{ obj.c }}
</template>

<style scoped></style>
