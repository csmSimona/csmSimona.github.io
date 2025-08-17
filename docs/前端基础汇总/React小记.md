# React小记

## 一、React使用

### 1、React基本使用

#### JSX

React发明了JSX，利用HTML语法来创建虚拟DOM。

**JSX（JavaScript XML）** 是一个 JavaScript 的语法扩展，允许在 JavaScript 代码中通过类 HTML 语法创建 React 元素。它需要通过 Babel 等工具编译为标准的 JavaScript 代码，最终生成 **React 元素对象**（React Element），这些元素共同构成虚拟 DOM（Virtual DOM）树。

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





#### 组件通讯方式

##### **父组件通过props向子组件传递数据**

```js
//父组件
const Parent = () => {
  const message = 'Hello from Parent'
  return <Child message={message} />
}

// 子组件
const Child = ({ message }) => {
  return <div>{message}</div>
}
```

##### **子组件通过回调函数向父组件传递数据**

```js
//父组件
const Parent = () => {
  const handleData = (data) => {
    console.log('Data from Child:', data)
  }
  return <Child onSendData={handleData} />
}

// 子组件
const Child = ({ message }) => {
  return <button onClick={() => onSendData('Hello from Child')}>Send Data</button>
}
```

##### **父组件使用refs调用子组件暴露的方法**

```js
import React, { useRef, forwardRef, useImperativeHandle } from 'react'

// 子组件
const Child = forwardRef((props, ref) => {
  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    sayHello() {
      alert('Hello from Child Component!')
    },
  }))

  return <div>Child Component</div>
})

// 父组件
function Parent() {
  const childRef = useRef(null)

  const handleClick = () => {
    if (childRef.current) {
      childRef.current.sayHello()
    }
  }

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>Call Child Method</button>
    </div>
  )
}

export default Parent
```

##### **通过Context进行跨组件通信**

```js
import React, { useState } from 'react'

// 创建一个 Context
const MyContext = React.createContext()

// 父组件
function Parent() {
  const [sharedData, setSharedData] = useState('Hello from Context')

  const updateData = () => {
    setSharedData('Updated Data from Context')
  }

  return (
    // 提供数据和更新函数
    <MyContext.Provider value={{ sharedData, updateData }}>
      <ChildA />
    </MyContext.Provider>
  )
}

// 子组件 A（引用子组件 B）
function ChildA() {
  return (
    <div>
      <ChildB />
    </div>
  )
}

// 子组件 B（使用 useContext）
function ChildB() {
  const { sharedData, updateData } = React.useContext(MyContext)
  return (
    <div>
      <div>ChildB: {sharedData}</div>
      <button onClick={updateData}>Update Data</button>
    </div>
  )
}

export default Parent
```

##### **使用状态管理库进行通信**

- **React Context + useReducer**

  ```js
  import React, { useReducer } from 'react'
  
  const initialState = { count: 0 }
  
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      default:
        throw new Error()
    }
  }
  
  const CounterContext = React.createContext()
  
  function CounterProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <CounterContext.Provider value={{ state, dispatch }}>{children}</CounterContext.Provider>
  }
  
  function Counter() {
    const { state, dispatch } = React.useContext(CounterContext)
    return (
      <div>
        Count: {state.count}
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      </div>
    )
  }
  
  function App() {
    return (
      <CounterProvider>
        <Counter />
      </CounterProvider>
    )
  }
  
  export default App
  ```

- **Redux**：使用 `Redux Toolkit` 简化 Redux 开发。

  ```js
  import { createSlice, configureStore } from '@reduxjs/toolkit'
  
  const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
      increment: (state) => {
        state.value += 1
      },
      decrement: (state) => {
        state.value -= 1
      },
    },
  })
  
  const { increment, decrement } = counterSlice.actions
  
  const store = configureStore({
    reducer: counterSlice.reducer,
  })
  
  store.subscribe(() => console.log(store.getState()))
  
  store.dispatch(increment())
  store.dispatch(decrement())
  ```



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



#### 受控组件 (Controlled Components):star:

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

可以使用 `ReactDOM.createPortal(child,container)` 创建一个 Portal。

这里的 **child** 是一个 React 元素，fragment 片段或者是一个字符串，**container** 是 Portal 要插入的 DOM 节点的位置。

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

**React Context** 是一种在组件树中共享数据的机制，避免了通过逐层传递 *props* 的繁琐操作。它适用于需要在多个组件间共享全局数据的场景，例如主题、用户信息或语言设置。

优点：变量不用层层传递，省去无谓的传递props

缺点：使用全局变量的方法，会让组件失去独立性，复用起来更困难，会让组件变得不纯粹，不应该大规模使用。

使用场景：公共信息（语言、主题）传递给每个组件



使用 Context 的基本步骤：

1. **创建 Context**： 使用 *React.createContext* 创建一个 Context 对象，并设置默认值。
2. **提供数据**： 使用 *Provider* 包裹组件树，并通过 *value* 属性传递共享数据。
3. **消费数据**： 在子组件中使用 *useContext* Hook 或 *Consumer* 组件获取共享数据。



以下是一个简单的主题切换示例：

```js
import React, { createContext, useState, useContext } from 'react';

// 1、创建 Context
const ThemeContext = createContext();

function App() {
const [theme, setTheme] = useState('light');

const toggleTheme = () => {
	setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
};

return (
    // 2、提供数据
    <ThemeContext.Provider value={theme}>
    	<Toolbar toggleTheme={toggleTheme} />
    </ThemeContext.Provider>
  );
}

function Toolbar({ toggleTheme }) {
    return (
        <div>
            <ThemedButton />
            <button onClick={toggleTheme}>切换主题</button>
        </div>
    );
}

function ThemedButton() {
    // 3、消费数据
    const theme = useContext(ThemeContext);
    return <button style={{ background: theme === 'light' ? '#fff' : '#333' }}>主题按钮</button>;
}

export default App;
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

- 是否更新组件

- React 默认：父组件有更新，子组件则无条件也更新

- SCU默认返回true

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

虽然 `React.PureComponent` 默认使用浅比较来决定是否更新组件，但在某些情况下，你可能需要更详细的比较逻辑。例如，如果你的props包含深层嵌套的对象或数组，你可能希望深入比较这些对象的内容。此时，你**可以覆盖 `shouldComponentUpdate` 方法来实现自定义的比较逻辑**：

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

- **浅比较的局限性**：`React.PureComponent` 使用浅比较，这意味着它**只会比较props和state的引用**。如果你的props或state包含复杂的数据结构（如对象或数组），并且这些数据结构内部的变化不会改变它们的引用，那么 `React.PureComponent` 可能不会按预期工作。
- **性能考量**：虽然 `React.PureComponent` 可以提高性能，但如果你的应用已经很好地进行了优化，使用 `React.PureComponent` 可能不会带来显著的好处。另外，过度使用 `React.PureComponent` 也可能导致不必要的复杂性。
- **类组件 vs 函数组件**：随着React Hooks的引入，许多开发者倾向于使用函数组件而不是类组件。**在这种情况下，可以使用 `React.memo` 来代替 `React.PureComponent`。**



#### React.memo:star:

- `React.memo` 是一个高阶组件（Higher-Order Component, HOC），用于优化函数组件的性能。

- 它通过记忆化（memoization）机制来避免不必要的重新渲染，从而提升应用的性能。

- 我们可以使用 `React.memo` 来包装函数组件，只有当传递给它的props发生变化时，才会重新渲染这个组件。

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
- **性能考量**：虽然 `React.memo` 可以提高性能，但也需要权衡其带来的额外开销。**只有当组件的渲染成本较高且其props频繁改变时，使用 `React.memo` 才有意义。**



#### 不可变值 immutable.js

- 不可变性意味着一旦一个数据对象被创建，就不能再被更改。相反，当你需要修改数据时，你需要创建一个新的对象，而不是修改原有的对象。

- 实现不可变性的一种常见方法是使用不可变数据结构和库，如 [Immutable.js](https://immutable-js.github.io/immutable-js/)。这个库提供了一套丰富的API来创建和操作不可变的数据结构，如Map、List等。

- immutable对象是不可直接赋值的对象，它可以有效的避免错误赋值的问题

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

在这个例子中，我们创建了一个包含姓名、年龄和爱好的不可变Map。**当我们需要修改年龄或添加一个新的爱好时，我们创建了一个新的Map实例，而不是修改原来的实例。**



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

Redux 是最流行的 React 状态管理库之一。它提供了一个全局的状态容器，允许你在应用的任何地方访问和更新状态。

特点包括: 单向数据流、中间件支持、时间旅行调试。

#### **Redux 的核心概念**

1、**State（状态）**：

- 整个应用的状态都存储在一个单一的对象树中。这个对象树存储在一个全局的 store 中。这意味着你的应用所有部分的状态都被集中在一起，而不是分散在多个组件中。

2、**Store（仓库/存储）**：

- Store 是保存整个应用状态的地方。只有一个单一的 store 对象，它包含整个应用的状态树。Store 还提供了方法如 `getState()` 来获取状态，`dispatch(action)` 来发送动作，以及 `subscribe(listener)` 来注册监听器。

3、**Actions（动作）**：

- 动作是携带数据的普通 JavaScript 对象，用来描述发生了什么。它们是应用中的数据源，**是唯一可以改变状态的方法**。动作由用户交互（例如点击按钮）或者某些业务逻辑触发。

4、**Reducers（规约器/减少器）**：

- Reducers 告诉应用状态如何响应不同的动作。**它们是一个纯函数，接收当前状态和动作作为参数，并返回新的状态。**Reducers 必须是纯函数，这意味着对于相同的输入，它们必须总是返回相同的结果，并且除了计算外不做任何其他事情（比如修改状态或进行 I/O 操作）。



#### 简述 Redux 单向数据流

```
View -> Action -> Reducer -> State -> View
```

1. View
   - 用户在界面（View）上触发一个事件（如点击按钮）。
2. Action
   - 事件触发一个 `action`，并通过 `store.dispatch(action)` 分发。
3. Reducer
   - `store` 调用 `reducer`，传入当前的 `state` 和 `action`，生成一个新的 `state`。
4. State
   - `store` 更新 `state`，并通知所有订阅了 `store` 的组件。
5. View
   - 组件根据新的 `state` 重新渲染界面。



**代码示例**

```js
// store/index.js
import {createStore} from 'redux';
import reducer from './reducer';
// 1.创建 Store
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
// 2.定义 Reducer
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
        // 3.订阅 Store
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
    // 4.定义 Action
    const action = getInputChangeAction(e.target.value);
    // 5.分发 Action
    store.dispatch(action);
}
handleStoreChange() {
    this.setState(store.getState());
}
}
```

**改变store里的数据**

1、先派发一个action，通过dispatch方法传递给store

2、store 自动调用 reducer，reducer中接收state和action进行处理，返回一个新的state返回给store，替换原来的store

3、store中数据改变react感知到store数据的改变，通过store.subscribe()订阅方法设置更新数据

**Redux设计和使用的三项原则**

1.store是唯一的

2.只有store能改变自己的内容

3.reducer必须是纯函数

#### **Redux核心API**

1、createStore ——创建store

2、store.dispatch ——派发action，这个action会传递给store

3、store.getState ——获取store中所有的数据内容

4、store.subscribe ——订阅store的改变，只要store发生改变，subscribe中接收的回调函数就会被执行



### 4、Redux的中间件

Redux 中间件（Middleware）允许你在 `action` 被分发（`dispatch`）到 `reducer` 之前或之后执行额外的逻辑。

中间件通常用于处理异步操作、日志记录、错误处理等任务。

**ps：中间是指action和store的中间，中间件是Redux的中间件，而不是React**

常用的 Redux 中间件有

**1. Redux Thunk**

- **描述**: Redux Thunk 是最常用的中间件之一，用于处理异步操作（如 API 调用）。

- 特点

  - 允许 `action` 是一个函数（而不仅仅是一个对象）。
  - 函数可以接收 `dispatch` 和 `getState` 作为参数，从而在异步操作完成后手动分发 `action`。

- **使用场景**: 处理异步逻辑（如数据获取）。

- 示例

  ```javascript
  const fetchData = () => {
    return (dispatch, getState) => {
      dispatch({ type: 'FETCH_DATA_REQUEST' })
      fetch('/api/data')
        .then((response) => response.json())
        .then((data) => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }))
        .catch((error) => dispatch({ type: 'FETCH_DATA_FAILURE', error }))
    }
  }
  ```

**2. Redux Saga**

- **描述**: Redux Saga 是一个基于生成器函数（Generator）的中间件，用于管理复杂的异步流程和副作用。

- **特点**:

  - 使用 ES6 的生成器函数来处理异步逻辑。
  - 提供强大的副作用管理（如取消任务、并发执行等）。

- **使用场景**: 复杂的异步流程（如竞态条件、任务取消等）。

- **示例**:

  ```javascript
  import { call, put, takeEvery } from 'redux-saga/effects'
  
  function* fetchData() {
    try {
      const data = yield call(fetch, '/api/data')
      yield put({ type: 'FETCH_DATA_SUCCESS', payload: data })
    } catch (error) {
      yield put({ type: 'FETCH_DATA_FAILURE', error })
    }
  }
  
  function* watchFetchData() {
    yield takeEvery('FETCH_DATA_REQUEST', fetchData)
  }
  ```

**3. Redux Logger**

- **描述**: Redux Logger 是一个用于记录 `action` 和 `state` 变化的中间件。

- 特点

  - 在控制台中打印每个 `action` 的分发和 `state` 的变化。
  - 便于调试和开发。

- **使用场景**: 开发环境中的调试。

- 示例

  ```javascript
  const store = createStore(rootReducer, applyMiddleware(logger))
  ```

**4. Redux Promise**

- **描述**: Redux Promise 是一个用于处理 Promise 的中间件。

- 特点

  - 自动处理 Promise 类型的 `action`。
  - 当 Promise 完成时，自动分发成功的 `action`；当 Promise 失败时，自动分发失败的 `action`。

- **使用场景**: 简单的异步操作。

- 示例

  ```javascript
  const fetchData = () => ({
    type: 'FETCH_DATA',
    payload: fetch('/api/data').then((response) => response.json()),
  })
  ```



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



### 7、如何统一监听 React 组件报错

#### Error Boundaries（错误边界）

默认情况下，如果你的应用程序在渲染过程中抛出错误，React 将从屏幕上删除其 UI。为了防止这种情况，你可以将 UI 的一部分包装到 错误边界 中。错误边界是一个特殊的组件，可让你显示一些后备 UI，而不是显示例如错误消息这样崩溃的部分。

要实现错误边界组件，你需要提供 static getDerivedStateFromError，它允许你更新状态以响应错误并向用户显示错误消息。你还可以选择实现 componentDidCatch 来添加一些额外的逻辑，例如将错误添加到分析服务。

```jsx
import * as React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 更新状态，以便下一次渲染将显示后备 UI。
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    logErrorToMyService(
      error,
      // 示例“组件堆栈”：
      // 在 ComponentThatThrows 中（由 App 创建）
      // 在 ErrorBoundary 中（由 APP 创建）
      // 在 div 中（由 APP 创建）
      // 在 App 中
      info.componentStack,
      // 仅在 react@canary 版本可用
      // 警告：Owner Stack 在生产中不可用
      React.captureOwnerStack()
    )
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义后备 UI
      return this.props.fallback
    }

    return this.props.children
  }
}
```

然后你可以用它包装组件树的一部分：

```jsx
<ErrorBoundary fallback={<p>Something went wrong</p>}>
  <Profile />
</ErrorBoundary>
```

如果 Profile 或其子组件抛出错误，ErrorBoundary 将“捕获”该错误，然后显示带有你提供的错误消息的后备 UI，并向你的错误报告服务发送生产错误报告。

#### 全局错误监听

为了捕获 Error Boundaries 无法处理的错误（如事件处理器或异步代码中的错误），可以使用 JavaScript 的全局错误监听机制。

- 使用 window.onerror 监听全局错误。
- 使用 window.addEventListener('error', handler) 监听未捕获的错误。
- 使用 window.addEventListener('unhandledrejection', handler) 监听未处理的 Promise 拒绝。

```jsx
import React, { useEffect } from 'react'

function GlobalErrorHandler() {
  useEffect(() => {
    // 监听全局错误
    const handleError = (error) => {
      console.error('Global error:', error)
    }

    // 监听未捕获的错误
    window.onerror = (message, source, lineno, colno, error) => {
      handleError(error)
      return true // 阻止默认错误处理
    }

    // 监听未处理的 Promise 拒绝
    window.addEventListener('unhandledrejection', (event) => {
      handleError(event.reason)
    })

    // 清理监听器
    return () => {
      window.onerror = null
      window.removeEventListener('unhandledrejection', handleError)
    }
  }, [])

  return null
}

// 在应用的根组件中使用
function App() {
  return (
    <div>
      <GlobalErrorHandler />
      <MyComponent />
    </div>
  )
}
```

注意事项：

1. 全局错误监听可以捕获 Error Boundaries 无法处理的错误，但无法阻止组件崩溃。
2. 需要确保在生产环境中正确处理错误信息，避免暴露敏感信息。



### 8、React项目中组件销毁有哪几种方式？

**1.条件渲染（动态卸载）**

通过 状态控制 决定是否渲染组件，当条件为 false 时，React 会自动卸载并销毁该组件。 特点：

- 适用于 动态显示/隐藏组件。
- 组件销毁后，状态会被重置（重新挂载时是新实例）。

**2.路由切换**

在使用 React Router 时，当路由切换时，当前页面组件会被卸载，导致其子组件销毁。 特点：

- 适用于 SPA（单页应用），路由切换时自动卸载旧组件。

**3.父组件卸载（连带子组件销毁）**

如果 父组件被卸载（如路由切换、条件渲染父组件），其所有子组件也会被销毁。 特点：

- 适用于 父组件被移除时，子组件自动销毁。

**4.useEffect 清理函数（资源释放）**

如果组件内部有 副作用（如定时器、订阅、事件监听），需要在组件销毁时清理，可以使用 useEffect 的 清理函数。 特点：

- 适用于 组件卸载时释放资源（如取消 API 请求、移除事件监听等）。

**5.修改 key 强制重新挂载（重置组件）**

通过改变 key 可以强制 React 销毁并重新创建组件（适用于需要重置状态的场景）。 特点：

- 适用于 需要完全重置组件状态 的情况。

**6.手动卸载（Portal 或第三方库）**

在某些特殊情况下（如使用 ReactDOM.createPortal 或某些 UI 库），可能需要手动调用卸载方法。 特点：

- 适用于 手动控制组件卸载（较少使用）。



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

用JS模拟DOM结构，DOM变化的对比，放在JS层进行（因为前端语言中只有JS是[图灵完备语言](https://blog.csdn.net/Roselane_Begger/article/details/101176694)）

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



#### 虚拟DOM的缺点

1. **内存开销**：**虚拟DOM需要在内存中维护一份DOM的副本，可能会导致内存消耗较大。同时，虚拟DOM的构建和比对过程会带来计算开销，尤其在数据量较大时，可能会比直接操作真实DOM更耗时。**
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



#### Fiber 协调流程

1. **组件更新的触发**

与传统的 React 协调过程一样，Fiber 的更新也可以由以下事件触发：

- **状态（state）或属性（props）变化**：当组件的状态或属性发生变化时，会触发重新渲染。
- **父组件更新**：如果父组件渲染，子组件也会重新渲染。

2. **创建 Fiber 节点**

数据（State）和属性（Props）变化后，React 会根据当前的虚拟 DOM 树，创建相应的 Fiber 节点。Fiber 节点是对 React 组件实例的表示，包含了组件的类型、状态、属性、子节点、更新队列等信息。

3. **开始协调（Reconciliation）**

Fiber 引入了一种新的协调流程，允许将任务分片并在多个帧上执行，以避免阻塞主线程：

- **调度**：React 会标记需要更新的 Fiber 节点，并将它们加入到更新队列中。引入了任务优先级的概念，允许 React 根据工作的重要性来安排更新。
- **分片处理**：协调的过程被切分为多个小任务，可以在每个请求帧中分步执行。这样可以有效避免长时间的阻塞，使得用户界面在繁重的操作中仍保持响应。

4. **Diffing 过程**

在 Fiber 中，Diffing 过程与之前的版本类似，但它采用了一些优化策略：

- **树的复用**：Fiber 允许重用旧树中的节点，从而减少不必要的创建和销毁。
- **优先级与中断**：在高优先级任务（如用户输入）来临时，当前的协调任务可以被中断，React 会先处理优先级高的任务。

5. **生成更新**

在 Diffing 过程中，如果发现节点需要更新或替换，Fiber 会创建相应的更新对象并将其添加到更新队列中。每个 Fiber 节点都有一个 `updateQueue`，用于存储所有需要执行的更新。

6. **进入 Commit Phase（提交阶段）**

当协调阶段完成后，进行提交阶段，React 会在这个阶段应用所有的更新到实际的 DOM：

- **执行生命周期方法**：在提交过程中，React 会调用相关的生命周期方法，例如 `componentWillUpdate` 和 `componentDidUpdate`，以允许开发者执行额外的操作。
- **DOM 更新**：将计算得到的最终结果应用到真实的 DOM 中。这个过程是一个同步操作。

7. **Cleanup（清理）**

在提交阶段结束后，React 会进行一些清理工作，例如更新 Fiber 节点的状态，清空更新队列，以便为下一次渲染做好准备。





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



### 4、Fiber 结构和普通 VNode 区别:star:

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



### 5、React reconciliation 协调的过程:star:

React 的 **协调（Reconciliation）** 是用于高效更新 UI 的核心算法。当组件状态或属性变化时，React 会通过对比新旧虚拟 DOM（Virtual DOM）树，找出最小化的差异并应用更新。以下是协调过程的详细步骤：

#### **生成虚拟 DOM 树**

- 当组件状态或属性变化时，React 会重新调用组件的 `render` 方法，生成新的**虚拟 DOM 树**（一个轻量级的 JavaScript 对象，描述 UI 结构）。
- 虚拟 DOM 是实际 DOM 的抽象表示，操作成本远低于直接操作真实 DOM。

#### Diffing 算法（差异对比） 

React 使用 **Diffing 算法** 比较新旧两棵虚拟 DOM 树，找出需要更新的部分。对比规则如下：

**规则一：不同类型的元素**

- 如果新旧元素的`type`不同（例如从`<div>`变为`<span>`），React 会**销毁旧子树**，**重建新子树**。
  - 旧组件的生命周期方法（如`componentWillUnmount`）会被触发。
  - 新组件的生命周期方法（如`constructor`、`componentDidMount`）会被触发。

**规则二：相同类型的元素**

- 如果元素的`type`相同（例如`<div className="old">`→`<div className="new">`），React 会**保留 DOM 节点**，仅更新变化的属性。
  - 对比新旧属性，仅更新差异部分（例如`className`）。
  - 组件实例保持不变，生命周期方法（如`componentDidUpdate`）会被触发。

**规则三：递归处理子节点**

- 对于子节点的对比，React 默认使用**逐层递归**的方式。
- **列表对比优化**：
  - 当子元素是列表（例如通过`map`生成的元素）时，React 需要唯一`key`来标识元素，以高效复用 DOM 节点。
  - 若未提供`key`，React 会按顺序对比子节点，可能导致性能下降或状态错误（例如列表顺序变化时）。

#### 更新真实 DOM

- 通过 Diffing 算法找出差异后，React 将生成一系列**最小化的 DOM 操作指令**（例如`updateTextContent`、`replaceChild`）。
- 这些指令会被批量应用到真实 DOM 上，以减少重绘和重排的次数，提高性能。

#### 协调的优化策略

- **Key 的作用**：为列表元素提供唯一的`key`，帮助 React 识别元素的移动、添加或删除，避免不必要的重建。
- **批量更新（Batching）**：React 会将多个状态更新合并为一次渲染，减少重复计算。
- **Fiber 架构**（React 16+）：
  - 将协调过程拆分为可中断的“工作单元”（Fiber 节点），允许高优先级任务（如动画）优先处理。
  - 支持异步渲染（Concurrent Mode），避免长时间阻塞主线程。



### 6、diff 算法:star:

#### React 早期版本中的 Diff 算法

在 React 15 及更早的版本中，diff 算法主要基于以下三个假设：

1. **在同一个层级上，如果两个元素的类型不同，则认为它们之间没有关联**。这意味着 React 会删除旧元素，并添加新元素。
2. **对于同类型的元素，如果它们拥有相同的 key，React 认为这两个元素是同一个元素**。因此，React 只会更新这个元素的属性或子元素。
3. **对于拥有 key 的元素列表，React 会尝试找到相同 key 的元素并复用它们**。如果没有指定 key，React 只能依赖元素的位置来进行匹配。

这个算法的基本思想是通过比较虚拟 DOM 树的前后快照来找出最小的变更集，并将这些变更应用到实际的 DOM 上。



#### React 16 中的 Fiber 架构

随着 React 16 的发布，原有的 diff 算法被 Fiber 架构所替代。Fiber 是一种新的数据结构，它提供了更好的性能和更灵活的工作机制。Fiber 节点不仅包含关于组件的信息，还包含关于如何处理这些节点的指令。

**工作流程概述**

- **Reconciliation**：当组件的状态或属性发生变化时，React 会重新渲染组件及其子组件，并创建一个新的虚拟 DOM 树。接着，React 会将新树与旧树进行比较，这个过程就是 Reconciliation。
- **Commit 阶段**：在 Reconciliation 完成后，React 会执行 Commit 阶段，将差异应用到实际的 DOM 上。在这个阶段，React 会批量执行 DOM 更新，以减少重绘和回流。



#### **Vue diff 算法和 React diff 算法的区别**

Vue 和 React 的 diff 算法核心目标相同：**高效地找出虚拟 DOM (Virtual DOM) 树的变化，并将最小变更应用到真实 DOM 上**。

##### **Diff 策略的核心思想**

**React (Fiber 架构之后):**

- **基于链表结构的递归协调**: 使用 Fiber 节点构成的链表树结构。
- 启发式算法 (Heuristic O(n) Algorithm): 遵循两个核心假设：
  1. **不同类型的元素会产生不同的树**: 如果根节点类型不同（如从 `<div>` 变成 `<span>`），React 会直接销毁整棵旧子树并重建新子树。
  2. **开发者可以通过 `key` prop 暗示哪些子元素在不同渲染下保持稳定**: 在同层级子节点列表比较时，`key` 帮助 React 识别节点的移动、添加或删除。
- **逐层比较 (Level by Level)**: 只比较同层级的节点，不会尝试跨层级移动节点（除非销毁重建）。这是其 O(n) 复杂度的基础。

**Vue (2.x & 3.x):**

- 也基于 O(n) 的启发式算法: **同样遵循“不同类型元素产生不同树”和“`key` 标识稳定节点”的原则**。

- 更积极的同层级节点比较策略 (Vue 2 双端比较):

  - **Vue 的双端对比策略**

    分四步优化对比效率（Vue2 核心逻辑，Vue3 优化为最长递增子序列）：

    1. **头头对比**：新旧头指针节点相同则复用，指针后移
    2. **尾尾对比**：新旧尾指针节点相同则复用，指针前移
    3. **头尾交叉对比**：旧头 vs 新尾，旧尾 vs 新头
    4. **中间乱序对比**：建立 key-index 映射表，复用可匹配节点

    ```js
    // 旧列表：[A, B, C, D]
    // 新列表：[D, A, B, C]
    // Vue 通过步骤3头尾对比，仅移动 D 到头部
    ```

  - Vue 2: 在同层级子节点列表比较时，采用 “**双端比较**” (Double-end Diff) 算法。它会同时从新旧子节点列表的头（`oldStartIdx`, `newStartIdx`）和尾（`oldEndIdx`, `newEndIdx`） 开始向中间遍历比较。这种策略能更高效地识别出头尾节点相同但位置移动的情况（如列表反转），减少不必要的 DOM 操作。

  - Vue 3: 在双端比较的基础上，进行了重大优化，引入了 “**最长递增子序列” (Longest Increasing Subsequence - LIS) 算法**。在双端比较无法处理的中间节点乱序移动场景下（如 `[A, B, C, D]` -> `[D, A, B, C]`），**Vue 3 会利用 LIS 算法找出新列表中相对顺序保持不变的、最长的一组节点**。这样就能**最小化移动节点的次数**，仅移动那些不在最长稳定序列中的节点。这是 Vue 3 diff 性能提升的关键点之一。

##### **组件粒度更新**

**React:**

- 默认情况下，**父组件更新会导致所有子组件递归更新 (除非使用 `React.memo`, `shouldComponentUpdate`, `PureComponent` 或 `useMemo` 进行手动优化)。** 即使子组件的 props 没有变化，其 `render` 函数也会被调用（生成新的 VNode），然后进入 diff 过程。虽然 diff 可能判断出 DOM 无需更新，但生成 VNode 和 diff 本身也是有成本的。
- 需要开发者显式优化: 性能优化很大程度上依赖于开发者手动实现 `shouldComponentUpdate` 或使用 `React.memo` 等来阻止不必要的子组件渲染和 diff。

**Vue:**

- **响应式系统驱动的细粒度更新**:
  - Vue 2: 每个组件实例对应一个 Watcher。当响应式数据变化时，会通知对应的 Watcher，触发组件更新。子组件只在其依赖的 props 或自身状态变化时才会更新。
  - Vue 3: 引入了基于 Proxy 的响应式系统和 `effect` 跟踪。更新粒度更细，组件更新只依赖于其实际使用的响应式数据。如果父组件更新但传递给子组件的 props 没有变化（或子组件没有使用变化的父级数据），子组件通常不会更新。
- 编译时优化辅助: Vue 的模板编译器**在编译阶段就能分析出模板中哪些部分是动态的（依赖响应式数据）**。**结合响应式系统，这使得 Vue 在组件更新层面通常比 React 更“智能”和“自动”，减少了不必要的子组件 diff。**

##### **静态内容优化**

**React:**

- **手动控制更新**： 需通过 `React.memo`、`shouldComponentUpdate` 或 `useMemo` 避免无效渲染

  ```jsx
  const MemoComp = React.memo(() => <div>Static Content</div>)
  ```

**Vue:**

- 强大的编译时优化:
  - **静态提升 (Static Hoisting)**: Vue 的模板编译器在编译阶段会将纯静态节点（及其子树）提取到 `render` 函数外部。这些静态节点对应的 VNode 只会在应用初始化时创建一次，后续更新时直接复用，避免了重复创建 VNode 和 diff 的成本。
  - **静态子树标记 (Vue 2) / Block Tree (Vue 3)**:
    - Vue 2: 在 diff 过程中，遇到标记为 `static` 的节点/子树会直接跳过其内部 diff。
    - Vue 3: 引入了更先进的 Block Tree 概念。一个 “Block” 是一个动态节点的容器（根通常是模板中的 `v-if`/`v-for`/根节点）。编译器会分析出哪些节点是动态的，哪些是静态的，并建立父子 Block 的依赖关系。在更新时：
      - 如果一个 Block 的结构指令条件（如 `v-if` 的值）没有改变，且其内部的动态节点没有变化（通过 `patchFlag` 判断），那么整个 Block 及其包含的所有静态内容都可以被跳过 diff。
      - 这大幅减少了需要 diff 的节点数量，尤其对于包含大量静态内容但只有小部分动态内容的组件。

##### **动态节点更新优化 (Vue 3 特有)**

**Vue 3:**

- **Patch Flags (补丁标志)**: 编译器在生成 VNode 时，会为动态节点打上 `patchFlag`。这个标志是一个位掩码，精确指示了该节点哪些部分需要被更新（例如：`1` 表示文本内容变化，`2` 表示 class 变化，`4` 表示 style 变化，`8` 表示 props 变化等等）。
- 作用: 在 `patch` (更新真实 DOM) 阶段**，运行时可以直接根据 `patchFlag` 精准定位需要更新的部分**，跳过对其他属性的不必要检查和更新。例如，如果 `patchFlag` 是 `1`，就只更新 `textContent`，完全不需要检查或更新 `class`, `style`, `props`。这显著提升了更新动态节点的效率。

**React:** 

**没有直接等效的机制。**在 diff VNode 属性时，需要比较新旧 props 对象的所有键值对（虽然 React 内部也有一些优化，但不如 `patchFlag` 直接和高效）。



##### **总结对比表**

| 特性           | React (Fiber)                          | Vue 2                            | Vue 3 (核心优势)                               |
| :------------- | :------------------------------------- | :------------------------------- | :--------------------------------------------- |
| 核心 Diff 策略 | 同层级递归比较 (逐层)                  | 同层级比较 + 双端比较            | 同层级比较 + 双端比较 + LIS 算法               |
| 组件更新粒度   | 默认递归更新子组件 (需手动优化)        | 响应式依赖追踪 (子组件按需更新)  | 响应式依赖追踪 + 更细粒度 effect               |
| 静态内容优化   | 运行时 diff 快 (但需生成 VNode)        | 静态子树标记 (跳过 diff)         | 静态提升 + Block Tree (跳过 VNode 生成和 diff) |
| 动态节点优化   | 无特殊机制                             | 无特殊机制                       | Patch Flags (精准更新)                         |
| 节点移动优化   | 依赖 `key`，同层级顺序调整效率一般     | 依赖 `key`，双端比较优化头尾移动 | 依赖 `key`，LIS 算法优化乱序移动               |
| 设计侧重点     | 运行时优化，灵活性高                   | 响应式 + 编译时辅助              | 强大的编译时优化 + 响应式                      |
| 开发者优化负担 | 较高 (需主动使用 `memo`, `useMemo` 等) | 较低                             | 最低 (编译器自动优化较多)                      |
| 适用场景       | 大型动态应用（需精细控制）             | 中小型应用（快速开发）           | 中小型应用（快速开发）                         |



##### **核心结论**

- React: 更注重**运行时**的灵活性和通用性（JSX 赋予了极大灵活性），其 diff 策略相对基础。性能优化很大程度上依赖开发者手动干预（`key`, `memo`, `useMemo`, `useCallback`）。
- Vue (尤其是 Vue 3): 充分利用**编译时**信息进行激进优化（静态提升、Block Tree、Patch Flags），结合响应式系统实现更细粒度的自动更新。其 diff 算法（特别是同层级列表的 LIS 优化）在处理节点移动和动态更新上效率更高，且减少了对开发者手动优化的依赖。Vue 的设计哲学倾向于“开箱即用”的性能。



### 7、React concurrency 并发机制:star:

React 的并发机制（Concurrency）是 React 18 引入的一项重要特性，旨在提升应用的响应性和性能。

**1. 什么是 React 的并发机制？**

React 的并发机制允许 React 在渲染过程中根据任务的优先级进行调度和中断，从而确保高优先级的更新能够及时渲染，而不会被低优先级的任务阻塞。

**2. 并发机制的工作原理：**

- **时间分片（Time Slicing）：** React 将渲染任务拆分为多个小片段，每个片段在主线程空闲时执行。这使得浏览器可以在渲染过程中处理用户输入和其他高优先级任务，避免长时间的渲染阻塞用户交互。
- **优先级调度（Priority Scheduling）：** React 为不同的更新分配不同的优先级。高优先级的更新（如用户输入）会被优先处理，而低优先级的更新（如数据预加载）可以在空闲时处理。
- **可中断渲染（Interruptible Rendering）：** 在并发模式下，React 可以中断当前的渲染任务，处理更高优先级的任务，然后再恢复之前的渲染。这确保了应用在长时间渲染过程中仍能保持响应性。

**3. 并发机制的优势：**

- **提升响应性：** 通过优先处理高优先级任务，React 能够更快地响应用户输入，提升用户体验。
- **优化性能：** 将渲染任务拆分为小片段，避免长时间的渲染阻塞，提升应用的整体性能。
- **更好的资源利用：** 在主线程空闲时处理低优先级任务，充分利用系统资源。

**4. 如何启用并发模式：**

要在 React 应用中启用并发模式，需要使用 `createRoot` API：

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

在并发模式下，React 会自动根据任务的优先级进行调度和渲染。



### 8、合成事件**SyntheticEvent**:star:

React 的合成事件（Synthetic Events）是一种跨浏览器的封装事件，它为开发者提供了一套统一的事件处理接口，使得在不同浏览器中处理事件变得更为一致和可靠。**React 使用合成事件来解决浏览器之间的事件处理差异，并提供了一些额外的功能，如事件池化，以提高性能。**

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



### 9、batchUpdate（批处理）:star:

React 的 **batchUpdate（批处理更新）机制** 是一种优化策略，旨在**将多个状态更新合并为一次渲染**，减少不必要的组件重新渲染次数，从而提高性能。

在 React 中，当组件的状态或属性发生变化时，通常会触发重新渲染。如果短时间内多次调用 `setState` 或者有多个更新被调度，React 会将这些更新合并在一起，一次性地更新 DOM。这种策略有助于减少浏览器的重绘（repainting）和回流（reflow），从而提高性能。

**BatchUpdate 的应用场景**

- **连续多次调用`setState`**：如果你在一个很短的时间内连续调用了多次`setState`，React会将这些状态更新合并为一个批次来处理。
- **事件处理**：在某些情况下，比如处理用户输入或多个事件时，React也会进行批量更新以减少DOM操作次数。
- **定时任务**：在使用`setTimeout`或`requestAnimationFrame`等异步任务时，React也会等待这些任务完成后再进行批量更新。



**核心机制**

1. **异步合并更新** 当在 **同一执行上下文**（如同一个事件处理函数、生命周期方法或 React 合成事件）中多次调用状态更新（如 `setState`、`useState` 的 `setter` 函数），React 不会立即触发渲染，而是将多个更新收集到一个队列中，最终合并为一次更新，统一计算新状态并渲染。
2. **更新队列** React 内部维护一个更新队列。在触发更新的代码块中，所有状态变更会被暂存到队列，直到代码执行完毕，React 才会一次性处理队列中的所有更新，生成新的虚拟 DOM，并通过 Diff 算法高效更新真实 DOM。



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



### 10、setState之后发生了哪些事情

1. **状态更新**：`setState`接收新的状态值，并合并到当前状态中。
2. **调度更新**：React将状态更新加入队列，并可能与其他更新一起批量处理。
3. **计算差异**：React根据新状态重新计算虚拟DOM，并找出需要更新的部分。
4. **实际DOM更新**：React仅更新实际DOM中的必要部分。
5. **生命周期方法调用**：在更新的不同阶段，React会调用相关的生命周期方法。
6. **完成更新**：DOM更新完成后，本次更新过程结束。



### 11、React 组件渲染和更新的全过程:star:

**1. 整体流程概述** 

React 的渲染和更新过程可以分为以下几个阶段：

1. **初始化阶段**：创建 Fiber 树和 Hooks 链表。
2. **渲染阶段**：生成新的虚拟 DOM（Fiber 树）。
3. **协调阶段**：对比新旧 Fiber 树，找出需要更新的部分。
4. **提交阶段**：将更新应用到真实 DOM。
5. **清理阶段**：重置全局变量，准备下一次更新。

**2. 详细流程分析**

**（1）初始化阶段**

- **触发条件**：组件首次渲染或状态/属性更新。
- **关键函数**：`render`、`createRoot`、`scheduleUpdateOnFiber`。
- 逻辑
  1. 通过 `ReactDOM.render` 或 `createRoot` 初始化应用。
  2. 创建根 Fiber 节点（`HostRoot`）。
  3. 调用 `scheduleUpdateOnFiber`，将更新任务加入调度队列。

**（2）渲染阶段**

- **触发条件**：调度器开始执行任务。
- **关键函数**：`performSyncWorkOnRoot`、`beginWork`、`renderWithHooks`。
- 逻辑
  1. 调用 `performSyncWorkOnRoot`，开始渲染任务。
  2. 调用 `beginWork`，递归处理 Fiber 节点。
  3. 对于函数组件，调用 `renderWithHooks`，执行组件函数并生成新的 Hooks 链表。
  4. 对于类组件，调用 `instance.render`，生成新的虚拟 DOM。
  5. 对于 Host 组件（如 `div`），生成对应的 DOM 节点。

**（3）协调阶段**

- **触发条件**：新的虚拟 DOM 生成后。
- **关键函数**：`reconcileChildren`、`diff`。
- 逻辑
  1. 调用 `reconcileChildren`，对比新旧 Fiber 节点。
  2. 根据 `diff` 算法，找出需要更新的节点。
  3. 为需要更新的节点打上 `Placement`、`Update`、`Deletion` 等标记。

**（4）提交阶段**

- **触发条件**：协调阶段完成后。
- **关键函数**：`commitRoot`、`commitWork`。
- 逻辑
  1. 调用 `commitRoot`，开始提交更新。
  2. 调用 `commitWork`，递归处理 Fiber 节点。
  3. 根据节点的标记，执行 DOM 操作（如插入、更新、删除）。
  4. 调用生命周期钩子（如 `componentDidMount`、`componentDidUpdate`）。

**（5）清理阶段**

- **触发条件**：提交阶段完成后。
- **关键函数**：`resetHooks`、`resetContext`。
- 逻辑
  1. 重置全局变量（如 `currentlyRenderingFiber`、`currentHook`）。
  2. 清理上下文和副作用。
  3. 准备下一次更新。



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



### 状态管理 Hooks

#### useState

**用于在函数组件中添加局部状态**

- 默认函数组件没有state
- 函数组件是一个纯函数，执行完即销毁，无法存储state
- 需要State Hook，即把state功能“钩”到纯函数中

**useState使用总结**

- `useState(0)`传入初始值，返回数组[state, setState]
- 通过state获取值
- 通过`setState(1)`修改值

**Hooks命名规范**

- 规定所有的Hooks都用use开头，如useXxx
- 自定义Hook也要以use开头
- 非Hooks的地方，尽量不要使用useXxx写法

**代码演示**

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



#### useReducer

用于管理复杂的状态逻辑，类似于 Redux 的 reducer。

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



**useReducer 和 redux 的区别**

- useReducer是useState的代替方案，用于state复杂变化
- useReducer是单个组件状态管理，组件通讯还需要props
- redux是全局的状态管理，多组件共享数据



### 副作用 Hooks

#### useEffect

用于在函数组件中执行副作用操作（如数据获取、订阅、手动 DOM 操作等）

**让组件模拟生命周期**

- 默认函数组件没有生命周期
- 函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
- 使用Effect Hook 把生命周期“钩”到纯函数中

**useEffect使用总结**

- 模拟 componentDidMount - useEffect 依赖 []

- 模拟 componentDidUpdate - useEffect 无依赖， 或者依赖 [a, b]

- 模拟 componentWillUnMount - useEffect 中返回一个函数fn

  - useEffect依赖[]，组件销毁时执行fn，等于WillUnMounted
  - useEffect无依赖或依赖[a, b]，组件更新时执行fn
  - 即，下一次执行useEffect之前，就会执行fn，无论更新或卸载

  

**代码演示**

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

**模拟WillUnMount，但不完全相等**

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



**为何 dev 模式下 useEffect 执行两次？**

React 官方文档其实对这个问题进行了[解答](https://zh-hans.react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts)：

在开发环境下，如果开启严格模式，React 会在实际运行 setup 之前额外运行一次 setup 和 cleanup。

这是一个压力测试，用于验证 Effect 的逻辑是否正确实现。如果出现可见问题，则 cleanup 函数缺少某些逻辑。cleanup 函数应该停止或撤消 setup 函数所做的任何操作。一般来说，用户不应该能够区分 setup 被调用一次（如在生产环境中）和调用 setup → cleanup → setup 序列（如在开发环境中）。

借助严格模式的目标是帮助开发者提前发现以下问题：

1. 不纯的渲染逻辑：例如，依赖外部状态或直接修改 DOM。
2. 未正确清理的副作用：例如，未在 useEffect 的清理函数中取消订阅或清除定时器。
3. 不稳定的组件行为：例如，组件在多次挂载和卸载时表现不一致。

通过强制组件挂载和卸载两次，React 可以更好地暴露这些问题。



#### useLayoutEffect

与 `useEffect `类似，但`useLayoutEffect`是**同步执行**的，**在 DOM 更新后、浏览器绘制前触发**，适用于需要**同步读取或修改DOM**的场景，例如**测量 DOM 元素、同步更新 DOM、动态布局调整、动画初始化**等。由于它是同步执行的，可能会阻塞浏览器的渲染，因此应谨慎使用。

区别

- `useEffect` 是异步执行的，而`useLayoutEffect`是同步执行的。
- `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前，和 `componentDidMount` 等价。

总结

1. 优先使用 `useEffect`，因为它是异步执行的，不会阻塞渲染
2. 会影响到渲染的操作尽量放到 `useLayoutEffect`中去，避免出现闪烁问题
3. `useLayoutEffect`和`componentDidMount`是等价的，会同步调用，阻塞渲染
4. 在服务端渲染的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致。



### 上下文 Hooks

#### useContext

```js
import React, { useState } from 'react'

// 创建一个 Context
const MyContext = React.createContext()

// 父组件
function Parent() {
  const [sharedData, setSharedData] = useState('Hello from Context')

  const updateData = () => {
    setSharedData('Updated Data from Context')
  }

  return (
    // 提供数据和更新函数
    <MyContext.Provider value={{ sharedData, updateData }}>
      <ChildA />
    </MyContext.Provider>
  )
}

// 子组件 A（引用子组件 B）
function ChildA() {
  return (
    <div>
      <ChildB />
    </div>
  )
}

// 子组件 B（使用 useContext）
function ChildB() {
  const { sharedData, updateData } = React.useContext(MyContext)
  return (
    <div>
      <div>ChildB: {sharedData}</div>
      <button onClick={updateData}>Update Data</button>
    </div>
  )
}

export default Parent
```



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

// 父组件
function App() {
    // 提供数据和更新函数
    return <ThemeContext.Provider value={themes.dark}>
        <Toolbar></Toolbar>
    </ThemeContext.Provider>
}

// 子组件 Toolbar（引用子组件 ThemeButton）
function Toolbar() {
    return <div>
        <ThemeButton></ThemeButton>
    </div>
}


// 子组件 ThemeButton（使用 useContext）
function ThemeButton() {
    const theme = useContext(ThemeContext)

    return <button style={{ background: theme.background, color: theme.foreground }}>
        hello world
    </button>
}

export default App
```



### 引用 Hooks

#### useRef

- 用于创建一个可变的引用对象

- 它允许你在渲染之间持久地引用值

- useRef通常用于两种主要情况：访问 DOM 节点和保留渲染之间的值。

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



### 性能优化 Hooks

#### useMemo

**用于缓存计算结果，避免在每次渲染时都重新计算。**

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

**用于缓存回调函数，避免在每次渲染时都创建新的回调。**



**useMemo和useCallback的异同**

- 都用于缓存数据，优化性能

- 两者接收的参数都是一样的，第一个参数表示一个回调函数，第二个表示依赖的数据

- 在依赖数据发生变化的时候，都会调用传进去的回调函数去重新计算结果，起到一个缓存的作用

区别：

- useMemo缓存的结果是回调函数中return回来的值，主要用于**缓存计算结果**的值，应用场景如需要计算的状态
- useCallback缓存的结果是**回调函数**，主要用于缓存函数，应用场景如需要缓存的函数，因为函数式组件每次任何一个state发生变化，会触发整个组件更新，一些函数是没有必要更新的，此时就应该缓存起来，提高性能，减少对资源的浪费



另外还需要注意的是，useCallback应该和React.memo配套使用，缺了一个都可能导致性能不升反而下降。

```js
import React, { useState, useCallback } from 'react';

// 子组件（使用 React.memo 避免无效重渲染）
const Button = React.memo(({ onClick, label }) => {
  console.log(`[子组件渲染] ${label}`);
  return <button onClick={onClick}>{label}</button>;
});

function Counter() {
  const [count, setCount] = useState(0);

  // 没有缓存的函数（每次重新渲染都会创建新函数）
  const increment = () => setCount(c => c + 1);

  // 使用 useCallback 缓存的函数（依赖项不变时保持相同引用）
  const decrement = useCallback(
    () => setCount(c => c - 1),
    [] // 空依赖表示永不重新创建
  );

  return (
    <div>
      <h1>计数器: {count}</h1>
      
      {/* 点击会触发父组件重渲染，但 decrement 按钮不会重建函数 */}
      <Button onClick={increment} label="增加" />
      
      {/* 因函数引用不变，Memo组件不会重渲染 */}
      <Button onClick={decrement} label="减少" />
      
      {/* 内联函数每次都会重建 */}
      <Button onClick={() => setCount(0)} label="重置" />
    </div>
  );
}

export default Counter;
```



### 其他 Hooks

- useDeferredValue: 延迟更新 UI 的某些部分。
- useActionState: 根据某个表单动作的结果更新 state。
- useImperativeHandle: 用于自定义暴露给父组件的实例值，通常与 forwardRef 一起使用。
- useDebugValue: 用于在 React 开发者工具中显示自定义 Hook 的标签。
- useOptimistic 帮助你更乐观地更新用户界面
- useTransition: 用于标记某些状态更新为“过渡”状态，允许你在更新期间显示加载指示器。
- useId: 用于生成唯一的 ID，可以生成传递给无障碍属性的唯一 ID。
- useSyncExternalStore: 用于订阅外部存储（如 Redux 或 Zustand）的状态。
- useInsertionEffect: 为 CSS-in-JS 库的作者特意打造的，在布局副作用触发之前将元素插入到 DOM 中



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

#### 自定义useRequest

```js
import { useState, useEffect } from 'react'
import axios from 'axios'

// 封装 axios 发送网络请求的自定义 Hook
function useRequest(url) {
  const [data, setData] = useState(null) // 存储请求的数据
  const [loading, setLoading] = useState(true) // 加载状态
  const [error, setError] = useState(null) // 错误信息
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // 设置加载状态为 true
      setError(null) // 清空先前的错误

      try {
        const response = await axios.get(url)
        if (!response.ok) {
          throw new Error('请求失败!')
        }
        setData(response.data) // 设置数据
      } catch (err) {
        setError(err.message) // 捕获错误并设置错误信息
      } finally {
        setLoading(false) // 请求结束，设置加载状态为 false
      }
    }

    fetchData()
  }, [url]) // 依赖于 url，当 url 改变时重新发起请求

  return { loading, data, error }
}

export default useRequest
```

使用

```js
import React from 'react'
import useRequest from '../customHooks/useRequest'

function App() {
    const { loading, data, error } = useRequest('https://xxx.xxxx.com/data')
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>错误信息: {error}</p>
    return (
      <div>
        <h3>请求结果:</h3>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    )
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



**为何 Hooks 不能放在条件或循环之内？**

一个组件中的 hook 会以链表的形式串起来， FiberNode 的 memoizedState 中保存了 Hooks 链表中的第一个 Hook。

在更新时，会复用之前的 Hook，如果通过了条件或循环语句，增加或者删除 hooks，在复用 hooks 过程中，会产生复用 hooks状态和当前 hooks 不一致的问题。



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



### Hooks 相比 HOC 和 Render Props 有哪些优点

- 完全符合Hooks原有规则，没有其他要求，易理解记忆
- 变量作用域明确
- 不会产生组件嵌套



### useEffect 的底层是如何实现的

useEffect 是 React 用于管理副作用的 Hook，它在 commit 阶段 统一执行，确保副作用不会影响渲染。

在 React 源码中，useEffect 通过 Fiber 机制 在 commit 阶段 进行处理：

**(1) useEffect 存储在 Fiber 节点上**

React 组件是通过 Fiber 数据结构 组织的，每个 useEffect 都会存储在 fiber.updateQueue 中。

**(2) useEffect 何时执行**

React 组件更新后，React 在 commit 阶段 统一遍历 effect 队列，并执行 useEffect 副作用。

React 使用 `useEffectEvent()` 注册 effect，在 commitLayoutEffect 之后，异步执行 useEffect，避免阻塞 UI 渲染。

**(3) useEffect 依赖变化的处理**

依赖数组的比较使用 `Object.is()`，只有依赖变化时才重新执行 useEffect。

在更新阶段，React 遍历旧 effect，并先执行清理函数，然后再执行新的 effect。

**简化的 useEffect 实现如下：**

```js
function useEffect(callback, dependencies) {
  const currentEffect = getCurrentEffect() // 获取当前 Fiber 节点的 Effect

  if (dependenciesChanged(currentEffect.dependencies, dependencies)) {
    cleanupPreviousEffect(currentEffect) // 先执行上次 effect 的清理函数
    const cleanup = callback() // 执行 useEffect 传入的回调
    currentEffect.dependencies = dependencies
    currentEffect.cleanup = cleanup // 存储清理函数
  }
}
```

相比 useLayoutEffect，useEffect 是 异步执行，不会阻塞 UI 渲染。





## 四、其他

### 1、React16,17,18,19新特性更新对比:star:

#### **React 16（2017） - Fiber 架构革命**

- ‌**Fiber 架构引入**‌：16.8 版本首次引入 Fiber 架构，将组件渲染分解为独立节点，优化性能为并发模式奠基。 ‌
- ‌**Hooks 机制**‌：新增多个生命周期钩子（如 useState、useEffect），解决函数组件状态管理问题，推动组件复用。 ‌

- **Error Boundaries**：通过 `componentDidCatch` 捕获组件树错误
- **Fragment / Portal**：`<></>` 片段语法、`ReactDOM.createPortal` 渲染到 DOM 外节点

- **新生命周期**：`getDerivedStateFromProps`、`getSnapshotBeforeUpdate`

#### **React 17（2020） - 平稳过渡版本**

- ‌**事件委托优化**‌：事件绑定到根容器而非 `document`，支持多版本 React 共存。 ‌
- ‌**无需引入 React 的 JSX**‌：不再需显式 `import React`（通过 Babel 自动注入），减少代码冗余。 ‌
- ‌**副作用清理优化**‌：useEffect 的清理函数改为异步执行，减少渲染阻塞。 ‌

#### **React 18（2022） - 并发模式时代**

- **并发特性支持**‌：利用 Fiber 架构优势，函数组件可实现并发渲染。 ‌`createRoot` API 启用并发特性（非阻塞式渲染）
- ‌**新生命周期废弃**‌：完全移除 `componentWillMount` 等生命周期方法，推荐使用 `getDerivedStateFromProps` 等替代方案。 ‌
- **自动批处理优化**：异步操作中的 `setState` 自动合并更新
- **Suspense 增强**：支持数据获取场景（与 `React.lazy` 配合）
- **新 Hook API**：`useId`、`useSyncExternalStore`、`useInsertionEffect`
- **流式服务端渲染**：`renderToPipeableStream` 提升首屏性能

#### **React 19（2025 Beta） - 未来标准**

- **Actions API**‌：简化异步操作管理，自动处理待处理状态、错误边界和乐观更新，支持表单提交状态共享。 ‌

  ```js
  // 使用表单的 Actions 和 useActionState
  function ChangeName({ name, setName }) {
    const [error, submitAction, isPending] = useActionState(
      async (previousState, formData) => {
        const error = await updateName(formData.get("name"));
        if (error) {
          return error;
        }
        redirect("/path");
        return null;
      },
      null,
    );
  
    return (
      <form action={submitAction}>
        <input type="text" name="name" />
        <button type="submit" disabled={isPending}>Update</button>
        {error && <p>{error}</p>}
      </form>
    );
  }
  ```

- ‌**useTransition / useOptimistic**‌：提供更简洁的异步状态管理方式，支持预加载资源和自定义错误处理。 ‌

  - 例：可以使用 `useTransition` 来为你处理待定状态

    ```js
    // 使用 Actions 中的待定状态
    function UpdateName({}) {
      const [name, setName] = useState("");
      const [error, setError] = useState(null);
      const [isPending, startTransition] = useTransition();
    
      const handleSubmit = () => {
        startTransition(async () => {
          const error = await updateName(name);
          if (error) {
            setError(error);
            return;
          } 
          redirect("/path");
        })
      };
    
      return (
        <div>
          <input value={name} onChange={(event) => setName(event.target.value)} />
          <button onClick={handleSubmit} disabled={isPending}>
            Update
          </button>
          {error && <p>{error}</p>}
        </div>
      );
    }
    ```

#### **关键差异总结**

| 特性              | React 16 | React 17 | React 18   | React 19     |
| :---------------- | :------- | :------- | :--------- | :----------- |
| **Fiber 架构**    | ✓        | ✓        | ✓          | ✓            |
| **并发模式**      | ✗        | ✗        | ✓          | ✓（优化）    |
| **Suspense 数据** | ✗        | ✗        | ✓          | ✓（增强）    |
| **服务端组件**    | ✗        | ✗        | 实验性     | **正式支持** |
| **自动批处理**    | 仅同步   | 仅同步   | **全场景** | ✓            |
| **Actions API**   | ✗        | ✗        | ✗          | ✓            |



### 2、Jquery和框架的区别

 框架：数据和视图分离，以数据驱动视图，只关心数据变化，dom操作被封装。数据驱动

 Jquery： 依靠dom操作去组合业务逻辑。事件驱动



### 3、React和Vue对比:star:

**共同点**

- **组件化架构：** 两者都将 UI 分解为独立、可复用的组件。每个组件管理自己的状态和视图。
- **虚拟 DOM：** 都使用虚拟 DOM 来提高渲染性能。当状态变化时，先在内存中构建新的虚拟 DOM 树，然后与旧的虚拟 DOM 树进行高效的对比（Diffing），最后只将实际变化的部分更新到真实 DOM。
- **声明式渲染：** 开发者主要描述“UI 应该是什么样子”（基于当前状态），而不是手动操作 DOM（命令式）。框架负责根据状态变化自动更新 DOM。
- **响应式数据绑定：** 都提供了机制让视图能够自动响应底层数据状态的变化。
- **活跃的生态系统：** 两者都有庞大且活跃的社区，提供了丰富的第三方库、工具（路由、状态管理、构建工具等）和学习资源。
- **适用于构建现代单页应用：** 都是构建复杂、交互丰富的单页应用程序的理想选择。
- **支持服务端渲染：** 都提供了解决方案（React: Next.js, Vue: Nuxt.js）来支持服务端渲染，改善 SEO 和首屏加载速度。



**主要差异点**

- **核心库定位**：React 更灵活但需要自行选择路由、状态管理等配套方案；Vue 提供更开箱即用的集成体验。
- **模板语法**：React使用JSX，Vue使用类似 HTML 的模板语法，指令 (`v-`) 提供逻辑。
  - JSX 是 JavaScript 的语法扩展，能力更强更灵活（JS 里能做的它都能做）；Vue 模板更接近标准 HTML，对设计师/新手更友好，逻辑受限（需指令）。
- **状态管理 (核心)**：React 需要显式调用更新函数；Vue 自动追踪依赖并在属性修改时更新。React 更强调不可变性；Vue 拥抱可变性但底层通过代理实现响应。
- **学习曲线**：Vue 学习曲线相对平缓，通常被认为对新手更友好，更容易上手；React 学习曲线相对陡峭， JSX、函数式思想、Hooks 心智模型、不可变性概念、需要自行选型集成。
- **API 风格**：Vue 提供了两种风格供选择（选项式 API & 组合式 API，组合式 API 是未来趋势）；React 已全面转向函数式 + Hooks。类组件已不推荐。
- **构建工具**：两者都支持 Vite，但 Vue 与 Vite 的集成和推广更紧密。

