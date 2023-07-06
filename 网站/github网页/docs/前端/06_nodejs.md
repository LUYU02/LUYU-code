---
# 访问地址
# slug: luyu2
# 文章标题
title: nodejs
# 文档的位置 排序
sidebar_position: 6
---
# node.js

## node的基础
特点:  **单线程  异步  非阻塞  同意apl**

## 安装

 可以用 [nvm](https://nvm.uihtm.com/) 管理 node

- 常见命令
  - nvm version  (查看nvm版本)
  - nvm list (查看node版本)
  - nvm install (安装node 可指定)
  - nvm use (node版本指定)

[无脑安装node(点解链接)](https://nodejs.org/en/ )

npm常见命令

- npm i 包 或者 包@指定版本 (安装)
- npm r 包 (移除)
- npm i  -D 包 (项目上线不会受到影响)

## promise (就是解决异步的回调函数)

- 特点

  - 解决异步中的回调函数

  - 特殊的存取数据方式

  - 可以存储异步调用的结果

### 构造函数创建 Promise

```javascript
// 创建Promise时构造函数需要一个函数作为参数 创建回调函数的同时还会有两个参数
const promise = new Promise((resolve, reject) => {
  // resolve 执行正常时存储数据     resolve执行错误时存储数据
  // 通过函数向Promise中添加数据 好处就是可以添加异步调用的数据
  setTimeout(() => {
    // throw new Error("自己写的错误!")
    resolve("正确的小江")
    // reject("错误的小江")
  }, 1000)
  //   resolve("正确的小江")
  //   reject("错误的小江")
})
```

### Promise中维护两个隐藏的属性

```javascript
/* 
    Promise中维护两个隐藏的属性：
        PromiseResult
            用来储存数据
        PromiseState
            记录Promise的状态
                pending(进行中)
                fulfilled(完成) 通过resolve存储数据时
                rejcted(拒绝,出错) 出错或者通过reject存储数据时
            state只能修改一次,修改后永远不会变
        流程:
            当Promise创建时,PromiseState初始值为pending
                当通过resolve存储数据时 PromiseState 变为fulfilled（完成)
                    PromiseResult变为存储的数据
                 当通过reject存储数据时 PromiseState 变为rejcted（拒绝,出错了)
                    PromiseResult变为存储的数据 或异常对象
                    
            当通过then读取数据,相当于为Promise设置了回调函数
                如果PromiseState变为fulfilled，则调用then的第一个回调函数来返回数据
                如果PromiseState变为rejected，则调用then的第二个回调函数来返回数据
*/
```

### Promise 实例方法

- then需要两个回调函数作为参数 回调函数用来获取promise中的数据

  - 通过resolve存储的数据，会调用第一个函数返回
    - 在第一个函数中编写处理数据的代码

  - 通过reject存储的数据或者出现异常时，会调用第二个函数返回
    - 在第二个函数中编写异常的代码

- catch()用法和then类似，但是只需要一个回调函数作为参数

  - catch()中的回调函数只会在Promise被拒绝时才调用

  - catch()相当于 then(null, reason => {})

  - catch()就是一个专门处理Promise异常的方法

- finally()

  - 无论是正常存储数据还是出现异常了，finally总会执行

  - 但是finally的回调函数中不会接收到数据

  - finally()通常用来编写一些无论成功与否都要执行代码

  **这三个法都会返回一个新的Promise 只有finally()返回值不会存储到Promise中**

### Promise 静态方法

- Promise.resolve() 创建一个立即执行的Promise

- Promise.reject() 创建一个立即执行的Promise

- Promise.all([...]) 同时返回多个Promise的执行结果
  - 其中有一个错误就全错
- Promise.allSettled() 同时返回多个Promise的执行结果
  - 不管错的还是对的 全返回
  - {status: 'fulfilled', value: '错的小江'} 成功的
  - {status: 'rejected', reason: '错的小江'} 错误的
- Promise.race() 返回一个执行最快的Promise (不考虑对错)
- Promise.any() 返回一个执行最快的Promise (全部错误才报错)

## 调用栈 宏任务 微任务

**JS是单线程的，它的运行时基于事件循环机制（event loop）**

- 调用栈
  - 栈是一种数据结构，后进先出
  - 调用栈中，放的是要执行的代码
- 任务队列
  - 队列是一种数据结构，先进先出
  - 任务队列的是将要执行的代码

**当调用栈中的代码执行完毕后，队列中的代码才会按照顺序依次进入到栈中执行(调用栈>任务队列(微>宏))**

- 在JS中任务队列有两种
  - 宏任务队列 （大部分代码都去宏任务队列中去排队）
  - 微任务队列 （Promise的回调函数（then、catch、finally））
- 整个流程
  - 执行调用栈中的代码
  - 执行微任务队列中的所有任务
  - 执行宏任务队列中的所有任务

## async和await

- 通过async可以快速创建异步函数
  - 异步函数的返回值会自动封装到一个Promise中返回
- 在async声明的异步函数中可以使用await关键字来调用函数

```javascript
function sum(a, b) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        // resolve(a + b)
        reject(a + b)
      })
    })
  }

  async function fn3() {
    // 当我们通过await去调用异步函数时，它会暂停代码的运行
    // 知道异步代码执行有结果时，才会将结果返回
    // 注意 await只能用于 async声明的异步函数中，或es模块的顶级作用域中
    // await只是阻塞内部的代码,外部不会影响
    // 通过await调用异步代码时，需要通过try-catch来处理异常
    try {
      let result = await sum(123, 456)
      console.log(result)
    } catch (e) {
      console.log("出错了!", e)
    }
  }
  fn3()

/*  //1243
 async function fn4() {
    console.log(1)
    await console.log(2)
    console.log(3)
  }
  fn4()

  等价

  function fn5() {
    return new Promise((resolve) => {
      console.log(1)
      console.log(2)
      resolve()
    }).then((r) => console.log(3))
  }
  console.log(4)
*/
```

## 模块化

#### CommonJS规范 (在node中默认)

引入require("文件名或者包名")

- 向外暴露 (指针永远指向module.exports)

  - exports (共享一个)

  - module.exports (共享对象)

#### ES的模块化

要想在node使用ES的模块化，可以采用以下两种方案

1. 使用mjs作为扩展名
2. 修改 package.json 设置为"type":"module" 项目下所有的js文件都默认ES module

```javascript
import sum(默认导出), { a as 别名, c } from "./xxx.mjs"
/*
导入ES模块 不能省略扩展名
通过as指定别名
通过ES模块化,导入的内容都是常量  可以跟对象
默认导出 一个模块只有一个默认导出 export default (跟值)
ES模块都是运行在严格模式下的
*/
```

## 内置模块

默认  global 是node中的全局对象，作用类似于window

ES标准下，全局对象的标准名应该是 globalThis

### process (表示当前的node进程)

**全局变量**

process.exit() (结束当前进程，终止node)

process.nextTick(callback[, …args])  (将函数插入到 tick队列中)

```javascript
调用栈      
tick队列   Commonjs标准下 执行顺序 调用栈 > tick队列 > 微任务队列 > 宏任务队列
微任务队列  ES标准下    执行顺序 调用栈 > 微任务队列 > tick队列 > 宏任务队列
宏任务队列

/* setTimeout(() => console.log(1)) //宏任务
queueMicrotask(() => {// 变成微任务
  console.log(2) //微任务
})
process.nextTick(() => {
  console.log(3) //tick队列
})
console.log(4) //调用栈 */
```

### path (路径)

需要先引入 require("path")

**方法**

- path.resolve([…paths])  (生成一个绝对路径)

  - dirname (当前文件夹)  filename(当前文件)

- path.join([...paths])  (路径拼接起来)

- path.basename(url,[要删除的后缀])  (获取路径文件名)

- path.extname(url) (获取路径扩展名)

### fs (文件系统)

`fs.readFile(path[,options])`   读取内容

`fs.writeFile(data, options)`  写入内容 文件存在则替换

`fs.appendFile(data[, options])`  创建新文件，或将数据添加到已有文件中

`fs.mkdir(path[, options])`   创建目录 设置{ recursive: true } 会自动创建不存在的上一级目录

`fs.rmdir(path[, options])`    删除目录

`fs.rm((path[, options])`     删除文件

`fs.rename(oldPath, newPath)` 重命名 (剪切)

`fs.copyFile(src, dest[, mode])` 复制文件 (复制)

### http (创建web服务器)

```javascript
// 1.导入 http 模块
const http = require("http")
// 2.创建 web 服务器实例
const server = http.createServer()
// 3.为服务器实例绑定 request 事件
server.on("request", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
})
// 启动服务器
server.listen(80, () => {
  console.log("http://127.0.0.1")
})

// 第二种写法
const http = require('node:http');

// 创建本地服务器来从其接收数据
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(80, () => {  
    console.log("http://127.0.0.1")
});
```

**服务器功能**

1. 接受浏览器的**请求报文**
   1. 请求首行 请求头 空行 请求体
      1. 请求首行: 请求方式 请求资源的路径 协议
      2. 请求头: 名值对结构 用来告诉服务器我们浏览器的信息
      3. 请求体: get没有 post请求通过请求体发送数据
2. 向浏览器返回**响应报文**
   1. 响应首行 响应头 空行 响应体
      1. 响应首行: 协议 状态码 对状态码的描述
      2. 响应头: 名值对结构 用来告诉浏览器响应的信息
      3. 响应体: 服务器返回给客户端的内容

```javascript
    1.当在浏览器中输入地址以后发生了什么？
        https://lilichao.com/hello/index.html
 ① DNS解析，获取网站的ip地址
    ② 浏览器需要和服务器建立连接（tcp/ip）（三次握手）
    ③ 向服务器发送请求（http协议）
    ④ 服务器处理请求，并返回响应（http协议）
    ⑤ 浏览器将响应的页面渲染
    ⑥ 断开和服务器的连接（四次挥手）
 
2. 客户端如何和服务器建立（断开）连接
    - 通过三次握手和四次挥手
        - 三次握手（建立连接）
            - 三次握手是客户端和服务器建立连接的过程
                1. 客户端向服务器发送连接请求
                                SYN
                2. 服务器收到连接请求，向客户端返回消息
                                SYN ACK 
                3. 客户端向服务器发送同意连接的信息
                                ACK
 
        - 四次挥手（断开连接）
                1. 客户端向服务器发送请求，通过之服务器数据发送完毕，请求断开来接
                                FIN
                2. 服务器向客户端返回数据，知道了
                                ACK
                3. 服务器向客户端返回数据，收完了，可以断开连接
                                FIN ACK
                4. 客户端向服务器发数据，可以断开了
                                ACK
请求和响应实际上就是一段数据，只是这段数据需要遵循一个特殊的格式，这个特殊的格式由HTTP协议来规定
```

## express

**基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架**

```javascript
// 引入express
const express = require("express")
// 获取服务器的实例(对象)
const app = express()

// 路由
app.get('/', (req, res) => {
//处理数据
})

// 启动服务器
app.listen(80, () => {
  console.log("http://127.0.0.1")
})

```

### express()

托管静态资源

​ express.static(root, [options])

解析请求体

​ express.urlencoded([options])

Router路由

​ express.Router([options])

### 应用程序

```javascript
app.请求方式([path,] (req,res)=>{
 req.params //url动态参数
 req.query  //查询参数 get
    req.get(field)  // 获取请求头
    req.body() // 获取post请求的请求体数据
    req.cookies //用来读取客户端发回的cookie
    
 res.send()   //把内容响应给浏览器
    res.render()  //渲染模板引擎 返回给浏览器
    res.sendStatus() //向客户端发送响应状态吗
    res.status()  //用来设置响应状态吗，但是并不发送
    res.redirect()   //用来发起重定向
    res.setHeader("请求方式", "*") //设置响应头
    res.cookie(名值对格式) //给客户端发送一个cookie

},[callback...])
```

### 中间件

```javascript
// 中间件
use()
//全局
app.use(路劲,(res,req,next)=>{
    //处理数据
    next()
})
// 局部中间件
const z1 = (res, req, next) => {
    //处理数据
    next()
}

// 第一种和第二种等价 z1,z2===[z1,z2]
app.get("/", z1, z2, (res, req) => {
    req.send("你好  GET ")
})
app.get("/luyu", [z1, z2], (res, req) => {
    req.send("你好  GET ")
})
```

### Router 路由

**express.Router([options])**

```javascript
相当于是app.xxx  
// 创建一个路由 可以有多个express.Router([options]) 但只有一个app.xxx
const router = express.Router([options])
router.get("/luyu",(req,res)=>{
    //处理数据
})
// 向外暴露这个 router路由
module.exports = router
```

### 模板引擎

```javascript
 ejs是node中的一款模板引擎，使用步骤：
            1.安装ejs
            2.配置express的模板引擎为ejs
                app.set("view engine", "ejs")
            3.配置模板路径
                app.set("views", path.resolve(__dirname, "views"))
 
    注意，模板引擎需要被express渲染后才能使用
 res.render() 用来渲染一个模板引擎，并将其返回给浏览器
    可以将一个对象作为render的第二个参数传递，这样在模板中可以访问到对象中的数据
    res.render("students", { name: "孙悟空", age: 18, gender: "男" })
    <%= %>在ejs中输出内容时，它会自动对字符串中的特殊符号进行转义 <
    这个设计主要是为了避免 xss 攻击
    <%- %> 直接将内容输出
    <% %>  可以在其中直接编写js代码，js代码会在服务器中执行             
```

## cokie

**cookie是HTTP协议中用来解决无状态问题的技术**

```javascript
/* 
        需要安装中间件来使得express可以解析cookie
            1.安装cookie-parser
                yarn add cookie-parser
            2.引入
                const cookieParser = require("cookie-parser")
            3.设置为中间件
                app.use(cookieParser())
    */
// req.cookies 用来读取客户端发回的cookie
// res.cookie(名值对格式) 给客户端发送一个cookie
```

#### cokie有效期

```javascript
 /*
        cookie是有有效期
            - 默认情况下cookie的有效期就是一次会话（session）
                会话就是一次从打开到关闭浏览器的过程 
            - maxAge 用来设置cookie有效时间，单位是毫秒
    */
app.get("/delete-cookie", (req, res) => {
    // cookie一旦发送给浏览器我们就不能在修改了
    // 但是我们可以通过发送新的同名cookie来替换旧cookie，从而达到修改的目的
 
    res.cookie("name", "", {
        maxAge: 0
    })
 
    res.send("删除Cookie")
})
```

#### cokie 不足

```javascript
 /*
        cookie的不足
            - cookie是由服务器创建，浏览器保存
                每次浏览器访问服务器时都需要将cookie发回
                这就导致我们不能在cookie存放较多的数据
                并且cookie是直接存储在客户端，容易被篡改盗用
            - 注意：
                我们在使用cookie一定不会在cookie存储敏感数据
 
            - 所以为了Cookie的不足，我们希望可以这样
                将用户的数据统一存储在服务器中，
                    每一个用户的数据都有一个对应的id
                    我们只需通过cookie将id发送给浏览器
                    浏览器只需每次访问时将id发回，即可读取到服务器中存储的数据
                    这个技术我们称之为session（会话）                  
    */
```

## session

```javascript
session
                - session是服务器中的一个对象，这个对象用来存储用户的数据
                - 每一个session对象都有一个唯一的id，id会通过cookie的形式发送给客户端
                - 客户端每次访问时只需将存储有id的cookie发回即可获取它在服务器中存储的数据
                - 在express 可以通过 express-session 组件来实现session功能
                - 使用步骤：
                    ① 安装
                        yarn add express-session
                    ② 引入
                        const session = require("....")
                    ③ 设置为中间件
                        app.use(session({...}))
app.use(
  session({
    store: new FileStore({
      //path 指定sessions 本地文件路径
      path: path.join(__dirname, "./sessions"),
      secret: "加密!",
      // session的有效时间 默认一小时
      // ttl: 10,
      // 默认情况下，fileStore会每间隔一小时，清除一次session对象
      // reapInterval 用来指定清除session的间隔，单位秒，默认 1小时
      // reapInterval: 10,
    }),
    // 加密信息
    secret: "小江",
    // cookie: {
    //   maxAge: 1000 * 3600,
    // },
  })
)
/* 
    session是服务器中的一个对象，这个对象用来存储用户的信息
        每一个session都会有一个唯一的id，session创建后，
            id会以cookie的形式发送给浏览器
        浏览器收到以后，每次访问都会将id发回，服务器中就可以根据id找到对应的session
 
    id（cookie） ----> session对象
     
    session什么时候会失效？
        第一种 浏览器的cookie没了
        第二种 服务器中的session对象没了
     
    express-session默认是将session存储到内存中的，所以服务器一旦重启session会自动重置，
        所以我们使用session通常会对session进行一个持久化的操作（写到文件或数据库）
 
    如果将session存储到本文件中：
        - 需要引入一个中间件session-file-store
        - 使用步骤：
            ① 安装
                yarn add session-file-store
            ② 引入
                const FileStore = require("session-file-store")(session) 
            ③ 设置为中间件       
            app.use(
                session({
                    store: new FileStore({}),
                    secret: "dazhaxie"
                })
            )
 
*/
```

csrf攻击
        - 跨站请求伪造
                http<http://localhost:3000/students/delete?id=3>

                    - 现在大部分的浏览器的都不会在跨域的情况下自动发送cookie
                这个设计就是为了避免csrf的攻击
                            - 如何解决？
            1. 使用referer头来检查请求的来源
            2. 使用验证码
            3. 尽量使用post请求（结合token）
    
        - token（令牌）
            - 可以在创建表单时随机生成一个令牌
                然后将令牌存储到session中，并通过模板发送给用户
                用户提交表单时，必须将token发回，才可以进行后续操作
                （可以使用uuid来生成token）
