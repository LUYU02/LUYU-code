import { createApp } from "vue"
import App from "./App.vue"

// 导入路由器
import { router } from "./router"

const app = createApp(App)

// 注册路由器
app.use(router)

app.mount("#app")
