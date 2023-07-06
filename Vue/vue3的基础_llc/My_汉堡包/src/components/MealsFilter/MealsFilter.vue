<template>
  <div class="filter">
    <div class="filter-inner">
      <i class="ri-search-line"></i>
      <input type="text" placeholder="请输入关键字！" v-model="meals.keyword" />
    </div>
  </div>
</template>

<script setup>
import { useMealsStore } from "../../store/meals"
const meals = useMealsStore()
</script>

<style scoped>
.filter {
  padding: 20rem 40rem;
  border: 1px #e6e6e6 solid;
}
.filter-inner {
  display: flex;
  align-items: center;
  height: 80rem;
  position: relative;
}
.filter i {
  color: rgb(184, 184, 184);
  font-size: 30rem;
  position: absolute;
  left: 20rem;
}
.filter input {
  width: 100%;
  height: 100%;
  background-color: rgb(242, 242, 242);
  border: none;
  border-radius: 40rem;
  outline: none;
  padding: 0 60rem;
}
</style>
