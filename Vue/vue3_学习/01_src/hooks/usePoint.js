import { onBeforeUnmount, onMounted, reactive } from "vue"
export default function (tagDomObj) {
  const point = reactive({ x: 0, y: 0 })

  function seavPoint(e) {
    point.x = e.pageX
    point.y = e.pageY
    console.log(point.x, point.y)
  }

  console.log(tagDomObj)
  //   挂载完毕
  onMounted(() => {
    window.addEventListener("click", seavPoint)
  })
  //   卸载之前
  onBeforeUnmount(() => {
    window.removeEventListener("click", seavPoint)
  })
  return point
}
