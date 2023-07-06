<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-show="qb">
    <div class="todo-footer">
      <label>
        <input type="checkbox" v-model="isAll" />
      </label>
      <span>
        <span>已完成{{ ywc }}</span> / 全部{{ qb }}
      </span>
      <button class="btn btn-danger" @click="qingchuYWC">清除已完成任务</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  methods: {
    // 清除已完成
    qingchuYWC() {
      this.$bus.$emit("qingchuYWC")
    },
  },
  computed: {
    // 已完成
    ywc() {
      let i = 0
      this.todos.forEach((todo) => {
        if (todo.done) i++
      })
      return i
    },
    // 全部
    qb() {
      return this.todos.length
    },
    isAll: {
      get() {
        return this.ywc === this.qb && this.qb > 0
      },
      set(value) {
        console.log(1)
        this.$bus.$emit("quanxuan", value)
      },
    },
  },
}
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
