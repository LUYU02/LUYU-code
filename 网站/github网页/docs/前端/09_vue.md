---
# 访问地址
# slug: luyu2
# 文章标题
title: vue
# 文档的位置 排序
sidebar_position: 9
---
# Vue课程

## vue

- vue是一个前端的框架，主要负责帮助我们构建用户的界面
- MVVM：Model - View - View Model
- vue负责vm的工作（视图模型），通过vue可以将视图和模型相关联。
  - 当模型发生变化时，视图会自动更新
  - 也可以通过视图去操作模型
- vue思想：
  - 组件化开发
  - 声明式的编程

### HelloWorld

1. 直接在网页中使用（像jQuery一样）

   - `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`

2. 使用vite

   - `yarn add vite -D`

3. 代码：

   ```javascript
   // 组件，就是一个普通js对象
   const App = {}
   
   // 创建应用
   const app = createApp(App)
   
   // 挂载到页面
   app.mount("#root")
   ```

4. 自动创建项目

   - `npm init vue@latest`
   - `yarn create vue`

## 网页的渲染

- 浏览器在渲染页面时，做了那些事：

  1. 加载页面的html和css（源码）
  2. html转换为DOM，css转换为CSSOM
  3. 将DOM和CSSOM构建成一课渲染树
  4. 对渲染树进行reflow（回流、重排）（计算元素的位置）
  5. 对网页进行绘制repaint（重绘）

- 渲染树（Render Tree）

  - 从根元素开始检查那些元素可见，以及他们的样式
  - 忽略那些不可见的元素（display:none）

- 重排、回流

  - 计算渲染树中元素的大小和位置
  - 当页面中的元素的大小或位置发生变化时，便会触发页面的重排（回流）
  - width、height、margin、font-size ......
  - 注意：每次修改这类样式都会触发一次重排！所以如果分词修改多个样式会触发重排多次，而重排是非常耗费系统资源的操作（昂贵），重排次数过多后，会导致网页的显示性能变差，在开发时我们应该尽量的减少重排的次数
  - 在现代的前端框架中，这些东西都已经被框架优化过了！所以使用vue、react这些框架这些框架开发时，几乎不需要考虑这些问题，唯独需要注意的时，尽量减少在框架中直接操作DOM

- 重绘

  - 绘制页面
  - 当页面发生变化时，浏览器就会对页面进行重新的绘制

- 例子：

  ```html
  <!DOCTYPE html>
  <html lang="zh">
      <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
              .box1 {
                  width: 200px;
                  height: 200px;
                  background-color: orange;
              }
  
              .box2 {
                  background-color: tomato;
              }
  
              .box3 {
                  width: 300px;
                  height: 400px;
                  font-size: 20px;
              }
          </style>
      </head>
      <body>
          <button id="btn">点我一下</button>
          <hr />
          <div id="box1" class="box1"></div>
          <script>
              btn.onclick = () => {
                  // box1.classList.add("box2")
                  // 可以通过修改class来间接的影响样式，来减少重排的次数
                  // box1.style.width = "300px"
                  // box1.style.height = "400px"
                  // box1.style.fontSize = "20px"
                  // box1.classList.add("box3")
                  // box1.style.display = "none"
                  // box1.style.width = "300px"
                  // box1.style.height = "400px"
                  // box1.style.fontSize = "20px"
                  // div.style.display = "block"
              }
          </script>
      </body>
  </html>
  
  ```

