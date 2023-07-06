<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
const obja = defineProps(["a"])
const obj = {
  name: "小江",
  age: 20,
}
const luyu = 123456
</script>

<template>
  <!--   <h1>我是A组件</h1>
  <div>{{ obja.a }}</div>
  <button @click="obja.a++">点我A</button> -->
  <hr />
  <h1><slot>默认内容 </slot></h1>
  <h1><slot name="0" :obj="obj.name">默认内容 </slot></h1>
  <hr />
  <h1><slot name="1" :obj="obj" :luyu="luyu">默认内容 </slot></h1>
</template>

<style scoped></style>
