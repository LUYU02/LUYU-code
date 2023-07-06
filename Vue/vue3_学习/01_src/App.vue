<script>
import {
  reactive,
  ref,
  toRef,
  toRefs,
  onRenderTracked,
  onErrorCaptured,
  onRenderTriggered,
  toRaw,
  markRaw,
} from "vue"
import Demo from "./components/demo.vue"
export default {
  name: "App",
  components: { Demo },
  setup() {
    const flag = ref(true)
    const sum = ref(0)
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const obj = reactive({
      name: "小江",
      age: 20,
      a: {
        b: {
          c: { d: -1 },
        },
      },
    })

    onErrorCaptured(() => {
      console.log(`组件渲染
                  事件处理器
                  生命周期钩子
                  setup() 函数
                  侦听器
                  自定义指令钩子
                  过渡钩子`)
    })
    // onRenderTracked((a) => {
    //   console.log("组件渲染过程中追踪到响应式依赖时调用", a)
    // })

    // onRenderTriggered((a) => {
    //   console.log("响应式依赖的变更触发了组件渲染时调用", a)
    // })

    const o = toRaw(obj)
    console.log(o)
    const o1 = markRaw(obj)
    console.log(obj)
    console.log(o1)
    const o2 = reactive(obj)
    console.log(o2)

    return { flag, obj, sum, arr, o2 }
    // 返回一个函数 (渲染函数)
    // return () => h("h1","")
  },
}
</script>

<template>
  <button @click="obj.age++">{{ obj.age }}</button>
  {{ obj }}
  <br /><br /><br />
  {{ o2 }}
  <button @click="sum++">{{ sum }}</button>
  <br />

  <!-- {{ point.x }}--{{ point.y }} -->
  <button @click="flag = !flag">点击隐藏</button>
  <Demo v-if="flag" :flag="flag"></Demo>
</template>

<style scoped></style>
