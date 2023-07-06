<script setup>
import {
  watch,
  computed,
  effectScope,
  ref,
  shallowRef,
  triggerRef,
  watchEffect,
  getCurrentScope,
  onScopeDispose,
  onErrorCaptured,
} from "vue"

const state = shallowRef({ count: 1, name: "xiaojiang", obj: { age: 20 } })

watchEffect(() => {
  console.log(state.value)
})

state.value = 10

// state.value.name = "小江!"

// triggerRef(state)

console.log(state)

const count = ref(1)
const scope = effectScope()
console.log(scope)
const z0 = scope.run(() => {
  const doubled = computed(() => count.value + 5)
  watch(doubled, () => console.log(doubled.value))
  watchEffect(() => console.log("Count: ", doubled.value))
  return doubled
})
console.log(z0)

console.log(getCurrentScope())

onErrorCaptured(() => {
  console.log(`组件渲染
                  事件处理器
                  生命周期钩子
                  setup() 函数
                  侦听器
                  自定义指令钩子
                  过渡钩子`)
})
</script>

<template>
  <h1 @click="count++">
    {{ count }}
    {{ z0 }}
  </h1>
  <button @click="scope.stop()">点我</button>
</template>

<style scoped></style>
