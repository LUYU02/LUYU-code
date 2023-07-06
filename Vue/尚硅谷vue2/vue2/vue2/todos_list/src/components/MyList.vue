<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <ul class="todo-main">
      <transition-group
        name="animate__animated animate__bounce"
        enter-active-class="animate__backInDown"
        leave-active-class="animate__backOutDown">
        <MyItem v-for="todo in todos" :key="todo.id" :todo="todo"></MyItem>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import MyItem from "./MyItem.vue"

export default {
  components: { MyItem },
  name: "MyList",
  props: ["todos"],
}
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
