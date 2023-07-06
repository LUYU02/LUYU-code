<template>
  <h1>儿子111111</h1>
  <button @click="fn">前往E1</button>
  <router-link to="/Ez/e2/E2">前往E2</router-link>
  <router-link to="/Ez/e2/e2">前往E2</router-link>
  <router-link to="/Ez/e2">前往E2</router-link>
  <router-view></router-view>
</template>
<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router"

const router = useRouter()
const fn = () => {
  router.push({
    path: "/Ez/E1",
  })
}
onBeforeRouteUpdate((to, from) => {
  console.log(to, from)
})
</script>
<style scoped></style>
