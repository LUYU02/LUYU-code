import React, { Component } from "react"

class App extends Component {
  state = {
    a: 0,
    count: 10,
  }
  // 方法
  add = (event) => {
    // prevState 是state这个数据
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
  add1(event) {
    // 普通函数没有this 得改变this指向
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
  add2() {
    console.log(this)
    this.setState((prevState) => ({ count: prevState.count - 1 }))
  }
  constructor(props) {
    // 构造函数的this是App
    super(props)
    this.add2 = this.add2.bind(this)
  }
  render() {
    return (
      <div>
        <span>行内式</span>
        <button
          onClick={() => {
            this.setState({ count: --this.state.count })
          }}>
          -{this.state.count}
        </button>
        <br />
        <span>箭头函数(推荐使用这个)</span>
        <button onClick={this.add}>+{this.state.count}</button>
        <br />
        <span>普通函数</span>
        <button onClick={this.add1.bind(this)}>+{this.state.count}</button>
        <br />
        <span>普通函数的特殊写法(推荐使用这个)</span>
        <button onClick={this.add2}>-{this.state.count}</button>
      </div>
    )
  }
}

export default App
