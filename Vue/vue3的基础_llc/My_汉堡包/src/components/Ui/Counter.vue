<template>
  <!-- 加减数量的组件 -->
  <div class="counter">
    <template v-if="props.meal.count > 0">
      <button class="subtract" @click="change(meal)">
        <i class="ri-subtract-line"></i>
      </button>
      <!-- 购买汉堡的个数 -->
      <span>{{ props.meal.count }}</span>
    </template>
    <button class="add" @click="meals.addMealToCart(meal)">
      <i class="ri-add-fill"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue"
import { useMealsStore } from "../../store/meals"
const meals = useMealsStore()
const props = defineProps(["meal"])
const emits = defineEmits(["close"])

const change = (meal) => {
  meals.subMealFromCart(meal)
  if (meals.shoppingCart.length === 0) {
    emits("close")
  }
}
</script>

<style scoped>
.counter .subtract,
.counter .add {
  display: inline-block;
  border: none;
  font-size: 40rem;
  width: 50rem;
  height: 50rem;
  border-radius: 50%;
  text-align: center;
  line-height: 50rem;
}
.counter span {
  padding: 0 20rem;
}
.counter .add {
  background-color: rgb(228, 189, 32);
}
</style>
