<script setup>
import { reactive, ref, shallowReactive, computed } from "vue"
// import { $ref } from "vue/macros"
import list from "./components/Tab/lise_列表.vue"
import box from "./components/Tab/box_显示区域.vue"

const players = reactive([
  {
    name: "梅西",
    img: "/images/messi.png",
    rate: 1,
    hot: 833760,
  },
  {
    name: "c罗",
    img: "/images/ronaldo.png",
    rate: 2,
    hot: 403600,
  },
  {
    name: "内马尔",
    img: "/images/neymar.png",
    rate: 3,
    hot: 333760,
  },
])
const time = reactive([
  {
    name: "法国",
    img: "/images/法国.jpg",
    rate: 1,
    hot: 433760,
  },
  {
    name: "巴西",
    img: "/images/巴西.jpg",
    rate: 2,
    hot: 330566,
  },
  {
    name: "荷兰",
    img: "/images/荷兰.jpg",
    rate: 3,
    hot: 233760,
  },
])
// 获取最大热度
const qyMax = players[0].hot
const qdMax = time[0].hot
</script>

<template>
  <box :qy="players" :qd="time" :qdMax="qdMax" :qyMax="qyMax">
    <template #0>
      <list :obj="players" :max-hot="qyMax"></list>
    </template>
    <template #1>
      <list :obj="time" :max-hot="qdMax"></list>
    </template>
  </box>
</template>

<style scoped></style>
