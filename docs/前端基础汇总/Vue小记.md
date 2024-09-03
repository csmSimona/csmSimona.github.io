# Vue小记

##  一、Vue2使用

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

  - 双向数据绑定：`v-model`:star:

    其实，`v-model` 就是 `v-bind` 和 `v-on` 的语法糖。
  
    `v-model="message"` 相当于 `v-bind:value="message" v-on:input="message = $event.target.value"`
  
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

- **v-for 和 v-if 不能一起使用**

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

#### 父子组件传值

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

#### vue中父组件调用子组件方法

用法： 子组件上定义`ref="refName"`,  父组件的方法中用 `this.$refs.refName.method` 去调用子组件方法

详解： 父组件里面调用子组件的函数，父组件先把函数/方法以属性形式传给子组件；那么就需要先找到子组件对象 ，即 `this.$refs.refName`.然后再进行调用，也就是 `this.$refs.refName.method`

1、在子组件中：`<div></div>`是必须要存在的 

2、在父组件中：首先要引入子组件 `import Child from './child';`

3、 `<child ref="mychild"></child>`是在父组件中为子组件添加一个占位，`ref="mychild"`是子组件在父组件中的名字

4、父组件中 components: {　　是声明子组件在父组件中的名字

5、在父组件的方法中调用子组件的方法，很重要 `this.$refs.mychild.parentHandleclick("嘿嘿嘿");`

#### 组件参数校验

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

#### 给子组件绑定原生事件

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

#### 非父子组件的传值（Bus/总线/发布订阅模式/观察者模式）

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

#### 组件生命周期

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

#### 自定义组件的v-model:star:

在自定义组件中使用 v-model 时，需要分别为组件设置 value props 和 input 事件，并在组件内部使用 $emit 方法触发 input 事件。

在父组件中使用 v-model 指令绑定到子组件的 value 上即可完成数据的双向绑定。

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
    // 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
    // model.prop 可以定义父组件通过 v-model 传入的值应该对应自定义组件 props 的那个属性
	model: {
    	prop: 'content', // 用来接收 v-model 传进来的值
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

#### $nextTick:star:

- Vue是异步渲染
- data改变之后，DOM不会立刻渲染
- $nextTick会在DOM渲染之后被触发，以获取最新DOM节点

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

`$nextTick` 主要用于处理那些需要等待 Vue 完成 DOM 更新的场景，确保你的代码在正确的时机执行。这有助于避免因为 DOM 尚未更新而产生的问题。

- **`created()`里进行的DOM操作**

​		在`created()`钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进`$nextTick`的回调函数中。与之对应的就是`mounted()`钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。

- **数据更新后的DOM操作**

  在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进`$nextTick`的回调函数中。

- **嵌套更新**

  如果你在一个方法中连续多次修改同一个数据属性，或者进行了嵌套的数据更新，可以使用 `$nextTick` 来确保所有更改完成后再进行操作。

- **动态组件切换**

  当动态切换组件时，可能需要知道新组件已经被渲染到了 DOM 中。在这种情况下，可以在组件切换后使用 `$nextTick`。

- **与第三方库集成**

  当你需要和一些依赖于 DOM 的第三方库一起工作时，要确保这些库是在 DOM 更新之后调用。



#####  Vue.nextTick(callback) 使用原理

原因是，Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOM操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。

当你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。



#### 插槽:star:

没有插槽的情况下在组件标签内写一些内容是不起任何作用的，当在组件中声明了slot元素后，在组件元素内写的内容就会替换slot。

用于父组件中往子组件中插入一段内容。

##### 单个插槽

```html
  <div id="root">
    <child>
      <h1>hello</h1>
    </child>
  </div>

  <script>

    var child = {
      template: '<div><slot>默认内容，即父组件没设置内容时，这里显示</slot></div>'
    }

    var vm = new Vue({
      components: {
        child
      },
      el: "#root"
    })
  </script>
```

##### 具名插槽

通过给 `<slot>` 元素添加 `name` 属性来定义不同的插槽，这样就可以在父组件中指定具体的内容应该出现在哪个位置。

```html
  <div id="root">
    <child>
        <!-- 缩写 <template #header> -->
        <template v-slot:header>
            <h1>将插入header slot中</h1>
        </template>
        <p>将插入到main slot中，即未命名的slot</p>
        <template v-slot:footer>
            <h1>将插入footer slot中</h1>
        </template>
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

##### 作用域插槽

允许子组件向父组件传递数据，并且在父组件中根据这些数据动态地生成内容。这通常通过 `<slot>` 标签的 `v-bind` 绑定来实现。

```html
<div id="root">
    <child>
        <template v-slot="slotProps">
            <ul>
              <li v-for="item in slotProps.items" :key="item">{{ item }}</li>
            </ul>
        </template>
        <!-- 使用解构 -->
        <template v-slot="{ items }">
            <ul>
              <li v-for="item in items" :key="item">{{ item }}</li>
            </ul>
        </template>
    </child>
</div>

<script>
    Vue.component('child', {
        data: function() {
            return {
                items: [1, 2, 3, 4]
            }
        },
        template: `<div>
                    <ul>
                        <slot :items="items"></slot>
                    </ul>
                   </div>`
    })

    var vm = new Vue({
        el: '#root'
    })
</script>
```

##### 具名作用域插槽

具名作用域插槽的工作方式也是类似的，插槽 props 可以作为 `v-slot` 指令的值被访问到：`v-slot:name="slotProps"`。

当使用缩写时是这样：

```vue
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

向具名插槽中传入 props：

```vue
<slot name="header" message="hello"></slot>
```

注意插槽上的 `name` 是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽。因此最终 `headerProps` 的结果是 `{ message: 'hello' }`。



#### 动态组件与v-once指令

- 动态组件用法 `<component :is="component-name" />`  

  被传给 `:is` 的值可以是以下几种：

  - 被注册的组件名
  - 导入的组件对象

- 需要根据数据，动态渲染的场景，如常见的有文本，视频，图片组件的新闻详情页。即组件类型不确定。

- 每次都会销毁和重建，为了性能优化，也可以使用keep-alive缓存

```html
	<div id="root">
	    <!-- 动态组件 -->
		<!-- <component :is="type"></component> -->
	    <!-- 使用v-once -->
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



#### 异步组件

- import()函数

  同步引入组件：`import formDemo from './formDemo'`

  异步引入组件：

  ```vue
  components:{
  	formDemo: () => import('./formDemo')
  }
  ```

- 按需加载，异步加载大组件



#### keep-alive

```vue
<keep-alive>
	<KeepAliveStageA v-if="state === 'A'" />
    <KeepAliveStageB v-if="state === 'B'" />
    <KeepAliveStageC v-if="state === 'C'" />
</keep-alive>
```

- `<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

- 频繁切换不需要重复渲染，用于tab切换等

- Vue常见性能优化

- v-show和keep-alive的区别：

  v-show是在css层面，控制元素的显示方式，将display属性在block和none来回切换；

  keep-alive是vue中的一个抽象组件，用于保存组件的渲染状态。

```vue
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
    <router-view></router-view>
</keep-alive>
```

**include**定义缓存白名单，keep-alive会缓存命中的组件；**exclude**定义缓存黑名单，被命中的组件将不会被缓存；**max**定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。

> 内存管理的一种页面置换算法，对于在内存中但又不用的数据块（内存块）叫做LRU，操作系统会根据哪些数据属于LRU而将其移出内存而腾出空间来加载另外的数据。



#### mixin

mixin.js

```js
export default {
    data() {
        return {
            city: ''
        }
    },
    methods: {
        showName() {
            console.log(this.name)
        }
    }
}
```

index.Vue

```vue
<script>
import myMixin from './mixin'
export default {
    mixins: [myMixin], // 可以添加多个，会自动合并起来
    data() {
        return {
            name: ''
        }
    },
    methods: {
    }
}
</script>
```

- 多个组件有相同逻辑，抽离出来
- mixin并不是完美的解决方案，会有一些问题
  - 变量来源不明确，不利于阅读
  - 多mixin可能造成命名冲突
  - mixin和组件可能出现多对多的关系，复杂度较高
- Vue3提出的Composition API旨在解决这些问题




### 4、Vuex使用

`Vuex`解决项目中多个组件之间的数据通信和状态管理。

[vue组件间通信六种方式（完整版）](https://www.cnblogs.com/hpx2020/p/10936279.html)

#### vuex五大核心属性

**state，getter，mutation，action，module**

- state：存储数据，存储状态；在根实例中注册了store 后，用 `this.$store.state` 来访问；对应vue里面的data；存放数据方式为响应式，vue组件从store中读取数据，如数据发生变化，组件也会对应的更新。
- getter：可以认为是 store 的计算属性，它的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
- mutation：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
- action：包含任意异步操作，通过提交 mutation 间接变更状态。
- module：将 store 分割成模块，每个模块都具有state、mutation、action、getter、甚至是嵌套子模块。

#### Vuex原理

Vuex实现了一个单向数据流，在全局拥有一个State存放数据，当组件要更改State中的数据时，必须通过Mutation进行，Mutation同时提供了订阅者模式供外部插件调用获取State数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走Action，但Action也是无法直接修改State的，还是需要通过Mutation来修改State的数据。最后，根据State的变化，渲染到视图上。

#### 各模块在流程中的功能

- Vue Components：Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。
- dispatch：操作行为触发方法，是唯一能执行action的方法。
- actions：**操作行为处理模块,由组件中的$store.dispatch('action 名称', data1)来触发。然后由commit()来触发mutation的调用 , 间接更新 state**。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。
- commit：状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。
- mutations：**状态改变操作方法，由actions中的commit('mutation 名称')来触发**。是Vuex修改state的唯一推荐方法。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
- state：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。
- getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。

mutations和actions的区别：mutations同步，actions异步

#### Vuex与localStorage

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

#### 路由模式

##### hash模式（默认）

- 通过监听url中的hash变化来进行路由跳转

- 可以通过`window.location.hash`属性获取和设置hash值。比如这个URL：http://www.abc.com/#/hello, hash 的值为#/hello。

- **它的特点在于：hash 虽然出现URL中，但不会随请求发送到服务器端，因此改变hash不会重新加载页面。**

- hash模式背后的原理是**onhashchange**事件，可以在window对象上监听这个事件

  ```js
  // 监听hash变化
  window.onhashchange = (event) => {
      console.log('old url', event.oldURL)
      console.log('new url', event.newURL)
  
      console.log('hash:', location.hash)
      // 进行一些操作
  }
  ```

- hash 变化方式

  -  JS 修改 url
  - 手动修改 url 的 hash
  - 浏览器前进、后退



##### history路由(需要server端支持)

利用了HTML5 History Interface 中新增的`pushState() `和`replaceState() `方法

```javascript
history.go(-2);	// 后退两次
history.go(2);	// 前进两次
history.back(); // 后退
hsitory.forward(); // 前进

// 参数：stateObj, title, url
// 浏览器不会刷新页面
history.pushState({color: 'red'}, 'red', 'red') // 添加历史记录
history.replaceState({color: 'red'}, 'red', 'red') // 修改历史记录

// 监听历史记录变化
window.onpopstate = function(event){
    console.log('onpopstate', event.state, location.pathname)
     if(event.state && event.state.color === 'red'){
           document.body.style.color = 'red';
      }
}
```

**history.pushState**方法接受三个参数，依次为：

1、state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。可用它来传一些数据

2、title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。

3、url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

history.replaceState方法跟pushState一样只不过replaceState是修改当前的状态。



##### 两者选择 

- toB 的系统推荐用hash，简单易用，对url规范不敏感
- toC 的系统，可以考虑选择h5 history，但需要服务端支持 



#### 动态路由

```js
const User = {
    template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头 能命中'/user/20','/user/10'等格式的路由
        { path: '/user/:id', components: User }
    ]
})
```

#### 懒加载

```js
const router = new VueRouter({
    routes: [
        { 
            path: '/user/:id', 
            // 异步加载组件
            components: () => import('./../components/Navigator')
        }
    ]
})
```

#### 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```css
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

#### 路由守卫

##### 全局前置守卫

可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

每个守卫方法接收两个参数：

- **`to`**: 即将要进入的目标
- **`from`**: 当前导航正要离开的路由

可以返回的值如下:

- `false`: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
- 一个[路由地址](https://router.vuejs.org/zh/api/#routelocationraw): 通过一个路由地址重定向到一个不同的地址，如同调用 `router.push()`，且可以传入诸如 `replace: true` 或 `name: 'home'` 之类的选项。它会中断当前的导航，同时用相同的 `from` 创建一个新导航。



##### 路由守卫

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```



##### 组件内的守卫

```js
<script>
export default {
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
</script>
```



## 二、Vue原理

### 1、MVVM

是指数据层（Model）- 视图层（View）- 数据视图（ViewModel）的响应式框架

- 修改View层，Model对应数据发生变化。

- Model数据变化，不需要查找DOM，直接更新View。

- 在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互。

- MVVM 的核心在于通过**双向数据绑定**机制实现 View 和 ViewModel 的自动同步，减少了手动更新UI的工作量。



**MVC和MVVM的区别**

**MVC**

优点:

- 易懂: 简单易懂
- 层次分明: 共三个部分，各自完成各自的内容，在有Controller将大家协调在一起。

弊端:

- 量级重 : `View`和`Controller`处理过多的业务逻辑如协调模型和视图之间的所有交互，导致量级重，维护成本很高。
- 过轻的`Model`对象:在实践中往往大家都把Model的量级设计的非常轻，总容易当做数据模型来对待。

**MVVM**

优点:

- 低耦合: `View`可以独立于Model变化和修改，一个`ViewModel`可以绑定到不同的View 上。
- 可重用性: 可以把一些视图逻辑放在一个`ViewModel`里面，让很多`View`重用这段视图逻辑。

弊端:

- 数据绑定后使得`Bug`很难被调试。
- 数据绑定和数据转化需要`花费更多`的内存成本。

**二者之间的关系图**

MVVM实质上是把 MVC 中的C的功能给拆分了。

![MVC和MVVM](../picture/MVC和MVVM.png)



### 2、双向数据绑定原理

双向数据绑定是指数据模型与视图之间的双向同步。Vue.js 通过 `v-model` 指令实现了这一功能。

**1、数据模型到视图的同步**

Vue.js 使用响应式系统来跟踪数据变化。

在 Vue 2 中，使用 `Object.defineProperty` 来实现响应式属性，而在 Vue 3 中则使用了 `Proxy` 来替代，以便更好地处理复杂数据结构的变化。当一个属性被访问或修改时，Vue 会自动触发相应的更新。

[Vue2响应式原理](#_3、响应式原理)

**2、视图到数据模型的同步**

这个方向的同步通常涉及事件监听和数据更新。

当用户与视图交互时（例如在输入框中输入数据），视图会触发一个事件（如 `input` 事件）。`v-model` 指令会监听这些事件，并将事件触发的数据变化同步回数据模型。



**实现v-model**

其实`v-model` 就是 `v-bind` 和 `v-on` 的语法糖。

`v-model="message"` 相当于 `v-bind:value="message" v-on:input="message = $event.target.value"`

```vue
<template>
   <!-- 这里添加了input时间的监听和value的属性绑定 -->
   <input @input='onInput' :value='localValue' />
   <span>{{localValue}}</span>
</template>
<script>
  export default {
    data() {
      return {
        localValue: '',
      }
    },
    methods: {
      onInput(v){
         // 在input事件的处理函数中更新value的绑定值
         this.localValue = v.target.value;
      }
    }
  }
</script>
```



### 3、响应式原理

响应式原理是**实现数据模型到视图同步（数据驱动视图）**的关键技术，它确保了当数据模型中的数据发生变化时，视图能够自动更新。

响应式原理是通过**数据劫持结合发布-订阅模式**实现的：

- 当一个vue实例创建时，vue会遍历data选项的属性，用`Object.defineProperty()`将它们转为`getter`/`setter`并且在内部追踪相关依赖，在属性被访问和修改时同时变化。 

- 每个组件实例都有相应的`Watcher`程序实例，能够订阅并收到每个属性变动的通知

- 当数据修改时，依赖项的`setter`被调用，进而触发`Watcher`上相应的监听回调，从而更新视图



#### **核心API**

`Object.defineProperty(obj, props, descriptor)`

作用： 在对象上定义一个新属性或者修改原有属性

返回值： 修改后的目标对象obj

参数定义：

- obj: 在其上定义或修改属性的目标对象
- props: 属性名称
- descriptor: 属性描述符

```js
const data = {}
const name = 'zhangsan'
Object.defineProperty(data, "name", {
    enumerable: true,
    configurable: true,
    // 拦截get，当我们访问data.key时会被这个方法拦截到
    get: function() {
        // 我们在这里收集依赖
        console.log('get')
        return name
    },
    // 拦截set，当我们为data.key赋值时会被这个方法拦截到
    set: function(newVal) {
        // 当数据变更时，通知依赖项变更UI
        console.log('set')
        name = newVal
    }
})

// 测试
console.log(data.name) // get zhangsan
data.name = 'lisi'     // set
```



#### **如何深度监听data变化（简单实现）**

```js
function updateView() {
    console.log('视图更新')
}
function defineReactive(target, key, value) {
    // 深度监听
    observe(value)
    // 核心API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 设置新值
                observe(newValue)
                value = newValue
                // 触发更新视图
                updateView()
            }
        }
    })
}

function observe(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }
    // 重新定义各个熟悉（for in也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: 'beijing' // 需要深度监听
    }
}

data.info.address = 'shanghai'
```



#### **如何监听数组变化（简单实现）**

```js
// 重新定义数组原型
const oldArrayProperty = Array.propertype;
// 创建新对象，原型指向oldArrayProperty，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);

// 比如 这个新对象有push方法，则先实现他自己定义的push方法
// 然后再处理原型数组的push方法  
// 即 Array.prototype.push(this, ...arguments)
['push', 'pop', 'shift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        updateView() //触发视图更新
        // 再去实现原型数组中对应的方法
        oldArrayProperty[methodName].call(this, ...arguments)
    }
})

function observe(target) {
    if (typeof target !== 'object' ||target === null) {
        return target
    }
    // 监听数组
    if (Array.isArray(target)) {
        target.__proto__ = arrProto
    }
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}
```



#### **`Object.defineProperty()` 的缺点：**

- 深度监听需要递归到底（必须遍历对象的每个属性、必须深层遍历嵌套的对象），一次性计算量大
- 无法监听新增/删除属性（因此出现 Vue.set Vue.delete 来弥补该缺点）
- 无法原生监听数组，需要特殊处理



### 4、vdom（虚拟dom）和diff:star:

（[React小记-虚拟DOM](../前端基础汇总/React小记#_15、虚拟dom)中有写react相关虚拟dom和diff算法）

- vdom是实现vue和React的重要基石
- diff算法是vdom中最核心、最关键的部分

#### vdom

用JS模拟DOM结构，计算出更小的变更，操作DOM（具体可以看 react基础 中  虚拟DOM  这一节）

##### 用js模拟DOM结构

```html
<!-- DOM结构 -->
<div id="div1" class="container">
    <p>
        vdom
    </p>
    <ul style="font-size: 20px;">
        <li>a</li>
    </ul>
</div>
```

```js
// js模拟
{
    tag: 'div',
    props: {
        className: 'container',
        id: 'div1'
    },
    children: [
        {
            tag: 'p',
            children: 'vdom'
        }, {
            tag: 'ul',
            props: {
                style: 'font-size: 20px;'
            },
            children: [
                {
                    tag: 'li',
                    children: 'a'
                }
            ]
        }
    ]
}
```



##### 通过snabbdom学习vdom

snabbdom：性能强大的虚拟dom库

- 用js模拟dom结构（vnode）
- 新旧vnode对比，得出最小的更新范围，最后更新dom
- 数据驱动视图的模式下，高效控制dom操作 



#### diff算法

- 只比较同一层级，不跨级比较
- tag不相同，则直接删掉重建，不再深度比较
- tag和key，两者都相同，则认为是相同节点，不再深度比较 

从snabbdom源码（snabbdom.ts）看diff算法：

- h函数（生成vnode对象） 
- patch函数
- patchVnode函数
- addVnodes removeVnodes
- updateChildren函数（key的重要性） 



### 5、模板编译

#### with语法

```js
 const obj = {a: 100, b: 200}
 // 使用with，能改变{}内自由变量的查找方式
 // 将{}内自由变量，当做obj的属性来查找
 with(obj) {
   console.log(a)
   console.log(b)
   console.log(c) // 会报错
 }
```

#### vue-template-complier 将模板编译为render函数 

```shell
npm i vue-template-complier
```

编译成render函数

```js
const compiler = require('vue-template-compiler')

// 插值
const template = `<p>{{message}}</p>`
// 编译出的render函数
with(this){return _c('p',[_v(_s(message))])}
// h -> vnode
// _c -> createElement -> vnode

// 表达式
const template = `<p>{{flag ? message : 'no message found'}}</p>`
with(this){return _c('p',[_v(_s(flag ? message : 'no message found'))])}

// 属性和动态属性
const template = `
    <div id="div1" class="container">
        <img :src="imgUrl"/>
    </div>
`;
with (this) {
    return _c("div", { staticClass: "container", attrs: { id: "div1" } }, [
        _c("img", { attrs: { src: imgUrl } }),
    ]);
}

// 条件
const template = `
    <div>
        <p v-if="flag === 'a'">A</p>
        <p v-else>B</p>
    </div>
`;
with (this) {
    return _c("div", [flag === "a" ? _c("p", [_v("A")]) : _c("p", [_v("B")])]);
}

// 循环
const template = `
    <ul>
        <li v-for="item in list" :key="item.id">{{item.title}}</li>
    </ul>
`;
with (this) {
    return _c(
        "ul",
        _l(list, function (item) {
            return _c("li", { key: item.id }, [_v(_s(item.title))]);
        }),
        0
    );
}

// 事件
const template = `
    <button @click="clickHandler">submit</button>
`;
with (this) {
    return _c("button", { on: { click: clickHandler } }, [_v("submit")]);
}

// v-model
const template = `<input type="text" v-model="name">`;
// 主要看 input 事件
with (this) {
    return _c("input", {
        directives: [
            {
                name: "model",
                rawName: "v-model",
                value: name,
                expression: "name",
            },
        ],
        attrs: { type: "text" },
        domProps: { value: name },
        on: {
            input: function ($event) {
                if ($event.target.composing) return;
                name = $event.target.value;
            },
        },
    });
}


// 编译
const res = compiler.compile(template)
console.log(res.render)
```



```js
// 从 vue 源码中找到缩写函数的含义
function installRenderHelpers (target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
}
```



#### 执行render函数生成vnode 

看上面vdom



### 6、组件渲染过程:star:

- 初次渲染过程

1. 解析模板为render 函数（或在开发环境已完成，vue-loader）
2. 触发响应式，监听data属性 getter setter
3. 执行render函数，生成vnode，patch(elem, vnode)

- 更新过程

1. 修改data，触发setter（此前在getter中已被监听）
2. 重新执行render函数，生成newVnode
3. patch(vnode, newVnode)

- 异步渲染

1. $nextTick
2. 汇总data的修改，一次性更新视图
3. 减少DOM操作次数，提高性能



### 7、Vue整体实现流程

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



## 三、Vue3学习

