<template>
  曾孙组件
  {{ $attrs }}
  <!-- <input type="text" v-model="props.modelValue" /> -->
  <input type="text" v-model="value" />
  <div v-luyu:[value].B1="{ name: '小江', age: '20' }" data-id="111">luyu</div>
</template>
<script setup>
/* const props = defineProps({
  modelValue: String,
  modelModifiers: {},
})
const emits = defineEmits(["update:modelValue"])
console.log(props)
emits("update:modelValue", props.modelValue) */

import { computed } from "vue"

const props = defineProps({
  名字: String,
  名字Modifiers: {},
})
// const props = defineProps(["名字", "名字Modifiers"])
const emits = defineEmits(["update:名字"])
emits("update:名字", props.名字)
console.log(props)
const value = computed({
  get() {
    return props.名字
  },
  set(newValue) {
    if (props.名字Modifiers) {
      emits("update:名字", newValue)
    }
  },
})
</script>
