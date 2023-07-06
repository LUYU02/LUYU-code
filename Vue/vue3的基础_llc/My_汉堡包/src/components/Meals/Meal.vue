<template>
  <!-- 汉堡容器 -->
  <div class="meal">
    <div class="meal-zuo">
      <img :src="props.meal.img" :alt="props.meal.title" />
    </div>
    <div class="meal-you">
      <div>
        <h3>{{ props.meal.title }}</h3>
        <!-- desc 是控制详情是否展示的值 -->
        <p v-show="desc">{{ props.meal.desc }}</p>
        <div class="dibu">
          <b>{{ props.meal.price }}</b>
          <!-- 加减数量组件 -->
          <!-- 把当前的汉堡数据传给加减组件中 -->
          <Counter :meal="props.meal"></Counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Counter from "../Ui/Counter.vue"
const props = defineProps(["meal", "desc"])
</script>

<style scoped>
.meal {
  height: 250rem;
  border-bottom: 1px #e6e6e6 solid;
  display: flex;
}
.meal-zuo img {
  height: 100%;
}
.meal-you {
  height: 100%;
  padding-right: 20rem;
  display: flex;
  align-items: center;
}

.meal-you h3 {
  font-size: 30rem;
}
.meal-you p {
  font-size: 18rem;
  color: #969494;
}
.meal-you .dibu {
  width: 450rem;
  font-size: 30rem;
  display: flex;
  margin-top: 30rem;
  justify-content: space-between;
}
.meal-you .dibu b::before {
  content: "￥";
}
</style>
