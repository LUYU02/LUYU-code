<template>
  <div class="box">
    <div class="box1">
      <div class="btn" :class="{ active: current === 0 }" @click="current = 0">
        热门球员
      </div>
      <div class="btn" :class="{ active: current === 1 }" @click="current = 1">
        热门球队
      </div>
    </div>
    <div class="box2">
      <div v-show="current === 0">
        <slot :name="0"></slot>
      </div>
      <div v-show="current === 1">
        <slot :name="1"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
const current = ref(0)
</script>

<style scoped>
.box {
  box-sizing: border-box;
  width: 800px;
  padding: 20px;
  background-color: rgb(49, 78, 205);
}
.box1 {
  display: flex;
  border-radius: 15px;
  overflow: hidden;
}
.btn {
  background-color: #fff;
  font-size: 30px;
  padding: 10px 0;
  text-align: center;
  flex: auto;
  cursor: pointer;
  transition: all 0.5s;
}
.btn:not(.active):hover {
  color: red;
}
.active {
  background-color: red;
  color: #fff;
}
</style>
