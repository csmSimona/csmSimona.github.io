## 手写js代码

### √1、数据类型判断

```js
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
```



### 2、简单实现instanceof 

```js
function instance_of(left, right) {
  if (typeof left !== 'object' || left === 'null') return false // 基础类型一律为 false
  let proto = Object.getPrototypeOf(left) // 获取对象的原型
  while(true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```



### 3、实现Object.create

```js
function objCreate(obj) {
  function F() {}
  F.prototype = obj
  F.prototype.constructor = F
  return new F()
}
```



### :star:4、实现 new 关键字

new 一个对象的过程

1、创建一个新对象，如：var person = {};

2、新对象的_ proto _属性指向构造函数的原型对象。

3、将构造函数的作用域赋值给新对象。（this对象指向新对象）

4、执行构造函数内部的代码，将属性和方法添加给person中的this对象。

5、返回新对象person。

```js
function myNew(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a constructor`)
  }
  let obj = Object.create(fn.prototype)
  // 效果一样
  // let obj = new Object()
  // obj.__proto__ = fn.prototype
  let res = fn.apply(obj, args)
  return (typeof res === 'object' && res !== null) ? res : obj
}
```



### 5、手写call

```js
Function.prototype.myCall = function(thisArg, ...args) {
  if(typeof this !== 'function') {
      throw new TypeError('caller must be a function')
  }
  const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
  thisArg = thisArg || window    // 若没有传入this, 默认绑定window对象
  thisArg[fn] = this              // this指向调用call的对象,即我们要改变this指向的函数
  const result = thisArg[fn](...args)  // 执行当前函数
  delete thisArg[fn]              // 删除我们声明的fn属性
  return result                  // 返回函数执行结果
}
```



### 6、手写bind

```js
Function.prototype.myBind = function(thisArg, ...args) {
  let fn = this
  return function(...newArgs) {
    return fn.call(thisArg, ...args, ...newArgs)
  }
}
```



### √7、函数科里化

将使用多个参数的函数转换成一系列使用一个参数的函数

```js
function currying(fn, ...args) {
  if (fn.length > args.length) {
    return function(...newArgs) {
      return currying(fn, ...args, ...newArgs)
    }
  } else {
    return fn(...args)
  }
}

function add(a, b, c, d) {
  return a + b + c + d
}

var curry = currying(add)

curry(1)(2, 3)(4)
curry(1, 2)(3)(4)
```



### √8、偏函数

将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入

```js
function partial(fn, ...args) {
  return (...newArgs) => {
    return fn(...args, ...newArgs)
  }
}

function add(a, b, c) {
  return a + b + c
}
let partialAdd = partial(add, 1)
partialAdd(2, 3)
```



### √9、数组去重

https://csmsimona.github.io/myDocs/#/zh-cn/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%B1%87%E6%80%BB/JavaScript%E5%B0%8F%E8%AE%B0?id=_9%e3%80%81%e6%95%b0%e7%bb%84%e5%8e%bb%e9%87%8d%e7%9a%84%e6%96%b9%e6%b3%95

```js
var unique = arr => [...new Set(arr)]

----------------------------------------------------------------------

function unique(arr) {
  var res = arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
  return res
}

----------------------------------------------------------------------

function unique(arr) {
  let res = []
  arr.forEach((item, index) => {
    if (arr.indexOf(item) == index) {
      res.push(item)
    }
  })
  return res
}

----------------------------------------------------------------------

function unique(arr){            
  for(var i = 0; i < arr.length; i++){
    for(var j = i+1; j < arr.length; j++){
      if(arr[i] == arr[j]){         
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
```



### √10、数组扁平化

https://csmsimona.github.io/myDocs/#/zh-cn/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%B1%87%E6%80%BB/JavaScript%E5%B0%8F%E8%AE%B0?id=_10%e3%80%81%e6%95%b0%e7%bb%84%e6%8b%8d%e5%b9%b3

```js
// 数组方法flat()，默认打平一层，Infinity打平任意层
var flatArr = arr => arr.flat(Infinity)

// 递归+concat
function flatArr(arr) {
  let result = []
  arr.forEach(item => {
    if (item instanceof Array) {
      result = result.concat(flatArr(item))
    } else {
      result.push(item)
    }
  })
  return result
}


// reduce（与上一种的递归类似）
function flatArr(arr) {
  return arr.reduce((total, item) => {
    return total.concat(Array.isArray(item) ? flatArr(item) : item)
  }, [])
}

// 扩展运算符...
function flatArr(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// join()
function flatArr(arr) {
  return arr.join(',').split(',').map(Number)
}

// toString()
function flatArr(arr) {
  return arr.toString().split(',').map(Number)
}
```



### √:star:11、数组排序

#### 冒泡排序

时间复杂度 O(n*n) 稳定

原理：从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。下一轮重复以上操作，但是此时最后一个元素也就是最大数了，所以不需要再比较最后一个元素，只需要比较到length-1的位置。

```js
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]] // ES6解构赋值
      }
    }
  }
  return arr
}
```



#### 选择排序

时间复杂度 O(n*n) 不稳定

原理：遍历数组，设置最小值的索引为0，如果取出的值比当前最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引1开始重复上述操作。

```js
function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}
```



#### 插入排序

时间复杂度 O(n*n) 稳定

原理：第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作。

即：将元素插入到已排序好的数组中

```js
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j-1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
    }
  }
  return arr
}


var arr = [1,3,2,7,5,4]
insertSort(arr)
```



#### 快速排序

时间复杂度 O(nlogn) 不稳定

原理：选择基准值 mid，循环原数组，小于基准值放左边数组，大于放右边数组，然后 concat 组合，最后依靠递归完成排序。

```js
function quickSort(arr) {
  let left = [], right = [], mid = arr.splice(0, 1)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > mid) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(mid, quickSort(right))
}
```



### √:star:12、深浅拷贝

https://csmsimona.github.io/myDocs/#/zh-cn/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%B1%87%E6%80%BB/JavaScript%E5%B0%8F%E8%AE%B0?id=_1%e3%80%81%e6%b7%b1%e6%8b%b7%e8%b4%9d%e5%92%8c%e6%b5%85%e6%8b%b7%e8%b4%9d

#### 普通数组深拷贝

```js

var arr = [1,2,3,4,5]
var objArr = [{name: 'ccc'}, {age: 1}]

// 1.直接遍历
function copyArr(arr) {
  let newArr = []
  arr.forEach(item => {
    newArr.push(item)
  })
  return newArr
}

var arr1 = copyArr(arr)
var objArr1 = copyArr(objArr)
arr[0] = 2
objArr[0].name = 'qq'
console.log(arr1[0]);           // 1
console.log(objArr1[0].name);   // qq

// 2.slice()
var arr1 = arr.slice()
var objArr1 = objArr.slice()

arr[0] = 2
objArr[0].name = 'qq'
console.log(arr1[0]);           // 1
console.log(objArr1[0].name);   // qq

// 3.concat()
var arr1 = arr.concat()
var objArr1 = objArr.concat()

arr[0] = 2
objArr[0].name = 'qq'
console.log(arr1[0]);           // 1
console.log(objArr1[0].name);   // qq
```



#### 对象拷贝

```js
var obj = {
  name: 'cc',
  age: 9,
  family: ['mother', 'father']
}

// 单层深拷贝，多层浅拷贝
function shallowCopy(obj) {
  if (typeof obj !== 'object') return
  let newObj = obj instanceof Array ? [] : {}
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
// Object.assign() 类似
var newObj = Object.assign({}, obj)


// 深拷贝 （限制于对象和数组。不考虑时间，函数等）
function deepClone(obj) {
  if (typeof obj !== 'object') return
  let newObj = obj instanceof Array ? [] : {}
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}

// 深拷贝升级版（还可以拷贝函数，时间等）
function deepClone(obj, newObj) {
  for (var key in obj) {
    var val = obj[key]
    if (val instanceof Object) {
      var tempObj = new val.constructor()
      deepClone(val, tempObj)
      newObj[key] = tempObj
    } else {
      newObj[key] = val
    }
  }
}

var obj = {
  name: 'cc',
  age: 9,
  family: ['mother', 'father'],
  date: new Date(),
  say() {
    console.log('hello');
  }
}


// 序列化反序列化法
var newObj = JSON.parse(JSON.stringify(obj))
```



#### 实现 deepAssign

```js
// 实现 deepAssign({a: {b: 1, c: 2}}, {a: {c: 3}});
// => {a: {b: 1, c: 3}}

// 两个对象
function deepAssign(obj1, obj2) {
  for (let key in obj2) {
    obj1[key] = typeof obj2[key] === 'object' ? deepAssign(obj1[key], obj2[key]) : obj2[key]
  }
  return obj1
}

// 不限参数数量
function deepAssign() {
  var args = [...arguments]
  return args.reduce(deepClone, args[0])
  function deepClone(total, current) {
    if (!total) {
      total = Array.isArray(current) ? [] : {}
    }
    for (key in current) {
      total[key] = typeof current[key] === 'object' ? deepClone(total[key], current[key]) : current[key]
    }
    return total
  }
}
```



### √13、数组随机排序

```js
function randomArr(arr) {
  arr.sort(() => {
    return Math.random() > 0.5 ? -1 : 1    // Math.random() - 0.5 
  })
  return arr
}

var arr = [1, 2, 3, 4, 5, 6]
randomArr(arr)
```



### √14、防抖

```js
function debounce(fn, wait = 100) {
  let timer = 0;
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
```



### √15、节流

函数的节流和函数的去抖都是通过减少实际逻辑处理过程的执行来提高事件处理函数运行性能的手段，并没有实质上减少事件的触发次数

```js
function throttle(fn, duration) {
  var begin = new Date()
  return function(...args) {
    var current = new Date()
    if (current - begin >= duration) {
      fn.apply(this, args)
      begin = current
    }
  }
}

function throttle(fn, delay) {
  let flag = true
  return (...args) => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.call(this, ...args)
      flag = true
    }, delay)
  }
}
```



### √16、随机数

```js
function randomNum(min, max) {
  let choice = max - min + 1
  return Math.floor(Math.random() * choice + min)
}
```



### √17、随机字符串

toString(36)将数值转换成36进制，包含了0-9和a-z的所有字符

```js
function randomStr(len) {
  let str = ''
  while(str.length < len) {
    str = str + Math.random().toString(36).slice(2)
  }
  return str.slice(0, len)
}
```



### √18、斐波那契数列

```js
function fibonacci(n) {
  if (n == 0 || n == 1) return n
  return fibonacci(n-1) + fibonacci(n-2)
}


function fibonacci(n) {
  let arr = [0, 1]
  for (let i = 2; i < n; i++) {
    arr[i] = arr[i-1] + arr[i-2]
  }
  return arr[n]
}
```



### 19、继承

#### 原型链继承

```js
function Person(name) {
  this.name = name
}
Person.prototype.getName = function() {
  return this.name
}

function Teacher(name, job) {
  this.name = name
  this.job = job
}
Teacher.prototype = new Person()         // Teacher的原型指向Person的实例，实现继承
Teacher.prototype.constructor = Teacher  // 解决原型链继承后对象类型改变（变成了Person）的问题，Teacher原型的构造函数指向Teacher
Teacher.prototype.getJob = function() {
  return this.job
}

var teacher = new Teacher('cc', 'teacher');
console.log(teacher.getName());
console.log(teacher.getJob());
```



#### 借用构造函数继承

（解决包含引用类型值的原型属性会被所有实例共享的问题），但是自身也有问题

```js
function Person(name) {
  this.name = name
  this.family = ['mother', 'father']
}
Person.prototype.getName = function() {
  return this.name
}
Person.prototype.getFamily = function() {
  return this.family
}

function Teacher(name, job) {
  this.name = name
  this.job = job
  Person.call(this, name)
}
Teacher.prototype.getJob = function() {
  return this.job
}

var teacher1 = new Teacher('cc', 'teacher')
var teacher2 = new Teacher('ss', 'alsoTeacher')
teacher1.family.push('son')
console.log(teacher1.family);       // ["mother", "father", "son"]
console.log(teacher2.family);       // ["mother", "father"]  (如果是原型链继承的话 值和teacher1.family相同)
console.log(teacher1.getFamily());  // 报错：teacher1.getFamily is not a function  
console.log(teacher2.getFamily());  // 没用到原型，只能继承父类的实例属性和方法，不能继承原型属性/方法
```



#### 组合继承

（对原型链继承和构造函数继承进行组合）(常用)

问题：调用了两次父类构造函数（耗内存）

```js
function Person(name) {
  this.name = name
  this.family = ['mother', 'father']
}
Person.prototype.getName = function() {
  return this.name
}
Person.prototype.getFamily = function() {
  return this.family
}

function Teacher(name, job) {
  this.name = name
  this.job = job
  Person.call(this, name)               // 继承属性
}
Teacher.prototype = new Person()        // 继承方法
Teacher.prototype.constructor = Teacher
Teacher.prototype.getJob = function() {
  return this.job
}
var teacher1 = new Teacher('cc', 'teacher')
var teacher2 = new Teacher('ss', 'alsoTeacher')
teacher1.family.push('son')
console.log(teacher1.family);         // ["mother", "father", "son"]
console.log(teacher2.family);         // ["mother", "father"]
console.log(teacher1.getFamily());    // ["mother", "father", "son"]
console.log(teacher2.getFamily());    // ["mother", "father"]
```



#### 原型式继承

（用函数包装，原型链继承实例对象，返回函数调用）

这个函数就变成了一个可以随意增添属性的实例或对象。Object.create()就是这个原理。

```js
function createObj(obj) {
  function Fn() {}
  Fn.prototype = obj
  Fn.prototype.constructor = Fn
  return new Fn()
}
var person = {
  name: 'cc',
  family: ['mother', 'father'],
  getName() {
    return this.name
  },
  getFamily() {
    return this.family
  }
}

var teacher1 = createObj(person)
var teacher2 = createObj(person)
teacher2.name = 'ss'
teacher1.family.push('son')

console.log(teacher1.getName());    // cc
console.log(teacher2.getName());    // ss
console.log(teacher1.getFamily());  // ["mother", "father", "son"]
console.log(teacher2.getFamily());  // ["mother", "father", "son"]  和原型链继承有一样的问题，引用类型的原型属性被共享了
```



#### 寄生式继承

在原型式继承的基础上，通过调用函数创建一个新对象

可以给这个对象新增属性和方法（增强对象）

```js
function createObj(obj) {
  function Fn() {}
  Fn.prototype = obj
  Fn.prototype.constructor = Fn
  return new Fn()
}

function createPerson(person) {
  var newPerson = createObj(person)       // 通过调用函数创建一个新对象
  newPerson.getName = function() {        // 可以给这个对象新增属性和方法（增强对象）
    return this.name
  }
  newPerson.getFamily = function() {
    return this.family
  }
  return newPerson
}
var person = {
  name: 'cc',
  family: ['mother', 'father']
}

var teacher1 = createPerson(person)
var teacher2 = createPerson(person)
teacher2.name = 'ss'
teacher1.family.push('son')

console.log(teacher1.getName());    // cc
console.log(teacher2.getName());    // ss
console.log(teacher1.getFamily());  // ["mother", "father", "son"]
console.log(teacher2.getFamily());  // ["mother", "father", "son"]  和原型链继承有一样的问题，引用类型的原型属性被共享了
```



#### 寄生组合式继承

（解决组合继承中调用两次超类型构造函数的问题）（常用）

核心：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

```js
function Person(name) {
  this.name = name
}
Person.prototype.getName = function() {
  return this.name
}

function Teacher(name, job) {
  this.name = name
  this.job = job
  Person.call(this, name)               // 继承属性
}

function createObj(obj) {
  function Fn() {}
  Fn.prototype = obj
  Fn.prototype.constructor = Fn
  return new Fn()
}
// 继承方法
function inheritPrototype(parent, child) {
  child.prototype = createObj(parent.prototype)   // 复制父类原型
  child.prototype.constructor = child             // 构造函数指回Teacher
}

// 复制父类原型，用该函数替换组合继承中为子类型原型赋值的语句
inheritPrototype(Person, Teacher);
// Teacher.prototype = new Person();
// Teacher.prototype.constructor = Teacher;
Teacher.prototype.getJob = function() {
  return this.job
}

var teacher = new Teacher('cc', 'teacher')
console.log(teacher.getName());
console.log(teacher.getJob());
```



#### class继承

```js
class Person {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

class Teacher extends Person {
  constructor(name, job) {
    super(name)
    this.job = job
  }
  getJob() {
    return this.job
  }
}

var teacher = new Teacher('cc', 'teacher')
console.log(teacher.getName());
console.log(teacher.getJob());
```



### 20、事件总线（发布订阅模式）

实现思路

1、创建一个对象

2、在该对象上创建一个缓存列表（调度中心）

3、on 方法用来把函数 fn 都加到缓存列表中（订阅者注册事件到调度中心）

4、emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应缓存列表中的函数（发布者发布事件到调度中心，调度中心处理代码）

5、off 方法可以根据 event 值取消订阅（取消订阅）

6、once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）

```js
class EventEmitter {
  constructor() {
    this.cache = {}
  }
  // 订阅
  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = [fn]
    }
  }
  // 取消订阅
  off(name, fn) {
    let tasks = this.cache[name]
    if (tasks) {
      const index = tasks.findIndex(f => f === fn || f.callback === fn)
      if (index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }
  // 发布（once默认为false，为true时表示只订阅一次）
  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      let tasks = this.cache[name].slice()
      for(let fn of tasks) {
        fn(...args)
      }
      if (once) {
        delete this.cache[name]
      }
    }
  }
}

// 测试
let eventBus = new EventEmitter()
let fn1 = function(name) {
  console.log('name', name)
}
let fn2 = function(age) {
  console.log('age', age)
}
let fn3 = function(age) {
  console.log('my age is', age)
}
eventBus.on('event1', fn1)
eventBus.on('event2', fn2)
eventBus.on('event2', fn3)
eventBus.emit('event1', false, 'ccc')	// name ccc
eventBus.emit('event2', false, 24)		// age 24  my age is 24
```



### 21、字符串模板

```js
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
      const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
      template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
      return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: 'ccc',
    age: 12
}
render(template, person); // 我是ccc，年龄12，性别undefined
```



### 22、Promise

#### promise的使用

```js
function loadImg(src) {
  const promise = new Promise(function(resolve, reject) {
      var img = document.createElement('img')
      img.onload = function() {
          resolve(img)
      }
      img.onerror = function() {
          reject()
      }
      img.src = src
  })
  return promise
}

var src = 'xxx.png'
var result = loadImg(src)
result.then(function(img) {
  console.log(img.width)
}, function() {
  console.log('failed')
})
```



#### promise的实现

Promise 实现梳理：

链式调用

错误捕获（冒泡）

```js
const PENDING = 'PENDING';      // 进行中
const FULFILLED = 'FULFILLED';  // 已成功
const REJECTED = 'REJECTED';    // 已失败

class Promise {
  constructor(exector) {
    // 初始化状态
    this.status = PENDING;
    // 将成功、失败结果放在this上，便于then、catch访问
    this.value = undefined;
    this.reason = undefined;
    // 成功态回调函数队列
    this.onFulfilledCallbacks = [];
    // 失败态回调函数队列
    this.onRejectedCallbacks = [];

    const resolve = value => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 成功态函数依次执行
        this.onFulfilledCallbacks.forEach(fn => fn(this.value));
      }
    }
    const reject = reason => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 失败态函数依次执行
        this.onRejectedCallbacks.forEach(fn => fn(this.reason))
      }
    }
    try {
      // 立即执行executor
      // 把内部的resolve和reject传入executor，用户可调用resolve和reject
      exector(resolve, reject);
    } catch(e) {
      // executor执行出错，将错误内容reject抛出去
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function'? onRejected:
      reason => { throw new Error(reason instanceof Error ? reason.message:reason) }
    // 保存this
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          // try捕获错误
          try {
            // 模拟微任务
            setTimeout(() => {
              const result = onFulfilled(self.value);
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof Promise ? result.then(resolve, reject) :
              resolve(result)
            })
          } catch(e) {
            reject(e);
          }
        });
        self.onRejectedCallbacks.push(() => {
          // 以下同理
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              // 不同点：此时是reject
              result instanceof Promise ? result.then(resolve, reject) : 
              reject(result)
            })
          } catch(e) {
            reject(e);
          }
        })
      } else if (self.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(self.value)
            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
          });
        } catch(e) {
          reject(e);
        }
      } else if (self.status === REJECTED){
        try {
          setTimeout(() => {
            const result = onRejected(self.reason);
            result instanceof Promise ? result.then(resolve, reject) : reject(result)
          })
        } catch(e) {
          reject(e)
        }
      }
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  static resolve(value) {
    if (value instanceof Promise) {
      // 如果是Promise实例，直接返回
      return value;
    } else {
      // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
      return new Promise((resolve, reject) => resolve(value));
    }
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }
}

Promise.prototype.finally = function(callback) {
  this.then(value => {
    return Promise.resolve(callback()).then(() => {
      return value
    })
  }, error => {
    return Promise.resolve(callback()).then(() => {
      throw error
    })
  })
}
```



#### 实现Promise.resolve

静态方法梳理：

1、传参为一个 Promise，则直接返回它。

2、传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态。

3、其他情况，直接返回以该值为成功状态的 promise 对象。

```js
Promise.resolve = (param) => {
  if (param instanceof Promise) return param // 符合 1
  return new Promise((resolve, reject) => {
    if (param && param.then && typeof param.then === 'function') { // 符合 2
      // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
      param.then(resolve, reject)
    } else { // 符合 3
      resolve(param)
    }
  })
}
```



#### 实现Promise.reject

冒泡捕获

```js
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
      reject(reason)
  })
}
```



#### 实现promise.all

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let resultCount = 0
    let results = new Array(promises.length)

    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        resultCount++
        results[i] = value
        if (resultCount === promises.length) {
          return resolve(results)
        }
      }, error => {
        reject(error)
      })
    }
  })
}

let p1 = new Promise(resolve => resolve('p1'))
let p2 = new Promise(resolve => resolve('p2'))
let p3 = Promise.reject('p3 error')

promiseAll([p1, p2]).then(results => {
  console.log(results)    // ['p1', 'p2']
}).catch(error => {
  console.log(error)
})

promiseAll([p1, p2, p3]).then(results => {
  console.log(results)
}).catch(error => {
  console.log(error)      // 'p3 error'
})
```



#### 实现promise.race

```js
function PromiseRace(promises) {
  return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
          promises[i].then(value => {
              return resolve(value)
          }, error => {
              reject(error)
          })
      }
  })
}

let p1 = new Promise(resolve => resolve('p1'))
let p2 = new Promise(resolve => resolve('p2'))
let p3 = Promise.reject('p3 error')

promiseAll([p1, p2]).then(results => {
  console.log(results)    
}).catch(error => {
  console.log(error)
})
// p1

promiseAll([p1, p2, p3]).then(results => {
  console.log(results)
}).catch(error => {
  console.log(error)      
})
// p1
```



### √23、根据数组中对象的某一个属性值进行排序

```js
var arr = [
  { name: 'baby', age: 0 },
  { name: 'aaa', age: 18 },
  { name: 'bbb', age: 8 }
];

// 方法一
function compare(property){
  return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
  }
}
arr.sort(compare('age'))

// 方法二
arr.sort((a,b) => a.age - b.age)
```



### 24、ajax

```js
let xhr = new XMLHttpRequest()      // 创建Ajax对象
xhr.open('get', '/xx', true)        // xhr发送请求    
// true 异步 false 同步 true是在等待服务器响应时执行其他脚本，当响应就绪后对响应进行处理；false是等待服务器响应再执行
xhr.onreadystatechange = function() { 
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    }
  }
}
xhr.send()    // 如果是post  send(data)
```



### 25、封装一个jsonp

```js
function jsonp({url, params, callbackName}) {
  function generateUrl() {
    let dataUrl = ''
    for (let key in params) {
      dataUrl += `${key}=${params[key]}&`
    }
    return `${url}?${dataUrl}callback=${callbackName}`
  }

  return new Promise((resolve, reject) => {
    let scriptEle = document.createElement('script')
    scriptEle.src = generateUrl()
    document.appendChild(scriptEle)
  
    window[callbackName] = data => {
      resolve(data)
      document.removeChild(scriptEle)
    }
  })
}


jsonp({
  url: 'http://xxx', 
  params: {
    name: 'ccc',
    age: 22
  }, 
  callbackName: 'callback1'
}).then((data) => {
  console.log(data);
})
```



### 26、利用 async await 实现 sleep 效果

```js
function sleep(fn, delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(fn)
    }, delay)
  })
}

function sayHello(name) {
  console.log('hello, ' + name);
}

async function test() {
  await sleep(sayHello('ccc'), 1000)
  await sleep(sayHello('sss'), 1000)
  await sleep(sayHello('mmm'), 1000)
}

test()
```



### 27、图片懒加载

首先，给所有的图片一个占位资源：

```html
<img src="default.jpg" data-src="https://www.xxx.com/target-1.jpg" />
<img src="default.jpg" data-src="https://www.xxx.com/target-2.jpg" />
......
<img src="default.jpg" data-src="https://www.xxx.com/target-39.jpg" />
```

#### 1、clientHeight、scrollTop 和 offsetTop

```js
let imgs = document.getElementsByTagName('img'),
    count = 0

function lazyLoad() {
  let clientHeight = document.documentElement.clientHeight
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  for (let i = count; i < imgs.length; i++) {
    if (clientHeight + scrollTop > imgs[i].offsetHeight) {
      if (imgs[i].getAttribute('src') !== 'default.jpg') continue
      imgs[i].src = imgs[i].getAttribute('data-src')
      count++
    }
  }
}
// 首次加载
lazyLoad()
// 通过监听 scroll 事件来判断图片是否到达视口，别忘了防抖节流
window.addEventListener('scroll', throttle(lazyLoad, 160))
```



#### 2、getBoundingClientRect

dom 元素的 getBoundingClientRect().top 属性可以直接判断图片是否出现在了当前视口。

只修改一下 lazyLoad 函数

```js
function lazyLoad() {
  for (let i = count; i < imgs.length; i++) {
    if (imgs[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
      if (imgs[i].getAttribute('src') !== 'default.jpg') continue
      imgs[i].src = imgs[i].getAttribute('data-src')
      count++
    }
  }
}
```



#### 3、IntersectionObserver

IntersectionObserver 浏览器内置的 API，实现了监听 window 的 scroll 事件、判断是否在视口中 以及 节流 三大功能。该 API 需要 polyfill。

```js
let imgs = document.getElementsByTagName('img')

const observe = new IntersectionObserver(() => {
  for(let i = 0; i < imgs.length; i++) {
    // 通过这个属性判断是否在视口中，返回 boolean 值
    if (imgs[i].isIntersecting) {
      const imgElement = img.target
      imgElement.src = imgElement.getAttribute('data-src')
      observe.unobserve(imgElement)   // 解除观察
    }
  }
})

Array.from(imgs).forEach(item => observe.observe(item))
```



### 28、事件委托应用

#### 给li绑定点击事件

```html
<ul>
    <li>知否知否，点我应有弹框在手！</li>
    <li>知否知否，点我应有弹框在手！</li>
    <li>知否知否，点我应有弹框在手！</li>
    <li>知否知否，点我应有弹框在手！</li>
    <li>知否知否，点我应有弹框在手！</li>
</ul>
```

```js
let ul = document.querySelector('ul')
ul.addEventListener('click', function() {
  if (e.target.tagName.toLowerCase() == 'li') {
    e.target.style.backgroundColor = 'blue'
  }
})
```



#### 通用的事件绑定函数

```js
function bindEvent(elem, type, selector, fn) {
  if (fn = null) {
    fn = selector;
    selector = null;
  }
  elem.addEventListener(type, function(e){
    var target;
    if (selector) {
      target = e.target;
      // matches 用来判断当前DOM节点能否完全匹配对应的CSS选择器规则；
      // 如果匹配成功，返回true，反之则返回false。
      if (target.matches(selector)) {
        fn.call(target, e);
      }
    } else {
      fn(e);
    }
  })
}

// 使用代理
var div1 = document.getElementById('div1');
bindEvent(div1, 'click', 'a', function(e){
  console.log(this.innerHtml);
})
// 不使用代理
var a = document.getElementById('a1');
bindEvent(a, 'click', function(e){
  console.log(a.innerHtml);
})
```



### 29、用正则实现 trim()    去掉首位多余的空格

```js
// 去掉首位多余的空格
function trim(str) {
  return str.replace(/^\s+|\s+$/g, '')
}
```



### 30、数字转字符串千分位（暂时没有掌握）

#### 方法一:利用字符串提供的toLocaleString()方法处理,此方法最简单

```js
var num = 1450068;
console.log(num.toLocaleString()) // 1,450,068
```



#### 方法二:截取末尾三个字符的功能可以通过字符串类型的slice、substr或substring方法做到

```js
function toThousandsNum(num) {
  var num = (num || 0).toString(),
        result = '';

   while (num.length > 3) {
       //此处用数组的slice方法，如果是负数，那么它规定从数组尾部开始算起的位置
       result = ',' + num.slice(-3) + result;
       num = num.slice(0, num.length - 3);
   }
   // 如果数字的开头为0,不需要逗号
   if (num){
     result = num + result
   }
   return result;
}

console.log(toThousandsNum(000123456789123)) // 123,456,789,123
```



#### 方法三:

把数字通过toString，转换成字符串后，打散为数组，再从末尾开始，逐个把数组中的元素插入到新数组（result）的开头，每插入一个元素，counter就计一次数（加1），当counter为3的倍数时,利用取余的方式,就插入一个逗号，但是要注意开头（i为0时）不需要逗号。最后通过调用新数组的join方法得出结果

```js
function toThousands(num) {
  var result = [],
  counter = 0;
  num = (num || 0).toString().split('');
  for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result.unshift(num[i]);
      if (!(counter % 3) && i != 0) {
         result.unshift(',');
      }
  }
  return result.join('');
}
console.log(toThousands(236471283572983412)); // 236,471,283,572,983,420
```



#### 方法四:不把字符串打散为数组，始终对字符串操作,下面的这种操作字符串的方式是对上面的改良

```js
function toThousands(num) {
  var result = '',
  counter = 0;
  num = (num || 0).toString();
  for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i != 0) {
        result = ',' + result;
          
      }
  }
  return result;
}
console.log(toThousands(42371582378423))  // 42,371,582,378,423
```



#### 方法五:正则表达式,此方法个人觉得比较难以理解,网上大牛写的

```js
function toThousands(num) {
  var numStr = (num || 0).toString();
   return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}


function thousandth(str) {
  return str.replace(/\d(?=(?:\d{3})+(?:\.\d+|$))/g, '$&,');
}
```



31、文件大小单位转换

```js
function formatSizeUnits(kb) {
  let units = ['KB', 'MB', 'GB', 'TB', 'PB'];
  let unitIndex = 0;

  while (kb >= 1024 && unitIndex < units.length - 1) {
    kb /= 1024;
    unitIndex++;
  }

  return `${kb.toFixed(2)} ${units[unitIndex]}`;
}
```
