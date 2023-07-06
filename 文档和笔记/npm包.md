1. nprogress (进度条)
   - 修改进度条的颜色，修改源码样式.bar类名的
2. axios (ajax请求)
3. mockjs (模拟假数据)
   1. 安装 创建mock文件夹 把图片放到public中
4. uuid (随机生成一串字符串)
5. vue-lazyload (图片懒加载)


## 面试题

1. v-show与v-if区别?
   - v-show:通过样式display控制
   - v-if：通过元素上树与下树进行操作
2. 开发项目的时候，优化手段有哪些?
   - 1:v-show|v-if
   - 2:按需加载
3. 路由传递参数先关面试题
      - 路由传递参数（对象写法）path是否可以结合params参数一起使用?
           - 不可以：不能这样书写，程序会崩掉

      - 如何指定params参数可传可不传? 
           - 在路由地址带一个 问号(?) : path: "/search/:keyword?/:x?",

      - params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      - 如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
           - 不指定params
           - 如果是空字符串 就在传参的时候加一个判断条件 ： 
           - params: { keyword: this.keyword || undefined },

      - 路由组件能不能传递props数据?
           - 可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
           - 实现: props: (route)=>({keyword1:route.params.keyword, keyword2: route.query.keyword })

      - 由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象
           - 第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
           - 第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；
           - 修改源码 重写push和replace方法

4. 节流和防抖（技能cd和回城）
         - 节流在一秒内只能执行一次
         - 防抖只执行最后一次

5. 组件之间通信
         - props:父子
         - 插槽:父子
         - $ref:父子通信
         - 自定义事件:子父
         - 全局事件总线$bus:万能
         - pubsub(消息发布与订阅):万能
         - Vuex:万能
6. v-for与v-if优先级？ 
      - v-for优先级更高

7. GET与POST
      1. 相同点：都是HTTP协议。
      2. 不同点:
            1. GET请求携带参数是有上限的 post请求携带的参数是没有'上限的
            2. GET请求相对而言不安全，POST安全

8. H5新增那些特性？
      1. CSS4、本地存储、多媒体、canvas

9. 本地存储与会话存储区别？
      1. 本地存储（localStorage）：生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在
      2. 会话存储（sessionStorage）：仅在当前会话有效，关闭页面或浏览器后数据就会被清除

10. token相关的面试

