# React小记

## React基本使用

### 1、JSX

React发明了JSX，利用HTML语法来创建虚拟DOM。React的核心机制之一就是可以在内存中创建虚拟的DOM元素。以此来减少对实际DOM的操作从而提升性能。JSX即JavaScript XML，它是对JavaScript的语法扩展，React使用JSX来替代常规的JS。

**JSX的优点**

- JSX执行更快，因为它在编译为JS代码进行了优化
- 它是类型安全的，在编译过程中就能发现错误
  - React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止XSS（cross-site-scripting, 跨站脚本）攻击。
- 使用JSX编写模板更加简单快速

**JSX语法**

1、我们可以在代码中嵌套多个HTML标签，需要使用一个div元素包裹它。也可以用`<Fragment></Fragment>`（相当于占位符，但不会增加元素）来包裹

2、添加自定义属性需要使用“data-”前缀。实例中的p元素添加了自定义属性data-myattribute

3、我们可以在JSX中使用JS表达式（不能适用于语句），表达式写在大括号“{}”中

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

4、样式

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

5、注释

```js
{/* ... */}
{
    // （单行注释要换行）
}
```

6、数组

JSX允许在模板中插入数组，数组会自动展开所有成员

```js
var arr = [
    <h1>xxx</h1>
    <h2>xxx</h2>
];
<div>{arr}</div>
```

### 2、向事件处理程序传递参数

在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 id 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

### 3、state

- 不要直接修改state

  ```js
  this.state.comment = 'hello'; // wrong
  this.setState({
      comment: 'hello';  //right
  })
  ```

  构造函数是唯一可以给this.state赋值的地方

- State 的更新可能是异步的

出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
例如，此代码可能会无法更新计数器：

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### 4、阻止默认行为

不能通过返回 false 的方式阻止默认行为。必须显式的使用 preventDefault 。

例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：
`<a href="#" onclick="console.log('The link was clicked.'); return false">`

```js
<a>Click me</a>

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
} 
```

在这里，e 是一个合成事件。React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。  

### 5、阻止组件渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你**可以让 render 方法直接返回 null**，而不进行任何渲染。
下面的示例中，`<WarningBanner /> `会根据 prop 中 warn 的值来进行条件渲染。如果 warn 的值是 false，那么组件则不会渲染:

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

### 6、一个元素的 key 

最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据 id 来作为元素的 key：

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

### 7、setState的过程

- 每个组件实例，都有renderComponent方法
- 执行renderComponent会重新执行执行的render
- render函数返回newVnode，然后拿到vnode
- 执行patch(vnode, newVnode)

### 8、PWA

**什么是PWA**

PWA全称Progressive Web App，即渐进式WEB应用。

写网页的形式写手机APP应用。

> 1、可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
> 2、实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
> 3、实现了消息推送

registerServiceWorker

引用它，网页上线到支持https协议的服务器上。第一次访问时需联网才能看到，但突然断网，第二次访问时依然可以看到之前访问过的页面，因为registerServiceWorker会把之前的网页存储在浏览器内。

### 9、html元素转义

```js
var item = `<h1>hello</h1>`
<li
	key={index}
	onClick={this.handleItemDelete.bind(this, index)}
    dangerouslySetInnerHTML={__html: item}
>
</li>
```

### 10、扩大点击区域

```js
<label htmlFor="insertArea">输入内容</label>  // 不用for，与循环for有歧义
<input id="insertArea"/>
```

### 11、react的思考

- 声名式开发
- 可以与其它框架并存
- 组件化
- 单向数据流
- 视图层框架
- 函数式编程

### 12、父子组件的通信

#### 父传子

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

#### 子传父

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

### 13、子组件PropTypes和DefaultProps

```js
import PropTypes from 'prop-types';

// 属性类型校验
TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

// 定义属性默认值
TodoItem.defaultProps = {
  test: 'hello world'
}
```

### 14、props，state与render函数

当组件的state或props发生改变的时候，render函数就会重新执行。

当父组件的render函数被运行时，它的子组件的render都将被重新运行一次。

### 15、虚拟DOM:star:

什么是虚拟DOM？用JS模拟DOM结构，DOM变化的对比，放在JS层进行（因为前端语言中只有JS是图灵完备语言）[什么是图灵完备语言？](https://blog.csdn.net/Roselane_Begger/article/details/101176694)

创建真实DOM损耗的性能远大于创建虚拟DOM损耗的性能。

虚拟DOM提高性能，不是说不操作DOM，而是减少操作DOM的次数，减少回流和重绘。

虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 **dom diff 算法避免了没有必要的 dom 操作**，从而提高性能。

1）用 JavaScript 对象结构表示 DOM 树的结构；

2）然后用这个树构建一个真正的 DOM 树，插到文档当中

3）当状态变更的时候，重新构造一棵新的对象树

4）然后用新的树和旧的树进行比较，记录两棵树差异

5）把所记录的差异应用到步骤 2) 所构建的真正的 DOM 树上，视图就更新了

使用diff算法比较新旧虚拟DOM----即比较两个js对象不怎么耗性能，而比较两个真实的DOM比较耗性能，从而虚拟DOM极大的提升了性能

**虚拟DOM发生比对的时机**：当数据发生变化的时候会发生虚拟DOM的比对（props和state发生变化，而props的变化是父组件的state发生变化，归根结底就是调用setState()的时候state发生变化，然后虚拟DOM发生比对）。

**setState()方法是异步的**，从而提升性能-----例如调用3次setState()变更数据，而调用时间间隔小，React可以将3次setState合并成一次setState，只做一次虚拟DOM比对，然后对DOM更新，从而省去两次额外虚拟DOM比对的性能损耗

#### diff算法：同层比对，列表使用不同的key值

[一个元素的 key](# 6、一个元素的 key)

- 把树形结构按照层级分解，只比较同级元素。
- 给列表结构的每个单元添加唯一的 key 属性，方便比较。
- React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
- 合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component ，然后重新绘制.
- 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能

**React的DOM是同层比对的**

diff算法指的就是**两个虚拟DOM作比对**，在diff算法中有个概念就是**同级比对**，首先比对顶层虚拟DOM节点是否一致，如果一样就接着比对下一层，如果不一样，就停止向下比对，将原始页面中这个DOM及 下面的DOM全部删除掉，重新生成新的虚拟DOM，然后替换掉原始页面的DOM

**存在问题**：如果第一层虚拟DOM节点不同，下面的都相同，使用虚拟DOM的diff算法，则这些节点都不能使用了，会造成重新渲染的浪费。

**优点**：同层虚拟DOM比对，只需要一层层的比较，算法简单，比对的速度快

虽然会造成重新渲染的浪费，但是会大大减少两个DOM比对的性能消耗

**diff算法实现（简洁版，不是真正的实现方式）**

```js
// patch(container, vnode)
function createElement(vnode) {
    var tag = vnode.tag;
    var attrs = vnode.attrs || {};
    var children = vnode.children || [];
    if (!tag) {
        return null;
    }
    var elem = document.createElement(tag);  // 创建真实的DOM元素
    var attrName;
    for (attrName in attr) {
        if (attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName]); // 给elem添加属性
        }
    }
    children.forEach(function(childVnode) { // 子元素
        elem.appendChild(createElement(childVnode)); // 给elem添加子元素、递归 
    })
    return elem; // 返回真实的DOM元素
}

// patch(vnode, newVnode)
function updateChildren(vnode, newVode) {
    var children = vnode.children || [];
    var newChildren = newVnode.children || [];
    children.forEach(function(children, index) {
        var newChildVnode = newChildren[index];
        if (childVnode.tag === newChildVnode.tag) {
            updateChildren(childVnode, newChildVnode); // 深层次对比，递归
        } else {
            replaceNode(childVnode, newChildVnode); // 替换
        }
    })
}
function replaceNode(vnode, newVnode) {
    var elem = vnode.elem; // 真实的DOM节点
    var newElem = createElement(newVnode);
    // 下一步进行替换
}
```

#### （重点）虚拟DOM实现

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

`return <div>item</div>` 等价于 `return ReactElement('div', {}, 'item')`

**虚拟DOM的优点**

1、提高重绘性能

2、它使得跨端应用得以实现 （React Native）

### 16、React中ref的使用（不过尽量少用）

```js
<input value={this.state.inputValue} ref={(input) => {this.input = input;}} onChange={this.handleInputChange}  />
handleInputChange() {
    const value = this.input.value;  //替换e.target.value
    this.setState(() => ({
        inputValue: value
    }))
}
```

### 17、生命周期

生命周期函数指在某一时刻组件会自动调用执行的函数。

![react生命周期](..\picture\react生命周期.png)

- constructor：在组件一创建的时刻就被调用。但不归类在React的生命周期中，因为它是ES6里面的东西，不是React独有的。

- componentWillMount：在组件即将被挂载到页面的时刻自动执行。

- componentDidMount：在组件被挂载后自动执行。

- shouldComponentUpdate：组件被更新之前，自动被执行需要返回一个布尔值。true 更新 false 不会被更新

- componentWillUpdate：组件被更新之前，它会自动执行，但是它在shouldComponentUpdate之后被执行，如果返回true就执行，如果返回false，这个函数就不会被执行了。
- componentDidUpdate：组件被更新之后自动执行。

- componentWillReceiveProps：一个组件要从父组件接受参数。只要父组件的render函数被重新执行了，子组件的这个生命周期函数就会被执行（如果这个组件第一次存在与父组件中，不会执行；如果这个组件之前已经存在于父组件中，才会执行）
- componentWillUnmount：当这个组件即将被从页面中剔除的时候，会被执行。

### 18、性能提升

这篇文章挺好的：https://www.jianshu.com/p/333f390f2e84

1、`this.handleClick = this.handleClick.bind(this);`

将这种作用域的修改放在constructor中，保证作用域绑定操作只执行一次。

2、setState异步函数：能将多个数据的改变结合成一次来做，降低虚拟DOM的比对频率。

3、虚拟DOM，同层比对

4、借助**shouldComponentUpdate**避免组件做多次无谓的render操作

```js
shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
        return true;
    } else {
        return false;
    }
    ...
}
```

5、ajax请求放在**componentDidMount**里

```js
componentDidMount() {
    axios.get('/api/todolist')
    .then(() => { alert('succ'); })
    .catch(() => { alert('error') })
}
```

### 19、React的css过渡动画

```css
.show {
    opacity: 1;
    transition: all 1s ease-in;
}
.hide {
    animation: hide-item 2s ease-in forwords; // 保持动画最后一帧css的样式
}
@keyframes hide-item {
    0% {
        opacity: 1;
        color: red;
    }
    50% {
        opacity: 0.5;
        color: green;
    }
    100% {
        opacity: 0;
        color: blue;
    }
}
```

### 20、使用react-transition-group实现动画

```css
import {CSSTransition} from 'react-transition-group';
<CSSTransition 
	onEntered={(el) => {el.style.color = 'blue';}}  // 结束时为蓝色
    in={this.state.show}
    className='fade'
	timeout={1000}  // 动画执行时间
	appear={true}  // 第一次展现也有动画效果
	unmountOnExit // DOM消失时被移除
>
        <div>hello</div>
</CSSTransition>

.fade-enter, .fade-appear {
	opacity: 0;
}
.fade-enter-active, .fade-appear-active {
	opacity: 1;
    transition: opacity 1s ease-in;
}
.fade-enter-done {
    opacity: 1;
    color: red;  // 结束之后为红色
}
.fade-exit {
    opacity: 1;
}
.fade-exit-active {
    opacity: 0;
    transition: opacity 1s ease-in;
}
.fade-exit-done {
    opacity: 0;
}
```

### :star:21、Redux

Redux是js应用的 一种可预测的状态容器

**用户页面行为触发一个`Action`，然后，`Store `自动调用 `Reducer`，并且传入两个参数：当前 State 和收到的 Action。Reducer 会返回新的 State 。每当state更新之后，`view`会根据state触发重新渲染。**

Redux = Reducer + Flux

工作流程

![redux的工作流程](..\picture\redux的工作流程.png)

使用

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

**改变store里的数据**

1、先派发一个action，通过dispatch方法传递给store

2、store 自动调用 reducer，reducer中接收state和action进行处理，返回一个新的state返回给store，替换原来的store

3、store中数据改变react感知到store数据的改变，通过store.subscribe()订阅方法设置更新数据

**Redux设计和使用的三项原则**

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

**Redux核心API**

1、createStore ——创建store

2、store.dispatch ——派发action，这个action会传递给store

3、store.getState ——获取store中所有的数据内容

4、store.subscribe ——订阅store的改变，只要store发生改变，subscribe中接收的回调函数就会被执行

### 22、Redux的中间件

对dispatch方法进行升级：

接收对象，和原来一样，直接传递对象给store

接收函数，先执行函数，执行完后需要调用store再操作

如：

redux-thunk中间件——改造store.dispatch使得后者可以接受函数作为参数

redux-saga——单独把逻辑拆分出来放到另一个文件中管理

**ps：中间是指action和store的中间，中间件是Redux的中间件，而不是react**

**redux-thunk的使用**

**redux-saga的使用**

### 23、React-Redux

**核心API**：

Provider：作用：连接store，内部组件都有能力获取store的内容

connect：组件与store作连接

mapStateToProps：把store中state映射成组件中的props

mapDispatchToProps：将store.dispatch挂载到props上

**使用**

### 24、style-components

是针对React写的一套css in js框架，简单来讲，就是在js中写css。相对于预处理器（sass，less）的好处是，css in js使用的是js语法，不用重新再学习新技术，也不会多一道编译步骤，加快网页速度。

