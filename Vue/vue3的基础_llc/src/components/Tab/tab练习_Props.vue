<template>
  <div class="item">
    <!-- 头像 -->
    <tx :src="prsps.obj.img" :rate="prsps.obj.rate"></tx>
    <!-- 描述 -->
    <div class="desc">
      <span class="name">{{ prsps.obj.name }}</span>
      <jdt :hot="prsps.obj.hot" :max-hot="prsps.maxHot"></jdt>
    </div>
  </div>
</template>
<script setup>
// 引入进度条组件
import jdt from "./tab_进度条.vue"
// 引入头像组件
import tx from "./tab练习_头像.vue"

// 创建一个响应式对象
/*
    子组件中的数据通常不会在子组件中直接定义，这样会导致数据和视图发生耦合!子组件中的数据通常会在创建组件实例时确定!
    父组件可以通过 props 来将数据传递给子组件

    使用props
        - 先在子组件中定义props
        - 用 defineProps 定义 是一个宏指令
        - 父组件传递给子组件的props都是只读，不能修改
            即使可以修改 尽量不在子组件去修改父组件的数据
            一定要改 后期了解 (自定义事件)

        - 配置:
        const props = defineProps({
                          a: Number,
                          obj: Object,
                        })
        const props = defineProps({
                          a: Number,
                          obj: Object,
                          max: {
                            type: String, // 限制传过来值
                            required: true, // 设置为true 则不传这个值就报错
                            default: "小江是一个默认值", //传默认这个
                            validator(value) {
                              // 检查传递的参数是否合法 flase 不合法
                              return false
                            },
                          },
                        })
*/

const prsps = defineProps(["obj", "maxHot"]) // prsps返回值 是一个对象 传的是父组件传给子组件的属性
</script>
<style scoped>
.item {
  display: flex;
  margin-bottom: 30px;
}
/* 容器 */
.img {
  width: 100px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}
/* 图片 */
.img img {
  width: 100%;

  vertical-align: top;
}
/* 排名 */
.img span {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: v-bing();
  top: 0;
  left: 0;
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.desc {
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  font-size: 30px;
  color: #fff;
  flex: auto;
  margin-left: 30px;
}
</style>
