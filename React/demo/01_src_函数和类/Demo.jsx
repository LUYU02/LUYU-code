import { useState } from "react"
import React, { Component } from "react" // 核心库
import ReactDOM from "react-dom" // dom库
// class 式组件
class Demo1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "小江",
    }
  }
  render() {
    return (
      <div>
        <hr />
        <h1>我是demo1组件</h1>
        {this.state.name}
        {console.log(this)}
      </div>
    )
  }
}
// 函数式 组件 函数式组件获取数据不需要写this 函数式组件的this是undefined
function Demo2() {
  const [count, setCount] = useState(0)
  const luyu = ["xiaojiang", 18, "男"]
  return (
    <div>
      <hr />
      <h1>Demo2</h1>
      {count}
      <button onClick={() => setCount((count) => count + 1)}>点我</button>
      <div>
        个人信息:{luyu[0]}---{luyu[1]}---{luyu[2]}
      </div>
      {console.log(this)}
    </div>
  )
}
// export default Deom
export { Demo1, Demo2 }
