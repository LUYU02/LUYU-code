# 一、create-react-app	

## 1.全局安装create-react-app. ---- 没有必要

```sh
$ npm install -g create-react-app
```

创建一个项目

```sh
$ create-react-app your-app 注意命名方式

Creating a new React app in /dir/your-app.

Installing packages. This might take a couple of minutes. 安装过程较慢，
Installing react, react-dom, and react-scripts... 
```

## 2.可以直接使用npx --- 推荐

npx 是 安装node 以后自带的一个管理器，可以用来创建一些项目

举例 `cnpm i express-generator -g` `express myapp` ===> `npx express myapp`



```sh
$ cnpm i yarn -g
$ npx create-react-app basic-app	也可以实现相同的效果
```

```sh
$ npm init react-app basic-app
$ yarn create react-app my-app
```



这需要等待一段时间，这个过程实际上会安装三个东西

- react:  react的顶级库
- react-dom: 因为react有很多的运行环境，比如app端的react-native, 我们要在web上运行就使用react-dom
- react-scripts: 包含运行和打包react应用程序的所有脚本及配置

出现下面的界面，表示创建项目成功:

```sh
Success! Created model-app at /Users/wudaxun/Desktop/workspace/ty2103/code/week4/day01/model-app
Inside that directory, you can run several commands:

  yarn start
    Starts the development server.

  yarn build
    Bundles the app into static files for production.

  yarn test
    Starts the test runner.

  yarn eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd model-app
  yarn start

Happy hacking!
```

根据上面的提示，通过`cd your-app`命令进入目录并运行`npm start`即可运行项目。

生成项目的目录结构如下：

```sh
├── README.md							使用方法的文档
├── node_modules					所有的依赖安装的目录
├── package-lock.json			锁定安装时的包的版本号,保证团队的依赖能保证一致。
├── package.json					
├── public								静态公共目录
└── src										开发用的源代码目录
```



常见问题：

- npm安装失败
  - 切换为npm镜像为淘宝镜像
  - 使用yarn，如果本来使用yarn还要失败，还得把yarn的源切换到国内
    * cnpm i yarn -g
  - 如果还没有办法解决，请删除node_modules及package-lock.json然后重新执行`npm install命令`
  - 再不能解决就删除node_modules及package-lock.json的同时清除npm缓存`npm cache clean --force`之后再执行`npm install`命令
  
- 查看package.json，发现4种指令，基本上都是基于 react-scripts模块

  ```
  yarn eject    可以抽离配置文件 ----  需要对react项目进行二次配置的话（webpack 的配置）
  ```

  

# 二、关于React

## 1、React的起源和发展

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。

## 2、React与传统MVC的关系

轻量级的视图层**库**！*A JavaScript library for building user interfaces*

MVC

model view controller

MVP 

model view presenter

View 非常薄，不部署任何业务逻辑，称为”被动视图”（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。

MVVM

React不是一个完整的MVC框架，最多可以认为是MVC中的V（View），甚至React并不非常认可MVC开发模式；

React 构建页面 UI 的库。

可以简单地理解为，React 将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。

## 3、React高性能的体现：虚拟DOM

**React高性能的原理：**

在Web开发中我们**总需要将变化的数据实时反应到UI上**，这时就需要对DOM进行操作。而复杂或频繁的DOM操作通常是性能瓶颈产生的原因（如何进行高性能的复杂DOM操作通常是衡量一个前端开发人员技能的重要指标）。

> 如何提升性能：能合并的 合并，能压缩的压缩，能托管的托管（CDN），减少DOM操作

React为此引入了虚拟DOM（Virtual DOM）的机制：在**浏览器端**用Javascript实现了一套DOM API。基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的**浏览器DOM更新**。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A-B, B-A，React会认为A变成B，然后又从B变成A  UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。

尽管每一次都需要构造完整的虚拟DOM树，但是因为**虚拟DOM是内存数据**，性能是极高的，而对实际DOM进行操作的仅仅是Diff算法，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。

**React Fiber:**

在react 16之后发布的一种react 核心算法，**React Fiber是对核心算法的一次重新实现**(官网说法)。之前用的是diff算法。

在之前React中，更新过程是同步的，这可能会导致性能问题。

当React决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对Virtual DOM，最后更新DOM树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，中途不会中断。因为JavaScript单线程的特点，如果组件树很大的时候，每个同步任务耗时太长，就会出现卡顿。

React Fiber的方法其实很简单——分片。把一个耗时长的任务分成很多小片，每一个小片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。

## 4、React的特点和优势

**(1) 虚拟DOM**

我们以前操作dom的方式是通过document.getElementById()的方式，这样的过程实际上是先去读取html的dom结构，将结构转换成变量，再进行操作。而reactjs定义了一套变量形式的dom模型，一切操作和换算直接在变量中，这样减少了操作真实dom，性能真实相当的高，和主流MVC框架有本质的区别，并不和dom打交道

**(2) 组件系统**

react最核心的思想是将页面中任何一个区域或者元素都可以看做一个组件 component

那么什么是组件呢？

组件指的就是同时包含了html、css、js、image元素的聚合体

使用react开发的核心就是将页面拆分成若干个组件，并且react一个组件中同时耦合了css、js、image，这种模式整个颠覆了过去的传统的方式

**(3) 单向数据流**

其实reactjs的核心内容就是数据绑定，所谓数据绑定指的是只要将一些服务端的数据和前端页面绑定好，开发者只关注实现业务就行了

**(4) JSX  语法**

在vue中，我们使用render函数来构建组件的dom结构性能较高，因为省去了查找和编译模板的过程，但是在render中利用createElement创建结构的时候代码可读性较低，较为复杂，此时可以利用jsx语法来在render中创建dom，解决这个问题，但是前提是需要使用工具来编译jsx

jsx -》javascript xml -〉类xml语言



# 三、编写第一个react应用程序

react开发需要引入多个依赖文件：react.js、react-dom.js，分别又有开发版本和生产版本，create-react-app里已经帮我们把这些东西都安装好了。把通过CRA创建的工程目录下的src目录清空，然后在里面重新创建一个index.js. 写入以下代码:

```jsx
// 第一个react的应用程序
// 从 react 的包当中引入了 React。
// 只要你要写 React.js 组件就必须引入React, ---- 一定要记住 
// 因为react里有一种语法叫JSX，稍后会讲到JSX，要写JSX，就必须引入React
import React from 'react'
// ReactDOM 可以帮助我们把 React 组件渲染到页面上去，
// 没有其它的作用了。它是从 react-dom 中引入的，而不是从 react 引入。
// 以前的版本中不是用的react-dom,以前只有react React.render()
import ReactDOM from 'react-dom'

// ReactDOM里有一个render方法，
// 功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上
ReactDOM.render(
  // 这里就比较奇怪了，它并不是一个字符串，
  // 看起来像是纯 HTML 代码写在 JavaScript 代码里面。
  // 语法错误吗？这并不是合法的 JavaScript 代码,
  //  “在 JavaScript 写的标签的”语法叫 JSX- JavaScript XML。
  // 只能有一个根元素 -- 一个组件有且只能有一个顶级标签
  <h1>hello world</h1>,
  // jsx代码渲染到页面的那一个位置  --- public/index.html
  // document.getElementById('root')
  document.querySelector('#root')
)
```



# 四、元素与组件

如果代码多了之后，不可能一直在render方法里写，所以就需要把里面的代码提出来，定义一个变量，像这样：

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
// 这里感觉又不习惯了？这是在用JSX定义一下react元素
const app = <h1>欢迎进入React的世界</h1>
ReactDOM.render(
  app,
  document.getElementById('root')
)
```



## 1、函数式组件

由于元素没有办法传递参数，所以我们就需要把之前定义的变量改为一个方法，让这个方法去return一个元素:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
// 如果组件的结构特别复杂，需要将其提取出来
// const app = <h1>hello world</h1>

// 由于元素没有办法传递参数，所以我们就需要把之前定义的变量改为一个方法，
// 让这个方法去return一个元素
const app = function (name) { // 函数式组件
  // 业务逻辑
  console.log(name)
  return <h1>hello world</h1>
}
ReactDOM.render(
  app('react'),
  document.querySelector('#root')
)
```

标签调用的方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

// react 标签调用的方式
// App的首字母为什么要必须大写
// React组件将使用标签的形式而调用，那么标签就分为HTML固有的标签，和自定义的标签
// 如果写成小写，就会直接找默认的html标签从而显示，如果没有找到，则不会作任何的展示甚至报错 - 107个
// 如果写成大写，就会被认为是自定义的组件，只要符合组件的定义规则，就可以直接以标签形式调用
const App = function () { // 函数式组件
  // 业务逻辑
  return <h1>hello world</h1>
}
ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
```



这里我们定义的方法实际上也是react定义组件的第一种方式-定义函数式组件，这也是无状态组件。但是这种写法不符合react的jsx的风格，更好的方式是使用以下方式进行改造

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

// react 标签调用方式 传递参数  --- 以组件的属性的方式传递参数
//    组件调用时 添加自定义的属性，属性的值就是传递的参数的值
//    组件定义时有默认的参数props,props中包含了传递的参数的值
const App = function (props) { 
  // 业务逻辑
  console.log(props) // { name: 'ty2103' }
  return <h1>hello world</h1>
}
ReactDOM.render(
  <App name="ty2103"/>,
  document.querySelector('#root')
)
```

这样一个完整的函数式组件就定义好了。但要**注意！注意！注意！**组件名必须**大写**，否则报错。



## 2、class组件

ES6的加入让JavaScript直接支持使用class来定义一个类，react的第二种创建组件的方式就是使用的类的继承，`ES6 class`是目前官方推荐的使用方式，它使用了ES6标准语法来构建，看以下代码：

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

// class 继承自React模块的 Component
// class 内必须实现一个render函数，返回值为一段jsx代码 --- 结构
class App extends React.Component {
  render () {
    return <div>类组件</div>
  }
}
// 类的实例
const app = new App().render()

ReactDOM.render(
  app,
  document.getElementById('root')
)
```

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

// class 继承自React模块的 Component
// class 内必须实现一个render函数，返回值为一段jsx代码 --- 结构
class App extends React.Component {
  render () {
    return <div>类组件-标签</div>
  }
}

// 可以直接通过 标签的形式调用类组件
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    // 通过this.props 获取到父组件的传值
    console.log(this.props)
    return <div>类组件-标签</div>
  }
}

// 可以直接通过 标签的形式调用类组件
ReactDOM.render(
  <App name="ty2103"/>,
  document.getElementById('root')
)
```

运行结果和之前完全一样，因为JS里没有真正的class，这个class只是一个语法糖, 但二者的运行机制底层运行机制不一样。

- 函数式组件是直接调用, 在前面的代码里已经有看到

- ```es6 class```组件其实就是一个构造器,每次使用组件都相当于在实例化组件

## 3、更老的一种方法

在16以前的版本还支持这样创建组件, 但现在的项目基本上不用

```jsx
import React from 'react'

const App = React.createClass({
  render () {
    return <h1>react 老版本的写法</h1>
  }
})

// 这种写法不可以运行-老版本
React.render(
  <App name="ty2103"/>,
  document.getElementById('root')
)
```



## 4、组件的组合、嵌套

将一个组件渲染到某一个节点里的时候，会将这个节点里原有内容覆盖

组件嵌套的方式就是将子组件写入到父组件的模板中去，且react没有Vue中的内容分发机制（slot），所以我们在一个组件的模板中只能看到父子关系

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class Title extends React.Component {
  render () {
    return <div>标题</div>
  }
}

class Content extends React.Component {
  render () {
    return <div>内容</div>
  }
}

class App extends React.Component {
  render () {
    // 类组件必写render函数
    // render函数必返回jsx代码
    // jsx代码等同于vue中结构 template
    return <div>
      <Title />
      <Content />
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

运行代码的结果，审查元素，发现多了一层div，多一层div意味着结构就会发生改变，从而可能影响样式。

> 如何解决问题：React 为我们提供了两种类型的 空标签
>
> ​	<React.Fragment></React.Fragment>      <></>

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class Title extends React.Component {
  render () {
    return <div>标题</div>
  }
}

class Content extends React.Component {
  render () {
    return <div>内容</div>
  }
}

class App extends React.Component {
  render () {
    // <></> 空标签 -- 不可以添加任何的属性
    // return <>
    //   <Title />
    //   <Content />
    // </>

    // React.Fragment 也是一套空标签 -- 可以添加属性 --但是只能添加key属性
    return <React.Fragment>
      <Title />
      <Content />
    </React.Fragment>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

> <React.Fragment></React.Fragment>      <></>之间的区别
>
> 如果需要对空标签添加 自定义属性时必须使用 React.Fragment，其余无所谓
>
> https://zh-hans.reactjs.org/docs/fragments.html#gatsby-focus-wrapper
>
> React.Fragment 允许添加的自定义属性有: key
>
> ​	`key` 是唯一可以传递给 `Fragment` 的属性

# 五、JSX 原理

要明白JSX的原理，需要先明白如何用 JavaScript 对象来表现一个 DOM 元素的结构?

看下面的DOM结构

```html
<div class='app' id='appRoot'>
  <h1 class='title'>欢迎进入React的世界</h1>
  <p>
    React.js 是一个帮助你构建页面 UI 的库
  </p>
</div>
```

上面这个 HTML 所有的信息我们都可以用 JavaScript 对象来表示：

```js
{
  tag: 'div',
  attrs: { className: 'app', id: 'appRoot'},
  children: [
    {
      tag: 'h1',
      attrs: { className: 'title' },
      children: ['欢迎进入React的世界']
    },
    {
      tag: 'p',
      attrs: null,
      children: ['React.js 是一个构建页面 UI 的库']
    }
  ]
}
```

但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了。

于是 React.js 就把 JavaScript 的语法扩展了一下，让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。

下面代码:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    // 如果jsx代码结构复杂，可以使用 () 包裹jsx代码
    return (
      <div className="app" id="appRoot">
        <h1 className='title'>欢迎进入React的世界</h1>
        <p>
          React.js 是一个帮助你构建页面 UI 的库
        </p>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

编译之后将得到这样的代码:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    // 如果jsx代码结构复杂，可以使用 () 包裹jsx代码
    return (
      React.createElement(
        'div',
        { className: 'app', id: 'appRoot' },
        React.createElement(
          'h1',
          { className: 'title' },
          '欢迎进入React的世界'
        ),
        React.createElement(
          'p',
          null,
          'React.js 是一个帮助你构建页面 UI 的库'
        )
      )
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

`React.createElement` 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、还有子元素等, 语法为

```jsx
React.createElement(
  type,
  [props],
  [...children]
)
```

所谓的 JSX 其实就是 JavaScript 对象，所以使用 React 和 JSX 的时候一定要经过编译的过程:

> JSX —使用react构造组件，babel进行编译—> JavaScript对象 — `ReactDOM.render()`—>DOM元素 —>插入页面



# 六、组件中DOM样式

- 行内样式

想给虚拟dom添加行内样式，需要使用表达式传入样式对象的方式来实现：

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
class App extends Component {
  render () {
    // 行内样式 ---- jsx代码 --- 写在js中的html代码 --- 还是js
    // 以js写代码的样式为主
    // 先写好js的样式，再加上react的语法 {}
    // 变量/boolean/number/null/undefined/对象/数组
    return (
      <div style = { { color: 'red', fontSize: '30px' } }>
        欢迎来到react的世界
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

行内样式需要写入一个样式对象，而这个样式对象的位置可以放在很多地方，例如`render`函数里、组件原型上、外链js文件中

- 使用`class`

React推荐我们使用行内样式，因为React觉得每一个组件都是一个独立的整体

其实我们大多数情况下还是大量的在为元素添加类名，但是需要注意的是，`class`需要写成`className`（因为毕竟是在写类js代码，会受到js规则的限制，而`class`是关键字）

```css
/*16_style.css*/
.test {
  color: green
}
```



```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './16_style.css'
class App extends Component {
  render () {
    // class 作为关键字，写样式使用className
    return (
      <div className="test">
        欢迎来到react的世界
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

- 不同的条件添加不同的样式

有时候需要根据不同的条件添加不同的样式，比如：完成状态，完成是绿色，未完成是红色。那么这种情况下，我们推荐使用[classnames](<https://www.npmjs.com/package/classnames>)这个包：

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
class App extends Component {
  state = { // 初始化定义当前组件的一个状态
    status: false
  }
  render () {
    // <button class="btn btn-success"></button>
    // <button class="btn btn-fail"></button>

    let str = 'btn'
    if (this.state.status) { // 获取初始化的状态
      str += ' btn-success'
    } else {
      str += ' btn-fail'
    }
    return (
      <div className = { str }>
        欢迎来到react的世界
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

> 可以使用条件判断以及字符串拼接解决问题，但是看起来不是很爽
>
> cnpm i classnames -S

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
class App extends Component {
  state = { // 初始化定义当前组件的一个状态
    status: true
  }
  render () {
    // <button class="btn btn-success"></button>
    // <button class="btn btn-fail"></button>
    const btnClass = classnames({
      btn: true,
      'btn-success': this.state.status,
      'btn-fail': !this.state.status
    })
    return (
      <div className = { btnClass }>
        欢迎来到react的世界
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```



- css-in-js

`styled-components`是针对React写的一套css-in-js框架，简单来讲就是在js中写css。[npm链接](<https://www.npmjs.com/package/styled-components>)

https://styled-components.com/

```
cnpm i styled-components -S
```

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

// css in js
const Button = styled.button`
  width: 200px;
  height: 100px;
  color: red;
`
const Img = styled.img`
  width: 100%;
  height: auto;
`
class App extends Component {
  render () {
    return <>
      <Button>你好</Button>
      <Img src="http://timgmb03.bdimg.com/timg?searchbox_feed&di=deb4bdc553ad6a8fe4f515c803768e7c&imgtype=1&quality=85&ref=http%3A%2F%2Fwww.baidu.com&sec=0&size=w1024&wh_rate=0&src=http%3A%2F%2Ff12.baidu.com%2Fit%2Fu%3D2091106204%2C149212760%26fm%3D30%26app%3D106%26f%3DJPEG%3Fw%3D312%26h%3D208%26s%3D0647925E025A32755E8B9FBF0300700F" />
    </>
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

* 类vue中的scoped





# 七、组件的数据挂载方式

```
npx create-react-app basic-app

yarn eject 抽离配置文件
```

删除src下的文件，创建index.js + App.jsx

Index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'
// React.StrictMode React的严格模式，检测你代码中的是否有过时的写法，错误的写法
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

```

变化App.jsx即可



## 1、属性(props)

`props`是正常是外部传入的，组件内部也可以通过一些方式来初始化的设置，属性不能被组件自己更改，但是你可以通过父组件主动重新渲染的方式来传入新的 `props`

属性是描述性质、特点的，组件自己不能随意更改。

之前的组件代码里面有`props`的简单使用，总的来说，在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为组件 `props` 对象的键值。通过箭头函数创建的组件，需要通过函数的默认参数来接收`props`:

App.js

```jsx
import React, { Component } from 'react'

// class Title extends React.Component {
//   render () {
//     return (
//       <h1>标题{ this.props.name } - { this.props.test }</h1>
//     )
//   }
// }
const Title = (props) => {
  return (
    <h1>标题{ props.name } - { props.test }</h1>
  )
}
class Content extends React.Component {
  render () {
    return (
      <div>内容 - { this.props.a }</div>
    )
  }
}
class App extends Component {
  render () {
    return (
      <>
        <Title name="HTML5权威指南" test="测试"/>
        <Content a = "HTML5内容"/>
      </>
    )
  }
}

export default App
```

### (1) 设置组件的默认props

```jsx
import React, { Component } from 'react'

// class Title extends React.Component {
//   render () {
//     return (
//       <h1>标题{ this.props.name } - { this.props.test }</h1>
//     )
//   }
// }
const Title = (props) => {
  return (
    <h1>标题{ props.name } - { props.test }</h1>
  )
}
// 如果组件是函数式组件，通过 组件.defaultProps 设置默认值（不传时生效）-UI 库
Title.defaultProps = {
  test: '我要测试'
}
class Content extends React.Component {
  // 如果是类组件，通过 static defaultProps 设置默认值
  static defaultProps = {
    b: 'JS'
  }
  render () {
    return (
      <div>内容 - { this.props.a }- { this.props.b }</div>
    )
  }
}
class App extends Component {
  render () {
    return (
      <>
        {/* <Title name="HTML5权威指南" test="测试"/> */}
        <Title name="HTML5权威指南" />
        <Content a = "HTML5内容"/>
      </>
    )
  }
}

export default App
```

### (2) props.children

我们知道使用组件的时候，可以嵌套。要在自定义组件的使用嵌套结构，就需要使用 `props.children` 。在实际的工作当中，我们几乎每天都需要用这种方式来编写组件。

```jsx
import React, { Component } from 'react'
// 类似于vue的插槽
const Title = (props) => {
  return (
    <h1>{ props.children }</h1>
  )
}
class Content extends React.Component {
  render () {
    return (
      <div>{ this.props.children }</div>
    )
  }
}
class App extends Component {
  render () {
    return (
      <>
        <Title>标题</Title>
        <Content>内容</Content>
      </>
    )
  }
}

export default App
```

### (3) 使用prop-types检查props

数据类型的检查

React其实是为了构建大型应用程序而生, 在一个大型应用中，根本不知道别人使用你写的组件的时候会传入什么样的参数，有可能会造成应用程序运行不了，但是不报错。为了解决这个问题，React提供了一种机制，让写组件的人可以给组件的```props```设定参数检查，需要安装和使用[prop-types](<https://www.npmjs.com/package/prop-types>): https://react.docschina.org/docs/typechecking-with-proptypes.html

```sh
$ cnpm i prop-types -S
```

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// 设置组件的属性的数据类型以及是不是必传项
// 以前 React 模块中包含了 验证属性的数据类型的 对象
// 但是 在react15.3版本以后，将这个模块抽离出来了
// cnpm i prop-types -S
// 不管是类组件还是函数式组件，都需要在组件定义好之后设置
const Title = (props) => {
  return (
    <h1>{ props.name }</h1>
  )
}
Title.propTypes = {
  name: PropTypes.string
}
class Content extends React.Component {
  render () {
    return (
      <div>{ this.props.con } - { this.props.num }</div>
    )
  }
}
Content.propTypes = {
  con: PropTypes.string,
  // num: PropTypes.number
  // num: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number
  // ]),
  num: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  time: PropTypes.string.isRequired // 属性必须传递
}
class App extends Component {
  render () {
    return (
      <>
        <Title name="标题"></Title>
        <Content con="内容" num={100}></Content>
      </>
    )
  }
}

export default App
```

如果某一个属性是必须传递的,添加 isRequired





## 2、状态(state)

状态就是组件描述某种显示情况的数据，由组件自己设置和更改，也就是说由组件自己维护，使用状态的目的就是为了在不同的状态下使组件的显示不同(自己管理)

### (1) 定义state

第一种方式

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  // 1.使用类的属性定义组件的状态
  state = {
    count: 100
  }
  render() {
    return (
      <div>
        { this.state.count }
      </div>
    )
  }
}

```

另一种方式

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  // 第二方式使用 类的构造函数实现
  // constructor()属于react组件的 生命周期钩子函数
  // 为什么要调用 super(props)
  // 子类必须在constructor方法中调用super方法，
  //    否则新建实例时会报错。这是因为子类自己的this对象，
  //    必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，
  //    然后再对其进行加工，加上子类自己的实例属性和方法。
  //    如果不调用super方法，子类就得不到this对象。

  // es5 和 es6 的继承机制的不同
  //    ES5 的继承，实质是先创造子类的实例对象this，
  //    然后再将父类的方法添加到this上面（Parent.apply(this)）。
  //    ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，
  //    加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
  constructor (props) {
    super(props)
    this.state = {
      name: 'React',
      isLiked: false
    }
  }
  render() {
    return (
      <div>
        <div>欢迎来到 { this.state.name } 的世界</div>
        { this.state.isLiked ? '喜欢' : '不喜欢'}
      </div>
    )
  }
}

```

`this.props`和`this.state`是纯js对象,在vue中，data属性是利用`Object.defineProperty`处理过的，更改data的数据的时候会触发数据的`getter`和`setter`，但是React中没有做这样的处理，如果直接更改的话，react是无法得知的，所以，需要使用特殊的更改状态的方法`setState`。

### (2) setState

`isLiked` 存放在实例的 `state` 对象当中，组件的 `render` 函数内，会根据组件的 `state` 的中的`isLiked`不同显示“喜欢”或“心碎”内容。下面给 `button` 加上了点击的事件监听。

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'React',
      isLiked: false
    }
  }
  render() {
    return (
      <div>
        <div>欢迎来到 { this.state.name } 的世界</div>
        <button onClick = { () => {
          this.setState({
            isLiked: !this.state.isLiked
          })
        } }>切换</button>
        { this.state.isLiked ? '喜欢' : '不喜欢'}
      </div>
    )
  }
}

```

`setState`有两个参数

第一个参数可以是对象，也可以是方法return一个对象，我们把这个参数叫做`updater`

- 参数是对象

- 参数是方法

  ```jsx
  import React, { Component } from 'react'
  
  export default class App extends Component {
    state = {
      count: 100
    }
    render() {
      return (
        <div>
          {/* onClick 给添加事件 */}
          <button onClick = { () => {
            // 事件定义应该使用 箭头函数 --- 参数是对象
            // 1.通过this.setState({ key: value }, () => {}) 修改状态
            // this.setState({
            //   count: this.state.count + 1
            // })
            // this.setState({
            //   count: this.state.count + 1
            // }, () => { // 回调函数
            //   console.log('修改状态完毕')
            // })
  
            // 2.通过this.setState((prevState, props) => {}, () => {}) --- 参数是方法
            this.setState((prevState) => {
              return {
                count: prevState.count + 1
              }
            }, () => {
              console.log('修改状态完毕')
            })
          } }>加1</button> { this.state.count }
        </div>
      )
    }
  }
  
  ```
  
  注意的是这个方法接收两个参数，第一个是上一次的state, 第二个是props

`setState`是异步的，所以想要获取到最新的state，没有办法获取，就有了第二个参数，这是一个可选的回调函数

```jsx
 changeState = () => {
    this.setState({
      isLiked: !this.state.isLiked
    }, () => {
        // 后续的业务逻辑
      })
  }

this.setState((prevState, props) => {
  return {
    isLiked: !prevState.isLiked
  }
}, () => {
  // 后续的业务逻辑
})
```



## 3、属性vs状态

相似点：都是纯js对象，都会触发render更新，都具有确定性（状态/属性相同，结果相同）

不同点： 

1. 属性能从父组件获取，状态不能
2. 属性可以由父组件修改，状态不能
3. 属性能在内部设置默认值，状态也可以
4. 属性不在组件内部修改，状态要改
5. 属性能设置子组件初始值，状态不可以
6. 属性可以修改子组件的值，状态不可以

`state` 的主要作用是用于组件保存、控制、修改自己的可变状态。`state` 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。你可以认为 `state` 是一个局部的、只能被组件自身控制的数据源。`state` 中状态可以通过 `this.setState`方法进行更新，`setState` 会导致组件的重新渲染。

`props` 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 `props`，否则组件的 `props` 永远保持不变。

如果搞不清 `state` 和 `props` 的使用场景，记住一个简单的规则：**尽量少地用 `state`，多用 `props`**。

没有 `state` 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。



## 4、状态提升

如果有多个组件共享一个数据，把这个数据放到共同的父级组件中来管理

## 5、受控组件与非受控组件 

React组件的数据渲染是否被调用由传递的`props`完全控制，控制则为受控组件，否则非受控组件。



## 6、渲染数据

- 条件渲染

  ```jsx
  import React, { Component } from 'react'
  
  export default class App extends Component {
    state = { isLiked: true }
    render() {
      // 不要在jsx代码中写if else
      // jsx代码中可以写 表达式   三元运算符 与 或 非
      // return (
      //   <div>
      //     {
      //       if (this.state.isLiked) {
              
      //       }
      //     }
      //   </div>
      // )
  
      // 先写if else，在其内部返回jsx代码
      // 代码的冗余度太高
      // if (this.state.isLiked) {
      //   return (
      //     <div><h1>条件判断</h1>喜欢</div>
      //   )
      // } else {
      //   return (
      //     <div><h1>条件判断</h1>不喜欢</div>
      //   )
      // }
  
      // 可以把条件提取出来 --- 但是定义了变量
      // let com = null
      // if (this.state.isLiked) {
      //   com = <div>喜欢</div>
      // } else {
      //   com = <div>不喜欢</div>
      // }
      // return (
      //   <div>
      //     <h1>条件判断</h1>
      //     {
      //       com
      //     }
      //   </div>
      // )
  
      // 使用三元运算符
      return (
        <div>
          <h1>条件判断</h1>
          {
            this.state.isLiked ? <div>喜欢</div> : <div>不喜欢</div>
          }
        </div>
      )
    }
  }
  
  ```
  
  
  
- 列表渲染

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list: ['a', 'b', 'c', 'd']
  }
  render() {
    // 不要在jsx代码中使用 for 循环（foreach）
    const arr = [ // 定义了一个数组，数组的元素为jsx代码
      <div key="1">1</div>,
      <div key="2">2</div>,
      <div key="3">3</div>
    ]
    return (
      <div>
        { arr }
      </div>
    )
  }
}

```

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list: ['a', 'b', 'c', 'd']
  }
  render() {
    // 不要在jsx代码中使用 for 循环（foreach）
    // 可以把jsx代码存入到数组中，
    const arr = []
    this.state.list.forEach((item, index) => {
      arr.push(
        <div key = { index }>{ item }</div>
      )
    })
    return (
      <div>
        { arr }
      </div>
    )
  }
}

```

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list: ['a', 'b', 'c', 'd']
  }
  render() {
    // 不要在jsx代码中使用 for 循环（foreach）
    // 可以把jsx代码存入到数组中，
    // 可以在jsx代码中使用 map 方法遍历数据
    return (
      <div>
        { 
          // 为了代码的严谨性，可以先判断数据再渲染
          this.state.list && this.state.list.map((item, index) => {
            return <div key = { index }>{ item }</div>
          })
        }
      </div>
    )
  }
}

```

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list: [
      {
        brand: '奔驰',
        items: [ 'S系列', 'E系列' ]
      },
      {
        brand: '奥迪',
        items: [ 'A系列', 'Q系列' ]
      }
    ]
  }
  render() {
    // 不要在jsx代码中使用 for 循环（foreach）
    // 可以把jsx代码存入到数组中，
    // 可以在jsx代码中使用 map 方法遍历数据
    return (
      <div>
        { 
          // 为了代码的严谨性，可以先判断数据再渲染
          this.state.list && this.state.list.map((item, index) => {
            return <div key = { item.brand }>
              { item.brand }
              <ul>
                {
                  item.items.map((itm, idx) => {
                    return <li key = { idx }>{ itm }</li>
                  })
                }
              </ul>
            </div>
          })
        }
      </div>
    )
  }
}

```



React的高效依赖于所谓的 Virtual-DOM，尽量不碰 DOM。对于列表元素来说会有一个问题：元素可能会在一个列表中改变位置。要实现这个操作，只需要交换一下 DOM 位置就行了，但是React并不知道其实我们只是改变了元素的位置，所以它会重新渲染后面两个元素（再执行 Virtual-DOM ），这样会大大增加 DOM 操作。但如果给每个元素加上唯一的标识，React 就可以知道这两个元素只是交换了位置，这个标识就是```key```，这个 `key` 必须是每个元素唯一的标识

- dangerouslySetInnerHTML

对于富文本创建的内容，后台拿到的数据是这样的：

```js
content = "<p>React.js是一个构建UI的库</p>"
```

处于安全的原因，React当中所有表达式的内容会被转义，如果直接输入，标签会被当成文本。这时候就需要使用`dangerouslySetHTML`属性，它允许我们动态设置`innerHTML`

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    content: '<h1>欢迎来到react的世界</h1>'
  }
  render() {
    return (
      <div>
        { this.state.content }
        <div dangerouslySetInnerHTML = { { __html: this.state.content } }></div>
      </div>
    )
  }
}

```



# 八、事件处理

```html
<button @click="count+=1"></button>
<button @click="add"></button>    --- 含有默认的参数为event
<button @click="add(10)"></button>
<button @click="add(100, $event)"></button>
```

https://react.docschina.org/docs/handling-events.html

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串
  - 例如，传统的 HTML：

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

​	* 在 React 中略微不同：

```react
<button onClick={activateLasers}>  
	Activate Lasers
</button>
```

## 

- 在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。

  - ```html
    <a href="#" onclick="console.log('The link was clicked.'); return false">
      Click me
    </a>
    ```

  - ```jsx
    import React, { Component } from 'react'
    
    export default class App extends Component {
      clickHander (event) {
        event.preventDefault()
      }
      render() {
        return (
          <div>
            {/* 不能通过return false 来阻止默认行为 */}
            {/* <a href="https://www.baidu.com" onclick="return false">百度</a> */}
            <a href="https://www.jd.com" onClick = { this.clickHander }>京东</a>
          </div>
        )
      }
    }
    
    ```
  
- 当你使用 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法

## 1、绑定事件

采用on+事件名的方式来绑定一个事件，注意，这里和原生的事件是有区别的，原生的事件全是小写`onclick`, React里的事件是驼峰`onClick`，**React的事件并不是原生事件，而是合成事件**。

**react绑定事件的原理**

```js
/*
        一、react并没有使用原生的浏览器事件，而是在基于Virtual DOM的基础上实现了合成事件，采用小驼峰命名法，默认的事件传播方式是冒泡，如果想改为捕获的话，直接在事件名后面加上Capture即可；事件对象event也不是原生事件对象，而是合成对象，但通过nativeEvent属性可以访问原生事件对象；
        二、react合成事件主要分为以下三个过程：
        1、事件注册
        在该阶段主要做了两件事：document上注册、存储事件回调。所有事件都会注册到document上，拥有统一的回调函数dispatchEvent来执行事件分发，类似于document.addEventListener("click",dispatchEvent)。
      register:
          addEventListener-click
          addEventListener-change

      listenerBank:
           {
                click: {key1: fn1, key2: fn2},
                change: {key1: fn3, key3: fn4}
           }
    2、事件合成
        事件触发后，会执行以下过程：
        （1）进入统一的事件分发函数dispatchEvent；
    		（2）找到触发事件的 ReactDOMComponent；
    		（3）开始事件的合成；
            —— 根据当前事件类型生成指定的合成对象
            —— 封装原生事件和冒泡机制
            —— 查找当前元素以及他所有父级
            —— 在 listenerBank 根据key值查找事件回调并合成到 event(合成事件结束)
   3、批处理
           批量处理合成事件内的回调函数
*/
```



## 2、事件handler的写法

src/index.js

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'
// React.StrictMode React的严格模式，检测你代码中的是否有过时的写法，错误的写法
// 识别不安全的生命周期
// 关于使用过时字符串 ref API 的警告
// 关于使用废弃的 findDOMNode 方法的警告
// 检测意外的副作用
// 检测过时的 context API
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

```



### 2.1直接在render里写行内的箭头函数

```jsx
import React, { Component } from 'react'

// 定义事件的4中方式
// 1.在 render 的函数内部直接使用箭头函数,箭头函数的默认参数为event

export default class App extends Component {
  state = {
    count: 10
  }
  render() {
    return (
      <div>
        <button onClick = { (event) => {
          console.log(event)
          this.setState({
            count: this.state.count + 1
          })
        } }>加1</button>
      </div>
    )
  }
}

```



### 2.2 在组件内使用箭头函数定义一个方法

```js
import React, { Component } from 'react'

// 定义事件的4中方式
// 1.在 render 的函数内部直接使用箭头函数,箭头函数的默认参数为event
// 2.在组件内使用箭头函数定义一个方法, 箭头函数的默认参数为event
//   为什么要定义为箭头函数，还是因为this指向的问题
//   DOM元素绑定时间时，this指向的DOM元素
export default class App extends Component {
  state = {
    count: 10
  }
  add = (event) => {
    console.log(event)
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
  render() {
    return (
      <div>
        <button onClick = { this.add }>加1</button>
      </div>
    )
  }
}

```

### 2.3 直接在组件内定义一个非箭头函数的方法，然后在render里直接使用`onClick={this.handleClick.bind(this)}`改变this指向

```js
import React, { Component } from 'react'

// 定义事件的4中方式
// 1.在 render 的函数内部直接使用箭头函数,箭头函数的默认参数为event
// 2.在组件内使用箭头函数定义一个方法, 箭头函数的默认参数为event
//   为什么要定义为箭头函数，还是因为this指向的问题
//   DOM元素绑定时间时，this指向的DOM元素
// 3.组件内部定义非箭头函数，render事件内改变 事件的 this指向 this.add.bind(this)
export default class App extends Component {
  state = {
    count: 10
  }
  add = function (event) {
    console.log(event)
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
  render() {
    return (
      <div>
        <button onClick = { this.add.bind(this) }>加1</button>
      </div>
    )
  }
}

```



### 2.4 直接在组件内定义一个非箭头函数的方法，然后在constructor里bind(this)

```js
import React, { Component } from 'react'

// 定义事件的4中方式
// 1.在 render 的函数内部直接使用箭头函数,箭头函数的默认参数为event
// 2.在组件内使用箭头函数定义一个方法, 箭头函数的默认参数为event
//   为什么要定义为箭头函数，还是因为this指向的问题
//   DOM元素绑定时间时，this指向的DOM元素
// 3.组件内部定义非箭头函数，render事件内改变 事件的 this指向 this.add.bind(this)
// 4.组件内部定义非箭头函数，constructor中给当前的类添加方法，改变this指向
export default class App extends Component {
  state = {
    count: 10
  }
  constructor (props) {
    super(props)
    // this.addFn = this.add.bind(this) // 不推荐使用 但是必须得掌握
  }
  add = function (event) {
    console.log(event)
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
  render() {
    return (
      <div>
        <button onClick = { this.addFn }>加1</button>
      </div>
    )
  }
}

```

  

## 3、Event 对象

和普通浏览器一样，事件handler会被自动传入一个 `event` 对象，这个对象和普通的浏览器 `event` 对象所包含的方法和属性都基本一致。不同的是 React中的 `event` 对象并不是浏览器提供的，而是它自己内部所构建的。它同样具有`event.stopPropagation`、`event.preventDefault` 这种常用的方法

> 不管是何种定义事件的方式，都可以传入事件对象



## 4、事件的参数传递

### 4.1在`render`里调用方法的地方外面包一层箭头函数 

注意事件对象的传递

```jsx
import React, { Component } from 'react'
// React事件传递参数
// 1.在`render`里调用方法的地方外面包一层箭头函数 
export default class App extends Component {
  handler = function (params1, params2, params3, event) {
    console.log(params1)
    console.log(params2)
    console.log(params3)
    console.log(event)
    console.log(this)
  }
  render() {
    return (
      <div>
        <button onClick = { (event) => {
          // 如果需要事件对象
          // 可以直接在函数内部访问this
          this.handler('a', 1, 2, event)
        } }>点击事件</button>
      </div>
    )
  }
}

```

### 4.2在`render`里通过`this.handleEvent.bind(this, 参数)`这样的方式来传递

```jsx
import React, { Component } from 'react'
// React事件传递参数
// 1.在`render`里调用方法的地方外面包一层箭头函数 
// 2.在`render`里通过`this.handleEvent.bind(this, 参数)`这样的方式来传递
export default class App extends Component {
  handler = function (params1, params2, params3, event) {
    console.log(params1)
    console.log(params2)
    console.log(params3)
    console.log(event) // 第二种方式传参时，最后一个参数为event事件对象
    console.log(this)
  }
  render() {
    return (
      <div>
        <button onClick = { this.handler.bind(this, 'aa', 1, 2)}>点击事件1</button>
      </div>
    )
  }
}

```



## 5、处理用户输入

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    firstName: '',
    lastName: ''
  }
  handler = (event) => {
    this.setState({
      lastName: event.target.value
    })
  }
  render() {
    return (
      <div>
        <input onChange = { (event) => {
          console.log(event.target.value)
          this.setState({
            firstName: event.target.value
          })
        }} type="text" placeholder="姓"/> + 
        <input onChange = { this.handler } type="text" placeholder="名"/> = 
        {
          this.state.firstName + ' ' + this.state.lastName
        }
      </div>
    )
  }
}

```

优化 : 分析 通过 input 添加 name 属性区分， 通过event.target.name 区分

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    firstName: '',
    lastName: ''
  }
  handler = (event) => {
    console.log(event.target.name)
    this.setState({ // 如果对象的key值为变量，使用[变量]形式
      [event.target.name]: event.target.value
    })
    // oDiv.style.display = 'flex'
    // oDiv.style['display'] = 'flex'
  }
  render() {
    return (
      <div>
        <input name="firstName" onChange = { this.handler } type="text" placeholder="姓"/> + 
        <input name="lastName" onChange = { this.handler } type="text" placeholder="名"/> = 
        {
          this.state.firstName + ' ' + this.state.lastName
        }
      </div>
    )
  }
}

```



# 九、表单

在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。例如这个纯 HTML 表单只接受一个名称：

```html
<form>
  <label>
    名字:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="提交" />
</form>
```

此表单具有默认的 HTML 表单行为，即在用户提交表单后浏览到新页面。如果你在 React 中执行相同的代码，它依然有效。但大多数情况下，使用 JavaScript 函数可以很方便的处理表单的提交， 同时还可以访问用户填写的表单数据。实现这种效果的标准方式是使用“受控组件”。



## 1、受控组件

在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）通常自己维护 state，并根据用户输入进行更新。

而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用`setState()`来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作-onChange。

被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

例如，如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件：

```javascript
import React, { Component } from 'react'
// 受控组件
//    state作为唯一的数据源，配合 value值使用
//    配置onChange事件修改状态，状态的改变引起视图的二次渲染
export default class App extends Component {
  state = {
    username: 'young1024'
  }
  changeHandler = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    return (
      <div>
        <input type="text" value={ this.state.username } onChange = { this.changeHandler }/>
        { this.state.username }
      </div>
    )
  }
}

```

由于在表单元素上设置了 `value` 属性，因此显示的值将始终为 `this.state.username`，这使得 React 的 state 成为唯一数据源。由于 changeHandler 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

对于受控组件来说，输入的值始终由 React 的 state 驱动。你也可以将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。



## 2、textarea 标签
在 HTML 中, `<textarea>` 元素通过其子元素定义其文本:

```
<textarea>
  你好， 这是在 text area 里的文本
</textarea>
```

而在 React 中，`<textarea>` 使用 `value` 属性代替。这样，可以使得使用 `<textarea>` 的表单和使用单行 input 的表单非常类似：

```javascript
import React, { Component } from 'react'
// 受控组件
//    state作为唯一的数据源，配合 value值使用
//    配置onChange事件修改状态，状态的改变引起视图的二次渲染
export default class App extends Component {
  state = {
    username: 'young1024',
    note: ''
  }
  changeHandler = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  noteChange = (event) => {
    this.setState({
      note: event.target.value
    })
  }
  render() {
    return (
      <div>
        <input type="text" value={ this.state.username } onChange = { this.changeHandler }/>
        <textarea onChange = { this.noteChange } value= { this.state.note } placeholder="备注"></textarea>
        { this.state.username }
      </div>
    )
  }
}

```

请注意，`this.state.value` 初始化于构造函数中，因此文本区域默认有初值。



## 3、select 标签

在 HTML 中，`<select>` 创建下拉列表标签。例如，如下 HTML 创建了水果相关的下拉列表：

```
<select>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option selected value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>
```

请注意，由于 `selected` 属性的缘故，椰子选项默认被选中。React 并不会使用 `selected` 属性，而是在根 `select` 标签上使用 `value` 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它。例如：

```javascript
import React, { Component } from 'react'
// 受控组件
//    state作为唯一的数据源，配合 value值使用
//    配置onChange事件修改状态，状态的改变引起视图的二次渲染
export default class App extends Component {
  state = {
    username: 'young1024',
    note: '',
    lesson: ''
  }
  changeHandler = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  noteChange = (event) => {
    this.setState({
      note: event.target.value
    })
  }
  selectHandler = (e) => {
    this.setState({
      lesson: e.target.value
    })
  }
  getLesson = (index) => {
    return index === '1' ? '一阶段' : index === '2' ? '二阶段' : index === '3' ? '三阶段' : ''  }
  render() {
    return (
      <div>
        <input type="text" value={ this.state.username } onChange = { this.changeHandler }/>
        <textarea onChange = { this.noteChange } value= { this.state.note } placeholder="备注"></textarea>
        { this.state.username }
        <select value = { this.state.lesson } onChange = { this.selectHandler }>
          <option disabled value="">请选择</option>
          <option value="1">1阶段</option>
          <option value="2">2阶段</option>
          <option value="3">3阶段</option>
        </select> { this.getLesson(this.state.lesson) }
      </div>
    )
  }
}

```

总的来说，这使得, `<input type="text">`, `<textarea>` 和 `<select>`之类的标签都非常相似—它们都接受一个 `value` 属性，你可以使用它来实现受控组件。

> 注意
>
> 你可以将数组传递到 `value` 属性中，以支持在 `select` 标签中选择多个选项：
>
> ```
> <select multiple={true} value={['B', 'C']}>
> ```

参考 --- 不讲解

```javascript
class MulFlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "coconut",
      arr: [],
      options: [
        { value: "grapefruit", label: "葡萄柚" },
        { value: "lime", label: "酸橙" },
        { value: "coconut", label: "椰子" },
        { value: "mango", label: "芒果" }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    let idx = this.state.arr.findIndex(item=>{
      return item === e.target.value
    })
    if (idx >= 0) {
      this.state.arr.splice(idx,1);
    } else {
      this.state.arr.push(e.target.value);
    }
    let arr = this.state.arr;
    this.setState({arr});
  }

  render() {
    return (
      <div>
        <select multiple={true} value={this.state.arr} onChange={this.handleChange}>
          {this.state.options.map((item,index) => {
            return <option value={item.value} key={index}>{item.label}</option>;
          })}
        </select>
      </div>
    );
  }
}

export default Test4;
```



## 4、处理多个输入

当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

> name 的属性值必须为 state中的对应的数据

```javascript
import React, { Component } from 'react'
export default class App extends Component {
  state = {
    firstName: '',
    lastName: ''
  }
  handler = (event) => {
    console.log(event.target.name)
    this.setState({ // 如果对象的key值为变量，使用[变量]形式
      [event.target.name]: event.target.value
    })
    // oDiv.style.display = 'flex'
    // oDiv.style['display'] = 'flex'
  }
  render() {
    return (
      <div>
        <input name="firstName" onChange = { this.handler } type="text" placeholder="姓"/> + 
        <input name="lastName" onChange = { this.handler } type="text" placeholder="名"/> = 
        {
          this.state.firstName + ' ' + this.state.lastName
        }
      </div>
    )
  }
}

```



## 5、文件 input 标签

在 HTML 中，`<input type="file">` 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 File API （FileReader）进行控制。

```html
<input type="file" />
```
因为它的 value 只读，所以它是 React 中的一个非受控组件。将与其他非受控组件在后续文档中一起讨论。

> 图片上传前预览

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <input type="file" id="avatar" onchange="selectAvatar()"/>
  <img src="" id="preview" alt="" style="width: 200px">
</body>
<script>
  var avatar = document.getElementById('avatar')
  var preview = document.getElementById('preview')
  function selectAvatar () {
    // .files 拿到的是用户选中的图片的一个数组
    const file = avatar.files[0]
    // 使用fileReader对象可以读取文件信息 ---- 将图片转换为 base64
    const reader = new FileReader()
    // 将选中的文件转换为base64 --- 异步操作
    reader.readAsDataURL(file)
    // 转换完成执行 this.result 就表示 转换成的结果
    reader.onload = function () {
      preview.src = this.result
    }
    console.log(file)
  }
</script>
</html>
```



## 6、受控输入空值 - 了解

在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。

下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）

```javascript
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
ReactDOM.render(
  <input value="hahah" />,
  document.getElementById('root')
)

setTimeout(() => {
  ReactDOM.render(
    <input value={ null } />,
    document.getElementById('root')
  )
}, 5000)
```



## 7、非受控组件

在大多数情况下，我们推荐使用 [受控组件](https://zh-hans.reactjs.org/docs/forms.html#controlled-components) 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 [使用 ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 来从 DOM 节点中获取表单数据。

例如，下面的代码使用非受控组件接受一个表单的值：

```javascript
// 严格模式下会有警告信息
import React, { Component } from 'react'
// ref 以前可以使用 字符串形式 ，通过this.refs获取到DOM节点
// 但是在React的严格模式下，ref 字符串的形式是过时的
// 推荐使用 createRef 或者 useRef 代替
// createRef  --- class组件
// useRef ---- 函数式组件使用   -----   hooks
export default class App extends Component {
  getData = () => {
    console.log(this.refs.username.value)
  }
  render() {
    return (
      <div>
        <input ref="username" type="text" placeholder="用户名" />
        <button onClick={ this.getData }>获取数据</button>
      </div>
    )
  }
}


```

```jsx
import React, { Component } from 'react'
export default class App extends Component {
  usernameRef = React.createRef()
  getData = () => {
    console.log(this.usernameRef.current.value)
  }
  render() {
    return (
      <div>
        <input ref={ this.usernameRef } type="text" placeholder="用户名" />
        <button onClick={ this.getData }>获取数据</button>
      </div>
    )
  }
}

```



因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

### (1) 默认值

在 React 渲染生命周期时，表单元素上的 `value` 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 `defaultValue` 属性，而不是 `value`。

```javascript
import React, { Component } from 'react'
export default class App extends Component {
  usernameRef = React.createRef()
  getData = () => {
    console.log(this.usernameRef.current.value)
  }
  render() {
    return (
      <div>
        <input defaultValue="ty2103" ref={ this.usernameRef } type="text" placeholder="用户名" />
        <button onClick={ this.getData }>获取数据</button>
      </div>
    )
  }
}

```
同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 `defaultChecked`，`<select>` 和 `<textarea>` 支持 `defaultValue`。



### (2) 文件输入

在 HTML 中，`<input type="file">` 可以让用户选择一个或多个文件上传到服务器，或者通过使用 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行操作。

在 React 中，`<input type="file">` 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。

您应该使用 File API 与文件进行交互。下面的例子显示了如何创建一个 [DOM 节点的 ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 从而在提交表单时获取文件的信息。

```javascript
import React, { Component } from 'react'
export default class App extends Component {
  fileRef = React.createRef()
  imgRef = React.createRef()
  getFile = () => {
    let file = this.fileRef.current.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    const _this = this
    reader.onload = function () {
      _this.imgRef.current.src = this.result
    }
  }
  render() {
    return (
      <div>
        <input type="file" ref = { this.fileRef } onChange = { this.getFile }/>
        <img src="" ref={ this.imgRef } alt=""/>
      </div>
    )
  }
}

```



# 十、TodoList - 作业

组件化开发React todolist， 



# 十一、组件的生命周期

**只针对类组件**

https://zh-hans.reactjs.org/docs/react-component.html

React中组件也有生命周期，也就是说也有很多钩子函数供我们使用, 组件的生命周期，我们会分为四个阶段，初始化、运行中、销毁、错误处理(16.3之后)

**了解react16.3版本以前的生命周期钩子**

```jsx
import React, { Component } from 'react'
// 旧版本的生命周期钩子 16.3 版本以前
// 初始化
// 运行时
// 销毁
export default class App extends Component {
  // 1. 初始化阶段 - 设置初始化状态 以及 定义事件
  constructor (props) {
    super(props)
    this.state = { count: 100 }
  }
  // 2. 初始化阶段 - 组件即将被装载 --- 没什么用
  componentWillMount () {}

  // 3.初始化阶段 - 初次渲染函数
  // 8.运行时阶段 - 更新视图
  render() {
    return (
      <div>
        { this.state.count }
      </div>
    )
  }
  // 4.初始化阶段 - 组件初次加载完毕 - mounted - 数据请求/实例化/定时器/计时器
  componentDidMount () {}

  // 5.运行时阶段 - 组件即将接收到新的数据 --- watch --- 子组件监听到父组件的数据变化 - 用的不多
  componentWillReceiveProps () {}

  // 6.运行时阶段 - 提升react 性能的关键，必须填写返回值，返回值为true，才能实现视图的二次渲染
  shouldComponentUpdate () {
    return true
  }

  // 7.运行时阶段 --- 组件即将更新 --- 没什么用
  componentWillUpdate () {}

  // 9.运行时阶段 --- 组件更新完毕 --- 特定条件下请求数据/实例化操作 - watch
  // componentWillReceiveProps 的功能可以在此处实现
  componentDidUpdate () {}

  // 10.销毁阶段
  componentWillUnmount () {}

  // 11.错误异常
  componentDidCatch () {}
}

```



## 1、初始化

在组件初始化阶段会执行 
1. constructor 

2. static getDerivedStateFromProps()

3. componentWillMount() / UNSAFE_componentWillMount() 

4. render() 

5. componentDidMount()

   

## 2、更新阶段

`props`或`state`的改变可能会引起组件的更新，组件重新渲染的过程中会调用以下方法： 

1. componentWillReceiveProps() / UNSAFE_componentWillReceiveProps() 
2. static getDerivedStateFromProps()
3. shouldComponentUpdate() 
4. componentWillUpdate() / UNSAFE_componentWillUpdate() 
5. render() 
6. getSnapshotBeforeUpdate() 
7. componentDidUpdate()



## 3、卸载阶段

1. componentWillUnmount()



## 4、错误处理



## 5、各生命周期详解

**(1) constructor(props)**

React组件的构造函数在挂载之前被调用。在实现`React.Component`构造函数时，需要先在添加其他内容前，调用`super(props)`，用来将父组件传来的`props`绑定到这个类中，使用`this.props`将会得到。

官方建议不要在`constructor`引入任何具有副作用和订阅功能的代码，这些应当使用`componentDidMount()`。

`constructor`中应当做些初始化的动作，如：初始化`state`，将事件处理函数绑定到类实例上，但也不要使用`setState()`。如果没有必要初始化state或绑定方法，则不需要构造`constructor`，或者把这个组件换成纯函数写法。

当然也可以利用`props`初始化`state`，在之后修改`state`不会对`props`造成任何修改，但仍然建议大家提升状态到父组件中，或使用`redux`统一进行状态管理。

```jsx
constructor(props) {
  super(props);
  this.state = {
    isLiked: props.isLiked
  };
}
```

**(2) static getDerivedStateFromProps(nextProps, prevState)**

React 的 16.3 版本中对生命周期进行了较大的调整，这是为了开发者能正确地使用生命周期，避免误解其概念而造成反模式。

本节将重点介绍 getDerivedStateFromProps 这个生命周期。要注意的是，React 16.3 的版本中 getDerivedStateFromProps 的触发范围是和 16.4^ 是不同的，主要区别是在 `setState` 和 `forceUpdate` 时会不会触发，具体可以看这个[生命全周期图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) 。

可能的使用场景有两个：

- 无条件的根据 prop 来更新内部 state，也就是只要有传入 prop 值， 就更新 state
- 只有 prop 值和 state 值不同时才更新 state 值。

我们接下来看几个例子。

假设我们有个一个表格组件，它会根据传入的列表数据来更新视图。

```jsx
class Table extends React.Component {
    state = {
        list: []
    }
    static getDerivedStateFromProps (props, state) {
        return {
            list: props.list
        }
    }
    render () {
        .... // 展示 list
    }
}
```

上面的例子就是第一种使用场景，但是无条件从 prop 中更新 state，我们完全没必要使用这个生命周期，直接对 prop 值进行操作就好了，无需用 state 值类保存。



再看一个例子，这个例子是一个颜色选择器，这个组件能选择相应的颜色并显示，同时它能根据传入 prop 值显示颜色。

```jsx
Class ColorPicker extends React.Component {
    state = {
        color: '#000000'
    }
    static getDerivedStateFromProps (props, state) {
        if (props.color !== state.color) {
            return {
                color: props.color
            }
        }
        return null
    }
    ... // 选择颜色方法
    render () {
        .... // 显示颜色和选择颜色操作
    }
}
```

现在我们可以这个颜色选择器来选择颜色，同时我们能传入一个颜色值并显示。但是这个组件有一个 bug，如果我们传入一个颜色值后，再使用组件内部的选择颜色方法，我们会发现颜色不会变化，一直是传入的颜色值。

这是使用这个生命周期的一个常见 bug。为什么会发生这个 bug 呢？在开头有说到，在 React 16.4^ 的版本中 `setState` 和 `forceUpdate` 也会触发这个生命周期，所以内部 state 变化后，又会走 getDerivedStateFromProps 方法，并把 state 值更新为传入的 prop。

接下里我们来修复这个bug。

```jsx
Class ColorPicker extends React.Component {
    state = {
        color: '#000000',
        prevPropColor: ''
    }
    static getDerivedStateFromProps (props, state) {
        if (props.color !== state.prevPropColor) {
            return {
                color: props.color
                prevPropColor: props.color
            }
        }
        return null
    }
    ... // 选择颜色方法
    render () {
        .... // 显示颜色和选择颜色操作
    }
}
```

通过保存一个之前 prop 值，我们就可以在只有 prop 变化时才去修改 state。这样就解决上述的问题。

这里小结下 getDerivedStateFromProps 方法使用的注意点：

- 在使用此生命周期时，要注意把传入的 prop 值和之前传入的 prop 进行比较。
- 因为这个生命周期是静态方法，同时要保持它是纯函数，不要产生副作用。

我们应该谨慎地使用 getDerivedStateFromProps 这个生命周期。使用时要注意下面几点：

- 因为这个生命周期是静态方法，同时要保持它是纯函数，不要产生副作用。
- 在使用此生命周期时，要注意把传入的 prop 值和之前传入的 prop 进行比较（这个 prop 值最好有唯一性，或者使用一个唯一性的 prop 值来专门比较）。
- 不使用 getDerivedStateFromProps，可以改成组件保持完全不可控模式，通过初始值和 key 值来实现 prop 改变 state 的情景。

**(3) componentWillMount() / UNSAFE_componentWillMount()**

`componentWillMount()`将在React未来版本(官方说法 17.0)中被弃用。`UNSAFE_componentWillMount()`在组件挂载前被调用，在这个方法中调用`setState()`不会起作用，是由于他在`render()`前被调用。

为了避免副作用和其他的订阅，官方都建议使用`componentDidMount()`代替。这个方法是用于在服务器渲染上的唯一方法。这个方法因为是在渲染之前被调用，也是惟一一个可以直接同步修改state的地方。

**(4) render()**

render()方法是必需的。当他被调用时，他将计算`this.props`和`this.state`，并返回以下一种类型： 
- React元素。通过jsx创建，既可以是dom元素，也可以是用户自定义的组件。 
- 字符串或数字。他们将会以文本节点形式渲染到dom中。 
- Portals。react 16版本中提出的新的解决方案，可以使组件脱离父组件层级直接挂载在DOM树的任何位置。 
- null，什么也不渲染 
- 布尔值。也是什么都不渲染。

当返回`null`,`false`,`ReactDOM.findDOMNode(this)`将会返回null，什么都不会渲染。

`render()`方法必须是一个纯函数，他不应该改变`state`，也不能直接和浏览器进行交互，应该将事件放在其他生命周期函数中。 
如果`shouldComponentUpdate()`返回`false`，`render()`不会被调用。

**(5) componentDidMount**

`componentDidMount`在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。

**通常在这里进行ajax请求**

如果要初始化第三方的dom库，也在这里进行初始化。只有到这里才能获取到真实的dom.

**(6) componentWillReceiveProps()/UNSAFE_componentWillReceiveProps(nextProps)**

官方建议使用`getDerivedStateFromProps`函数代替`componentWillReceiveProps`。当组件挂载后，接收到新的`props`后会被调用。如果需要更新`state`来响应`props`的更改，则可以进行`this.props`和`nextProps`的比较，并在此方法中使用`this.setState()`。

如果父组件会让这个组件重新渲染，即使`props`没有改变，也会调用这个方法。

React不会在组件初始化props时调用这个方法。调用`this.setState`也不会触发。

**(7) shouldComponentUpdate(nextProps, nextState)**

调用`shouldComponentUpdate`使React知道，组件的输出是否受`state`和`props`的影响。默认每个状态的更改都会重新渲染，大多数情况下应该保持这个默认行为。

在渲染新的`props`或`state`前，`shouldComponentUpdate`会被调用。默认为`true`。这个方法不会在初始化时被调用，也不会在`forceUpdate()`时被调用。返回`false`不会阻止子组件在`state`更改时重新渲染。

如果`shouldComponentUpdate()`返回`false`，`componentWillUpdate`,`render`和`componentDidUpdate`不会被调用。

> 官方并不建议在`shouldComponentUpdate()`中进行深度查询或使用`JSON.stringify()`，他效率非常低，并且损伤性能。

**(8) UNSAFE_componentWillUpdate(nextProps, nextState)**

在渲染新的`state`或`props`时，`UNSAFE_componentWillUpdate`会被调用，将此作为在更新发生之前进行准备的机会。这个方法不会在初始化时被调用。

*不能在这里使用this.setState()*，也不能做会触发视图更新的操作。如果需要更新`state`或`props`，调用`getDerivedStateFromProps`。

**(9) getSnapshotBeforeUpdate()**

在react `render()`后的输出被渲染到DOM之前被调用。它使您的组件能够在它们被潜在更改之前捕获当前值（如滚动位置）。这个生命周期返回的任何值都将作为参数传递给componentDidUpdate（）。

**(10) componentDidUpdate(prevProps, prevState, snapshot)**

在更新发生后立即调用`componentDidUpdate()`。此方法不用于初始渲染。当组件更新时，将此作为一个机会来操作DOM。只要您将当前的props与以前的props进行比较（例如，如果props没有改变，则可能不需要网络请求），这也是做网络请求的好地方。

如果组件实现`getSnapshotBeforeUpdate()`生命周期，则它返回的值将作为第三个“快照”参数传递给`componentDidUpdate()`。否则，这个参数是`undefined`。

**(11) componentWillUnmount()**

在组件被卸载并销毁之前立即被调用。在此方法中执行任何必要的清理，例如使定时器无效，取消网络请求或清理在`componentDidMount`中创建的任何监听。

**(12) componentDidCatch(error, info)**

错误边界是React组件，可以在其子组件树中的任何位置捕获JavaScript错误，记录这些错误并显示回退UI，而不是崩溃的组件树。错误边界在渲染期间，生命周期方法以及整个树下的构造函数中捕获错误。

如果类组件定义了此生命周期方法，则它将成错误边界。在它中调用`setState()`可以让你在下面的树中捕获未处理的JavaScript错误，并显示一个后备UI。只能使用错误边界从意外异常中恢复; 不要试图将它们用于控制流程。

错误边界只会捕获树中下面组件中的错误。错误边界本身不能捕获错误。

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

> ![](proimg/ty.png)

```jsx
import React, { Component } from 'react'
// 新版本的生命周期钩子 16.3 版本以后
// 初始化  ---  挂载阶段
// 运行时  ---  更新时阶段
// 销毁
export default class App extends Component {
  // 1. 挂载阶段 - 设置初始化状态 以及 定义事件
  // 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数
  // 在 constructor() 函数中不要调用 setState() 方法
  constructor (props) {
    super(props)
    this.state = { count: 100 }
  }
  // 2. 挂载阶段 - 一般也没什么用
  // 5. 更新时阶段
  // componentWillMount () {} ---- 废弃
  // getDerivedStateFromProps 会在调用 render 方法之前调用，
  // 并且在初始挂载及后续更新时都会被调用。
  // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
  // state 的值在任何时候都取决于 props
  static getDerivedStateFromProps (props, state) {}

  // 3.挂载阶段 - 初次渲染函数
  // 7.更新时阶段 - 更新视图
  // render() 方法是 class 组件中唯一必须实现的方法
  // 当 render 被调用时，它会检查 this.props 和 this.state 的变化，变化更新视图
  render() {
    return (
      <div>
        { this.state.count }
      </div>
    )
  }
  // 4.挂载阶段 - 组件初次加载完毕 - mounted - 数据请求/实例化/定时器/计时器/DOM操作
  // 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。
  // 如需通过网络请求获取数据，此处是实例化请求的好地方。
  componentDidMount () {}

  // 5.更新时阶段 - 组件即将接收到新的数据 --- watch --- 子组件监听到父组件的数据变化 - 用的不多
  // componentWillReceiveProps () {} ---- 废弃

  // 6.更新时阶段 - 提升react 性能的关键，必须填写返回值，返回值为true，才能实现视图的二次渲染
  // 根据 shouldComponentUpdate() 的返回值，
  // 判断 React 组件的输出是否受当前 state 或 props 更改的影响。
  // 默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。
  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  // 7.更新时阶段 --- 组件即将更新 --- 没什么用
  // componentWillUpdate () {} --- 废弃

  // 8.更新时阶段 --- 并不常用
  // 在最近一次渲染输出（提交到 DOM 节点）之前调用。
  // 它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）
  getSnapshotBeforeUpdate (prevProps, prevState) {}

  // 9.更新时阶段 --- 组件更新完毕
  // 会在更新后会被立即调用。首次渲染不会执行此方法。
  // 当组件更新后，可以在此处对 DOM 进行操作。
  // 如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。
  componentDidUpdate (prevProps, prevState, snapshot) {}

  // 10.销毁阶段
  // 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，
  // 例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等
  componentWillUnmount () {}

  // 11.错误异常
  // 此生命周期在后代组件抛出错误后被调用。 它接收两个参数
  // error —— 抛出的错误。
  // info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。

  componentDidCatch (error, info) {}

  // 12.错误异常
  // 此生命周期会在后代组件抛出错误后被调用。 
  // 它将抛出的错误作为参数，并返回一个值以更新 state
  static getDerivedStateFromError (error) {}
}

```



## 6、PureComponent

`PureComponnet`里如果接收到的新属性或者是更改后的状态和原属性、原状态相同的话，就不会去重新render了
在里面也可以使用`shouldComponentUpdate`，而且。是否重新渲染以`shouldComponentUpdate`的返回值为最终的决定因素。

```jsx
import React, { Component } from 'react'
// 如果父组件的属性和状态发生改变，默认情况下，子组件也要重新渲染
class Child extends Component {
  render () {
    console.log('child')
    return (
      <div>child</div>
    )
  }
}
export default class App extends Component {
  state = {
    count: 100
  }
  render() {
    return (
      <div>
        <button onClick = { () => {
          this.setState({
            count: this.state.count
          })
        }}>改变数据</button>
        <Child />
      </div>
    )
  }
}

```

```jsx
import React, { Component, PureComponent } from 'react'
// 如果父组件的属性和状态发生改变，默认情况下，子组件也要重新渲染
// 如果组件继承了 PureComponent，react自身判断依赖的值有没有发生改变，如果没有发生改变，就不回重新渲染
// 类组件可以通过 PureComponent 提升性能
class Child extends PureComponent {
  render () {
    console.log('child')
    return (
      <div>child</div>
    )
  }
}
export default class App extends Component {
  state = {
    count: 100
  }
  render() {
    return (
      <div>
        <button onClick = { () => {
          this.setState({
            count: this.state.count
          })
        }}>改变数据</button>
        <Child />
      </div>
    )
  }
}

```

```jsx
import React, { Component, PureComponent } from 'react'
// 如果父组件的属性和状态发生改变，默认情况下，子组件也要重新渲染
// 如果组件继承了 PureComponent，react自身判断依赖的值有没有发生改变，如果没有发生改变，就不回重新渲染
// 类组件可以通过 PureComponent 提升性能
// 如果既有 PureComponent，但是也添加了 shouldComponentUpdate,并且返回true
// 以 shouldComponentUpdate 为主（二者同时使用会报警告信息）
class Child extends PureComponent {
  shouldComponentUpdate () {
    return true
  }
  render () {
    console.log('child')
    return (
      <div>child</div>
    )
  }
}
export default class App extends Component {
  state = {
    count: 100
  }
  render() {
    return (
      <div>
        <button onClick = { () => {
          this.setState({
            count: this.state.count
          })
        }}>改变数据</button>
        <Child />
      </div>
    )
  }
}

```



## 7、ref

React提供的这个`ref`属性，表示为对组件真正实例的引用，其实就是`ReactDOM.render()`返回的组件实例,`ref`可以挂载到组件上也可以是dom元素上。

- 挂到组件(`class`声明的组件)上的ref表示对组件实例的引用。**不能**在函数式组件上使用 ref 属性，因为它们没有实例：
- 挂载到dom元素上时表示具体的dom元素节点。 --- 非受组件

在React 最新的版本中，要使用`ref`, 需要使用`React.createRef`方法先生成一个`ref`。

```jsx
import React, { Component, PureComponent } from 'react'

// 使用ref获取子组件的实例，子组件必须是类组件
// 函数式组件没有实例
// class Child extends PureComponent {
//   state = { title: '标题' }
//   render () {
//     console.log('child')
//     return (
//       <div>child</div>
//     )
//   }
// }

const Child = () => {
  const fn = () => {
    console.log('fn')
  }
  return (
    <div>child</div>
  )
}
export default class App extends Component {
  childRef = React.createRef()
  render() {
    return (
      <div>
        <button onClick = { () => {
          console.log(this.childRef.current)
        }}>获取子组件的数据</button>
        <Child ref = { this.childRef }/>
      </div>
    )
  }
}

```



# 十二、组件通信

vue（父--子，子--父， 非父子（const bus = new Vue（） bu s.$on(). Bus.$emit()），跨组件传值（provide/inject），vuex传值, $parent, $ref）

**父组件与子组件通信**

- 父组件将自己的状态传递给子组件，子组件当做属性来接收，当父组件更改自己状态的时候，子组件接收到的属性就会发生改变

  ```jsx
  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  /**
   * 父组件在调用子组件的地方，添加一个自定义的属性
   * 如果自定义的属性的值是变量，boolean类型，number类型,数组，对象，null,undefined
   * 使用 {} 包裹数据
   * 子组件内部可以通过 `this.props.自定义属性名`  或者是 `props.自定义属性名`来显示数据
   * 如果想要验证数据类型，需要安装 `prop-types`模块
   * 根据 `组件.propTypes`验证数据类型，
   * 内部结构为 `{ 自定义属性名: PropTypes.数据类型 }`
   * 如果需要设定该属性是必须传递的，
   * 内部结构为 `{ 自定义属性名: PropTypes.数据类型.isRequired }`
   * 如果需要设定该属性的默认值，
   * 类组件（组件内部 `static defaultProps={ key: value}`）,
   * 函数式组件（`组件.defaultProps={key: value}`）
   * `Com.propTypes= { 
   *     name: PropTypes.oneOfType([
   *        PropTypes.string, 
   *        PropTypes.number
   *      ]).isRequired}`
   * */
  class Child extends Component {
    state = { test: '测试' }
    static defaultProps = { count: 1000 }
    render () {
      console.log('child render')
      return (
        <div>child - { this.props.count }</div>
      )
    }
  }
  Child.propTypes = {
    count: PropTypes.number
  }
  export default class App extends Component {
    state = { count: 10 }
    render() {
      return (
        <div>
          <button onClick = { () => {
            this.setState({ count: this.state.count + 10 })
          }}>加</button>
          <Child count = { this.state.count }/>
          <Child/>
        </div>
      )
    }
  }
  
  ```

  

**子组件与父组件通信**

- 父组件将自己的某个方法传递给子组件，在方法里可以做任意操作，比如可以更改状态，子组件通过`this.props`接收到父组件的方法后调用。

  > 父给子传的是值 ---- 父传子
  >
  > 父给子传的是函数 ---- 子传父

  > 父组件在调用子组件的地方，添加一个自定义的属性
  >
  > 属性的值为一个函数，该函数的参数就是子组件需要传递给父组件的值
  >
  > 在子组件的某一个事件内部，通过 `this.props.自定义属性名(参数)`完成子组件给父组件传值

  ```jsx
  import React, { Component } from 'react'
  /**
   * 子组件给父组件传值
   *    子给父传，其实也是父给子传，只不过父传给子的是函数
   * 
   *  父组件在调用子组件的地方，添加一个自定义的属性
   * 属性的值是一个函数，该函数的默认参数就是子组件需要传递给父组件的值
   * 
   * 子组件的某一个事件内， 通过 this.props.自定义属性名(参数) 完成传值
   */
  class Child extends Component {
    state = { test: '测试' }
    
    render () {
      console.log('child render')
      return (
        <div>Child
          <button onClick = { () => {
            this.props.fn('aaaaaa')
          }}>发送数据</button>
        </div>
      )
    }
  }
  export default class App extends Component {
    state = { count: 10 }
    getData = (data) => {
    console.log(data)
    }
    render() {
      return (
        <div>
          <button onClick = { () => {
            this.setState({ count: this.state.count + 10 })
          }}>加</button>
          <Child fn = { this.getData }/> 
        </div>
      )
    }
  }
  
  
  ```
  
  

**跨组件通信** - Context传值

https://zh-hans.reactjs.org/docs/context.html

![](proimg/666.png)

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

回忆vue中其实也有跨组件传值

https://cli.vuejs.org/zh/guide/prototyping.html  vue的快速原型开发 ---- 单文件组件写测试代码

```
npm install -g @vue/cli-service-global
```

App.vue

```
<template>
  <div>
    App
    <Child />
  </div>
</template>
<script>
import Child from './Child'
export default {
  provide: {
    count: 1000
  },
  components: {
    Child
  }
}
</script>
```

Child.vue

```
<template>
  <div>
    child - {{ count }}
  </div>
</template>

<script>
export default {
  inject: ['count']
}
</script>
```

```
vue serve App.vue
```





在react没有类似vue中的事件总线来解决这个问题，我们只能借助它们共同的父级组件来实现，将非父子关系装换成多维度的父子关系。react提供了`context` api来实现跨组件通信, React 16.3之后的`context`api较之前的好用。

逐层传递

```jsx
import React, { Component } from 'react'

class MyButton extends Component {
  render () {
    return (
      <div>
        { this.props.theme }
        <button>1</button>
      </div>
    )
  }
}
class ToolBar extends Component {
  render () {
    return (
      <MyButton theme = { this.props.theme }></MyButton>
    )
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        <ToolBar theme = "dark"/>
      </div>
    )
  }
}

```

Class.contextType

```jsx
import React, { Component } from 'react'
// 1.创建上下文对象
const ThemeContext = React.createContext()
class MyButton extends Component {
  // 3.如果后代组件是一个类组件 Class.contextType 完成取值
  // 可以通过  this.context 得到组件组件的值
  static contextType = ThemeContext;
  render () {
    return (
      <div>
        { this.context }
        <button>1</button>
      </div>
    )
  }
}
class ToolBar extends Component {
  render () {
    return (
      <MyButton></MyButton>
    )
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 2.祖先组件传递数据
          通过上下文对象 的Provider组件完成传值，必须通过value属性传值
        */}
        <ThemeContext.Provider value="light">
          <ToolBar/>
        </ThemeContext.Provider>
      </div>
    )
  }
}

```

Consumer

```jsx
import React, { Component } from 'react'
// 1.创建上下文对象
const ThemeContext = React.createContext()
class MyButton extends Component {
  // 3.Context.Consumer完成取值,内部为一个函数，函数的默认参数为祖先组件传递的值，可以返回一段jsx代码
  render () {
    return (
      <div>
        <ThemeContext.Consumer>
          {
            (value) => {
              return <span>{ value }</span>
            }
          }
        </ThemeContext.Consumer>
        <button>1</button>
      </div>
    )
  }
}
class ToolBar extends Component {
  render () {
    return (
      <MyButton></MyButton>
    )
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 2.祖先组件传递数据
          通过上下文对象 的Provider组件完成传值，必须通过value属性传值
        */}
        <ThemeContext.Provider value="dark">
          <ToolBar/>
        </ThemeContext.Provider>
      </div>
    )
  }
}

```

**dispalyName** --- 配合开发者工具查看效果

```jsx
import React, { Component } from 'react'
// 1.创建上下文对象
const ThemeContext = React.createContext()
const ColorContext = React.createContext()
// 配合 开发者工具查看效果
ThemeContext.displayName = 'ThemeContext'
ColorContext.displayName = 'ColorContext'
class MyButton extends Component {
  // 3.Context.Consumer完成取值,内部为一个函数，函数的默认参数为祖先组件传递的值，可以返回一段jsx代码
  render () {
    return (
      <div>
        <ThemeContext.Consumer>
          {
            (value) => {
              return <span>{ value }</span>
            }
          }
        </ThemeContext.Consumer>
        <button>1</button>
      </div>
    )
  }
}
class ToolBar extends Component {
  render () {
    return (
      <MyButton></MyButton>
    )
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 2.祖先组件传递数据
          通过上下文对象 的Provider组件完成传值，必须通过value属性传值
        */}
        <ThemeContext.Provider value="dark">
          <ColorContext.Provider value = "red">
            <ToolBar/>
          </ColorContext.Provider>
        </ThemeContext.Provider>
      </div>
    )
  }
}

```



实例，使用`context` 实现购物车中的加减功能 ---  --- 自行研究

```jsx
// counterContext.js
import React, { Component, createContext } from 'react'

const {
  Provider,
  Consumer: CountConsumer
} = createContext()

class CountProvider extends Component {
  constructor () {
    super()
    this.state = {
      count: 1
    }
  }
  increaseCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  decreaseCount = () => {
    this.setState({
      count: this.state.count - 1
    })
  }
  render() {
    return (
      <Provider value={{
        count: this.state.count,
        increaseCount: this.increaseCount,
        decreaseCount: this.decreaseCount
      }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export {
  CountProvider,
  CountConsumer
}
```

```jsx
// 定义CountButton组件
const CountButton = (props) => {
  return (
    <CountConsumer>
      // consumer的children必须是一个方法
      {
        ({ increaseCount, decreaseCount }) => {
          const { type } = props
          const handleClick = type === 'increase' ? increaseCount : decreaseCount
          const btnText = type === 'increase' ? '+' : '-'
          return <button onClick={handleClick}>{btnText}</button>
        }
      }
    </CountConsumer>
  )
}
```

```jsx
// 定义count组件，用于显示数量
const Count = (prop) => {
  return (
    <CountConsumer>
      {
        ({ count }) => {
          return <span>{count}</span>
        }
      }
    </CountConsumer>
  )
}
```

```jsx
// 组合
class App extends Component {
  render () {
    return (
  		<CountProvider>
        <CountButton type='decrease' />
        <Count />
        <CountButton type='increase' />
      </CountProvider>
  	)
  }
}
```

> 复杂的非父子组件通信在react中很难处理，多组件间的数据共享也不好处理，在实际的工作中我们会使用flux、redux、mobx来实现， 就类似于 vuex



# 十三、HOC(高阶组件)

https://zh-hans.reactjs.org/docs/higher-order-components.html

Higher-Order Components就是一个函数，传给它一个组件，它返回一个新的组件。

```
import React, { Component } from 'react'

class Header extends Component {
  state = {
    username: ''
  }
  componentDidMount () {
    this.setState({
      username: localStorage.getItem('username')
    })
  }
  render () {
    const { username } = this.state
    return (
      <h1>header - { username }</h1>
    )
  }
}

class Content extends Component {
  state = {
    username: ''
  }
  componentDidMount () {
    this.setState({
      username: localStorage.getItem('username')
    })
  }
  render () {
    const { username } = this.state
    return (
      <div>content - { username }</div>
    )
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

```



好处类似于 js 的封装的好处

```jsx
const NewComponent = higherOrderComponent(YourComponent)
```

比如

```jsx
import React, { Component } from 'react'
// 高阶组件HOC其实就是一个函数，他把组件作为参数，并且返回一个新的组件
// 一般情况下，高阶适用于类组件
const withTest = (Com) => {
  return class extends Component {
    state = {
      username: ''
    }
    componentDidMount () {
      this.setState({
        username: localStorage.getItem('username')
      })
    }
    render () {
      return (
        <Com username = { this.state.username }/>
      )
    }
  }
}

class Header extends Component {
  render () {
    const { username } = this.props
    return (
      <h1>header - { username }</h1>
    )
  }
}
Header = withTest(Header)
class Content extends Component {
  
  render () {
    const { username } = this.props
    return (
      <div>content - { username }</div>
    )
  }
}
Content = withTest(Content)
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

```

这样只要我们有需要用到版权信息的组件，都可以直接使用withWrapper这个高阶组件包裹即可。

# 十五、状态管理

## 1、传统MVC框架的缺陷

**什么是MVC？**

![](proimg/14.png)

`MVC`的全名是`Model View Controller`，是模型(model)－视图(view)－控制器(controller)的缩写，是一种软件设计典范。

`V`即View视图是指用户看到并与之交互的界面。

`M`即Model模型是管理数据 ，很多业务逻辑都在模型中完成。在MVC的三个部件中，模型拥有最多的处理任务。

`C`即Controller控制器是指控制器接受用户的输入并调用模型和视图去完成用户的需求，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示返回的数据。

**MVC只是看起来很美**

MVC框架的数据流很理想，请求先到Controller, 由Controller调用Model中的数据交给View进行渲染，但是在实际的项目中，又是允许Model和View直接通信的。

## 2、Flux

在2013年，Facebook让`React`亮相的同时推出了Flux框架，`React`的初衷实际上是用来替代`jQuery`的，`Flux`实际上就可以用来替代`Backbone.js`，`Ember.js`等一系列`MVC`架构的前端JS框架。

其实`Flux`在`React`里的应用就类似于`Vue`中的`Vuex`的作用，但是在`Vue`中，`Vue`是完整的`mvvm`框架，而`Vuex`只是一个全局的插件。

`React`只是一个MVC中的V(视图层)，只管页面中的渲染，一旦有数据管理的时候，`React`本身的能力就不足以支撑复杂组件结构的项目，在传统的`MVC`中，就需要用到Model和Controller。Facebook对于当时世面上的`MVC`框架并不满意，于是就有了`Flux`, 但`Flux`并不是一个`MVC`框架，他是一种新的思想。

![](proimg/777.png)

- View： 视图层
- ActionCreator（动作创造者）：视图层发出的消息（比如mouseClick）
- Dispatcher（派发器）：用来接收Actions、执行回调函数
- Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

Flux的流程：

1. 组件获取到store中保存的数据挂载在自己的状态上
2. 用户产生了操作，调用actions的方法
3. actions接收到了用户的操作，进行一系列的逻辑代码、异步操作
4. 然后actions会创建出对应的action，action带有标识性的属性
5. actions调用dispatcher的dispatch方法将action传递给dispatcher
6. dispatcher接收到action并根据标识信息判断之后，调用store的更改数据的方法
7. store的方法被调用后，更改状态，并触发自己的某一个事件
8. store更改状态后事件被触发，该事件的处理程序会通知view去获取最新的数据



## 3、Redux

React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。有两个方面，它没涉及。

- 代码结构 
- 组件之间的通信

2013年 Facebook 提出了 Flux 架构的思想，引发了很多的实现。2015年，Redux 出现，将 Flux 与[函数式编程](<https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/>)结合一起，很短时间内就成为了最热门的前端架构。

如果你不知道是否需要 Redux，那就是不需要它

只有遇到 React 实在解决不了的传值问题，你才需要 Redux

简单说，如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

- 用户的使用方式非常简单
- 用户之间没有协作
- 不需要与服务器大量交互，也没有使用 WebSocket（socket.io）
- 视图层（View）只从单一来源获取数据

**需要使用Redux的项目:**

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据

**从组件层面考虑，什么样子的需要Redux：**（多个组件依赖于同一个状态，来自不同组件的行为需要变更同一个状态）

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

**Redux的设计思想：**

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面（唯一数据源）。

> 注意：flux、redux都不是必须和react搭配使用的，因为flux和redux是完整的架构，在学习react的时候，只是将react的组件作为redux中的视图层去使用了。

**Redux的使用的三大原则：**

- Single Source of Truth(唯一的数据源)
- State is read-only(状态是只读的)
- Changes are made with pure function(数据的改变必须通过纯函数完成)



### (1) 自己实现Redux - 不讲解

这个部分，不使用react，直接使用原生的html/js来写一个简易的的redux

**基本的状态管理及数据渲染：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Redux principle 01</title>
</head>
<body>
  <h1>redux principle</h1>
  <div class="counter">
    <span class="btn" onclick="dispatch({type: 'COUNT_DECREMENT', number: 10})">-</span>
    <span class="count" id="count"></span>
    <span class="btn" id="add" onclick="dispatch({type: 'COUNT_INCREMENT', number: 10})">+</span>
  </div>
  <script>
    // 定义一个计数器的状态
    const countState = {
      count: 10
    }

    // 定一个方法叫changeState，用于处理state的数据，每次都返回一个新的状态
    const changeState = (action) => {
      switch(action.type) {
        // 处理减
        case 'COUNT_DECREMENT':
          countState.count -= action.number
          break;
        // 处理加        
        case 'COUNT_INCREMENT':
          countState.count += action.number
          break;
        default:
          break;
      }
    }

    // 定义一个方法用于渲染计数器的dom
    const renderCount = (state) => {
      const countDom = document.querySelector('#count')
      countDom.innerHTML = state.count
    }
  
    // 首次渲染数据
    renderCount(countState)

    // 定义一个dispatch的方法，接收到动作之后，自动调用
    const dispatch = (action) => {
      changeState(action)
      renderCount(countState)
    }

  </script>
</body>
</html>
```

**创建createStore方法**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Redux principle 02</title>
</head>
<body>
  <h1>redux principle</h1>
  <div class="counter">
    <span class="btn" onclick="store.dispatch({type: 'COUNT_DECREMENT', number: 10})">-</span>
    <span class="count" id="count"></span>
    <span class="btn" id="add" onclick="store.dispatch({type: 'COUNT_INCREMENT', number: 10})">+</span>
  </div>
  <script>
    // 定义一个方法，用于集中管理state和dispatch
    const createStore = (state, changeState) => {
      // getState用于获取状态
      const getState = () => state
      
      // 定义一个监听器，用于管理一些方法
      const listeners = []
      const subscribe = (listener) => listeners.push(listener)

       // 定义一个dispatch方法，让每次有action传入的时候返回render执行之后的结果
      const dispatch = (action) => {
        // 调用changeState来处理数据
        changeState(state, action)
        // 让监听器里的所以方法运行
        listeners.forEach(listener => listener())
      }
      return {
        getState,
        dispatch,
        subscribe
      }
    }
    // 定义一个计数器的状态
    const countState = {
      count: 10
    }
    // 定一个方法叫changeState，用于处理state的数据，每次都返回一个新的状态
    const changeState = (state, action) => {
      switch(action.type) {
        // 处理减
        case 'COUNT_DECREMENT':
          state.count -= action.number
          break;
        // 处理加        
        case 'COUNT_INCREMENT':
          state.count += action.number
          break;
        default:
          break;
      }
    }

    // 创建一个store
    const store = createStore(countState, changeState)
    // 定义一个方法用于渲染计数器的dom
    const renderCount = () => {
      const countDom = document.querySelector('#count')
      countDom.innerHTML = store.getState().count
    }
    // 初次渲染数据
    renderCount()
    // 监听，只要有dispatch，这个方法就会自动运行
    store.subscribe(renderCount)
  </script>
</body>
</html>
```

**让changeState方法变为一个纯函数**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Redux principle 03</title>
</head>
<body>
  <h1>redux principle</h1>
  <div class="counter">
    <span class="btn" onclick="store.dispatch({type: 'COUNT_DECREMENT', number: 10})">-</span>
    <span class="count" id="count"></span>
    <span class="btn" id="add" onclick="store.dispatch({type: 'COUNT_INCREMENT', number: 10})">+</span>
  </div>
  <script>
    // 定义一个方法，用于集中管理state和dispatch
    const createStore = (state, changeState) => {
      // getState用于获取状态
      const getState = () => state
      
      // 定义一个监听器，用于管理一些方法
      const listeners = []
      const subscribe = (listener) => listeners.push(listener)

      // 定义一个dispatch方法，让每次有action传入的时候返回render执行之后的结果
      const dispatch = (action) => {
        // 调用changeState来处理数据
        state = changeState(state, action)
        // 让监听器里的所有方法运行
        listeners.forEach(listener => listener())
      }
      return {
        getState,
        dispatch,
        subscribe
      }
    }
    // 定义一个计数器的状态
    const countState = {
      count: 10
    }
    // 定一个方法叫changeState，用于处理state的数据，每次都返回一个新的状态
    const changeState = (state, action) => {
      switch(action.type) {
        // 处理减
        case 'COUNT_DECREMENT':
          return {
            ...state,
            count: state.count - action.number
          }
        // 处理加        
        case 'COUNT_INCREMENT':
          return {
            ...state,
            count: state.count + action.number
          }
        default:
          return state
      }
    }

    // 创建一个store
    const store = createStore(countState, changeState)
    // 定义一个方法用于渲染计数器的dom
    const renderCount = () => {
      const countDom = document.querySelector('#count')
      countDom.innerHTML = store.getState().count
    }
    // 初次渲染数据
    renderCount()
    // 监听，只要有dispatch，这个方法就会自动运行
    store.subscribe(renderCount)
  </script>
</body>
</html>
```

**合并state和changeState(最终版)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Redux principle 04</title>
</head>
<body>
  <h1>redux principle</h1>
  <div class="counter">
    <span class="btn" onclick="store.dispatch({type: 'COUNT_DECREMENT', number: 10})">-</span>
    <span class="count" id="count"></span>
    <span class="btn" id="add" onclick="store.dispatch({type: 'COUNT_INCREMENT', number: 10})">+</span>
  </div>
  <script>
    // 定义一个方法，用于集中管理state和dispatch, changeState改名了，专业的叫法是reducer
    const createStore = (reducer) => {
      // 定义一个初始的state
      let state = null
      // getState用于获取状态
      const getState = () => state
      
      // 定义一个监听器，用于管理一些方法
      const listeners = []
      const subscribe = (listener) => listeners.push(listener)

      // 定义一个dispatch方法，让每次有action传入的时候返回reducer执行之后的结果
      const dispatch = (action) => {
        // 调用reducer来处理数据
        state = reducer(state, action)
        // 让监听器里的所有方法运行
        listeners.forEach(listener => listener())
      }
      //  初始化state
      dispatch({})
      return {
        getState,
        dispatch,
        subscribe
      }
    }
    // 定义一个计数器的状态
    const countState = {
      count: 10
    }
    // 定一个方法叫changeState，用于处理state的数据，每次都返回一个新的状态
    const changeState = (state, action) => {
      // 如果state是null, 就返回countState
      if (!state) return countState
      switch(action.type) {
        // 处理减
        case 'COUNT_DECREMENT':
          return {
            ...state,
            count: state.count - action.number
          }
        // 处理加        
        case 'COUNT_INCREMENT':
          return {
            ...state,
            count: state.count + action.number
          }
        default:
          return state
      }
    }

    // 创建一个store
    const store = createStore(changeState)
    // 定义一个方法用于渲染计数器的dom
    const renderCount = () => {
      const countDom = document.querySelector('#count')
      countDom.innerHTML = store.getState().count
    }
    // 初次渲染数据
    renderCount()
    // 监听，只要有dispatch，renderCount就会自动运行
    store.subscribe(renderCount)
  </script>
</body>
</html>
```



### (2) 使用Redux框架

**Redux的流程：**-背下来

![](proimg/999.jpg)

- store通过reducer创建了初始状态

- view通过store.getState()获取到了store中保存的state挂载在了自己的状态上

- 用户产生了操作，调用了actions 的方法

- actions的方法被调用，创建了带有标示性信息的action

- actions将action通过调用store.dispatch方法发送到了reducer中

- reducer接收到action并根据标识信息判断之后返回了新的state

- store的state被reducer更改为新state的时候，store.subscribe方法里的回调函数会执行，此时就可以通知view去重新获取state

**Reducer必须是一个纯函数：**

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。Reducer不是只有Redux里才有，之前学的数组方法`reduce`, 它的第一个参数就是一个reducer

纯函数是函数式编程的概念，必须遵守以下一些约束。

- 不得改写参数

- 不能调用系统 I/O 的API

- 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

```js
// State 是一个对象
function reducer(state = defaultState, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state = defaultState, action) {
  return [...state, newItem];
}
```

最好把 State 对象设成只读。要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变(immutable)的对象。

我们可以通过在createStore中传入第二个参数来设置默认的state，但是这种形式只适合于只有一个reducer的时候。

```
cnpm i redux -S
```

```jsx
// src/index.js
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector('#root')
)
```

```jsx
// src/App.jsx
import React, { Component } from 'react'
import List1 from './List1.jsx'
import List2 from './List2.jsx'
export default class App extends Component {
  render() {
    return (
      <div>
        <List1 />
        <hr />
        <List2 />
      </div>
    )
  }
}

```

```jsx
// src/List1.jsx
import React, { Component } from 'react'

export default class List1 extends Component {
  render() {
    return (
      <div>
        list1
      </div>
    )
  }
}

```

```jsx
// src/List2.jsx
import React, { Component } from 'react'

export default class List2 extends Component {
  render() {
    return (
      <div>
        list2
      </div>
    )
  }
}

```



* **定义状态管理器**

```js
// 1.安装 redux 模块  cnpm i redux -S
// 2.引入模块
import { createStore } from 'redux'

// 3.创建reducer --- 纯函数  ---  输入一定，输出就一定确定
// 设置组件的初始化状态以及更新状态的标识， 返回新的值来表示新的状态
// const reducer = () => {}
// const reducer = (state = {}, action) => {} state 表示上一次的状态

const reducer = (state = {
  list: [1, 2, 3],
  a: 100
}, action) => {
  // action 表示修改状态的一个标识，一般有两个参数，
  // 一个是type
  // 一个是数据
  const { type, payload } = action

  // 业务逻辑
  switch (type) {
    case 'CHANGE_LIST':
      // 必须得写返回值，需要返回的是一个全新的对象
      // Object.assign() --- 合并对象 https://es6.ruanyifeng.com/#docs/object-methods#Object-assign
      // { ...state, list: payload }
      return { ...state, list: payload }
    case 'CHANGE_A':
      return Object.assign({}, state, { a: payload })
    default:
      return state // 如果没有匹配到 标识，那么就返回上一次的状态
  }
}

// 4.创建状态管理器
const store = createStore(reducer)

// 5.暴露模块
export default store
```

* **入口文件处订阅数据的变化**

```js
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'
// 6.引入状态管理器
import store from './store'
console.log(store) 
// dispatch  ---- 可以用来在组件中触发 改变状态的标识
// getState  ---- 可以用来在组件中获取状态管理器中的数据
// replaceReducer ---- 一般不轻易使用
// subscribe ---- 可以用来在需要的订阅状态管理器数据的变化

function render () {
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById('root')
  )
}
render()

// 7.订阅状态管理器的数据变化
store.subscribe(render)
```

* **组件使用状态管理器**

```jsx
import React, { Component } from 'react'
// 8.组件引入状态管理器
import store from './store'
export default class List1 extends Component {
  render() {
    return (
      <div>
        list1
        <button onClick={ () => {
          // 9.改变状态
          store.dispatch({
            type: 'CHANGE_LIST',
            payload: [4, 5, 6]
          })
        } }>改变list的值</button>
        {
          store.getState().list.map((item, index) => {
            return (
            <div key={index}>{ item }</div>
            )
          })
        }
      </div>
    )
  }
}

```

```jsx
import React, { Component } from 'react'
// 8.组件引入状态管理器
import store from './store'
export default class List2 extends Component {
  render() {
    return (
      <div>
        list2
        <button onClick={ () => {
          // 9.改变状态
          store.dispatch({
            type: 'CHANGE_LIST',
            payload: [7, 8, 9]
          })
        } }>改变list的值</button>
        {
          store.getState().list.map((item, index) => {
            return (
            <div key={index}>{ item }</div>
            )
          })
        }
      </div>
    )
  }
}

```

### （3）使用react-redux + redux

> 如果只使用redux，虽然能够解决问题，但是我们可以配合 react-redux 更好的解决问题

使用react-redux 就需要将组件划分为 容器组件和 UI（展示）组件

|                | 展示组件                   | 容器组件                           |
| -------------: | :------------------------- | :--------------------------------- |
|           作用 | 描述如何展现（骨架、样式） | 描述如何运行（数据获取、状态更新） |
| 直接使用 Redux | 否                         | 是                                 |
|       数据来源 | props                      | 监听 Redux state                   |
|       数据修改 | 从 props 调用回调函数      | 向 Redux 派发 actions              |
|       调用方式 | 手动                       | 通常由 React Redux 生成            |

react-redux提供两个核心的api：

- Provider: 提供store

- connect: 用于连接容器组件和展示组件

  - Provider

    根据单一store原则 ，一般只会出现在整个应用程序的最顶层。

  - connect

    语法格式为

    `connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)(component)`

    一般来说只会用到前面两个，它的作用是：

    - 把`store.getState()`的状态转化为展示组件的`props`
    - 把`actionCreators`转化为展示组件`props`上的方法

>特别强调：
>
>官网上的第二个参数为mapDispatchToProps, 实际上就是actionCreators

只要上层中有`Provider`组件并且提供了`store`, 那么，子孙级别的任何组件，要想使用`store`里的状态，都可以通过`connect`方法进行连接。如果只是想连接`actionCreators`，可以第一个参数传递为`null`

改造之前的redux案例

* 创建状态管理步骤不需要更改

```js
// store/index.js
// yarn add redux react-redux -S
import { createStore } from 'redux'

const reducer = (state = {
  list: [1, 2, 3],
  a: '1111'
}, { type, payload }) => {
  switch (type) {
    case 'UPDATE_LIST':
      return Object.assign({}, state, { list: payload })
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
```

* 修改入口文件，替换引入状态管理器的方式

```js
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'

// 入口文件初引入 基于react-redux 的Provider组件
import { Provider } from 'react-redux'
import store from './store'

// 给Provider添加store属性 --- 属性的改变，会引起视图的二次更新
ReactDOM.render(
  <StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
```

* 组件中如何使用状态管理器

> 容器组件 --- connect()(UI组件)
>
> 展示组件-UI组件 ---- UI组件其实就是你写的那个组件

```jsx
// src/List1.jsx
import React, { Component } from 'react'
// 通过 react-redux 引入高阶组件
import { connect } from 'react-redux'

// UI组件 / 展示组件
// 展示数据即可，将业务交给容器组件处理
class List1 extends Component {
  render() {
    return (
      <div>
        List1
        <button onClick = { () => {
          this.props.changeList()
        }}>改变数据</button>
        {
          this.props.list.map((item, index) => (
            <div key = { index }>{ item }</div>
          ))
        }
      </div>
    )
  }
}
// 从状态管理器获取状态
const mapStateToProps = (state) => { // state 表示所有的状态
  return {
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => { // dispatch 可以触发reducer的改变
  return {
    changeList () { // 容器组件需要执行的业务逻辑
      dispatch({
        type: 'UPDATE_LIST',
        payload: [4, 5, 6]
      })
    }
  }
}

// 暴露出去的是容器组件 - 负责获取状态管理器中的数据，以及修改状态管理中的数据，通过props与UI组件交互
// 实际上 connect() 才是高阶组件
// export default connect()(List1)
export default connect(mapStateToProps, mapDispatchToProps)(List1)

// fn(1)(2)(3) 输出结果为6，实现fn函数   ----   函数柯里化
/**
 * 
 * function fn (a) {
 *    return function (b) {
 *      return function (c) {
 *        return a + b + c
 *      }
 *    }
 * }
 */

```

```jsx
// src/List2.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
class List2 extends Component {
  render() {
    return (
      <div>
        List2
        <button onClick = {() => {
          this.props.changeList()
        }} >改变数据</button>
        { this.props.list.map((item, index) => {
          return (
            <div key={index}> { item }</div>
          )
        })}
      </div>
    )
  }
}
export default connect((state) => {
  return { list: state.list }
}, (dispatch) => {
  return {
    changeList () {
      dispatch({ type: 'UPDATE_LIST', payload: [7, 8, 9] })
    }
  }
})(List2)
```

### (4)接口请求数据

```js
// src/store/index.js
import { createStore } from 'redux'

const reducer = (state = {
  bannerList: [],
  proList: []
}, action) => {
  switch (action.type) {
    case 'CHANGE_BANNER_LIST':
      return { ...state, bannerList: action.payload }
    case 'CHANGE_PRO_LIST':
      return Object.assign({}, state, { proList: action.payload })
    default:
      return state
  }
}

const store = createStore(reducer)

export default store

```

```js
//src/index.js
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

```

```jsx
// src/App.jsx
import React, { Component } from 'react'
import Home from './Home'
export default class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}

```

```jsx
// src/Home.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
class Home extends Component {
  componentDidMount () {
    this.props.getBannerList()
    this.props.getProList()
  }
  render() {
    return (
      <div>
        {
          this.props.bannerList.map(item => {
            return (
              <img style={{ width: 100}} src = { item.img } key = { item.bannerid } alt={item.alt}/>
            )
          })
        }

        <ul>
          {
            this.props.proList.map(item => {
              return (
                <li key = { item.proid }>
                  { item.proname }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    bannerList: state.bannerList,
    proList: state.proList
  }
}, (dispatch) => {
  return {
    getBannerList () {
      fetch('http://121.89.205.189/api/banner/list')
        .then(res => res.json())
        .then(res => {
          console.log(res)
          dispatch({
            type: 'CHANGE_BANNER_LIST',
            payload: res.data
          })
        })
    },
    getProList () {
      fetch('http://121.89.205.189/api/pro/list')
        .then(res => res.json())
        .then(res => {
          console.log(res)
          dispatch({
            type: 'CHANGE_PRO_LIST',
            payload: res.data
          })
        })
    }
  }
})(Home)
```



> 现阶段 异步操作发生在了 容器组件中，类似于vue中时，异步操作在组件，现在想要把异步操作抽离出去，类似于vue中把异步操作放到actions中

### （5）redux + react-redux + redux-thunk

> cnpm i redux-thunk -S

> 现在异步操作在容器组件，抽离时需要注意redux的使用的配置

* 修改状态管理器的设置，加入异步的中间件

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = (state = {
  bannerList: [],
  proList: []
}, { type, payload }) => {
  switch (type) {
    case 'UPDATE_BANNER_LIST':
      return Object.assign({}, state, { bannerList: payload })
    case 'UPDATE_PRO_LIST':
      return Object.assign({}, state, { proList: payload })
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
```

* 创建 异步操作的文件 actionCreator --- 一定要注意参数的传递

```js
// src/store/actionCreator.js
// 处理异步操作
// 如果调用的时候没有参数，则action有默认的参数dispatch
// 如果调用的时候有参数，则action的参数为你传递的参数，给它返回一个函数，返回的函数的默认参数为dispatch
// dispatch 可以 直接触发reducer中的状态的改变
import axios from 'axios'
const action = {
  getBannerListAction (dispatch) {
    axios.get('http://121.89.205.189/api/banner/list')
      .then(res => {
        dispatch({
          type: 'UPDATE_BANNER_LIST',
          payload: res.data.data
        })
      })
  },
  getProListAction (params) {
    return (dispatch) => {
      axios.get('http://121.89.205.189/api/pro/list', { params })
        .then(res => {
          dispatch({
            type: 'UPDATE_PRO_LIST',
            payload: res.data.data
          })
        })
    }
  }
}

export default action
```

* 组件中触发actionCreator

```jsx
// src/Home.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import action from './store/actionCreator.js' 
class Home extends Component {
  componentDidMount () {
    this.props.getBannerList()
    this.props.getProList({ limitNum: 50 })
  }
  render() {
    const { bannerList, proList } = this.props
    return (
      <div>
        <ul>
          {
            bannerList && bannerList.map((item, index) => (
              <li key = { index }>
                <img style={{ width: 100 }} src={ item.img } alt={ item.alt }/>
              </li>
            ))
          }
        </ul>
        <ul>
          {
            proList && proList.map((item, index) => (
              <li key = { index }>
                { item.proname }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}


export default connect(({ bannerList, proList }) => ({ bannerList, proList }),
(dispatch) => ({ 
  // dispatch 可以用来触发 actionCreator
  getBannerList () {
    // 本质上 调用 actionCreator 不需要加 ()
    // 但是如果在调用 actionCreator 时 你传递了参数，就需要加()
    dispatch(action.getBannerListAction)
  },
  getProList (params) {
    dispatch(action.getProListAction(params))
  }
}))(Home)
```

容器组件的disaptch 拥有不同的含义，看使用场景

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import action from './store/actionCreator.js' 
import axios from 'axios'
class Home extends Component {
  componentDidMount () {
    this.props.getBannerList()
    this.props.getProList({ limitNum: 5 })
  }
  render() {
    const { bannerList, proList } = this.props
    return (
      <div>
        <ul>
          {
            bannerList && bannerList.map((item, index) => (
              <li key = { index }>
                <img style={{ width: 100 }} src={ item.img } alt={ item.alt }/>
              </li>
            ))
          }
        </ul>
        <ul>
          {
            proList && proList.map((item, index) => (
              <li key = { index }>
                { item.proname }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}


// export default connect(({ bannerList, proList }) => ({ bannerList, proList }),
// (dispatch) => ({ 
//   // dispatch 可以用来触发 actionCreator
//   getBannerList () {
//     // 本质上 调用 actionCreator 不需要加 ()
//     // 但是如果在调用 actionCreator 时 你传递了参数，就需要加()
//     dispatch(action.getBannerListAction)
//   },
//   getProList (params) {
//     dispatch(action.getProListAction(params))
//   }
// }))(Home)

export default connect(({ bannerList, proList }) => ({ bannerList, proList }),
(dispatch) => ({ 
  // dispatch 可以用来触发 actionCreator
  getBannerList () {
    // 本质上 调用 actionCreator 不需要加 ()
    // 但是如果在调用 actionCreator 时 你传递了参数，就需要加()
    dispatch(action.getBannerListAction) // dispatch 触发 actionCreator
  },
  getProList (params) {
    axios.get('http://121.89.205.189/api/pro/list', { params })
      .then(res => {
        dispatch({ // dispatch 触发reducer 改变状态
          type: 'UPDATE_PRO_LIST',
          payload: res.data.data
        })
      })
  }
}))(Home)
```

vue中的acitons可以触发别actions，那么actionCreator可以触发别的 actionCreator？ --- 作业



### **6 划分reducer**:

因为一个应用中只能有一个大的state，这样的话reducer中的代码将会特别特别的多，那么就可以使用combineReducers方法将已经分开的reducer合并到一起

> 注意：
>
> 1. 分离reducer的时候，每一个reducer维护的状态都应该不同
> 2. 通过store.getState获取到的数据也是会按照reducers去划分的
> 3. 划分多个reducer的时候，默认状态只能创建在reducer中，因为划分reducer的目的，就是为了让每一个reducer都去独立管理一部分状态

Src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store= { store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)


```

Src/App.jsx

```jsx
import React, { Component } from 'react'
import Home from './Home.jsx'
import Cart from './Cart.jsx'
import User from './User.jsx'
export default class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <hr />
        <Cart />
        <hr />
        <User />
      </div>
    )
  }
}

```

Src/Home.jsx

```jsx
import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Home

```

Src/Cart.jsx

```jsx
import React, { Component } from 'react'

class Cart extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Cart
```



Src/User.jsx

```jsx
import React, { Component } from 'react'

class User extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default User
```

Src/store/index.js

```js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import home from './modules/home'
import cart from './modules/cart'
import user from './modules/user'

const reducer = combineReducers({
  home,
  cart,
  user
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store
```

Src/strore/modules/home.js

```jsx
const home = (state = {
  bannerList: [],
  proList: []
}, action) => {
  switch (action.type) {
    case 'UPDATA_BANNER_LIST':
      return { ...state, bannerList: action.payload }
    case 'UPDATA_PRO_LIST':
      return { ...state, proList: action.payload }
    default:
      return state
  }
}

export default home
```

Src/store/modules/user.js

```jsx
const user = (state = {
  isLogin: false,
  userid: '',
  token: ''
}, action) => {
  switch (action.type) {
    case 'UPDATA_ISLOGIN':
      return { ...state, isLogin: action.payload }
    case 'UPDATA_USERID':
      return { ...state, userid: action.payload }
    case 'UPDATA_TOKEN':
      return { ...state, token: action.payload }
    default:
      return state
  }
}

export default user
```

Src/store/modules/cart.js

```js
const cart = (state = {
  cartList: []
}, action) => {
  switch (action.type) {
    case 'UPDATA_CART_LIST':
      return { ...state, cartList: action.payload }
    default:
      return state
  }
}

export default cart
```



Src/store/actions/home.js

```js
import axios from 'axios'

const action = {
  getBannerListAction (dispatch) {
    console.log(2)
    axios.get('http://121.89.205.189/api/banner/list')
      .then(res => {
        console.log(3, res.data.data)
        dispatch({
          type: 'UPDATA_BANNER_LIST',
          payload: res.data.data
        })
      })
  },
  getProListAction (params) {
    return (dispatch) => {
      axios.get('http://121.89.205.189/api/pro/list', { params })
      .then(res => {
        dispatch({
          type: 'UPDATA_PRO_LIST',
          payload: res.data.data
        })
      })
    }
  }
}

export default action
```

Src/Home.jsx 渲染

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import action from './store/actions/home'
class Home extends Component {
  componentDidMount () {
    this.props.getBannerList()
    this.props.getProList({ limitNum: 1 })
  }
  render() {
    console.log(this.props)
    const { bannerList, proList } = this.props
    return (
      <div>
        home
        <ul>
          {
            bannerList && bannerList.map((item, index) => (
              <li key = { index }>
                <img style={{ width: 100 }} src={ item.img } alt={ item.alt }/>
              </li>
            ))
          }
        </ul>
        <ul>
          {
            proList && proList.map((item, index) => (
              <li key = { index }>
                { item.proname }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

// export default connect((state) => {
//   console.log(state)
//   return {
//     bannerList: state.home.bannerList,
//     proList: state.home.proList
//   }
// }, (dispatch) => {
//   return {
//     getBannerList () {
//       console.log(1)
//       dispatch(action.getBannerListAction)
//     },
//     getProList (params) {
//       dispatch(action.getProListAction(params))
//     }
//   }
// })(Home)
export default connect(({ home: { bannerList, proList } }) => ({ bannerList, proList }),
 (dispatch) => {
  return {
    getBannerList () {
      console.log(1)
      dispatch(action.getBannerListAction)
    },
    getProList (params) {
      dispatch(action.getProListAction(params))
    }
  }
})(Home)

// const obj = {
//   a: {
//     b: {
//       c: 10
//     }
//   }
// }

// const c = obj.a.b.c
// const {c} = obj.a.b
// const { b: {c}} = obj.a
// const { a: { b: {c} }} = obj

```



常见的异步库：

- Redux-thunk
- Redux-saga
- Redux-effects
- Redux-side-effects
- Redux-loop
- Redux-observable
- …

基于Promise的异步库：

- Redux-promise
- Redux-promises
- Redux-simple-promise
- Redux-promise-middleware
- …





# 十六、React Router

https://reactrouter.com/web/api/Hooks/useparams

React Router现在的版本是5, 于2019年3月21日搞笑的发布，[搞笑的官网链接](<https://reacttraining.com/blog/react-router-v5/>)， 本来是要发布4.4的版本的，结果成了5。从4开始，使用方式相对于之前版本的思想有所不同。之前版本的思想是传统的思想：**路由应该统一在一处渲染**， Router 4之后是这样的思想：**一切皆组件**

React Router包含了四个包:

| 包名                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`react-router`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router) | React Router核心api                                          |
| [`react-router-dom`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom) | React Router的DOM绑定，在浏览器中运行不需要额外安装`react-router` |
| [`react-router-native`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-native) | [React Native](https://facebook.github.io/react-native/) 中使用，而实际的应用中，其实不会使用这个。 |
| [`react-router-config`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config) | 静态路由的配置                                               |

主要使用`react-router-dom`

Src/App.jsx

```jsx
import React, { Component } from 'react'
import './style.css'
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="tip">请将屏幕竖向浏览</div>
        <div className="box">
          <header className="header">
            <ul>
              <li>左</li>
              <li>中</li>
              <li>右</li>
            </ul>
          </header>
          <div className="content"></div>
        </div>
        <footer className="footer">
          <ul>
            <li>
              <span className="iconfont icon-shouye"></span>
              <p>首页</p>
            </li>
            <li>
              <span className="iconfont icon-leimupinleifenleileibie"></span>
              <p>分类</p>
            </li>
            <li>
              <span className="iconfont icon-shopping-cart"></span>
              <p>购物车</p>
            </li>
            <li>
              <span className="iconfont icon-wode"></span>
              <p>我的</p>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
}

```

Src/style.css

```css
* { padding: 0; margin: 0; text-decoration: none; list-style: none;}
html, body, #root, .container { width: 100%; height: 100%;}
/* 如果所有的平台都一样，建议使用 100px 布局 */
/* html { font-size: 100px; } */
/* vw布局
  iphone 6/7/8 设备像素比 750 * 1334 屏幕宽度 375 * 667
    100 / 375 * 100 
    100 / 375 100等分375份
    * 100 为了好计算
    如果写 26.6666667vw，代表就是 在 iphone 6/7/8下 1rem = 100px
  iphone 5 设备像素比 640 * 1136 屏幕宽度 320 * 568
    如果写 31.25vw 代表就是 在 iphone 5下 1rem = 100px
  以iphone6 为例  750个物理像素  375个css像素
  面试时其实想要听到的时 1个物理像素
*/
html { font-size: 26.66666667vw;}
@media (min-width: 960px) {
  html { font-size: 100px; }
}
body { font-size: 12px; }
.container {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.container .box {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.container .box .header{
  height: 0.44rem;
  background-color: #ff6666;
}
.container .box .header ul { display: flex;height: 100%;}
.container .box .header ul li{ 
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.container .box .header ul li:nth-child(1){ width: 50px;}
.container .box .header ul li:nth-child(2){ flex: 1}
.container .box .header ul li:nth-child(3){ width: 50px;}
.container .box .content{
  flex: 1;
  overflow: auto;
}
.container .footer {
  height: 0.5rem;
  background-color: #efefef;
}
.container .footer ul { width: 100%; height: 100%; display: flex;}
.container .footer ul li { 
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container .footer ul li span {
  font-size: 0.24rem;
}
.tip {
  position: fixed;
  top: 0;
  left:0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* portrait 竖屏  landscape 横屏*/
@media (orientation: landscape) {
  .tip {
    display: flex;
  }
}
```

Public/index.html

```html
<link rel="stylesheet" href="//at.alicdn.com/t/font_2686183_r6i7f4ncqkp.css">
```



## 1、使用方式

正常情况下，直接按照[官网](<https://reacttraining.com/react-router/web/guides/quick-start>)的demo就理解 路由的使用方式，有几个点需要特别的强调：

- Route组件的exact属性

`exact`属性标识是否为严格匹配， 为`true`是表示严格匹配，为`false`时为正常匹配。

- Route组件的render属性而不是component属性

怎么在渲染组件的时候，对组件传递属性呢？使用`component`的方式是不能直接在组件上添加属性的。所以，React Router的`Route`组件提供了另一种渲染组件的方式 `render`, 这个常用于页面组件级别的权限管理。

- 路由的参数传递与获取

- Switch组件

总是渲染第一个匹配到的组件

- 处理404与默认页

- withRoute高阶组件的使用
- 管理一个项目路由的方法
- [code spliting](<https://reacttraining.com/react-router/web/guides/code-splitting>)
- HashRouter和BrowserRouter的区别，前端路由和后端路由的区别。



## 2、React Router基本原理

React Router甚至大部分的前端路由都是依赖于[`history.js`](<https://github.com/browserstate/history.js>)的，它是一个独立的第三方js库。可以用来兼容在不同浏览器、不同环境下对历史记录的管理，拥有统一的API。

- 老浏览器的history: 通过`hash`来存储在不同状态下的`history`信息，对应`createHashHistory`，通过检测`location.hash`的值的变化，使用`location.replace`方法来实现url跳转。通过注册监听`window`对象上的`hashChange`事件来监听路由的变化，实现历史记录的回退。
- 高版本浏览器: 利用HTML5里面的history，对应`createBrowserHistory`, 使用包括`pushState`， `replaceState`方法来进行跳转。通过注册监听`window`对象上的`popstate`事件来监听路由的变化，实现历史记录的回退。
- node环境下: 在内存中进行历史记录的存储，对应`createMemoryHistory`。直接在内存里`push`和`pop`状态。

构建基本的页面

s r c/views/home/index.jsx

```jsx
import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          home
        </div>
      </div>
    )
  }
}
export default Home

```

src/views/kind/index.jsx

```jsx
import React, { Component } from 'react'

class Kind extends Component {
  render() {
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          kind
        </div>
      </div>
    )
  }
}
export default Kind

```

Src/views/cart.jsx

```jsx
import React, { Component } from 'react'

class Cart extends Component {
  render() {
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          cart
        </div>
      </div>
    )
  }
}
export default Cart

```

Src/views/user.jsx

```jsx
import React, { Component } from 'react'

class User extends Component {
  render() {
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          user
        </div>
      </div>
    )
  }
}
export default User

```



### 2.1 基本路由信息以及重定向

```jsx
import React, { Component } from 'react'
// HashRouter 重新起名字为 Router   BrowserRouter 不带#（vue history）  HashRouter 带有#(vue hash)
// Switch 多个中选一个 同时只能满足1个路由
// Route 代表1个路由
// Router 只能出现1次，一般放在顶级组件中
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './style.css'
import Home from './views/home/index'
import Kind from './views/kind/index'
import Cart from './views/cart/index'
import User from './views/user/index'
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="tip">请将屏幕竖向浏览</div>
          {/* 定义路由规则 -- react - 一切皆组件 */}
          <Switch>
            {/* react 三种定义路由的方式 */}
            {/* component 属性的方式 */}
            <Route path = "/home" component = { Home } />
            {/* children 方式 */}
            <Route path = "kind">
              <Kind />
            </Route>
            {/* render 函数方式 */}
            <Route path = "/cart" render = { () => {
              return <Cart />
            }} />
            <Route path="user" component = { User } />
          </Switch>
          <footer className="footer">
            <ul>
              <li>
                <span className="iconfont icon-shouye"></span>
                <p>首页</p>
              </li>
              <li>
                <span className="iconfont icon-leimupinleifenleileibie"></span>
                <p>分类</p>
              </li>
              <li>
                <span className="iconfont icon-shopping-cart"></span>
                <p>购物车</p>
              </li>
              <li>
                <span className="iconfont icon-wode"></span>
                <p>我的</p>
              </li>
            </ul>
          </footer>
        </div>
      </Router>
      
    )
  }
}

```

> 思考： 路由的定义有三种方式，如何知道什么时候使用哪一种方式？三种定义路由的方式有什么区别
>
> 通过 js 跳转 --- 编程式跳转的方式进一步说明 --- 在页面中 打印 this.props 观察

|          | 打印this.props  | 直接使用编程式跳转 |
| -------- | --------------- | ------------------ |
| Compoent | { history: {} } | 可以               |
| Children | {}              | 不可以             |
| Render   | {}              | 不可以             |

> 如何在children以及render 定义路由时使用 编程式跳转

### 2.2 编程时跳转

react 通过 props.history 对象完成 页面 的跳转

withRouter 包裹组件可以让组件拥有  props.history 对象

Src/views/kind/index.jsx

```jsx
import React, { Component } from 'react'
// withRouter 高阶组件
import { withRouter } from 'react-router-dom'
class Kind extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          kind
        </div>
      </div>
    )
  }
}
export default withRouter(Kind)

```

Src/views/cart/index.jsx

```jsx
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
class Cart extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          cart
        </div>
      </div>
    )
  }
}
export default withRouter(Cart)

```

> 使用with R ou te r 高阶组件可以给组件的props属性添加路由的信息
>
> 每次都得通过输入框输入路由跳转页面，需要用户点击底部选项卡跳转

### 2.3 底部选项卡跳转页面

> React 路由中 有两种方式可以完成 声明式跳转。Link    NavLink
>
> NavLink 可以设定选中的样式

```jsx
import React, { Component } from 'react'
// HashRouter 重新起名字为 Router   BrowserRouter 不带#（vue history）  HashRouter 带有#(vue hash)
// Switch 多个中选一个 同时只能满足1个路由
// Route 代表1个路由
// Router 只能出现1次，一般放在顶级组件中
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import './style.css'
import Home from './views/home/index'
import Kind from './views/kind/index'
import Cart from './views/cart/index'
import User from './views/user/index'
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="tip">请将屏幕竖向浏览</div>
          {/* 定义路由规则 -- react - 一切皆组件 -- 所见即所得 */}
          <Switch>
            {/* react 三种定义路由的方式 */}
            {/* component 属性的方式 */}
            <Route path = "/home" component = { Home } />
            {/* children 方式 */}
            <Route path = "/kind">
              <Kind />
            </Route>
            {/* render 函数方式 */}
            <Route path = "/cart" render = { () => {
              return <Cart />
            }} />
            <Route path="/user" component = { User } />
          </Switch>
          <footer className="footer">
            <ul>
              {/* 
                声明式导航跳转
                vue router-link tag
                react Link  NavLink 没有tag属性  ---- 渲染为a标签
                记得修改样式表
              */}
              <NavLink to = "/home">
                <span className="iconfont icon-shouye"></span>
                <p>首页</p>
              </NavLink>
              <NavLink to = "/kind">
                <span className="iconfont icon-leimupinleifenleileibie"></span>
                <p>分类</p>
              </NavLink>
              <NavLink to = "/cart">
                <span className="iconfont icon-shopping-cart"></span>
                <p>购物车</p>
              </NavLink>
              <NavLink to = "/user">
                <span className="iconfont icon-wode"></span>
                <p>我的</p>
              </NavLink>
            </ul>
          </footer>
        </div>
      </Router>
      
    )
  }
}

```

```css
* { padding: 0; margin: 0; text-decoration: none; list-style: none;}
html, body, #root, .container { width: 100%; height: 100%;}
/* 如果所有的平台都一样，建议使用 100px 布局 */
/* html { font-size: 100px; } */
/* vw布局
  iphone 6/7/8 设备像素比 750 * 1334 屏幕宽度 375 * 667
    100 / 375 * 100 
    100 / 375 100等分375份
    * 100 为了好计算
    如果写 26.6666667vw，代表就是 在 iphone 6/7/8下 1rem = 100px
  iphone 5 设备像素比 640 * 1136 屏幕宽度 320 * 568
    如果写 31.25vw 代表就是 在 iphone 5下 1rem = 100px
  以iphone6 为例  750个物理像素  375个css像素
  面试时其实想要听到的时 1个物理像素
*/
html { font-size: 26.66666667vw;}
@media (min-width: 960px) {
  html { font-size: 100px; }
}
body { font-size: 12px; }
.container {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.container .box {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.container .box .header{
  height: 0.44rem;
  background-color: #ff6666;
}
.container .box .header ul { display: flex;height: 100%;}
.container .box .header ul li{ 
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.container .box .header ul li:nth-child(1){ width: 50px;}
.container .box .header ul li:nth-child(2){ flex: 1}
.container .box .header ul li:nth-child(3){ width: 50px;}
.container .box .content{
  flex: 1;
  overflow: auto;
}
.container .footer {
  height: 0.5rem;
  background-color: #efefef;
}
.container .footer ul { width: 100%; height: 100%; display: flex;}
.container .footer ul a {  // ***************
  display: block;
  color: #333;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container .footer ul a.active {// ***************
  color: #f66;
}
.container .footer ul a span {// ***************
  font-size: 0.24rem;
}
.tip {
  position: fixed;
  top: 0;
  left:0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* portrait 竖屏  landscape 横屏*/
@media (orientation: landscape) {
  .tip {
    display: flex;
  }
}
```



### 2.4 动态参数传递

> 点击列表进入产品的详情

s r c/views/detail/index.js

```jsx
import React, { Component } from 'react'

class Detail extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          详情
        </div>
      </div>
    )
  }
}
export default Detail

```

定义详情的路由规则

s r c/App.jsx

```jsx
import React, { Component } from 'react'
// HashRouter 重新起名字为 Router   BrowserRouter 不带#（vue history）  HashRouter 带有#(vue hash)
// Switch 多个中选一个 同时只能满足1个路由
// Route 代表1个路由
// Router 只能出现1次，一般放在顶级组件中
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import './style.css'
import Home from './views/home/index'
import Kind from './views/kind/index'
import Cart from './views/cart/index'
import User from './views/user/index'
import Detail from './views/detail'
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="tip">请将屏幕竖向浏览</div>
          {/* 定义路由规则 -- react - 一切皆组件 -- 所见即所得 */}
          <Switch>
            {/* react 三种定义路由的方式 */}
            {/* component 属性的方式 */}
            <Route path = "/home" component = { Home } />
            {/* children 方式 */}
            <Route path = "/kind">
              <Kind />
            </Route>
            {/* render 函数方式 */}
            <Route path = "/cart" render = { () => {
              return <Cart />
            }} />
            <Route path="/user" component = { User } />
            <Route path="/detail/:proid" component = { Detail } />
          </Switch>
          <footer className="footer">
            <ul>
              {/* 
                声明式导航跳转
                vue router-link tag
                react Link  NavLink 没有tag属性  ---- 渲染为a标签
                记得修改样式表
              */}
              <NavLink to = "/home">
                <span className="iconfont icon-shouye"></span>
                <p>首页</p>
              </NavLink>
              <NavLink to = "/kind">
                <span className="iconfont icon-leimupinleifenleileibie"></span>
                <p>分类</p>
              </NavLink>
              <NavLink to = "/cart">
                <span className="iconfont icon-shopping-cart"></span>
                <p>购物车</p>
              </NavLink>
              <NavLink to = "/user">
                <span className="iconfont icon-wode"></span>
                <p>我的</p>
              </NavLink>
            </ul>
          </footer>
        </div>
      </Router>
      
    )
  }
}

```

Src/views/kind/index.jsx

```jsx
import React, { Component } from 'react'
// withRouter 高阶组件
import { withRouter } from 'react-router-dom'
class Kind extends Component {
  toDetial (proid) {
    this.props.history.push('/detail/' + proid)
  }
  render() {
    console.log(this.props)
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          <ul>
            <li onClick = { this.toDetial.bind(this, 1)}>1</li>
            <li onClick = { this.toDetial.bind(this, 2)}>2</li>
            <li onClick = { this.toDetial.bind(this, 3)}>3</li>
            <li onClick = { this.toDetial.bind(this, 4)}>4</li>
            <li onClick = { this.toDetial.bind(this, 5)}>5</li>
            <li onClick = { this.toDetial.bind(this, 6)}>6</li>
            <li onClick = { this.toDetial.bind(this, 7)}>7</li>
            <li onClick = { this.toDetial.bind(this, 8)}>8</li>
            <li onClick = { this.toDetial.bind(this, 9)}>9</li>
            <li onClick = { this.toDetial.bind(this, 10)}>10</li>
          </ul>
        </div>
      </div>
    )
  }
}
export default withRouter(Kind)

```

> 点击查看地址栏的变化
>
> 一般在详情页面需要获取 proid 的数据

Src/views/detail/index.jsx

```jsx
import React, { Component } from 'react'

class Detail extends Component {
  state = {
    proid: ''
  }
  componentDidMount () {
    this.setState({
      proid: this.props.match.params.proid
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className="box">
        <header className="header">
          <ul>
            <li>左</li>
            <li>中</li>
            <li>右</li>
          </ul>
        </header>
        <div className="content">
          详情 - { this.state.proid }
        </div>
      </div>
    )
  }
}
export default Detail

```

### 2.5 封装axios

> cpm i axios -S

Src/utils/request.js

```js
// http://www.axios-js.com/zh-cn/docs/
import axios from 'axios'
import router from './../router'
import store from './../store'
// 开发环境 yarn serve
// 生产环境 yarn build
// development  production
const isDev = process.env.NODE_ENV === 'development'

// 创建axios实例
// http://www.axios-js.com/zh-cn/docs/#axios-create-config
const request = axios.create({
  // baseUrl 实际请求的地址是 baseURL + 请求地址
  // http://121.89.205.189/api/banner/list  ===》 baseURL + '/banner/list'
  // baseURL: 'http://121.89.205.189/api',
  // 项目上线时无需修改baseURL地址 ---- 需要提前知道线上接口的地址
  // baseURL: isDev ? 'http://121.89.205.189/api' : 'http://121.89.205.189/api',
  // 如果使用了 代理 解决跨域问题
  baseURL: isDev ? 'http://121.89.205.189/api' : 'http://121.89.205.189/api',
  timeout: 6000 // 网络超时时间
})

// axios 的拦截器
// http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8
// 请求拦截器 ---- 所有的数据在请求之前都会执行的代码 --- 显示loading的动画效果/给接口添加token
request.interceptors.request.use((config) => {
  // 在请求之前做些什么
  // 给所有的请求都传递token信息
  config.headers.common.token = localStorage.getItem('token') || ''
  return config
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截器 ---- 在拿到接口的数据之前都会执行的代码 --- 隐藏loading的动画效果/验证token
request.interceptors.response.use((response) => {
  // 在响应时做些什么
  // token 没有传递  token 传递了只不过是错误的  token 传递了 失效了
  if (response.data.code === '10119') {
    console.log(111111111)
    // 引入路由器，跳转到登录页面
    if (store.state.user.isLogin) {
      router.push('/login')
    }
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

// 暴露自定义的axios
export default request

```

复制vue项目中的api文件夹

### 2.6配置移动端的UI库

And-mobile  https://mobile.ant.design/index-cn

> cnpm i antd-mobile -S

> 说明移动端点击穿透的理解，或者是说一说300ms的故事
>
> ​		使用touch事件代替click事件，使用tap事件代替click事件，使用fastclick事件代替 click事件（推荐）

入口页面 (html 或 模板) 相关设置：

> 引入 [FastClick](https://github.com/ftlabs/fastclick) 并且设置 html `meta` (更多参考 [#576](https://github.com/ant-design/ant-design-mobile/issues/576))
>
> 引入 Promise 的 fallback 支持 (部分安卓手机不支持 Promise)
>
> 
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
>   <head>
>     <meta charset="utf-8" />
>     <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
>     <!-- <meta name="viewport" content="width=device-width, initial-scale=1" /> -->
>     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
>     <meta name="theme-color" content="#000000" />
>     <meta
>       name="description"
>       content="Web site created using create-react-app"
>     />
>     <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
>     <!--
>       manifest.json provides metadata used when your web app is installed on a
>       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
>     -->
>     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
>     <!--
>       Notice the use of %PUBLIC_URL% in the tags above.
>       It will be replaced with the URL of the `public` folder during the build.
>       Only files inside the `public` folder can be referenced from the HTML.
> 
>       Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
>       work correctly both with client-side routing and a non-root public URL.
>       Learn how to configure a non-root public URL by running `npm run build`.
>     -->
>     <title>React App</title>
>     <link rel="stylesheet" href="//at.alicdn.com/t/font_2537050_81bsqahoves.css">
>     <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
>   <script>
>     if ('addEventListener' in document) {
>       document.addEventListener('DOMContentLoaded', function() {
>         FastClick.attach(document.body);
>       }, false);
>     }
>     if(!window.Promise) {
>       document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
>     }
>   </script>
>   </head>
>   <body>
>     <noscript>You need to enable JavaScript to run this app.</noscript>
>     <div id="root"></div>
>     <!--
>       This HTML file is a template.
>       If you open it directly in the browser, you will see an empty page.
> 
>       You can add webfonts, meta tags, or analytics to this file.
>       The build step will place the bundled scripts into the <body> tag.
> 
>       To begin the development, run `npm start` or `yarn start`.
>       To create a production bundle, use `npm run build` or `yarn build`.
>     -->
>   </body>
> </html>
> 
> ```

**按需加载**

> cnpm install react-app-rewired customize-cra --save-dev



修改package.json

```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

在项目根目录创建一个 config-overrides.js 用于修改默认配置。

```
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

- 使用 babel-plugin-import, [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件（[原理](https://ant.design/docs/react/getting-started-cn#按需加载)），现在我们尝试安装它并修改 config-overrides.js 文件。

> cnpm install babel-plugin-import --save-dev

```
const { override, fixBabelImports } = require('customize-cra'); 
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
);
```

> cnpm run start

### 2.7 封装数据请求

s r c/api/home.js

```

```

### 2.8 构建状态管理器

```js

```

### 2.9 创建reducer

s r c/views/home/reducer.js

```
export const home = (state = {
  bannerList: [],
  proList: []
}, action) => {
  switch (action.type) {
    case 'CHANGE_BANNER_LIST':
      return { ...state, bannerList: action.payload }
    case 'CHANGE_PRO_LIST':
      return { ...state, proList: action.payload }
    default:
      return state
  }
}
```

### 2.10 创建actionCreator

Src/views/home/action.js

```
import { getBannerList, getProList } from './../../api/home'
const action = {
  getBannerListAction (dispatch) {
    getBannerList().then(res => {
      dispatch({
        type: 'CHANGE_BANNER_LIST',
        payload: res.data.data
      })
    })
  },
  getProListAction (params) {
    return (dispatch) => {
      getProList(params).then(res => {
        dispatch({
          type: 'CHANGE_PRO_LIST',
          payload: res.data.data
        })
      })
    }
  }
}

export default action
```

### 2.11 创建状态管理器

```
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { home } from './../views/home/reducer'

const reducer = combineReducers({
  home
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
```

### 2.12 入口文件处引入状态管理器

```
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store'

ReactDOM.render(
  <StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
```

### 2.13 页面使用状态管理器

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import action from './action'
import { Carousel } from 'antd-mobile'
import { Link } from 'react-router-dom'
class Home extends Component {
  componentDidMount() {
    this.props.getBannerList()
    this.props.getProList()
  }
  render() {
    console.log(this.props)
    return (
      <div className="box">
          <header className="header">
            <ul>
              <li>左</li>
              <li>首页</li>
              <li></li>
            </ul>
          </header>
          <div className="content">
          <Carousel
            autoplay={true}
            infinite
            >
              {this.props.bannerList.map(item => (
                <a
                  key={item.bannerid}
                  href={ item.href }
                  style={{ display: 'inline-block', width: '100%', height: 176 }}
                >
                  <img
                    src={ item.img }
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                    }}
                  />
                </a>
              ))}
            </Carousel>

            <ul>
              {
                this.props.proList.map(item => {
                  return (
                  <div key = { item.proid }>
                    <Link to={ '/detail/' + item.proid } > { item.proname }</Link>
                  </div>
                  )
                })
              }
            </ul>
          </div>
        </div>
    )
  }
}

export default  connect((state) => {
  return {
    bannerList: state.home.bannerList,
    proList: state.home.proList
  }
}, (dispatch) => {
  return {
    getBannerList () {
      dispatch(action.getBannerListAction)
    },
    getProList () {
      dispatch(action.getProListAction( { limitNum: 20 } ))
    }
  }
})(Home)
```



# 十七、Immutable.js 

暂时不讲

## 1、JavaScript数据修改的问题

看一段大家熟悉的代码

```js
const state = {
  str: '千锋教育',
  obj: {
    y: 1
  },
  arr: [1, 2, 3]
}
const newState = state

console.log(newState === state) // true
```

由于js的对象和数组都是引用类型。所以newState的state实际上是指向于同一块内存地址的, 所以结果是newState和state是相等的。

尝试修改一下数据

```js
const state = {
  str: '千锋教育',
  obj: {
    y: 1
  },
  arr: [1, 2, 3]
}
const newState = state

newState.str = '千锋教育H5学院'

console.log(state.str, newState.str)
```

可以看到，newState的修改也会引起state的修改。要解决这个问题，js中提供了另一种修改数据的方式，要修改一个数据之前先制作一份数据的拷贝，像这样

```js
const state = {
  str: '千锋教育',
  obj: {
    y: 1
  },
  arr: [1, 2, 3]
}
const newState = Object.assign({}, state)

newState.str = '千锋教育H5学院'

console.log(state.str, newState.str)
```

我们可以使用很多方式在js中复制数据，比如`…`,  `Object.assign`, `Object.freeze`, `slice`, `concat`, `map`, `filter`,  `reduce`等方式进行复制，但这些都是浅拷贝，就是只拷贝第一层数据，更深层的数据还是同一个引用，比如：

```js
const state = {
  str: '千锋教育',
  obj: {
    y: 1
  },
  arr: [1, 2, 3]
}
const newState = Object.assign({}, state)

newState.obj.y = 2
newState.arr.push(4)

console.log(state, newState)
```

可以看到，当在更改newState更深层次的数据的时候，还是会影响到state的值。如果要深层复制，就得一层一层的做递归拷贝，这是一个复杂的问题。虽然有些第三方的库已经帮我们做好了，比如`lodash`的`cloneDeep`方法。深拷贝是非常消耗性能的。

```js
import { cloneDeep } from 'lodash'

const state = {
  str: '千锋教育',
  obj: {
    y: 1
  },
  arr: [1, 2, 3]
}
const newState = cloneDeep(state)

newState.obj.y = 2
newState.arr.push(4)

console.log(state, newState)
```



## 2、什么是不可变数据

不可变数据 (Immutable Data )就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是持久化数据结构（ Persistent Data Structure），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 结构共享（Structural Sharing），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

## 3、immutable.js的优缺点

**优点：**

- 降低mutable带来的复杂度
- 节省内存
- 历史追溯性（时间旅行）：时间旅行指的是，每时每刻的值都被保留了，想回退到哪一步只要简单的将数据取出就行，想一下如果现在页面有个撤销的操作，撤销前的数据被保留了，只需要取出就行，这个特性在redux或者flux中特别有用
- 拥抱函数式编程：immutable本来就是函数式编程的概念，纯函数式编程的特点就是，只要输入一致，输出必然一致，相比于面向对象，这样开发组件和调试更方便。推荐一本函数式编程的在线免费书《[JS 函数式编程指南](<https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/>)》。

**缺点：**

- 需要重新学习api
- 资源包大小增加（源码5000行左右）
- 容易与原生对象混淆：由于api与原生不同，混用的话容易出错。



## 4、使用Immutable.js

**01-get-started**

```javascript
const { Map } = require('immutable')
const map1 = Map({
  a: 1,
  b: 2,
  c: 3
})

const map2 = map1.set('b', 50)
console.log(map1.get('b') + ' vs. ' + map2.get('b'))

*// 2 vs. 50*
```



**02-case-for-immutability-1.js**

```javascript
const { Map } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3})
const map2 = Map({ a: 1, b: 2, c: 3})

console.log(map1.equals(map2))
console.log(map1 == map2)
console.log(map1 === map2)

// true
// false
// false
```



**02-case-for-immutability-2.js**

```javascript
const { Map } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3})
const map2 = map1.set('b', 2)

console.log(map1.equals(map2))
console.log(map1 == map2)
console.log(map1 === map2)

// true
// true
// true
```



**02-case-for-immutability-3.js**

```javascript

const { Map } = require('immutable')
const map = Map({ a: 1, b: 2, c: 3})
const mapCopy = map

console.log(mapCopy.equals(map))

// true
```



**03-JavaScript-first-API-0.js**

```javascript
const { List } = require('immutable')

const list1 = List([1, 2])
const list2 = list1.push(3, 4, 5)
const list3 = list2.unshift(0)
const list4 = list1.concat(list2, list3)

console.log(list1.size === 2)
console.log(list2.size === 5)
console.log(list3.size === 6)
console.log(list4.size === 13)

// true
// true
// true
// true
```



**03-JavaScript-first-API-1.js**

```javascript
const { Map } = require('immutable')
const alpha = Map({ a: 1, b: 2, c: 3, d: 4 })
const upperCase = alpha.map((v, k) => k.toUpperCase()).join()

console.log(upperCase)
// A,B,C,D
```



**03-JavaScript-first-API-2.js**

```javascript
const { Map, List } = require('immutable');

const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
const map2 = Map({ c: 10, a: 20, t: 30 });

const obj = { d: 100, o: 200, g: 300 };
const map3 = map1.merge(map2, obj)

console.log(map3)

// Map { "a": 20, "b": 2, "c": 10, "d": 100, "t": 30, "o": 200, "g": 300 }

const list1 = List([ 1, 2, 3 ]);
const list2 = List([ 4, 5, 6 ]);

const array = [ 7, 8, 9 ];
const list3 = list1.concat(list2, array);

console.log(list3)

// List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```



**03-JavaScript-first-API-3.js**

```javascript
const { Seq } = require('immutable')

const myObject = {a: 1, b: 2, c: 3}
const seq = Seq(myObject).map(v => v * v)

const seqToObject = seq.toObject()
console.log(seq, seqToObject)

// Seq { "a": 1, "b": 4, "c": 9 } { a: 1, b: 4, c: 9 }
```



**03-JavaScript-first-API-4.js**

```javascript
const { fromJS } = require('immutable')

const obj = { 1: 'one' }
console.log(Object.keys(obj)) *// [ '1' ]*
console.log(obj['1'], obj[1]) *// one one*

const map = fromJS(obj)
console.log(map.get('1'), map.get(1)) *// one undefined*
```



**03-JavaScript-first-API-5.js**

```javascript
const { Map, List } = require('immutable')

const deep = Map({ a: 1, b: 2, c: List([ 3, 4, 5 ]) })
console.log(deep.toObject())
console.log(deep.toArray())
console.log(deep.toJS())
console.log(JSON.stringify(deep))

// { a: 1, b: 2, c: List [ 3, 4, 5 ] }
// [ 1, 2, List [ 3, 4, 5 ] ]
// { a: 1, b: 2, c: [ 3, 4, 5 ] }
// {"a":1,"b":2,"c":[3,4,5]}
```



**03-JavaScript-first-API-6.js**

```javascript
const { Map, List } = require('immutable')

const mapped = Map({ a: 1, b: 2, c: 3 })
console.log(mapped.map(x => x * x))
console.log(mapped.map(function (x) {
  return x * x
}))

// Map { "a": 1, "b": 4, "c": 9 }
// Map { "a": 1, "b": 4, "c": 9 }

const aList = List([ 1, 2, 3 ])
const anArray = [ 0, ...aList, 4, 5 ]
console.log(anArray)

// [ 0, 1, 2, 3, 4, 5 ]
```



**04-nested-structures.js**

```javascript
const { fromJS } = require('immutable')

const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } })
console.log(nested)
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ] } } }

const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } })
console.log(nested2)
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ], "d": 6 } } }*

console.log(nested2.getIn([ 'a', 'b', 'd' ]))
// 6

const nested3 = nested2.updateIn([ 'a', 'b', 'd' ], value => value + 1)
console.log(nested3)
// Map { "a": Map { "b": Map { "c": "List [ 3, 4, 5 ]1", "d": 7 } } }

// setIn 和 updateIn 都可以修改深层次的Immutable对象，setIn 直接传值，updateIn 传入回调函数
const nested4 = nested3.updateIn([ 'a', 'b', 'c' ], list => list.push(6))
console.log(nested4)
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5, 6 ], "d": 7 } } }

const nested5 = nested4.setIn(['a', 'b', 'd'], 90)

console.log(nested5)
console.log(nested)
console.log(nested2)
console.log(nested3)
console.log(nested4)

// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ] } } }
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ], "d": 6 } } }
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ], "d": 7 } } }
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5, 6 ], "d": 7 } } }
```



**05-Equality-treats-Collections-as-Values-0.js**

```javascript
const { Map, is } = require('immutable')

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { a: 1, b: 2, c: 3 };
console.log(obj1 !== obj2)
// true

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });

console.log(map1 !== map2)
console.log(map1.equals(map2))
console.log(is(map1, map2))

// true
// true
// true
```



**05-Equality-treats-Collections-as-Values-1.js**

```javascript
const { Map, Set } = require('immutable')

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });
const set = Set().add(map1)

console.log(set.has(map2))

// true
```



**05-Equality-treats-Collections-as-Values-2.js**

```javascript
const { Map } = require('immutable');

const originalMap = Map({ a: 1, b: 2, c: 3 });
const updatedMap = originalMap.set('b', 2);
console.log(updatedMap === originalMap)

// true
```



**05-Equality-treats-Collections-as-Values-3.js**

```javascript
const { Map, is } = require('immutable');

const originalMap = Map({ a: 1, b: 2, c: 3 });
const updatedMap = originalMap.set('b', 1000);
console.log(updatedMap !== originalMap)
// true

const anotherUpdatedMap = originalMap.set('b', 1000);
console.log(anotherUpdatedMap !== updatedMap)
console.log(anotherUpdatedMap.equals(updatedMap))
console.log(is(anotherUpdatedMap, updatedMap))
// true
// true
// true
```



**06-Batching-Mutations.js**

```javascript
const { List } = require('immutable');

const list1 = List([ 1, 2, 3 ]);
const list2 = list1.withMutations(function (list) {
  list.push(4).push(5).push(6);
});

console.log(list1.size === 3);
console.log(list2.size === 6);
// true
// true

let map2 = map1.withMutations((map) => {
   // 逻辑
   map.setIn(['c', 'd'], 9)
   map.set('a', 1)
})

let map3 = map1.updateIn(['c', 'd'], (v) => {
   return 9
})

console.log(map1 === map3)
```



**07-Lazy-Seq-0.js**

```javascript
const { Seq } = require('immutable');

const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
  .filter(x => {
		console.log('filter x:' + x)
		return x % 2 !== 0
  })
  .map(x => {
		console.log('map x:' + x)
		return x * x
  });

console.log(oddSquares.get(1))

// filter x:1
// filter x:2
// filter x:3
// map x:3

// 9
```



**07-Lazy-Seq-1.js**

```javascript
const { Seq, Map } = require('immutable');

const map = Map({ a: 1, b: 2, c: 3 });
const lazySeq = Seq(map);
const newMap = lazySeq
  .flip()
  .map(key => key.toUpperCase())
  .flip();

console.log(newMap)

// Seq { A: 1, B: 1, C: 1 }
```



**07-Lazy-Seq-2.js**

```javascript
const { Range } = require('immutable');

const aRange = Range(1, Infinity)
  .skip(1000)
  .map(n => -n)
  .filter(n => n % 2 === 0)
  .take(2)
  .reduce((r, n) => r * n, 1);
  
console.log(aRange)

// 1006008
```





## 5、在redux中使用immutable.js

[redux官网](<https://redux.js.org/recipes/using-immutablejs-with-redux>)推荐使用[redux-immutable](<https://www.npmjs.com/package/redux-immutable>)进行redux和immutable的集成。几个注意点：

`redux`中，利用`combineReducers`来合并多个`reducer`, `redux`自带的`combineReducers`只支持原生js形式的，所以需要使用`redux-immutable`提供的`combineReducers`来代替

src/store/module/home.js

```js
import { Map } from 'immutable'
const initState = Map({
  proList: [],
  bannerList: []
})
const reducerName = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_BANNER_LIST':
      // return Object.assign({}, state, { bannerList: action.payload })
      return state.set('bannerList', action.payload)
    case 'UPDATE_PRO_LIST':
      return state.set('proList', action.payload)
    default:
      return state
  }
}

export default reducerName
```

//src/store/index.js

```js
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'

import thunk from 'redux-thunk'

import home from './modules/home'

const reducer = combineReducers({
  home
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
```

src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store } >
      <App  />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

Store/actions/home.js

```js
import axios from 'axios'

const action = {
  getBannerListAction (dispatch) {
    axios.get('http://121.89.205.189/api/banner/list')
    .then(res => {
      dispatch({
        type: 'UPDATE_BANNER_LIST',
        payload: res.data.data
      })
    })
  },
  getProListAction (params) {
    return (dispatch) => {
      axios.get('http://121.89.205.189/api/pro/list', { params })
      .then(res => {
        dispatch({
          type: 'UPDATE_PRO_LIST',
          payload: res.data.data
        })
      })
    }
  }
}

export default action
```



App.js

```js
import React from 'react'
import { connect } from 'react-redux'
import action from './store/actions/home'
import { useMount } from 'ahooks'
function App(props) {
  useMount(() => {
    props.getBannerList()
    props.getProList()
  })
  return (
    <div>
      {
        props.bannerList.map(item => {
          return <img src={item.img} alt={item.alt} key={item.bannerid} />
        })
      }
      {
        props.proList.map(item => {
          return <div key={item.proid} >{ item.proname }</div>
        })
      }
    </div>
  )
}

export default connect(state => {
  return {
    bannerList: state.getIn(['home', 'bannerList']),
    proList: state.getIn(['home', 'proList'])
  }
}, (dispatch) => {
  return {
    getBannerList () {
      dispatch(action.getBannerListAction)
    },
    getProList () {
      dispatch(action.getProListAction())
    }
  }
})(App)

```

# 十八、Lazy 和 Suspense

> 需要配合使用

```jsx
import React, { Component } from 'react'
// HashRouter 重新起名字为 Router   BrowserRouter 不带#（vue history）  HashRouter 带有#(vue hash)
// Switch 多个中选一个 同时只能满足1个路由
// Route 代表1个路由
// Router 只能出现1次，一般放在顶级组件中
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import './style.css'
import Home from './views/home/index'
// import Kind from './views/kind/index'
// import Cart from './views/cart/index'
// import User from './views/user/index'
// import Detail from './views/detail'
// import NotFound from './views/404'
const Kind = React.lazy(() => import('./views/kind/index'))
const Cart = React.lazy(() => import('./views/cart/index'))
const User = React.lazy(() => import('./views/user/index'))
const Detail = React.lazy(() => import('./views/detail/index'))
const NotFound = React.lazy(() => import('./views/404/index'))
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="tip">请将屏幕竖向浏览</div>
          {/* 定义路由规则 -- react - 一切皆组件 -- 所见即所得 */}
          <React.Suspense fallback={<div>加载中....</div>}>
            <Switch>
              {/* react 三种定义路由的方式 */}
              {/* component 属性的方式 */}
              <Route path = "/home" component = { Home } />
              {/* children 方式 */}
              <Route path = "/kind">
                <Kind />
              </Route>
              {/* render 函数方式 */}
              <Route path = "/cart" render = { () => {
                return <Cart />
              }} />
              <Route path="/user" component = { User } />
              <Route path="/detail/:proid" component = { Detail } />
              <Redirect path="/" exact to="/home" />
              <Route component = { NotFound } />
            </Switch>
          </React.Suspense>
          <footer className="footer">
            <ul>
              {/* 
                声明式导航跳转
                vue router-link tag
                react Link  NavLink 没有tag属性  ---- 渲染为a标签
                记得修改样式表
              */}
              <NavLink to = "/home">
                <span className="iconfont icon-shouye"></span>
                <p>首页</p>
              </NavLink>
              <NavLink to = "/kind">
                <span className="iconfont icon-leimupinleifenleileibie"></span>
                <p>分类</p>
              </NavLink>
              <NavLink to = "/cart">
                <span className="iconfont icon-shopping-cart"></span>
                <p>购物车</p>
              </NavLink>
              <NavLink to = "/user">
                <span className="iconfont icon-wode"></span>
                <p>我的</p>
              </NavLink>
            </ul>
          </footer>
        </div>
      </Router>
      
    )
  }
}

```





## 1、React.lazy 定义

```
{
	path: '',
	name: '',
	component: () => import('*****.vue')
}
```



`React.lazy` 函数能让你像渲染常规组件一样处理动态引入（的组件）。

什么意思呢？其实就是懒加载。其原理就是利用`es6 import()`函数。这个`import`不是`import命令`。同样是引入模块，`import命令`是同步引入模块，而`import()`函数动态引入。

当 Webpack 解析到该语法时，它会自动地开始进行代码分割(Code Splitting)，分割成一个文件，当使用到这个文件的时候会这段代码才会被异步加载。

### (1) 为什么代码要分割

当你的程序越来越大，代码量越来越多。一个页面上堆积了很多功能，也许有些功能很可能都用不到，但是一样下载加载到页面上，所以这里面肯定有优化空间。就如图片懒加载的理论。

### (2) import函数

javascript

```javascript
//import 命令
import { add } from './math';

console.log(add(16, 26));

//import函数
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

> 动态 `import()` 语法目前只是一个 ECMAScript (JavaScript) 提案， 而不是正式的语法标准。预计在不远的将来就会被正式接受。http://es6.ruanyifeng.com/#docs/module#import



## 2、如何使用React.lazy

下面示例代码使用create-react-app脚手架搭建：

```jsx
//OtherCom.js 文件内容
import React, { Component } from 'react'

export default class OtherCom extends Component {
  componentDidMount () {
    console.log('1111')
  }
  render() {
    return (
      <div>
        异步加载的组件
      </div>
    )
  }
}



```

```jsx
import React, { Component } from 'react'
// import OtherCom from './OtherCom'
const OtherCom = React.lazy(() => import('./OtherCom'))
export default class App extends Component {
  render() {
    return (
      <div>
        <OtherCom />
      </div>
    )
  }
}

```



这是最简单的`React.lazy`，但是这样页面会报错。这个报错提示我们，在React使用了`lazy`之后，会存在一个加载中的空档期，React不知道在这个空档期中该显示什么内容，所以需要我们指定。接下来就要使用到`Suspense`。

![](proimg/lazy.png)



### (1) Suspense

如果在 `App` 渲染完成后，包含 `OtherComponent` 的模块还没有被加载完成，我们可以使用加载指示器为此组件做优雅降级。这里我们使用 `Suspense` 组件来解决。

这里将`App`组件改一改

```jsx
import React, { Component, Suspense } from 'react'
// import OtherCom from './OtherCom'
const OtherCom = React.lazy(() => import('./OtherCom'))
export default class App extends Component {
  state = { show: false }
  render() {
    return (
      <div>
        <button onClick = {() => {
          this.setState({
            show: !this.state.show
          })
        }}>显示切换</button>
        <Suspense fallback = { <div>加载中。。。。</div> }>
          {
            this.state.show ? <OtherCom /> : null
          }
        </Suspense>
      </div>
    )
  }
}
// 切换 newwork - > slow 3g

```



为了演示我把chrome网络调到slow 3g，不然看不到loading出现。

> 注意：`Suspense`使用的时候，`fallback`一定是存在且有内容的， 否则会报错。



# 十九、React Hooks

在 React 的世界中，有容器组件和 UI 组件之分，在 React Hooks 出现之前，UI 组件我们可以使用函数，无状态组件来展示 UI，而对于容器组件，函数组件就显得无能为力，我们依赖于类组件来获取数据，处理数据，并向下传递参数给 UI 组件进行渲染。在我看来，使用 React Hooks 相比于从前的类组件有以下几点好处：

1. 代码可读性更强，原本同一块功能的代码逻辑被拆分在了不同的生命周期函数中，容易使开发者不利于维护和迭代，通过 React Hooks 可以将功能代码聚合，方便阅读维护

   ```jsx
   import React, { Component } from 'react'
   
   export default class App extends Component {
     state = {
       bannerList: [], // 1111111111
       proList: [] // 22222222222
     }
   
     componentDidMount () {
       // 1111111111
       fetch('http://121.89.205.189/api/banner/list').then(res => res.json())
         .then(res => {
           this.setState({
             bannerList: res.data
           })
         })
       // 22222222222
       fetch('http://121.89.205.189/api/pro/list').then(res => res.json())
         .then(res => {
           this.setState({
             proList: res.data
           })
         })
     }
     render() {
       return (
         <div>
           
         </div>
       )
     }
   }
   
   ```

   

2. 组件树层级变浅，在原本的代码中，我们经常使用 HOC/render props 等方式来复用组件的状态，增强功能等，无疑增加了组件树层数及渲染，而在 React Hooks 中，这些功能都可以通过强大的自定义的 Hooks 来实现

React 在 v16.8（19年2月） 的版本中推出了 React Hooks 新特性。

## 1、useState 保存组件状态

在类组件中，我们使用 `this.state` 来保存组件状态，并对其修改触发组件重新渲染。比如下面这个简单的计数器组件，很好诠释了类组件如何运行：



```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count: 100
  }

  render() {
    return (
      <div>
        <button
          onClick = {() => {
            this.setState({
              count: this.state.count + 1
            })
          }} 
        >加</button> { this.state.count }
      </div>
    )
  }
}

```

一个简单的计数器组件就完成了，而在函数组件中，由于没有 this 这个黑魔法，React 通过 useState 来帮我们保存组件的状态。

```jsx
import React, { useState } from 'react'
// hooks 其实就是函数，只不过以 use 开头
// 左侧设置初始化状态以及修改状态的方式，书写形式为数组
// 右侧函数的参数就是左侧状态的初始化的值
// 修改状态，参数的值其实就是运算之后的结果
// 修改状态的函数必须以 set 开头， 采用小驼峰式命名方式
function App() {
  // 为什么这里可以使用const
  // 函数式组件的状态更新时，整个函数都会重新执行
  const [ count, setCount ] = useState(100)
  return (
    <div>
      <button
        onClick = { () => {
          setCount(count + 10)
        }}
      >加10</button>{ count }
    </div>
  )
}

export default App

```

通过传入 useState 参数后返回一个带有默认状态和改变状态函数的数组。通过传入新状态给函数来改变原本的状态值。**值得注意的是 useState 不帮助你处理状态，相较于 setState 非覆盖式更新状态，useState 覆盖式更新状态，需要开发者自己处理逻辑。(代码如上)**

似乎有个 useState 后，函数组件也可以拥有自己的状态了，但仅仅是这样完全不够。

## 2、useEffect 处理副作用

函数组件能保存状态，但是对于异步请求，副作用的操作还是无能为力，所以 React 提供了 useEffect 来帮助开发者处理函数组件的副作用，在介绍新 API 之前，我们先来看看类组件是怎么做的：

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    proList: []
  }
  componentDidMount () {
    // es5 XMLHttpRequest
    // es6 fetch 就是原生提供的数据请求的方案，返回值是基于promise
    //          需要将返回的结果转换成json对象才可以正常的使用
    //          不需要安装，只要支持promise即可
    fetch('http://121.89.205.189/api/pro/list')
      .then( res => res.json() ) // 转换为json数据格式
      .then( res => {
        console.log(res)
        this.setState({
          proList: res.data
        })
      })
  }
  render() {
    return (
      <div>
        {
          this.state.proList && this.state.proList.map(item => {
            return (
            <div key = { item.proid }> { item.proname } </div>
            )
          })
        }
      </div>
    )
  }
}

```

从例子中可以看到，一些重复的功能开发者需要在 componentDidMount 和 componentDidUpdate 重复编写，而如果使用 useEffect 则完全不一样。

```jsx
import React, { useState, useEffect } from 'react'

function App() {
  const [ proList, setProList ] = useState([])

  // 发现代码一直在请求？
  // 状态的改变，覆盖式更新，整个函数重新执行，意味着重新请求
  // useEffect 其实可以相当于 类组件中的
  // componentDidMount componentDidUpdate componentWillUnmount 三个生命周期钩子函数的合体
  useEffect(() => {
    fetch('http://121.89.205.189/api/pro/list').then(res => res.json())
      .then(res => {
        console.log(res.data)
        setProList(res.data)
      })
  })

  return (
    <div>
      {
        proList && proList.map(item => {
          return (
          <div key = { item.proid }>{ item.proname }</div>
          )
        })
      }
    </div>
  )
}

export default App

```

```jsx
import React, { useState, useEffect } from 'react'

function App() {
  const [ proList, setProList ] = useState([])
  // useEffect 可以拥有第二个参数
  // useEffect(() => {}, []) ---- componentDidMount --- 关键点 就是 空数组
  // useEffect(() => {}, [id]) ---- id字段变化时才会重新执行
  useEffect(() => {
    fetch('http://121.89.205.189/api/pro/list').then(res => res.json())
      .then(res => {
        console.log(res.data)
        setProList(res.data)
      })
  }, [])

  return (
    <div>
      {
        proList && proList.map(item => {
          return (
          <div key = { item.proid }>{ item.proname }</div>
          )
        })
      }
    </div>
  )
}

export default App

```

```jsx
import React, { useState, useEffect } from 'react'

function App() {
  const [ proList, setProList ] = useState([])
  // useEffect 内部返回一个函数, 返回的函数相当于 componentWillUnmount
  // useEffect(() => { return () => {}})
  useEffect(() => {
    fetch('http://121.89.205.189/api/pro/list').then(res => res.json())
      .then(res => {
        console.log(res.data)
        setProList(res.data)
      })

      return () => { // componentWillUnmount 需要时再写

      }
  }, [])

  return (
    <div>
      {
        proList && proList.map(item => {
          return (
          <div key = { item.proid }>{ item.proname }</div>
          )
        })
      }
    </div>
  )
}

export default App

```



我们使用 useEffect 重写了上面的例子，**useEffect 第一个参数接收一个函数，可以用来做一些副作用比如异步请求，修改外部参数等行为，而第二个参数称之为dependencies，是一个数组，如果数组中的值变化才会触发 执行useEffect 第一个参数中的函数。返回值(如果有)则在组件销毁或者调用函数前调用**。



## 3、useContext 减少组件层级

上面介绍了 useState、useEffect 这两个最基本的 API，接下来介绍的 useContext 是 React 帮你封装好的，用来处理多层级传递数据的方式，在以前组件树中，跨层级祖先组件想要给孙子组件传递数据的时候，除了一层层 props 往下透传之外，我们还可以使用 React Context API 来帮我们做这件事，举个简单的例子：

```jsx
import React, { Component } from 'react'
// 1.创建上下文对象
const ThemeContext = React.createContext()
const ColorContext = React.createContext()
// 配合 开发者工具查看效果
ThemeContext.displayName = 'ThemeContext'
ColorContext.displayName = 'ColorContext'
class MyButton extends Component {
  // 3.Context.Consumer完成取值,内部为一个函数，函数的默认参数为祖先组件传递的值，可以返回一段jsx代码
  render () {
    return (
      <div>
        <ThemeContext.Consumer>
          {
            (value) => {
              return <span>{ value }</span>
            }
          }
        </ThemeContext.Consumer>
        <button>1</button>
      </div>
    )
  }
}
class ToolBar extends Component {
  render () {
    return (
      <MyButton></MyButton>
    )
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 2.祖先组件传递数据
          通过上下文对象 的Provider组件完成传值，必须通过value属性传值
        */}
        <ThemeContext.Provider value="dark">
          <ColorContext.Provider value = "red">
            <ToolBar/>
          </ColorContext.Provider>
        </ThemeContext.Provider>
      </div>
    )
  }
}

```

通过 React createContext 的语法，在 APP 组件中可以跨过 Foo 组件给 Bar 传递数据。而在 React Hooks 中，我们可以使用 useContext 进行改造。

```jsx
import React, { Component, useContext } from 'react'
// 1.创建上下文对象
const ThemeContext = React.createContext()
const ColorContext = React.createContext()
// 配合 开发者工具查看效果
ThemeContext.displayName = 'ThemeContext'
ColorContext.displayName = 'ColorContext'
// useContext 一般使用到后代组件，可以通过它获取祖先组件传递的数据
function MyButton () {
  const theme = useContext(ThemeContext)
  const color = useContext(ColorContext)
  return (
    <button>1 - { color } - { theme }</button>
  )
}

class ToolBar extends Component {
  render () {
    return (
      <MyButton></MyButton>
    )
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 2.祖先组件传递数据
          通过上下文对象 的Provider组件完成传值，必须通过value属性传值
        */}
        <ThemeContext.Provider value="dark">
          <ColorContext.Provider value = "red">
            <ToolBar/>
          </ColorContext.Provider>
        </ThemeContext.Provider>
      </div>
    )
  }
}

```

传递给 useContext 的是 context 而不是 consumer，返回值即是想要透传的数据了。用法很简单，使用 useContext 可以解决 Consumer 多状态嵌套的问题。

而使用 useContext 则变得十分简洁，可读性更强且不会增加组件树深度。



## 4、useReducer

useReducer 这个 Hooks 在使用上几乎跟 Redux/React-Redux 一模一样，唯一缺少的就是无法使用 redux 提供的中间件。我们将上述的计时器组件改写为 useReducer，

```jsx
import React, { useReducer } from 'react'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "INCREMENT":
      return Object.assign({}, state, { count: state.count + payload })
    case "DECREMENT":
      return {...state, count: state.count - payload }
    default:
      break;
  }
}
function Second () {
  const [ state, dispatch ] = useReducer(reducer, { count: 10 })
  return (
    <div>
      <button onClick={ () => {
        dispatch({
          type: 'INCREMENT',
          payload: 5
        })
      }}>+</button>
      {state.count}
      <button onClick={ () => {
        dispatch({
          type: 'DECREMENT',
          payload: 5
        })
      }}>-</button>
    </div>
  )
}
function Third () {
  const [ state, dispatch ] = useReducer(reducer, { count: 100 })
  return (
    <div>
      <button onClick={ () => {
        dispatch({
          type: 'INCREMENT',
          payload: 5
        })
      }}>+</button>
      {state.count}
      <button onClick={ () => {
        dispatch({
          type: 'DECREMENT',
          payload: 5
        })
      }}>-</button>
    </div>
  )
}
function App() {
  return (
    <>
      <Second></Second>
      <hr/>
      <Third></Third>
    </>
  )
}

export default App

```

用法跟 Redux 基本上是一致的，用法也很简单，算是提供一个 mini 的 Redux 版本。

## 5、useCallback 记忆函数

在类组件中，我们经常犯下面这样的错误：

```jsx
import React, { Component } from 'react'

class SomeComponent extends Component {
  render () {
    console.log('子组件刷新了') // 只要点击 加 一直打印
    return (
      <div>SomeComponent</div>
    )
  }
}
export default class App extends Component {
  state = { count: 10 }
  add = () => {
    this.setState({
      count: this.state.count + 10
    })
  }
  render() {
    return (
      <div>
        <button onClick = { this.add }>加</button>
        <SomeComponent style = { { fontSize: 14 }} doSomething = { () => {
          console.log('do something')
        }} />
      </div>
    )
  }
}

```

这样写有什么坏处呢？一旦 App 组件的 props 或者状态改变了就会触发重渲染，即使跟 SomeComponent 组件不相关，**由于每次 render 都会产生新的 style 和 doSomething（因为重新render前后， style 和 doSomething分别指向了不同的引用）**，所以会导致 SomeComponent 重新渲染，倘若 SomeComponent 是一个大型的组件树，这样的 Virtual Dom 的比较显然是很浪费的，解决的办法也很简单，将参数抽离成变量。

```js
function fn () {
	var btn = document.getElementById('btn')
	btn.onclick= function(){}
}

// ===>
var btn = document.getElementById('btn')
function fn () {
	btn.onclick= function(){}
}

```



```jsx
import React, { Component } from 'react'

class SomeComponent extends Component {
  render () {
    console.log('子组件刷新了') // 只要点击 加 一直打印
    return (
      <div>SomeComponent</div>
    )
  }
}
export default class App extends Component {
  state = { count: 10 }
  fontSize = { fontSize: 14 }
  add = () => {
    this.setState({
      count: this.state.count + 10
    })
  }
  doSomething = () => {
    console.log('do something')
  }
  render() {
    return (
      <div>
        <button onClick = { this.add }>加</button>
        <SomeComponent style = { this.fontSize } doSomething = { this.doSomething } />
      </div>
    )
  }
}


```

在类组件中，我们还可以通过 this 这个对象来存储函数，而在函数组件中没办法进行挂载了(类组件 非覆盖式渲染，函数式组件是覆盖式渲染)。所以函数组件在每次渲染的时候如果有传递函数的话都会重渲染子组件。

```jsx
import React, { memo, useCallback, useState } from 'react'

function PageA (props) {
  const { onClick, children } = props
  console.log(111, props)
  return <div onClick={onClick}>{children}</div>
}

function PageB ({ onClick, name }) {
  console.log(222)
  return <div onClick={onClick}>{name}</div>
}

function App() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const handleClick1 = () => {
    setA(a + 1)
  }

  const handleClick2 =() => {
    setB(b + 1)
  }

  return (
    <>
      <PageA onClick={handleClick1}>{a}</PageA>
      <PageB onClick={handleClick2} name={b} />
    </>
  )
}

export default App
```

> 这里多说一句，一般把**函数式组件理解为class组件render函数的语法糖**，所以每次重新渲染的时候，函数式组件内部所有的代码都会重新执行一遍。所以上述代码中每次render，handleClick都会是一个新的引用，所以也就是说传递给SomeComponent组件的props.onClick一直在变(因为每次都是一个新的引用)，所以才会说这种情况下，函数组件在每次渲染的时候如果有传递函数的话都会重渲染子组件。

> - 使用useCallback进行处理
>
> 1. 点击事件handleClick1触发时，PageB组件也会重新渲染，当PageB组件比较耗时时，就会造成性能问题
> 2. PageB组件重新渲染的原因在于每次重新渲染，onClick都会重新定义，即上次的与这次的不一致
> 3. 思路：通过useCallback包裹onClick来达到缓存的效果，即useCallback的依赖项不变时不重新生成
> 4. 用过memo方法包裹PageB组件，并且通过useCallback包裹PageB组件的onClick方法，memo与PureComponent比较类似，前者是对Function Component的优化，后者是对Class Component的优化，都会对传入组件的数据进行浅比较，useCallback则会保证handleClick2不会发生变化

```source-js
function App() {
  const memoizedHandleClick = useCallback(() => {
    console.log('Click happened')
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

```jsx
import React, { useState, memo, useCallback } from 'react'

function PageA (props) {
  console.log('a')
  return (
    <>
    <button onClick = { props.onClick }>按钮A - { props.children }</button>
    </>
  ) 
}

function PageB (props) {
  console.log('b')
  return (
    <>
    <button onClick = { props.onClick }>按钮B - { props.name }</button>
    </>
  ) 
}
const PageBB = memo(PageB)
function App() {
  const [a, setA] = useState(1)
  const setAFn = () => {
    setA(a + 1)
  }

  const [b, setB] = useState(2)
  const setBFn = useCallback(() => {
    setB(b + 2)
  }, [b]) // 空数组代表无论什么情况下该函数都不会发生改变
  // 如果b不发生改变，不回执行

  return (
    <div>
      <PageA onClick = { setAFn }>{a}</PageA>
      <hr />
      <PageBB onClick = { setBFn } name={ b }></PageBB>
    </div>
  )
}

export default App

```



老规矩，第二个参数传入一个数组，数组中的每一项一旦值或者引用发生改变，useCallback 就会重新返回一个新的记忆函数提供给后面进行渲染。

这样只要子组件继承了 PureComponent 或者使用 React.memo 就可以有效避免不必要的 VDOM 渲染。

## 6、useMemo 记忆组件

useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的。

```rust
useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).
```

所以前面使用 useCallback 的例子可以使用 useMemo 进行改写：

```source-js
function App() {
  const memoizedHandleClick = useMemo(() => () => {
    console.log('Click happened')
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

唯一的区别是：**useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你。**所以在前面的例子中，可以返回 handleClick 来达到存储函数的目的。

所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件。

```jsx
import React, { useState, useMemo } from 'react'

function PageA (props) {
  console.log('a')
  return (
    <>
    <button onClick = { props.onClick }>按钮A - { props.children }</button>
    </>
  ) 
}

function PageB (props) {
  console.log('b')
  return (
    <>
    <button onClick = { props.onClick }>按钮B - { props.name }</button>
    </>
  ) 
}
function App() {
  const [a, setA] = useState(1)
  const setAFn = () => {
    setA(a + 1)
  }

  const [b, setB] = useState(2)
  const setBFn = () => { 
    setB(b + 2)
  }
  // useMemo 记忆组件
  const child1 = useMemo(() => <PageA onClick = { setAFn }>{a}</PageA>, [a])
  const child2 = useMemo(() => <PageB onClick = { setBFn } name={ b }></PageB>, [b])
  return (
    <div>
      { child1 }
      <hr />
      { child2 }
    </div>
  )
}

export default App

```

当 a/b 改变时，child1/child2 才会重新渲染。从例子可以看出来，只有在第二个参数数组的值发生变化时，才会触发子组件的更新。

> 类组件。PureComponent
>
> 函数式组件 useMemo

## 7、useRef 保存引用值

useRef 跟 createRef 类似，都可以用来生成对 DOM 对象的引用，看个简单的例子：

```jsx
import React, { useRef, useState } from 'react'

function Child1 () {
  const [ str, setStr] = useState('child1')
  return (
    <div>
      child1
    </div>
  )
}
function App() {
  const inputRef = useRef()
  const child1Ref = useRef()
  const getData = () => {
    console.log(inputRef.current.value)
    console.log(child1Ref)
  }
  return (
    <div>
      <input type="text" ref = { inputRef } onChange = { getData }/>
      {/* 使用ref 在组件上时，子组件必须是 类组件 */}
      {/* <Child1 ref = { child1Ref }/> */}
    </div>
  )
}

export default App

```

useRef 返回的值传递给组件或者 DOM 的 ref 属性，就可以通过 ref.current 值**访问组件或真实的 DOM 节点，重点是组件也是可以访问到的**，从而可以对 DOM 进行一些操作，比如监听事件等等。

当然 useRef 远比你想象中的功能更加强大，useRef 的功能有点像类属性，或者说您想要在组件中记录一些值，并且这些值在稍后可以更改。



## 8、useLayoutEffect 同步执行副作用

大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。

```source-js
function App() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const title = document.querySelector("#title");
    const titleWidth = title.getBoundingClientRect().width;
    console.log("useLayoutEffect");
    if (width !== titleWidth) {
      setWidth(titleWidth);
    }
  });
  useEffect(() => {
    console.log("useEffect");
  });
  return (
    <div>
      <h1 id="title">hello</h1>
      <h2>{width}</h2>
    </div>
  );
}
```

在上面的例子中，useLayoutEffect 会在 render，DOM 更新之后同步触发函数，会优于 useEffect 异步触发函数。

### (1) useEffect和useLayoutEffect有什么区别？

**简单来说就是调用时机不同，`useLayoutEffect`和原来`componentDidMount`&`componentDidUpdate`一致，在react完成DOM更新后马上**同步**调用的代码，会阻塞页面渲染。而`useEffect`是会在整个页面渲染完才会调用的代码。**

官方建议优先使用`useEffect`

> However, **we recommend starting with useEffect first** and only trying useLayoutEffect if that causes a problem.

在实际使用时如果想避免**页面抖动**（在`useEffect`里修改DOM很有可能出现）的话，可以把需要操作DOM的代码放在`useLayoutEffect`里。关于使用`useEffect`导致页面抖动。

不过`useLayoutEffect`在服务端渲染时会出现一个warning，要消除的话得用`useEffect`代替或者推迟渲染时机。

## 9.自定义hook

https://zh-hans.reactjs.org/docs/hooks-custom.html

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

```jsx
import React, { Component, useState, useLayoutEffect } from 'react'

function Header () {
  const [ username, setUsername ] = useState('')
  useLayoutEffect(() => {
    setUsername(localStorage.getItem('username'))
  })
  return (
    <h1>header - { username }</h1>
  )
}
function Content () {
  const [ username, setUsername ] = useState('')
  useLayoutEffect(() => {
    setUsername(localStorage.getItem('username'))
  })
  return (
    <div>content - { username }</div>
  )
}


export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

```

```jsx
import React, { Component, useState, useLayoutEffect } from 'react'

// 自定义hook其实也是函数，只不过函数的开头必须是 use，采用小驼峰式的命名
function useLocalStorage () {
  const [ username, setUsername ] = useState('')
  useLayoutEffect(() => {
    setUsername(localStorage.getItem('username'))
  })

  return username
}

function Header () {
  const username = useLocalStorage()
  return (
    <h1>header - { username }</h1>
  )
}
function Content () {
  const username = useLocalStorage()
  return (
    <div>content - { username }</div>
  )
}


export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

```

自定义hooks库

https://ahooks.js.org/zh-CN





# 二十、Mobx - 看情况讲解

redux + react-redux + redux-thunk

> 多个组件需要依赖同一个状态
>
> 来自不同组件的行为需要变更同一个状态

Mobx是一个功能强大，上手非常容易的状态管理工具。redux的作者也曾经向大家推荐过它，在不少情况下可以使用Mobx来替代掉redux。

![image-20210105091919079](proimg/mobx.png)

这张图来自于官网，把这张图理解清楚了。基本上对于mobx的理解就算入门了。

官网有明确的核心概念使用方法，并配有[egghead](<https://egghead.io/courses/manage-complex-state-in-react-apps-with-mobx>)的视频教程。这里就不一一赘述了。

要特别注意当使用 `mobx-react` 时可以定义一个新的生命周期钩子函数 `componentWillReact`。当组件因为它观察的数据发生了改变，它会安排重新渲染，这个时候 `componentWillReact` 会被触发。这使得它很容易追溯渲染并找到导致渲染的操作(action)。

- `componentWillReact` 不接收参数

- `componentWillReact` 初始化渲染前不会触发 (使用 `componentWillMount` 替代)

- `componentWillReact` 对于 mobx-react@4+, 当接收新的 props 时并在 `setState` 调用后会触发此钩子

- 要触发`componentWillReact`必须在render里面用到被观察的变量

- 使用Mobx之后不会触发`componentWillReceiveProps`




## 1、搭建环境

```bash
mkdir my-app
cd my-app
npm init -y
npm i webpack webpack-cli webpack-dev-server -D
npm i html-webpack-plugin -D
npm i babel-loader @babel/core @babel/preset-env -D
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
npm i @babel/plugin-transform-runtime -D
npm i @babel/runtime -S
npm i mobx -S
mkdir src
mkdir dist
touch index.html
touch src/index.js
touch webpack.config.js
```

编写webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              //支持装饰器
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              ['@babel/plugin-transform-runtime']
            ]
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  devtool: 'inline-source-map'
}
```

编写index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

## 2、Mobx 入门

### (1) observable可观察的状态

- map

```js
import {observable} from 'mobx'
// 声明
const map = observable.map({a: 1, b: 2});
// 设置
map.set('a', 11);
// 获取
console.log(map.get('a'));
console.log(map.get('b'));
// 删除
map.delete('a');
console.log(map.get('a'));
// 判断是否存在属性
console.log(map.has('a'));
```

- object

```js
import {observable} from 'mobx'
// 声明
const obj = observable({a: 1, b: 2});
// 修改
obj.a = 11;
// 访问
console.log(obj.a, obj.b);
```

- array

```js
import {observable} from 'mobx'
const arr = observable(['a', 'b', 'c', 'd']);
// 访问
console.log(arr[0], arr[10]);
// 操作
arr.pop();
arr.push('e');
```

- 基础类型

```js
import {observable} from 'mobx'/
const num = observable.box(10);
const str = observable.box('hello');
const bool = observable.box(true);
// 获得值
console.log(num.get(), str.get(), bool.get());
// 修改值
num.set(100);
str.set('hi');
bool.set(false);
console.log(num.get(), str.get(), bool.get());
```

### (2) observable装饰器

```js
import {observable} from 'mobx'

// observable这个函数可以识别当成普通函数调用还是装饰器调用
// 如果是装饰器，会自动识别数据类型，使用不同的包装转换方案。
class Store{
  @observable arr = [];
  @observable obj = {a: 1};
  @observable map = new Map();
  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;
}

const store = new Store();

console.log(store);
console.log(store.obj.a);
```

注意：vscode编译器中，js文件使用装饰器会报红。解决方式：

在根目录编写jsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "experimentalDecorators": true
  },
  "include": ["src/**/*"]
}
```

### (3) 对 observables 作出响应

- 基础代码：

```js
import {observable} from 'mobx'
class Store{
  @observable arr = [];
  @observable obj = {a: 1};
  @observable map = new Map();
  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;
}
const store = new Store();
```

- computed

计算值是可以根据现有的状态或其它计算值衍生出的值, 跟vue中的computed非常相似。

```js
const result = computed(()=>store.str + store.num);
console.log(result.get());
// 监听数据的变化
result.observe((change)=>{
  console.log('result:', change);
})
//两次对store属性的修改都会引起result的变化
store.str = 'world';
store.num = 220;
```

computed可作为装饰器， 将result的计算添加到类中：

```js
class Store{
  @observable arr = [];
  @observable obj = {a: 1};
  @observable map = new Map();

  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;

  @computed get result(){
    return this.str + this.num;
  }  
}
```

- autorun

当你想创建一个响应式函数，而该函数本身永远不会有观察者时,可以使用 `mobx.autorun`

所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。

经验法则：如果你有一个函数应该自动运行，但不会产生一个新的值，请使用`autorun`。 其余情况都应该使用 `computed`。

```js
//aotu会立即触发一次
autorun(()=>{
  console.log(store.str + store.num);
})

autorun(()=>{
  console.log(store.result);
})
//两次修改都会引起autorun执行
store.num = 220;
store.str = 'world';
```

- when

```
when(predicate: () => boolean, effect?: () => void, options?)
```

`when` 观察并运行给定的 `predicate`，直到返回true。 一旦返回 true，给定的 `effect` 就会被执行，然后 autorunner(自动运行程序) 会被清理。 该函数返回一个清理器以提前取消自动运行程序。

对于以响应式方式来进行处理或者取消，此函数非常有用。

```js
when(()=>store.bool, ()=>{
  console.log('when function run.....');
})
store.bool = true;
```

- reaction

用法: `reaction(() => data, (data, reaction) => { sideEffect }, options?)`。

`autorun` 的变种，对于如何追踪 observable 赋予了更细粒度的控制。 它接收两个函数参数，第一个(*数据* 函数)是用来追踪并返回数据作为第二个函数(*效果* 函数)的输入。 不同于 `autorun` 的是当创建时*效果* 函数不会直接运行，只有在数据表达式首次返回一个新值后才会运行。 在执行 *效果* 函数时访问的任何 observable 都不会被追踪。

```js
// reaction
reaction(()=>[store.str, store.num], (arr)=>{
  console.log(arr.join('/'));
})
//只要[store.str, store.num]中任意一值发生变化，reaction第二个函数都会执行
store.num = 220;
store.str = 'world';
```

### (4) 改变 observables状态

- action

接上面案例，添加action到类中：

```js
class Store{
  @observable arr = [];
  @observable obj = {a: 1};
  @observable map = new Map();

  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;

  @computed get result(){
    return this.str + this.num;
  }

  @action bar(){
    this.str = 'world';
    this.num = 40;
  }
}
const store = new Store();

//调用action，只会执行一次
store.bar();
```

- action.bound

`action.bound` 可以用来自动地将动作绑定到目标对象。

```js
class Store{
  @observable arr = [];
  @observable obj = {a: 1};
  @observable map = new Map();

  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;

  @computed get result(){
    return this.str + this.num;
  }

  @action bar(){
    this.str = 'world';
    this.num = 40;
  }

  //this 永远都是正确的
  @action.bound foo(){
    this.str = 'world';
    this.num = 40;
  }
}

const store = new Store();
setInterval(store.foo, 1000)
```

- runInAction

`action` 只能影响正在运行的函数，而无法影响当前函数调用的异步操作。如果你使用async function来处理业务，那么我们可以使用 `runInAction` 这个API来解决这个问题。

```js
@action async fzz() {
  await new Promise((resolve) => { 
    setTimeout(() => {
      resolve({
        num: 220,
        str: 'world'
      })
    }, 1000) 
  })
  runInAction(()=>{
    store.num = 220
    store.str = 'world'
  })    
}
```

## 3、应用

### (1) 在react中使用mobx

在react中使用mobx，需要借助mobx-react。

它的功能相当于在react中使用redux，需要借助react-redux。

首先来搭建环境：

```bash
create-react-app react-app
cd react-app
npm run eject
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
npm i mobx mobx-react -S
```

修改package.json中babel的配置：

```json
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ]
  }
```

注意：vscode编译器中，js文件使用装饰器会报红。解决方式：

在根目录编写写jsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "experimentalDecorators": true
  },
  "include": ["src/**/*"]
}
```

###（2）项目应用

**入口文件：**

```jsx
import { Provider } from 'mobx-react'

<Provider store={homeStore} morestore={moreStore}>
  <App></App>
</Provider>
```

**组件：**

```jsx
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Swiper extends Component{}
```

## 4.mobx的新版本用法

```
cnpm i mobx mobx-react -S
```

Mobx 主要使用的是 装饰器的写法

https://es6.ruanyifeng.com/#docs/decorator

装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。

默认情况下 create-react-app 脚手架不支持 装饰器写法，需要配置


一、create-react-app 支持decorators

```shell
yarn add @babel/core @babel/plugin-proposal-decorators @babel/preset-env -S
```



**创建 .babelrc**

```json
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ]
    ]
}
```

**创建config-overrides.js**

```javascript
const path = require('path')
const { override, addDecoratorsLegacy } = require('customize-cra')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const customize = () => (config, env) => {
    config.resolve.alias['@'] = resolve('src')
    if (env === 'production') {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    }

    return config
};


module.exports = override(addDecoratorsLegacy(), customize())
```

**安装依赖**

```
yarn add customize-cra react-app-rewired
```

**修改package.json**

```
...
"scripts": {
   "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
...
```

Src/store/index.js

```js
import { makeAutoObservable } from 'mobx'
class Store {
  // 初始化状态
  bannerList = []
  proList = []

  constructor () {
    makeAutoObservable(this) // 可被观察
  }
  

  changeBannerList (payload) {
    console.log('111', payload)
    this.bannerList = payload
    console.log('222', this.bannerList)
  }
  changeProList (payload) {
    this.proList = payload
  }

}

export default new Store()
```

Src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'
import { Provider } from 'mobx-react'
import store from './store'
console.log(store)
ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

App.jsx 使用

```jsx
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
@inject('store')
@observer // 这个组件可以检测状态的改变
class App extends Component {
  componentDidMount() {
    console.log(this.props)
    fetch('http://121.89.205.189/api/banner/list')
    .then(res => res.json())
    .then(res => {
        this.props.store.changeBannerList(res.data)
      })
  }
  render() {
    // console.log('3333', this.props.store.bannerList)
    return (
      <div>
        {
          this.props.store.bannerList && this.props.store.bannerList.map(item => {
            return <img src={ item.img } alt={item.alt} key = { item.bannerid }/>
          })
        }
        12
      </div>
    )
  }
}

export default  App
```

