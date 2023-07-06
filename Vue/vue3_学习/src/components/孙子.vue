<template>
  <div>我是孙子组件</div>
</template>
<script setup>
import { useRoute } from "vue-router"

const route = useRoute()
// console.log(route.params)
</script>
<style scoped></style>
