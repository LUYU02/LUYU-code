import { reactive } from "vue"
export const state = reactive({
  count: 0,
  increment() {
    this.count++
  },
})
