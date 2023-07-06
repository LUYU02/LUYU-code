<template>
  <!-- <div @click="dj">自定义组件</div> -->
  <div @click="$emit('delSut')">自定义组件1</div>
  <!-- {{ $attrs.onDelSut }} -->
  <Yl_Zr @click="$attrs.onDelSut"></Yl_Zr>
</template>

<script setup>
import { defineEmits, useAttrs } from "vue"
import Yl_Zr from "./依赖和注入.vue"
// 接收自定义事件 或者(直接在模板写 $emit("方法名",传参))
const emits = defineEmits("delSut")
const dj = () => {
  //   console.log("子组件的事件")
  emits("delSut")
}
</script>

<style lang="scss" scoped></style>
