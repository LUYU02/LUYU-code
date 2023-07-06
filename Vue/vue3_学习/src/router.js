// 导入路由
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./components/home.vue"),
    },
    {
      name: "孙子",
      path: "/Sz/:z1+",
      component: () => import("./components/孙子.vue"),
    },
    {
      name: "儿子",
      path: "/Ez/:z1?",
      component: () => import("./components/儿子.vue"),
      children: [
        {
          path: "E1",
          redirect: () => {
            return "/"
          },
          component: () => import("./components/儿子1.vue"),
        },
        {
          path: "E2",
          alias: "e2",
          component: () => import("./components/儿子2.vue"),
        },
      ],
    },
  ],
})

// router.beforeEach((to, from) => {
//   console.log(to, from)
// })
