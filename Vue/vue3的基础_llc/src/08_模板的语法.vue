<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
import { $ref } from "vue/macros"
const msg = "小江！"
const sum = $ref(0)
function zz() {
  return sum++
}
const zz = 100
const name = "id"
const v = "nu11"
</script>

<template>
  <!-- 
    - 在模板中，可以直接访问到组件中声明的变量
    - 除了组件中的变量外，vue也为我们提供了一些全局对象可以访问:;
        比如:Date、Math、 RegExp ...
        除此之外，也可以通过app对象来向vue中添加一些全局变量
        app.config.globalProperties
    - 使用插值语法，只能用表达式
        表达式，就是有返回值的语句
    - 插值实际上就是在修改元素的textContent,如果内容中含有标签，标签会被转义显示，不会作为标签生效

    指令：
      - 指令模板中为标签设置的一些特殊属性，它可以用来设置标签如何显示内容
      - 指令使用v-开头
        v-text将表达式的值作为元素的textContent插入，作用同{{}}
          使用指令时，不需要通过{{}}来指定表达式
        v-html将表达式的值作为元素的innerHTML插入，有xss共计的风险
        v-bing可以简写为 ：
          动态为标签设置属性
   -->
  <h1>{{ msg }}</h1>
  <button @click="zz">
    {{ sum }}
  </button>
  <br />
  <div>随机数：{{ Math.random() }}</div>
  <div>日期：{{ new Date() }}</div>
  <div>{{ alert("11111111111") }}</div>
  <div :="zz" :[name]="v"></div>
</template>
