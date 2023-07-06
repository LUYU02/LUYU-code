import { createApp, onMounted } from "vue"
import "./style.css"
import App from "./App.vue"

const app = createApp(App)
// app.config.globalProperties
// console.log(app)
app.directive(
  "focus",
  //   {
  //     mounted(el, binding, vnode, prevVnode) {
  //       console.log(el, binding, vnode, prevVnode)
  //       el.focus()
  //     },
  //   },
  (el, binding, vnode, prevVnode) => {
    // console.log(binding)
    // console.log(binding.value.red)
    el.focus()
    el.style.color = binding.value.bfa
    el.style.backgroundColor = binding.value.red
  }
)
app.directive(
  "luyu",
  // (el, binding, vnode, prevVnode) => {
  //   console.log(el)
  //   console.log(el.dataset.id, "-----")
  //   console.log(binding)
  // },
  {
    mounted(el, binding, vnode, prevVnode) {
      console.log(el, binding, "mounted")
      console.log(el.dataset.id)
    },
    beforeUpdate(el, binding, vnode, prevVnode) {
      console.log(el, binding, "beforeUpdate")
      console.log(el.dataset.id)

      // el.dataset.id = "更新!"
    },
  }
)
app.mount("#app")
