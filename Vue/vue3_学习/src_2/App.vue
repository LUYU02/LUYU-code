<script setup>
import { ref } from "vue"
import Ez from "./components/儿子.vue"
import Zs from "./components/曾孙.vue"
const first = ref("xiaojiang")
</script>

<template>
  <h1>父组件</h1>
  自定义修饰符 <br /><br />
  <span>{{ first }}</span>
  <Ez v-model:first.capitalize="first" class="abc" :flag="true"></Ez>
  <!-- <Zs v-model.T1="first"></Zs> -->
  <!-- <Zs v-model:名字.T1="first"></Zs> -->
</template>

<style scoped></style>
