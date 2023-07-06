<template>
  <MealsFilter></MealsFilter>
  <Meals :meals="mealsStore.filterMeals" :desc="true"></Meals>
  <CartBar></CartBar>
</template>

<script setup>
import Meals from "./components/Meals/Meals.vue"
import MealsFilter from "./components/MealsFilter/MealsFilter.vue"
import CartBar from "./components/Cart/CartBar.vue"
import { useMealsStore } from "./store/meals"
const mealsStore = useMealsStore()
</script>

<style scoped></style>
