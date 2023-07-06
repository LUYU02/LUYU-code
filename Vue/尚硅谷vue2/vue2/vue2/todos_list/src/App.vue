<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader></MyHeader>
        <MyList :todos="todos"></MyList>
        <MyFooter :todos="todos"></MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
// import pubsub from "pubsub-js"
import MyHeader from "./components/MyHeader"
import MyList from "./components/MyList"
import MyFooter from "./components/MyFooter"

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      //改为本地存储
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    }
  },
  methods: {
    // 添加
    tianjiaTodo(data) {
      this.todos.unshift(data)
    },
    // 删除
    shanchuTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
    },
    // 勾选
    gouxuanTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done
      })
    },
    // 全选
    quanxuanTodo(value) {
      this.todos.forEach((todo) => {
        todo.done = value
      })
    },
    // 清除已完成
    qingchuYWCTodo() {
      return (this.todos = this.todos.filter((todo) => {
        return !todo.done
      }))
    },
    // 失去焦点
    shiqujiaodianTodo(id, title) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.title = title
      })
    },
    // jiaoyanTodo(title) {
    //   this.todos.forEach((todo) => {
    //     if (todo.title === title) {
    //       return
    //     }
    //   })
    // },
  },
  watch: {
    todos: {
      //改为本地存储
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value))
      },
    },
  },
  mounted() {
    // 添加
    this.$bus.$on("tianjia", this.tianjiaTodo)
    // 删除
    this.$bus.$on("shanshu", this.shanchuTodo)
    // 勾选
    this.$bus.$on("gouxuan", this.gouxuanTodo)
    //全选
    this.$bus.$on("quanxuan", this.quanxuanTodo)
    // 清除已完成
    this.$bus.$on("qingchuYWC", this.qingchuYWCTodo)
    // 失去焦点
    this.$bus.$on("zz", this.shiqujiaodianTodo)
    this.$bus.$on("jiaoyan", this.jiaoyanTodo)
  },
  beforeCreate() {
    this.$bus.$off("tianjia")
    this.$bus.$off("shanshu")
    this.$bus.$off("gouxuan")
    this.$bus.$off("quanxuan")
    this.$bus.$off("qingchuYWC")
    this.$bus.$off("zz")
  },
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #000;
  background-color: #bfa;
  border: 1px solid #fff;
  margin-right: 5px;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
