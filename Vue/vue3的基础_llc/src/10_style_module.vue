<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
// import { $ref } from "vue/macros"

import MyButton from "./components/Props.vue"
const obj = reactive({
  name: "xiaojiang",
  age: "20",
})
</script>

<template>
  <div>
    <h1>{{ obj.name }}</h1>
    <div :class="$style.box">{{ obj.age }}</div>
  </div>
  <!-- 
    css模块
      – 自动的对模块中的类名进行hash化来确保类名的唯一性
      - 在模板中可以通过 $style.类名 使用
      - 可以指定名字 module="style" 默认是$style.类名
   -->
</template>

<style module>
h1 {
  background-color: #bfa;
}
.box {
  font-size: 30px;
  background-color: pink;
}
</style>
