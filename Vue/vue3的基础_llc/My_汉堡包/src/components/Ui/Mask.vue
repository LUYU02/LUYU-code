<template>
  <!-- 
    点击遮罩层就会消失 但是 CartDetails 这个组件是被Mask给盖住的 
    所以点击 CartDetails这个组件也会触发 Mask 组件的事件 
    在该组件事件设置 .self 是表示只有点击遮罩层才会触发事件-->

  <!-- Teleport 可以将组件渲染到网页的指定位置 -->
  <teleport to="body">
    <Transition>
      <div :="$attrs" class="mask" v-show="isShow" @click.self="$emit('hide')">
        <slot></slot>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
const props = defineProps(["isShow"])
const emits = defineEmits(["hide"])
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
