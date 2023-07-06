# ES6

## 1.let关键字

1. let 关键字用来声明变量，使用 let 声明的变量有几个特点：

2. 不允许重复声明 
3. 块儿级作用域
4. 不存在变量提升 
5. 不影响作用域链 应用场景

#### <u>注意：以后声明变量使用 let 就对了</u>

## 2.const 关键字

1. 声明必须赋初始值
2. 标识符一般为大写
3. 不允许重复声明
4. 值不允许修改
5. 块儿级作用域

#### 注意: 对象属性修改和数组元素变化不会出发 const 错误

#### 应用场景：声明对象类型使用 const，非对象类型声明选择 let

## 3.变量的解构赋值

```html
const arr = ['张学友', '刘德华', '黎明', '郭富城'];
let [zhang, liu, li, guo] = arr;
//对象的解构赋值
const lin = {
 name: '林志颖',
 tags: ['车手', '歌手', '小旋风', '演员']
};
let {name, tags} = lin;
//复杂解构
let wangfei = {
 name: '王菲',
 age: 18,
 songs: ['红豆', '流年', '暧昧', '传奇'],
 history: [
 {name: '窦唯'},
 {name: '李亚鹏'},
 {name: '谢霆锋'}
 ]
};
let {songs: [one, two, three], history: [first, second, third]} = 
wangfei;

```

## 4.模板字符

1. 用反引号（`）标识
2. 字符串中可以出现换行符
3. 可以使用 ${xxx} 形式输出变量

## 5.对象简写

```
let name = '尚硅谷';
let slogon = '永远追求行业更高标准';
let improve = function () {
 console.log('可以提高你的技能');
}
//属性和方法简写
let atguigu = {
 name,
 slogon,
 improve,
 change() {
 console.log('可以改变你')
 }
};
```

## 6.箭头函数

1. 如果形参只有一个，则小括号可以省略
2. 函数体如果只有一条语句，则花括号可以省略，函数的返回值为该条语句的 执行结果
3. 箭头函数 this 指向声明时所在作用域下 this 的值
4. 箭头函数不能作为构造函数实例化
5. 不能使用 arguments

```html
/**
* 1. 通用写法
*/
let fn = (arg1, arg2, arg3) => {
 return arg1 + arg2 + arg3;
}
/**
* 2. 省略小括号的情况
*/
let fn2 = num => {
 return num * 10;
};
/**
* 3. 省略花括号的情况
*/
let fn3 = score => score * 20;
/**
* 4. this 指向声明时所在作用域中 this 的值
*/
let fn4 = () => {
 console.log(this);
}
let school = {
 name: '尚硅谷',
 getName(){
 let fn5 = () => {
 console.log(this);
 }
 fn5();
 }
};
```

#### 注意：箭头函数不会更改 this 指向，用来指定回调函数会非常合适

# 7.rest 参数

ES6 引入 rest 参数，用于获取函数的实参，用来代替 arguments

1. rest 参数(随便取名字)放在形参里面

```
/**
* 作用与 arguments 类似
*/
function add(...args){
 console.log(args);
}
add(1,2,3,4,5);
/**
* rest 参数必须是最后一个形参
*/
function minus(a,b,...args){
 console.log(a,b,args);
}
minus(100,1,2,3,4,5,19);
```

#### 注意：rest 参数非常适合不定个数参数函数的场景

# 8. spread 扩展运算符

1. 语法

```
// 1[...] 扩展运算符能将「数组」转换为逗号分隔的「参数序列」
//声明一个数组
const tfboys = [' 易烊千玺','王源','王俊凯'];
// => '易烊千玺','王源'，'王俊凯
//声明一个函数
function chunwan(){
	console .1og(arguments);
	}
chunwan(... tfboys);// chunwan(" 易烊千玺',王源'，'王俊凯)
```

1. 克隆数组 
2. 合并数组
3. 将伪数组转为数组

```html
        //1. 数组的合并 情圣  误杀  唐探
        // const kuaizi = ['王太利','肖央'];
        // const fenghuang = ['曾毅','玲花'];
        // // const zuixuanxiaopingguo = kuaizi.concat(fenghuang);
        // const zuixuanxiaopingguo = [...kuaizi, ...fenghuang];
        // console.log(zuixuanxiaopingguo);

        //2. 数组的克隆
        // const sanzhihua = ['E','G','M'];
        // const sanyecao = [...sanzhihua];//  ['E','G','M']
        // console.log(sanyecao);

        //3. 将伪数组转为真正的数组
        const divs = document.querySelectorAll('div');
        const divArr = [...divs];
        console.log(divArr);// arguments
```

# 9.Symbol 基本使用

















  

































