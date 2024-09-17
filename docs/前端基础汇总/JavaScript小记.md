# JavaScript小记

------

2019.12.11     更新this、继承，补充了一些方法，删除对象，创建对象的方法

2020.01.14     增加ES6部分新特性，转自[ES6核心，教你 玩转 ES6新特性](http://www.imooc.com/article/67156)

2020.02.16     更新作用域，let&const

2020.02.24     重新整理，更新小记顺序（大致按《JavaScript高级程序设计》顺序来）

2020.03.07     完成对异步的整理

2020.03.08     更新Generator和Class

2020.03.11     更新Iterator，添加大标题目录

2020.11.24     更新ES6最新基本数据类型BigInt

------

## :smile: 大标题目录

- [JavaScript概述](#JavaScript概述)

- [DOM](#DOM)

- [BOM](#BOM)
- [数据类型](#数据类型)
- [操作符](#操作符)
- [String](#String)
- [Array](#Array)
- [Object](#Object)
- [RexgExp等](#RexgExp等)
- [Function](#Function)
- [作用域](#作用域)
- [闭包](#闭包)
- [内存泄漏](#内存泄漏)
- [对象](#对象)
- [原型](#原型)
- [继承](#继承)
- [事件](#事件)
- [JSON](#JSON)
- [Ajax](#Ajax)
- [跨域](#跨域)
- [异步](#异步)
- [模块化](#模块化)
- [性能优化](#性能优化)
- [总结一下ES6常用功能](#总结一下ES6常用功能)
- [其他](#其他)

------

## JavaScript概述

### 1、 一个完整的JavaScript实现应该由下列三个不同的部分组成

1.核心(ECMAScript) ——提供核心语言功能

2.文档对象模型(DOM) ——提供访问和操作网页内容的方法和接口

3.浏览器对象模型(BOM) ——提供与浏览器交互的方法和接口

ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现（另外的ECMAScript方言还有JScript和ActionScript）。日常场合，这两个词是可以互换的。

### 2、JavaScript语言特性

1、运行在客户端浏览器上；

2、脚本语言、解释性语言，不用预编译，直接解析执行代码；

3、是弱类型语言，较为灵活；

4、与操作系统无关，跨平台的语言；

5、基于对象，是一种基于对象的脚本语言,它不仅可以创建对象,也能使用现有的对象。

### 3、JavaScript的优缺点

[看这里~](../JavaScript/JavaScript的优缺点.md)

### 4、JS内置对象

Arguments（函数参数集合）

Array（数组）

Boolean（布尔对象）

Date（日期对象）

Error（异常对象）

Function（函数构造器）

Math（数学对象）

Number（数值对象）

Object（基础对象）

RegExp（正则表达式对象）

String（字符串对象）

## DOM

### 1、jQuery对象和原生DOM对象互相转化

两者区别：js原生获取的dom是一个对象，jQuery对象就是一个数组对象，其实就是选择出来的元素的数组集合，所以说他们两者是不同的对象类型不等价。

原生DOM对象转jQuery对象：

```js
var box = document.getElementById('box');
var $box = $(box);
```

jQuery对象转原生DOM对象：

```js
var $box = $('#box');
var box1 = $box[0];       // 方法一
var box2 = $box.get(0);   // 方法二
```

### 2、原生javascript和jQuery操作DOM的对比总结

[看这一篇文章](https://www.cnblogs.com/jiangyuzhen/p/10978611.html)

### 3、Node节点

这是一张优秀的思维导图：[JavaScript Node节点类型](https://www.processon.com/view/5cc00e24e4b085d010837583#map)

#### 节点属性

1、nodeType：节点类型

- **Node.ELEMENT_NODE(1)；（元素节点）**

- **Node.ATTRIBUTE_NODE(2)；（属性节点）**

- **Node.TEXT_NODE(3)；（文本节点）**
- Node.CDATA_SECTION_NODE(4)；
- Node.ENTITY_REFERENCE_NODE(5)；
- Node.ENTITY_NODE(6)；
- Node.PROCESSING_INSTRUCTION_NODE(7)；
- **Node.COMMENT_NODE(8)；（注释节点）**
- **Node.DOCUMENT_NODE(9)；（document节点）**
- Node.DOCUMENT_TYPE_NODE(10)；
- Node.DOCUMENT_FRAGMENT_NODE(11)；
- Node.NOTATION_NODE(12)

2、nodeName：节点名称。元素节点为标签名，文本节点为#text

3、nodeValue：节点值。元素节点为null，文本节点为文本内容

#### 节点关系

1、childNodes：当前节点的子节点的节点列表

2、parentNode：当前节点的父节点

3、firstChild：父节点的第一节点。相当于childNodes[0]或childNodes.item[0]

4、lastChild：父节点的最后一个节点

5、nextSibling：当前节点的后一个节点

6、previousSibling：当前节点的前一个节点

7、hasChildNodes：节点包含一或多个子节点的情况下返回true

8、ownerDocument：指向表示整个文档的文档节点

#### 节点操作

1、createElement()：创建元素节点

2、createAttribute()：创建属性节点

3、appendChild()：向节点的子节点列表的结尾添加新的子节点

4、cloneNode()：复制节点。在参数为true的情况下，执行深复制，复制节点以及整个子节点树；在参数为false的情况下，执行浅复制，即只复制节点本身。复制后属于文档所有，并没有给它指定父节点

5、insertBefore(newNode，target)：在指定的子节点前插入新的子节点

6、replaceChild(newNode，target)：用新节点替换一个子节点

7、removeChild()：删除（并返回）当前节点的指定子节点

8、normalize()：将空文本节点删除或将相邻的文本节点合并一个文本节点

9、getAttribute()：返回指定属性值

10、setAttribute()：把指定属性设置或修改为指定的值

11、querySelectorAll()：返回文档中匹配指定css选择器的所有元素，返回NodeList对象（集合）

### 4、DOM节点的attribute和property有何区别

- property只是一个JS对象的属性的修改
- attribute是对html标签属性的修改

请看这篇文章：[JS中attribute和property的区别](https://www.cnblogs.com/lmjZone/p/8760232.html)

### 5、window.onload和DOMConentLoaded的区别

```js
window.addEventListener('load', function() {
    // 页面的全部资源加载完才会执行，包括图片，视频
})
document.addEventListener('DOMContentLoaded', function() {
    // DOM渲染完即可执行，此时图片、视频还可能没有加载完
})
```



## BOM

### 1、BOM属性对象方法

什么是BOM?  BOM（Browser Object Model）浏览器对象模型，是Javascript的重要组成部分。它提供了一系列对象用于与浏览器窗口进行交互，这些对象通常统称为BOM。 

有哪些常用的BOM属性呢？

![](..\picture\bom.png)

**(1) location对象**

location.href-- 返回或设置当前文档的URL

location.search -- 返回URL中的查询字符串部分。例如 <http://www.dreamdu.com/dreamdu.php?id=5&name=dreamdu> 返回包括(?)后面的内容?id=5&name=dreamdu

location.hash -- 返回URL#后面的内容，如果没有#，返回空

**location.host -- 返回URL中的域名部分**，例如www.dreamdu.com

location.hostname -- 返回URL中的主域名部分，例如dreamdu.com

location.pathname -- 返回URL的域名后的部分。例如 <http://www.dreamdu.com/xhtml/> 返回/xhtml/

**location.port -- 返回URL中的端口部分。**例如 <http://www.dreamdu.com:8080/xhtml/> 返回8080

**location.protocol -- 返回URL中的协议部分。**例如 <http://www.dreamdu.com:8080/xhtml/> 返回(//)前面的内容

http:

location.assign -- 设置当前文档的URL

location.replace(url) -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL

location.reload() -- 重载当前页面

**(2) history对象**

history.go() -- 前进或后退指定的页面数 history.go(num);

history.back() -- 后退一页

history.forward() -- 前进一页

**(3) Navigator对象**

navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)

navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

**(4) screen对象**

screen.width

screen.height

## 数据类型

### 1、数据类型

另外可以看看这篇文章：[js中的值类型和引用类型的区别](https://www.cnblogs.com/leiting/p/8081413.html)

**基本数据类型（值类型）**：undefined、null、string、number、boolean、symbol、BigInt

（占用空间固定，保存在栈中）



> [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 是一种内置对象，它提供了一种方法来表示大于 2**53 - 1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。
>
> 可以用在一个整数字面量后面加 n 的方式定义一个 BigInt ，如：10n，或者调用函数BigInt()。
>
> ```js
> const alsoHuge = BigInt(9007199254740991);
> // ↪ 9007199254740991n
> ```
>
> 它在某些方面类似于 Number ，但是也有几个关键的不同点：不能用于 Math 对象中的方法；不能和任何 Number 实例混合运算，两者必须转换成同一种类型。在两种类型来回转换时要小心，因为 BigInt 变量在转换成 Number 变量时可能会丢失精度。



**引用类型**：array、function、object 

（占用空间不固定，保存在堆中。存储在栈中的是指向堆中的数组或者对象的地址）

### 2、堆区和栈区

栈区的特点：操作性能高，速度快，存储量小

​	所以：一般存储操作频率较高，生命周期较短，占用空间较小的数据。（基本数据类型）

堆区的特点：操作性能低（相对于栈区），速度慢，存储量大

​	所以：一般存储操作频率较低，生命周期较长，占用空间较大的数据。（复杂数据类型）

​	堆通常是一个可以被看做一棵完全二叉树的数组对象。  逻辑上：完全二叉树 存储上：数组（顺序存储） 

### 3、JS中数据类型的判断（ typeof，instanceof，constructor，Object.prototype.toString.call() ）

#### typeof

对一个值使用typeof操作符可能返回： 

undefined、string、number、boolean、object（对象或null）、function、symbol、bigint

```js
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object  []数组的数据类型在 typeof 中被解释为object
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object    null 的数据类型被 typeof 解释为 object
console.log(typeof BigInt(10));      // bigint
```

typeof 对于基本类型，除了null都可以显示正确的类型；对于对象，除了函数都会显示object。

对于null来说，虽然它是基本类型，但是会显示object，这是一个存在了很久的bug。

因为在js的最初版本中，使用的是32位系统，为了性能考虑使用低位存储了变量的类型信息，000开头代表是对象，然而null表示为全零，所以将它错误的判断为object。虽然现在的内部类型 判断代码已经改变了，但是对于这个bug却是一直流传下来。

#### instanceof

只有引用数据类型（Array，Function，Object）被精准判断，其他（数值Number，布尔值Boolean，字符串String）字面值不能被instanceof精准判断。

用于判断引用类型属于哪个构造函数的方法。

instanceof可以正确的判断对象的类型，因为**内部机制是通过判断对象的原型链中是不是能找得类型的prototype**。

`f instanceof Foo ` 判断逻辑 f 的`_proto_`一层层往上，能否对应到Foo.prototype

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true    
// console.log(undefined instanceof Undefined);	 // 报错
// console.log(null instanceof Null);	// 报错
```



```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
function Dog(name, age) {
    this.name = name;
    this.age = age;
}
var p = new Person('zs', 18);
var d = new Dog('小花', 8);

console.log(p instanceof Person);       // true
console.log(d instanceof Person);       // true
console.log(p instanceof Object);		// false
```



#### constructor

```js
console.log((2).constructor === Number);  				// true
console.log((true).constructor === Boolean);  			// true
console.log(('str').constructor === String); 			// true
console.log(([]).constructor === Array);  				// true
console.log((function() {}).constructor === Function);  // true
console.log(({}).constructor === Object);               // true
```

用costructor来判断类型看起来是完美的，然而，如果我创建一个对象，更改它的原型，这种方式也变得不可靠了。

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

var p = new Person('csm', 21);

console.log(p.constructor.name); 	// Person

// 改变原型
Person.prototype = {
    name: 'zs',
    age: 18
};

var p1 = new Person('csm', 21);

console.log(p1.constructor.name); 	// Object
```

因此，当要修改对象的proptotype时，一定要设置constructor指向其构造函数

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype = {
	constructor: Person,
    name: 'zs',
    age: 18
};
var p = new Person('csm', 21);
console.log(p.constructor.name); 	// Person
```

#### Object.prototype.toString.call()

```js
console.log(Object.prototype.toString.call(2));    			// [object Number]
console.log(Object.prototype.toString.call(true));			// [object Boolean]
console.log(Object.prototype.toString.call('str'));			// [object String]
console.log(Object.prototype.toString.call([]));			// [object Array]
console.log(Object.prototype.toString.call(function(){}));	// [object Function]
console.log(Object.prototype.toString.call({}));			// [object Object]
console.log(Object.prototype.toString.call(undefined));		// [object Undefined]
console.log(Object.prototype.toString.call(null));			// [object Null]
```

​        使用 Object 对象的原型方法 toString ，使用 call 进行狸猫换太子，借用Object的 toString  方法结果精准的显示我们需要的数据类型。就算我们改变对象的原型，依然会显示正确的数据类型。

```js
// 数据类型判断
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
```



### 4、object和Object

JavaScript中object和Object有什么区别，为什么用typeof检测对象，返回object，而用instanceof 必须要接Object呢？

`typeof` 和 `instanceof` 这两个功能就是完全不一样的运算符。`typeof` 是为了检查数据类型，`instanceof`是为了看一个变量是否是某个对象的实例。

`typeof` 返回的结果，是一个字符串。所以object就是一个字符串。

而 `Object` 是 JavaScript 中一个重要的内置对象，其它对象都是基于它的，包括你创建的函数。

### 5、function和Function

ECMAScript 的Function实际上就是一个功能完整的对象。

而function是用来创建所有对象的构造函数或者普通函数要用的关键字

`var a = new function(){}`实际上是用构造函数的方法创建了一个匿名对象的实例，而并不是系统内置对象`Function`的实例，所以`a instanceof Function`返回`false`，`typeof`返回`"object"`。

### 6、null和undefined的区别

- Undefined类型只有一个值，即undefined。当声明的变量还未被初始化时，变量的默认值为undefined。
  - 变量被声明了，但没有赋值时，就等于undefined。
  - 调用函数时，应该提供的参数没有提供，该参数等于undefined。 
  - 对象没有赋值的属性，该属性的值为undefined。
  - 函数没有返回值时，默认返回undefined。 
- Null类型也只有一个值，即null。null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。
  - 作为函数的参数，表示该函数的参数不是对象。
  - 作为对象原型链的终点。

## 操作符

### 1、&&和||

短路原理

1、只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;

2、只要“&&”前面是true，无论“&&”后面是true还是false，结果都将返“&&”后面的值;

1、只要“||”前面为false,不管“||”后面是true还是false，都返回“||”后面的值。

2、只要“||”前面为true,不管“||”后面是true还是false，都返回“||”前面的值。

### 2、只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型。其他运算只要其中一方是数字，那么另一方就转为数字。

### 3、NaN

```js
var result = “a” < 3; // false，因为“a”被转化成了NaN
```

根据规则，任何操作数与NaN进行关系比较，结果都是false。

Number函数转化规则中，如果是null，返回零；如果是undefined，返回NaN 。

### 4、{} == false / {} == {}

"=="运算符比较"喜欢"Number类型

```js
{} == false  <=> Number({}) == Number(false) <=> NaN == 0  // false
```

```js
{} == {} // false  两者指向的不是同一个地址
```



## String

### 1、String对象中slice()、substring()、substr()的用法与区别

- **slice() 方法**可提取字符串的某个部分，并以新的字符串返回被提取的部分。
  - 语法：`stringObject.slice(start,end)`
  - 返回一个新的字符串。包括字符串 stringObject 从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。
  - 如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。
- **substring() 方法**用于提取字符串中介于两个指定下标之间的字符。
  - 语法：`stringObject.substring(start,stop)`
  - 一个新的字符串，该字符串值包含 stringObject 的一个子字符串，其内容是从 start 处到 stop-1 处的所有字符，其长度为 stop减 start。
  - 如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。
  - 与 slice() 和 substr() 方法不同的是，substring() 不接受负的参数。
- **substr() 方法**可在字符串中抽取从 *start* 下标开始的指定数目的字符。
  - 语法：`stringObject.substr(start,length)`
  - 一个新的字符串，包含从 stringObject 的 start（包括 start 所指的字符） 处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到 stringObject 的结尾的字符。
  - 如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
  - ECMAscript 没有对该方法进行标准化，因此反对使用它。

String 对象的方法 slice()、substring() 和 substr() （不建议使用）都可返回字符串的指定部分。slice() 比 substring() 要灵活一些，因为它允许使用负数作为参数。slice() 与 substr() 有所不同，因为它用两个字符的位置来指定子串，而 substr() 则用字符位置和长度来指定子串。

还要注意的是，String.slice() 与 Array.slice() 相似。

### 2、ES6中字符串的扩展

转自[ES6核心，教你 玩转 ES6新特性](http://www.imooc.com/article/67156)

#### 1.includes()，startsWith()，endsWith()

在ES6之前，js中只有indexof方法，来确定一个字符串中是否包含在另一个字符串中。

ES6中又提供了三种新的方法。

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let str = 'hello My word!'
console.log(str.startsWith("hello"));//true
console.log(str.endsWith('!'));//true
console.log(str.includes('My'));//true
```

#### 2.padStart()，padEnd()

ES6引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。

padStart()用于头部补全，padEnd()用于尾部补全。

```js
console.log('foo'.padStart(4,'a'));//afoo
console.log('foo'.padEnd(4,'a'));//fooa

console.log('foo'.padStart(3,'a'));//foo
console.log('foo'.padEnd(3,'a'));//foo
```

padstart最常见的用途

1.是用来补全在指定的位数。

2.是用来提示字符串格式：

```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```



## Array

### 1、Array对象中slice() 、splice（）的区别

**slice() 方法**可从已有的数组中返回选定的元素。

- 语法：`arrayObject.slice(start,end)`
- 返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。在只有一个参数的情况下，返回从该参数指定位置开始到当前数组末尾的所有项。
- 该方法不改变原数组，而是返回新的数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。
- 如果slice()方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置。
- 如果结束位置小于起始位置，则返回空数组。

**splice() 方法**主要用途是向数组的中部插入项。

- 语法：`arrayObject.splice(index,howmany,item1,.....,itemX)`

  

- | index             | 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。 |
  | ----------------- | ------------------------------------------------------------ |
  | howmany           | 必需。要删除的项目数量。如果设置为 0，则不会删除项目。       |
  | item1, ..., itemX | 可选。向数组添加的新项目。                                   |

- splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）

### 2、Map和ForEach的区别

- `forEach()`: 数组中的每个元素执行一次回调函数
- `map()`: 返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组

**示例**

下方提供了一个数组，如果我们想将其中的每一个元素翻倍，我们可以使用`map`和`forEach`来达到目的。

```js
let arr = [1, 2, 3, 4, 5];
```

**ForEach**

注意，`forEach`是不会返回有意义的值的。另外，forEach不支持break和continue（every也不可以）
我们在回调函数中直接修改`arr`的值。

```js
arr.forEach((num, index) => {
    arr[index] = num * 2;
});
```

**Map**

```js
let doubled = arr.map(num => {
    return num * 2;
});
```

### 3、indexOf与search的区别

- indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置，如果没有找到返回-1
  - 该方法将从头到尾地检索字符串stringObject，看它是否含有子串searchvalue。开始检索的位置在字符串的fromindex处。如果没有fromindex参数则从字符串的开头检索。如果找到一个searchvalue，则返回searchvalue的第一次出现的位置。stringObjec中的字符串位置是从0开始的。
  - indexOf()方法对大小写敏感。
- search方法用于检索字符串中指定的子字符串，检索与**正则表达式**相匹配的子字符串。如果没有找到，返回-1。
  - search() 方法不执行全局匹配，它将忽略标志 g。它同时忽略 regexp 的 lastIndex 属性，并且总是从字符串的开始进行检索，这意味着它总是返回 stringObject 的第一个匹配的位置。
  - search() 方法对大小写敏感。

**indexOf与search的区别**

search()的参数必须是正则表达式,而indexOf()的参数只是普通的字符串。indexOf()是比search()更加底层的方法。

如果只是对一个具体字符串来检索，那么使用indexOf()的系统资源消耗更小，效率更高；如果查找具有某些特征的字符串（例如查找以a开头，后面是数字的字符串），那么indexOf()就无能为力，必须要使用正则表达式和search()方法了。

大多是时候用indexOf()不是为了真的想知道子字符串的位置，而是想知道长字符串中有没有包含这个子字符串。r如果返回索引为-1，那么说明没有，反之则有。

### 4、查找数组

```js
let array = [1, 2, 3, 4, 5]
let find = array.find(function(item) {
    return item === 3
})
console.log(find) // 3 (返回的是值，只输出符合的第一个值，没找到则返回undefined)

```

返回找到值的位置：findIndex

### 5、Array.of

转自[ES6核心，教你 玩转 ES6新特性](http://www.imooc.com/article/67156)

Array.of主要是用于将一组值转化为数组，创建一个可变数量参数的新数组，而不考虑参数的类型和数量

Array.of的出现主要是对Array创建数组的不足进行的补充，因为用Array创建数组，因为参数个数的不同，会造成差异。 Array.of()和Array构造函数的区别：在于处理整数参数

如下：

```js
Array()//[]
Array(3)//[,,,]
Array(1,2,3)//[1,2,3]
//当Array()中的参数只有一个的时候，此时的参数就代表了数组的长度，只有参数大于等于2的时候才会返回，参数组成的新数组。
//Array.of
console.log(Array.of())//[]
console.log(Array.of(3))//[3]
console.log(Array.of(3).length)//1
//而Array无论参数有几个最后都会返参数组成的数组。
```

Array.of功能的模拟实现如下

```js
function arrayof{
    return Array.slice.call(arguments);
}
```

### 6、Array.from()  

Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。

Array.from(arrayLike, mapFn, thisArg)

参数

- `arrayLike`

  想要转换成数组的伪数组对象或可迭代对象。

- `mapFn` 可选

  如果指定了该参数，新数组中的每个元素会执行该回调函数。

- `thisArg` 可选

  可选参数，执行回调函数 `mapFn` 时 `this` 对象。

返回值：一个新的数组实例。

**例1：Array.from ({length:n}, Fn) 将类数组转换为数组**

```js
Array.from({length:3}, () => 'jack') //["jack", "jack", "jack"]
```

```js
let array = {
    0: 'name', 
    1: 'age',
    2: 'sex',
    3: ['user1','user2','user3'],
    'length': 4
}
let arr = Array.from(array)
console.log(arr) // ['name','age','sex',['user1','user2','user3']]
```

如果将上面代码中length属性去掉，arr将会是一个长度为0的空数组[]

**例2：Array.from (obj, mapFn)**

obj指的是数组对象、类似数组对象或者是set对象，map指的是对数组中的元素进行处理的方法。

```js
let set = new Set([1,1,2,5,5,6,7,8,9])
console.log(Array.from(set))  // [1, 2, 5, 6, 7, 8, 9]
```

```js
//将数组中布尔值为false的成员指为0
Array.from([1, ,2,3,3], x => x || 0) //[1,0,2,3,3]
 
//将一个类似数组的对象转为一个数组，并在原来的基础上乘以2倍
let arrayLike = { '0': '2', '1': '4', '2': '5', length: 3 }
Array.from(arrayLike, x => x*2) //[4,8,10]
 
//将一个set对象转为数组，并在原来的基础上乘以2倍
Array.from(new Set([1,2,3,4]), x => x*2) //[2,4,6,8]
```

**例3：Array.from(string) 将字符串转换为数组**

```js
Array.from('abc') //['a','b','c']
```

**例子4：将Map解构转为数组，最方便的做法就是使用扩展运算符(...)**

```js
const myMap = new Map().set(true, 7)
console.log(myMap); //Map(1) {true => 7}
console.log([...myMap]); //[true ,7]
```

### 7、伪数组转化为数组

**伪数组**

1、以索引方式存储数据

2、有一个length

**方法一、 声明一个空数组，通过遍历伪数组把它们重新添加到新的数组中**

```js
var aLi = document.querySelectorAll('li');
var arr = [];
for (var i = 0; i < aLi.length; i++) {
	arr[arr.length] = aLi[i]
}
```

**方法二、使用数组的slice()方法 它返回的是数组，使用call或者apply指向伪数组**

```js
var arr = Array.prototype.slice.call(arg);  // 方法一
var arr = [].slice.call(arg);   			// 方法二
```

**方法三、使用原型继承**

```js
oldarr.__proto__ = Array.prototype;
```

**方法四、ES6的数组新方法**

```js
Array.from({length:3}, function() { return 1}) // [1,1,1] 初始化并赋值 
```

### 8、清空数组的方法

**方式1：splice函数**

```js
var arr = [1,2,3,4];  
arr.splice(0);
```

**方式2：给数组的length赋值为0**

```js
var arr = [1,2,3,4];  
arr.length = 0;
```

赋予数组的长度小于本身的长度，数组中后面的元素将被截断。

赋予数组的长度大于本身的长度，将扩展数组长度，多的元素为undefined。

**方式3：直接赋予新数组 []**

```js
<script type ="text/javascript">  
　　var arr = [1,2,3,4];  
   arr = [];
</script> 
```

这种方式为将arr重新复制为空数组，之前的数组如果没有被引用，将等待垃圾回收。

### 9、数组去重的方法

[数组去重](https://csmsimona.github.io/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%B1%87%E6%80%BB/%E6%89%8B%E5%86%99js.html#%E2%88%9A9%E3%80%81%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D)

**1、利用ES6 Set去重（ES6中最常用）**

```js
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

不考虑兼容性，这种去重的方法代码最少。这种方法无法去掉“{}”空对象。

**2、利用for嵌套for，然后splice去重（ES5中最常用）**

```js
function unique(arr){            
    for(var i=0; i<arr.length; i++){
        for(var j=i+1; j<arr.length; j++){
            if(arr[i]==arr[j]){         
                arr.splice(j,1);
                j--;
            }
        }
    }
	return arr;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
    //[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]     
    //NaN和{}没有去重，两个null直接消失了
```

**3、for...of + includes()**

双重for循环的升级版，外层用 for...of 语句替换 for 循环，把内层循环改为 includes()

先创建一个空数组，当 includes() 返回 false 的时候，就将该元素 push 到空数组中 

类似的，还可以用 indexOf() 来替代 includes()

```js
function unique(arr) {
    var result = []
    for (var i of arr) {
        if (!result.includes(i)) {
            result.push(i)
        }
    }
    return result
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
   // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]      //NaN、{}没有去重
```

**4、利用indexOf去重**

```js
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i]);
        }
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
   // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]      //NaN、{}没有去重
```

**5、利用hasOwnProperty**

```js
function unique(array) {
    var obj = {};
    var unique = [];
    for(var i = 0; i < array.length; i++) {
        if(!obj.hasOwnProperty([array[i]])) {
            obj[array[i]] = 1;
            unique.push(array[i]);
        }
    }
    return unique;
}

    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}]   //所有的都去重了
```

**6、利用filter**

```js
function unique(arr) {
  return arr.filter(function(item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
        console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
```

**7、利用Map数据结构去重**

```js
function arrayNonRepeatfy(arr) {
  let map = new Map();
  let array = new Array();  // 数组用于返回结果
  for (let i = 0; i < arr.length; i++) {
    if(map.has(arr[i])) {  // 如果有该key值
      map.set(arr[i], true); 
    } else { 
      map.set(arr[i], false);   // 如果没有该key值
      array.push(arr[i]);
    }
  } 
  return array;
}
 var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
 console.log(arrayNonRepeatfy(arr))
//[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
// {}没去
```

创建一个空Map数据结构，遍历需要去重的数组，把数组的每一个元素作为key存到Map中。由于Map中不会出现相同的key值，所以最终得到的就是去重后的结果。

**8、利用reduce+includes**

```js
function unique(arr){
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
```

**9、for...of + Object**

首先创建一个空对象，然后用 for 循环遍历

利用对象的属性不会重复这一特性，校验数组元素是否重复

```js
function unique(arr){
    let result = []
    let obj = {}
    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }
    return result
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr));
// [1, "true", 15, false, undefined, null, NaN, 0, "a", {…}]
```

### 10、数组拍平

[数组扁平化](https://csmsimona.github.io/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%B1%87%E6%80%BB/%E6%89%8B%E5%86%99js.html#%E2%88%9A10%E3%80%81%E6%95%B0%E7%BB%84%E6%89%81%E5%B9%B3%E5%8C%96)

**1、递归**

```js
function flatArr(arr) {
	var newArr = [];
	arr.forEach((val) => {
		if (Array.isArray(val)) {
			newArr = newArr.concat(flatArr(val))
		} else {
			newArr.push(val)
		}
	})
	return newArr;
}
```

**2、reduce**

语法：`array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`

- total：必需。初始值或计算结束之后的返回值
- currentValue：必需。当前元素
- currentIndex：可选。当前元素的索引
- arr：可选。当前元素所属的数组对象
- initialValue：可选。传递给函数的初始值

```js
function flatArr(arr) {
   return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flatArr(cur) : cur), [])
}
```

**3.利用数组join()或toString()方法**

```js
// join()
function flatArr(arr) {
	return JSON.parse(`[${arr.join()}]`)
}
// toString()
function flatArr(arr) {
	return JSON.parse(`[${arr.toString()}]`)
}
```

**4.es6数组的flat()方法 (浏览器版本过低不支持)**

flat方法默认打平一层嵌套，也可以接受一个参数表示打平的层数，传 Infinity 可以打平任意层。

```js
function flatArr(arr) {
  	return arr.flat(Infinity);
}
```

### 11、随机打乱数组

```js
function randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
var arr = [1, 2, 3, 4, 5];
arr.sort(randomsort);

// es6 写法
arr.sort(() => Math.random() - 0.5);
```

### 12、根据数组中对象的某一个属性值进行排序

```js
var arr = [
    {name:'zopp',age:0},
    {name:'gpp',age:18},
    {name:'yjj',age:8}
];

// 方法一
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
console.log(arr.sort(compare('age')));

// 方法二
console.log(arr.sort((a,b) => a.age - b.age));
```



## Object

### :star:1、深拷贝和浅拷贝

[深浅拷贝](https://csmsimona.github.io/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%B1%87%E6%80%BB/%E6%89%8B%E5%86%99js.html#%E2%88%9A12%E3%80%81%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D)

**区别**

1.浅拷贝： 将原对象或原数组的**引用**直接赋给新对象，新数组，新对象／数组只是原对象的一个引用

2.深拷贝： 创建一个新的对象和数组，将原对象的各项属性的“**值**”（数组的所有元素）拷贝过来，是“值”而不是“引用”

**为什么要使用深拷贝？**

我们希望在改变新的数组（对象）的时候，不改变原数组（对象）

**深拷贝数组**

1.直接遍历

```js
function copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
     res.push(arr[i])
    }
    return res
}
var arr = [1,2,3,4,5]
var arr2 = copyArr(arr)
```

2.slice()

```js
var arr = [1,2,3,4,5]
var arr2 = arr.slice()
```

3.concat()

```js
var arr = [1,2,3,4,5]
var arr2 = arr.concat()
```

4.扩展运算符...

```js
var arr = [1,2,3,4,5]
var arr2 = [...arr]
```



**深拷贝对象**

迭代递归法

这是最常规的方法，思想很简单：就是对对象进行迭代操作，对它的每个值进行递归深拷贝。

```js
function deepClone(obj){
    var newObj= obj instanceof Array ? []:{};
    for(var item in obj){
        var temple= typeof obj[item] == 'object' ? deepClone(obj[item]):obj[item];
        newObj[item] = temple;
    }
    return newObj;
}
```

```js
function deepClone(obj, newObj) {
  for (var key in obj) {
    var val = obj[key];
    if (val instanceof Object) {   
      var tempObj = new val.constructor;
      deepClone(val, tempObj);
      newObj[key] = tempObj;
    } else {
      newObj[key] = val;
    }
  }
}
```

“一招鲜，吃遍天” ——序列化反序列化法** 

**JSON.parse(JSON.stringify(XXXX))**

```js
var array = [
    { number: 1 },
    { number: 2 },
    { number: 3 }
];
var copyArray = JSON.parse(JSON.stringify(array))
copyArray[0].number = 100;
console.log(array); //  [{number: 1}, { number: 2 }, { number: 3 }]
console.log(copyArray); // [{number: 100}, { number: 2 }, { number: 3 }]
```

它也只能深拷贝对象和数组，对于其他种类的对象，会失真。这种方法比较适合平常开发中使用，因为通常不需要考虑对象和数组之外的类型。

缺点：

- 会忽略undefined
- 不能序列化函数
- 不能解决循环引用的对象

在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题，并且该函数是内置函数中处理深拷贝性能最快的。当然如果你的数据中含有以上三种情况下，可以使用lodash的深拷贝函数。

### 2、Object.assign()

语法：`Obejct.assign(target,...sources)`

用途：将来自一个或多个源对象中的值复制到一个目标对象，它将返回目标对象。

其中对象的继承属性和不可枚举属性是不能拷贝的，所以不能使用它来实现深拷贝。

assign这个方法会把原型上面的内容也拷贝了。

```javascript
let obj = { name:"goudan"}
let obj2 = { name:"xiaofei",age:12}
obj2.__proto__.sex = "man"
console.log(Object.assign(obj,obj2));//在obj的__proto__对象上面也会有sex属性
```

第一级属性深拷贝，从第二级属性开始就是浅拷贝。

如果多个源对象具有同名属性，则排位靠后的源对象会覆盖排位靠前的。但null或undefined被视为空对象一样对待，不会覆盖。

```js
var receiver = {};
Object.assign(receiver, 
    {
    	type: "js", 
    	name:"file.js"
	},
    {
    	type: "css"
	}
)
console.log(receiver); // {type: "css", name: "file.js"}
```



```js
//实现 deepAssign({a: {b: 1, c: 2}}, {a: {c: 3}});
//=> {a: {b: 1, c: 3}}

// 只有两个对象
function deepAssign(obj1, obj2){
    for(var item in obj2){
        obj1[item] = typeof obj2[item] === 'object' ? deepAssign(obj1[item], obj2[item]) : obj2[item];
    }
    return obj1;
}

// 通用
function deepAssign() {
  var args = Array.from(arguments);
  return args.reduce(deepClone, args[0]);

  function deepClone(target, obj){
    if(!target) target = Array.isArray(obj) ? [] : {};
      for(key in obj){
        target[key] = typeof obj[key] ==="object" ? deepClone(target[key], obj[key]) : obj[key]
      }
    return target;
  }
}
```



## RexgExp等

### 1、正则表达式

[正则表达式入门](https://csmsimona.github.io/%E5%85%B6%E4%BB%96/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%85%A5%E9%97%A8.html)

#### 元字符

| 元字符 |                             作用                             |
| :----: | :----------------------------------------------------------: |
|   .    |                匹配任意字符除了换行符和回车。                |
|   []   |  匹配方括号内的任意字符。比如[0-9]就可以用来匹配任意数字。   |
|   ^    | ^9，这样使用代表匹配以9开头。[ ^9 ]，这样使用代表不匹配方括号内除了9的字符。 |
|   $    | 匹配输入字符串的结尾位置。如果设置了 RegExp 对象的 Multiline 属性，则 $ 也匹配 '\n' 或 '\r'。 |
| {n,m}  | 匹配n~m位字符。如 /b{n,m}/g，就是最少出现n次b，最多出现m次b。 |
| (abc)  |                  只匹配和abc相同的字符串。                   |
|   \|   |                     匹配\|前后任意字符。                     |
|   \    |                            转义。                            |
|   *    | 匹配0~n位字符。如 /b*/g，就是可以不出现b，也可以出现一次或多次。 |
|   +    |         匹配1~n位字符。如 /b+/g，就是至少出现一次b。         |
|   ?    | ？之前字符可选，0或1位。如 /colou?r/g，就是可以匹配color或colour。 |

#### 修饰语

| 修饰语 |    作用    |
| :----: | :--------: |
|   i    | 忽略大小写 |
|   g    |  全局搜索  |
|   m    |    多行    |

#### 字符简写

| 简写 |               作用               |
| :--: | :------------------------------: |
|  \w  |       匹配字母数字或下划线       |
|  \W  |            和上面相反            |
|  \s  |         匹配任意的空白符         |
|  \S  |            和上面相反            |
|  \d  |             匹配数字             |
|  \D  |            和上面相反            |
|  \b  | 匹配单词边界（单词的开始和结束） |
|  \B  |            和上面相反            |

#### 检索规则

1.test()方法用来检测一个字符串是否匹配某个正则表达式，如果匹配成功，返回true，否则返回false

2.exec()方法用来检索字符串中与正则表达式匹配的值。exec()方法返回一个数组，其中存放匹配的结果。如果未找到匹配的值，则返回null

3.compile()方法可以在脚本执行过程中编译正则表达式，也可以改变已有表达式

#### 创建方式

1、字面量语法：/pattern/ attributes

2、创建RegExp对象的语法：new RegExp(pattern, attributes)

attributes：g:全局匹配	i:大小写匹配	m:多行匹配

例一：删除一个字符串中所有的英文

`doc = doc.replace(/[A-Za-z]+/g, '');`

例二：验证一个字符串是否是电话号码

`/^[1][358][0-9]{9}$/`

例三：将原字符串中的所有空白字符替换成""

`replace(/\s/g,"")`

"/ /"这个是固定写法，"\s"是转移符号用以匹配任何空白字符，包括空格、制表符、换页符等等，"g"表示全局匹配将替换所有匹配的子串，如果不加"g"当匹配到第一个后就结束了。



## Function

### 1、形参和arguments

该参数是一个类似于数组的结构（可以像数组一样遍历，还可以使用下标来访问数据），但是并不是数组。

1、函数调用的时候，会把实参的值赋给形参，而且会使用arguments来接收实参

2、如果实参的个数超过形参的个数，那么可以通过arguments来获取超出的数据

3、如果实参的个数小于形参的个数，那么不足的全部设置为undefined

两者之间是关联的关系

函数名.length => 形参的长度（个数）

### 2、在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递给函数的每一个参数  

```js
function doadd() {
    if (arguments.length == 1) {
        alert(arguments[0] + 10);
    } else if (arguments.length == 2) {
        alert(arguments[0] + arguments[1]);
    }
}
doAdd(10) // 20
doAdd(30, 20) // 50
```

### 3、立即执行函数

声明一个函数，并马上调用这个匿名函数就叫做立即执行函数；也可以说立即执行函数是一种语法，让你的函数在定义以后立即执行。

立即执行函数的作用：

1. 不必为函数命名，避免了污染全局变量

2. 立即执行函数内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量

   例子：

```js
var foo = 1;
(function foo() {
     foo = 10; 
     console.log(foo);
}())
// ƒ foo() { foo = 10; console.log(foo) }
```

​	因为当js解释器在遇到非匿名的立即执行函数时，会创建一个辅助的特定对象，然后将函数名称作为这个对象的属性，因此函数内部才可以访问到foo，所以打印的还是这个函数，并且外部的值也没有发生更改。



## :star:作用域

### 1、变量提升

**变量定义**

```js
console.log(a); // undefined
var a = 100;

实际 => 变量定义提升（PS：变量声明的提升仅仅是声明提升了，赋值并不会提升）
var a;
console.log(a)
a = 100;
```

**函数声明**

```js
fn('zhangsan');  // zhangsan 20
function fn(name) {
    age = 20;
    console.log(name, age);
    var age;
}
```

注意：函数声明和函数表达式的区别

函数声明：  `function fn() {}`  fn()不会报错，函数声明能提前。

函数表达式：`var fn1 = function() {}`  fn1()报错，这时只有变量声明提前。

另外：函数声明的提升在变量声明的提升之上的

### 2、this

另外，可以看看这篇文章：https://www.cnblogs.com/pengshengguang/p/11105323.html

**this对象是在运行时基于函数的执行环境绑定的:** 

- 在全局函数中，**this--->window**

- 在函数中

  1、作为对象的方法来调用  **this--->当前的对象**

  ```js
  var obj = {
      name: 'A',
      printName: function() {
          console.log(this.name)
          console.log(this) // this -> obj这个被新创建出来的对象
      }
  }
  obj.printName()
  ```

  2、作为普通的函数调用 **this--->window**

  （1.2可总结为 看函数名前面是否有“.” ，有的话， “.”前面是谁，this就是谁；没有的话this就是window ）

  ```js
  function fn() {
      console.log(this) // this -> window
  }
  fn()
  ```

  3、作为构造函数和new使用 **this--->构造函数内部新创建的对象**

  ```js
  function Foo(name) {
      this.name = name
      console.log(this)  // this -> f 这个被新创建出来的对象
  }
  var f = new Foo('zhangsan')
  ```

  4、被call，apply或bind调用（函数上下文调用） **this--->第一个参数**

  ```js
  function fn1(name, age) {
      console.log(name)
      console.log(this) // {x: 100}
  }
  fn1.call({x: 100}, 'zhangsan', 20)
  ```

  ```js
  function fn2(name, age) {
      console.log(name)
      console.log(this) // {y: 200}
  }
  fn2.bind({y: 200}, 'zhangsan', 20)()
  ```

  5、立即执行函数中的**this永远都是window** 

  ```js
  (function() {
      console.log(this); // this->window
  })()
  ```

  6、箭头函数**不绑定this，会捕获其所在的上下文的this值**，作为自己的this值。

  箭头函数本身没有this，箭头函数中的this是在它声明时捕获它所处作用域中的this。

  特别说明：this一旦被捕获，以后将不再变化。

  ```js
  var a = 'aaa'
  let func = () => {
      console.log(this.a)
      console.log(this);  // this -> window
  }
  func();
  // 箭头函数在全局作用域声明，所以它捕获全局作用域中的this，this指向window对象。
  ```

  ```js
  var a = 'aaa';
  function wrap(){
    console.log(this)  // this -> owrap这个被新创建出来的对象
    this.a = 'bbb';
    let func = () => {
      console.log(this.webName);
      console.log(this);  // this -> owrap这个被新创建出来的对象
    }
    func();
  }
  let owrap = new wrap();
  // 函数作用域中的this指向创建的对象实例。箭头函数也随之被声明，此时捕获这个this，也指向创建的对象实例
  ```

  通过 call()  或 apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响

  ```js
  var a = 'aaa';
  let b = {a: 'bbb'}; 
  
  function fn1() { 
    console.log(this);   // {a: 'bbb'}
    console.log(this.a); // bbb
  } 
  fn1.call(b);
  
  let fn2 = () => { 
    console.log(this);   	// window
    console.log(this.a);  // aaa
  } 
  fn2.call(b);
  ```

### 3、apply，call与bind

共同点：

1、都是用来**改变函数的this对象的指向**的。
2、第一个参数都是this要指向的对象。
3、都可以利用后续参数传参。

区别：

- apply：最多只能有两个参数——**新this对象和一个数组arrArray**。**立即调用**

  `xw.say.apply(xh, [1,2,3,4]);`

- call：它可以接受多个参数，**第一个参数与apply一样**，后面则是**一串参数列表**。**立即调用**

  `xw.say.call(xh, 1, 2, 3, 4);`

- bind：bind() 方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind() 方法的**第一个参数 作为 this**，传入 bind() 方法的**第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数**来调用原函数。bind改变this作用域会返回一个新的函数，这个函数**不会马上执行**。

  `xw.say.bind(xh, 1, 2, 3, 4)();` 或 `xw.say.bind(xh)(1, 2, 3, 4);`
  
  ```js
  Function.prototype.bind = function(context, ...args) {
      var fn = this;
      return function(...rest) {
          // 改变this指向给context
          return fn.apply(context, [...args, ...rest]);
      }
  }
  
  function func(...arg){
      console.log(this);		// {a: 1}
      console.log(arg);		// [1, 2, 3, 4, 5, 6, 7, 8]
  }
  let newFunc = func.bind({a: 1}, 1, 2, 3, 4);
  newFunc(5, 6, 7, 8);	// args:[1, 2, 3, 4]  rest:[5, 6, 7, 8]
  ```
  
  

### 4、作用域

作用域是指对某一变量和方法具有访问权限的代码空间。

- 全局作用域：在函数或代码块{}外定义的变量拥有全局作用域，即对任何内部函数来说，都是可以访问的。

  注意：在函数内部或代码块中没有定义的变量实际上是作为window/global的属性存在，而不是全局变量。换句话说没有使用var定义的变量虽然有用全局作用域，但是它是可以被delete，而全局变量不可以。

- 块级作用域：存在于函数内部或块中（字符{和}之间的区域）

### 5、作用域链

```js
var a = 100
function F1() {
    var b = 200
    function F2() {
        var c = 300
        console.log(a)	// a是自由变量，向父级作用域寻找a，未果，再向上一级父级作用域寻找a
        console.log(b)	// b是自由变量，向父级作用域寻找b
        console.log(c)
    }
    F2()
}
F1()               // 自由变量不断地往父级作用域去找，形成一个链式结构
```

改变作用域链的方法

with、try...catch、eval

例题：

```js
var a = 100
function F1() {
    var a = 200
    F2()
}
function F2() {
    console.log(a)
}
F1()             // 100
```

```js
var a = 100
function F1() {
    var a = 200
    function F2() {
        console.log(a)
    }
    F2()
}
F1()             // 200
```



## :star:闭包

### 1、闭包以及实际应用

**闭包就是能够读取其他函数内部变量的函数。**只有函数内部的子函数才能读取局部变量，所以闭包可以理解成“定义在一个函数内部的函数“。在本质上，闭包是将函数内部和函数外部连接起来的桥梁。

简单来说：闭包是在 A 函数里面返回的 B 函数，然后 B 函数里面一直引用着 A 函数的局部变量。

**闭包的用途**：

1、读取函数内部的变量，并且让这些变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)。

2、让函数外部可以操作(读写)函数内部的数据(变量/函数)

3、封装变量，收敛权限

**缺点：**

1、容易形成循环引用，比普通函数占用更多的内存。

2、闭包会导致原始作用域链不释放,造成内存泄漏。

3、参数和变量不会被垃圾回收机制回收。

**解决方法：**

- 把造成循环引用的变量设为null
- 不用的变量及时释放

```js
    function fn1() {
        var arr = new Array[99999999999999999];
        function fn2() {
            console.log(arr);
        }
        return fn2;
    }

    var f = fn1();
    f();

    f = null;
```

**闭包的实际应用**

**1.通过闭包可以让内层函数延迟执行，只有需要时再执行它**

```js
function highLevelFunct2() {
    var arr = ['a', 'b', 'c'];
    var size = function () {
        alert(arr.length);
    };
    return size;
}


function testClosure() {
    var f = highLevelFunct2();
    f();
}
```

**2.通过闭包，内层函数可以将外层函数的局部变量进行封装，封闭后就只有内层函数才能访问到外层函数的局部变量。**

```js
//  计数器
function myCounter() {
    var counter = 0;
    return function add () {
        return counter += 1;
    }
}

function testClosure() {
    var increase = myCounter();
    increase();	// 1
    increase(); // 2
    increase(); // 3
}
```

**3.定义JS模块**

- 将所有的数据和功能都封装在一个函数内部(私有的)
- 只向外暴露一个包含多个方法的对象或函数
- 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能

```js
// MyTool.js
function myTool() {
    // 1. 私有的数据
    var money = 1000;
    // 2. 提供操作私有数据的函数
    function get() {
        money *= 10;
        console.log('赚了一笔钱, 总资产:' + money + '元');
    }

    function send() {
        money --;
        console.log('花了一笔钱, 总资产:' + money + '元');
    }

    return {
        'get': get,
        'send': send
    }
}

<script type="text/javascript" src="js/MyTool.js"></script>
<script type="text/javascript">
   var toolObj = myTool();
   toolObj.get();
   toolObj.send();
</script>
```

```js
// MyTool1.js
(function (w) {
    // 1. 私有的数据
    var money = 1000;
    // 2. 提供操作私有数据的函数
    function get() {
        money *= 10;
        console.log('赚了一笔钱, 总资产:' + money + '元');
    }

    function send() {
        money --;
        console.log('花了一笔钱, 总资产:' + money + '元');
    }

    // 向外部暴露对象
    w.myTool = {
        'get': get,
        'send': send
    }

})(window);

<script src="js/MyTool1.js"></script>
<script>
    (function () {
        console.log(window.myTool, myTool);
        myTool.get();
        myTool.send();

        var str = 'zhangsan';
        console.log(str);
        console.log(window.str);
    })();
</script>
```

**4.实现防抖函数**

```js
   function debounce(fn, delay) {
        var timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(fn, delay);
        }
    }
   debounce(function () {
       console.log('大家好!!!');
   }, 200)();
```

## 内存泄漏

### 1、代码回收规则

1.全局变量不会被回收

2.局部变量会被回收，也就是函数一旦运行完以后，函数内部的东西都会被销毁

3.只要被另外一个作用域所引用就不会被回收（闭包）

### 2、内存溢出和内存泄漏

#### 内存溢出

  一种程序运行出现的错误

  当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误

```js
var arrObj = {};
for(var i=0; i<100000000; i++){
	arrObj[i] = new Array(999999);
	console.log(arrObj);
}
```

#### 内存泄漏

内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。

- 占用的内存没有及时释放

- 内存泄漏积累多了就容易导致内存溢出

  常见的内存泄漏:

1. 占用内存很大的全局变量
2. 没有及时清理的计时器/定时器
3. 闭包

```js
    // 占用内存很大的全局变量
    var num = new Array(99999999);
    var num1 = new Array(99999999);
    var num2 = new Array(99999999);
    var num3 = new Array(99999999);
    var num4 = new Array(99999999);
    var num5 = new Array(99999999);
    var num6 = new Array(99999999);
    var num7 = new Array(99999999);

    num = null;


   // 没有及时清理的计时器/定时器
    var intervalId = setInterval(function () {
        console.log("-----");
    }, 1000);

    clearInterval(intervalId);

   // 闭包
    function fn1() {
        var num  = 1111;
        function fn2() {
            num--;
            console.log(num);
        }

        return fn2;
    }

    var f = fn1();
    f();

    f = null;
```

### 3、V8下的垃圾回收机制

转载自https://yuchengkai.cn/docs/frontend

V8将内存（堆）分为新生代和老生代两部分

#### 新生代算法

新生代中的对象一般存活时间较短，使用Scavenge GC算法。

在新生代空间中，内存空间分为两部分，分别为From空间和To空间。在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的。新分配的对象就会被放入From空间中，当From空间被占满时，新生代GC就会启动了。算法会检查From空间中存活的对象并复制到To空间中，如果有失活的对象就会销毁。当复制完成后将From空间和To空间互换，这样GC就结束了。

#### 老生代算法

老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是标记清除算法和标记压缩算法。

什么情况下对象会出现在老生代空间中：

- 新生代的对象是否已经经历过一次Scavenge算法，如果经历过的话，会将对象从新生代空间移到老生代空间中
- To空间的对象占比大小超过25%。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中

老生代中的空间很复杂。

在老生代中，以下情况会先启动标记清除算法：

- 某一个空间没有分块的时候
- 空间中被对象超过一定限制
- 空间不能保证新生代中的对象移动到老生代中

清除对象后会造成堆内存出现碎片的情况，当碎片超过一定限制后会启动压缩算法。在压缩过程中，将活的对象向一端移动，直到所有对象都移动完成然后清理掉不需要的内存。

## 对象

### 1、创建对象的方式

1、字面量的方式创建对象

```js
var p1 = {
    name: '张三',
    run: function() {
        console.log(this.name + '跑')
    }
}
```

2、内置构造函数的方法

```js
var p1 = new Object()
p1.name = '张三'
p1.run = function() {
    console.log(this.name + '跑')
}
```

问题：使用内置构造函数的方式和字面量的方式来创建对象差不多但都存在以下问题

​	1）创建的对象无法复用，复用性差

​	2）如果需要创建多个同类型的对象，需要书写大量重复的代码，代码冗余度高

3、简单工厂函数方式

问题：无法判定类型

```js
class Product {
    constructor(name) {
        this.name = name
    }
    init() {
        alert('init')
    }
}
class Creator {
    ctreate(name) {
        return new Product(name)
    }
}
let creator = new Creator()
let p = creator.create('p1')
p.init()
```

**4、自定义构造函数的方式来创建对象**

- 自定义构造函数和工厂函数的对比

  1、函数的首字母大写（用于区别构造函数和普通函数）

  2、创建对象的过程是由new关键字实现的

  3、在构造函数内部会自动的创建新对象，并赋给this指针

  4、自动返回创建出来的对象

  - **构造函数的执行过程**

    ```js
    function Person(name, age, sex) {
        // 1、自动创建一个空对象，把这个对象的地址 this => 新对象
        // var this = new Object()
        // 2、this给空对象绑定属性和行为
        this.name = name
        this.age = age
        this.sex = sex
        // 3、返回this
        // return this
    }
    var p = new Person()
    ```

  - **构造函数的返回值说明**

    1、如果在构造函数中没有显示的return，则默认返回的是新创建出来的对象

    2、如果在构造函数中显示的return对象，则依照具体的情况处理

    ​	1>return的是对象，则直接返回这个对象，取而代之本该默认返回的新对象

    ​	2>return的是null或基本数据类型值，则返回新创建的对象

### 2、new一个对象的过程

```js
   function Person (name, age, job) {  
        this.name = name;  
        this.age = age;  
        this.job = job;  
        this.sayName = function () {  
            return this.name;  
        }
  }  
  var person = new Person("tom", 21, "WEB");  
  console.log(person.name)
```

1、创建一个新对象，如：var person = {};

2、新对象的_ proto _属性指向构造函数的原型对象。

3、将构造函数的作用域赋值给新对象。（this对象指向新对象）

4、执行构造函数内部的代码，将属性和方法添加给person中的this对象。

5、返回新对象person。

```js
  var person = {};  
  person._proto_ = Person.prototype;//引用构造函数的原型对象  
  Person.call(person);//将构造函数的作用域给person,即：this值指向person  

  Function.methods("new", function () {  
     //新创建一个对象，它继承了构造器的原型对象。  
     var that = Object.create(this.prototype); //此时，this是指向Function构造器的。  
     //调用构造器，绑定this对象到新对象that上  
     var other = this.apply(that, argument); //此时，this对象指向that对象。  
     //如果它的返回值不是一个对象，就返回新的对象。  
     return (typeof other === "object" && other) || that;  
 });  
```

通过new关键字创建某构造函数的新实例对象，**就是将原型链与实例的this联系起来，this指向这个新对象，同时也指向这个构造函数**，并且this对象还是这个构造函数的实例。



对于new来说，还需要注意下运算符优先级。

```js
function Foo() {
    return this;
}
Foo.getName = function () {
    console.log('1');
};
Foo.prototype.getName = function () {
    console.log('2');
};

new Foo.getName(); // 1
new Foo().getName(); // 2

// new Foo()的优先级大于new Foo，所以对于上述代码来说可以这样划分执行顺序
new (Foo.getName());
(new Foo()).getName();
```



### 3、删除对象

delete 删除对象中的属性；删除没有使用var关键字声明的全局变量

注意：

1、返回值：布尔类型的值（通过该值判断是否删除成功）

2、使用var关键字声明的变量无法被删除

3、删除对象中不存在的属性没有任何变化，但是返回值为true

4、不能删除window下面的全局变量（使用var声明）但可以删除定义在window上面的属性

### 4、in、hasOwnProperty、isPrototypeOf、Object.getPrototypeOf()

#### 1、in

**判断一个对象是否拥有这个属性。如果对象上没有，就去它的原型对象里面找**

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.address = '杭州';
var p = new Person('csm', 21);
console.log('name' in p);			// true  注意：这里name要加引号表示字符串，不然就是全局变量了
console.log('address' in p);		// true
```

#### 2、hasOwnProperty

**判断当前对象是否拥有这个属性，只到对象自身查找，不查找原型上的属性**

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.address = '杭州';
var p = new Person('csm', 21);
console.log(p.hasOwnProperty('name'));		// true
console.log(p.hasOwnProperty('address'));		// false
```

#### 3、isPrototypeOf

**判断一个对象是否是某个实例的原型对象**

```js
function Dog(name, age) {
    this.name = name;
    this.age = age;
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
var p = new Person('csm', 21);
// 判断p的原型指针是否指向传入构造函数的原型对象，这个过程会往上层层判断。
console.log(Person.prototype.isPrototypeOf(p));		// true
console.log(Object.prototype.isPrototypeOf(p));     // true
console.log(Dog.prototype.isPrototypeOf(p));		// false
```

### 5、toString方法、valueOf方法、Symbol.toPrimitive方法

每个对象都有一个toString()方法和valueOf方法

其中**toString()方法返回一个表示该对象的字符串，valueOf方法返回该对象的原始值**。

对于**一个对象，toString()返回"[object type]"，其中type是对象类型**。

如果不是对象，toString()返回应有的文本值。

**toString()方法和String()方法的区别**

toString()方法和String()方法都可以转换为字符串类型。 

1、toString()可以将所有的数据都转换为字符串，除了**null和undefined**。

null和undefined调用toString()方法会报错。

如果当前数据为数字类型，则toString()括号中的可以写一个数字，代表进制，可以将数字转化为对应进制字符串。

2、String()可以将null和undefined转换为字符串，但是**没法转进制字符串**。

**Symbol.toPrimitive**

JavaScript 对象转换到基本类型值时，会使用 ToPrimitive 算法，这是一个内部算法，是编程语言在内部执行时遵循的一套规则。

```js
// 没有 Symbol.toPrimitive 属性的对象
var obj1 = {};
console.log(+obj1);       //NaN
console.log(`${obj1}`);   //"[object Object]"
console.log(obj1 + "");   //"[object Object]"
```

上面的结果我们可以通过上面说的toString()方法和value方法去理解。 
第一个，+符号。可以看成是是把数据转化为数字类型，由于obj是个空对象，所以结果是NaN 
第二个，是es6中的字符串的新语法，这里需要的结果是一个字符串，所以使用的是toString()方法，而toString()方法返回的是对象的类型。 
第三个，这里是连接符连接obj。实际上也是需要字符串的结果，所以同理。

```js
// 拥有 Symbol.toPrimitive 属性的对象
var obj2 = {
  [Symbol.toPrimitive](hint) {
    if(hint == "number"){
        return 10;
    }
    if(hint == "string"){
        return "hello";
    }
    return true;
  }
}

console.log(+obj2);     //10    --hint in "number"
console.log(`${obj2}`); //hello --hint is "string"
console.log(obj2 + ""); //"true"
```



对象在转换基本类型时，首先会调用valueOf然后调用toString。并且这两个方法你是可以重写的。

```js
let a = {
    valueOf() {
        return 0;
    }
}
```

当然你也可以重写Symbol.toPrimitive，该方法在转基本类型时调用优先级最高。

```js
let a = {
    valueOf() {
        return 0;
    },
    toString() {
        return '1';
    },
    [Symbol.toPrimitive]() {
        return 2;
    }
}
1 + a // 3
'1' + a // '12'
```

### 6、对象中属性的遍历

转自[ES6核心，教你 玩转 ES6新特性](http://www.imooc.com/article/67156)

在ES6中共有5种方法实现对对象属性的遍历

这五种遍历方法都遵循同样的遍历次序规则：

首先遍历所有数值键，按照数值升序排列。

其次遍历所有字符串键，按照加入时间升序排列。

最后遍历所有 Symbol 键，按照加入时间升序排列。

```js
var obj = {name:"feng",age:12}
obj.__proto__.sex="nan"
obj[Symbol()]="bol";
```

#### (1).for...in

> for...in 是用来遍历自身属性，和继承的可以枚举的属性。

```js
for(var key in obj){
    console.log(key);//name,age,sex
}

// 此时只输出自身属性
for(var key in obj){
    if (obj.hasOwnProperty(key)) {
        console.log(key);//name,age
    }
}
```

#### (2).Reflect.ownKeys(obj)

> Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

```js
console.log(Reflect.ownKeys(obj));//[ 'name', 'age', Symbol() ]
```

#### (3).Object.keys(obj)

> Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
>
> ```js
> console.log(Object.keys(obj));//[ 'name', 'age' ]
> ```

#### (4).Object.getOwnPropertyNames(obj)

> Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
>
> ```js
> console.log(Object.getOwnPropertyNames(obj));//[ 'name', 'age' ]
> ```

#### (5).Object.getOwnPropertySymbols(obj)

> Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

```js
console.log(Object.getOwnPropertySymbols(obj));//[ Symbol() ]
```



## 原型

### 1、5个原型规则

- 所有的引用类型（数组，对象，函数），都具有对象特性，即可自由扩展属性（除了null以外）

- 所有的引用类型（数组，对象，函数），都有一个_ proto _(隐式原型)属性，属性值是一个普通对象

- 所有的函数，都有一个prototype(显式原型)属性，属性值也是一个普通对象

- 所有的引用类型（数组，对象，函数）,_ proto _属性值指向他的构造函数的prototype属性

- 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的_ proto _（即它的构造函数的prototype）里面找

  例：

  ```js
  // 构造函数
  function Foo(name) {
      this.name = name
  }
  Foo.prototype.alertName = function() {
      alert(this.name)
  }
  // 创建示例
  var f = new Foo('zhangsan')
  f.printName = function () {
      console.log(this.name)
  }
  // 测试
  f.printName()
  f.alertName()
  ```

  原型链

  示例中 `f.alertName()`就需要到`f._proto_`中也就是`Foo.prototype`（Foo的原型对象）中查找

  `f.toString()`就要去`f._proto_._proto_`中查找

  ![](..\picture\原型链.png)

### :star:2、原型链

1. 每个构造函数都能构建出一个对象, 这个对象内部有个属性指向着这个函数的原型对象

2. 原型对象本质也是一个对象,也是由另外一个构造函数构造出来, 也指向那个构造函数的原型对象，形成一个链式的结构，就称为是原型链

   数组的完整原型链图

   ```js
   var arr = [1, 2, 3];
   
   console.log(arr.constructor.name); 								// Array
   
   console.log(arr.__proto__.constructor.name); 					// Array
   
   console.log(Array.__proto__.constructor.name);					// Function
   
   console.log(Function.__proto__.constructor.name);				// Function
   
   console.log(Function.prototype.__proto__.constructor.name);		// Object
   
   console.log(Object.prototype.__proto__);						// null
   console.log(Object.__proto__.constructor.name);					// Function
   
   console.log(Array.prototype.__proto__.constructor.name);		// Object
   ```

   https://www.processon.com/diagraming/5d808df6e4b0c5c942c450b1

![](..\picture\数组的完整原型链图.png)

由图可得Function构造函数处于原型链顶端，所有对象的原型对象都由Object构造函数产生

### 3、一个原型链继承的应用实例

```js
// 写一个封装DOM查询的例子

function Elem(id){
    this.elem = document.getElementById(id);
}

Elem.prototype.html = function(val){
    var elem = this.elem;
    if(val){
        elem.innerHTML = val;
        return this;  // 链式操作
    } else{
        return elem.innerHTML;
    }
}
 
Elem.prototype.on = function(type,fn){
    var elem = this.elem;
    elem.addEventListener(type,fn);
    return this;
}
 
var div1 = new Elem('div');
div1.html('<p>hello imooc</p>').on('click', function(){
    alert('clicked');
}).html('<p>javascript</p>');
```



## 继承

### 1、JavaScript继承的六种方式

另外可以看看这两篇文章：

https://www.cnblogs.com/humin/p/4556820.html

https://www.cnblogs.com/Grace-zyy/p/8206002.html

继承就是让子类拥有父类的资源

**继承的意义**

​    减少代码冗余

​    方便统一操作

​    弊端

​      耦合性比较强

**继承方法**

```js
	// 父类    
	function Person() {
       this.name = 'cc';
       this.pets = ['aa', 'bb'];
    }

    Person.prototype.run = function () {
        console.log('跑');
    };
```

####     1. 原型链继承

核心：将父类的实例作为子类的原型 

```js
    // 子类        
    function Student() {
        this.num = '111';
    }
	// 让新实例的原型等于父类的实例
    Student.prototype = new Person();

    var stu = new Student();
    console.log(stu.num); // 111
    stu.run(); // 跑

	// 问题：类型问题
	console.log(stu.constructor.name); //Person  对象类型改变
```

优化：修复constructor指针

```js
    // 子类        
    function Student() {
       this.num = '111';
    }

    Student.prototype = new Person();
    // 修复constructor指针即可
    Student.prototype.constructor = Student;

    var stu = new Student();
    console.log(stu.num);   // 111
    stu.run(); 				// 跑
    console.log(stu.pets);  // ["aa", "bb"]
    console.log(stu.constructor.name);  // Student

	// 问题：继承过来的实例属性, 如果是引用类型, 会被多个子类的实例共享
	var stu1 = new Student();
    stu.pets.push('dd');
    console.log(stu.pets);		// ["aa", "bb", "dd"]
    console.log(stu1.pets);		// ["aa", "bb", "dd"]
```

####     2. 借用构造函数继承

 核心：在子类型构造函数的内部调用父类构造函数，通过使用call()和apply()方法可以在新创建的对象上执行构造函数。

```js
    // 子类        
    function Student() {
       Person.call(this);
       this.num = '111';
    }
	var stu = new Student();
    console.log(stu.name);   // 111

	// 问题：没用到原型，只能继承父类的实例属性和方法，不能继承原型属性/方法
    stu.run(); 				// 报错：stu.run is not a function
```

####     3. 组合继承

核心： 将原型链和借用构造函数的技术组合在一块，从而发挥两者之长的一种继承模式。(常用)

```js
    // 子类        
    function Student() {
       Person.call(this);
       this.num = '111';
    }

    Student.prototype = new Person();
    Student.prototype.constructor = Student;

    var stu = new Student();
    var stu1 = new Student();
    stu.pets.push('小花');
    console.log(stu.pets); 		// ["aa", "bb", "小花"]
    console.log(stu1.pets); 	// ["aa", "bb"]

	// 问题：调用了两次父类构造函数（耗内存）
```

####     4. 原型式继承

核心：借助原型,然后基于已有的对象, 创建出新对象；同时不需要创建自定义类型

用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了一个可以随意增添属性的实例或对象。object.create()就是这个原理。

```js
// 原型式继承
function content(obj) {
    function Temp() {}
    Temp.prototype = obj;
    return new Temp();
}
var p = new Person();
var stu1 = content(p);
console.log(stu1.name);
console.log(stu1.age);
```

####     5. 寄生式继承

核心：在原型式基础上增强这个对象。所谓增加, 就是指, 再次给这个对象增加一些属性或者方法

```js
    // 子类        
    function Student() {
       this.num = '111';
    }

    function Temp() {}
    Temp.prototype = new Person();
    Student.prototype = new Temp();
    Temp.constructor = Student;

    var stu = new Student();
    console.log(stu);
```

####     6. 寄生式组合继承

核心：通过借用函数来继承属性，通过原型链的混成形式来继承方法。（常用）

```js
    // 子类
	function Student(num, name, pets) {
        Person.call(this, name, pets);
        this.num = num;
    }

    function Temp() {}
    Temp.prototype = new Person();
    Student.prototype = new Temp();
    Temp.constructor = Student;

	var stu = new Student('001', '张三', ['小花']);
    var stu1 = new Student('002', '李四', ['小茂']);
    console.log(stu);
    console.log(stu1);
```



## :star:事件

### 1、事件捕获、事件冒泡、事件委托（代理）

**事件捕获**：事件从最不精确的对象(document对象)开始触发，然后到最精确

**事件冒泡**：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发

不是所有事件都能冒泡。以下事件不冒泡：blur、focus、load、unload（关闭页面）

**事件委托（代理）**：不在事件的发生地（直接dom）上设置监听函数，而是在其父元素上设置监听函数，通过事件冒泡，父元素可以监听到子元素上事件的触发，通过判断事件发生元素DOM的类型，来做出不同的响应。

举个例子：

有三个同事预计会在周一收到快递。为签收快递，有两种办法：一是三个人在公司门口等快递；二是委托给前台MM代为签收。现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台MM收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台MM也会在收到寄给新员工的快递后核实并代为签收。

这里其实还有2层意思的：

第一，现在委托前台的同事是可以代为签收的，即程序中的现有的dom节点是有事件的；

第二，新员工也是可以被前台MM代为签收的，即程序中新添加的dom节点也是有事件的。

**为什么要用事件委托：**

在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；如果要用事件委托，就会将所有的操作放到js程序里面，与dom的操作就只需要交互一次，这样就能**大大的减少与dom的交互次数，提高性能**；

**事件委托怎么实现：**

举例：最经典的就是ul和li标签的事件监听，比如我们在添加事件时候，采用事件委托机制，不会在li标签上直接添加，而是在ul父元素上添加。

```html
<ul>
    <li>知否知否，点我应有弹框在手！</li>
    <li>知否知否，点我应有弹框在手！</li>
    <li>知否知否，点我应有弹框在手！</li>
    <li>知否知否，点我应有弹框在手！</li>
    <li>知否知否，点我应有弹框在手！</li>
</ul>
<script>
    /*事件委托的核心原理：给父节点添加侦听器， 
        利用事件冒泡影响每一个子节点*/
    var ul = document.querySelector('ul');
    ul.addEventListener('click', function(e) {
        // e.target 这个可以得到我们点击的对象
        e.target.style.backgroundColor = 'pink';
    })
</script>
```



**事件委托原理：**事件冒泡，当触发子元素的事件时，通过冒泡，事件传递给父亲，父亲身上绑定有事件处理程序，进而触发

**好处：**比较合适动态元素的绑定，新添加的子元素也会有监听函数，也可以有事件触发机制。

```js
// 通用的事件绑定函数
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

### 2、事件触发三个阶段

- 事件捕获阶段：事件从最不精确的对象(document对象)开始触发，然后到最精确
- 处于目标阶段
- 事件冒泡阶段：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。不是所有事件都能冒泡。以下事件不冒泡：blur、focus、load、unload（关闭页面）

事件触发一般来说会按照上面的顺序进行，但是也有特例，如果给一个目标节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。

```js
// 以下会先打印冒泡然后是捕获
node.addEventListener('click', (event) => {
    console.log('冒泡');
}, false);
node.addEventListener('click', (event) => {
    console.log('捕获');
}, true);
```

通常我们使用addEventListener注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值useCapture参数来说，该参数默认值为false。useCapture决定了注册的事件是捕获事件（false）还是冒泡事件（true）。

一般来说，我们只希望事件只触发在目标上，这时候可以使用stopPropagation来阻止事件的进一步传播。通常我们认为stopPropagation是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。stopImmediatePropagation同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

### 3、事件对象

**DOM中的事件对象**：(符合W3C标准）

preventDefault()：取消事件默认行为

stoplmmediatePropagation()：取消事件冒泡同时阻止当前节点上的事件处理程序被调用。

stopPropagation()：取消事件冒泡对当前节点无影响。

**IE中的事件对象**：

returnValue()：取消事件默认行为

cancelBubble()：取消事件冒泡

### 4、mouseover和mouseenter两个事件的区别

mouseover(鼠标覆盖)：不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。

mouseenter(鼠标进入)：只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。

二者的本质区别在于,mouseenter不会冒泡,简单的说,它不会被它本身的子元素的状态影响到.但是mouseover就会被它的子元素影响到,在触发子元素的时候,mouseover会冒泡触发它的父元素.(想要阻止mouseover的冒泡事件就用mouseenter)



## JSON

### 1、JSON

- js的对象表示法（JS Object Notation）

- 存储和交换文本信息的语法，类似XML

- JSON比XML更小、更快、更易解析

- 数据格式简单, 易于读写, 占用带宽小

- ```js
  // 把对象变成字符串
  JSON.stringify({"a": 10, "b": 20});
  // 把字符串变成对象
  JSON.parse('{"a": 10, "b": 20}');
  ```



## Ajax

### 1、Ajax,jQuery ajax,axios和fetch的区别

#### Ajax：

Ajax 即“**A**synchronous **J**avascript **A**nd **X**ML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。

**Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。**

通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

  Ajax技术核心就是XMLHttpRequest对象。

（1）设置请求参数（请求方式，请求页面的相对路径，是否异步发送请求）

（2）设置回调函数，一个处理服务器响应的函数，使用 onreadystatechange ，类似函数指针

（3）获取异步对象的readyState 属性：该属性存有服务器响应的状态信息。每当 readyState 改变时，onreadystatechange 函数就会被执行。

（4）判断响应报文的状态，若为200说明服务器正常运行并返回响应数据。

（5）读取响应数据，可以通过 responseText 属性来取回由服务器返回的数据。

```js
var xhr = new XMLHttpRequest();    			// 创建Ajax对象
xhr.open('get', 'aabb.php', true);			// xhr发送请求
xhr.send(null);
xhr.onreadystatechange = function() { 		// xhr获取响应
    if(xhr.readyState == 4) {
        if(xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
}
 /* ajax返回的状态:
     0：（未初始化）请求还没有建立（open执行前） 
     1：（载入）请求建立了还没发送（执行了open） 
     2：（载入完成）请求正式发送,send()方法执行完成，已经接收到全部响应内容（执行了send） 
     3：（交互）请求已受理，有部分数据可以用，但还没有处理完成,正在解析响应内容
     4：（完成）响应内容解析完成，可以在客户端调用了 
*/ 
```

#### Jquery Ajax：

是jQuery框架中的发送后端请求技术，由于jQuery是基于原始的基础上做的封装，所以，jquery Ajax自然也是对原始ajax的封装

```js
$.ajax({
   type: 'POST',
   url: url,
   data: data,
   dataType: dataType,
   success: function () {},
   error: function () {}
});
```

​      优缺点：

- 本身是针对MVC的编程,不符合现在前端MVVM的浪潮
- 基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案
- JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务）

#### Fetch：

​	fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。

​	fetch不是ajax的进一步封装，而是原生js。Fetch函数就是原生js，没有使用XMLHttpRequest对象。

```js
try {
  let response = await fetch(url);
  let data = response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
```

```js
fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))
```


​	你还可以通过Request构造器函数创建一个新的请求对象，你还可以基于原有的对象创建一个新的对象。 新的请求和旧的并没有什么不同，但你可以通过稍微调整配置对象，将其用于不同的场景。例如：

```js
var req = new Request(URL, {method: 'GET', cache: 'reload'});
fetch(req).then(function(response) {
  return response.json();
}).then(function(json) {
  insertPhotos(json);
});
```

##### fetch的配置

`Promise fetch(String url [, Object options]);`
`Promise fetch(Request req [, Object options]);`



fetch是一个低层次的API，你可以把它考虑成原生的XHR，所以使用起来并不是那么舒服，需要进行封装

- fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。

- fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})

- fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费

- fetch没有办法原生监测请求的进度，而XHR可以





#### Axios：

​	 axios不是原生JS的，需要进行安装，它不但可以在客户端使用，而且可以在nodejs端使用。Axios也可以在请求和响应阶段进行拦截。同样也是基于promise对象的。

https://blog.csdn.net/Roselane_Begger/article/details/88936818

```js
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});

```

优缺点：

- 从 node.js 创建 http 请求
- 支持 Promise API
- 客户端支持防止CSRF
- **提供了一些并发请求的接口**（重要，方便了很多的操作）

### 2、fetch发送post请求时，总是发送两次，第一次状态码204，第二次才成功

因为你用的fetch post修改了请求头,导致fetch第一次发送一个options请求，询问服务器是否支持修改的请求头，如过服务器支持，那么将会再次发送真正的请求。

## 跨域:star:

### 1、跨域

**什么是跨域**

**跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制。**

**浏览器的同源策略**是指 协议、域名、端口相同，也就是说 协议、域名、端口有一个不同就算跨域。

PS：http默认端口：80，https默认端口：443

**同源策略限制了以下行为**：

- Cookie、LocalStorage 和 IndexDB 无法读取

- DOM 和 JS 对象无法获取

可以跨域的三个标签：

- `<img src="xxx.png">`

- `<link href="xx">`   

  PS：a和link的区别：a标签属于超链接，用来URL定向；link标签用来连接文件，一般用于CSS 文件的引入

- `<script src="xx">`

**如何实现跨域**

**1、JSONP：通过动态创建script，再请求一个带参网址实现跨域通信。**

ajax请求受**同源策略**影响，不允许进行跨域请求，而**script标签src属性中的链接却可以访问跨域的js脚本**，利用这个特性，服务端不再返回JSON格式的数据，而是返回一段调用某个函数的js代码，在src中进行了调用，这样实现了跨域。

为了便于客户端使用数据，逐渐形成了一种非正式传输协议。人们把它称作JSONP，该协议的一个要点就是**允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据**，这样客户端就可以随意定制自己的函数来自动处理返回函数了。

```js
<script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
<script>
    function jsonp(data) {
    	console.log(data);
	}    
</script>
```

在开发中可能会遇到多个JSONP请求的回调函数名是相同的，这时候就需要自己封装一个JSONP

```js
function jsonp(url, jsonpCallback, success) {
    let script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.type = "text/javascript";
    window[jsonCallback] = function(data) {
        success & success(data);
    };
    document.body.appendChild(script);
}
jsonp(
	"http://xxx",
    "callback",
    function(value) {
        console.log(value);
    }
);
```

**JSONP的缺点：**

- JSON**只支持get，因为script标签只能使用get请求**；

- JSONP需要后端配合返回指定格式的数据。
- jsonp在调用失败的时候不会返回各种HTTP状态码
- 安全性。万一假如提供jsonp的服务存在页面注入漏洞，即它返回的javascript的内容被人控制的

**ajax与jsonp的异同**

- ajax和jsonp这两种技术再调用方式上“看起来很像”，目的也一样，都是请求一个url，然后把服务器返回的数据进行处理，因此jquery和ext等框架都把jsonp作为ajax的一种形式进行了封装。
- 但ajax和jsonp在本质上是不同的东西。ajax的核心是通过XMLHttpRequest获取非本页内容，而jsonp的核心则是动态添加。

**2、document.domain + iframe跨域**：两个页面都**通过js强制设置document.domain为基础主域，就实现了同域**。

该方式**只能用于二级域名相同的情况**下，比如a.test.com和b.test.com适用于该方法。

只需要给页面添加document.domain = 'test.com'表示二级域名相同就可以实现跨域。

**3、location.hash + iframe跨域**：a欲与b跨域相互通信，通过中间页c来实现。 三个页面，**不同域之间利用iframe的location.hash传值**，相同域之间直接js访问来通信。

**4、window.name + iframe跨域**：通过iframe的src属性由外域转向本地域，**跨域数据即由iframe的window.name从外域传递到本地域**。

**5、postMessage + iframe跨域**：可以跨域操作的window属性之一。

postMessage(data,origin)方法允许来自不同源的脚本采用异步方式进行通信，可以实现跨文本档、多窗口、跨域消息传递。

这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息。

```js
// 发送消息端
window.parent.postMessage('message', 'http://test.com');
// 接收消息端
var mc = new MessageChannel();
mc.addEventListener('message', (event) => {
    var origin = event.origin || event.originalEvent.orign;
    if (origin === 'http://test.com') {
        console.log('验证通过');
    }
})
```

**6、CORS：（服务器端设置http header）服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求，前后端都需要设置。**

```js
// 第二个参数填写允许跨域的域名称，不建议直接写"*"
response.setHeader("Access-Control-Allow-Origin", "http://a.com, http://b.com");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
// 接收跨域的cookie
response.setHeader("Access-Control-Allow-Credential", "true")
```

**7、代理跨域：起一个代理服务器，实现数据的转发。**



## 异步:star:

### 1、defer和async

**延迟脚本**

`<script type="text/javascript" defer="defer" src="example.js"></script>`

defer属性：表明脚本在执行时不会影响页面的构造，也就是说，**脚本会被延迟到整个页面都解析完毕再运行**。

**异步脚本**

HTML5为`<script>`定义了async属性。与defer属性相似，都用于改变处理脚本的行为。脚本异步执行，但**标记为async的脚本并不会保证按照指定它们的先后顺序执行**。

`<script type="text/javascript" async src="example.js"></script>`

指定async属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。为此，建议异步脚本不要在加载期间修改DOM。

异步脚本一定会在页面的load时间前执行，但可能会在DOMContentLoaded事件触发之前或之后执行。

### 2、单线程

概念：只有一个线程，同一时间只能做一件事

```js
// alert不处理，js执行和DOM渲染暂时卡顿
console.log(100)
alert(200)
console.log(300)
```

原因：避免DOM渲染的冲突

解决方案：**js是单线程的，一次只能完成一个任务，如果有多个任务，就需要排队，如果有一个任务耗时很长，那么后边任务就需要等待。为了解决这个问题，js将任务的执行分成两种模式：同步和异步**

ps：Web Worker（HTML5）可以为 JavaScript 创造多线程环境，但是不能访问DOM。具体可以看 [Web Worker 使用教程 - 阮一峰](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

### 3、同步和异步

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

**使用异步的场景**

- 定时任务：setTimeout、setInterval
- 网络请求：ajax请求、动态`<img>`加载
- 事件绑定

Promise本身是同步的("resolve before" 在"同步"之前先执行)，而then()则是异步任务("success" 在"同步之后再执行")

### 4、事件轮询（event-loop）:star:

事件轮询是JS实现异步的具体解决方案。

js将所有任务分为两类：同步任务和异步任务。

**事件轮询过程：同步任务在主线程上形成执行栈排队执行，异步的函数先放在任务队列中（不一定马上），当主线程执行完所有代码的时候，会从这个任务队列里面取任务，如果有就执行。** 

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

准确的说是：第一个setTimeout在100ms后才会被放到异步队列中，第二个setTimeout会立刻放入异步队列，而添加到异步队列的任务，只有等到主线程执行栈中的同步任务全部执行完毕之后，才会被执行。如果主线程执行任务很多，执行时间超过100ms，那么这个函数只能等待。

### 5、微任务和宏任务:star:

以上的事件循环过程是一个宏观的表述，实际上因为异步任务之间并不相同，因此他们的执行优先级也有区别。

不同的异步任务被分为两类：微任务 `(micro task)` 和宏任务 `(macro task)`。

#### 概念

微任务（microtask）和宏任务（macrotask）是JavaScript中的两种异步任务执行机制，它们之间的主要区别在于执行顺序和优先级。

- **宏任务**包括script (可以理解为外层同步代码)，setTimeout，setInterval，setImmediate，requestAnimationFrame，I/O（文件读写、网络请求等），UI rendering

- **微任务**包括process.nextTick，Promise.then()，Object.observe，`queueMicrotask` API



#### **微任务和宏任务的优先级**

在同一事件循环中，微任务的优先级高于宏任务。这意味着：

- 当一个宏任务执行完毕后，会立即执行所有已注册的微任务。
- 在所有微任务执行完毕后，才会执行下一个宏任务。



#### **同一事件循环中的执行顺序**

很多人有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了script，浏览器会先执行一个宏任务，接下来是异步代码的话就先执行微任务。

所以正确的一次Event loop顺序是这样的

1、执行同步代码，这属于宏任务（执行当前的宏任务）

2、执行栈为空，查询是否有微任务需要执行

3、执行所有微任务

4、必要的话渲染UI

5、在所有微任务执行完毕后，进入下一个宏任务



#### **代码示例**

```js
console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

new Promise((resolve) => {		// 同步
    console.log('Promise');
    resolve();
}).then(() => {					// 	异步
  console.log('promise1');
}).then(() => {					// 	异步
  console.log('promise2');
});

console.log('script end');

setTimeout(() => {
  console.log('setTimeout2');
}, 0);

queueMicrotask(() => {
  console.log('queueMicrotask');
});

setImmediate(() => {
  console.log('setImmediate');
}, 0);

process.nextTick(() => {
  console.log('process.nextTick');
});

=>
script start
Promise
script end
promise1
promise2
queueMicrotask
process.nextTick
setTimeout
setTimeout2
setImmediate
```

**分析**

1. **script start**、**new Promise** 和 **script end**：这是主线程执行的脚本。
2. **promise1** 和 **promise2**：Promise 的 `.then` 回调作为微任务，在当前宏任务结束后立即执行。
3. **queueMicrotask**：作为微任务，在当前宏任务结束后立即执行。
4. **process.nextTick**：作为微任务，在当前宏任务结束后立即执行。
5. **setTimeout** 和 **setTimeout2**：作为宏任务，会在当前宏任务及其微任务执行完毕后执行。
6. **setImmediate**：作为宏任务，在当前宏任务及其微任务执行完毕后执行，但在 I/O 事件之前。

注意：Promise不等于异步，整个promise执行过程是同步的，Promise只是个**异步操作容器**，把异步操作包起来，以更易读更有条理更符合人类思维习惯的方式来写异步代码。



### 6、Node.js的Event Loop

Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境。

Node.js的运行机制如下。

> （1）V8引擎解析JavaScript脚本。
>
> （2）解析后的代码，调用Node API。
>
> （3）[libuv库](https://github.com/joyent/libuv)负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
>
> （4）V8引擎再将结果返回给用户。



**Node.js 的事件循环模型**

1. Timers 阶段

在这个阶段，Node.js 处理定时器相关的回调，如 `setTimeout` 和 `setInterval`。定时器回调会在指定的时间间隔后执行。如果存在多个定时器，它们会按照设定的时间顺序执行。

2. I/O Callbacks 阶段

在这个阶段，Node.js 处理 I/O（输入/输出）相关的回调，如文件操作、网络请求等。当 I/O 操作完成时，相应的回调函数会被调用。这个阶段通常用于处理已完成的异步操作。

3. Poll 阶段

Poll 阶段是事件循环的核心部分，它负责处理所有已完成的 I/O 操作。在这个阶段，Node.js 会检查是否有已完成的 I/O 操作需要处理。如果有，则会执行相应的回调函数。

4. Check 阶段

在 Check 阶段，Node.js 处理 `setImmediate` 回调。`setImmediate` 是一种特殊的回调机制，它的回调会在当前事件循环的 I/O 回调之后执行，但在下一个事件循环之前执行。这意味着 `setImmediate` 的回调不会被推迟到下一个事件循环。

5. Close Callbacks 阶段

在这个阶段，Node.js 处理所有与关闭操作相关的回调，如关闭文件、关闭网络连接等。



微任务（Microtasks）

除了上述五个阶段之外，Node.js 还支持微任务（Microtasks），这些微任务会在当前宏任务执行完毕后立即执行。微任务包括：

1. **Promise**：Promise 的 `.then` 回调。
2. **Mutation**：DOM 变更。
3. **Queue Microtasks**：`queueMicrotask` API。
4. **Process.nextTick**：Node.js 中的 `process.nextTick`。

在 Node.js 中，微任务是在当前宏任务结束后立即执行的，而在下一阶段（如 Timers 阶段）之前执行。



### 7、处理异步的几种方法

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
    callback();  //调用该函数
    console.log("I am A");
}
function B(){
   console.log("I am B");
}
A(B);
// I am B
// I am A
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
- 初始状态pending可变为fulfilled或rejected，且状态变化不可逆
- promise 必须实现 `then` 方法（可以说，then 就是 promise 的核心），而且 then 必须返回一个 promise，同一个 promise 的 then 可以调用多次，并且回调的执行顺序跟它们被定义时的顺序一致
- then 方法接受两个参数，第一个参数是成功时的回调（resolve），另一个是失败时的回调（reject）。同时，then 可以接受另一个 promise 传入，也接受一个 “类 then” 的对象或方法，即 thenable 对象。

##### promise的使用

**promise封装api 基本使用**

​	1>new Promise实例，而且要return

​	2>new Promise时要传入函数，函数有resolve，reject两个函数

​	3>成功时执行resolve，失败时执行reject

​	4>then监听结果

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

在 then 的基础上，应该还需要至少两个方法，分别是完成 promise 的状态从 pending 到 resolved 或 rejected 的转换，同时执行相应的回调队列，即 `resolve()`和 `reject()`方法。 

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

##### Promise.race的简单实现

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

##### 异常捕获

包括语法错误，逻辑错误（如图片加载错误）

```js
// 规定：then只接受一个参数，最后统一用catch捕获异常
result.then(function (img) {
    console.log(img.width)
    return img // 防止出现异常
}).then(function (img) {
    console.log(img.height)
}).catch(function(err) {  // 最后统一catch，统一捕获异常
    console.log(err)
})

```

优点：将回调函数嵌套调用变成了链式调用，逻辑更强，执行顺序更清楚，很好地体现了开放封闭原则

缺点：代码冗余，异步操作都被包裹在Promise构造函数和then方法中，主题代码不明显，语义不清楚

#### 4、async/await

##### 概念

- async/await是写异步代码的新方式
- async/await是基于Promise实现的，它不能用于普通的回调函数及节点回调
- async/await和Promise一样，是非阻塞的
- async/await使得异步代码看起来像同步代码
- async函数是generator函数的语法糖，它相当于一个自带执行器的generator函数

**优点：**从上到下，顺序执行，就像写同步代码一样，更符合代码编写习惯，最适合处理多个Promise异步操作。

**缺点：**滥用await可能会导致性能问题，因为await会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致失去了并发性。

##### 用法

- 使用await函数必须用async标识
- await后面跟的是一个Promise实例
- **任何一个async函数都会隐式返回一个Promise，并且promise resolve的值就是return返回的值**

```js
async function test() {
    return "1";
}
console.log(test());  // Promise {<resolved>: "1"}
```

- await不处理异步error

  await是不管异步过程的reject(error)消息的，async函数返回的这个Promise对象的catch函数负责统一抓取内部所有异步过程的错误；async函数内部只要有一个异步过程发生错误，整个执行过程就中断，这个返回的Promise对象的catch就能抓取到这个错误

##### 使用例子

**JavaScript 利用 async await 实现 sleep 效果**

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
    console.log('test');
}
test();
// finish
// sleep
// test
```

因为await会等待sleep函数resolve，所以即使后面是同步代码，也不会先去执行同步代码再来执行异步代码。它等待后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回，返回值拿到之后，它继续向下执行。

##### 实际应用场景

```js
/**
 * 项目中有一个地方需要获取到接口返回值之后根据返回值确定之后执行的步骤，使用async搭配await实现，await函数不能单独使用。
 */

async function methodName(params) {
    let isSuccess = false;
    await this.$http({
        url: URL,
        method: "get",
        params: params
    }).then(res => {
        if (res.code == 200) {
            isSuccess = true
        }
    }).catch(err => {
        console.log(err);
        this.$message({
            type: "error",
            message: "系统异常"
        });
    });
    return isSuccess
};

methodName(this.params).then(function (result) { 
    if (result) {
        console.log('success');
    } else {
        console.log('fail');
    }
})
```

#### 5、generator（不是异步的直接替代方案）

参考：https://blog.csdn.net/yuefujuan_1992/article/details/89055602

generator因其中断/恢复执行和传值等优秀功能被人们用于异步处理

协程：多个线程相互协作，完成异步任务

定义：generator函数是协程在ES6的实现，最大特点就是可以交出函数的执行权（即**暂停执行**）。整个generator函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。

执行：返回一个内部指针，**不会返回结果**，**返回的是指针对象**`{value:**,done:'true/false'}`



**`Generator`函数之所以可以用于异步操作是因为`yield`关键字，`Generator`函数在执行过程中遇到`yield`语句时就会暂停执行，并返回`yield`语句后面的内容，要想继续执行后续的代码就需要手动调用`next`方法。**这样就找到了顺序执行异步操作的方法了，也就是**将所有异步操作都放在`yield`关键字后面，同时在异步操作内配置相应的`next`方法**，以便在异步操作结束后返回出操作的结果并交出执行权



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

总结一下，**调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针**。以后，每次调用遍历器对象的next方法，就会**返回**一个有着**value和done**两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；**done属性是一个布尔值，表示是否遍历结束**。

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





## 模块化

### 1、模块化

**概念：**将一个复杂的程序依据一定的规则（规范）封装成几个块（文件）并进行组合。

模块的内部数据的实现是私有的，只是向外部暴露一些接口（方法）与外部其他模块通信，这就是模块化。

**优点：**模块化可以降低代码耦合度，减少重复代码，提高代码重用性，并且在项目结构上更加清晰，便于维护。  

#### AMD、CMD、CommonJs、ES6的对比

他们都是用于在模块化定义中使用的，AMD、CMD、CommonJs是ES5中提供的模块化编程的方案，import/export是ES6中定义新增的

#### AMD

AMD是**RequireJS**在推广过程中对模块定义的规范化产出，它是一个概念，RequireJS是对这个概念的实现，就好比JavaScript语言是对ECMAScript规范的实现。AMD是一个组织，RequireJS是在这个组织下自定义的一套脚本语言

RequireJS：是一个AMD框架，可以**异步加载JS文件**，按照模块加载方法，**通过define()函数定义**，**第一个参数是一个数组**，里面定义一些需要依赖的包，**第二个参数是一个回调函数**，通过变量来引用模块里面的方法，最后通过return来输出。

是一个**依赖前置、异步定义**的AMD框架（在参数里面引入js文件），在定义的同时如果需要用到别的模块，在最前面定义好即在参数数组里面进行引入，在回调里面加载

```js
define(['./a', './b'], function(a, b) {
    a.do();
    b.do();
});
define(function(require,exports,module){
	var a = require('./a');
    a.doSomething();
    var b = require('./b');
    b.doSomething();
});
```

#### CMD

是**SeaJS**在推广过程中对模块定义的规范化产出，是一个同步模块定义，是SeaJS的一个标准，SeaJS是CMD概念的一个实现，SeaJS是淘宝团队提供的一个模块开发的js框架.

**通过define()定义，没有依赖前置，通过require加载jQuery插件，CMD是依赖就近**，在什么地方使用到插件就在什么地方require该插件，即用即返，这是一个同步的概念

`define(id?, deps?, factory) `

factory是一个函数，有三个参数，function(require, exports, module)

1. require 是一个方法，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口：require(id)
2. exports 是一个对象，用来向外提供模块接口
3. module 是一个对象，上面存储了与当前模块相关联的一些属性和方法

```js
// 定义模块  module.js
define(function(require, exports, module) {
  var $ = require('jquery.min.js')
  $('div').addClass('active');
});

// 加载模块
seajs.use(['module.js'], function(my){
});
```

##### AMD与CMD区别

AMD和CMD最明显的区别就是在模块定义时对依赖模块的执行时机处理不同。

**1、AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块** 

js可以方便知道依赖模块是谁，立即加载；

**2、CMD推崇就近依赖，只有在用到某个模块的时候再去require** 

需要使用把模块变为字符串解析一遍才知道依赖了那些模块，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。

#### ES6（export和import）

ES6模块的主要有两个功能：export和import。

- export用于对外输出本模块（一个文件可以理解为一个模块）变量的接口。

- import用于在一个模块中加载另一个含有export接口的模块。

也就是说使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。

```JavaScript
//util1.js
export default {
    a: 100
}

//index.js
import util1 from './util1.js'
console.log(util1);
```

```JavaScript
//util2.js
export function fn1() {
    alert('fn1');
}
export function fn2() {
    alert('fn2');
}

//index.js
import { fn1, fn2 } from './util2.js'
fn1();
fn2();
```

#### CommonJs

是通过module.exports定义的，在前端浏览器里面并不支持module.exports，通过**node.js后端使用**的。Nodejs端是使用CommonJS规范的，前端浏览器一般使用AMD、CMD、ES6等定义模块化开发的。

加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。

CommonJS定义的模块分为：{模块引用(require)}   {模块定义(exports)}   {模块标识(module)}

- require()用来引入外部模块；

- exports对象用于导出当前模块的方法或变量，唯一的导出口；

- module对象就代表模块本身。

```js
// a.js
module.exports = {
    a: 1;
}
// or
exports.a = 1;

// b.js
var module = require('./a.js');
module.a; // 1
```

##### commonjs和ES6模块化的区别

- 前者支持动态导入，也就是require(${path}/xx.js)，后者目前不支持，但是已有提案
- 前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用异步导入会对渲染有很大影响
- 前者在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化。
- 后者会编译成require/export来执行

### 2、export和export default的区别

- export  default命令用于指定模块的默认输出。

- 显然，一个模块只能有一个默认输出，因此export  default命令只能使用一次。

- 所以import命令后面才不用加{}，因为只可能唯一对应export default命令。

本质上，export  default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。

1、export与export default均可用于导出常量、函数、文件、模块等。

2、在一个文件或模块中，export、import可以有多个，export default仅有一个。

3、通过export 方法导出，在导入时要加{}，export  default则不需要。

4、export，import时需要知道所加载的变量名或函数名；export default，import时可指定任意名字

5、（1）输出单个值，只用export  default

​	（2）输出多个值，使用export

​	（3）export  default与普通export不要同时使用

### 3、webpack和gulp区别（模块化与流的区别）

webpack是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图片、js文件、css文件等）都看成模块，通过loader（加载器）和plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。

[webpack概念与配置](../其他/webpack概念与配置)

gulp强调的是前端开发的工作流程，我们可以通过配置一系列的task，定义task处理的事务（例如文件压缩合并、雪碧图、启动server、版本控制等），然后定义执行顺序，来让gulp执行这些task，从而构建项目的整个前端开发流程。



## 总结一下ES6常用功能

### 1、let&const及块级作用域

#### let

1) let定义变量，可重新赋值。但是不能重复定义，不会进行变量提升

2) let声明的全局变量不是全局对象的属性

而var声明的全局变量是window的属性，是可以通过window变量名的方式访问的

```js
var a = 1
console.log(window.a) // 1

let b = 1
console.log(window.b) // undefined
```

#### const

const和let一样，有块级作用域，不会变量提升

不同的是其定义的变量不能被修改且定义时必须初始化，用于定义常量

但是const定义的对象属性是可以被修改的。因为const 指针指向的地址不可以变化，但指向地址的内容可以变化。 

#### 块级作用域

```JavaScript
//JS
var obj = {
    a: 100,
    b: 200
}
for(var item in obj){
    console.log(item)
}
console.log(item) //'b'
```

```javascript
//ES6
const obj = {
    a: 100,
    b: 200
}
for(let item in obj){
    console.log(item)
}
console.log(item) //undefined
```

### 2、多行字符串/模板变量

```JavaScript
//JS
var name = 'zhangsan', age = 20, html = '';
html += '<div>';
html += '     <p>' + name + '</p>';
html += '     <p>' + age + '</p>';
html += '</div>';
```

```javascript
//ES6
const name = 'zhangsan', age = 20;
const html = '<div>
                   <p>${name}</p>
                   <p>${age}</p>
              </div>';
console.log(html);
```

- 反引号定义多行字符串
- ${name}将变量引入

### 3、正则表达式

#### y修饰符

sticky粘连，连续匹配

```js
const s = 'aaa_aa_a'
const r1 = /a+/g
console.log(r1.exec(s))  // ["aaa", index: 0, input: "aaa_aa_a"]

const r2 = /a+/y
console.log(r2.exec(s))  // ["aaa", index: 0, input: "aaa_aa_a"]

// 再执行一次
console.log(r1.exec(s))  // ["aa", index: 4, input: "aaa_aa_a"]
console.log(r2.exec(s))  // null
```

y修饰符规定正则表达式必须从lastIndex规定的位置开始进行匹配，也就是说，如果开始匹配的位置不是从lastIndex规定位置开始，匹配失败，不再继续尝试。

#### u修饰符

u修饰符表示按unicode（utf-8）匹配（主要正对多字节比如汉字）

### 4、函数默认参数

```javascript
// ES5
function(a, b){
    if(b == null){
        b = 0
    }
}
```

```javascript
// ES6
function(a, b = 0){
    ...
}
```

拓展：在函数体内，判断函数有几个参数

```js
// ES5 用arguments
function test (a, b = 1, c) {
    console.log(arguments.length)
}
test('a', 'b') // 2

// ES6
function test (a, b = 1, c) {
    console.log(test.length)
}
test('a', 'b') // 1

// 注意：Function.length统计的是 没有默认值的参数的个数
```

### :star:5、箭头函数

```javascript
//JS
var arr = [1,2,3]
arr.map(function(item){
    return item + 1
})

//ES6
const arr = [1,2,3]
arr.map(item => item + 1)
arr.map((item, index) => {
    console.log(index)
    return item + 1
})
```

如果返回值是表达式，可以省略return和{}

```js
let pow = x => x*x
```

如果返回值是字面量对象，一定要用小括号包起来

```js
let person = (name) => ({
    age: 20,
    addr: 'beijing'
})
```



**箭头函数和普通函数的区别：**

- 箭头函数是匿名函数，不能作为构造函数，不能使用new
- 箭头函数不绑定arguments，取而代之用rest参数...解决
- 箭头函数不绑定this，会捕获其所在的上下文的this值作为自己的this值
- 箭头函数通过call()或apply()方法调用一个函数时，只传入了一个参数，对this并没有影响
- 箭头函数没有原型属性
- 箭头函数不能当做Generator函数，不能使用yield关键词



### 6、扩展运算符的应用

转自[ES6核心，教你 玩转 ES6新特性](http://www.imooc.com/article/67156)

1、将一个数组变为参数序列

```js
function add(a, b){
    return a + b;
}
let num = [22, 33];
add(...num) // 55
```

2、可以替代函数中的apply

由于扩展运算符可以展开数组，所以不需要apply方法，将数组转化为函数的参数了。

```js
//ES5中
Math.max.apply(null, [3,2,5])
//在es6中的写法
Math.max(...[3, 2, 5])
// 等同于Math.max(3, 2, 5);
```

由于 JavaScript 不提供求数组最大元素的函数，所以只能套用Math.max函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用Math.max了。

3、拷贝对象

注意：扩展操作符和 `Object.assign`类似 只能深拷贝一层的对象，如果对象是两层的结构，那么使用扩展操作符拷贝会是浅拷贝。

```js
var obj = {name: "feng", color: ["yellow", "blue"]};
var obj1 ={...obj}
obj1.color.push("red")
console.log(obj)    // { name: 'feng', color: [ 'yellow', 'blue', 'red' ] }
```

4、将某些数据类型转化为数组

```js
// arguments对象
!function(){
    const arr = [...arguments];
    console.log(arr)
}(2,3)    // [2,3]

// Dom返回的对象
console.log(Array.isArray([...document.getElementsByTagName("li")])) // true

// 字符串转数组
let str = 'hello'
let arr = [...str]
console.log(arr)  // ['h', 'e', 'l', 'l', 'o']
```

扩展运算符所使用的是遍历器接口（Iterator），如果一个对象没有这个接口，就无法转化。

### 7、变量的解构赋值

转自[ES6核心，教你 玩转 ES6新特性](http://www.imooc.com/article/67156)

#### （1）数组的解构赋值

**基本用法**

在没有ES6之前给变量赋值经常是指定赋值

```javascript
var obj = {
    a: 100,
    b: 200
}
var a = obj.a
var b = obj.b
var arr = ['xxx','yyy','zzz']
var x = arr[0]
```


在ES6中允许使用以下方式赋值


```javascript
//ES6
const obj = {
    a: 10,
    b: 20,
    c: 30
}
const {a,c} = obj
console.log(a)
console.log(c)

const arr = ['xxx','yyy','zzz']
const [x,y,z] = arr
console.log(x)
console.log(y)
console.log(z)
```


如果解构不成功，变量的值就是undefined，如下：

```js
var [a] = []     // a就是undefined;
var [a, b] = [1]  // 同样a的值是1，b 的值就是undefiend;
```

以上的两个例子都是属于不完全解构，但可以成功。

**如果等号右边的不是数组，严格的来说就是不可以遍历的结构，解构赋值的过程中都会报错。**

```js
//以下都是会报错的Example
var [a] = 1;
let [a] = false;
let [a] = NaN;
let [a] = undefined;
let [a] = null;
let [a] = {};
```

上面的赋值会报错的主要原因是，前五个表达式在转化为对象后不具备（Iterator）接口，（最后一个表达式）要么本身就不具备（Iterator）接口。

遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

#### （2） 对象的解构赋值

```js
let {name, age} = {name: "aaa", age: 12}
name	// "aaa"
age		// 12
```

对象与数组的解构赋值有个本质的不同，数组的元素是按照次序排列的，**对象中的属性排列是没有次序的，要想赋上值就必须保证，属性名必须保持一致才能获取的到值。**

```js
let {age, name} = {name: "aaa", age: 12}
name	// "aaa"
age		// 12
let {foo} = {name: "aaa", age: 12}
foo		// undefined 
```

上面的这个例子表示等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于undefined。

#### （3）字符串的解构赋值

字符串也是可以解构赋值的这是因为，字符串在被解构赋值的时候就形成了一个类似数组的对象。

```js
let [a,b,c,d,e,f]="goudan"
a	// g
b	// o
...
f	// n
```

类似数组的对象都有 一个length属性，也可以给length赋值

```js
let {length: len}="goudan"
len // 6
```

### 8、Symbol：表示独一无二的值

- Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。
- Symbol函数可以接受一个字符串作为参数，表示对Symbol事例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
- Symbol值不能与其他类型的值进行运算。Symbol值作为对象属性名时，不能用点运算。

### 9、Set的基本用法

转自[ES6核心，教你 玩转 ES6新特性](http://www.imooc.com/article/67156)

**Set和数据相似，也是一种 集合，主要的区别是，Set里面的值是唯一的，没有重复的**。

Set中**可以放数组，不可以放对象**，使用**add**向里面**填充数据**，可以使用**delete删除**其中的一个元素。

创建Set如下：

```js
let coll = new Set([3,5,"feng","true"]); // 放数组
console.log(coll) // Set(4) {3, 5, "feng", "true"}
// ps: 初始化的参数必须是可遍历的，可以是数组或自定义遍历的数据结构

coll.add(22).add('hello')
console.log(coll) // Set(5) {3, 5, "feng", "true", 22, "hello"}
coll.delete(3)
console.log(coll) // Set(4) {5, "feng", "true", 22}
coll.clear()
console.log(coll) // Set(0) {}
```

Set不是数组，是一个像对象的数组，就是一个伪数组。Set中的数据可以用for of 以及 forEach来进行遍历。

```js
coll.forEach(item => console.log(item));	  // 3 5 feng true
for (let item of coll) {console.log(item);}   // 3 5 feng true
```

#### Set的应用

1、数组去重

```js
let arr = [1,1,12,3,3,true,true,NaN,NaN]
let unique = [...(new Set(arr))]
console.log(unique)//[ 1, 12, 3, true, NaN ]
```

2、并集（Union）、交集（Intersect）和差集（Difference）

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```



### 10、Map的基本用法

转自[ES6核心，教你 玩转 ES6新特性](http://www.imooc.com/article/67156)

**Object和Map的区别**

- 键的类型：

  对象中的键名只能是字符串或Symbols，如果使用Map，它里面的键可以是任意值，包括函数，对象，基本类型等。

- 键的顺序：

  Map中的键是有序的，而Object需要先获取它的键数组

- 性能：

  在频繁增删键值对的场景下会有性能优势

Map的创建和用法如下：

```js
var m = new Map();
o = {p: "Hello World"};
m.set(o, "content");	//使用set进行添加元素 这里的键值是一个对象
console.log(m.get(o))
// "content"
```

Map中的实例属性主要有

- **size**：返回成员总数。

- **set(key, value)**：设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。

- **get(key)**：读取key对应的键值，如果找不到key，返回undefined。

- **has(key)**：返回一个布尔值，表示某个键是否在Map数据结构中。

- **delete(key)**：删除某个键，返回true。如果删除失败，返回false。

- **clear()**：清除所有成员，没有返回值。

- **set()**：方法返回的是Map本身，因此可以采用链式写法。

**主要看下Map的遍历方法（Set一样）**

- keys()：返回键名的遍历器。


- values()：返回键值的遍历器。


- entries()：返回所有成员的遍历器。


```js
let map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  document.write(key);
}
// "F"
// "T"
for (let value of map.values()) {
  document.write(value);
}
// "no"
// "yes"
for (let item of map.entries()) {
  document.write(item[0], item[1]);
}
// "F" "no"
// "T" "yes"
// 或者
for (let [key, value] of map.entries()) {
  document.write(key, value);
}
// 等同于使用map.entries()
for (let [key, value] of map) {
  document.write(key, value);
}
```

### 11、Generator（生成器）

 [有部分内容在上面](#_5、generator（不是异步的直接替代方案）) 

#### 语法

```js
function * gen () {
    yield 1
    yield 2
    yield 3
}
let g = gen()
```

1、Generator函数比普通函数多一个*

2、函数内部用yield来控制程序的执行和”暂停“

3、函数的返回值通过next来“恢复”程序执行，**不会返回结果，返回一个遍历器对象**，代表 Generator 函数的内部指针`{value:,done:'true/false'}`。**value属性表示当前的内部状态的值**，是yield表达式后面那个表达式的值；**done属性是一个布尔值，表示是否遍历结束**。

注意：Generator函数的定义不能使用箭头函数，否则会触发SyntaxError

#### yield表达式

yield * 是委托给另一个遍历器对象或者可遍历对象，即generator可以嵌套

```js
function * gen () {
    let val 
    val = yield * [1, 2, 3]
    console.log(val)
}
const l = gen()
console.log(l.next())
console.log(l.next())
// {value: 1, done: false}
// {value: 2, done: false}
```

#### next([value])

可以接受参数，这个参数可以让你在Generator外部给内部传递数据，而这个参数就是yield的返回值

```js
//通过改变yield返回值的数据来改变内部的数据
function * gen () {
    let val 
    val = (yield [1, 2, 3]) + 7
    console.log(val)
}
const l = gen()
console.log(l.next(10))
console.log(l.next(20))
// {value: Array(3), done: false}
// 27
// {value: undefined, done: true}
```

#### return

return方法可以让Generator函数遍历终止，有点类似for循环的break

```js
function * gen () {
    yield 1
    yield 2
    yield 3
}

var g = gen()
console.log(g.next())  		// {value: 1, done: false}
console.log(g.return())		// {value: undefined, done: true}
console.log(g.next())		// {value: undefined, done: true}
```

return还可以传入参数，作为返回值的value

```js
function * gen () {
    yield 1
    yield 2
    yield 3
}

var g = gen()
console.log(g.next())  		// {value: 1, done: false}
console.log(g.return(100))		// {value: 100, done: true}
console.log(g.next())		// {value: undefined, done: true}
```

#### throw

可以通过throw方法在Generator外部控制内部执行的“终断”

```js
// 在内部捕获异常
function * gen () {
    while (true) {
        try {
            yield 1
        } catch (e) {
            console.log(e.message)
        }
    }
}
let g = gen()
console.log(g.next())					// {value: 1, done: false}
console.log(g.next())					// {value: 1, done: false}
g.throw(new Error('message wrong'))     //  message wrong
console.log(g.next())					// {value: 1, done: false}
```

#### 应用实例

抽奖

```js
function * draw (first = 1, second = 3, third = 5) {
    let price = [1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 16, 17, 21, 22, 23, 24, 25, 26, 27]
    let count = 0
    let random
    while (1) {
        if (count < first + second + third) {
            random = Math.floor(Math.random() * price.length)
            yield price[random]
            count++
            price.splice(random, 1)
        } else {
            return false
        }
    }
}
let d = draw()
console.log(d.next().value) // 来9次
```

普通函数的话一下子就知道了所有的中奖人，二使用Generator函数则是一个一个抽出来，比较刺激

### 12、Iterator（迭代器）

遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

在ES6中，有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历，有些就不行（比如对象）。原因在于，这些数据结构原生部署了`Symbol.iterator`属性，另外一些数据结构没有。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

在ES6中，有三类数据结构原生具备Iterator接口(可用for of遍历)：数组、某些类似数组的对象、Set和Map结构。

#### 迭代器协议

迭代器协议要求符合以下条件：

1. 是个对象
2. 这个对象包含一个无参函数next
3. next返回一个对象，对象包含done和value属性。其中done表示遍历是否结束，value返回当前遍历的值

注意：如果next函数返回一个非对象值（比如false和undefined）会展示一个TypeError的错误。

#### 可迭代协议

如果让一个对象是可遍历的，就要遵守可迭代协议，该协议要求对象要部署一个以Symbol.iterator为key的键值对，而value就是一个无参函数，这个函数返回的对象要遵守迭代器协议。

#### 作用

- 为各种数据结构，提供一个统一的、简便的访问接口；

- 使得数据结构的成员能够按某种次序排列；

- ES6创造了一种新的遍历命令`for...of`循环，Iterator接口主要供`for...of`消费。

#### 工作原理

- 创建一个指针对象，指向数据结构的起始位置。

- 第一次调用next方法，指针自动指向数据结构的第一个成员

- 接下来不断调用next方法，指针会一直往后移动，直到指向最后一个成员

- 每调用next方法返回的是一个包含value和done的对象，`{value: 当前成员的值, done: 布尔值}`
  
  value表示当前成员的值，done对应的布尔值表示当前的数据的结构是否遍历结束。
  
  当遍历结束的时候返回的value值是undefined，done值为false

#### 一个为对象添加Iterator接口的例子

```js
let authors = {
    allAuthors: {
        fiction: [
            'Agatha Christie',
            'J.K.Rowing',
            'Dr.Seuss'
        ],
        fantasy: [
            'xxx',
            'xxxx',
            'xx'
        ]
    }
}

// 部署Iterator接口
authors[Symbol.iterator] = function() {
    // 根据对象数据结构的特点自己实现业务逻辑
    let allAuthors = this.allAuthors
    let keys = Reflect.ownKeys(allAuthors)
    let values = []
    return {
        next () {
            if (!values.length) {
                if (keys.length) {
                    values = allAuthors[keys[0]]
                    keys.shift()
                }
            }
            return {
                done: !values.length,
                value: values.shift()
            }
        }
    }
}

// 遍历获取所有作者
let r = []
for (let value of authors) {
    console.log(`${value}`)
    r.push(value)
}
console.log(r) // ["Agatha Christie", "J.K.Rowing", "Dr.Seuss", "xxx", "xxxx", "xx"]
```

还可以用Genrator来实现

```js
authors[Symbols.iterator] = function * () {
    let allAuthors = this.allAuthors
    let keys = Reflect.ownKeys(allAuthors)
    let values = []
    return {
        while(1) {
            if (!values.length) {
                if (keys.length) {
                    values = allAuthors[keys[0]]
                    keys.shift()
                    yield values.shift()
                } else {
                    return false
                }
            } else {
                yield values.shift()
            }
        }
    }
}
```

#### 一个类似数组的对象调用数组的`Symbol.iterator`方法的例子

```js
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
```

注意，普通对象部署数组的`Symbol.iterator`方法，并无效果。

默认调用Iterator接口（即`Symbol.iterator`方法）的场合。

- **解构赋值**
- **for...of**
- **扩展运算符(...)**
- **yield后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。**
- **由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用**

**注意**：

- 字符串是一个类似数组的对象，也原生具有Iterator接口。

- 遍历器对象除了具有`next`方法，还可以具有`return`方法和`throw`方法。如果你自己写遍历器对象生成函数，那么`next`方法是必须部署的，`return`方法和`throw`方法是否部署是可选的。


### 13、class

#### JS构造函数

```js
function MathHandle(x,y){
    this.x = x
    this.y = y
}
MathHandle.prototype.add = function(){
    return this.x + this.y
}
var m = new MathHandle(1,2)
console.log(m.add())
```

#### class语法

```js
class MathHandle {
    constructor(x,y){
        this.x = x
        this.y = y
    }
    add(){
        return this.x + this.y
    }
}
var m = new MathHandle(1,2)
console.log(m.add())
m.__proto === MathHandle.prototype  //true
```

#### 继承—JS

```js
//动物
function Animal(){
    this.eat = function() {
        console.log('animal eat')
    }
}
//狗
function Dog(){
    this.bark = function() {
        console.log('dog bark')
    }
}
Dog.prototype = new Animal()
var hashiqi = new Dog()
```

#### 继承—class

```js
class Animal{
    constructor(name){
        this.name = name
    }
    eat() {
        console.log(this.name + ' eat')
    }
}
class Dog extends Animal{
    constructor(name){
        super(name)
        this.name = name
    }
    say() {
        console.log(this.name + ' say')
    }
}
const dog = new Dog('哈士奇')
dog.eat()
dog.say()
```

#### `Class`和普通构造函数有何区别

- class在语法上更加贴近面向对象的写法
- class实现继承更加易读，易理解
- 更易于写java等后端语言使用
- 本质是语法糖，使用prototype

#### Setters & Getters

对于类中的属性，可以直接在constructor中通过this直接定义，还可以直接在类的顶层来定义

```js
class Animal {
    constructor (type, age) {
        this.type = type
        this._age = age
    }
    get age () {
        return this._age
    }
    set age (val) {
        this._age = val
    }
}
```

#### Static Methods

静态方法：不属于对象实例，而属于这个类，需要从类来访问才能获取。

```js
// ES5
let Animal = function(type) {
    this.type = type
    this.walk = function() {
        console.log('I`m walking')
    }
}
Animal.eat = function() {
    console.log('I`m eating')
}
Animal.eat()
// ES6
class Animal {
    constructor(type) {
        this.type = type
    }
    walk() {
        console.log('I`m walking')
    }
    static eat () {
        console.log('I`m eating')
    }
}
Animal.eat()
```

**什么时候用实例对象方法，什么时候用静态方法？**

如果这个方法里面还会涉及到其他的实例对象属性或方法（即另外还要依赖于其他方法），则用实例对象方法。

如果没有依赖关系，则用静态方法。（因为静态方法拿不到实例对象）

### 14、jquery-deferred（Promise中的`.then`语法）

ES6中的Promise中的`.then`语法最早在jquery1.5中就有提出使用

#### 介绍

deferred对象就是jquery的回调函数解决方案。在英语中，defer的意思就是延迟，所以deferred对象的含义就是“延迟”到未来某个点再执行。它解决了如何处理耗时操作的问题，对那些操作提供了更好地控制，以及统一的编程接口。

#### jquery1.5的变化

##### 1.5之前

```js
var ajax = $.ajax({
    url: 'data.json',
    success: function() {
        console.log('success')
    },
    error: function() {
        console.log('error')
    }
})
console.log(ajax)
```

##### 1.5之后

例一：

```js
var ajax = $ajax('data.json')
ajax.done(function() {
    console.log('success1')
})
.fail(function() {
    console.log('error')
})
.done(function() {
    console.log('success2')
})
```

例二：

```js
// 很像promise的写法
var ajax = $ajax('data.json')
ajax.then(function() {
    console.log('success1')
}, function() {
    console.log('error1')
})
.then(function() {
    console.log('success2')
}, function() {
    console.log('error2')
})
```

**变化总结**

1、无法改变JS异步和单线程的本质

2、只能从写法上杜绝callback这种形式

3、它是一种语法糖，但是解耦了代码

4、很好的体现了开放封闭原则

> **开放封闭原则**
>
> 其核心思想是软件实体应该是可扩展的，而不可修改的，即对扩展开放，对修改封闭。
>
> 开放封闭主要体现在两个方面:
>
> **对扩展开放**，意味着新的需求或变化时，可以对现有代码进行扩展，以适应新的情况。
> **对修改封闭**，意味着类一旦设计完成时，就可以独立完成其工作，而不要对类进行任何修改。 

#### 使用jQuery Deferred

```js
var wait = function () {
    var task = function() {
        console.log('执行完成')
    }
    setTimeout(task, 2000)
}
wait()
```

新增需求：要在执行完成之后进行某些特别复杂的操作，代码可能会很多，而且分好几个步骤

```js
function waitHandle() {
    var dtd = $.Deferred()        // 创建一个deferred对象
    var wait = function(dtd) {
        var task = function() {
            console.log('执行完成')
            dtd.resolve()       // 表示异步任务已经完成
            // dtd.reject()     // 表示异步任务失效或出错
        }
        setTimeout(task, 2000)
        return dtd              // 要求返回deferred对象
    }
    return wait(dtd)            // 注意，这里一定要有返回值
}

var w = waitHandle()
w.then(function() {
    console.log('ok1')
}, function() {
    console.log('err1')
})
.then(function() {
    console.log('ok2')
}, function() {
    console.log('err2')
})
// 还有w.done w.fail
```

##### 总结：dtd的api可分成两类，用意不同，并且需要分开用

**第一类（主动触发）**

- dtd.resolve()

  手动改变deferred对象的运行状态为“已完成”，从而立即触发done()方法

- dtd.reject()

  这个方法与resolve()相反，调用后将deferred对象的运行状态变为“已失效”，从而立即出发fail()方法

**第二类（被动监听）**

- dtd.done()

  指定函数成功时的回调函数

- dtd.fail()

  指定函数失败时的回调函数

- dtd.then()

  把done()和fail()合在一起写，如果then()有两个参数，那么第一个参数是done方法的回调函数，第二个参数是fail()方法的回调函数、如果只有一个参数，等同于done()

##### 使用dtd.promise()方法

promise没有参数时，返回一个新的defer对象，该对象的运行状态无法被改变，接收参数时，作用为在参数对象上部署deferred接口

```js
function waitHandle() {
    var dtd = $.Deferred()        
    var wait = function(dtd) {
        var task = function() {
            console.log('执行完成')
            dtd.resolve()       
        }
        setTimeout(task, 2000)
        return dtd.promise()          // 注意这里返回的是promise，不是直接返回deferred
    }
    return wait(dtd)            
}

// 经过上面的改动，w接收的是一个promise对象
var w = waitHandle()
$.when(w)					// api不同
.then(function() {
    console.log('ok1')
}, function() {
    console.log('err1')
})
.then(function() {
    console.log('ok2')
}, function() {
    console.log('err2')
})
```

### 15、promise

 [看上面~](#_3、promise) 

### 16、代理（Proxy）

Proxy是ES6中新增的功能，可以用来自定义对象中的操作，如查找、赋值、枚举、函数调用等。

`let p = new Proxy(target, handler);`

- target：代表需要代理的对象
- handler：用来自定义对象中的操作

```js
let obj = {
    name: 'xiaoming',
    price: 100
}
let d = new Proxy(obj, {
    get (target, key) {
        if (key === 'price') {
            return target[key] + 20
        } else {
            return target[key]
        }
    }
})
console.log(d.price, d.name); // 120 "xiaoming"
```

#### 对赋值进行拦截

```js
let obj = {
    name: 'xiaoming',
    price: 100
}
let d = new Proxy(obj, {
    get (target, key) {
        return target[key]
    },
    set (target, key) {
    	return false
	}
})
d.price = 120
console.log(d.price, d.name); // 100 "xiaoming"
```

#### 校验

对于数据交互而言，校验是不可或缺的一个环节。传统的校验是将校验写在了业务逻辑里，导致代码耦合度较高。使用Proxy就可以将代码设计的非常灵活。

```js
// validator.js
export default (obj, key, value) {
    if (Reflect.has(key) && value > 20) {
        obj[key] = value
    }
}

import validator from './validator'
let data = new Proxy(response.data, {
    set: validator
})
```

#### 对读写进行监控

```js
// 监听错误
window.addEvenetListener('error', (e) => {
    console.log(e.message)
}, true)
// 校验规则
let validator = {
    set(target, key, value) {
        if (key === 'age') {
            if (typeof value !== 'number' || Number.isNaN(value)) {
                // 不满足规则就要触发错误
                throw new TypeError('Age must be a number')
            }
            if (value <= 0) {
                throw new TypeError('Age must bu a positive number')
            }
        }
        return true
    }
}
const person = {age: 27}
const proxy = new Proxy(person, validator)
proxy.age = NaN // Uncaught TypeError: Age must be a number
proxy.age = 28
proxy.age = 0 // Uncaught TypeError: Age must be a positive number
```

设置对象的id只可读不可被修改

```js
class Component {
    constructor() {
        this.proxy = new Proxy({
            id: Math.random().toString(36).slice(-8) // 随机生成一个id
        }, {}) 
    }
    get id () {
        return this.proxy.id
    }
}
let com = new Component()
com.id = 'abc'
console.log(com.id) // dp9hrcw7
```

#### Revocable Proxy

除了使用常规的代理，还可以创建临时的代理，这个临时代理就可以被取消

```js
let obj = {
    name: 'xiaoming',
    price: 100
}
let d = Proxy.revocable(obj, {
    get (target, key) {
        if (key === 'price') {
            return target[key] + 20
        } else {
            return target[key]
        }
    }
})
console.log(d.proxy.price, d); // 120  {proxy: Proxy, revoke: ƒ}
setTimeout(function () {
    // 销毁代理  一旦revoke被调用，proxy就失效了，这就起到了临时代理的作用
    d.revoke()
    setTimeout(() => {
        console.log(d.proxy.price)
    })
})
// Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```

### 17、反射（Reflect）

Reflect是一个内置对象，它提供拦截JavaScript操作的方法，这些方法与处理器对象的方法相同，Reflect不是一个函数对象，因此它是不可构造的。

注意：与大多数全局对象不同，Reflect没有构造函数，你不能将其与一个new运算符一起使用，或者将Reflect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）

**反射，什么是反射机制？**

Java的反射机制是在编译阶段不知道是哪个类被加载，而是在运行的时候才加载、执行。

#### Reflect.apply

`Reflect.apply(target, thisArgument, argumentsList)`

- target：目标函数
- thisArgument：target函数调用时绑定的this对象
- argumentsList：target函数调用时传入的实参列表，该参数应该是一个类数组的对象

```js
Math.floor.apply(null, [3.72]);  // 3
Reflect.apply(Math.floor, null, [3.72]);  // 3

let price = 91.5;
price = price > 100 ?  Math.floor.apply(null, [price]) : Math.ceil.apply(null, [price]);
price = Reflect.apply(price > 100 ?  Math.floor : Math.ceil, null, [price]);
```

#### Reflect.construct

Reflect.construct()方法的行为有点像new操作符构造函数，相当于运行new target(...arg)

`Reflect.construct(target, argumentsList[, newTarget])`

- target：被运行的目标函数
- argumentsList：调用构造函数的数组或伪数组
- newTarget：该参数为构造函数，参考new.target操作符，如果没有newTarget参数，默认和target一样

```js
var date = new Date();
var date1 = Reflect.construct(Date, []);
```

#### Reflect.defineProperty 和 Reflect.deleteProperty

```js
// 新增对象属性
const student = {};
const r = Reflect.defineProperty(student, 'name', { value: 'Mike'});
// student {name: "Mike"}   r true
const r = Object.defineProperty(student, 'name', { value: 'Mike'});
// student {name: "Mike"}   r {name: "Mike"}

// 删除对象属性
const obj = {x: 100, y: 200};
const r = Reflect.deleteProperty(obj, 'x');
// obj { y: 200}   r true
delete obj.x
```

#### Reflect.ownKeys()

返回目标对象自身的属性key组成的数组， 相当于
Object.getOwnPropertyNames(target) concat(Object.getOwnPropertySymbols(target) 

[对象中属性的遍历](#_6、对象中属性的遍历) 

#### 支持的方法集合

- Reflect.apply()

- Reflect.construct()


- Reflect.defineProperty()


- Reflect.deleteProperty()


- Reflect.get()


- Reflect.getOwnPropertyDescriptor()


- Reflect.getPrototypeOf()


- Reflect.has()


- Reflect.isExtensible()


- Reflect.ownKeys()


- Reflect.preventExtensions()


- Reflect.set()


- Reflect.setPrototypeOf()


### 18、模块化

 [看上面~](#_1、模块化) 

### 19、字符串、数组、对象的扩展

也在上面啦~直接整合在了字符串、数组、对象内容里面

## 其他

### 1、获得一段范围内的随机数

值 = Math.floor(Math.random()*可能值的总数+第一个可能的值)

例：选择一个1-10之间的数组

` var num = Math.floor(Math.random()*10+1)`

### 2、获取xxxx-xx-xx格式的日期

```js
function formatDate(dt) {
    if (!dt) {
        dt = new Date()
    } else {
        dt = new Date(dt);
    }
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    if (month < 10) {
        month = '0' + month;  // 强制类型转换
    }
    if (date < 10) {
        date = '0' + date; // 强制类型转换
    }
    return year + '-' + month + '-' + date;
}

var dt = new Date();
console.log(formatDate(dt));
```

### 3、将时间戳转化为自定义日期格式

**date.js**

```JavaScript
export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};
```



```JavaScript
<template>
    <!-- 过滤器  time 可以使后台得到的数据，循环出来的也行 -->
    <div>{{time | formatDate}}</div>
    <!-- 输出结果 -->
    <!-- <div>2016-07-23 21:52</div> -->
</template>
<script>
import {formatDate} from './common/date.js';
export default {
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
}
</script>
```



### 4、写一个能遍历对象和数组的通用forEach函数

```js
function forEach(obj, fn) {
    var key;
    if (obj instanceof Array) {
        obj.forEach(function (item, index) {
            fn(index, item);
        })
    } else {
        for (key in obj) {
            fn(key, obj[key]);
        }
    }
}

var arr = [1, 2, 3];
forEach(arr, function (index, item) {
    console.log(index, item);
})

var obj = {x: 100, y: 200};
forEach(obj, function (key, value) {
    console.log(key, value);
})
```

### 5、pwa

PWA全称Progressive Web App，即渐进式WEB应用。

一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用。

 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能。

### 6、**

ES7中新语法，相当于乘方

```js
console.log(Math.pow(2, 5))		// 32
console.log(2 ** 5) 			// 32
```

### 7、节流和防抖:star:

节流（Throttle）和防抖（Debounce）是两种常用的优化高频率执行JavaScript代码的技术。

#### 防抖

**防抖是指在事件被触发后延迟一段时间后再执行回调，如果在这段延迟时间内事件又被触发，则重新计算延迟时间。** 

在日常开发中，像在滚动事件中需要做个复杂计算或者实现一个按钮的防二次点击操作这些需求都可以通过函数防抖动来实现。

- 当事件触发时，相应的函数并不会立即触发，而是会等待一定的时间；
- 当事件密集触发时，函数的触发会被频繁的推迟；
- 只有等待了一段时间也没有事件触发，才会真正的执行响应函数

**应用场景**： 输入框中频繁的输入内容、频繁的点击按钮、触发某个事件、监听浏览器滚动事件，完成某些特定操作、用户缩放浏览器的resize事件等等

整体实现：

- 对于按钮防点击来说的实现：一旦我开始一个定时器，只要定时器还在，不管你怎么点击都不会执行回调函数。一旦定时器结束并设置为null，就可以再次点击了。
- 对于延时执行函数来说的实现：每次调用防抖动函数都会判断本次调用和之前的时间间隔，如果小于需要的时间间隔，就会重新创建一个定时器，并且定时器的延迟为设定时间减去之前的时间间隔。一旦时间到了，就会执行相应的回调函数。

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



#### 节流

**节流是指在一段时间内，不管事件触发了多少次，只执行一次回调。** 

防抖动和节流本质是不一样的。**防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。**比如搜索框就会用到节流。

- 如果这个事件会被频繁触发，那么节流函数会按照一定的频率来执行函数；
- 不管在这个中间有多少次触发这个事件，执行函数的频率总是固定的；

**应用场景**：搜索联想功能、鼠标移动事件、王者荣耀攻击键、点击再快也是以一定攻速(频率)进行攻击等等

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

