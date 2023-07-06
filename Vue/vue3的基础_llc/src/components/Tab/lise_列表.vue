<script setup>
import tab from "./tab练习_Props.vue"
const prsps = defineProps(["obj", "maxHot"])
</script>

<template>
  <div class="list">
    <template v-for="i in prsps.obj" :key="i.name">
      <tab :obj="i" :max-hot="maxHot"></tab>
    </template>
  </div>
</template>

<style scoped>
.list {
  margin: 20px;
}
</style>
