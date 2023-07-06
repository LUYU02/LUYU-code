<template>
  <h1>状态提升</h1>
  <span>我是状态提升的根组件</span>
  <button @click="state.increment">{{ state.count }}+</button>
  <Zt></Zt>
</template>

<script setup>
import { ref } from "vue"
import { state } from "./状态/index"
import Zt from "./components/状态提升.vue"

// console.log(state)
</script>
