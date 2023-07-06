<script>
import {
  customRef,
  defineAsyncComponent,
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  provide,
  reactive,
  readonly,
  ref,
  render,
} from "vue"
// import Er from "./components/儿子.vue" //静态引入组件
const Er = defineAsyncComponent(() => import("./components/儿子.vue")) // 异步引入组件(动态引入)
export default {
  name: "App",
  components: { Er },
  setup() {
    // 自定义的ref函数
    function myRef(value) {
      let time
      let falg = false
      // 返回的是一个自定义的ref customRef()接收两个函数 customRef() 返回一个对象里面必须要有get和set
      return customRef((track, trigger) => ({
        get() {
          console.log("读取调用", value)
          track() // 通知Vue追踪数据的变化
          return value
        },
        set(newValue) {
          // 防抖 先关闭定时器 在启动定时器
          clearTimeout(time)
          console.log("修改调用", newValue)
          time = setTimeout(() => {
            value = newValue
            trigger() //通知Vue去解析模板
          }, 1000)
          // 节流 开启定时器 没到时间不让进 开关定时器的判断
          /*  if (falg) {
            return
          } else {
            falg = true
            setTimeout(() => {
              value = newValue
              trigger()
              falg = false
            }, 5000)
          } */
        },
      }))
    }
    // const key = ref("小江")
    const key = myRef("小江")

    const obj = reactive({
      name: "小江",
      age: 20,
    })
    const fn = () => {
      console.log("我是App组件")
    }
    provide("obj", obj)
    provide("fn", fn)

    const c1 = ref(0)
    console.log(c1)
    const c2 = reactive({ name: "xioajiang" })
    console.log(c2)
    const c3 = readonly(c2)
    console.log(c3)

    console.log(isRef(c1))
    console.log(isReactive(c2))
    console.log(isReadonly(c3))

    console.log(isProxy(c1))
    console.log(isProxy(c2))
    console.log(isProxy(c3))
    return { key, obj }
    // 返回一个函数 (渲染函数)
    // return () => h("h1","")
  },
}
</script>

<template>
  <input type="text" name="" id="" v-model="key" />
  <h1>{{ key }}</h1>

  <br /><br /><br /><br />
  <div style="background-color: #bfa">
    <Suspense>
      <template #default>
        <Er :title="key"></Er>
      </template>
      <template #fallback>
        <h1>我是即将出现内容</h1>
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>
