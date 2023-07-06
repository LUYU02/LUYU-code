<!-- <script>
// const obj = {
//     count: 0
// }

export default {
    data() {
        return {
            count: 0
        }
    }
}
</script>
<template>
    <button @click="count++">{{ count }}</button>
</template>
 -->

<!-- <template>
  <div>
    <h2>子组件内容{{ props.obj.age }}</h2>
    <h2>子组件内容{{ props.a }}</h2>
    <h2>{{ max }}</h2>
    <button @click="props.a++">点我a</button>
    <button @click="props.obj.age++">点我obj</button>
  </div>
</template>

<script>
// const props = defineProps(["a", "obj"])
const props = defineProps({
  a: Number,
  obj: Object,
  zz: Boolean,
  max: {
    type: String, // 限制传过来值
    required: true, // 设置为true 则不传这个值就报错
    default: "小江是一个默认值", //传默认这个
    validator(value) {
      // 检查传递的参数是否合法 flase 不合法
      return false
    },
  },
})
console.log(props)
</script>

<style>
div {
  color: #bfa;
}
</style> -->

<!-- -------------- -->

<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
// import { $ref } from "vue/macros"

const arr = reactive(["孙悟空", "猪八戒", "唐三藏", "沙和尚"])
const obj = reactive({ age: 20, name: "xiaojiang" })
</script>

<template>
  <!-- 
    component 是一个动态组件
      - component最终以什么标签呈现是取决于is属性决定的
   -->
  <component is="a">动态组件</component>
  <div>
    <h1>v-for遍历数组</h1>
    <div v-for="i of arr" :key="i.id">
      <span>{{ i }}</span>
    </div>
    <hr />
    <h1>v-for遍历对象</h1>
    <div v-for="(value, key) of obj">
      <span>{{ value }}----{{ key }}</span>
    </div>
    <hr />
  </div>
</template>

<style scoped></style>
