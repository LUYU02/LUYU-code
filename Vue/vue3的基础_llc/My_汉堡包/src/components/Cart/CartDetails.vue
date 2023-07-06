<template>
  <!-- 购物车 -->
  <Mask style="z-index: 99">
    <Dialog
      msg="确认清空购物车嘛?"
      :is-show="showDialog"
      @hide="showDialog = false"
      @okHandel="okHandel"></Dialog>
    <div class="cart-details">
      <div class="header">
        <h2>餐品详情</h2>
        <a href="javascript:;" class="header-you" @click="showDialog = true">
          <i class="ri-delete-bin-5-line"></i>
          <span>清空购物车</span>
        </a>
      </div>
      <!-- 购物车的汉堡数据 -->
      <Meals :meals="meals.shoppingCart" :desc="false"></Meals>
    </div>
  </Mask>
</template>

<script setup>
import { ref } from "vue"

import { useMealsStore } from "../../store/meals"

import Meals from "../Meals/Meals.vue"
import Dialog from "../Ui/Dialog.vue"
import Mask from "../Ui/Mask.vue"

const meals = useMealsStore()
const showDialog = ref(false)

const emits = defineEmits()

const okHandel = () => {
  meals.clearCart()
  showDialog.value = false
  emits("hide")
}
</script>

<style scoped>
.cart-details {
  position: absolute;
  bottom: 0;
  width: 750rem;
  max-height: 70%;
  background-color: #fff;
  overflow: auto;
  border-top-left-radius: 40rem;
  border-top-right-radius: 40rem;
}
.meals {
  height: 100%;
  padding-top: 60rem;
}
.header {
  position: fixed;
  width: 750rem;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  padding: 30rem 40rem;
  border-bottom: 1px #e6e6e6 solid;
  overflow: auto;
  border-top-left-radius: 40rem;
  border-top-right-radius: 40rem;
}
.header h2 {
  font-size: 30rem;
}
.header .header-you {
  color: #9f9f9f;
}
.header .header-you :nth-child(2) {
  margin-left: 20rem;
}
</style>
