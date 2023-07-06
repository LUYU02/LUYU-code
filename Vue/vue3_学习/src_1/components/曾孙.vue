<template>
  曾孙
  {{ ZsObj }}
  {{ ZsFn }}
  <button @click="isshow = true">点我</button>
  <teleport to="body">
    <div v-if="isshow">
      <div>woshi tanchu!</div>
      <h1>我是小江</h1>
      <button @click="isshow = false">关闭</button>
    </div>
  </teleport>

  <br /><br /><br /><br /><br />
  <!-- {{ $emit("fn") }} -->
  <input
    type="text"
    :value="props.first"
    @input="emits('update:first', $event.target.value)" />

  <input type="text" v-model="value" />
</template>
<script setup>
import { computed, inject, ref } from "vue"
const isshow = ref(false)
const ZsObj = inject("obj")
const ZsFn = inject("fn")
ZsFn()

const props = defineProps(["obj", "sum", "first"])

const emits = defineEmits({
  fn: (a, b) => {
    if (a) {
      console.log("验证通过")
      return true
    } else {
      console.log("验证失败")
      return false
    }
  },
  "update:first": null,
})
emits("fn", 1, 2)

const value = computed({
  get() {
    return props.first
  },
  set(newValue) {
    return emits("update:first", newValue)
  },
})
</script>
<style scoped></style>
