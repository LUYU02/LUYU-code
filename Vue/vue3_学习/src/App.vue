<template>
  <h1>VUE3-路由</h1>
  <button @click="fn">去往Ez页面-路由跳转</button>
  <br />
  <router-link to="/Ez">儿子</router-link>
  <br />
  <router-link to="/Sz/{name:'xiaojaing',age:20}/{name:'小江',age:18}"
    >孙子</router-link
  >
  <router-view></router-view>
</template>
<script setup>
import { watch } from "vue"
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()

console.log(
  "打印 route 和 router",
  route,
  route.matched,
  route.params,
  route.name,
  route.meta,
  route.path,
  route.query
)

const fn = () => {
  router.push({
    name: "儿子",
    path: "/Ez",
    replace: true,
    query: { obj: { a: 10 } },
    params: { z1: 10 },
  })
}
watch(
  () => route.params,
  (toParams, previousParams) => {
    // console.log(toParams.path, previousParams.path)
    console.log(toParams, previousParams)
  }
)
</script>
<style scoped></style>
