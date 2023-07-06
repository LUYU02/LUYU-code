<template>
  <Mask>
    <div class="dialog">
      <h2>{{ props.msg }}</h2>
      <div class="btn">
        <button class="ok" @click="$emit('hide')">取消</button>
        <button class="cancel" @click="$emit('okHandel')">确认</button>
      </div>
    </div>
  </Mask>
</template>
<script setup>
import Mask from "./Mask.vue"
// 接受父组件的自定义事件
const emits = defineEmits(["okHandel"])
// 接收 props 父组件传来的值
const props = defineProps(["msg"])
</script>

<style scoped>
.dialog {
  position: absolute;
  width: 700rem;
  height: 400rem;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  border-radius: 40rem;
  top: -100rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #fff;
  overflow: hidden;
}
h2 {
  height: 260rem;
  text-align: center;
  font-size: 40rem;
  line-height: 260rem;
}
.btn {
  display: flex;
  justify-content: space-around;
  height: 80rem;
}
.btn button {
  display: inline-block;
  font-size: 40rem;
  width: 300rem;
  border-radius: 40rem;
}
</style>
