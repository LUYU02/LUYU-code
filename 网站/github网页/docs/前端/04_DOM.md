---
# 访问地址
# slug: luyu2
# 文章标题
title: DOM
# 文档的位置 排序
sidebar_position: 4
---
# DOM

## DOM

### 获取元素(查)

- document对象的原型链
  - HTMLDocument -> Document -> Node -> EventTarget -> Object.prototype -> null
- document.documentElement --> html根元素
- document.head --> head元素
- document.title --> title元素
- document.body --> body元素
- document.links --> 获取页面中所有的超链接
- document.getElementById()  跟**id**

- document.getElementsByClassName() 跟**class** 返回是数组 实时刷新
- document.getElementsByTagName() 跟**标签名** 返回是数组 实时刷新
- document.getElementsByName() 跟**name** 返回是数组 实时刷新
- document.querySelector() 跟**选择器**
- document.querySelectorAll() 跟**选择器** 返回是数组 不会实时刷新

### 创建元素节点 (增)

- document.createElement() 跟标签名

### 添加元素节点

- node.appendChild(child)  后面添加
- node.insertBefore(child, 指定元素) 后面添加
- element.insertAdjacentElement("参数",元素)  任意位置 元素前后 元素里面前后

### 获取节点

- element.childNodes 获取当前元素的子节点（会包含空白的子节点）
- element.children 获取当前元素的子元素
- element.firstElementChild 获取当前元素的第一个子元素
- element.lastElementChild 获取当前元素的最后一个子元素
- element.nextElementSibling 获取当前元素的下一个兄弟元素
- element.previousElementSibling 获取当前元素的前一个兄弟元素
- element.parentNode 获取当前元素的父节点
- element.tagName 获取当前元素的标签名

### 删除元素节点

- node.removeChild(child)
- node.remove() 删除当前元素

### 复制节点

- node.cloneNode()  false(浅拷贝)   true(深拷贝)

### 修改文本节点

- element.textContent 获取或修改元素中的文本内容  
  - 不会考虑css样式
- element.innerText 获取或修改元素中的文本内容
  - 会考虑css样式
  - 对标签进行转义
- element.innerHTML 获取或修改元素中的html代码
  - 有xss注入风险

### 属性节点

- 读取:
  - 元素.属性名
  - 元素["属性名"]
  - 元素.getAttribute("属性名")
- 修改:
  - 元素.属性名=值
  - 元素["属性名"]=值
  - 元素.setAttribute(属性名, 属性值)     自定义:data-开头 标准
- 删除：
  - 元素.removeAttribute(属性名)

- 新增: element.dataset.属性名或者 element.dataset[‘属性名’] ie 11才开始支持

### class属性

- classList.add(属性值...) 向元素添加一个或者多个class
- classList.remove() 移除一个或者多个
- classList.toggle() 切换一个class
- classList.replace(被替换,替换)替换
- classList.contains() 检查有没有 返回布尔值

### 事件

鼠标事件 键盘事件 触屏事件

```javascript
// 案例
btn.onclick=function(){
    alert("我又被点了一下~~")
}
// 区别 第二种可以绑定多个事件
btn.addEventListener("click", function () {
        alert("哈哈哈")
      },布尔值) // 第三个参数  true 捕获阶段  false(默认) 冒泡阶段
//   删除事件
//删除对象.事件类型=null
//删除对象.removeEventListener(事件类型,函数名)
```

文档加载 自上而下加载的

- window.onload 事件会在窗口中的内容加载完毕之后才触发
- document的DOMContentLoaded事件会在当前文档加载完毕之后触发

**事件对象**

事件对象是有浏览器在事件触发时所创建的对象，这个对象中封装了事件相关的各种信息

- event.target 触发事件的对象
- event.currentTarget 绑定事件的对象（同this）
- event.stopPropagation() 停止事件的传导 阻止冒泡
- event.preventDefault() 取消默认行为
- e.type 返回类型
- 鼠标事件对象
  - e.clientX 返回鼠标相对于浏览器窗口可视区的X坐标
  - e.clientY 返回鼠标相对于浏览器窗口可视区的Y坐标
  - e.pageX 返回鼠标相对于文档页面的X坐标1E9+支持
  - e.pageY 返回鼠标相对于文档页面的Y坐标IE9+支持
  - e.screenX 返回鼠标相对于电脑屏幕的X坐标
  - e.screenY 返回鼠标相对于电脑屏幕的Y坐标
- 键盘事件对象
  - e.key 返回按下的键

**事件委派**

冒泡是 由内向外传导       捕获是 由外向内传导

- 事件传播机制:
- 在DOM中，事件的传播可以分为三个阶段：
  - 捕获阶段 （由祖先元素向目标元素进行事件的捕获）（默认情况下，事件不会在捕获阶段触发）
  - 目标阶段 （触发事件的对象）
  - 冒泡阶段 （由目标元素向祖先元素进行事件的冒泡）

### 获取样式

- getComputedStyle(element) 获取当前元素生效的css样式
  - 参数:1.要获取样式的对象   2.要获取的伪元素
- 元素.clientHeight
- 元素.clientWidth
  - 获取元素内部的宽度和高度（包括内容区和内边距）
- 元素.offsetHeight
- 元素.offsetWidth
  - 获取元素的可见框的大小（包括内容区、内边距和边框）
- 元素.scrollHeight
- 元素.scrollWidth
  - 获取元素**滚动区域的大小**
- 元素.offsetParent
  - 获取元素的**定位父元素**
  - 定位父元素：离当前元素最近的开启了定位的祖先元素，如果所有的元素都没有开启定位则返回body
- 元素.offsetTop
- 元素.offsetLeft
  - 获取元素**相对于其定位父元素**的偏移量
- 元素.scrollTop
- 元素.scrollLeft
  - 获取或设置**元素滚动条**的偏移量
