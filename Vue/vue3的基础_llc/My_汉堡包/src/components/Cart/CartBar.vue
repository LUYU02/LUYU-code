<template>
  <!-- 通过属性的透传 把 CartDetailss 组件 当做 Mask 组件使用 -->
  <Checkout
    :isShow="showcheckout"
    @close="showcheckout = false"
    @zz="showcheckout = false"></Checkout>
  <CartDetailss
    :is-show="showDetails"
    @hide="showDetails = false"></CartDetailss>
  <div class="cart-bar" style="z-index: 999">
    <div class="cart-bag">
      <img :src="CartBagImg" alt="" />
      <span class="total-count" v-show="meals.sumBuyHamburg !== 0">{{
        meals.sumBuyHamburg
      }}</span>
    </div>
    <div class="total-amount">
      <p class="no-goods" v-if="meals.sumBuyHamburgPrice == 0">为选购商品</p>
      <p class="has-goods" v-else @click="showDetails = true">
        {{ meals.sumBuyHamburgPrice }}
      </p>
    </div>
    <div class="cart-btn">
      <button v-if="meals.sumBuyHamburgPrice == 0">去结算</button>
      <button v-else @click="showcheckout = true">去结算</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import CartBagImg from "../../assets/bag.png"
import MaskVue from "../Ui/Mask.vue"
import CartDetailss from "../Cart/CartDetails.vue"
import Checkout from "../Checkout/Checkout.vue"

import { useMealsStore } from "../../store/meals"
const meals = useMealsStore()
const showDetails = ref(false)
const showcheckout = ref(false)
</script>

<style scoped>
.cart-bar {
  z-index: 999;
  width: 710rem;
  height: 100rem;
  position: fixed;
  background-color: rgb(58, 58, 58);
  bottom: 30rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 60rem;
}
.cart-bag {
  position: relative;
  width: 80rem;
}
.cart-bag img {
  position: absolute;
  width: 100rem;
  bottom: -110rem;
}
.total-count {
  width: 40rem;
  height: 40rem;
  text-align: center;
  line-height: 40rem;
  position: absolute;
  background-color: red;
  border-radius: 50%;
  top: -25rem;
  right: -30rem;
  color: #fff;
}
.total-amount {
  margin-left: 120rem;
  height: 100rem;
  line-height: 100rem;
}
.no-goods {
  color: rgb(148, 148, 148);
  font-size: 30rem;
  font-weight: bold;
}
.has-goods {
  color: #fff;
  font-size: 30rem;
  font-weight: bold;
}
.has-goods::before {
  content: "￥";
  font-size: 24rem;
}
.cart-btn {
  height: 100%;
  position: absolute;
  line-height: 100rem;
  right: -3rem;
  top: 0;
}
.cart-btn button {
  width: 250rem;
  height: 100%;
  font-size: 30rem;
  background-color: rgb(241, 196, 10);
  border-radius: 60rem;
  border: none;
}
</style>
