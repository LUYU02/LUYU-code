import React, { Component } from "react"

/* class App extends Component {
  state = {
    value: "选择",
    firstName: "",
    lastName: "",
  }

  selectHandler = (e) => {
    this.setState({
      lesson: e.target.value,
    })
  }
  getLesson = (index) => {
    return index === "1"
      ? "一阶段"
      : index === "2"
      ? "二阶段"
      : index === "3"
      ? "三阶段"
      : ""
  }

  handler = (event) => {
    console.log(event.target.name)
    this.setState({
      // 如果对象的key值为变量，使用[变量]形式
      [event.target.name]: event.target.value,
    })
    // oDiv.style.display = 'flex'
    // oDiv.style['display'] = 'flex'
  }
  render() {
    return (
      <div>
        <Demo></Demo>
        <select value={this.state.lesson} onChange={this.selectHandler}>
          <option value=''>请选择</option>
          <option value='1'>1阶段</option>
          <option value='2'>2阶段</option>
          <option value='3'>3阶段</option>
        </select>{" "}
        <h1> {this.getLesson(this.state.lesson)}</h1>
        <br />
        <input
          name='firstName'
          onChange={this.handler}
          type='text'
          placeholder='姓'
        />{" "}
        +
        <input
          name='lastName'
          onChange={this.handler}
          type='text'
          placeholder='名'
        />{" "}
        ={this.state.firstName + " " + this.state.lastName}
      </div>
    )
  }
}

function Demo() {
  const obj = {
    name: "小江",
    age: 20,
  }
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div>
      <div>{obj.name}</div>
      {arr.map((item, index) => {
        if (item > 4) {
          // return [<span key={index}>{item}</span>]
          return (
            <span key={index} dangerouslySetInnerHTML={{ __html: item }}></span>
          )
        }
      })}
    </div>
  )
} */

class App extends Component {
  state = {
    obj: { name: "小江", age: 20 },
  }
  change() {
    // 普通函数事件没有this
    console.log(this)
    console.log("执行啦~")
  }
  constructor(props) {
    // 构造函数的this是App
    super(props)
    this.change = this.change.bind(this)
  }
  // change = () => {
  //   console.log(this)
  //   console.log("执行啦!")
  // }
  render() {
    return (
      <div>
        <span>{this.state.obj.name}</span>
        <button onClick={this.change}>按钮</button>
      </div>
    )
  }
}
export default App
