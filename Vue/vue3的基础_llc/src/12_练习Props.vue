<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
// import { $ref } from "vue/macros"
import tab from "./components/tab练习_Props.vue"
const current = ref(0)
const qy1 = reactive({
  name: "梅西",
  img: "/images/messi.png",
  rate: 1,
  hot: 433760,
})
const qy2 = reactive({
  name: "c罗",
  img: "/images/ronaldo.png",
  rate: 1,
  hot: 43566,
})
const qy3 = reactive({
  name: "内马尔",
  img: "/images/neymar.png",
  rate: 1,
  hot: 333760,
})
const qd1 = reactive({
  name: "法国",
  img: "/images/法国.jpg",
  rate: 1,
  hot: 433760,
})
const qd2 = reactive({
  name: "巴西",
  img: "/images/巴西.jpg",
  rate: 1,
  hot: 43566,
})
const qd3 = reactive({
  name: "荷兰",
  img: "/images/荷兰.jpg",
  rate: 1,
  hot: 333760,
})
</script>

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
        <div class="list">
          <tab :obj="qy1"></tab>
          <tab :obj="qy2"></tab>
          <tab :obj="qy3"></tab>
        </div>
      </div>
      <div v-show="current === 1">
        <div class="list">
          <tab :obj="qd1"></tab>
          <tab :obj="qd2"></tab>
          <tab :obj="qd3"></tab>
        </div>
      </div>
    </div>
  </div>
</template>

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

.list {
  margin: 20px;
}
</style>
