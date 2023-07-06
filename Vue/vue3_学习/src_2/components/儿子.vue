<template>
  <button @click="flag = !flag">切换</button>
  <transition name="过渡">
    <div v-show="!flag">11111111</div>
  </transition>
  {{ $attrs }}
  <!-- <input type="text" v-model="value" /> -->
  <input
    type="text"
    v-model="value"
    v-focus:z.foo.nb="{ red: 'red', bfa: '#bfa' }" />
  <h1>Sz组件</h1>
  <!-- <Suspense>
    <component :is="Sz"></component>
  </Suspense> -->
  <Sz></Sz>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from "vue"

const el = ref()
// 局部的自定义指令
// const vFocus = {
//   mounted: (el, a, b) => {
//     console.log(el, a, b)
//     return el.focus()
//   },
// }
// const vFocus1 = onMounted(() => el.value.focus())

// 自定义修饰符 通过props 的 传过来的值(默认model) + Modifiers
const props = defineProps({
  flag: Boolean,
  first: String,
  // firstModifiers: { default: () => ({}) },
  // firstModifiers: { default: () => {} },
  firstModifiers: {},
})

const emits = defineEmits(["update:first"])

const value = computed({
  get() {
    return props.first
  },
  set(newValue) {
    // 在触发这个事件时 判断传过来的的自定义修饰符 在不在 默认(model) + Modifiers(修改器)
    if (props.firstModifiers) {
      newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1)
    }
    emits("update:first", newValue)
  },
})

// 定义一个异步组件，它在运行时是懒加载的。参数可以是一个异步加载函数，或是对加载行为进行更具体定制的一个选项对象。
const Sz = defineAsyncComponent(() => {
  // return Promise.resolve(import("./孙子.vue"))
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(import("./孙子.vue"))
    }, 1000)
    res("1221")
  })
  // return import("./孙子.vue")
})

/* const Sz = defineAsyncComponent({
  loader: () => import("./孙子.vue"),
  loadingComponent: import("./曾孙.vue"),
  delay: 200,
  errorComponent: "cuowuzujian",
  delay: 5000,
}) */
</script>
<style scoped>
.过渡-enter-active,
.过渡-leave-active {
  transition: opacity 0.5s ease;
}

.过渡-enter-from,
.过渡-leave-to {
  color: red;
  opacity: 0.3;
}
.过渡-leave-from,
.过渡-enter-to {
  color: #bfa;
  opacity: 0.3;
}
.过渡-enter-from,
.过渡-enter-to {
  color: red;
  opacity: 0.3;
}
.过渡-leave-from,
.过渡-leave-to {
  color: #bfa;
  opacity: 0.3;
}
</style>
