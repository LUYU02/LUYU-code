<template>
  孙子
  {{ SzObj }}
  <br />
  <Zs :obj="obj" :sum="0" @fn="fn" v-model:first="first"></Zs>
  <br />
  <span> {{ first }} <input type="text" v-model="first" /> </span>
</template>
<script setup>
import { inject, reactive, ref } from "vue"
import Zs from "./曾孙.vue"
const SzObj = inject("obj")

const obj = reactive({ name: "xioajiang", age: 20 })

const fn = (a, b) => {
  console.log(a, b)
}

const first = ref("xiaojiang")
</script>
<style scoped></style>
