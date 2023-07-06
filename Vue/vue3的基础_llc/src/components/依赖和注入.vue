<template>
  <div>我是透传的子组件</div>
</template>

<script setup>
import { useAttrs, inject } from "vue"
// 透传获取方法和数据
const attrs = useAttrs()
// console.log(attrs.onClick)
attrs.onClick("我被依赖和注入这个组件用透传调用!")

// 读取祖先组件的依赖数据
const name = inject("name", "默认值")
const change = inject("change")
// console.log(name)
change("我被依赖和注入这个组件用[依赖和注入]调用!")
</script>

<style lang="scss" scoped></style>
