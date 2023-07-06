import { useState } from "react"
import React, { Component } from "react"
import reactLogo from "./assets/react.svg"
// 引入插件 处理类的插件 classnames
import classnames from "classnames"
// 导入组件
import { Demo1, Demo2 } from "./Demo"
import { Xj } from "./xj"

// 类组件
class Demo extends Component {
  state = {
    sum: 10,
    msg: "我是一个字符串",
    color: true,
  }
  zz = [1, 2, 3, 4]

  // 类组件需要 render这个函数来向外导出 return
  render() {
    // 使用 处理类的插件 classnames
    const pClass = classnames({
      btn: true,
      btnPink: this.state.color,
      btnRed: !this.state.color,
    })

    return (
      <div style={{ display: "flex" }}>
        <h1
          className={pClass}
          style={{
            color: "#bfa",
            backgroundColor: "yellowgreen",
          }}>
          我是demo组件
        </h1>
        {this.state.sum} <br />
        {this.state.msg} <br />
        {console.log(this)} <br />
      </div>
    )
  }
}

// 函数式
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        <a href='https://reactjs.org'>
          <img src={reactLogo} />
        </a>
      </div>
      {count}
      <button onClick={() => setCount((count) => count + 1)}>点我</button>
      {/* 内部其他的组件也是可以直接使用 */}
      <Demo></Demo>
      {/* 外部导入的组件可以直接使用 */}
      {/* <Demo1></Demo1> */}
      {/* <Demo2></Demo2> */}
    </div>
  )
}

class App1 extends Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>这下面是一个组件</h1>
        <Xj age='18'></Xj>
      </div>
    )
  }
}

export default App1
