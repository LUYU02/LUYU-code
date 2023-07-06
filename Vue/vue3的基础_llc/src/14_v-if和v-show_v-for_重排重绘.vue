<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
// import { $ref } from "vue/macros"
const app = ref(true)
const age = ref(18)
const jssx = computed(() => {
  return new Date()
})
/* const jss1 = computed({
  get() {
    return "我只读取了"
  },
  set(value) {
    age.value = value
    console.log(value)
  },
}) */
const arr = reactive(["孙悟空", "猪八戒", "唐三藏", "沙和尚"])
const obj = reactive({ age: 20, name: "xiaojiang" })
</script>

<template>
  <!-- 
      重排 回流
        计算渲染树中元素的大小和位置
        当页面中的元素的大小或位置发生变化时，便会触发页面的重排(回流)
        重排次数多影响性能
      重绘
        绘制页面
        当页面发生变化时 浏览器就会对页面进行重新绘制
 -->
  <!-- 

    v-show可以根据值来决定元素是否显示（通过display来切换元素的显示状态)
    v-if 可以根据表达式的值来决定是否显示元素（会直接将元素删除)

    区别:
      - v-show通过css来切换组件的显示与否，切换时不会涉及到组件的重新渲染
          切换的性能比较高

          但是初始化时，需要对所有组件进行初始化（即使组件暂时不显示)
          所以它的初始化的性能要差一些!


      - v-if通过删除添加元素的方式来切换元素的显示，切换时反复的渲染组件，
          切换的性能比较差

          v-if只会初始化需要用到的组件，所以它的初始化性能比较好

   -->

  <div>
    <h1>v-for遍历数组</h1>
    <div v-for="i of arr" :key="i.id">
      <span>{{ i }}</span>
    </div>
    <hr />
    <h1>v-for遍历对象</h1>
    <div v-for="(value, key) of obj">
      <span>{{ value }}---->{{ key }}</span>
    </div>
    <hr />
    <!--     <h1>{{ jss1 }}</h1>
    <button @click="jss1 = 10">111</button> -->
    计算属性: {{ jssx }} <br />
    方法: {{ new Date() }}
    <h1>app</h1>
    <button @click="app = !app">dianow</button>
    <div>{{ app }}</div>
    <template v-if="age >= 50">
      <h1>中老年=>50</h1>
    </template>
    <template v-else-if="age >= 18"> <h1>成年18-50</h1></template>
    <template v-else><h1>未成年!</h1> </template>
  </div>
</template>

<style scoped></style>
