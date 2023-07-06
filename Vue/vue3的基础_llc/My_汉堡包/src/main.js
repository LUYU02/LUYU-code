import { createApp } from "vue"
import "./main.css"
import App from "./App.vue"

import { createPinia } from "pinia"
const pinia = createPinia()

// 创建vue的实例
const app = createApp(App)
// 将pinia实例插件挂载到vue上
app.use(pinia)
// 将#app元素挂载到vue实例上
app.mount("#app")
