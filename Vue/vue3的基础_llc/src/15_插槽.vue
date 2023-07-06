<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
// import { $ref } from "vue/macros"
import aaa from "./components/A.vue"
import bbb from "./components/B.vue"
import ccc from "./components/C.vue"

const sum = ref(0)
const sum1 = ref({ b: 0 })
const sum2 = reactive([0])
const sj = ref(0)

function zz(keyup) {
  console.log(keyup.key)
}
</script>

<template>
  <!-- 
    希望在父组件中指定子组件中的内容
            - 我们可以通过插槽（slot）来实现该需求
        <MyButton>插槽的入口</MyButton>

        <button>
            <slot></slot>  插槽的出口
        </button>

        通过插槽引入组件，位于父组件的作用域中
        v-slot:(name的值)  的简写 #(name的值) = 子组件传的数据 (对象)
   直接写在组件中内容是默认插槽的内容，只会出现在默认插槽中（没有name属性的插槽）
  -->

  <!--   <button @click="sum++">111</button>
  <h1>{{ sum }}</h1>
  <aaa :a="sum"></aaa>
  <bbb :b="sum1"></bbb>
  <ccc :c="sum2"></ccc>
  <hr />
  <h1>插槽以aaa为例</h1>
  <aaa>
    <h1>默认插槽没有name值</h1>
    <template #0>111</template>
    <template v-slot:1>
      <bbb :b="sum1"></bbb>
    </template>
    <bbb :b="sum1"></bbb>
  </aaa> -->
  <div id="app">
    <aaa>
      <h1>默认插槽没有name值</h1>
      <template #0="obj">
        <h1>111</h1>
        {{ obj }} --- {{ obj.obj }}
      </template>
      <template v-slot:1="obj">
        {{ obj }}
        <hr />
        <span> {{ obj.luyu }}</span>
        <span>{{ obj.obj }}</span>
        <ccc :c="obj.obj"></ccc>
      </template>
    </aaa>
  </div>
  <bbb>
    <template #b="objb">
      <div>
        {{
          objb.b.filter((v) => {
            return v % 2 === 0
          })
        }}
      </div>
    </template>
    <template #bb="objbb">
      <div>{{ objbb.bb }}</div>
    </template>
  </bbb>
  <hr />
  <!-- <button @click="sj++">点击</button> -->
  <button @keydown="zz($event)">点击</button>

  <div>{{ sj }}</div>
</template>

<style scoped>
#app {
  background-color: #bfa;
}
</style>
