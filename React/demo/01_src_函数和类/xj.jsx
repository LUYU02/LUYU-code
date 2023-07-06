import React, { Component } from "react" // 核心库
class Xj1 extends Component {
  obj = this.props.obj
  // 默认值 static defaultProps 设置默认值
  static defaultProps = {
    obj: {
      name: "小江",
      age: 0,
    },
  }
  render() {
    return (
      <div>
        <h1>{/* 默认值: {this.props.age}---{this.props.name} */}</h1>
        <h1>{this.obj.name}</h1>
      </div>
    )
  }
}

class Xj extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "小江",
    }
  }

  obj = {
    name: "小祝",
    age: 20,
    sex: "男",
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "#bfa",
          textAlign: "center",
        }}>
        <h1>我是xj组件</h1>
        名字: {this.state.name} <br />
        props 传数据:{this.props.age}
        <hr />
        {/* <Xj1 age={this.props.age}></Xj1> */}
        <Xj1 obj={this.obj}></Xj1>
        <Xj1></Xj1>
      </div>
    )
  }
}
export { Xj }
