# Vue小记

##  一、Vue使用

### 1、Vue基本使用

#### Vue的生命周期

生命周期函数就是vue实例在某一个时间点会自动执行的函数。

- `beforeCreate`

- `created`：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
- `beforeMount`
- `mounted`：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
- `beforeUpdate`
- `updated`
- `beforeDestory`
- `destoryed`

PS：数据初始化一般放到created里面，这样可以及早发请求获取数据，如果有依赖dom必须存在的情况，就放到`mounted(){this.$nextTick(() => { /* code */ })}`里面



#### 模板语法

- 插值

区别：v-text不会转译，v-html会转译

v-html：会有XSS风险，会覆盖子组件（可以使用`<pre>`标签）

```html
	<div id="app">
    	<!-- 插值表达式 -->
		<div>{{name}}</div>          <!--  <h1>hello</h1> -->
		<!-- v-text 与 {{}} 作用相同 -->
		<div v-text="name"></div>    <!--  <h1>hello</h1> -->
		<div v-html="name"></div>    <!--  hello -->
	</div>
```

对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript **表达式**支持。注意：每个绑定都只能包含**单个表达式**。

```js
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}

// 这是语句，不是表达式
{{ var a = 1 }}
// 流控制也不会生效，请使用三元表达式
// {{ if (ok) { return message } }}
```

- 指令

  - 事件绑定：`v-on`

    ```html
    <body>
    	<div id="root">
           <!--  事件绑定 v-on: 简写为 @ -->
            <div v-on:click="handleClick"><h1>{{content}}</h1></div>
    	</div>
    
    	<script>
    		new Vue({
    			el:"#root",
    			data:{
    				content:"hello"
    			},
    			methods:{
    				handleClick:function(){
    					this.content = "world"
    				}
    			}
    		})
    	</script>
    </body>
    ```

  - 属性绑定：`v-bind`

    ```html
    <body>
    	<div id="root">
    	    <!-- 属性绑定 v-bind: 简写为 : -->
    		<div :title="title">hello world</div>
    	</div> 
    
    	<script>
    		new Vue({
    			el:"#root",
    			data:{
    				title:"this is hello world"
    			}
    		})
    	</script>
    </body>
    ```

  - 双向数据绑定：`v-model`

    ```html
    <body>
    	<div id="root">
    		<!-- 双向数据绑定 v-model -->
    		<input v-model="content"/>
    	    <div>{{content}}</div>
    	</div> 
    
    	<script>
    		new Vue({
    			el:"#root",
    			data:{
    				content:"this is content"
    			}
    		})
    	</script>
    </body>
    ```

  - `v-if`,`v-else`指令

    ```html
    <body>
    	<div id="root">
    		<!-- v-if 条件渲染指令，存在与否，它根据表达式的真假来删除和插入元素  
                      当show=false时，直接从dom中移除 -->
    		<div v-if="show">hello world</div>
            <!-- v-if的值为false时显示v-else内容，v-if 与 v-else必须紧贴
                    另外 还有 v-else-if  -->
    		<div v-else>bye world</div>
            <button @click="handleClick">toggle</button>
    	</div>
    
    	<script>
    		new Vue({
    			el: "#root",
    			data: {
    				show: true
    			},
    			methods:{
    				handleClick:function(){
    					this.show = !this.show
    				}
    			}
    		})
    	</script>
    </body>
    ```

  - v-show指令

    ```html
    <body>
    	<div id="root">
            <!-- v-show 条件渲染指令，显示与否
                        当show=false时，div中的display属性变为none，不会dom中移除。
                        推荐使用v-show -->
    	    <div v-show="show">hello world</div>
            <button @click="handleClick">toggle</button>
    	</div>
    
    	<script>
    		new Vue({
    			el: "#root",
    			data: {
    				show: true
    			},
    			methods:{
    				handleClick:function(){
    					this.show = !this.show
    				}
    			}
    		})
    	</script>
    </body>
    ```

  - v-for指令

    **v-for中的key的用处**

    使用`v-for`更新已渲染的元素列表时,默认用`就地复用`策略;

    列表数据修改的时候,他会根据key值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素;

    ```html
    <body>
    	<div id="root">
    		<ul>
            <!-- v-for 循环显示  :key 提升每一项渲染效率，不能相同
                       一般与后端数据库相连时该项为数据id -->
    			<li v-for="(item,index) of list" :key="index">{{item}}</li>
    		</ul>
    	</div>
    
    	<script>
    		new Vue({
    			el: "#root",
    			data: {
    				list: [1,2,3]
    			}
    		})
    	</script>
    </body>
    ```

#### 计算属性（computed）、监听器（watch）与方法（methods）

- **计算属性（computed）**

  对于任何复杂逻辑，你都应当使用计算属性。

  ```html
  <body>
  	<div id="example">
    		<p>Original message: "{{ message }}"</p>
    		<p>Computed reversed message: "{{ reversedMessage }}"</p>
  	</div>
      
      <script>
          var vm = new Vue({
    			el: '#example',
    			data: {
    			  message: 'Hello'
   			},
    			computed: {
    			  // 计算属性的 getter
    			  reversedMessage: function () {
     			   // `this` 指向 vm 实例
     			   return this.message.split('').reverse().join('')
     			 }
   			}
  		})
      </script>
  </body>
  ```

  

  - 计算属性缓存 vs 方法

    我们可以通过在表达式中调用方法来达到同样的效果：

    ```js
    // 在组件中
    methods: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      }
    }
    ```

    不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

    这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：

    ```js
    computed: {
      now: function () {
        return Date.now()
      }
    }
    ```

    相比之下，每当触发重新渲染时，**调用方法将总会再次执行函数**。

    

  - 计算属性vs侦听属性

    ```js
    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      },
      watch: {
        firstName: function (val) {
          this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
          this.fullName = this.firstName + ' ' + val
        }
      }
    })
    ```

    侦听属性有缓存，但是代码是命令式且重复的。

    将它与计算属性的版本进行比较：

    ```js
    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        }
      }
    })
    ```

  - 计算属性的setter

    计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

    ```js
    // ...
    computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }
    // ...
    ```

    现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

- 监听器（watch）

  **当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。**

  **当值第一次绑定时，不会执行监听函数，只有值发生改变时才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。**

  ```js
  watch: {
      // 普通监听
      name(oldVal, val){
          console.log(oldVal)
      },
      firstName: {
          handler(newName, oldName) {
              this.fullName = newName + ' ' + this.lastName;
          },
          // 代表在watch里声明了firstName这个方法之后立即先去执行handler方法
          immediate: true,  	// 是否最初绑定的时候就执行
          deep: true 			// 是否深度监听
      }
  }
  ```
  
  `deep`的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改`obj`里面任何一个属性都会触发这个监听器里的 handler。
  
  优化，我们可以使用字符串形式监听。
  
  ```js
  watch: {
    'obj.a': {
      handler(newName, oldName) {
        console.log('obj.a changed');
      },
      immediate: true,
      // deep: true
    }
  }
  ```
  
  PS：watch监听引用类型，拿不到oldVal



**methods,watch,computed的区别**

1. computed 属性的结果**会被缓存**，除非依赖的响应式属性**变化才会重新计算**。主要当作属性来使用
2. methods 方法表示一个具体的操作，主要书写业务逻辑
3. watch 一个对象，键是需要观察的表达式，值是对应回调函数。主要**用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作**；可以看作是 computed 和 methods 的结合体；**(与computed的区别是，watch更加适用于监听某一个值的变化并做对应的操作，比如请求后台接口等，而computed适用于计算已有的值并返回结果)**



#### class与style绑定

- 使用动态属性
- 使用驼峰式写法

下面通过一个点击改变颜色例子来说明样式绑定。

- class的对象绑定

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>class的对象绑定</title>
  	<script src="./vue.js"></script>
  	<style>
          .activited {
          	color: red;
          }
  	</style>
  </head>
  <body>
  	<div id="app">
          <!-- 方法一：class的对象绑定 -->
  		<div @click="handleDivClick"
  		     :class="{activited:isActivited}">
  		     Hello world
  		</div>
  	</div>
  
  	<script>
  		var vm = new Vue ({
  			el: "#app",
  			data: {
  				isActivited: false
  			},
  			methods: {
  				handleDivClick: function() {
  					this.isActivited = ! this.isActivited
  				}
  			}
  		})
  	</script>
  </body>
  </html>
  ```

- class的数组绑定

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>class的数组绑定</title>
  	<script src="./vue.js"></script>
  	<style>
          .activited {
          	color: red;
          }
  	</style>
  </head>
  <body>
  	<div id="app">
          <!-- 方法二：class的数组绑定 -->
  		<div @click="handleDivClick1"
  		     :class="[activited]">
  		     Hello world!
  		</div>
  	</div>
  
  	<script>
  		var vm = new Vue ({
  			el: "#app",
  			data: {
  				activited:""
  			},
  			methods: {
  				handleDivClick1: function() {
  					this.activited = this.activited === "activited" ? "" : "activited"
  				}
  			}
  		})
  	</script>
  </body>
  </html>
  ```

- style的对象绑定

  ```html
  <body>
  	<div id="app">
          <!-- 方法三：style的对象绑定 -->
  		<div @click="handleDivClick2"
  		     :style="styleObj">
  		     Hello world!!
  		</div>
  	</div>
  
  	<script>
  		var vm = new Vue ({
  			el: "#app",
  			data: {
  				styleObj: {
  					color: ""
  				}
  			},
  			methods: {
  				handleDivClick2: function() {
  					this.styleObj.color = this.styleObj.color === "" ? "red" : "";
  				}
  			}
  		})
  	</script>
  </body>
  ```

- style的数组绑定

  ```html
  <body>
  	<div id="app">
  	<!-- 方法四：style的数组绑定（与方法三相似） -->
  		<div @click="handleDivClick3"
  		     :style=[styleObj]>
  		     Hello world!!!
  		</div>
  	</div>
  
  	<script>
  		var vm = new Vue ({
  			el: "#app",
  			data: {
  				styleObj: {
  					color: ""
  				}
  			},
  			methods: {
  				handleDivClick3: function() {
  					this.styleObj.color = this.styleObj.color === "" ? "red" : "";
  				}
  			}
  		})
  	</script>
  </body>
  ```



#### 条件渲染

`v-if`，`v-else`，`v-show`基础知识详见上文指令部分。

**v-if和v-show的区别**

v-show仅仅控制元素的显示方式，将display属性在block和none来回切换；

而v-if会控制这个dom节点的存在与否。

当我们需要经常切换某个元素的显示/隐藏时，使用v-show会更加节省性能上的开销；

当只需要一次显示或隐藏时，使用v-if更合理。



- 在`<template>`元素上使用`v-if`条件渲染分组

  当我们需要切换多个元素时，可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。

  最终的渲染结果将不包含 `<template>` 元素。

  ```js
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
  ```

- `v-else-if`

  充当 `v-if` 的“else-if 块”，可以连续使用：

  ```js
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

  类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

- 用`key`管理可复用的元素

  Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

  但有时我们并不需要这样的功能，如当我们在使用账号登录时，可以选择用户名登录和邮箱登录，而这两者的信息可能是不一样的，这时我们可以增加key使切换时输入的内容清空。如下面的例子：

  ```html
  <body>
  <!-- 通过增加key能使v-if 与 v-else 切换时的内容清空 -->
  	<div id="app">
  		<div v-if="show">
  			用户名：<input key="username" />
  		</div>
  		<div v-else>
  			邮箱名：<input key="email"/>
  		</div>
  		<button @click="toggle">切换</button>
  	</div>
  
  	<script>
  		var vm = new Vue({
  			el: "#app",
  			data: {
  				show: true,
  			},
  			methods: {
  				toggle: function() {
  					this.show = !this.show
  				}
  			}
  		})
  	</script>
  </body>
  ```



#### 列表渲染

- 用`v-for`把一个数组对应为一组元素

```html
<body>
	<div id="app">
	<!-- v-for 循环显示  :key 提升每一项渲染效率，不能相同 一般与后端数据库相连时该项为数据id -->
	<!-- 可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法 -->
		<div v-for="(item, index) in list"
		     :key="item.id">
            {{index}}----{{item.text}}----{{item.id}}
		</div>
	</div>

	<script>
		var vm = new Vue({
			el: "#app",
			data: {
				list: [{
					id:"010120201",
					text:"hello"
				},{
					id:"010120202",
					text:"hello"
				},{
					id:"010120203",
					text:"hello"
				}]
			}
		})
	</script>
</body>
```

输出结果：![5](..\picture\5.png)

- 一个对象的`v-for`

```html
<body>
	<div id="app">
        <div v-for="(value, key, index) in object">
          {{ index }}. {{ key }}: {{ value }}
        </div>
	</div>

	<script>
		var vm = new Vue({
			el: "#app",
			data: {
				object: {
					firstName: 'John',
					lastName: 'Doe',
					age: 30
				}
			}
		})
	</script>
</body>
```

输出结果：![3](..\picture\3.png)

- v-for 和 v-if 不能一起使用

  v-for比v-if的优先级更高，这就说明在v-for的每次循环运行中每一次都会调用v-if的判断，所以不推荐v-if和v-for在同一个标签内同时使用。

  解决方法：过滤一个列表中的项目 (比如 v-for=“user in users” v-if=“user.isActive”)。在这种情形下，请将 users替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表

- 当我们要在此基础上再加一个数据，在控制台中我们要重新定义该对象才能使页面改变。

```js
vm.object={
				firstName: 'John',
				lastName: 'Doe',
				age: 30,
				address: 'hangzhou'
			}
```

除此之外，我们还可以通过set方法向对象注入数据，同时页面更新。

方法一：`Vue.set(vm.object,"address","hangzhou")`

方法二：`vm.$set(vm.object,"address","hangzhou")`

结果：![4](..\picture\4.png)

- 变异方法

  Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：

  - `push()`
  - `pop()`
  - `shift()`
  - `unshift()`
  - `splice()`
  - `sort()`
  - `reverse()`

- 非变异方法

  `filter()`, `concat()` 和 `slice()` 。这些不会改变原始数组，但**总是返回一个新数组**。

  当使用非变异方法时，可以用新数组替换旧数组：

  ```js
  example1.items = example1.items.filter(function (item) {
    return item.message.match(/Foo/)
  })
  ```

- 注意事项

  由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

  ​    1.当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`

  ​    2.当你修改数组的长度时，例如：`vm.items.length = newLength`

  - 为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将触发状态更新：

    ```js
    // Vue.set
    Vue.set(vm.items, indexOfItem, newValue)
    // Array.prototype.splice
    vm.items.splice(indexOfItem, 1, newValue)
    ```

    你也可以使用 `vm.$set` 实例方法，该方法是全局方法 Vue.set 的一个别名：

    `vm.$set(vm.items, indexOfItem, newValue)`

  - 为了解决第二类问题，你可以使用 splice：

    `vm.items.splice(newLength)`

#### 事件

- event参数，自定义参数

  1.event是原生的event对象，没有经过任何的装饰

  2.事件被挂载到当前元素

- 事件修饰符

  ```vue
  <!-- 阻止单击事件继续传播 -->
  <a v-on:click.stop="doThis"></a>
  <!-- 提交事件不再重载页面 -->
  <form v-on:submit.prevent="onSubmit"></form>
  <!-- 修饰符可以串联 -->
  <a v-on:click.stop.prevent="doThat"></a>
  <!-- 只有修饰符 -->
  <form v-on:submit.prevent></form>
  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 事件捕获：事件从最不精确的对象(document对象)开始触发，然后到最精确 -->
  <div v-on:click.capture="doThis">...</div>
  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div v-on:click.self="doThat">...</div>
  ```

- 按键修饰符

  ```vue
  <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
  <button @click.ctrl="onClick">A</button>
  <!-- 有且只有 Ctrl 被按下的时候才触发 -->
  <button @click.ctrl.exact="onCtrlClick">A</button>
  <!-- 没有任何系统修饰符被按下的时候才触发 -->
  <button @click.exact="onCtrlClick">A</button>
  ```


#### 表单

- v-model

  `<textarea v-model="desc"></textarea>`

  注意：`<textarea>{{desc}}</textarea>`是不允许的

- 常见的表单项 textarea checkbox radio select

- 修饰符 lazy number trim （v-model.lazy、v-model.number、v-model.trim）

  - 在输入框中，v-model 默认是同步数据，使用 **.lazy** 会转变为在 change 事件中同步 ， 也就是在**失去焦点 或者 按下回车键时才更新**
  - **.number 修饰符可以将 输入的值转化为Number类型** ，否则虽然你输入的是数字 但它的类型其实是String，在数字输入框中比较有用
  - **.trim** 修饰符会自动过滤掉输入的**首尾空格**

### 2、Vue组件使用

#### 组件使用中的细节点

- table 中只能使用tr标签，不能使用子组件标签，需要使用is
- 子组件中定义data必须是一个函数
  - vue组件相当于class，它可能会被用到很多地方，这就类似于new class实例

  - 而对于每一个实例，data都必须是独立的，所以要用函数返回

  - 如果不用函数，那多个实例就公用一个data了
- 使用ref操作dom:  this.$refs.xx

```html
	<div id="root">
		<!-- table 中只能使用tr标签 因此使用is  同理还有select中只能用option标签，ul中li标签 -->
		<table>
			<tbody>
				<tr is="row"></tr>
				<tr is="row"></tr>
				<tr is="row"></tr>
			</tbody>
		</table>

		<!-- 使用ref操作dom -->
		<counter ref="one" @change="handleChange"></counter>
		<counter ref="two" @change="handleChange"></counter>
		<div>{{total}}</div>
	</div>

	<script>
		// 子组件中定义data必须是一个函数
		Vue.component('row', {
			data: function() {
				return {
					content: 'this is a row'
				}
			},
			template: '<tr><td>{{content}}</td></tr>'
		})

		Vue.component('counter', {
			template:'<div @click="handleClick">{{number}}</div>',
			data: function () {
				return {
					number: 0
				}
			},
			methods: {
				handleClick: function() {
					this.number ++
					this.$emit('change')
				}
			}
		})


		var vm = new Vue ({
			el:"#root",
			data: {
				total: 0
			},
			methods: {
				handleChange: function() {
					this.total = this.$refs.one.number + this.$refs.two.number
				}
			}
		})
  </script>
```

#### 2、父子组件传值

扩展阅读：

[Vue2.0的三种常用传值方式、父传子、子传父、非父子组件传值](https://blog.csdn.net/lander_xiong/article/details/79018737)

[vue组件间通信六种方式（完整版）](https://www.cnblogs.com/hpx2020/p/10936279.html)

- 父组件通过属性形式向子组件传值

  ```js
  props: {
      list: {
          type: Array,
          default() {
              return []
          }
      }
  }
  ```

- 子组件通过事件触发形式向父组件传值

  ```js
  this.$emit(事件方法, 值)
  ```

  

```html
	<div id="root">
		<counter :count="3" @inc="handleIncrease"></counter>
		<counter :count="2" @inc="handleIncrease"></counter>
		<div>{{total}}</div>
	</div>

	<script>
// 单向数据流：父组件可以向子组件传递任何数据，但是父组件传递过来的数据不能在子组件中直接修改，可以复制一个副本，更改副本
		var counter = {
			props: ['count'],
			data: function() {
				return {
					number: this.count
				}
			},
			template: '<div @click="handleClick">{{number}}</div>',
			methods: {
				handleClick: function() {
					this.number = this.number + 2;
					this.$emit('inc', 2)	// 子组件通过事件触发形式向父组件传值
				}
			}
		}

		var vm = new Vue({
			el: '#root',
			data: {
				total: 5
			},
			components: {
				counter
			},
			methods: {
				handleIncrease: function(step) {
					this.total += step
				}
			}
		})
	</script>
```

#### 3、vue中父组件调用子组件方法

用法： 子组件上定义`ref="refName"`,  父组件的方法中用 `this.$refs.refName.method` 去调用子组件方法

详解： 父组件里面调用子组件的函数，父组件先把函数/方法以属性形式传给子组件；那么就需要先找到子组件对象 ，即 `this.$refs.refName`.然后再进行调用，也就是 `this.$refs.refName.method`

1、在子组件中：`<div></div>`是必须要存在的 

2、在父组件中：首先要引入子组件 `import Child from './child';`

3、 `<child ref="mychild"></child>`是在父组件中为子组件添加一个占位，`ref="mychild"`是子组件在父组件中的名字

4、父组件中 components: {　　是声明子组件在父组件中的名字

5、在父组件的方法中调用子组件的方法，很重要 `this.$refs.mychild.parentHandleclick("嘿嘿嘿");`

#### 4、组件参数校验

```html
	<div id="root">
		<child content="hello world"></child>
	</div>

	<script>
		Vue.component('child', {
			props: {
				content: {
					type: String,
					required: false,   //如果是true，说明这个属性必传
					default: 'default value',   //当这个属性没有传递数据时，默认显示的值
					//校验
					validator: function(value) {
						return (value.length > 5)
					}
				}
			},
			template: '<div>{{content}}</div>'
		})

		var vm = new Vue({
			el: '#root'
		})
	</script>
```

#### 5、给子组件绑定原生事件

```html
<div id="root">
		<child @click.native="handleClick"></child>
	</div>

	<script>
		Vue.component('child', {
			template: '<div>Child</div>',
		})

		var vm = new Vue({
			el: '#root',
			methods: {
				handleClick: function() {
					alert('click')
				}
			}
		})
	</script>
```

#### 6、非父子组件的传值（Bus/总线/发布订阅模式/观察者模式）

```html
  <div id="root">
  	<child content="childOne"></child>
  	<child content="childTwo"></child>
  </div>

  <script>
  	// bus 总线 进行非父子组件的传值
  	Vue.prototype.bus = new Vue()


  	Vue.component('child', {
  		props: ['content'],
  		data: function() {
  			return {
  				myContent: this.content
  			}
  		},
  		template: '<div @click="handleClick">{{myContent}}</div>',
  		methods: {
  			handleClick: function() {
                // 派发方法
  				this.bus.$emit('change', this.myContent)
  			}
  		},
      	// 生命周期钩子 该组件被挂载时会执行的函数
  		mounted() {
  			var this_ = this;
            // 接收方法
  			this.bus.$on('change', function(content) {
  				this_.myContent = content
  			})
  		},
        // 及时解绑自定义事件
        beforeDestory() {
            // 及时销毁，否则可能造成内存泄漏
            event.$off('change', function(content) {
  				this_.myContent = content
  			})
        }
  	})

    var vm = new Vue({
      el: "#root"
    })
  </script>
```

#### 7、组件生命周期

- 单个组件

  created  页面还没开始渲染，但Vue实例已经初始化完成

  mounted  页面渲染完成  基本情况在mounted中进行操作，如ajax获取信息，绑定事件等

  beforeDestroy  解除绑定，销毁子组件以及事件监听器，如自定义事件，setTimeout，window、document事件

- 父子组件

  父组件先开始初始化，再子组件初始化，子组件渲染完成后，父组件才渲染完成

  index created

  list created

  list mounted

  index mounted

  父组件先开始进入更新状态，再子组件，子组件更新完成后，父组件才更新完成

  index beforeUpdate

  list beforeUpdate

  list updated

  index updated

  销毁destroy同理

### 3、Vue高级特性

#### 自定义组件的v-model

index.vue

```vue
<template>
    <p>{{name}}</p>
    <CustomVModel v-model="name" />
</templete>
<script>
import CustomVModel from './CustomVModel'
export default{
	components: {
    	CustomVModel
	},
    data() {
        return() {
            name: 'csm'
        }
    }
}
</script>
```

CustomVModel.Vue

```vue
<template>
    <!--	
        注意：
        1.input使用:value而不是v-model
        2.change和model.event要对应起来
        3.content属性对应起来（model里面定义的prop对应props里面的属性）
    -->
    <input type="text" :value="content" @input="$emit('change', $event.target.value)">
</templete>
<script>
export default{
	model: {
    	prop: 'content',
        event: 'change'
	},
    props:{
        content: String,
        default() {
            return ''
        }
    }
}
</script>
```

#### :star:2、$nextTick

由于Vue是异步渲染，所以data改变之后，DOM不会立刻渲染，$nextTick会在DOM渲染之后被触发，以获取最新DOM节点

##### 定义

**在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。**

```vue
<template>
	<div>
        <ul ref="ul1">
            <li v-for="(item, index) in list" :key="index">{{item}}</li>
        </ul>
        <button @click="addItem">
            添加一项
        </button>
    </div>
</template>
<script>
    data() {
        return {
            list: ['a', 'b', 'c']
        }
    },
        methods: {
            addItem() {
                this.list.push(`${Date.now()}`)
                this.list.push(`${Date.now()}`)
                this.list.push(`${Date.now()}`)
                // 1.异步渲染，$nextTick待DOM渲染完后再回调
                // 2.页面渲染时会将data的修改做整合，多次data修改只会渲染一次
                this.$nextTick(() => {
                    const ulElem = this.$refs.ul1
                    console.log(ulElem.childNodes.length)   
                    // 点击后 6，如果没有$nextTick是3
                })
            }
        }
</script>
```



##### 应用场景

下面了解下`nextTick`的主要应用的场景及原因。

- **在Vue生命周期的`created()`钩子函数进行的DOM操作一定要放在`Vue.nextTick()`的回调函数中**

**在`created()`钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳**，所以此处一定要将DOM操作的js代码放进`Vue.nextTick()`的回调函数中。**与之对应的就是`mounted()`钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。**

- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进`Vue.nextTick()`的回调函数中。
- **在使用某个第三方插件时 ，希望在vue生成的某些dom动态发生变化时重新应用该插件**，也会用到该方法，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法。



#####  Vue.nextTick(callback) 使用原理

原因是，Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOM操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。

当你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。



#### 8、插槽

- 单个插槽

  ```html
    <div id="root">
      <child>
        <h1>hello</h1>
      </child>
    </div>
  
    <script>
  
      var child = {
        template: '<div><slot>默认插槽的内容</slot></div>'
      }
  
      var vm = new Vue({
        components: {
          child
        },
        el: "#root"
      })
    </script>
  ```

- 具名插槽

  ```html
    <div id="root">
      <child>
        <h1 slot="header">header</h1>
        <h1 slot="footer">footer</h1>
      </child>
    </div>
  
    <script>
  
      var child = {
        template: `<div>
                    <slot name="header"></slot>
                    <div>
                      <h2>content</h2>
                    </div>
                    <slot name="footer"></slot>
                  </div>`
      }
  
      var vm = new Vue({
        components: {
          child: child
        },
        el: "#root"
      })
    </script>
  ```

- 作用域插槽

  使用场景：当子组件作循环，或某一部分的DOM结构由外部传递进来时

  ```html
  <div id="root">
  		<child>
  			<template slot-scope="props">
  				<h1>{{props.item}}</h1>
  			</template>
  		</child>
  	</div>
  
  	<script>
  
  		Vue.component('child', {
  			data: function() {
  				return {
  					list: [1, 2, 3, 4]
  				}
  			},
  			template: `<div>
  						<ul>
  							<slot 
  								v-for="item of list"
  								:item=item
  							></slot>
  						</ul>
  					   </div>`
  		})
  
  		var vm = new Vue({
  			el: '#root'
  		})
  	</script>
  ```

  #### 8、动态组件与v-once指令

  ```html
  	<div id="root">
  	    // 动态组件
  		// <component :is="type"></component>
  		<child-one v-if="type ==='child-one'"></child-one>
  		<child-two v-if="type ==='child-two'"></child-two>
  		<button @click="handleBtnClick">change</button>
  	</div>
  
  	<script>
  // v-once修饰的组件会把该dom隐藏掉,它还在内存里面,等到你需要它的时候就可以迅速渲染,从而提升性能。
  		Vue.component('child-one', {
  			template: '<div v-once>child-one</div>'
  		})
  
  		Vue.component('child-two', {
  			template: '<div v-once>child-two</div>'
  		})
  
  		var vm = new Vue({
  			el: '#root',
  			data: {
  				type: 'child-one'
  			},
  			methods: {
  				handleBtnClick: function() {
  					this.type = (this.type === 'child-one' ? 'child-two': 'child-one');
  				}
  			}
  		})
  	</script>
  ```




### 4、Vuex使用

#### 1、Vuex是什么？

vuex是一个专为vue.js应用程序开发的状态管理模式（它采用集中式存贮管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化）。

简单来说：`Vuex`解决项目中多个组件之间的数据通信和状态管理。

Vuex将状态管理单独拎出来，应用统一的方式进行处理，采用单向数据流的方式来管理数据。用处负责触发动作（`Action`）进而改变对应状态（`State`），从而反映到视图（`View`）上。

![vuex](..\picture\vuex.png)

![vux过程](..\picture\vux过程.png)

1、可用于多个组件之间的状态数据共享

2、路由间的复杂数据传递

[vue组件间通信六种方式（完整版）](https://www.cnblogs.com/hpx2020/p/10936279.html)

#### :star:2、vuex五大核心属性

**state，getter，mutation，action，module**

- state：存储数据，存储状态；在根实例中注册了store 后，用 `this.$store.state` 来访问；对应vue里面的data；存放数据方式为响应式，vue组件从store中读取数据，如数据发生变化，组件也会对应的更新。
- getter：可以认为是 store 的计算属性，它的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
- mutation：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
- action：包含任意异步操作，通过提交 mutation 间接变更状态。
- module：将 store 分割成模块，每个模块都具有state、mutation、action、getter、甚至是嵌套子模块。

#### 3、Vuex原理

Vuex实现了一个单向数据流，在全局拥有一个State存放数据，当组件要更改State中的数据时，必须通过Mutation进行，Mutation同时提供了订阅者模式供外部插件调用获取State数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走Action，但Action也是无法直接修改State的，还是需要通过Mutation来修改State的数据。最后，根据State的变化，渲染到视图上。

#### :star:4、各模块在流程中的功能

- Vue Components：Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。
- dispatch：操作行为触发方法，是唯一能执行action的方法。
- actions：**操作行为处理模块,由组件中的$store.dispatch('action 名称', data1)来触发。然后由commit()来触发mutation的调用 , 间接更新 state**。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。
- commit：状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。
- mutations：**状态改变操作方法，由actions中的commit('mutation 名称')来触发**。是Vuex修改state的唯一推荐方法。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
- state：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。
- getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。

mutations和actions的区别：mutations同步，actions异步

#### 5、Vuex与localStorage

vuex 是 vue 的状态管理器，存储的数据是响应式的。但是并不会保存起来，刷新之后就回到了初始状态，**具体做法应该在vuex里数据改变的时候把数据拷贝一份保存到localStorage里面，刷新之后，如果localStorage里有保存的数据，取出来再替换store里的state。**

```js
let defaultCity = "上海"
try {   // 用户关闭了本地存储功能，此时在外层加个try...catch
  if (!defaultCity){
    defaultCity = JSON.parse(window.localStorage.getItem('defaultCity'))
  }
}catch(e){}
export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity(state, city) {
      state.city = city
      try {
      window.localStorage.setItem('defaultCity', JSON.stringify(state.city));
      // 数据改变的时候把数据拷贝一份保存到localStorage里面
      } catch (e) {}
    }
  }
})
```

这里需要注意的是：由于vuex里，我们保存的状态，都是数组，而localStorage只支持字符串，所以需要用JSON转换：

```js
JSON.stringify(state.subscribeList);   // array -> string
JSON.parse(window.localStorage.getItem("subscribeList"));    // string -> array
```



### 5、Vue Router使用

#### 介绍

路由就是根据网址的不同，返回不同的内容给用户。

`<router-view>`显示的是当前路由地址所对应的内容。

Vue Router 是 [Vue.js](http://cn.vuejs.org/) 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

#### 安装

```bash
npm install vue-router
```

如果在一个模块化工程中使用它，必须要通过 `Vue.use()` 明确地安装路由功能：

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

如果使用全局的 script 标签，则无须如此 (手动安装)。

#### 单页面两种路由模式：hash与history

本质就是监听URL的变化，然后匹配路由规则，显示相应的页面，并且无需刷新。

##### hash模式

hash ——即地址栏URL中的#符号（此hash 不是密码学里的散列运算）。

主要通过监听url中的hash变化来进行路由跳转。用 `window.location.hash` 读取。

比如这个URL：http://www.abc.com/#/hello, hash 的值为#/hello。

**它的特点在于：hash 虽然出现URL中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。**

hash模式背后的原理是**onhashchange**事件,可以在window对象上监听这个事件:

```JavaScript
window.onhashchange = function(event){
     console.log(event.oldURL, event.newURL);
     let hash = location.hash.slice(1); 
     document.body.style.color = hash;
}
```

上面的代码可以通过改变hash来改变页面字体颜色，虽然没什么用，但是一定程度上说明了原理。 更关键的一点是，因为hash发生变化的url都会被浏览器记录下来，从而你会发现浏览器的前进后退都可以用了，同时点击后退时，页面字体颜色也会发生变化。这样一来，尽管浏览器没有请求服务器，但是页面状态和url一一关联起来，后来人们给它起了一个霸气的名字叫前端路由，成为了单页应用标配。

网易云音乐，百度网盘就采用了hash路由，看起来就是这个样子:

http://music.163.com/#/friend

https://pan.baidu.com/disk/home#list/vmode=list



原文链接：https://blog.csdn.net/xieguojun2013/article/details/12220189

1、hash值浏览器是不会随请求发送到服务器端的（即地址栏中#及以后的内容）。

2、可以通过window.location.hash属性获取和设置hash值。

3、如果注册onhashchange事件，设置hash值会触发事件。可以通过设置window.onhashchange注册事件监听器，也可以在body元素上设置onhashchange属性注册。

4、window.location.hash值的变化会直接反应到浏览器地址栏（#后面的部分会发生变化）。

5、同时浏览器地址栏hash值的变化也会触发window.location.hash值的变化，从而触发onhashchange事件。

6、当浏览器地址栏中URL包含hash如http://www.baidu.com/#home ，这时按下enter，浏览器发送http://www.baidu.com/请求至服务器,请求完毕之后设置hash值为#home，进而触发onhashchange事件。

7、当只改变浏览器地址栏URL的hash部分，这时按下enter,浏览器不会发送任何请求至服务器，这时发生的只是设置hash值新修改的hash值，并触发onhashchange事件。

8、html` <a>` 标签属性href可以设置为页面的元素ID如#top,当点击该锚链接时页面跳转至该id元素所在区域，同时浏览器自动设置window.location.hash属性，同时地址栏hash值发生改变，并触发onhashchange事件。

##### history路由(放在服务器环境下测试)

利用了HTML5 History Interface 中新增的pushState() 和replaceState() 方法。（需要特定浏览器支持）

随着history api的到来，前端路由开始进化了,前面的hashchange，你只能改变#后面的url片段，而history api则给了前端完全的自由

history api可以分为两大部分，切换和修改，参考MDN，切换历史状态包括`back`、`forward`、`go` 三个方法，对应浏览器的前进，后退，跳转操作：

```javascript
history.go(-2);//后退两次
history.go(2);//前进两次
history.back(); //后退
hsitory.forward(); //前进
```

**修改历史状态包括了`pushState`,`replaceState` （需要特定浏览器支持）**

两个方法,这两个方法接收三个参数:`stateObj`,`title`,`url`

```javascript
history.pushState({color:'red'}, 'red', 'red')
history.back();
setTimeout(function(){
     history.forward();
 },0)
window.onpopstate = function(event){
     console.log(event.state)
     if(event.state && event.state.color === 'red'){
           document.body.style.color = 'red';
      }
}
```

通过`pushstate`把页面的状态保存在state对象中，当页面的url再变回这个url时，可以通过`event.state`取到这个`state`对象，从而可以对页面状态进行还原，这里的页面状态就是页面字体颜色，其实**滚动条的位置，阅读进度，组件的开关的这些页面状态都可以存储到state的里面**。

这两个方法应用于浏览器的历史记录站，在当前已有的back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的URL，但你浏览器不会立即向后端发送请求。

##### history模式的问题

通过history api，我们丢掉了丑陋的#，但是它也有个问题：不怕前进，不怕后退，就怕**刷新**，**f5**，（如果后端没有准备的话）,因为刷新是实实在在地去请求服务器的,不玩虚的。 在hash模式下，前端路由修改的是#中的信息，而浏览器请求时是不带它玩的，所以没有问题.但是在history下，你可以自由的修改path，当刷新时，如果服务器中没有相应的响应或者资源，会分分钟刷出一个404来。

#### 用 Vue.js + Vue Router 创建单页应用

##### HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

##### JavaScript

```js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！
```

通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：

```js
// Home.vue
export default {
  computed: {
    username () {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
```

该文档通篇都常使用 `router` 实例。留意一下 `this.$router` 和 `router` 使用起来完全一样。我们使用 `this.$router` 的原因是我们并不想在每个独立需要封装路由的组件中都导入路由。

要注意，当 `<router-link>` 对应的路由匹配成功，将自动设置 class 属性值 `.router-link-active`。查看 [API 文档](https://router.vuejs.org/zh/api/#router-link) 学习更多相关内容。

#### 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。

例如，我们有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

现在呢，像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由。

一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。于是，我们可以更新 `User` 的模板，输出当前用户的 ID：

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` (如果 URL 中有查询参数)、`$route.hash` 等等。你可以查看 [API 文档](https://router.vuejs.org/zh/api/#路由对象) 的详细说明。

##### 响应路由参数的变化

提醒一下，当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}

```

#### 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```text
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+

```

借助 `vue-router`，使用嵌套路由配置，就可以很简单地表达这种关系。

接着上节创建的 app：

```html
<div id="app">
  <router-view></router-view>
</div>
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})

```

这里的 `<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 `<router-view>`。例如，在 `User` 组件的模板添加一个 `<router-view>`：

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

```

要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置：

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})

```

**要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

你会发现，`children` 配置就是像 `routes` 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。

此时，基于上面的配置，当你访问 `/user/foo` 时，`User` 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})

```

![异步组件实现按需加载](..\picture\异步组件实现按需加载.png)



### 6、vue动画

#### 1、过渡动画

```html
<style>
	/*默认是v-xxx，如果transition有name="XX"，则为XX-xxx*/
		.v-enter,
		.v-leave-to {
			opacity: 0;
		}
		.v-enter-active,
		.v-leave-active  {
			transition: opacity 1s;
		}
</style>
	
	<div id="root">
	<!-- 过渡 -->
		<transition>
			<div v-if="show">hello world</div>
		</transition>
		<button @click="handleClick">切换</button>
	</div>

	<script>
		var vm = new Vue({
			el: '#root',
			data: {
				show: true
			},
			methods: {
				handleClick: function() {
					this.show = !this.show
				}
			}
		})
	</script>
```

#### 2、自定义动画

```html
<style>
	/*自定义动画*/
		@keyframes bounce-in {
			0% {
				transform: scale(0);
			}
			50% {
				transform: scale(1.5);
			}
			100% {
				transform: scale(1);
			}
		}

		.active {
			transform-origin: left center;
			animation: bounce-in 1s;
		}
		.leave {
			transform-origin: left center;
			animation: bounce-in 1s;
		}
	</style>
	
	<div id="root">
	<!-- 可自定义transition中class的名字 -->
		<transition 
		    name="fade"
		    enter-active-class="active"
		    leave-active-class="leave"
		>
			<div v-if="show">hello world</div>
		</transition>
		<button @click="handleClick">toggle</button>
	</div>

	<script>
		var vm = new Vue({
			el: '#root',
			data: {
				show: true
			},
			methods: {
				handleClick: function() {
					this.show = !this.show
				}
			}
		})
	</script>
```

#### 3、Vue中的使用animate.css库

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue中的使用animate.css库</title>
  <script src="./vue.js"></script>
  <link rel="stylesheet" type="text/css" href="./animate.css">
</head>
<body>

  <div id="root">
    <transition 
      name="fade" 
      enter-active-class="animated swing"
      leave-active-class="animated shake"
    >
      <div v-show="show">Hello World</div>
    </transition>
    <button @click="handleClick">toggle</button>
  </div>

  <script>
    var vm = new Vue({
      el: "#root",
      data: {
        show: true
      },
      methods: {
        handleClick: function() {
          this.show = !this.show
        }
      }
    })
  </script>

</body>
</html>
```

#### 4、Vue中同时使用过渡和动画

```html
<div id="root">
      <!-- appear 第一次出现时出现动画 -->
      <!-- type="transition" 动画时长以transition为准 -->
      <!-- :duration="10000" 自定义动画时长 -->
    <transition
      :duration="{enter: 5000, leave: 10000}"
      name="fade"
      appear
      enter-active-class="animated swing fade-enter-active"
      leave-active-class="animated shake fade-leave-active"
      appear-active-class="animated swing"
    >
      <div v-show="show">Hello World</div>
    </transition>
    <button @click="handleClick">toggle</button>
  </div>
```

#### 5、Vue中的JS动画与velocity.js

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue中的JS动画与velocity.js</title>
  <script src="./vue.js"></script>
  <script src="./velocity.js"></script>
</head>
<body>

  <div id="root">
    <transition 
      name="fade"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
    >
      <div v-show="show">Hello World</div>
    </transition>
    <button @click="handleClick">toggle</button>
  </div>

  <script>
    var vm = new Vue({
      el: "#root",
      data: {
        show: true
      },
      methods: {
        handleClick: function() {
          this.show = !this.show
        },
        handleBeforeEnter: function(el) {
          el.style.opacity = 0;
        },
        // 不要忘记写 complete: done
        handleEnter: function(el, done) {
          Velocity(el, {
            opacity: 1
          }, {
            duration: 1000, 
            complete: done
          })
        },
        // JS实现动画
        // handleEnter: function(el, done) {
        //   setTimeout(() => {
        //     el.style.opacity = 1;
        //   }, 1000)
        // },
        handleAfterEnter: function(el) {
          console.log("动画结束")
        }
      }
    })
  </script>

</body>
</html>
```



## 二、vue原理



### 1、什么是vue.js

是一个轻量级MVVM框架

- 数据驱动：数据响应原理——数据（model）改变驱动视图（view）自动更新。

- 组件化：扩展html元素，封装可重用代码。

  组件设计原则

  - 页面上每个独立的可视/可交互区域视为一个组件
  - 每个组件对于一个工程目录，组件所需要的各种资源在这个目录下就近维护
  - 页面不过是组件的容器，组件可以嵌套自由组合形成完整的页面

vue三要素：

响应式、模板引擎、渲染

### 2、MVVM

这篇文章讲了MVC、MVVM等：[理解MVVM在react、vue中的使用](https://www.cnblogs.com/momozjm/p/11542635.html)

响应式，双向数据绑定，即MVVM。是指数据层（Model）-视图层（View）-数据视图（ViewModel）的响应式框架。它包括：

1.修改View层，Model对应数据发生变化。

2.Model数据变化，不需要查找DOM，直接更新View。

![MVVM框架](..\picture\MVVM框架.png)

![mvvm](..\picture\mvvm.png)

​        在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

　　ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM， 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

**vue的响应式原理**

当一个vue实例创建时，vue会遍历data选项的属性，用**Object.defineProperty**将它们转为getter/setter并且在内部追踪相关依赖，在属性被访问和修改时同时变化。 每个组件实例都有相应的watcher程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。

**vue双向绑定原理**

可以看看这篇文章：https://www.cnblogs.com/canfoo/p/6891868.html

以下部分转载自[浅谈Vue双向数据绑定的原理](https://www.jianshu.com/p/23180880d3aa)

实现mvvm的双向绑定，是采用数据劫持结合**发布者-订阅者模式**的方式，**通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调**。

就必须要实现以下几点：

1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者

2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数

3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图

4、mvvm入口函数，整合以上三者

![defineProperty](..\picture\defineProperty.png)

Object.defineProperty() 的**缺点**：

- 不能监听数组的变化：当你利用索引设置一个元素，或者修改数组长度这些操作并不是响应式的 
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

**展望ES6的新特性Proxy**

 vue3.0开始使用Proxy来实现数据的响应式

```js
let p = new Proxy(target, handler)
```

通俗的理解，在对象之前设一层拦截，要对目标对象做的相应的处理，必须通过这层拦截，他可以对外部的处理做一些过滤和操作；

proxy的优点有多达13种数据劫持的方法，缺点就是兼容性问题。 

可以看看 [vue3.0 尝鲜 -- 摒弃 Object.defineProperty，基于 Proxy 的观察者机制探索](https://juejin.im/post/5bf3e632e51d452baa5f7375)
[实现双向绑定Proxy比defineproperty优劣如何](https://github.com/xiaomuzhu/ElemeFE-node-interview/blob/master/JavaScript基础/Proxy.md) 







### 3、Vue整体实现流程

#### 1.解析模板成render函数

- ```js
  <div id="app">
      <p>{{price}}</p>
  </div>
  // render函数
  with(this){  // this即vm
    return _c(
      'div',
        {
            attrs: {"id": "app"}
        },
        [
            _c('p', [_v(_s(price))])
        ]
    )
  }
  ```

- 模板中的所有信息都被render函数包含

- 模板中用到的data中的属性，都变成了js变量

- 模板中的v-model，v-for，v-on都变成了js逻辑

- render函数返回vnode

#### 2.响应式开始监听

- Object.defineProperty监听

  当你把一个普通的JavaScript对象传给Vue实例的data选项，vue将遍历此对象所有的属性，并使用Object.defineProperty把这些属性全部转为getter/setter。

  这些getter/setter对用户来说是不可见的，但是在内部它们让vue追踪依赖，在属性被访问和修改时通知变化。

  ```js
  // 模拟实现vue监听data属性
  var obj = {};
  var data = {
      price: 100,
      name: 'zhangsan'
  };
  var key, value;
  for (key in data) {
      // 命中闭包，新建一个函数，保证key的独立作用域
      (function (key) {
          Object.defineProperty(obj, key, {
              get: function() {
                  console.log('get', key);
                  return data[key];
              },
              set: function(newVal) {
                  console.log('set', newVal);
                  data[key] = newVal;
              }
          })
      })(key)
  }
  ```

- 将data的属性代理到vm上

#### 3.首次渲染，显示页面，且绑定页面

- 初次渲染，执行updateComponent，执行vm._render()

  ```js
  vm._update(vnode) {
      const prevVnode = vm._vnode;
      vm._vnode = vnode;
      if (!prevVnode) {
          vm.$el = vm._patch_(vm.$el, vnode);
      } else {
          vm.$el = vm._patch_(prevVnode, vnode);
      }
  }
  function updateComponent() {
      vm._update(vm._render());
  }
  ```

- 执行render函数，会访问到vm.list和vm.title

- 会被响应式的get方法监听到

  _为什么要监听get，直接监听set不行吗？_

  data中有很多属性，有些被用到，有些可能不被用到，被用到的会走到get，不被用到的不会走到get，

  未走到get的属性，set的时候我们也无须关心，这样能避免不必要的重复渲染。

- 执行updateComponent，会走到vdom的patch方法

- patch将vnode渲染成DOM，初次渲染完成

#### 4.data属性变化，触发rerender

- 修改属性被响应式的set监听到
- set中执行updateComponent
- updateComponent重新执行vm._render()
- 生成的vnode和prevVnode，通过patch进行对比
- 渲染到html中

