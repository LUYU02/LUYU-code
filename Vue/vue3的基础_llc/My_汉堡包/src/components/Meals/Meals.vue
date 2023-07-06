<template>
  <!-- 汉堡展示页的数据 -->
  <div class="meals">
    <Meal
      v-for="(item, index) in props.meals"
      key="item.id"
      :meal="item"
      :desc="$attrs.desc"></Meal>
    <template v-if="!props.meals || props.meals.length == 0">
      <h2>暂时没有相关数据</h2>
    </template>
  </div>
  <!-- 
    解决代码耦合性 该组件可以多次调用
    <div class="meals">
    <Meal
      v-for="(item, index) in meals.filterMeals"
      key="item.id"
      :meal="item"></Meal>
    <template v-if="meals.filterMeals.length == 0">
      <h2>暂时没有相关数据</h2>
    </template>
  </div> -->
</template>

<script setup>
import Meal from "./Meal.vue"
import { useMealsStore } from "../../store/meals"
const meals = useMealsStore()
const props = defineProps(["meals"])
</script>

<style scoped>
.meals {
  height: calc(100vh - 120rem);
  padding-bottom: 130rem;
  overflow: auto;
}
</style>
