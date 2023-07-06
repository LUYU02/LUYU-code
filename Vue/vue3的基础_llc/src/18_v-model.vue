<script setup>
import { ref } from "vue"
let text = ref("")

function submitHandler() {
  console.log(text.value)
  // 将text提交给服务器，在根据服务器返回的数据做后续的操作
}

const bool = ref("是")
const hobbies = ref([])
const gender = ref("女")
const friend = ref("猪八戒")
</script>

<template>
  <form @submit.prevent="submitHandler">
    <!-- 
        这里我们将表单项的value属性和变量text做了绑定，
          当value发生变化时，text变量会随之变化（单向绑定）
          当value或text任意一个发生变化，另一个也会随之变化（双向绑定）
      -->
    <div>
      <input
        type="text"
        @input="(event) => (text = event.target.value)"
        :value="text" />
    </div>
    <div>
      <input
        type="text"
        @input="(event) => (text = event.target.value)"
        :value="text" />
    </div>
    <div>
      <button>提交</button>
    </div>
  </form>
  <form @submit.prevent="submitHandler">
    <!-- 
        在vue中，为我们提供了v-model了可以快速完成表单的双向数据绑定
        <input type="text" v-model="text" />
        <input type="text" :value="text" @input="event => text = event.target.value" />
      -->
    <!-- 
          v-model的修饰符
            .lazy 使用change来处理数据
            .trim 去除前后的空格
            .number 将数据转换为数值
      -->
    <div>信息：<input type="text" v-model="text" /></div>
    <div>
      是否：<input
        type="checkbox"
        v-model="bool"
        true-value="是"
        false-value="否" />
    </div>
    <div>
      爱好：
      <input v-model="hobbies" type="checkbox" name="hobby" value="足球" />足球
      <input v-model="hobbies" type="checkbox" name="hobby" value="篮球" />篮球
      <input
        v-model="hobbies"
        type="checkbox"
        name="hobby"
        value="羽毛球" />羽毛球
      <input
        v-model="hobbies"
        type="checkbox"
        name="hobby"
        value="乒乓球" />乒乓球
    </div>
    <div>
      性别：
      <input v-model="gender" type="radio" name="gender" value="男" />男
      <input v-model="gender" type="radio" name="gender" value="女" />女
    </div>
    <div>
      朋友：
      <select v-model="friend">
        <option disabled value="">请选择你的好朋友...</option>
        <option>孙悟空</option>
        <option>猪八戒</option>
        <option>沙和尚</option>
      </select>
    </div>
    <div>
      <button>提交</button>
    </div>
  </form>
</template>

<style scoped></style>
