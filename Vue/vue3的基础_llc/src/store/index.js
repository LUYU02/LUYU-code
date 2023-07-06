// 引入函数
import { defineStore } from "pinia"
import { computed, ref, reactive } from "vue"

// 通过函数创建store
export const myStore = defineStore("my", {
  state: () => ({
    name: "小江",
    age: 20,
    arr: [0, 1, 2, 3, 4],
  }),
  getters: {
    age2: (state) => state.age * 2,
  },
  actions: {
    fn() {
      console.log(this)
      console.log("我是仓库中的方法!", this.age)
    },
    fn1() {},
  },
})

// 组合式
// export const myStore = defineStore("my", () => {
//   // 定义数据
//   const obj = reactive({ name: "小江", age: 20 })
//   const obj2 = reactive(["小江", 20])
//   const name = ref("小江")
//   // 计算属性
//   const age2 = computed(() => obj.age * 2)
//   // 方法
//   const fn = () => {
//     console.log("我是仓库中的方法!", name.value)
//   }
//   return { obj, age2, fn, obj2, name }
// })
