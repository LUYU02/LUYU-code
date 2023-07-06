<template>
  <h2>我是一个透传组件</h2>
  <h2 :style="$attrs.style">我是一个透传组件</h2>
  通过$attrs {{ $attrs }}拿到父组件透传过来的样式
</template>

<script setup>
import { useAttrs } from "vue"
// 在script通过 useAttrs() 这个钩子获取透传过来的属性
const attrs = useAttrs()
console.log(attrs.style)
</script>

<script>
export default {
  // 配置关闭自动透传 手动还是可以
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped></style>
