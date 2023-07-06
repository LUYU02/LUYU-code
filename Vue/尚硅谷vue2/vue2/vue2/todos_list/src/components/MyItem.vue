<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <transition
    appear
    name="animate__animated animate__bounce"
    enter-active-class="animate__backInDown"
    leave-active-class="animate__backOutDown">
    <li>
      <label>
        <input
          type="checkbox"
          :checked="todo.done"
          @change="gouxuan(todo.id)" />
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          type="text"
          v-show="todo.isEdit"
          :value="todo.title"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle" />
      </label>
      <button class="btn btn-danger" @click="shanchu(todo.id)">删除</button>
      <button class="btn btn-edit" @click="bianji(todo)" v-show="!todo.isEdit">
        编辑
      </button>
    </li>
  </transition>
</template>

<script>
import "animate.css"
// import pubsub from "pubsub-js"
export default {
  name: "MyItem",
  props: ["todo"],
  // 接受list传来的数据 和list传来的方法checkTodo
  methods: {
    // 删除按钮
    shanchu(id) {
      if (confirm("确认删除嘛")) this.$bus.$emit("shanshu", id)
    },
    // 勾选按钮
    gouxuan(id, done) {
      this.$bus.$emit("gouxuan", id, done)
    },
    // 编辑按钮
    bianji(todo) {
      this.$set(todo, "isEdit", true)
      // $nextTickc 等下一个DOM更新之后在更新
      this.$nextTick(() => {
        this.$refs.inputTitle.focus()
      })
    },
    handleBlur(todo, e) {
      console.log(todo)
      todo.isEdit = false
      if (!e.target.value.trim()) return alert("为空")
      this.$bus.$emit("zz", todo.id, e.target.value)
    },
  },
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #ddd;
}
li:hover button {
  display: block;
}
</style>
