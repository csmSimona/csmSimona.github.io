# nodejs学习笔记

## Node.js是什么

- Node.js不是一门语言，也不是库、框架，它是一个JavaScript运行时环境。
- 简单来讲就是Node.js可以解析和执行JavaScript代码
- 浏览器中的JavaScript
  - EcmaScript
  - BOM
  - DOM
- 构建于Chrome的V8引擎之上
  - 代码只是具有特定格式的字符串而已
  - 引擎可以认识它，可以帮你去解析和执行
  - Node.js的作者把Google Chrome中的V8引擎移植了出来，开发了一个独立的JavaScript运行时环境
- Node.js特性
  - 事件驱动
  - 非阻塞IO模型（异步）
- npm是Node.js开发的
  - npm是世界上最大的开源库生态系统
  - 绝大多数JavaScript相关的包都存放在了npm上，这样做的目的是为了让开发人员更方便的去下载使用

## Node.js 中的 JavaScript

- **没有 BOM、DOM**
- EcmaScript 
- 在 Node 中为 JavaScript 提供了一些服务器级别的 API
  - 文件操作的能力，例如文件读写

    ```js
    //读取文件.js
    
    // 浏览器中的 JavaScript 是没有文件操作的能力的
    // 但是 Node 中的 JavaScript 具有文件操作的能力
    
    // fs 是 file-system 的简写，就是文件系统的意思
    // 在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块
    // 在 fs 这个核心模块中，就提供了所有的文件操作相关的 API
    // 例如：fs.readFile 就是用来读取文件的
    
    // 1. 使用 require 方法加载 fs 核心模块
    var fs = require('fs')
    
    // 2. 读取文件
    //    第一个参数就是要读取的文件路径
    //    第二个参数是一个回调函数
    //          
    //        成功
    //          data 数据
    //          error null
    //        失败
    //          data undefined没有数据
    //          error 错误对象
    fs.readFile('./data/hello.txt', function (error, data) {
      // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a>
      // 文件中存储的其实都是二进制数据 0 1
      // 这里为什么看到的不是 0 和 1 呢？原因是二进制转为 16 进制了
      // 但是无论是二进制01还是16进制，人类都不认识
      // 所以我们可以通过 toString 方法把其转为我们能认识的字符
      // console.log(data)
    
      // console.log(error)
      // console.log(data)
    
      // 在这里就可以通过判断 error 来确认是否有错误发生
      if (error) {
        console.log('读取文件失败了')
      } else {
        console.log(data.toString())
      }
    })
    
    ```

    ```js
    //写文件.js
    var fs = require('fs')
    
    // $.ajax({
    //   ...
    //   success: function (data) {
        
    //   }
    // })
    
    // 第一个参数：文件路径
    // 第二个参数：文件内容
    // 第三个参数：回调函数
    //    error
    //    
    //    成功：
    //      文件写入成功
    //      error 是 null
    //    失败：
    //      文件写入失败
    //      error 就是错误对象
    fs.writeFile('./data/你好.md', '大家好，给大家介绍一下，我是Node.js', function (error) {
      // console.log('文件写入成功')
      // console.log(error)
      if (error) {
        console.log('写入失败')
      } else {
        console.log('写入成功了')
      }
    })
    
    ```

  - 网络服务的构建

  - 网络通信

  - http服务器

    ```js
    // 可以使用 Node 非常轻松的构建一个 Web 服务器
    // 在 Node 中专门提供了一个核心模块：http
    // http 这个模块的职责就是帮你创建编写服务器的
    
    // 1. 加载 http 核心模块
    var http = require('http')
    
    // 2. 使用 http.createServer() 方法创建一个 Web 服务器
    //    返回一个 Server 实例
    var server = http.createServer()
    
    // 3. 服务器要干嘛？
    //    提供服务：对数据的服务
    //    发送请求
    //    接收请求
    //    处理请求
    //    给个反馈（发送响应）
    //    注册 request 请求事件
    //    当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数
    server.on('request', function () {
      console.log('收到客户端的请求了')
    })
    
    // 4. 绑定端口号，启动服务器
    server.listen(3000, function () {
      console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
    })
    
    ```

    ```js
    //http-res.js
    var http = require('http')
    
    var server = http.createServer()
    
    // request 请求事件处理函数，需要接收两个参数：
    //    Request 请求对象
    //        请求对象可以用来获取客户端的一些请求信息，例如请求路径
    //    Response 响应对象
    //        响应对象可以用来给客户端发送响应消息
    server.on('request', function (request, response) {
      // http://127.0.0.1:3000/ /
      // http://127.0.0.1:3000/a /a
      // http://127.0.0.1:3000/foo/b /foo/b
      console.log('收到客户端的请求了，请求路径是：' + request.url)
    
      // response 对象有一个方法：write 可以用来给客户端发送响应数据
      // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
      response.write('hello')
      response.write(' nodejs')
    
      // 告诉客户端，我的话说完了，你可以呈递给用户了
      response.end()
    
      // 由于现在我们的服务器的能力还非常的弱，无论是什么请求，都只能响应 hello nodejs
      // 思考：
      //  我希望当请求不同的路径的时候响应不同的结果
      //  例如：
      //  / index
      //  /login 登陆
      //  /register 注册
      //  /haha 哈哈哈
    })
    
    server.listen(3000, function () {
      console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
    })
    
    ```

    ```js
    //http-url-res.js
    var http = require('http')
    
    // 1. 创建 Server
    var server = http.createServer()
    
    // 2. 监听 request 请求事件，设置请求处理函数
    server.on('request', function (req, res) {
      console.log('收到请求了，请求路径是：' + req.url)
      console.log('请求我的客户端的地址是：', req.socket.remoteAddress, req.socket.remotePort)
    
      // res.write('hello')
      // res.write(' world')
      // res.end()
    
      // 上面的方式比较麻烦，推荐使用更简单的方式，直接 end 的同时发送响应数据
      // res.end('hello nodejs')
    
      // 根据不同的请求路径发送不同的响应结果
      // 1. 获取请求路径
      //    req.url 获取到的是端口号之后的那一部分路径
      //    也就是说所有的 url 都是以 / 开头的
      // 2. 判断路径处理响应
    
      var url = req.url
    
      if (url === '/') {
        res.end('index page')
      } else if (url === '/login') {
        res.end('login page')
      } else if (url === '/products') {
        var products = [{
            name: '苹果 X',
            price: 8888
          },
          {
            name: '菠萝 X',
            price: 5000
          },
          {
            name: '小辣椒 X',
            price: 1999
          }
        ]
    
        // 响应内容只能是二进制数据或者字符串
        //  数字
        //  对象
        //  数组
        //  布尔值
        res.end(JSON.stringify(products))
      } else {
        res.end('404 Not Found.')
      }
    })
    
    // 3. 绑定端口号，启动服务
    server.listen(3000, function () {
      console.log('服务器启动成功，可以访问了。。。')
    })
    
    ```


## 模块系统

- 在 Node 中没有全局作用域的概念
- 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
- require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
  - 模块完全是封闭的
  - 外部无法访问内部
  - 内部也无法访问外部
- 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
- 但是某些情况下，模块与模块是需要进行通信的
- 在每个模块中，都提供了一个对象：`exports`
- 该对象默认是一个空对象
- 你要做的就是把需要被外部访问使用的成员手动的挂载到 `exports` 接口对象中
- 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象

## 核心模块

- 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
  - fs 文件操作模块

  - http 网络服务构建模块

  - os 操作系统信息模块

  - path 路径处理模块

    ```js
    // 用来获取机器信息的
    var os = require('os')
    
    // 用来操作路径的
    var path = require('path')
    
    // 获取当前机器的 CPU 信息
    console.log(os.cpus())
    
    // memory 内存
    console.log(os.totalmem())
    
    // 获取一个路径中的扩展名部分
    // extname extension name
    console.log(path.extname('c:/a/b/c/d/hello.txt'))
    ```

- 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：

  - `var fs = require('fs')`          (require是同步的)

    加载
    
    ```js
    //a.js
    // require 是一个方法
    // 它的作用就是用来加载模块的
    // 在 Node 中，模块有三种：
    //    具名的核心模块，例如 fs、http
    //    用户自己编写的文件模块
    //      相对路径必须加 ./
    //      可以省略后缀名
    //      相对路径中的 ./ 不能省略，否则报错
    //    在 Node 中，没有全局作用域，只有模块作用域
    //      外部访问不到内部
    //      内部也访问不到外部
    //      默认都是封闭的
    //    既然是模块作用域，那如何让模块与模块之间进行通信
    //    有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要是为了使用里面的某个成员
    
    var foo = 'aaa'
    
    console.log('a start')
    
    function add(x, y) {
      return x + y
    }
    
    // Error: Cannot find module 'b'
    // require('b')
    
    // 可以
    // require('./b.js')
    
    // 推荐：可以省略后缀名
    require('./b')
    
    console.log('a end')
    
    console.log('foo 的值是：', foo)
    
    // b.js
    console.log('b start')
    
    // console.log(add(10, 20))
    
    var foo = 'bbb'
    
    require('./c.js')
    console.log('b end')
    
    // c.js
    console.log('b start')
    
    // console.log(add(10, 20))
    
    var foo = 'bbb'
    
    require('./c.js')
    console.log('b end')
    
    ```
    
    导出

    ```js
    // a.js
    // require 方法有两个作用：
    //    1. 加载文件模块并执行里面的代码
    //    2. 拿到被加载文件模块导出的接口对象
    //    
    //    在每个文件模块中都提供了一个对象：exports
    //    exports 默认是一个空对象
    //    你要做的就是把所有需要被外部访问的成员挂载到这个 exports 对象中
    var bExports = require('./b')
    var fs = require('fs')
    
    console.log(bExports.foo)
    
    console.log(bExports.add(10, 30))
    
    console.log(bExports.age)
    
    bExports.readFile('./a.js')
    
    fs.readFile('./a.js', function (err, data) {
      if (err) {
        console.log('读取文件失败')
      } else {
        console.log(data.toString())
      }
    })
    
    // b.js
    var foo = 'bbb'
    
    // console.log(exports)
    
    exports.foo = 'hello'
    
    exports.add = function (x, y) {
      return x + y
    }
    
    exports.readFile = function (path, callback) {
      console.log('文件路径：', path)
    }
    
    var age = 18
    
    exports.age = age
    
    function add(x, y) {
      return x - y
    }
    
    ```
    
    

## web服务器开发

- require
- 端口号
  - ip 地址定位计算机

  - 端口号定位具体的应用程序

  - 一切需要联网通信的软件都会占用一个端口号

  - 端口号的范围从0-65536之间

  - 在计算机中有一些默认端口号，最好不要去使用，例如http服务的80

  - 我们在开发过程中使用一些简单好记的就可以了，例如3000、5000等没什么含义的

    ```js
    // ip 地址用来定位计算机
    // 端口号用来定位具体的应用程序
    // 所有需要联网通信的应用程序都会占用一个端口号
    
    var http = require('http')
    
    var server = http.createServer()
    
    // 2. 监听 request 请求事件，设置请求处理函数
    server.on('request', function (req, res) {
      console.log('收到请求了，请求路径是：' + req.url)
      console.log('请求我的客户端的地址是：', req.socket.remoteAddress, req.socket.remotePort)
    
      res.end('hello nodejs')
    })
    
    server.listen(5000, function () {
      console.log('服务器启动成功，可以访问了。。。')
    })
    
    ```

- Content-Type
  - 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉

  - 不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons

  - 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题

    ```js
    // require
    // 端口号
    
    var http = require('http')
    
    var server = http.createServer()
    
    server.on('request', function (req, res) {
      // 在服务端默认发送的数据，其实是 utf8 编码的内容
      // 但是浏览器不知道你是 utf8 编码的内容
      // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
      // 中文操作系统默认是 gbk
      // 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
      // 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      // res.end('hello 世界')
    
      var url = req.url
    
      if (url === '/plain') {
        // text/plain 就是普通文本
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('hello 世界')
      } else if (url === '/html') {
        // 如果你发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<p>hello html <a href="">点我</a></p>')
      }
    })
    
    server.listen(3000, function () {
      console.log('Server is running...')
    })
    
    ```

- 通过网络发送文件
  - 发送的并不是文件，本质上来讲发送是文件的内容

  - 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理

    ```js
    // 1. 结合 fs 发送文件中的数据
    // 2. Content-Type
    //    http://tool.oschina.net/commons
    //    不同的资源对应的 Content-Type 是不一样的
    //    图片不需要指定编码
    //    一般只为字符数据才指定编码
    
    var http = require('http')
    var fs = require('fs')
    
    var server = http.createServer()
    
    server.on('request', function (req, res) {
      // / index.html
      var url = req.url
    
      if (url === '/') {
        // 肯定不这么干
        // res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><h1>首页</h1></body>/html>')
    
        // 我们要发送的还是在文件中的内容
        fs.readFile('./resource/index.html', function (err, data) {
          if (err) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end('文件读取失败，请稍后重试！')
          } else {
            // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
            // res.end() 支持两种数据类型，一种是二进制，一种是字符串
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(data)
          }
        })
      } else if (url === '/xiaoming') {
        // url：统一资源定位符
        // 一个 url 最终其实是要对应到一个资源的
        fs.readFile('./resource/ab2.jpg', function (err, data) {
          if (err) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end('文件读取失败，请稍后重试！')
          } else {
            // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
            // res.end() 支持两种数据类型，一种是二进制，一种是字符串
            // 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
            res.setHeader('Content-Type', 'image/jpeg')
            res.end(data)
          }
        })
      }
    })
    
    server.listen(3000, function () {
      console.log('Server is running...')
    })
    
    ```

## 代码风格

- [JavaScript Standard Style](https://standardjs.com/)

- Airbnb JavaScript Style

- 当一行代码是以：( 、[、`（反引号），开头的时候，则在前面补上一个分号用以避免一些语法解析错误。

  所以你会发现在一些第三方的代码中能看到一上来就以一个 ; 开头。

## 在node中使用`art-template`模板引擎

在 Node 中使用 art-template 模板引擎

模板引起最早就是诞生于服务器领域，后来才发展到了前端。

1. 安装 npm install art-template

2. 在需要使用的文件模块中加载 art-template

3. 查文档，使用模板引擎的 API

```html
<!-- tpl.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ title }}</title>
</head>
<body>
  <p>大家好，我叫：{{ name }}</p>
  <p>我今年 {{ age }} 岁了</p>
  <h1>我来自 {{ province }}</h1>
  <p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</p>
  <script>
    var foo = '{{ title }}'
  </script>
</body>
</html>
```

```js
var template = require('art-template')
var fs = require('fs')

fs.readFile('./tpl.html', function (err, data) {
  if (err) {
    return console.log('读取文件失败了')
  }
  // 默认读取到的 data 是二进制数据
  // 而模板引擎的 render 方法需要接收的是字符串
  // 所以我们在这里需要把 data 二进制数据转为 字符串 才可以给模板引擎使用
  var ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
      '写代码',
      '唱歌',
      '打游戏'
    ],
    title: '个人信息'
  })

  console.log(ret)
})
```



## 客户端渲染和服务端渲染

有两张图

- 客户端渲染

  1.第一次请求拿到的是页面

  2.第二次请求拿到的是数据

  浏览器渲染过程： 

  ​	1.收到服务端响应的字符串了

  ​	2.从上到下一次解析，在解析的过程中，如果发现ajax请求，则再次发起新的请求

  ​	3.发请求

  ​	4.拿到ajax响应结果

  ​	5.模板引擎渲染

- 服务端渲染

  - 在服务端使用模板引擎

  - 模板引擎最早诞生于服务端，后来才发展到了前端

  - 对于服务端渲染来说，只请求了一次。服务端渲染，响应的就是最终的结果。客户端不需要再做任何处理

  - 服务器渲染过程：

    1.读取index.html

    2.模板引起渲染，在发送给客户端之前，我在服务端就已经把index.html渲染处理了

- 服务端渲染和客户端渲染的区别

  - 客户端渲染不利于 SEO 搜索引擎优化
  - 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
  - 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
  - 而是两者结合来做的
  - 例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
  - 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染

- 如何通过服务器让客户端重定向？

  1.状态码设置为 302 临时重定向`statusCode`

  2.在响应头中通过 Location 告诉客户端往哪儿重定向`setHeader`

  ​	如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求

  ```js
  res.statusCode = 302
  res.setHeader('Location', 要跳转的路径)
  ```

## exports 和 module.exports 的区别

- 每个模块中都有一个 module 对象，module 对象中有一个 exports 对象
- 我们可以把需要导出的成员都挂载到 module.exports 接口对象中，也就是：`moudle.exports.xxx = xxx` 的方式
- 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
- 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
- `exports === module.exports` 结果为  `true`
- 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
- 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
- 不要使用 `exports = xxx` 不管用
- 因为每个模块最终向外 `return` 的是 `module.exports`
- 而 `exports` 只是 `module.exports` 的一个引用
- 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
- 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的

```js
moudle.exports = {
  a: 123
}

// 重新建立 exports 和 module.exports 之间的引用关系
exports = module.exports

exports.foo = 'bar'
```

## require 方法加载规则（模块查找机制）

- 优先从缓存加载
- 核心模块
- 路径形式的模块
- 第三方模块

  - 凡是第三方模块都必须通过 npm 来下载，通过 require('包名') 的方式来进行加载才可以使用

  - 不可能有任何一个第三方包和核心模块的名字是一样的

  - - ​     node_modules/art-template/

    - ​     node_modules/art-template/package.json

    - ​     node_modules/art-template/package.json main

    - ​    如果 package.json 文件不存在或者 main 指定的入口模块是也没有，则 node 会自动找该目录下的 index.js，也就是说 index.js 会作为一个默认备选项；

    - ​     进入上一级目录找 node_modules

    - ​     按照这个规则依次往上找，直到磁盘根目录还找不到，最后报错：Can not find moudle xxx

  - 一个项目有且仅有一个 node_modules 而且是存放到项目的根目录

## 模块标识中的 `/` 和文件操作路径中的 `/`

- 文件操作中的相对路径可以省略 ./

     ```js
     // 在文件操作的相对路径中
     //    ./data/a.txt 相对于当前目录
     //    data/a.txt   相对于当前目录
     //    /data/a.txt  绝对路径，当前文件模块所处磁盘根目录
     //    c:/xx/xx...  绝对路径
     fs.readFile('./data/a.txt', function (err, data) {
       if (err) {
         console.log(err)
         return console.log('读取失败')
       }
       console.log(data.toString())
     })
     ```

- 在模块加载中，相对路径中的 ./ 不能省略

  ```js
//相对于当前目录
  require('./data/foo.js')
  // 如果这里忽略了 . 则也是磁盘根目录
  require('./data/foo.js')
  // 在模块加载中，相对路径中的 ./ 不能省略
  require('data/foo.js')
  // ==> Error: Cannot find module 'data/foo.js'
  ```

## 修改完代码自动重启工具

第三方命令行工具：nodemon 帮助解决频繁修改代码重启服务器问题

```shell
npm install --global nodemon
```

安装完毕之后

```shell
node app.js => nodemon app.js
```

只要是通过nodemon启动的服务，则它会监视你的文件变化，当文件发生变化的时候，自动帮你重启服务器

## Express

### Express 基本使用

`npm init ` 生成package.json

`npm i --save express`

```js
// 1.引包
var express = require('express')
// 2.创建你的服务器应用程序 也就是原来的http.createServer
var app = express()

// 公开指定目录-开放资源

// 只要这样做了，你就可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))
app.use('/node_modules/', express.static('./node_modules/'))

// 当省略第一个参数的时候，则可以通过 省略 /public 的方式来访问（就是路径从public后面开始写）
// 这种方式的好处就是可以省略 /public/
app.use(express.static('./public/'))


// 当服务器收到get请求 / 的时候，执行回调处理函数
app.get('/', function(req, res) {
    res.send('hello express')
})

app.get('/hello', function(req, res) {
    // 在 Express 中可以直接 req.query 来获取查询字符串参数
    console.log(req.query)
    res.send('你好，我是express')
})

app.get('/pinglun', function (req, res) {
    // req.query
    // 在 Express 中使用模板引擎有更好的方式：res.render(文件名， {模板对象})
    // 可以自己尝试去看 art-template 官方文档：如何让 art-template 结合 Express 来使用
})

//相当于server.listen
app.listen(3000, function() {
    console.log('app is running at port 3000.')
})
```

### 在Express中配置使用`art-template`模板引擎

安装：

```shell
npm install --save art-template
npm install --save express-art-template
```

配置：

```js
// 配置使用 art-template 模板引擎
// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 虽然外面这里不需要记载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('art', require('express-art-template'))
```

使用：

```js
// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中

// 如果想要修改默认的 views 视图渲染存储目录，则可以
// app.set('views', render函数的默认路径)

app.get('/', function (req, res) {
    res.render('index.html', {
        title: 'hello world'
    })
})
```

### 在Express获取表单GET请求参数

Express内置了一个API，可以直接通过`req.query`来获取请求参数

```js
app.get('/pinglun', function (req, res) {
  var comment = req.query
  comment.dateTime = '2017-11-5 10:58:51'
  comments.unshift(comment)
  res.redirect('/')
})
```

### 在Express获取表单POST请求体数据

在Express中没有内置获取表单POST请求体的API，这里我们需要使用一个第三方包：`body-parser`

安装：

```shell
npm install --save body-parser
```

配置：

```js
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// 只要加入这个配置，则在req请求对象上会多出一个出现：body
// 也就是说你就可以直接通过req.body来获取表单POST请求体数据了

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    // 可以通过req.body来获取表单POST请求体数据
    res.end(JSON.stringify(req.body, null, 2))
})
```

从文件中读取数据

```js
var fs = require('fs')

app.get('/students', function (req, res) {
    // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
    // 除了这样来转换之外，也可以通过 data.toString() 的方式
    fs.readFile('./db.json', 'utf8', function (err, data) {
      if (err) {
        return res.status(500).send('Server error.')
      }

      // 从文件中读取到的数据一定是字符串
      // 所以这里一定要手动转成对象
      var students = JSON.parse(data).students

      res.render('index.html', {
        fruits: [
          '苹果',
          '香蕉',
          '橘子'
        ],
        students: students
      })
    })
```

### Epress处理404

```js
// 只需要在自己的路由之后增加一个
app.use(function (req, res) {
  // 所有未处理的请求路径都会跑到这里
  // 404
})
```

### CRUD案例

#### 起步

- 初始化
- 安装依赖
- 模板处理

#### 路由设计

| 请求方式 | 请求路径         | get参数 | post参数                       | 备注             |
| -------- | ---------------- | ------- | ------------------------------ | ---------------- |
| GET      | /students        |         |                                | 渲染首页         |
| GET      | /students/new    |         |                                | 渲染添加学生页面 |
| POST     | /students/new    |         | name、age、gender、hobbies     | 处理添加学生请求 |
| GET      | /students/edit   | id      |                                | 渲染编辑页面     |
| POST     | /students/edit   |         | id、name、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id      |                                | 处理删除请求     |

#### 提取路由模块

router.js

```js
/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

var express = require('express')

// 1. 创建一个路由容器
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中
router.get('/students', function (req, res) {
})

// 3. 把 router 导出
module.exports = router
```

app.js

```js
var router = require('./router')

// 把路由容器挂载到 app 服务中
app.use(router)
```

#### 设计操作数据的API文件模块

```js
/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 这里才是我们学习 Node 的精华部分：奥义之所在
 * 封装异步 API
 */

var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */
exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    var ret = students.find(function (item) {
      return item.id === parseInt(id)
    })
    callback(null, ret)
  })
}

/**
 * 添加保存学生
 * @param  {Object}   student  学生对象
 * @param  {Function} callback 回调函数
 */
exports.save = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students

    // 添加 id ，唯一不重复
    student.id = students[students.length - 1].id + 1

    // 把用户传递的对象保存到数组中
    students.push(student)

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students

    // 注意：这里记得把 id 统一转换为数字类型
    student.id = parseInt(student.id)

    // 你要修改谁，就需要把谁找出来
    // EcmaScript 6 中的一个数组方法：find
    // 需要接收一个函数作为参数
    // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
    var stu = students.find(function (item) {
      return item.id === student.id
    })

    // 这种方式你就写死了，有 100 个难道就写 100 次吗？
    // stu.name = student.name
    // stu.age = student.age

    // 遍历拷贝对象
    for (var key in student) {
      stu[key] = student[key]
    }

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
}

/**
 * 删除学生
 */
exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students

    // findIndex 方法专门用来根据条件查找元素的下标
    var deleteId = students.findIndex(function (item) {
      return item.id === parseInt(id)
    })

    // 根据下标从数组中删除对应的学生对象
    students.splice(deleteId, 1)

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
}

```

## EcmaScript 6 的 find 方法实现

```js
var users = [
  {id: 1, name: '张三'},
  {id: 2, name: '张三'},
  {id: 3, name: '张三'},
  {id: 4, name: '张三'}
]

Array.prototype.myFind = function (conditionFunc) {
  // var conditionFunc = function (item, index) { return item.id === 4 }
  for (var i = 0; i < this.length; i++) {
    if (conditionFunc(this[i], i)) {
      return this[i]
    }
  }
}

var ret = users.myFind(function (item, index) {
  return item.id === 2
})

console.log(ret)
```

## package-lock.json 文件的作用

- 下载速度快了
- 锁定版本

## JavaScript 模块化

- Node 中的 CommonJS
- 浏览器中的
  - AMD require.js
  - CMD sea.js
- EcmaScript 官方在 EcmaScript 6 中增加了官方支持
- EcmaScript 6

## MongoDB 数据库

**Mysql和MongoDB的区别**

 MySql和MongoDB都是功能强大的数据库方案。两者最明显的区别在于，MySql是关系型数据库，在存储数据前，必须设计好数据模型(即database schema)，而且任何对于数据模型的更改，都会波及到存储在数据库中的旧数据(此处请你设想一下在生产环境中更新数百万条旧数据的工作量和风险...)；而MongoDB是NoSql(非关系型)数据库，所以它的数据模型(即data model)比关系型数据库灵活得多。当你需要更改数据格式时，理论上你不需要在数据库层面做任何改动。 

**运行 MongoDB 服务器**

```shell
mongod
```

**连接MongoDB**

```shell
mongo
```

- MongoDB 数据库
  - 灵活
  - 不用设计数据表
  - 业务的改动不需要关心数据表结构
  - DBA 架构师 级别的工程师都需要掌握这项技能
    - 设计
    - 维护
    - 分布式计算
- MongoDB 的数据存储结构
  - 数据库
  - 集合（表）
  - 文档（表记录）


- MongoDB 官方有一个 mongodb 的包可以用来操作 MongoDB 数据库
  - 这个确实和强大，但是比较原始，麻烦，所以咱们不使用它
- mongoose
  - 真正在公司进行开发，使用的是 mongoose 这个第三方包
  - 它是基于 MongoDB 官方的 mongodb 包进一步做了封装
  - 可以提高开发效率
  - 让你操作 MongoDB 数据库更方便

- 掌握使用 mongoose 对数据集合进行基本的 CRUD(文件夹mongoose-demo)
- 把之前的 crud 案例改为了 MongoDB 数据库版本(文件夹crud-express(mongodb))
- 使用 Node 操作 mysql 数据库(文件夹mysql-demo)

## promise 封装api

```js
var fs = require('fs')

function pReadFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

pReadFile('./data/a.txt')
    .then(function (data) {
    	console.log(data)
    	return pReadFile('./data/b.txt')
    }).then(function (data) {
        console.log(data)
        return pReadFile('./data/c.txt')
    }).then(function (data) {
        console.log(data)
    })
```

## 封装promise版本的ajax方法

```js
    // pGet('http://127.0.0.1:3000/users/4', function (data) {
    //   console.log(data)
    // })	

// 两种形式都可
	pGet('http://127.0.0.1:3000/users/4')
      .then(function (data) {
        console.log(data)
      })

    function pGet(url, callback) {
      return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest()
        // 当请求加载成功之后要调用指定的函数
        oReq.onload = function () {
          // 我现在需要得到这里的 oReq.responseText
          callback && callback(JSON.parse(oReq.responseText))
          resolve(JSON.parse(oReq.responseText))
        }
        oReq.onerror = function (err) {
          reject(err)
        }
        oReq.open("get", url, true)
        oReq.send()
      })
    }
```

## Blog项目案例

初始化项目

```shell
npm init -y  初始化package.json
git init
npm i express mongoose


```

目录

-node_modules

-public

​	-css

​	-img

​	-js

-app.js

```js
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 在 Node 中，有很多第三方模板引擎都可以使用，不是只有 art-template
// ejs、jade（pug）、handlebars、nunjucks
//    <%%>
//    {{}}
//    h1
//    div
//      h1
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo

app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

// 把路由挂载到 app 中
app.use(router)

// 配置一个处理 404 的中间件
app.use(function (req, res) {
  res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(5000, function () {
  console.log('running...')
})

```



## 总结

- path 模块
- __dirname 和 __filename
  - **动态的** 获取当前文件或者文件所处目录的绝对路径
  - 用来解决文件操作路劲的相对路径问题
  - 因为在文件操作中，相对路径相对于执行 `node` 命令所处的目录
  - 所以为了尽量避免这个问题，都建议文件操作的相对路劲都转为：**动态的绝对路径**
  - 方式：`path.join(__dirname, '文件名')`
- art-template 模板引擎(include、block、extend)
  - include
  - extend
  - block
- 表单同步提交和异步提交区别
  - 以前没有 ajax 都是这么干的，甚至有些直接就是渲染了提示信息出来了
  - 异步提交页面不会刷新，交互方式更灵活
- Express 中配置使用 express-session 插件
- 概述案例中注册-登陆-退出的前后端交互实现流程



# Node.js 第7天课堂笔记

## 知识点

- 上午
  - 多人社区案例
  - Express 中间件
- 下午
  - Vue

------

## 反馈

```javascript
funtion extend (source, target) {
  for (var key in source) {
    target[key] = source[key]
  }
}

var obj1 = {
  foo: 'bar'
}

var obj2 = {
  name: 'Jack'
}

// obj2 就拥有了 obj1 的所有成员了
extend(obj1, obj2)
```

- 唉............
- 老师我想问下 那个操作文件路径不受打开命令执行node命令所属路径影响什么意思，是可以在任意窗口打开都可以访问到吗。。。。。
- 慢点 心急吃不了热豆腐
- 老师讲的很好 很清晰 希望老师下午第一节上课时间短点 第一节很困 上课时间太长听课效率有点低
- 老师 写案例的时候 一个文件的代码量多了 可不可以把字体稍微调小点便于看全局结构 有时候感觉自己连不上
- extend还不是很理解
  - 模板继承
  - extend 把复制过来
  - layout
  - index （extend layout）
  - index 就具有了 layout 的内容
  - index 还可以有自己的自定义内容
- 能不能把命令系统地罗列一下,@ 0 @
- 听得时候都差不多听懂了，可是自己做的时候发现不知道从何入手，即使是看着老师的需求与代码，也根本不懂怎么写了，感觉自己听完了就全都忘光了，很郁闷！
- 我现在学习的感觉就像 你是个俄国人，教我了一句外语，你已经重复 了很多遍，我也努力再听，但是当你说完的那一刻，我就完全不知道你说了什么。就是仅仅过了一耳朵，再加上内容太多，我已经感觉完全跟不上了，怎么办，我有点崩溃。怎么破
  - 上帝撒了一把智慧，可惜我打了一把伞
  - 多花时间、废寝忘食
- 老师你是不是喜欢Anglebaby?我同桌问的，她是个女的
  - Angelababy
- 如何在浏览器中模拟所谓的art-template高级技术？关于浏览器操作cookie的插件如何使用，需要注意些什么？还可以安装一些什么谷歌浏览器插件，有助于提高开发效率或模拟项目、测试的实用插件！
  - 只是一个工具
  - https://github.com/js-cookie/js-cookie
  - EditThisCookie Chrome 浏览器插件
- 文件引入有规则吗，像router.js中，需要重新引入第三方模块express，但是body-parser在routre页面也使用了呀，但是怎么不用引入
  - 这主要是中间件的原因
- req.session对象不清楚 希望老师再讲讲
  - req.session.xxx = xxx
  - req.session.xxx
  - Session 是基于 Cookie 实现的
- session 那块还是不怎么明白
- 课间下课尽量要准时，特别是上午第一节课比较困，听课效率低，反正下课次数固定，也不会让上课时间减少。 下午5点半增加上课时间多多益善
- 思路有点乱，有些小地方不明确，总的来说练得太少
- mongoose中的Schema用的不熟练
  - 多写写
- 如果先启动node服务，再开启数据库，数据库服务开启了，但是数据库并没有连接，这样会出现所有的操作都会失效的情况，必须打开新的命令行使用mongo命令手动连接数据库 反过来，如果先开启数据库，再开启node服务，就不会出现这样的问题，因为user.js代码中mongoose.connect('mongodb://localhost/test', { useMongoClient: true })自动连接了数据库，刚开始以为数据库竟然和node产生了依赖，原来并不是！ 希望老师控制每节课的上课时间，一节课集中精力的时间最多20分钟，接下来的20分钟基本只有一半的效率，后面的时间效率只会指数减小，所以希望老师能在45分钟左右就休息一次，也能提高效率； 老师讲的很细，很认真，也很负责，希望能在最后一个月的时间学好最重要的内容，就像你说的，因为刚好遇见你！
  - 你说的对，加油。
- 一到数据库就蒙。数据库始终连接不上去。我觉得不知道我数据库都学了什么?_?
- nice！

------

## 复习

- path 模块
- __dirname 和 __filename
  - **动态的** 获取当前文件或者文件所处目录的绝对路径
  - 用来解决文件操作路劲的相对路径问题
  - 因为在文件操作中，相对路径相对于执行 `node` 命令所处的目录
  - 所以为了尽量避免这个问题，都建议文件操作的相对路劲都转为：**动态的绝对路径**
  - 方式：`path.join(__dirname, '文件名')`
- art-template 模板引擎(include、block、extend)
  - include
  - extend
  - block
  - 动手写一写
- 表单同步提交和异步提交区别
  - 字符串交互
  - 请求（报文、具有一定格式的字符串）
  - HTTP 就是 Web 中的沟通语言
  - 服务器响应（字符串）
  - 01
  - 服务器端重定向针对异步请求无效
- Express 中配置使用 express-session 插件
  - 插件也是工具
  - 你只需要明确你的目标就可以了
  - 我们最终的目标就是使用 Session 来帮我们管理一些敏感信息数据状态，例如保存登陆状态
  - 写 Session
    - req.session.xxx = xx
  - 读 Session
    - req.session.xxx
  - 删除 Session
    - req.session.xxx = null
    - 更严谨的做法是 `delete` 语法
    - delete req.session.xxx
- 概述案例中注册-登陆-退出的前后端交互实现流程