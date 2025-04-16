# React小记

## 一、React使用

### 1、React基本使用

#### JSX

React发明了JSX，利用HTML语法来创建虚拟DOM。

React的核心机制之一就是可以在内存中创建虚拟的DOM元素。以此来减少对实际DOM的操作从而提升性能。

JSX即JavaScript XML，它是对JavaScript的语法扩展，React使用JSX来替代常规的JS。

**JSX的优点**

- JSX执行更快，因为它在编译为JS代码进行了优化
- 它是类型安全的，在编译过程中就能发现错误
  - React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止XSS（cross-site-scripting, 跨站脚本）攻击。
- 使用JSX编写模板更加简单快速

**JSX语法**

**1、变量、表达式**

我们可以在JSX中使用JS表达式（不能适用于语句），表达式写在大括号“{}”中

- `{2+2}`  `{user.firstName}`  `{formatName(user)}`

- 在JSX中不能使用if-else语句，但可以使用conditional（三元运算）表达式来替代

  ```js
  const show = true;
  {show ? <img src="xxx.png"/> : ''}
  ```

- 循环

  ```js
  const list = [1, 2, 3, 4, 5];
  {
      list.map((item, index) => {
          return <li key={index}>{item}</li>
      })
  }
  ```

**2、样式**

- React推荐使用内联样式。我们可以使用camelCase语法设置内联样式。

  React会在指定元素数字后自动添加px

  ```js
  var myStyle = {
      fontSize: 100,  // css中为font-size
      color: '#FF0000'
  };
  <h1 style={myStyle}>xxx</h1>
  ```

- ```js
  <h1 style = {{background: red;}}>xxx</h1> //两个大括号
  ```

- ```js
  .red-btn {
      background: red;
  }
  <h1 className='red-btn'>xxx</h1>  // 使用className而不是class
  ```

**3、注释**

```js
{/* ... */}
{
    // （单行注释要换行）
}
```

**4、数组**

JSX允许在模板中插入数组，数组会自动展开所有成员

```js
var arr = [
    <h1>xxx</h1>
    <h2>xxx</h2>
];
<div>{arr}</div>
```

**5、原生HTML**

```js
var item = `<h1>hello</h1>`
<li
	key={index}
	onClick={this.handleItemDelete.bind(this, index)}
    dangerouslySetInnerHTML={__html: item}
>
</li>
```



#### 事件

- bind this

  ```js
  // 将这种作用域的修改放在constructor中，保证作用域绑定操作只执行一次。
  this.handleBtnClick = this.handleBtnClick.bind(this) //绑定this为对应组件<TodoList/>
  
  <button className="button" onClick={this.handleBtnClick}>提交</button>
  
  handleBtnClick() {
      // console.log(this)  // this默认是undefined
      this.setState({
          inputValue: ''
      })
  }
  
  // 用静态方法，this指向当前实例 不需要再绑定this
  handleBtnClick = () => {
      this.setState({
          inputValue: ''
      })
  }
  ```

- 关于event参数

  ```js
  handleBtnClick = (event) => {
      event.preventDefault()  // 阻止默认行为
      event.stopPropagation() // 阻止冒泡
      console.log('target', event.target)  // 指向当前元素，即当前元素触发
      console.log('current target', event.currentTarget) // 指向当前元素，假象！
      
      // 注意，event其实是React封装的。可以看__proto__constructor是 SyntheticEvent
      conole.log('event', event)
      
      // 原生event（event.nativeEvent）如下。其__proto__constructor是 MouseEvent
      console.log('NativeEvent', event.nativeEvent)
      console.log('NativeEvent target', event.nativeEvent.target) //指向当前元素
      console.log('NativeEvent current target', event.nativeEvent.currentTarget)
  	// 指向document元素/root组件
  }
  ```

  **版本升级**

  React16绑定到document

  **React17事件绑定到root组件**

  有利于多个React版本并存，例如微前端

- 传递自定义参数

  ```js
  <button className="button" onClick={this.handleBtnClick(id, title)}>提交</button>
  
  handleBtnClick(id, title, event) {
      console.log(id, title)
      console.log('event', event)  // 最后追加一个参数，即可接收event
  }
  ```



#### state和setState

- 不要直接修改state

  ```js
  this.state.comment = 'hello'; // wrong
  this.setState({
      comment: 'hello';  //right
  })
  ```

  构造函数是唯一可以给this.state赋值的地方

  

- State 的更新可能是异步的

  ```js
  this.setState({
      count: this.state.count + 1
  }, () => {
      // 联想 Vue $nextTick - DOM
      console.log('count by callback', this.state.count) // 回调函数中可以拿到最新的 state
  })
  console.log('count', this.state.count) // 异步的，拿不到最新值
  ```

  ```js
  // setTimeout 中 setState 是同步的
  setTimeout(() => {
      this.setState({
          count: this.state.count + 1
      })
      console.log('count in setTimeout', this.state.count)
  }, 0)
  ```

  ```js
  // 自己定义的 DOM 事件，setState 是同步的
  bodyClickHandler = () => {
      this.setState({
          count: this.state.count + 1
      })
      console.log('count in body event', this.state.count)
  }
  componentDidMount() {
      // 自己定义的 DOM 事件，setState 是同步的
      document.body.addEventListener('click', this.bodyClickHandler)
  }
  componentWillUnmount() {
      // 及时销毁自定义 DOM 事件
      document.body.removeEventListener('click', this.bodyClickHandler)
      // clearTimeout
  }
  ```

  

  出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
  因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
  例如，此代码可能会无法更新计数器

  ```js
  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });
  ```

  要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数

  ```js
  // Correct
  this.setState((state, props) => ({
    counter: state.counter + props.increment
  }));
  ```

- 可能会被合并

  ```js
  // 传入对象，会被合并（类似 Object.assign ）。执行结果只一次 +1
  this.setState({
      count: this.state.count + 1
  })
  this.setState({
      count: this.state.count + 1
  })
  this.setState({
      count: this.state.count + 1
  })
  
  // 传入函数，不会被合并。执行结果是 +3
  this.setState((prevState, props) => {
      return {
          count: prevState.count + 1
      }
  })
  this.setState((prevState, props) => {
      return {
          count: prevState.count + 1
      }
  })
  this.setState((prevState, props) => {
      return {
          count: prevState.count + 1
      }
  })
  ```



#### 组件生命周期

[React 组件生命周期图示](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

- constructor：在组件一创建的时刻就被调用。但不归类在React的生命周期中，因为它是ES6里面的东西，不是React独有的。
- componentWillMount：在组件即将被挂载到页面的时刻自动执行。
- componentDidMount：在组件被挂载后自动执行。
- shouldComponentUpdate：组件被更新之前，自动被执行需要返回一个布尔值。true 更新 false 不会被更新
- componentWillUpdate：组件被更新之前，它会自动执行，但是它在shouldComponentUpdate之后被执行，如果返回true就执行，如果返回false，这个函数就不会被执行了。
- componentDidUpdate：组件被更新之后自动执行。
- componentWillReceiveProps：一个组件要从父组件接受参数。只要父组件的render函数被重新执行了，子组件的这个生命周期函数就会被执行（如果这个组件第一次存在与父组件中，不会执行；如果这个组件之前已经存在于父组件中，才会执行）
- componentWillUnmount：当这个组件即将被从页面中剔除的时候，会被执行。



#### 循环列表中元素的 key 

循环列表中元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。

通常，我们使用来自数据 id 来作为元素的 key：

```js
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：

```js
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

**循环中的key值最好不是index，原始虚拟DOM树和新的虚拟DOM树的key值一致能提升虚拟DOM比对的性能，而列表项目的顺序可能会变化，index是不稳定的，经常会改变。使用index做key值会导致性能变差，还可能引起组件状态的问题。**如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。



#### 父子组件的通信

##### 父传子

- 父组件通过属性形式向子组件传递参数，子组件通过props接收父组件传递过来的参数

  无论是使用函数声明还是class声明，都绝不能改变自身的props，所有React组件都必须像纯函数一样保护它们的props不被改变

  ```js
  // 父组件
  <TodoItem 
  	delete={this.handleDelete} 
  	key={index} 
  	content={item} 
  	index={index} />
  // 子组件
  handleDelete() {
  	this.props.delete(this.props.index);
  }
  <li key={this.props.index} onClick={this.handleDelete}>{this.props.content}</li>
  ```

- 子组件如果想与父组件通信，子组件要调用父组件传过来的方法

- 子组件只能使用父组件传递过来的值，但不能改变值（单向数据流）

##### 子传父

1、通过refs传递

```js
// 父组件
<QueryBox ref="queryBox" app={this.app} onSearch={this.onSearch} onCount={this.onCount} />

let QueryBoxInstance = this.refs.queryBox as QueryBox;

QueryBoxInstance.onChange();
```

2、通过回调函数传递

父：`<Child onHandleChild="函数"/>`     父组件 => 函数(参数){ }

子：this.props.onHandleChild(传值)         在子组件中执行这个函数,会传值到父组件

```js
// 父组件
 <AddModal
    onOk={(score: any, review: any) => this.handleOk(score, review) as any}
    onCancel={this.hideModal as any}
    loading={this.state.loading}
    studentInfo={this.state.studentInfo}
 /> 

// 子组件
 <Modal
    visible={true}
    title="评分"
    onOk={()=>{
        this.props.onOk(this.state.score, this.state.review)
    }}
    onCancel={this.props.onCancel}
    confirmLoading={this.props.loading}
    okText="确认"
    className="review"
    cancelText="取消"
  \>
```



#### 扩大点击区域

```js
<label htmlFor="insertArea">输入内容</label>  // 不用for，与循环for有歧义
<input id="insertArea"/>
```



#### PWA

**什么是PWA**

PWA全称Progressive Web App，即渐进式WEB应用。

写网页的形式写手机APP应用。

> 1、可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
> 2、实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
> 3、实现了消息推送

registerServiceWorker

引用它，网页上线到支持https协议的服务器上。第一次访问时需联网才能看到，但突然断网，第二次访问时依然可以看到之前访问过的页面，因为registerServiceWorker会把之前的网页存储在浏览器内。



### 2、React高级特性

#### 函数组件

- 纯函数，输入props，输出JSX
- 没有组件实例
- 没有生命周期
- 没有state和setState，只能接收props
- 不能扩展其他方法

##### 什么是纯函数？

1. **确定性**：对于相同的输入参数，纯函数总是返回相同的结果。这意味着函数的行为是可以预测的，只要输入不变，输出就不会改变。
2. **无副作用**：纯函数除了返回值之外，不会对程序状态造成任何影响，也就是说它不会修改输入参数，也不会修改任何外部状态（例如全局变量）。此外，纯函数不应该执行像I/O操作这样的行为，因为这些操作通常会影响程序之外的世界。



#### 受控组件 (Controlled Components)

- **定义**: **在受控组件中，组件的状态由React组件自身的state或父组件传递下来的props控制**。这意味着组件的UI状态（如表单字段的值）总是由React的state保持同步。
- **特点**: 每当用户交互（如键盘输入）发生时，React会更新组件的状态，并重新渲染组件以反映新的状态。
- **示例**: 表单元素（如`<input>`、`<textarea>`、`<select>`）的值是由React的state直接控制的，通过事件处理器（如onChange）来更新state。

#### 非受控组件 (Uncontrolled Components)

- **定义**: **在非受控组件中，组件的状态不是由React state控制的，而是由DOM本身控制。**这通常意味着这些组件**将使用ref来访问DOM节点**，并从中读取状态。
- **特点**: 非受控组件通常用于简化那些不需要高度动态状态管理的场景。它们可以减少state的复杂度，并且在一些情况下性能更好。
- **示例**: 使用`ref`来获取DOM节点的引用，并直接操作DOM节点的状态。如文件上传、某些富文本编辑器，需要传入DOM元素



#### Portals（传送门）:star:

Portal是一种特殊的渲染方式，它允许你将子节点渲染到位于父组件以外的DOM节点中。

Portal的主要用途是**将组件的输出从其常规位置移动到文档中的另一个位置**，这对于创建**模态对话框、弹出窗口、悬浮菜单**等组件非常有用。

##### 基础使用

api：`ReactDOM.createPortal()`

示例：将组件渲染到 body 上

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        // // 正常渲染
        // return <div className="modal">
        //     {this.props.children} {/* vue slot */}
        // </div>

        // 使用 Portals 渲染到 body 上。
        return ReactDOM.createPortal(
            <div className="modal">{this.props.children}</div>,
            document.body // DOM 节点
        )
    }
}

export default App
```



##### Portal 的内部实现

Portal 的实现主要依赖于 React 的虚拟 DOM 机制以及对浏览器原生 DOM API 的利用。

Portal 的实现涉及到**将一部分虚拟 DOM 树渲染到页面上的不同位置，而不是直接作为当前组件树的一部分**。

**Portal 的具体步骤**

1. **创建 portal 节点**：
   - 当你调用 `ReactDOM.createPortal` 时，React 会在虚拟 DOM 中创建一个特殊的节点，这个节点包含要渲染的内容以及目标 DOM 容器。
2. **插入到 DOM 中**：
   - 在 commit 阶段，React 会遍历所有的 portal 节点，并将它们的实际内容（即它们的子树）插入到对应的 DOM 容器中。
3. **更新和删除**：
   - 如果门户的内容发生变化，React 会根据新的虚拟 DOM 树重新计算差异，并更新或删除 DOM 中的内容。
   - 当组件卸载或不再使用 `createPortal` 时，React 会清理门户的内容，并从 DOM 中移除相关的节点。



##### **注意事项**

- **状态管理**：Portal内的组件仍然遵循React的状态管理机制，因此你仍然可以像平常一样使用`state`和`props`来控制它们的行为。
- **生命周期**：Portal内的组件依然遵循标准的React生命周期，包括挂载、更新和卸载阶段。
- **样式隔离**：如果你在Portal内渲染的是一个模态窗口或其他类似的组件，你可能需要处理样式隔离的问题，以确保Portal内的样式不会影响到页面上的其他元素。



#### context:star:

优点：变量不用层层传递，省去无谓的传递props

缺点：使用全局变量的方法，会让组件失去独立性，复用起来更困难，会让组件变得不纯粹，不应该大规模使用。

使用场景：公共信息（语言、主题）传递给每个组件

```js
import React from 'react'

// 创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = React.createContext('light')

// 1、底层组件 - 函数式组件
function ThemeLink (props) {
    // const theme = this.context // 会报错。函数式组件没有实例，即没有 this

    // 函数式组件可以使用 Consumer
    return <ThemeContext.Consumer>
        { value => <p>link's theme is {value}</p> }
    </ThemeContext.Consumer>
}

// 2、底层组件 - class 组件
class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // static contextType = ThemeContext // 也可以用 ThemedButton.contextType = ThemeContext
    render() {
        const theme = this.context // React 会往上找到最近的 theme Provider，然后使用它的值。
        return <div>
            <p>button's theme is {theme}</p>
        </div>
    }
}
ThemedButton.contextType = ThemeContext // 指定 contextType 读取当前的 theme context。

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
            <ThemeLink />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'light'
        }
    }
    render() {
        return <ThemeContext.Provider value={this.state.theme}>
            <Toolbar />
            <hr/>
            <button onClick={this.changeTheme}>change theme</button>
        </ThemeContext.Provider>
    }
    changeTheme = () => {
        this.setState({
            theme: this.state.theme === 'light' ? 'dark' : 'light'
        })
    }
}

export default App
```



#### 异步组件:star:

- import()
- **React.lazy**
- **React.Suspense**

在React.Suspense里加载异步组件，加载未完成时展示fallback里的内容，加载完毕后才展示异步组件的内容

```js
import React from 'react'

const ContextDemo = React.lazy(() => import('./ContextDemo'))

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <p>引入一个动态组件</p>
            <hr />
            <React.Suspense fallback={<div>Loading...</div>}>
                <ContextDemo/>
            </React.Suspense>
        </div>
    }
}

export default App
```



#### shouldComponentUpdate（SCU）

是否更新组件

React 默认：父组件有更新，子组件则无条件也更新

SCU默认返回true

```js
shouldComponentUpdate(nextProps, nextState) {
    if (nextState.count !== this.state.count) {
        return true // 可以渲染
    }
    return false // 不重复渲染
}
```



#### React.PureComponent

在React中，当组件的props或state发生变化时，组件通常会重新渲染。然而，在某些情况下，组件的重新渲染可能是不必要的，尤其是在组件的渲染逻辑较为复杂或性能敏感的情况下。`React.PureComponent` 提供了一种简便的方法来避免不必要的重新渲染，从而提高性能。

`React.PureComponent` 自动实现了 `shouldComponentUpdate` 方法，该方法会比较当前的props和state与即将更新的props和state。如果发现浅比较的结果表明新的props或state与当前的相同，那么组件将不会重新渲染。这里所说的“浅比较”是指只比较对象的引用，而不是深入比较对象的内容。

##### **如何使用 `React.PureComponent`**

要使用 `React.PureComponent`，你需要让自己的类组件继承自 `React.PureComponent` 而不是直接继承自 `React.Component`。下面是一个简单的例子：

```jsx
import React, { PureComponent } from 'react';

class MyComponent extends PureComponent {
  render() {
    const { name } = this.props;
    return <h1>Hello, {name}!</h1>;
  }
}
```

在这个例子中，`MyComponent` 继承自 `React.PureComponent`。这意味着，如果父组件传递给 `MyComponent` 的props没有改变（基于浅比较），那么 `MyComponent` 不会被重新渲染。

##### **自定义比较逻辑**

虽然 `React.PureComponent` 默认使用浅比较来决定是否更新组件，但在某些情况下，你可能需要更详细的比较逻辑。例如，如果你的props包含深层嵌套的对象或数组，你可能希望深入比较这些对象的内容。此时，你可以覆盖 `shouldComponentUpdate` 方法来实现自定义的比较逻辑：

```jsx
class MyComponent extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    // 深度比较 props 中的某个对象
    if (this.props.someObject !== nextProps.someObject) {
      return false; // 如果对象引用不同，但是你想检查内容是否真的改变了
    }
    // 进行深度比较
    if (!isEqual(this.props.someObject, nextProps.someObject)) {
      return true; // 如果内容不同，则需要更新
    }
    return false;
  }

  render() {
    const { name } = this.props;
    return <h1>Hello, {name}!</h1>;
  }
}
```

在这个例子中，我们使用了一个假想的 `isEqual` 函数来进行深度比较。在实际应用中，你可能需要使用一个库，如 `lodash` 的 `_.isEqual` 方法来实现这一点。

##### **注意事项**

- **浅比较的局限性**：`React.PureComponent` 使用浅比较，这意味着它只会比较props和state的引用。如果你的props或state包含复杂的数据结构（如对象或数组），并且这些数据结构内部的变化不会改变它们的引用，那么 `React.PureComponent` 可能不会按预期工作。
- **性能考量**：虽然 `React.PureComponent` 可以提高性能，但如果你的应用已经很好地进行了优化，使用 `React.PureComponent` 可能不会带来显著的好处。另外，过度使用 `React.PureComponent` 也可能导致不必要的复杂性。
- **类组件 vs 函数组件**：随着React Hooks的引入，许多开发者倾向于使用函数组件而不是类组件。在这种情况下，可以使用 `React.memo` 来代替 `React.PureComponent`。



#### React.memo

`React.memo` 是一个高阶组件（Higher-Order Component, HOC），用于优化函数组件的性能。

它通过记忆化（memoization）机制来避免不必要的重新渲染，从而提升应用的性能。

我们可以使用 `React.memo` 来包装函数组件，只有当传递给它的props发生变化时，才会重新渲染这个组件。

##### **使用方法**

`React.memo` 接受一个函数组件作为参数，并返回一个新的经过优化的组件。

还可以传入第二个参数：一个比较函数（comparator function），这个函数用来比较新旧props，以决定是否需要重新渲染。

```jsx
import React, { memo } from 'react';

const MyComponent = memo(({ prop1, prop2 }) => (
  <div>
    <h1>Prop1: {prop1}</h1>
    <h2>Prop2: {prop2}</h2>
  </div>
));
```

##### **使用比较函数**

如果你需要自定义props的比较逻辑，可以提供一个比较函数作为 `React.memo` 的第二个参数。这个函数接受两个参数：上一次渲染时的props和当前的新props。如果这两个props被认为是相等的，则不会重新渲染组件。

```jsx
const MyComponent = memo(function MyComponent({ prop1, prop2 }) {
  return (
    <div>
      <h1>Prop1: {prop1}</h1>
      <h2>Prop2: {prop2}</h2>
    </div>
  );
}, (prevProps, nextProps) => {
  // 只有当prop1改变时才重新渲染
  return prevProps.prop1 === nextProps.prop1;
});
```

##### **注意事项**

- **默认比较**：当没有提供比较函数时，`React.memo` 默认使用浅层比较（shallow comparison）来检查props的变化。这意味着如果props对象或数组的引用发生了变化，即使其内部值未变，也会认为props发生了改变。
- **不可用于类组件**：`React.memo` 只能用于函数组件，如果你正在使用类组件，可以考虑使用 `React.PureComponent` 或者手动实现 `shouldComponentUpdate` 生命周期方法来达到类似的效果。
- **性能考量**：虽然 `React.memo` 可以提高性能，但也需要权衡其带来的额外开销。只有当组件的渲染成本较高且其props频繁改变时，使用 `React.memo` 才有意义。



#### 不可变值 immutable.js

不可变性意味着一旦一个数据对象被创建，就不能再被更改。相反，当你需要修改数据时，你需要创建一个新的对象，而不是修改原有的对象。

实现不可变性的一种常见方法是使用不可变数据结构和库，如 [Immutable.js](https://immutable-js.github.io/immutable-js/)。这个库提供了一套丰富的API来创建和操作不可变的数据结构，如Map、List等。

immutable对象是不可直接赋值的对象，它可以有效的避免错误赋值的问题

```js
import { Map, List } from 'immutable';

// 创建一个不可变的Map
const person = Map({
  name: 'Alice',
  age: 30,
  hobbies: List(['reading', 'writing'])
});

// 修改person中的age
const updatedPerson = person.set('age', 31);

console.log(updatedPerson); // 输出: Map { "name": "Alice", "age": 31, "hobbies": List [ "reading", "writing" ] }

// 添加一个新的爱好
const personWithNewHobby = updatedPerson.update('hobbies', hobbies => hobbies.push('painting'));

console.log(personWithNewHobby); // 输出: Map { "name": "Alice", "age": 31, "hobbies": List [ "reading", "writing", "painting" ] }
```

在这个例子中，我们创建了一个包含姓名、年龄和爱好的不可变Map。当我们需要修改年龄或添加一个新的爱好时，我们创建了一个新的Map实例，而不是修改原来的实例。



#### 高阶组件HOC:star:

这篇文章推荐阅读：[高阶组件（HOC）在 React 中的应用](https://juejin.cn/post/7220677873584734268)

- **高阶组件（HOC）是一个接收组件作为参数并返回一个新组件的函数。**换句话说，它是一种组件的转换器。

- 高阶组件通常用于在组件之间**复用逻辑**，例如**状态管理、数据获取、访问控制**等。

- HOC 的一个常见示例是 React-Redux 的 `connect` 函数，它将 Redux store 连接到 React 组件，使组件可以访问和更新 store 中的状态。
- 我在实际工作中应用在了权限控制和错误边界中（看上面发的文章）



##### 基本使用

```js
// 高阶组件不是一种功能，而是一种模式
const HOCFactory = (Component) => {
    class HOC extends React.Component {
        render() {
            // 返回拼装的结果
            return <Component {...this.props}/> 
        }
    }
    return HOC
}
const EnhancesComponent1 = HOCFactory(WrappedComponent1)
const EnhancesComponent2 = HOCFactory(WrappedComponent2)
```



##### 应用一：权限控制

根据用户权限来显示或隐藏某些组件。

```js
import React from "react";

function withAuthorization(WrappedComponent, requiredPermission) {
  return function WithAuthorizationComponent({ userPermission, ...props }) {
    if (userPermission >= requiredPermission) {
      return <WrappedComponent {...props} />;
    } else {
      return <div>您没有查看此内容的权限。</div>;
    }
  };
}

export default withAuthorization;
```



##### 应用二：错误边界

在 React 中，错误边界是一种用于捕获子组件树中发生的错误并显示友好错误信息的技术。我们可以使用高阶组件来实现一个通用的错误边界组件。

在这个高阶组件中，我们返回一个类组件，因为错误边界需要使用生命周期方法 `componentDidCatch` 和静态方法 `getDerivedStateFromError`。我们在组件的状态中记录是否发生了错误，并在渲染方法中根据 `hasError` 的值来决定是显示错误消息还是渲染 `WrappedComponent`。

```js
import React, { Component } from "react";

function withErrorBoundary(WrappedComponent) {
  return class WithErrorBoundaryComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      // 处理错误记录
      console.error("Error:", error, "Info:", info);
    }

    render() {
      if (this.state.hasError) {
        return <div>Something went wrong. Please try again later.</div>;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withErrorBoundary;
```



##### 应用三：性能监控

在这个高阶组件中，我们使用 `useRef` 和 `useEffect` Hooks 来计算 `WrappedComponent` 的渲染时间。当组件被渲染时，我们记录开始时间，然后在 `useEffect` 中计算渲染所花费的时间，并将结果打印到控制台

```js
import React, { useEffect, useRef } from "react";

function withPerformance(WrappedComponent) {
  return function WithPerformanceComponent(props) {
    const startTime = useRef(Date.now());

    useEffect(() => {
      const endTime = Date.now();
      const renderTime = endTime - startTime.current;
      console.log(`${WrappedComponent.name} render time: ${renderTime} ms`);
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withPerformance;
```



##### redux connect 是高阶组件

```js
import { connect } from 'react-redux'
// connect是高阶组件
const VisibleTodoList = connect(
	mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodolList
```



#### Render Props

在React中，`render props`是一种模式或一种技术，它允许一个组件通过其`props`中的一个名为`render`的函数来渲染子组件。这个模式可以让你更灵活地指定一个组件要如何渲染其部分或全部UI，同时还能保持良好的可复用性和模块化。

##### 基本使用

1. **定义组件**：创建一个接受`render prop`的父组件。这个`render prop`应该是一个函数，该函数通常接收一些参数（如数据或方法）作为输入，并返回需要渲染的React元素。
2. **消费组件**：在消费这个组件的地方，传递一个函数作为`render prop`的值。这个函数将会使用父组件提供的数据或行为来生成UI。

```js
// Render Props的核心思想
// 通过一个函数将class组件的state作为props传递给纯函数组件
class Factory extends React.Component {
    constructor() {
        this.state = {
            // state即多个组件的公共逻辑的数据
        }
    }
    // 修改state
    render() {
        return <div>{this.props.render(this.state)}</div>
    }
}

const App = () => (
    <Factory render={
        // render是一个函数组件
        (props)=> <p>{props.a} {props.b} ... </p>
    }/>
)
```

##### 例子

```js
import React from 'react'
import PropTypes from 'prop-types'

class Mouse extends React.Component {
    constructor(props) {
        super(props)
        this.state = { x: 0, y: 0 }
    }
  
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }
  
    render() {
      return (
        <div style={{ height: '500px' }} onMouseMove={this.handleMouseMove}>
            {/* 将当前 state 作为 props ，传递给 render （render 是一个函数组件） */}
            {this.props.render(this.state)}
        </div>
      )
    }
}
Mouse.propTypes = {
    render: PropTypes.func.isRequired // 必须接收一个 render 属性，而且是函数
}

const App = (props) => (
    <div style={{ height: '500px' }}>
        <p>{props.a}</p>
        <Mouse render={
            /* render 是一个函数组件 */
            ({ x, y }) => <h1>The mouse position is ({x}, {y})</h1>
        }/>
        
    </div>
)

/**
 * 即，定义了 Mouse 组件，只有获取 x y 的能力。
 * 至于 Mouse 组件如何渲染，App 说了算，通过 render props 的方式告诉 Mouse 。
 */

export default App
```

##### HOC VS Render Props

- HOC：模式简单 但会增加组件层级
- Render Props：代码简洁，学习成本较高
- 按需使用



### 3、Redux:star:

Redux是一个JavaScript状态管理库

#### **Redux 的核心概念**

1、**State（状态）**：

- 整个应用的状态都存储在一个单一的对象树中。这个对象树存储在一个全局的 store 中。这意味着你的应用所有部分的状态都被集中在一起，而不是分散在多个组件中。

2、**Store（仓库/存储）**：

- Store 是保存整个应用状态的地方。只有一个单一的 store 对象，它包含整个应用的状态树。Store 还提供了方法如 `getState()` 来获取状态，`dispatch(action)` 来发送动作，以及 `subscribe(listener)` 来注册监听器。

3、**Actions（动作）**：

- 动作是携带数据的普通 JavaScript 对象，用来描述发生了什么。它们是应用中的数据源，**是唯一可以改变状态的方法**。动作由用户交互（例如点击按钮）或者某些业务逻辑触发。

4、**Reducers（规约器/减少器）**：

- Reducers 告诉应用状态如何响应不同的动作。**它们是一个纯函数，接收当前状态和动作作为参数，并返回新的状态。**Reducers 必须是纯函数，这意味着对于相同的输入，它们必须总是返回相同的结果，并且除了计算外不做任何其他事情（比如修改状态或进行 I/O 操作）。



#### **使用 Redux 的步骤**

1. 定义 Actions：为每种类型的动作创建一个常量字符串。
2. 创建 Action Creators：这些是创建 actions 的工厂函数。
3. 编写 Reducers：根据应用的状态和动作来定义状态更新的逻辑。
4. 创建 Store：使用 `createStore` 函数结合 reducer 创建 store。
5. 将 Store 和 React 组件连接起来：使用 `react-redux` 库提供的 `Provider` 和 `connect` 函数，可以让 React 组件访问到 store 中的数据。

Redux 的设计使得它非常适合大型应用程序，特别是那些需要在客户端维持复杂状态的应用。它还支持中间件，如日志记录、崩溃报告和异步操作等，这进一步增强了它的灵活性和功能。



#### **代码示例**

```js
// store/index.js
import {createStore} from 'redux';
import reducer from './reducer';
const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()  // 用于redux调试
);

// store/reducer.js
const defaultState = {
    inputValue: '',
    list: []
};
// reducer 可以接收state，但绝不能修改state，所以要另外拷贝一个
export default (state = defaultState, action) => {
    if (action.type === 'change_input_value') {
        // 深拷贝
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    return state;
}

// Todolist.js (部分)
import store from './store';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);  // 订阅方法设置更新数据
  }
  render() {
    return (
      <TodoListUI 
        inputValue={this.state.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        handleItemDelete={this.handleItemDelete}
      />
    )
  }
  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action);
  }
  handleStoreChange() {
    this.setState(store.getState());
  }
}
```

#### **改变store里的数据**

1、先派发一个action，通过dispatch方法传递给store

2、store 自动调用 reducer，reducer中接收state和action进行处理，返回一个新的state返回给store，替换原来的store

3、store中数据改变react感知到store数据的改变，通过store.subscribe()订阅方法设置更新数据

#### **Redux设计和使用的三项原则**

1.store是唯一的

2.只有store能改变自己的内容

3.reducer必须是纯函数

**纯函数**：给定固定的输入，就一定会有固定的输出，而且不会有任何的副作用

```js
// 这样的函数被称为纯函数，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的参数。
funcition sum(a, b) {
    return a + b;
}
// 下面不是，自己更改了入参
function withdraw(account, amount) {
    account.total -= amount;
}
```

#### **Redux核心API**

1、createStore ——创建store

2、store.dispatch ——派发action，这个action会传递给store

3、store.getState ——获取store中所有的数据内容

4、store.subscribe ——订阅store的改变，只要store发生改变，subscribe中接收的回调函数就会被执行



### 4、Redux的中间件

对dispatch方法进行升级：

接收对象，和原来一样，直接传递对象给store

接收函数，先执行函数，执行完后需要调用store再操作

如：

redux-thunk中间件——改造store.dispatch使得后者可以接受函数作为参数

redux-saga——单独把逻辑拆分出来放到另一个文件中管理

**ps：中间是指action和store的中间，中间件是Redux的中间件，而不是react**

**redux-thunk的使用**

**redux-saga的使用**



### 5、React-Redux

运用Provider将组件和store对接，使在Provider里的所有组件都能共享store里的数据，

使用connect将 Redux store 和 React 组件连接，使组件可以访问和更新 store 中的状态。

**核心API**：

Provider：作用：连接store，内部组件都有能力获取store的内容

connect：组件与store作连接

mapStateToProps：把store中state映射成组件中的props

mapDispatchToProps：将store.dispatch挂载到props上



### 6、React-router使用

[Vue Router的使用](https://csmsimona.github.io/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%B1%87%E6%80%BB/Vue%E5%B0%8F%E8%AE%B0.html#_5%E3%80%81vue-router%E4%BD%BF%E7%94%A8)

- 路由模式（hash、H5 history），同vue-router
- 路由配置（动态路由、懒加载），同vue-router

![react-router路由模式](..\picture\react-router路由模式.jpg)

![react-router动态路由](..\picture\react-router动态路由.jpg)

![react-router跳转路由](..\picture\react-router跳转路由.jpg)

![react-router懒加载](..\picture\react-router懒加载.jpg)



## 二、React原理:star:

### 1、函数式编程

核心概念

- **不可变性(Immutability)**

  不可变性意味着不可改变。 在函数式编程中，你无法更改数据，也不能更改。 如果要改变或更改数据，则必须复制数据副本来更改。

- **纯函数(Pure Functions)**

  给定固定的输入，就一定会有固定的输出，而且不会有任何的副作用

- **数据转换(Data Transformations)**

  我们总是生成原始数据的转换副本，而不是直接更改原始数据。

- **高阶函数 (Higher-Order Functions)**

  在函数式编程中，高阶函数是指接受一个或多个函数作为参数，并且/或者返回一个函数的函数。

  `Array.map、Array.filter和Array.reduce`是高阶函数，因为它们将函数作为参数。

- **递归**

  递归是一种函数在满足一定条件之前调用自身的技术。只要可能，最好使用递归而不是循环。你必须注意这一点，浏览器不能处理太多递归和抛出错误。

- **组合**

  我们将功能划分为小型可重用的纯函数，我们必须将所有这些可重用的函数放在一起，最终使其成为产品。 将所有较小的函数组合成更大的函数，最终，得到一个应用程序，这称为**组合**。



### 2、虚拟DOM:star:

#### 什么是虚拟DOM？

用JS模拟DOM结构，DOM变化的对比，放在JS层进行（因为前端语言中只有JS是图灵完备语言）

[什么是图灵完备语言？](https://blog.csdn.net/Roselane_Begger/article/details/101176694)

- 创建真实DOM损耗的性能远大于创建虚拟DOM损耗的性能。

- 虚拟DOM提高性能，不是说不操作DOM，而是**减少操作DOM的次数，减少回流和重绘**。

- 虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 **dom diff 算法避免了没有必要的 dom 操作**，从而提高性能。



#### **虚拟DOM的优点**

1、**性能优化**：在直接操作真实的 DOM 时，每次更改都会导致页面重新渲染，这是一个昂贵的操作。而虚拟 DOM 可以先在内存中进行批量的更新，然后再一次性地将最终的变更应用到实际的 DOM 上，从而减少了重绘和回流的次数。

2、**代码简洁**：虚拟 DOM 使得 React 组件可以用更简洁、更具声明性的代码编写。开发者只需要关心应用的状态和如何根据状态渲染 UI，而不需要关心 DOM 操作的具体细节。

3、**跨平台**：React Native 利用了虚拟 DOM 的概念，可以在不同的平台上（如 iOS 和 Android）创建相似的用户界面，而不仅仅是Web。



#### 虚拟DOM实现

**1、state数据**

**2、JSX模板**

**3、数据+模板 生成虚拟DOM（虚拟DOM就是一个JS对象，用它来描述真实DOM）（损耗了性能）**

`['div', {id: 'abc'}, ['span', {}, 'hello world']]`

**4、用虚拟DOM的结构，生成真实的DOM来显示**

`<div id='abc'><span>hello world</span></div>`

**5、state发生变化**

**6、数据+模板 生成新的虚拟DOM（极大地提升了性能）**

`['div', {id: 'abc'}, ['span', {}, 'byebye']]`

**7、比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span中的内容（极大地提升了性能）**

**8、直接操作DOM，改变span中的内容**

JSX => createElement => 虚拟DOM（JS对象）=> 真实DOM

**jsx本质**

```js
const imgElem = <div id="div1">
    <p>some text</p>
	<img src={imgUrl} />
</div>


// 编译后
React.createElement("div", {
    id: "div1"
}, React.createElement("p", null, "some text"), React.createElement("img", {
    src: imgUrl
}))
```



#### diff 算法

##### React 早期版本中的 Diff 算法

在 React 15 及更早的版本中，diff 算法主要基于以下三个假设：

1. **在同一个层级上，如果两个元素的类型不同，则认为它们之间没有关联**。这意味着 React 会删除旧元素，并添加新元素。
2. **对于同类型的元素，如果它们拥有相同的 key，React 认为这两个元素是同一个元素**。因此，React 只会更新这个元素的属性或子元素。
3. **对于拥有 key 的元素列表，React 会尝试找到相同 key 的元素并复用它们**。如果没有指定 key，React 只能依赖元素的位置来进行匹配。

这个算法的基本思想是通过比较虚拟 DOM 树的前后快照来找出最小的变更集，并将这些变更应用到实际的 DOM 上。



##### React 16 中的 Fiber 架构

随着 React 16 的发布，原有的 diff 算法被 Fiber 架构所替代。Fiber 是一种新的数据结构，它提供了更好的性能和更灵活的工作机制。Fiber 节点不仅包含关于组件的信息，还包含关于如何处理这些节点的指令。

**工作流程概述**

- **Reconciliation**：当组件的状态或属性发生变化时，React 会重新渲染组件及其子组件，并创建一个新的虚拟 DOM 树。接着，React 会将新树与旧树进行比较，这个过程就是 Reconciliation。
- **Commit 阶段**：在 Reconciliation 完成后，React 会执行 Commit 阶段，将差异应用到实际的 DOM 上。在这个阶段，React 会批量执行 DOM 更新，以减少重绘和回流。



#### 虚拟DOM的缺点

1. **内存开销**：虚拟DOM本身占用内存，对于大型应用可能会增加内存使用。
2. **初始化成本**：创建虚拟DOM树需要计算资源，可能导致初次加载时性能下降。
3. **过度渲染**：虽然React通过差异计算来最小化DOM操作，但如果组件频繁地重新渲染，即使只是局部更新，也可能导致性能问题。特别是在复杂的组件中，如果`render`方法中的逻辑较为复杂，那么频繁的重新渲染可能会降低应用性能。
4. **生命周期方法的滥用**：不当使用生命周期方法可能导致不必要的重新渲染。
5. **状态管理不当**：不合理的状态更新会导致不必要的性能损耗。
6. **性能瓶颈**：在大量数据更新或复杂DOM操作时可能出现性能瓶颈。
7. **调试难度**：虚拟DOM增加了调试的复杂性。



#### 如何避免虚拟DOM的缺点

- **优化状态更新**：合理使用`setState`，避免不必要的状态更新。
- **使用PureComponent或shouldComponentUpdate**：确保只有在必要时才进行重新渲染。
- **性能监控**：使用React DevTools等工具来监控应用的性能，发现并解决性能瓶颈。
- **懒加载和代码分割**：通过懒加载和代码分割减少初始加载时间和内存使用。
- **合理的组件划分**：将组件划分得足够小，以便在需要时仅重新渲染受影响的部分。



### 3、React Fiber架构:star:

React Fiber 是React16版本中引入的一种新的协调算法，它彻底改变了React的渲染机制，使其更加高效和灵活。解决了以前的更新机制的问题，即在长时间的更新过程中，主线程会被阻塞，导致应用无法及时响应用户输入的问题。



#### **传统Reconciliation算法的缺点**

- **同步执行**：传统的Reconciliation算法在每次更新时都会同步执行整个Virtual DOM树的比较，如果树很大，就会导致渲染卡顿，影响用户体验。

- **无法中断**：一旦开始比较，就无法中途停止，这会导致长时间的操作阻塞主线程，影响其他任务的执行。



#### **Fiber 架构的优点**

1、**可中断性**：

- 在传统的 diff 算法中，整个过程是一次性的，并且必须在一次事件循环内完成。如果这个过程非常耗时，那么它可能会阻塞用户界面。**Fiber 架构使得 React 能够在必要的时候中断工作，并在稍后的时间继续执行。这意味着即使在复杂的用户界面中，React 也能够保持流畅的用户体验。**

2、**优先级调度**：

- Fiber 引入了优先级的概念，可以根据任务的重要性来安排执行顺序。例如，用户交互（如点击按钮）通常具有较高的优先级，而后台任务（如加载数据）则可能具有较低的优先级。这有助于确保用户交互得到及时响应。

3、**并发渲染**：

- 虽然 React 目前还不支持真正的并发渲染到 DOM（即多个更新同时进行），但是 Fiber 的设计使得将来支持并发成为可能。这意味着在未来，React 可以在多个线程中同时处理不同的更新任务。

4、**错误边界**：

- Fiber 架构还支持错误边界（Error Boundaries），这是一种特殊的 React 组件，可以在子组件抛出错误时捕获这些错误，并显示一个备用 UI，而不是使整个应用崩溃。这对于提高应用的稳定性和用户体验非常重要。



#### **Fiber 架构的核心概念**

1、**Fiber 结构**：

- 在 Fiber 架构中，每个 React 元素（即虚拟 DOM 节点）都有一个对应的 Fiber 节点。每个 Fiber 节点是一个对象，它包含了关于该元素的所有信息，比如类型、属性、状态以及其他重要的元数据。

2、**链表结构**：

- 与以前的单链表结构相比，Fiber 节点形成了一个**双向链表结构**，每个节点都有指向父节点和子节点的指针。这使得 React 可以更容易地在树中导航，并且可以方便地进行回溯和重试。

3、**工作单元**：

- 每个 Fiber 节点代表了一个工作单元（work unit），它可以独立于其他节点执行。这意味着 React 可以更容易地中断和恢复工作，从而提高性能。



#### **Fiber 架构的实现原理**

- Fiber Node：React 使用Fiber Node来表示 Virtual DOM树中的每个节点，每个Fiber Node包含了节点类型、属性、子节点等信息，以及用来跟踪更新状态的指针。

- Fiber Tree：React 使用Fiber Node构建了一个树状结构，称为Fiber Tree，每个 Fiber Node 对应Virtual DOM树中的一个节点。

- Work in Progress Tree：在进行更新时，React会构建一个新的Fiber Tree,称为Work in ProgressTree，并将其与之前的Fiber Tree进行比较。

- Commit Phase：当Work in ProgressTree 建立完成之后，React 会将WorkinProgress Tree 中的更新应用到真实的DOM树上，这个过程称为Commit Phase。




#### **Fiber 协调流程（两阶段提交）**

**阶段 1：Reconciliation（协调/渲染阶段）**

- **可中断的增量计算**：React 将组件树遍历拆解为多个 **Fiber 工作单元**，通过循环（而非递归）逐个处理。
  - 每次循环执行一个 Fiber 节点，生成子 Fiber 并连接成树。
  - 通过 **[`requestIdleCallback`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)（或 Scheduler 包）**在浏览器空闲时段执行，避免阻塞主线程。
- **对比策略**： 根据 `key` 和 `type` 复用节点，标记 `Placement`（新增）、`Update`（更新）、`Deletion`（删除）等副作用。

**阶段 2：Commit（提交阶段）**

- **不可中断的 DOM 更新**： 同步执行所有标记的副作用（如 DOM 操作、生命周期调用），确保 UI 一致性。
- **副作用分类：**
  - **BeforeMutation**：`getSnapshotBeforeUpdate`。
  - **Mutation**：DOM 插入/更新/删除。
  - **Layout**：`useLayoutEffect`、`componentDidMount`/`Update`。



#### 与旧架构的关键差异

| 特性           | Stack Reconciler（React 15-） | Fiber Reconciler（React 16+） |
| :------------- | :---------------------------- | :---------------------------- |
| **遍历方式**   | 递归（不可中断）              | 循环（可中断 + 恢复）         |
| **任务调度**   | 同步执行，阻塞主线程          | 异步分片，空闲时段执行        |
| **优先级控制** | 无                            | 基于 Lane 模型的优先级抢占    |
| **数据结构**   | 虚拟 DOM 树                   | Fiber 链表树（含调度信息）    |



### 4、Fiber 结构和普通 VNode 区别

#### 本质差异

| 维度         | 普通 VNode（虚拟 DOM）          | Fiber 结构                           |
| :----------- | :------------------------------ | :----------------------------------- |
| **设计目标** | 减少真实 DOM 操作，提升渲染性能 | 实现可中断的异步渲染 + 优先级调度    |
| **数据结构** | 树形结构（递归遍历）            | 双向链表树（循环遍历）               |
| **功能范畴** | 仅描述 UI 结构                  | 描述 UI 结构 + 调度任务 + 副作用管理 |



#### **数据结构对比**

**普通 VNode（React 15 及之前）**

```js
const vNode = {
  type: 'div', // 节点类型（组件/原生标签）
  props: { className: 'container' }, // 属性
  children: [vNode1, vNode2], // 子节点（树形结构）
  key: 'unique-id', // 优化 Diff 性能
  // 无状态、调度、副作用信息
}
```

**核心字段**：仅包含 UI 描述相关属性（type、props、children）。

**Fiber 节点（React 16+）**

```js
const fiberNode = {
  tag: HostComponent, // 节点类型（函数组件/类组件/DOM元素）
  type: 'div', // 原生标签或组件构造函数
  key: 'unique-id', // Diff 优化标识
  stateNode: domNode, // 关联的真实 DOM 节点
  pendingProps: { className: 'container' }, // 待处理的 props
  memoizedProps: {}, // 已生效的 props
  memoizedState: {
    // Hooks 状态（函数组件）
    hooks: [state1, effectHook],
  },
  updateQueue: [], // 状态更新队列（类组件）
  lanes: Lanes.HighPriority, // 调度优先级（Lane 模型）
  child: childFiber, // 第一个子节点
  sibling: siblingFiber, // 下一个兄弟节点
  return: parentFiber, // 父节点（构成双向链表）
  effectTag: Placement, // 副作用标记（插入/更新/删除）
  nextEffect: nextEffectFiber, // 副作用链表指针
}
```

**核心扩展**

- **调度控制**：`lanes` 优先级、任务到期时间。
- **状态管理**：Hooks 链表（函数组件）、类组件状态队列。
- **副作用追踪**：`effectTag` 标记和副作用链表。
- **遍历结构**：`child`/`sibling`/`return` 构成双向链表。



#### **协调机制对比**

| 流程           | VNode（Stack Reconciler） | Fiber Reconciler              |
| :------------- | :------------------------ | :---------------------------- |
| **遍历方式**   | 递归遍历（不可中断）      | 循环遍历链表（可中断 + 恢复） |
| **任务调度**   | 同步执行，阻塞主线程      | 异步分片，空闲时间执行        |
| **优先级控制** | 无                        | Lane 模型（31 个优先级车道）  |
| **副作用处理** | 统一提交 DOM 更新         | 构建副作用链表，分阶段提交    |



#### **性能影响对比**

| 场景                      | VNode 架构         | Fiber 架构                   |
| :------------------------ | :----------------- | :--------------------------- |
| **大型组件树渲染**        | 主线程阻塞导致掉帧 | 分片渲染，保持 UI 响应       |
| **高频更新（如动画）**    | 多次渲染合并困难   | 基于优先级合并或跳过中间状态 |
| **SSR 水合（Hydration）** | 全量同步处理       | 增量水合，优先交互部分       |



### 5、合成事件**SyntheticEvent**

React 的合成事件（Synthetic Events）是一种跨浏览器的封装事件，它为开发者提供了一套统一的事件处理接口，使得在不同浏览器中处理事件变得更为一致和可靠。React 使用合成事件来解决浏览器之间的事件处理差异，并提供了一些额外的功能，如事件池化，以提高性能。

**特点：**

1. **跨浏览器兼容性**：React的合成事件系统提供了一个统一的API，这样开发者就不需要担心不同浏览器之间存在的细微差别。
2. **事件委托**：为了提高性能，React使用事件委托的方式，而不是为每个元素单独绑定事件监听器。这意味着所有的事件监听器都会绑定到最外层的容器节点上，当事件发生时，React会检查事件冒泡路径上的元素并调用相应的事件处理程序。
3. **统一的事件对象**：React创建了自己的事件对象`SyntheticEvent`，这个对象拥有与原生DOM事件相似的方法（如`preventDefault()`和`stopPropagation()`），但是提供了一些额外的功能和一致性。
4. **事件池化**：为了减少垃圾回收的压力，React对事件对象进行了池化管理。当事件触发后，事件对象会被复用而不是直接销毁，这可以减少内存消耗。

**获取原生事件**：

如果你需要访问原生DOM事件，可以通过`SyntheticEvent`的`nativeEvent`属性来获取：

```js
function handleClick(event) {
  const nativeEvent = event.nativeEvent;
  // 处理原生事件
}
```

**React16**

- 所有事件挂载到document上
- event不是原生的，是SyntheticEvent合成事件对象
- 和Vue事件不同，和DOM事件也不同

**React17**

- 绑定到root组件上
- 有利于多个React版本并存，例如微前端



### 6、setState之后发生了哪些事情

1. **状态更新**：`setState`接收新的状态值，并合并到当前状态中。
2. **调度更新**：React将状态更新加入队列，并可能与其他更新一起批量处理。
3. **计算差异**：React根据新状态重新计算虚拟DOM，并找出需要更新的部分。
4. **实际DOM更新**：React仅更新实际DOM中的必要部分。
5. **生命周期方法调用**：在更新的不同阶段，React会调用相关的生命周期方法。
6. **完成更新**：DOM更新完成后，本次更新过程结束。





### 7、batchUpdate（批处理）

React 的 **batchUpdate（批处理更新）机制** 是一种优化策略，旨在将多个状态更新合并为一次渲染，减少不必要的组件重新渲染次数，从而提高性能。

在 React 中，当组件的状态或属性发生变化时，通常会触发重新渲染。如果短时间内多次调用 `setState` 或者有多个更新被调度，React 会将这些更新合并在一起，一次性地更新 DOM。这种策略有助于减少浏览器的重绘（repainting）和回流（reflow），从而提高性能。

**BatchUpdate 的应用场景**

- **连续多次调用`setState`**：如果你在一个很短的时间内连续调用了多次`setState`，React会将这些状态更新合并为一个批次来处理。
- **事件处理**：在某些情况下，比如处理用户输入或多个事件时，React也会进行批量更新以减少DOM操作次数。
- **定时任务**：在使用`setTimeout`或`requestAnimationFrame`等异步任务时，React也会等待这些任务完成后再进行批量更新。



**React 中的 BatchUpdate 实现**

在 React 16 引入 Fiber 架构之后，批处理变得更加高效和灵活。以下是一些关键点：

1. **调度更新**：当状态或属性发生变化时，React 会调度一个更新。这些更新被放入一个队列中等待处理。
2. **工作循环**：React 的工作循环会检查是否有待处理的更新。如果有，它会开始 Reconciliation 过程，生成新的虚拟 DOM 树，并与旧的虚拟 DOM 树进行比较。
3. **提交更新**：在 Reconciliation 完成后，React 会进入提交阶段（Commit phase），在这个阶段，React 会批量执行 DOM 更新。这意味着即使有多个更新，React 也会尽量一次性地将所有的变更应用到实际的 DOM 中。



**触发批处理的场景**

1. **React 合成事件：** 如 `onClick`、`onChange` 等事件处理函数中的多次状态更新会自动批处理。

   ```js
   const handleClick = () => {
     setCount(1) // 更新入队
     setName('Alice') // 更新入队
     // 最终合并为一次渲染
   }
   ```

2. **React 生命周期函数：** 在 `componentDidMount`、`componentDidUpdate` 等生命周期方法中的更新会被批处理。

3. **React 18+ 的自动批处理增强：** React 18 引入 `createRoot` 后，即使在异步操作（如 `setTimeout`、`Promise`、原生事件回调）中的更新也会自动批处理：

   ```js
   setTimeout(() => {
     setCount(1) // React 18 中自动批处理
     setName('Alice') // 合并为一次渲染
   }, 1000)
   ```



**绕过批处理的场景**

1. **React 17 及之前的异步代码：** 在 `setTimeout`、`Promise` 或原生事件回调中的更新默认**不会**批处理，每次 `setState` 触发一次渲染：

   ```js
   // React 17 中会触发两次渲染
   setTimeout(() => {
     setCount(1) // 渲染一次
     setName('Alice') // 渲染第二次
   }, 1000)
   ```

2. **手动强制同步更新：** 使用 `flushSync`（React 18+）可强制立即更新，绕过批处理：

   ```js
   import { flushSync } from 'react-dom'
   
   flushSync(() => {
     setCount(1) // 立即渲染
   })
   setName('Alice') // 再次渲染
   ```



**如何手动触发 BatchUpdate**

在某些情况下，你可能希望手动控制批处理的时机。React 提供了一些方法来帮助开发者实现这一点：

1. **使用 `React.unstable_batchedUpdates`**：

   - 在某些特定情况下，你可以使用 `React.unstable_batchedUpdates` 函数来手动触发批处理。这个函数允许你传递一个回调函数，在这个回调函数内的所有更新都将被批处理。

   ```jsx
   import React from 'react';
   
   function performBatchedUpdates() {
     React.unstable_batchedUpdates(() => {
       // 在这个回调函数内的所有更新将被批处理
       // 例如调用多个 setState
       component1.setState({ count: 1 });
       component2.setState({ text: 'Hello' });
     });
   }
   ```

请注意，`React.unstable_batchedUpdates` 是一个实验性的 API，不推荐在生产环境中使用。在大多数情况下，React 会自动处理批处理，你不需要手动干预。



### 8、组件渲染过程

1. **状态更新**：当组件的状态（state）或属性（props）发生变化时，React 会触发组件的重新渲染。这通常是通过调用 `setState` 方法或通过外部传递新的 `props` 来实现的。

2. **构建新的虚拟DOM**：React 会根据当前组件的最新状态和属性重新执行 `render` 方法，生成一个新的虚拟DOM树。这个新的虚拟DOM树包含了组件及其子组件的所有React元素。

3. **差异计算（Reconciliation）**：React 使用一种称为 Reconciliation 的算法来比较新旧虚拟DOM树之间的差异。这一过程通常被称为“diff算法”，它会找出需要更新的最小变化集。

4. **DOM更新**：根据差异计算的结果，React 只会对实际DOM中真正需要更新的部分进行变更。这一步骤中，React 尽可能地最小化DOM操作，以提高性能。

5. **生命周期方法调用**：在不同的阶段，React 会调用组件的生命周期方法。对于类组件，这包括但不限于：

   - `shouldComponentUpdate`：在组件接收到新的props或state之前调用，允许我们控制组件是否需要更新。
   - `render`：每次组件需要重新渲染时都会被调用。
   - `getDerivedStateFromProps`（如果定义了的话）：在每次更新前调用，用于计算新的state。
   - `componentDidUpdate`：在组件更新后立即调用。

   对于函数组件，React Hooks 提供了类似的机制：

   - `useEffect`：可以在组件挂载、卸载或更新时执行副作用操作。
   - `useMemo` 和 `useCallback`：用于优化性能，避免每次渲染都重新创建函数或对象。

6. **完成更新**：一旦DOM更新完成，并且所有相关的生命周期方法都被正确执行，这次组件更新就完成了。



## 三、React Hooks

### 为什么会有React Hooks，它解决了哪些问题

- 完善函数组件的能力，函数组件更适合React组件
- 组件逻辑复用，Hooks表现更好，使用Hooks，相同逻辑可分割到一个一个的useEffect中，而不是像class组件一样，分布在各个生命周期中
- class复杂组件正在变得费解，不易拆解，不易测试，逻辑混乱

**class组件的问题**

- 大型组件很难拆分和重构，很难测试（即class不易拆分）
- 相同业务逻辑，分散到各个方法中，逻辑混乱
- 复用逻辑变得复杂，如Mixins，HOC，Render Props

所以函数组件更适合React组件，但需要Hooks增强功能



### State Hook

#### 作用：让函数组件实现 state 和 setState

- 默认函数组件没有state
- 函数组件是一个纯函数，执行完即销毁，无法存储state
- 需要State Hook，即把state功能“钩”到纯函数中

#### useState使用总结

- `useState(0)`传入初始值，返回数组[state, setState]
- 通过state获取值
- 通过`setState(1)`修改值

#### Hooks命名规范

- 规定所有的Hooks都用use开头，如useXxx
- 自定义Hook也要以use开头
- 非Hooks的地方，尽量不要使用useXxx写法

#### 代码演示

```js
import React, { useState } from 'react'

function ClickCounter() {
    // 数组的解构
    // useState 就是一个 Hook “钩”，最基本的一个 Hook
    const [count, setCount] = useState(0) // 传入一个初始值

    function clickHandler() {
        setCount(count + 1)
    }

    return <div>
        <p>你点击了 {count} 次</p>
        <button onClick={clickHandler}>点击</button>
    </div>
}

export default ClickCounter
```



### Effect Hook

#### 作用：让组件模拟生命周期

- 默认函数组件没有生命周期
- 函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
- 使用Effect Hook 把生命周期“钩”到纯函数中

#### useEffect使用总结

- 模拟 componentDidMount - useEffect 依赖 []

- 模拟 componentDidUpdate - useEffect 无依赖， 或者依赖 [a, b]

- 模拟 componentWillUnMount - useEffect 中返回一个函数fn

  - useEffect依赖[]，组件销毁时执行fn，等于WillUnMounted
  - useEffect无依赖或依赖[a, b]，组件更新时执行fn
  - 即，下一次执行useEffect之前，就会执行fn，无论更新或卸载

  

#### 代码演示

```js
import React, { useState, useEffect } from 'react'

function LifeCycles() {
    const [count, setCount] = useState(0)

    // 模拟 class 组件的 DidMount 和 DidUpdate
    useEffect(() => {
        console.log('在此发送一个 ajax 请求')
    })

    // 模拟 class 组件的 DidMount
    useEffect(() => {
        console.log('加载完了')
    }, []) // 第二个参数是 [] （不依赖于任何 state）

    // 模拟 class 组件的 DidUpdate
    useEffect(() => {
        console.log('更新了')
    }, [count]) // 第二个参数就是依赖的 state

    // 模拟 class 组件的 DidMount
    useEffect(() => {
        let timerId = window.setInterval(() => {
            console.log(Date.now())
        }, 1000)

        // 返回一个函数
        // 模拟 WillUnMount
        return () => {
            window.clearInterval(timerId)
        }
    }, [])

    function clickHandler() {
        setCount(count + 1)
    }

    return <div>
        <p>你点击了 {count} 次</p>
        <button onClick={clickHandler}>点击</button>
    </div>
}

export default LifeCycles
```

#### 模拟WillUnMount，但不完全相等

- useEffect依赖[]，组件销毁时执行fn，等于WillUnMounted
- useEffect无依赖或依赖[a, b]，组件更新时执行fn
- 即，下一次执行useEffect之前，就会执行fn，无论更新或卸载

```js
import React, { useState, useEffect } from 'react'

function FriendStatus({ friendId }) {
    const [status, setStatus] = useState(false)

    // DidMount 和 DidUpdate
    useEffect(() => {
        console.log(`开始监听 ${friendId} 在线状态`)

        // 【特别注意】
        // 此处并不完全等同于 WillUnMount
        // props 发生变化，即更新，也会执行结束监听
        // 准确的说：返回的函数，会在下一次 effect 执行之前，被执行
        return () => {
            console.log(`结束监听 ${friendId} 在线状态`)
        }
    })

    return <div>
        好友 {friendId} 在线状态：{status.toString()}
    </div>
}

export default FriendStatus
```



### 其他 Hook

#### useRef

它允许你在渲染之间持久地引用值

useRef通常用于两种主要情况：访问 DOM 节点和保留渲染之间的值。

```js
import React, { useRef, useEffect } from 'react'

function UseRef() {
    const btnRef = useRef(null) // 初始值

    // const numRef = useRef(0)
    // numRef.current

    useEffect(() => {
        console.log(btnRef.current) // DOM 节点
    }, [])

    return <div>
        <button ref={btnRef}>click</button>
    </div>
}

export default UseRef
```



#### useContext

```js
import React, { useContext } from 'react'

// 主题颜色
const themes = {
    light: {
        foreground: '#000',
        background: '#eee'
    },
    dark: {
        foreground: '#fff',
        background: '#222'
    }
}

// 创建 Context
const ThemeContext = React.createContext(themes.light) // 初始值

function ThemeButton() {
    const theme = useContext(ThemeContext)

    return <button style={{ background: theme.background, color: theme.foreground }}>
        hello world
    </button>
}

function Toolbar() {
    return <div>
        <ThemeButton></ThemeButton>
    </div>
}

function App() {
    return <ThemeContext.Provider value={themes.dark}>
        <Toolbar></Toolbar>
    </ThemeContext.Provider>
}

export default App
```



#### useReducer

```js
import React, { useReducer } from 'react'

const initialState = { count: 0 }

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            return state
    }
}

function App() {
    // 很像 const [count, setCount] = useState(0)
    const [state, dispatch] = useReducer(reducer, initialState)

    return <div>
        count: {state.count}
        <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
    </div>
}

export default App
```

##### useReducer 和 redux 的区别

- useReducer是useState的代替方案，用于state复杂变化
- useReducer是单个组件状态管理，组件通讯还需要props
- redux是全局的状态管理，多组件共享数据



#### useMemo

##### useMemo使用总结

- React默认会更新所有子组件
- class组件使用SCU和PureComponent做优化
- Hooks中使用useMemo，但优化的原理是相同的
- memo封装子组件，useMemo封装数据

```js
import React, { useState, memo, useMemo } from 'react'

// 子组件
// 类似 class PureComponent ，对 props 进行浅层比较
const Child = memo(({ userInfo }) => {
    console.log('Child render...', userInfo)

    return <div>
        <p>This is Child {userInfo.name} {userInfo.age}</p>
    </div>
})

// 父组件
function App() {
    console.log('Parent render...')

    const [count, setCount] = useState(0)
    const [name, setName] = useState('双越老师')

    // const userInfo = { name, age: 20 }
    // 用 useMemo 缓存数据，有依赖
    const userInfo = useMemo(() => {
        return { name, age: 21 }
    }, [name])

    return <div>
        <p>
            count is {count}
            <button onClick={() => setCount(count + 1)}>click</button>
        </p>
        <Child userInfo={userInfo}></Child>
    </div>
}

export default App
```



#### useCallback

**useMemo缓存数据，useCallback缓存函数**

- 都用于缓存数据，优化性能

- 两者接收的参数都是一样的，第一个参数表示一个回调函数，第二个表示依赖的数据

- 在依赖数据发生变化的时候，才会调用传进去的回调函数去重新计算结果，起到一个缓存的作用

区别：

- useMemo  缓存的结果是回调函数中return回来的值，主要用于缓存计算结果的值，应用场景如需要计算的状态

- useCallback  缓存的结果是函数，主要用于缓存函数，应用场景如需要缓存的函数，因为函数式组件每次任何一个state发生变化，会触发整个组件更新，一些函数是没有必要更新的，此时就应该缓存起来，提高性能，减少对资源的浪费

  另外还需要注意的是，useCallback应该和React.memo配套使用，缺了一个都可能导致性能不升反而下降。



```js
import React, { useState, memo, useMemo, useCallback } from 'react'

// 子组件，memo 相当于 PureComponent
const Child = memo(({ userInfo, onChange }) => {
    console.log('Child render...', userInfo)

    return <div>
        <p>This is Child {userInfo.name} {userInfo.age}</p>
        <input onChange={onChange}></input>
    </div>
})

// 父组件
function App() {
    console.log('Parent render...')

    const [count, setCount] = useState(0)
    const [name, setName] = useState('双越老师')

    // 用 useMemo 缓存数据
    const userInfo = useMemo(() => {
        return { name, age: 21 }
    }, [name])

    // function onChange(e) {
    //     console.log(e.target.value)
    // }
    // 用 useCallback 缓存函数
    const onChange = useCallback(e => {
        console.log(e.target.value)
    }, [])

    return <div>
        <p>
            count is {count}
            <button onClick={() => setCount(count + 1)}>click</button>
        </p>
        <Child userInfo={userInfo} onChange={onChange}></Child>
    </div>
}

export default App
```



#### useLayoutEffect

用法与useEffect相似

区别

- `useEffect` 是异步执行的，而`useLayoutEffect`是同步执行的。
- `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前，和 `componentDidMount` 等价。

总结

1. 优先使用 `useEffect`，因为它是异步执行的，不会阻塞渲染
2. 会影响到渲染的操作尽量放到 `useLayoutEffect`中去，避免出现闪烁问题
3. `useLayoutEffect`和`componentDidMount`是等价的，会同步调用，阻塞渲染
4. 在服务端渲染的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致。



#### useUpdateEffect

ahooks里的

`useUpdateEffect` 用法等同于 `useEffect`，但是会**忽略首次执行**，只在依赖更新时执行。



#### useMemoizedFn

ahooks里的

我在实现多页签方案时有实际使用

- 一般情况下，可以使用 useMemoizedFn 完全代替 useCallback

- 在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。

- 使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。



### 自定义 Hook

#### 自定义useAxios

```js
import { useState, useEffect } from 'react'
import axios from 'axios'

// 封装 axios 发送网络请求的自定义 Hook
function useAxios(url) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        // 利用 axios 发送网络请求
        setLoading(true)
        axios.get(url) // 发送一个 get 请求
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [url])

    return [loading, data, error]
}

export default useAxios

// 第三方 Hook
// https://nikgraf.github.io/react-hooks/
// https://github.com/umijs/hooks
```

使用

```js
import React from 'react'
import useAxios from '../customHooks/useAxios'

function App() {
    const url = 'http://localhost:3000/'
    // 数组解构
    const [loading, data, error] = useAxios(url)

    if (loading) return <div>loading...</div>

    return error
        ? <div>{JSON.stringify(error)}</div>
        : <div>{JSON.stringify(data)}</div>
}

export default App
```



#### 自定义useMousePosition

```js
import { useState, useEffect } from 'react'

function useMousePosition() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    useEffect(() => {
        function mouseMoveHandler(event) {
            setX(event.clientX)
            setY(event.clientY)
        }

        // 绑定事件
        document.body.addEventListener('mousemove', mouseMoveHandler)

        // 解绑事件
        return () => document.body.removeEventListener('mousemove', mouseMoveHandler)
    }, [])

    return [x, y]
}

export default useMousePosition
```

使用

```js
import React from 'react'
import useMousePosition from '../customHooks/useMousePosition'

function App() {
    const [x, y] = useMousePosition()
    return <div style={{ height: '500px', backgroundColor: '#ccc' }}>
        <p>鼠标位置 {x} {y}</p>
    </div>
}

export default App
```



#### 倒计时useInterval

ahooks中有这个功能

```js
import { useEffect, useRef } from 'react';

/**
 * 
 * @param {*} fn 回调函数
 * @param {*} delay 延迟时间
 * @param {*} options {immediate} 是否立即执行
 */
function useInterval(
    fn,
    delay,
    options,
) {
    const immediate = options?.immediate;
    const fnRef = useRef();
    fnRef.current = fn;

    useEffect(() => {
        if (typeof delay !== 'number' || delay < 0) return;
        if (immediate) {
            fnRef.current();
        }
        const timer = setInterval(() => {
            fnRef.current();
        }, delay);
        return () => {
            clearInterval(timer);
        };
    }, [delay]);
}

export default useInterval;
```

使用

```js
const [interval, setInterval] = useState(undefined);
const [count, setCount] = useState(5);
const handleGo = () => {
history.push('/');
};

useInterval(
    () => {
      if (count > 0) {
        setCount(count - 1);
      }
      if (count === 0) {
        setInterval(undefined);
        handleGo();
      }
    },
    interval,
    {
      immediate: true,
    },
  );
```



### Hooks 使用规范

- 只能用于React函数组件和自定义Hook中，其他地方不可以
- 只能用于顶层代码，不能在循环、判断中使用Hooks（Hooks严重依赖于调用顺序，如果Hooks出现在循环、判断里，则无法保证顺序一致）
- useEffect内部不能修改state，直接在`useEffect`中修改状态可能会导致状态更新的顺序混乱，可能会引发无限循环的重新渲染。
- eslint插件eslint-plugin-resct-hooks可以帮到你



### 规范和注意事项

- useState初始化值，只有第一次有效

  - render: 初始化 state
  - re-render: 只恢复初始化的 state 值，不会再重新设置新的值。只能用 setName 修改

- useEffect内部不能修改state
  - 依赖为 [] 时： re-render 不会重新执行 effect 函数
  - 没有依赖：re-render 会重新执行 effect 函数
- useEffect可能出现死循环
  - 当依赖中有引用对象时，会出现死循环
  - 使用useRef来解决

```js
import React, { useState, useRef, useEffect } from 'react'

function UseEffectChangeState() {
    const [count, setCount] = useState(0)

    // 模拟 DidMount
    const countRef = useRef(0)
    useEffect(() => {
        console.log('useEffect...', count)

        // 定时任务
        const timer = setInterval(() => {
            console.log('setInterval...', countRef.current)
            // setCount(count + 1)
            setCount(++countRef.current)
        }, 1000)

        // 清除定时任务
        return () => clearTimeout(timer)
    }, []) // 依赖为 []

    // 依赖为 [] 时： re-render 不会重新执行 effect 函数
    // 没有依赖：re-render 会重新执行 effect 函数

    return <div>count: {count}</div>
}

export default UseEffectChangeState
```



### React Hooks 性能优化

- useMemo缓存数据，useCallback缓存函数

- 相当于class组件的SCU和PureComponent



### Hooks 相比 HOC 和 Render Props 有哪些优点

- 完全符合Hooks原有规则，没有其他要求，易理解记忆
- 变量作用域明确
- 不会产生组件嵌套

