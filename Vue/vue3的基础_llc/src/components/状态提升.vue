<template>
  <hr />
  <span>我是状态提升的子组件</span>
  <button @click="state.increment">{{ state.count }}+</button>
</template>

<script setup>
import { state } from "../状态/index"
console.log(state)
</script>

<style lang="scss" scoped></style>
