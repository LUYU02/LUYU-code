import { useState } from "react"
import React, { Component } from "react"
// 导入 检查传参的包
import propTypes from "prop-types"

// 函数式
// 函数 定义传参的默认值 (函数组件没有位置报错)
Demo2.defaultProps = { name: "xiaojiang", age: 20 }

// 严格的传参 传过来的数据有限定
Demo2.propTypes = {
  sum: propTypes.string,
  obj: propTypes.object,
}

function Demo2(props) {
  let obj = props.obj
  return (
    <div>
      <h1>组件Demo2</h1>
      <span>{obj.name}</span>
      <br />
      <span>sum:{props.sum}</span>
      <br />
      <p>{React.Children[0]}</p>
    </div>
  )
}

class Demo extends Component {
  // 定义传参的默认值
  static defaultProps = {
    name: "xiaojiang",
    age: 20,
  }

  render() {
    return (
      <div>
        <h1>组件Demo</h1>
        <span>{this.props.obj.name}</span>
      </div>
    )
  }
}
// 严格的传参 传过来的数据有限定 (类组件必须写在 定义类的下面 不然初始化读取不到)
Demo.propTypes = {
  // obj: propTypes.object,
  obj: propTypes.oneOfType([
    // propTypes.string,
    // propTypes.number,
    propTypes.object,
  ]).isRequired,
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
        <Demo2 obj={this.obj} sum='10'>
          <div>我是插槽1</div>
          <div>我是插槽2</div>
          <div>我是插槽3</div>
        </Demo2>
      </div>
    )
  }
}

export default App
