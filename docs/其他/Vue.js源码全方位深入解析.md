#  Vue.js源码全方位深入解析 

## 认识Flow

Flow是facebook出品的JavaScript静态类型检查工具。Vue.js源码利用率Flow做了静态检查。

```shell
npm install -g flow
flow init  // 生成.flowconfig
flow // 运行 检查
```

### **类型判断**

```js
/*@flow*/      // 该标记说明需要进行flow检查
function split(str) {
 return str.split(' ')
}

split(11)
```

Flow 检查上述代码后会报错，因为函数 split 期待的参数是字符串，而我们输入了数字。

```js
/*@flow*/
function add(x, y){
 return x + y
}

add('Hello', 11)
```

Flow 检查上述代码时检查不出任何错误，因为从语法层面考虑， + 即可以用在字符串上，也可以用在数字上，我们并没有明确指出 add() 的参数必须为数字。

### **类型注释**

在这种情况下，我们可以借助类型注释来指明期望的类型。类型注释是以冒号 : 开头，可以在函数参数，返回值，变量声明中使用。

```js
/*@flow*/
function add(x: number, y: number): number {
 return x + y
}
 
add('Hello', 11)
```

现在 Flow 就能检查出错误，因为函数参数的期待类型为数字，而我们提供了字符串。

上面的例子是针对函数的类型注释。接下来我们来看看 Flow 能支持的一些常见的类型注释。

### **类和对象**

```js
/*@flow*/

class Bar {
  x: string;           // x 是字符串
  y: string | number;  // y 可以是字符串或者数字
  z: boolean;

  constructor(x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}

var bar: Bar = new Bar('hello', 4)

var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
  a: 'hello',
  b: 11,
  c: ['hello', 'world'],
  d: new Bar('hello', 3)
}
```

类的类型注释格式如上，可以对类自身的属性做类型检查，也可以对构造函数的参数做类型检查。这里需要注意的是，属性 y 的类型中间用 | 做间隔，表示 y 的类型即可以是字符串也可以是数字。

对象的注释类型类似于类，需要指定对象属性的类型。

### Null

若想任意类型 T 可以为 null 或者 undefined，只需类似如下写成 ?T 的格式即可。

```js
/*@flow*/

var foo: ?string = null
```

此时，foo 可以为字符串，也可以为 null。

目前我们只列举了 Flow 的一些常见的类型注释。如果想了解所有类型注释，请移步 Flow 的[官方文档](https://flow.org/en/docs/types/)。

## Flow 在 Vue.js 源码中的应用

有时候我们想引用第三方库，或者自定义一些类型，但 Flow 并不认识，因此检查的时候会报错。为了解决这类问题，Flow 提出了一个 libdef 的概念，可以用来识别这些第三方库或者是自定义类型，而 Vue.js 也利用了这一特性。

在 Vue.js 的主目录下有 .flowconfig 文件， 它是 Flow 的配置文件，感兴趣的同学可以看[官方文档](https://flow.org/en/docs/config/)。这其中的 [libs] 部分用来描述包含指定库定义的目录，默认是名为 flow-typed 的目录。

这里 [libs] 配置的是 flow，表示指定的库定义都在 flow 文件夹内。我们打开这个目录，会发现文件如下：

flow

├── compiler.js     # 编译相关

├── component.js    # 组件数据结构

├── global-api.js    # Global API 结构

├── modules.js     # 第三方库定义

├── options.js     # 选项相关

├── ssr.js       # 服务端渲染相关

├── vnode.js      # 虚拟 node 相关

可以看到，Vue.js 有很多自定义类型的定义，在阅读源码的时候，如果遇到某个类型并想了解它完整的数据结构的时候，可以回来翻阅这些数据结构的定义。



通过对 Flow 的认识，有助于我们阅读 Vue 的源码，并且这种静态类型检查的方式非常有利于大型项目源码的开发和维护。类似 Flow 的工具还有如 TypeScript，感兴趣的同学也可以自行去了解一下。







# Vue.js 源码目录设计

Vue.js 的源码都在 src 目录下，其目录结构如下。

src

├── compiler     # 编译相关 

├── core       # 核心代码 

├── platforms    # 不同平台的支持

├── server      # 服务端渲染

├── sfc       # .vue 文件解析

├── shared      # 共享代码

## **compiler**

compiler 目录包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能。

编译的工作可以在构建时做（借助 webpack、vue-loader 等辅助插件）；也可以在运行时做，使用包含构建功能的 Vue.js。显然，编译是一项耗性能的工作，所以更推荐前者——离线编译。

## **core**

core 目录包含了 Vue.js 的核心代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等。

这里的代码可谓是 Vue.js 的灵魂，也是我们之后需要重点分析的地方。

## **platform**

Vue.js 是一个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 natvie 客户端上。platform 是 Vue.js 的入口，2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js。

我们会重点分析 web 入口打包后的 Vue.js，对于 weex 入口打包的 Vue.js，感兴趣的同学可以自行研究。

## **server**

Vue.js 2.0 支持了服务端渲染，所有服务端渲染相关的逻辑都在这个目录下。注意：这部分代码是跑在服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为一谈。

服务端渲染主要的工作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。

## **sfc**

通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单文件的编写组件。

这个目录下的代码逻辑会把 .vue 文件内容解析成一个 JavaScript 的对象。

## **shared**

Vue.js 会定义一些工具方法，这里定义的工具方法都是会被浏览器端的 Vue.js 和服务端的 Vue.js 所共享的。

## **总结**

从 Vue.js 的目录设计可以看到，作者把功能模块拆分的非常清楚，相关的逻辑放在一个独立的目录下维护，并且把复用的代码也抽成一个独立目录。

这样的目录设计让代码的阅读性和可维护性都变强，是非常值得学习和推敲的。

**任务**

aaaaa

 **Vue.js 源码构建**

# **Vue.js 源码构建**

Vue.js 源码是基于 [Rollup](https://github.com/rollup/rollup) 构建的，它的构建相关配置都在 scripts 目录下。

## **构建脚本**

通常一个基于 NPM 托管的项目都会有一个 package.json 文件，它是对项目的描述文件，它的内容实际上是一个标准的 JSON 对象。

我们通常会配置 script 字段作为 NPM 的执行脚本，Vue.js 源码构建的脚本如下：

{

 "script": {

  "build": "node scripts/build.js",

  "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",

  "build:weex": "npm run build --weex"

 }

}

这里总共有 3 条命令，作用都是构建 Vue.js，后面 2 条是在第一条命令的基础上，添加一些环境参数。

当在命令行运行 npm run build 的时候，实际上就会执行 node scripts/build.js，接下来我们来看看它实际是怎么构建的。

## **构建过程**

我们对于构建过程分析是基于源码的，先打开构建的入口 JS 文件，在 scripts/build.js 中：

let builds = require('./config').getAllBuilds()

 

// filter builds via command line arg

if (process.argv[2]) {

 const filters = process.argv[2].split(',')

 builds = builds.filter(b => {

  return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)

 })

} else {

 // filter out weex builds by default

 builds = builds.filter(b => {

  return b.output.file.indexOf('weex') === -1

 })

}

 

build(builds)

这段代码逻辑非常简单，先从配置文件读取配置，再通过命令行参数对构建配置做过滤，这样就可以构建出不同用途的 Vue.js 了。接下来我们看一下配置文件，在 scripts/config.js 中：

const builds = {

 // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify

 'web-runtime-cjs': {

  entry: resolve('web/entry-runtime.js'),

  dest: resolve('dist/vue.runtime.common.js'),

  format: 'cjs',

  banner

 },

 // Runtime+compiler CommonJS build (CommonJS)

 'web-full-cjs': {

  entry: resolve('web/entry-runtime-with-compiler.js'),

  dest: resolve('dist/vue.common.js'),

  format: 'cjs',

  alias: { he: './entity-decoder' },

  banner

 },

 // Runtime only (ES Modules). Used by bundlers that support ES Modules,

 // e.g. Rollup & Webpack 2

 'web-runtime-esm': {

  entry: resolve('web/entry-runtime.js'),

  dest: resolve('dist/vue.runtime.esm.js'),

  format: 'es',

  banner

 },

 // Runtime+compiler CommonJS build (ES Modules)

 'web-full-esm': {

  entry: resolve('web/entry-runtime-with-compiler.js'),

  dest: resolve('dist/vue.esm.js'),

  format: 'es',

  alias: { he: './entity-decoder' },

  banner

 },

 // runtime-only build (Browser)

 'web-runtime-dev': {

  entry: resolve('web/entry-runtime.js'),

  dest: resolve('dist/vue.runtime.js'),

  format: 'umd',

  env: 'development',

  banner

 },

 // runtime-only production build (Browser)

 'web-runtime-prod': {

  entry: resolve('web/entry-runtime.js'),

  dest: resolve('dist/vue.runtime.min.js'),

  format: 'umd',

  env: 'production',

  banner

 },

 // Runtime+compiler development build (Browser)

 'web-full-dev': {

  entry: resolve('web/entry-runtime-with-compiler.js'),

  dest: resolve('dist/vue.js'),

  format: 'umd',

  env: 'development',

  alias: { he: './entity-decoder' },

  banner

 },

 // Runtime+compiler production build  (Browser)

 'web-full-prod': {

  entry: resolve('web/entry-runtime-with-compiler.js'),

  dest: resolve('dist/vue.min.js'),

  format: 'umd',

  env: 'production',

  alias: { he: './entity-decoder' },

  banner

 },

 // ...

}

这里列举了一些 Vue.js 构建的配置，关于还有一些服务端渲染 webpack 插件以及 weex 的打包配置就不列举了。

对于单个配置，它是遵循 Rollup 的构建规则的。其中 entry 属性表示构建的入口 JS 文件地址，dest 属性表示构建后的 JS 文件地址。format 属性表示构建的格式，cjs 表示构建出来的文件遵循 [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) 规范，es 表示构建出来的文件遵循 [ES Module](http://exploringjs.com/es6/ch_modules.html) 规范。 umd 表示构建出来的文件遵循 [UMD](https://github.com/umdjs/umd) 规范。

以 web-runtime-cjs 配置为例，它的 entry 是
resolve('web/entry-runtime.js')，先来看一下 resolve 函数的定义。

源码目录：scripts/config.js

const aliases = require('./alias')

const resolve = p => {

 const base = p.split('/')[0]

 if (aliases[base]) {

  return path.resolve(aliases[base], p.slice(base.length + 1))

 } else {

  return path.resolve(__dirname, '../', p)

 }

}

这里的 resolve 函数实现非常简单，它先把 resolve 函数传入的参数 p 通过 / 做了分割成数组，然后取数组第一个元素设置为 base。在我们这个例子中，参数 p 是 web/entry-runtime.js，那么 base 则为 web。base 并不是实际的路径，它的真实路径借助了别名的配置，我们来看一下别名配置的代码，在 scripts/alias 中：

const path = require('path')

 

module.exports = {

 vue: path.resolve(__dirname, '../src/platforms/web/entry-runtime-with-compiler'),

 compiler: path.resolve(__dirname, '../src/compiler'),

 core: path.resolve(__dirname, '../src/core'),

 shared: path.resolve(__dirname, '../src/shared'),

 web: path.resolve(__dirname, '../src/platforms/web'),

 weex: path.resolve(__dirname, '../src/platforms/weex'),

 server: path.resolve(__dirname, '../src/server'),

 entries: path.resolve(__dirname, '../src/entries'),

 sfc: path.resolve(__dirname, '../src/sfc')

}

很显然，这里 web 对应的真实的路径是 path.resolve(__dirname, '../src/platforms/web')，这个路径就找到了 Vue.js 源码的 web 目录。然后 resolve 函数通过 path.resolve(aliases[base], p.slice(base.length + 1)) 找到了最终路径，它就是 Vue.js 源码 web 目录下的 entry-runtime.js。因此，web-runtime-cjs 配置对应的入口文件就找到了。

它经过 Rollup 的构建打包后，最终会在 dist 目录下生成 vue.runtime.common.js。

## **Runtime Only VS Runtime+Compiler**

通常我们利用 vue-cli 去初始化我们的 Vue.js 项目的时候会询问我们用 Runtime Only 版本的还是 Runtime+Compiler 版本。下面我们来对比这两个版本。

· Runtime Only

我们在使用 Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。

· Runtime+Compiler

我们如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板，如下所示：

// 需要编译器的版本

new Vue({

 template: '<div>{{ hi }}</div>'

})

 

// 这种情况不需要

new Vue({

 render (h) {

  return h('div', this.hi)

 }

})

因为在 Vue.js 2.0 中，最终渲染都是通过 render 函数，如果写 template 属性，则需要编译成 render 函数，那么这个编译过程会发生运行时，所以需要带有编译器的版本。

很显然，这个编译过程对性能会有一定损耗，所以通常我们更推荐使用 Runtime-Only 的 Vue.js。

## **总结**

通过这一节的分析，我们可以了解到 Vue.js 的构建打包过程，也知道了不同作用和功能的 Vue.js 它们对应的入口以及最终编译生成的 JS 文件。尽管在实际开发过程中我们会用 Runtime Only 版本开发比较多，但为了分析 Vue 的编译过程，我们这门课重点分析的源码是 Runtime+Compiler 的 Vue.js。



# **从入口开始**

我们之前提到过 Vue.js 构建过程，在 web 应用下，我们来分析 Runtime + Compiler 构建出来的 Vue.js，它的入口是 src/platforms/web/entry-runtime-with-compiler.js：

/* @flow */

 

import config from 'core/config'

import { warn, cached } from 'core/util/index'

import { mark, measure } from 'core/util/perf'

 

import Vue from './runtime/index'

import { query } from './util/index'

import { compileToFunctions } from './compiler/index'

import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

 

const idToTemplate = cached(id => {

 const el = query(id)

 return el && el.innerHTML

})

 

const mount = Vue.prototype.$mount

Vue.prototype.$mount = function (

 el?: string | Element,

 hydrating?: boolean

): Component {

 el = el && query(el)

 

 /* istanbul ignore if */

 if (el === document.body || el === document.documentElement) {

  process.env.NODE_ENV !== 'production' && warn(

   `Do not mount Vue to <html> or <body> - mount to normal elements instead.`

  )

  return this

 }

 

 const options = this.$options

 // resolve template/el and convert to render function

 if (!options.render) {

  let template = options.template

  if (template) {

   if (typeof template === 'string') {

​    if (template.charAt(0) === '#') {

​     template = idToTemplate(template)

​     /* istanbul ignore if */

​     if (process.env.NODE_ENV !== 'production' && !template) {

​      warn(

​       `Template element not found or is empty: ${options.template}`,

​       this

​      )

​     }

​    }

   } else if (template.nodeType) {

​    template = template.innerHTML

   } else {

​    if (process.env.NODE_ENV !== 'production') {

​     warn('invalid template option:' + template, this)

​    }

​    return this

   }

  } else if (el) {

   template = getOuterHTML(el)

  }

  if (template) {

   /* istanbul ignore if */

   if (process.env.NODE_ENV !== 'production' && config.performance && mark) {

​    mark('compile')

   }

 

   const { render, staticRenderFns } = compileToFunctions(template, {

​    shouldDecodeNewlines,

​    shouldDecodeNewlinesForHref,

​    delimiters: options.delimiters,

​    comments: options.comments

   }, this)

   options.render = render

   options.staticRenderFns = staticRenderFns

 

   /* istanbul ignore if */

   if (process.env.NODE_ENV !== 'production' && config.performance && mark) {

​    mark('compile end')

​    measure(`vue ${this._name} compile`, 'compile', 'compile end')

   }

  }

 }

 return mount.call(this, el, hydrating)

}

 

/**

 \* Get outerHTML of elements, taking care

 \* of SVG elements in IE as well.

 */

function getOuterHTML (el: Element): string {

 if (el.outerHTML) {

  return el.outerHTML

 } else {

  const container = document.createElement('div')

  container.appendChild(el.cloneNode(true))

  return container.innerHTML

 }

}

 

Vue.compile = compileToFunctions

 

export default Vue

那么，当我们的代码执行 import Vue from 'vue' 的时候，就是从这个入口执行代码来初始化 Vue，
那么 Vue 到底是什么，它是怎么初始化的，我们来一探究竟。

## **Vue 的入口**

在这个入口 JS 的上方我们可以找到 Vue 的来源：import Vue from './runtime/index'，我们先来看一下这块儿的实现，它定义在 src/platforms/web/runtime/index.js 中：

import Vue from 'core/index'

import config from 'core/config'

import { extend, noop } from 'shared/util'

import { mountComponent } from 'core/instance/lifecycle'

import { devtools, inBrowser, isChrome } from 'core/util/index'

 

import {

 query,

 mustUseProp,

 isReservedTag,

 isReservedAttr,

 getTagNamespace,

 isUnknownElement

} from 'web/util/index'

 

import { patch } from './patch'

import platformDirectives from './directives/index'

import platformComponents from './components/index'

 

// install platform specific utils

Vue.config.mustUseProp = mustUseProp

Vue.config.isReservedTag = isReservedTag

Vue.config.isReservedAttr = isReservedAttr

Vue.config.getTagNamespace = getTagNamespace

Vue.config.isUnknownElement = isUnknownElement

 

// install platform runtime directives & components

extend(Vue.options.directives, platformDirectives)

extend(Vue.options.components, platformComponents)

 

// install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop

 

// public mount method

Vue.prototype.$mount = function (

 el?: string | Element,

 hydrating?: boolean

): Component {

 el = el && inBrowser ? query(el) : undefined

 return mountComponent(this, el, hydrating)

}

 

// ...

 

export default Vue

这里关键的代码是 import Vue from 'core/index'，之后的逻辑都是对 Vue 这个对象做一些扩展，可以先不用看，我们来看一下真正初始化 Vue 的地方，在 src/core/index.js 中：

import Vue from './instance/index'

import { initGlobalAPI } from './global-api/index'

import { isServerRendering } from 'core/util/env'

import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

 

initGlobalAPI(Vue)

 

Object.defineProperty(Vue.prototype, '$isServer', {

 get: isServerRendering

})

 

Object.defineProperty(Vue.prototype, '$ssrContext', {

 get () {

  /* istanbul ignore next */

  return this.$vnode && this.$vnode.ssrContext

 }

})

 

// expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {

 value: FunctionalRenderContext

})

 

Vue.version = '__VERSION__'

 

export default Vue

这里有 2 处关键的代码，import Vue from './instance/index' 和 initGlobalAPI(Vue)，初始化全局 Vue API（我们稍后介绍），我们先来看第一部分，在 src/core/instance/index.js 中：

### **Vue 的定义**

import { initMixin } from './init'

import { stateMixin } from './state'

import { renderMixin } from './render'

import { eventsMixin } from './events'

import { lifecycleMixin } from './lifecycle'

import { warn } from '../util/index'

 

function Vue (options) {

 if (process.env.NODE_ENV !== 'production' &&

  !(this instanceof Vue)

 ) {

  warn('Vue is a constructor and should be called with the `new` keyword')

 }

 this._init(options)

}

 

initMixin(Vue)

stateMixin(Vue)

eventsMixin(Vue)

lifecycleMixin(Vue)

renderMixin(Vue)

 

export default Vue

在这里，我们终于看到了 Vue 的庐山真面目，它实际上就是一个用 Function 实现的类，我们只能通过 new Vue 去实例化它。

有些同学看到这不禁想问，为何 Vue 不用 ES6 的 Class 去实现呢？我们往后看这里有很多 xxxMixin 的函数调用，并把 Vue 当参数传入，它们的功能都是给 Vue 的 prototype 上扩展一些方法（这里具体的细节会在之后的文章介绍，这里不展开），Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 难以实现的。这么做的好处是非常方便代码的维护和管理，这种编程技巧也非常值得我们去学习。

### initGlobalAPI

Vue.js 在整个初始化过程中，除了给它的原型 prototype 上扩展方法，还会给 Vue 这个对象本身扩展全局的静态方法，它的定义在 src/core/global-api/index.js 中：

export function initGlobalAPI (Vue: GlobalAPI) {

 // config

 const configDef = {}

 configDef.get = () => config

 if (process.env.NODE_ENV !== 'production') {

  configDef.set = () => {

   warn(

​    'Do not replace the Vue.config object, set individual fields instead.'

   )

  }

 }

 Object.defineProperty(Vue, 'config', configDef)

 

 // exposed util methods.

 // NOTE: these are not considered part of the public API - avoid relying on

 // them unless you are aware of the risk.

 Vue.util = {

  warn,

  extend,

  mergeOptions,

  defineReactive

 }

 

 Vue.set = set

 Vue.delete = del

 Vue.nextTick = nextTick

 

 Vue.options = Object.create(null)

 ASSET_TYPES.forEach(type => {

  Vue.options[type + 's'] = Object.create(null)

 })

 

 // this is used to identify the "base" constructor to extend all plain-object

 // components with in Weex's multi-instance scenarios.

 Vue.options._base = Vue

 

 extend(Vue.options.components, builtInComponents)

 

 initUse(Vue)

 initMixin(Vue)

 initExtend(Vue)

 initAssetRegisters(Vue)

}

这里就是在 Vue 上扩展的一些全局方法的定义，Vue 官网中关于全局 API 都可以在这里找到，这里不会介绍细节，会在之后的章节我们具体介绍到某个 API 的时候会详细介绍。有一点要注意的是，Vue.util 暴露的方法最好不要依赖，因为它可能经常会发生变化，是不稳定的。

## **总结**

那么至此，Vue 的初始化过程基本介绍完毕。这一节的目的是让同学们对 Vue 是什么有一个直观的认识，它本质上就是一个用 Function 实现的 Class，然后它的原型 prototype 以及它本身都扩展了一系列的方法和属性，那么 Vue 能做什么，它是怎么做的，我们会在后面的章节一层层帮大家揭开 Vue 的神秘面纱。

**任务**

请仔细阅读本文档，为下面学习视频内容做准备

 