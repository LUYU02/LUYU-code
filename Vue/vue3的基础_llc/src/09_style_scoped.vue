<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
// import { $ref } from "vue/macros"

import MyButton from "./components/Props.vue"
const obj = reactive({
  name: "xiaojiang",
})
</script>

<template>
  <div class="app">
    <h1>{{ obj.name }}</h1>
    <hr />
    <h2>h2标题</h2>
    <div class="box">app</div>
    <MyButton></MyButton>
  </div>
</template>

<!-- 可以为style标签添加一个scoped属性，
  这样样式将成为局部样式，只对当前组件生效 
如何实现的？
  - 当我们在组件中使用scoped样式时，
    vue会自动为组件中的所有元素生成一个随机的属性
    形如：data-v-7a7a37b1
    生成后，所有的选择器都会在最后添加一个 [data-v-7a7a37b1]
      h1 -> h1[data-v-7a7a37b1]
      .box1 -> .box1[data-v-7a7a37b1]

  - 注意：
      - 随机生成的属性，除了会添加到当前组件内的所有元素上，也会添加到当前组件引入的其他组件的根(单根)元素上，这样设计是为了，可以通过父组件来为子组件设置一些样式

-->
<style scoped>
h1 {
  background-color: #bfa;
}
.box {
  width: 200px;
  height: 200px;
  background-color: #bfa;
}
/* 
  :deep() 深度选择器
  :global() 全局选择器
*/
.app :deep(h2) {
  color: aqua;
}
:global(hr) {
  height: 20px;
  background-color: red;
}
</style>
