## js异步及处理异步的几种方法

（已纳入JavaScript小记）

### 单线程

概念：只有一个线程，同一时间只能做一件事

```js
// alert不处理，js执行和DOM渲染暂时卡顿
console.log(100)
alert(200)
console.log(300)
```

原因：避免DOM渲染的冲突

解决方案：js是单线程的，一次只能完成一个任务，如果有多个任务，就需要排队，如果有一个任务耗时很长，那么后边任务就需要等待。为了解决这个问题，js将任务的执行分成两种模式：同步和异步

ps：Web Worker（HTML5）可以为 JavaScript 创造多线程环境，但是不能访问DOM。具体可以看 [Web Worker 使用教程 - 阮一峰](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

### 同步和异步

区别：是否阻塞后面程序的进行

```js
// 异步
console.log(100)
setTimeout(function() {
    console.log(200)
}, 1000)
console.log(300)

// 100 300 200
```

异步的缺点：

1、没按照书写方法执行，可读性较差

2、callback中不容易模块化

```js
// 同步
console.log(100)
alert(200)  //只有点击了确认按钮，后面的程序才会接着执行
console.log(300)
```

### 使用异步的场景

- 定时任务：setTimeout、setInterval
- 网络请求：ajax请求、动态`<img>`加载
- 事件绑定

### 事件轮询（event-loop）

事件轮询是JS实现异步的具体解决方案。

js将所有任务分为两类：同步任务和异步任务。

同步任务添加到主线程中，所有的同步任务在主线程上排队执行，形成一个执行栈，只有前一个任务执行完毕，才能执行后一个任务。

异步任务指的是，不进入主线程，会将异步任务添加到事件线程中，当满足事件触发条件后，将任务添加到事件队列（event-queue）中。

**事件轮询过程：同步的代码直接执行，异步的函数先放在异步队列中，待同步函数执行完毕后，再轮询执行异步队列的函数**

- 执行栈中的同步任务执行完毕，即主线程空闲时，此时系统会去查看任务队列，如果有可运行的异步任务就将任务添加到执行栈中开始执行。
- 如果任务队列中有多个异步任务待执行，那么这些异步任务也要排队等待被执行，并不是添加到任务队列中的异步任务就会立即执行。
- 只要主线程空了，就会去读取任务队列，这个过程是循环不断的，这就是javaScript的运行机制，也称作事件循环。

例：

```js
setTimeout(function() {
    console.log(1)
}, 100)
setTimeout(function() {
    console.log(2)
})
console.log(3)
$.ajax({
    url: 'xxx',
    success: function(result) {
        console.log(4)
    }
})

// 任务队列
	// 主进程
		console.log(3)
	// 异步队列
        // 立即被放入
        function() {
            console.log(2)
        }
        // 100ms之后放入
        function() {
            console.log(1)
        }
        // ajax加载完成时被放入（时间不确定）
        function() {
            console.log(4)
        }
```

一般说：100ms后会执行setTimeout里的回调函数，这样的说法并不严谨

准确的说是：第一个setTimeout在100ms后才会被放到异步队列中，第二个setTimeout会立刻放入异步队列，而添加到异步队列的任务，只有等到主线程执行栈中的同步任务全部执行完毕之后，才会被执行，如果主线程执行任务很多，执行时间超过100ms,那么这个函数只能等待。

**微任务和宏任务**

不同的任务源会被分配到不同的task队列中，任务源可以分为微任务（microtask）和宏任务（macrotask）。在ES6规范中，microtask称为jobs，macrotask称为task。

```js
console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0);

new Promise((resolve) => {
    console.log('Promise');
    resolve();
}).then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});

console.log('script end');

// script start => Promise => script end => promise1 => promise2 => setTimeout
```

虽然setTimeout写在Promise之前，但是Promise属于微任务而setTimeout属于宏任务。Promise.then是异步执行的，而创建Promise实例（executor）是同步执行的。

- 微任务包括process.nextTick，promise，Object.observe，MutationObserver

- 宏任务包括script，setTimeout，setInterval，setImmediate，requestAnimationFrame，I/O，UI rendering 

很多人有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了script，浏览器会先执行一个宏任务，接下来异步代码的话就先执行微任务。

所以正确的一次Event loop顺序是这样的

1、执行同步代码，这属于宏任务

2、执行栈为空，查询是否有微任务需要执行

3、执行所有微任务

4、必要的话渲染UI

5、然后开始下一轮Event loop，执行宏任务中的异步代码

#### Node.js的Event Loop

Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境。

Node.js的运行机制如下。

> （1）V8引擎解析JavaScript脚本。
>
> （2）解析后的代码，调用Node API。
>
> （3）[libuv库](https://github.com/joyent/libuv)负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
>
> （4）V8引擎再将结果返回给用户。

除了setTimeout和setInterval这两个方法，Node.js还提供了另外两个与"任务队列"有关的方法：[process.nextTick](http://nodejs.org/docs/latest/api/process.html#process_process_nexttick_callback)和[setImmediate](http://nodejs.org/docs/latest/api/timers.html#timers_setimmediate_callback_arg)。它们可以帮助我们加深对"任务队列"的理解。

process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。

setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。请看下面的例子（via [StackOverflow](http://stackoverflow.com/questions/17502948/nexttick-vs-setimmediate-visual-explanation)）。

```js
process.nextTick(function A() {
    console.log(1);
    process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
	console.log('TIMEOUT FIRED');
}, 0)
// 1
// 2
// TIMEOUT FIRED
```

上面代码中，由于process.nextTick方法指定的回调函数，总是在当前"执行栈"的尾部触发，所以不仅函数A比setTimeout指定的回调函数timeout先执行，而且函数B也比timeout先执行。这说明，如果有多个process.nextTick语句（不管它们是否嵌套），将全部在当前"执行栈"执行。

现在，再看setImmediate。

```js
setImmediate(function A() {
    console.log(1);
    setImmediate(function B(){console.log(2);});
});

setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
}, 0);
```

上面代码中，setImmediate与setTimeout(fn,0)各自添加了一个回调函数A和timeout，都是在下一次Event Loop触发。那么，哪个回调函数先执行呢？答案是不确定。运行结果可能是1--TIMEOUT FIRED--2，也可能是TIMEOUT FIRED--1--2。

我们由此得到了process.nextTick和setImmediate的一个重要区别：多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。

### js处理异步的几种方法

#### 1、回调函数

回调（callback）是一个函数被作为一个参数传递到另一个函数里，在那个函数执行完后再执行。（ B函数被作为参数传递到A函数里，在A函数执行完后再执行B ）

假定有两个函数f1和f2，f2等待f1的执行结果，f1()-->f2()；如果f1很耗时，可以改写f1，把f2写成f1的回调函数：

```jsx
function f1(callback){
　　setTimeout(function () {
　　　　callback(); // f1的任务代码
　　}, 1000);
}
f1(f2);  // 执行
```

优点：简单，方便，易用

缺点：不利于代码的阅读和维护，易形成回调函数地狱，各个部分之间高度耦合，流程会很混乱

**什么是回调地域？**

如果我们只有一个异步操作，用回调函数来处理是完全没有任何问题的。如果我们在回调函数中再嵌套一个回调函数，问题也不大。但是如果我们要嵌套很多个回调函数，问题就很大了，因为多个异步操作形成了强耦合，代码将乱作一团，无法管理。这种情况被称为"回调函数地狱"（callback hell）。

```js
$.ajax(url, () => {
	//do something...
	$.ajax(url1, () => {
		//do something...
		$.ajax(url2, () => {
			//do something...
            $.ajax(url3, () => {
                //do something...
            })
		})
	})
})

```

**注意 区分 回调函数和异步，回调是实现异步的一种手段，并不一定就是异步。**
 回调也可以是同步，如：

```js
function A(callback){
    console.log("I am A");
    callback();  //调用该函数
}
function B(){
   console.log("I am B");
}
A(B);

```

#### 2、事件监听

采用事件驱动模式，任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
监听函数有：on，bind，listen，addEventListener，observe

```js
<div id="id1">
    <div id="id2">111</div>
</div>

<script>
    document.getElementById("id1").addEventListener("click",function(){console.log('id1');});
	document.getElementById("id2").addEventListener("click",function(){console.log('id2');});
	document.getElementById("id2").addEventListener("click",function(){console.log('id2222');});
</script>

// id2 id2222 id1

```

优点：与回调函数相比，可绑定多个事件，每一个事件可指定多个回调函数，事件监听实现了代码的解耦，有利于实现模块化

缺点：使用不方便，整个程序都要变成事件驱动型，每次都要手动地绑定和触发事件

#### 3、Promise

##### promise标准

- 三种状态：pending（未加载）、resolved/fulfilled（成功）、rejected（失败）
- 初始状态pending可变为fulfilled或rejected，状态变化不可逆
- promise 必须实现 `then` 方法（可以说，then 就是 promise 的核心），而且 then 必须返回一个 promise，同一个 promise 的 then 可以调用多次，并且回调的执行顺序跟它们被定义时的顺序一致
- then 方法接受两个参数，第一个参数是成功时的回调（resolve），另一个是失败时的回调（reject）。同时，then 可以接受另一个 promise 传入，也接受一个 “类 then” 的对象或方法，即 thenable 对象。

##### promise的使用

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

##### 简单实现promise

```js
import StateMachine from 'javascript-state-machine'

// 定义promise
class MyPromise {
    constructor(fn) {
        this.successList = []
        this.failList = []
        fn(() => {
            // resolve函数
            fsm.resolve(this)
        }, () => {
            // reject函数
            fsm.reject(this)
        })
    }
    then(successFn, failFn) {
        this.successList.push(successFn)
        this.failList.push(failFn)
    }
}
// 状态机模型
var fsm = new StateMachine({
    init: 'pending',
    transitions: [
        {
            name: 'resolve',
            from: 'pending',
            to: 'fullfilled'
        },
        {
            name: 'reject',
            from: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        // 成功
        onResolve: function(state, data) {
            // 参数：state-当前状态  示例：data-fsm.resolve(xx)执行时传递过来的参数
            data.successList.forEach(fn => fn())
        },
        // 失败
        onReject: function(state, data) {
            // 参数：state-当前状态  示例：data-fsm.reject(xx)执行时传递过来的参数
            data.failList.forEach(fn => fn())
        },
        
    }
})

```

下面转自http://www.alloyteam.com/2014/05/javascript-promise-mode/

源码：https://github.com/chemdemo/promiseA/blob/master/lib/Promise.js

简单分析下思路：

构造函数 Promise 接受一个函数 `resolver`，可以理解为传入一个异步任务，resolver 接受两个参数，一个是成功时的回调，一个是失败时的回调，这两参数和通过 then 传入的参数是对等的。

其次是 then 的实现，由于 Promise 要求 then 必须返回一个 promise，所以在 then 调用的时候会新生成一个 promise，挂在当前 promise 的`_next` 上，同一个 promise 多次调用都只会返回之前生成的`_next`。

由于 then 方法接受的两个参数都是可选的，而且类型也没限制，可以是函数，也可以是一个具体的值，还可以是另一个 promise。下面是 then 的具体实现：

```js
Promise.prototype.then = function(resolve, reject) {
    var next = this._next || (this._next = Promise());
    var status = this.status;
    var x;
 
    if('pending' === status) {
        isFn(resolve) && this._resolves.push(resolve);
        isFn(reject) && this._rejects.push(reject);
        return next;
    }
 
    if('resolved' === status) {
        if(!isFn(resolve)) {
            next.resolve(resolve);
        } else {
            try {
                x = resolve(this.value);
                resolveX(next, x);
            } catch(e) {
                this.reject(e);
            }
        }
        return next;
    }
 
    if('rejected' === status) {
        if(!isFn(reject)) {
            next.reject(reject);
        } else {
            try {
                x = reject(this.reason);
                resolveX(next, x);
            } catch(e) {
                this.reject(e);
            }
        }
        return next;
    }
};

```

##### Pomise.all的使用

待**全部完成**之后统一执行

例1：

```js
let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
  resolve('success')
})

let p3 = Promise.reject('失败')

Promise.all([p1, p2]).then((result) => {
  console.log(result)               //['成功了', 'success']
}).catch((error) => {
  console.log(error)
})

Promise.all([p1,p2,p3]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)      // 失败了，打出 '失败'
})

```

例2：

```js
let wake = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time / 1000}秒后醒来`)
    }, time)
  })
}

let p1 = wake(3000)
let p2 = wake(2000)

Promise.all([p1, p2]).then((result) => {
  console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
}).catch((error) => {
  console.log(error)
})

```

**需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。**

##### 简单实现 Promise.all

```js
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
      let resultCount = 0;
      let results = new Array(promises.length);

      for (let i = 0; i < promises.length; i++) {
        promises[i].then(value => {
          resultCount++;
          results[i] = value;
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

##### Promise.race的使用

只要**有一个完成**就执行，返回为最先完成的

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // failed
})

```

##### 异常捕获

包括语法错误，逻辑错误（如图片加载错误）

```js
// 规定：then只接受一个参数，最后统一用catch捕获异常
result.then(function (img) {
    console.log(img.width)
    return img // 防止出现异常
}).then(unction (img) {
    console.log(img.height)
}).catch(function(err) {  // 最后统一catch，统一捕获异常
    console.log(err)
})

```

优点：将回调函数嵌套调用变成了链式调用，逻辑更强，执行顺序更清楚，很好地体现了开放封闭原则

缺点：代码冗余，异步操作都被包裹在Promise构造函数和then方法中，主题代码不明显，语义不清楚

#### 4、async/await

**概念**

- async/await是写异步代码的新方式
- async/await是基于Promise实现的，它不能用于普通的回调函数及节点回调
- async/await和Promise一样，是非阻塞的
- async/await使得异步代码看起来像同步代码
- async函数是generrator函数的语法糖，它相当于一个自带执行器的generator函数

**用法**

- 使用await函数必须用async标识
- await后面跟的是一个Promise实例
- 任何一个async函数都会隐式返回一个Promise，并且promise resolve的值就是return返回的值

```js
async function test() {
    return "1";
}
console.log(test());  // Promise {<resolved>: "1"}

```

- await不处理异步error

  await是不管异步过程的reject(error)消息的，async函数返回的这个Promise对象的catch函数负责统一抓取内部所有异步过程的错误；async函数内部只要有一个异步过程发生错误，整个执行过程就中断，这个返回的Promise对象的catch就能抓取到这个错误

**使用例子**

```js
function sleep() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('finish');
            resolve("sleep");
        }, 2000);
    });
}
async function test() {
    let value = await sleep();
    console.log(value);
}
test();
// finish
// sleep

```

因为await会等待sleep函数resolve，所以即使后面是同步代码，也不会先去执行同步代码再来执行异步代码。它等待后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回，返回值拿到之后，它继续向下执行。



优点：从上到下，顺序执行，就像写同步代码一样，更符合代码编写习惯，最适合处理多个Promise异步操作

缺点：滥用await可能会导致性能问题，因为await会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致失去了并发性

#### 5、generator（不是异步的直接替代方案）

参考：https://blog.csdn.net/yuefujuan_1992/article/details/89055602

generator因其中断/恢复执行和传值等优秀功能被人们用于异步处理

协程：多个线程相互协作，完成异步任务

定义：generator函数是协程在ES6的实现，最大特点就是可以交出函数的执行权（即暂停执行）。整个generator函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。

执行：返回一个内部指针，不会返回结果，返回的是指针对象{value:**,done:'true/false'}



`Generator`函数之所以可以用于异步操作是因为`yield`关键字，`Generator`函数在执行过程中遇到`yield`语句时就会暂停执行，并返回`yield`语句后面的内容，要想继续执行后续的代码就需要手动调用`next`方法。这样就找到了顺序执行异步操作的方法了，也就是将所有异步操作都放在`yield`关键字后面，同时在异步操作内配置相应的`next`方法，以便在异步操作结束后返回出操作的结果并交出执行权



形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();

```

以上代码定义了一个generator函数helloWorldGenerator，内部有两个yield表达式（“hello” “world”）,和一个return语句（结束执行）。

调用helloWorldGenerator函数后，并不执行，而是返回一个遍历器对象（lterator）,它是一个指向内部状态的指针。

然后可以调用遍历器对象的next()方法，每次调用该方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句或return语句为止。

换言之，generator函数是分段执行的，yield表达式是暂停执行的标记，next方法可以恢复执行。

```js
hw.next()
// { value: 'hello', done: false }
 
hw.next()
// { value: 'world', done: false }
 
hw.next()
// { value: 'ending', done: true }
 
hw.next()
// { value: undefined, done: true }

```

第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。

第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还没有结束。

第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。

第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

**generator异步读取文件**

```js
var fs = require('fs');
var readfile = function(filename){
  return new Promise((resolve, reject=>{
    fs.readFile(filename, (error,data)=>{
        if(error) reject(new Error('whoops');
        resolve(data);
      });
  });
}
//generator
var gen=function* (){
  var file1=yield readfile('./data1.json');
  var file2= yield readfile('./data2.json');
  console.log('done');
}
//calling code
var generator=gen();
generator.next().value.then(data=>{
  generator.next(data).value.then((data)=>{
      generator.next(data);
    }
  );
});

```

**generator函数和async函数的区别**
1、generator函数被调用后返回一个遍历器对象（lterator），async函数返回一个promise对象
2、async函数内置执行器，可以像普通函数那样调用，generator函数需要使用co模块来实现流程控制或者自定义流程控制。
3、async是generator的语法糖