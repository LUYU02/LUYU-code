<template>
  <div>
    <!-- {{ $attrs }} -->
    儿子{{ EzObj }}
    <br />
    <Sz></Sz>
  </div>
</template>
<script setup>
import Sz from "./孙子.vue"
// const props = defineProps({ title: Number })
const props = defineProps(["title"])
console.log(typeof props.title)
import { inject } from "vue"
const EzObj = inject("obj")
</script>
<style scoped></style>
