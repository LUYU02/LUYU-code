import { useState } from "react"
import React, { Component } from "react"

// 函数式

function Demo2(props) {
  // 定义一个变量接收
  let zz = props.obj
  console.log(props)
  return (
    <div>
      <h1>函数组件Demo2</h1>
      <div>{props.obj.name}</div>
      <div>{props.sum}</div>
      <div>{zz.name}</div>
    </div>
  )
}

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "小江",
      age: 20,
      flag: true,
    }
  }
  render() {
    // 接收父组件的传参
    let props = this.props
    return (
      <div>
        {props.obj.arr[0]}
        <div>父组件的传参:{props.obj.name}</div>
        <h1>类组件Demo</h1>
        <span>
          你真的{this.state.flag ? "喜欢" : "不喜欢"}
          {this.state.name}吗?
        </span>
        <button
          onClick={() => {
            // setState 设置flag的值 (两个参数 第一个:是一次的state, 第二个:是props)
            this.setState({ flag: !this.state.flag })
          }}>
          点我切换
        </button>
        <br />
        <button
          onClick={() => {
            this.setState({ age: this.state.age + 1 }, () => {
              console.log("111")
            })
          }}>
          {this.state.age}
        </button>
      </div>
    )
  }
}

class App extends Component {
  obj = {
    name: "小江",
    age: 0,
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    fn() {
      console.log("我是一个函数")
    },
  }
  render() {
    return (
      <div>
        <h1>组件</h1>
        <Demo obj={this.obj}></Demo>
        <Demo2 obj={this.obj} sum='10'></Demo2>
      </div>
    )
  }
}

export default App
