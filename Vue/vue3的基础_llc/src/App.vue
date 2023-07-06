<template>
  <div>21_pinia</div>
  {{ name }}--{{ age }}--{{ arr }}
  <button @click="change">修改</button>
  <button @click="myStore().$reset()">重置</button>
  <button @click="myStore().fn">fn</button>
  <!-- <hr />
  {{ zz.name }}--{{ zz.age }}-- <button @click="xiugai">xiugai</button>
  <hr />
  {{ myStore().obj.age }}
  <button @click="jiajia">++</button> -->
</template>

<script setup>
// 引入store
import { storeToRefs } from "pinia"
import { reactive, watch } from "vue"
import { myStore } from "./store/index.js"
// 获取store实例
// console.log(myStore().name)
// console.log(myStore().age2)
// myStore().fn()

// 组合式
// console.log(myStore().name)
// console.log(myStore().obj)
// console.log(myStore().obj2)
// console.log(myStore().age2)
// myStore().fn()

/*
    解构
    计算属性(getters)和数据(state) storeToRefs() 用这个才是响应式的 没用则不是
    方法(actions)是直接解构的
 */
const { name, age, arr, age2 } = storeToRefs(myStore())
const { fn } = myStore()
console.log(age2.value)
fn()

/* 
    watch监视 ref值和reactive值
        语法：watch(属性,(新值,旧值)=>{})
        ref的值直接监视
        reactive需要写成函数()=>obj.属性 | ()=>arr[i]
        监视多个值写成数组形式

    */
const zz = reactive({ name: "xioajiang", age: 18 })
const xiugai = () => {
  zz.age++
  zz.name = "@@@"
}
// watch([() => zz.age, () => zz.name], (n, o) => {
//   console.log(n, o, "watch")
// })
watch([name, age], (n, o) => {
  console.log(n, o, "watch")
})
const jiajia = () => {
  myStore().obj.age++
}

/*
    修改数据
        直接修改
        通过$patch传对象 这个修改是替换 把之前的数据替换成修改的数据 不修改则不动
        通过$patch传函数 这个修改是替换 把之前的数据替换成修改的数据 不修改则不动
        直接替换store (跟 $patch 传对象等价)

    重置数据
        $reset()
*/
const change = () => {
  myStore().name = "小江的朋友"
  myStore().age = 30
  /*     myStore().$patch({
      name: "小小江",
    }) */
  /*   myStore().$patch((store) => {
    store.arr = store.arr.map((item) => {
      return item * 2
    })
  }) */
  //   myStore().$state = { name: "1" }
  //   重置修改 恢复原始数据
  //   myStore().$reset()
}

/*
    store订阅
        当store中的state发生变化时，做一些响应的操作
        store.$subscribe(函数,配置对象)
        使用订阅的组件被销毁 store订阅自动失效 (需要配置)
*/
myStore().$subscribe(
  (mutation, state) => {
    // mutation ：表示修改信息
    console.log(mutation.payload, "111")
    console.log(mutation, state)

    // 使用订阅不要在回调函数中修改state数据
    // state.age++ // 会死循环 递归
  },
  { detached: true }
)

/*
    action订阅
        当store中的action发生变化时，做一些响应的操作
        $onAction 用来订阅action的调用
*/
myStore().$onAction(({ name, store, args, after, onError }) => {
  /*
        name 调用的action的名字
        store store的实例
        args action接收到的参数
        after() 可以设置一个回调函数，函数会在action成功调用后触发
        onError() 可以设置一个回调函数，函数会在action调用失败后触发
    */
  after(() => {
    console.log(name + "成功执行！")
  })
  onError((err) => {
    console.log(name + "执行失败！", err)
  })
})
</script>
