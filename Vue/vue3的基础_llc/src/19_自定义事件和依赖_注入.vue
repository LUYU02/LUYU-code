<template>
  <h1>19_自定义事件和依赖_注入</h1>
  <!-- 向子组件传一个自定义事件delSut -->
  <Zdy @delSut="delSut"></Zdy>
</template>

<script setup>
import { ref, provide } from "vue"
import Zdy from "./components/自定义事件.vue"
const delSut = (value) => {
  console.log("我是父组件的事件:", value)
}
/* 
    依赖和注入
        依赖:在根组件设置数据和方法(provide(name,value))
        注入:在后代组件引入数据和方法(inject(name,default))
*/
// 设置依赖
provide("name", "小江")
provide("change", delSut)
</script>

<style lang="scss" scoped></style>
