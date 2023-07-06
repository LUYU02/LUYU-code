import React, { Component } from "react"

// 函数式

function Demo2(props) {
  return <div></div>
}

class Demo extends Component {
  render() {
    let props = this.props
    return (
      <div>
        渲染列表
        {props.obj.arr.map((item, index) => {
          if (item % 2 === 0) {
            return <div key={index}>{item}</div>
          }
        })}
        <hr />
        渲染列表 --- 富文本
        {props.obj.arr1.map((item, index) => {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.name }}></div>
          )
        })}
        <span>富文本</span>
        <p dangerouslySetInnerHTML={{ __html: props.obj.name }}></p>
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
    arr1: [
      { name: "小江", age: "20" },
      { name: "xioajiang", age: "02" },
    ],
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
