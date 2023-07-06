---
# 访问地址
# slug: luyu2
# 文章标题
title: BOM
# 文档的位置 排序
sidebar_position: 5
---
# BOM

BOM浏览器对象模型  BOM为我们提供了一组对象，通过这组对象可以完成对浏览器的各种操作

### BOM对象

- Window —— 代表浏览器窗口（全局对象）

#### Navigator — 浏览器的对象（可以用来识别浏览器）

- 属性：userAgent 返回一个用来描述浏览器信息的字符串

#### Location —— 浏览器的地址栏信息

- 可以直接将location的值修改为一个新的地址，这样会使得网页发生跳转
- location.assign() 跳转到一个新的地址
- location.replace() 跳转到一个新的地址（无法通过回退按钮回退）
- location.reload() 刷新页面，可以传递一个true来强制清缓存刷新
- location.href 获取当前地址

#### History —— 浏览器的历史记录（控制浏览器前进后退）

- history.back()                  回退按钮
- history.forward()            前进按钮
- history.go()                      可以向前跳转也可以向后跳转

#### Screen —— 屏幕的信息

### 定时器

setTimeout(()=>{},毫秒)  只会调用一次

clearTimeout(定时器名字) 关闭定时器

setInterval(()=>{}.毫秒)  一直调用

clearInterval() 关闭定时器
