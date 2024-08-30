## TypeScript小记

学习中，笔记较乱，待整理

------

2020.12.04  创建文档，更新TypeScript基础

2020.12.18  理了一遍基础知识点排列顺序

2020.12.30  更新至泛型，完成ts小实践：使用 TypeScript 编写爬虫工具

2021.2.7      更新装饰器

------

参考来源：

[TypeScript中文网](https://www.tslang.cn/docs/handbook/basic-types.html)

[史上最全的TypeScript入门教程](https://blog.csdn.net/qq_40566547/article/details/100055437)

[TypeScript －系统入门到项目实战](https://coding.imooc.com/class/chapter/412.html#Anchor)



ts小实践：[使用 TypeScript 编写爬虫工具](https://github.com/csmSimona/crawler)

### 安装编译

##### 全局安装ts

```shell
npm install typescript -g
```

##### 编译成js 再执行js

```shell
tsc demo.ts
node demo.js
```

##### ts-node 直接执行

```shell
npm install -g ts-node
ts-node  demo.ts
```

##### 生成```tsconfig.json```文件，这个文件是用来将ts编译成js代码的文件

```shell
tsc --init
```



#### `tsconfig.json` ts配置文件 常用配置项说明

执行命令  `tsc` 会走tsconfig.json 编译根目录下的ts文件 

- 配置需要编译的文件(默认编译所有ts文件)

  ```json
  "include": ["./src/crawler.ts"]
  ```

  或

  ```json
  "files": ["./src/crawler.ts"]
  ```

- exclude：配置不需要编译的ts文件

  ```json
  "exclude": ["./src/crawler.ts"]
  ```

- removeComment：编译时移除注释

- noImplicitAny：不能有隐式的any

- outDir：输出文件

- rootDir：输入文件

- incremental：已编译的不会再编译，只编译新增的内容

- allowJs：编译js为es5语法

- checkJs：检查js语法

- noUnusedParameters：没有未使用的局部变量  报警告



### 基本数据类型

js基本数据类型：boolean, number, string, undefined, null, symbol, BigInt



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



```ts
// 1.布尔值
let isDone: boolean = false;
let createdByBoolean: boolean = Boolean(1);
// 注意使用构造函数 Boolean 创造的对象不是布尔值
// 事实上 new Boolean() 返回的是一个 Boolean 对象：
let createdByNewBoolean: boolean = new Boolean(1);

// 2.数值
let decLiteral: number = 6;

// 3.字符串
let myName: string = 'Tom';

// 4.null
let n: null = null;

// 5.undefined
let u: undefined = undefined;
// undefined可以赋值给任意类型
let num: number = undefined;
```



### void：空值

`void`表示没有任何返回值的函数：

```ts
function sayHello(): void {
	console.log('hello');
}
```



### any：任意值

任意值（Any）用来表示允许赋值为任意类型。 

如果是一个普通类型，在赋值过程中改变类型是不被允许的 

但如果是 any 类型，则允许被赋值为任意类型。

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型** 

切记：不要滥用any类型



### never：永远不可能执行完成

```ts
function errorEmitter(): never {
	throw new Error();
	console.log(123);
}
```



### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。 

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

**访问联合类型的属性或方法**

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，**只能访问此联合类型的所有类型里共有的属性或方法**：

```ts
// 访问不是共有的属性
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.

// 访问共有属性
function getString(something: string | number): string {
    return something.toString();
}
```



联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

上例中，第二行的 `myFavoriteNumber` 被推断成了 `string`，访问它的 `length` 属性不会报错。

而第四行的 `myFavoriteNumber` 被推断成了 `number`，访问它的 `length` 属性时就报错了。





### 类型注解

我们告诉ts，变量是什么类型

```ts
let count: number;
count = 123;
```

解构赋值类型注解

```ts
function add(
	{ first, second }: { first: number, second: number}
): number {
	return first + second;
}

const total = add({ first: 1, second: 2});
```



### 类型推断

ts会自动的去尝试分析变量的类型

如果ts能够自动分析变量类型，我们就什么也不需要做了

```ts
let countInference = 123;
```

如果ts无法分析变量类型的话，我们就需要使用类型注解

```ts
function getTotal(firstNumber: number, secondNumber) {
	return firstNumber + secondNumber;
}
const total = getTotal(1, 2);
```



**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查** 

```ts
let num;
num = 123;
num = '123';
```



**当字符串转对象时（JSON.parse），需要声明类型**

```ts
interface Person {
    name: 'string'
}
const rawData = '{"name": "dell"}';
const newData = JSON.parse(rawData);			// newData类型为any
const newData: Person = JSON.parse(rawData);  	// newData类型为Person
```



### 数组类型

```ts
// 推荐使用第一种字面量的形式
let num: number[] = [1, 2]
// 数值泛型
let str: Array<string> = ['1', '2'];
// 接口
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

```



```ts
const arr: (number | string)[] = [1, '2', 3];
const stringArr: string[] = ['a', 'b', 'c'];
const undefinedArr: undefined[] = [undefined];
```



**any 在数组中的应用**

一个比较常见的做法是，用 any 表示数组中允许出现任意类型：

```ts
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```



### 函数类型

```ts
// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
```



添加类型

 ```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
 ```

注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。

在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。



用接口定义

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```



#### 可选参数

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

注意：可选参数必须接在必需参数后面



#### 剩余参数

```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```



#### 函数重载

（个人比较疑惑这个函数重载的意义是什么）

```ts
function css(el: string, value: Object): any;

function css(el: string, value: string): any;

function css(el: string, value: any): any {
    if (typeof value === 'string') {
        console.log('传入的时string')
    } else if ((value as object)){
        console.log('传入的是对象')
    }
}
```

前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。



### 接口

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。 

#### 什么是接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于**对类的一部分行为进行抽象**以外，也常用于对「对象的形状（Shape）」进行描述。

#### 可选类型

```ts
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```



#### 任意属性

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```



**注意：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集** 

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

// 任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以会报错
let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```



#### 只读属性

```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
// 会报错
tom.id = 9527;
```



#### 可索引接口

 可索引接口主要是对数组或对象的key和value做出约束 

```ts
// 可索引接口（对数组的约束）
interface UseArr {
    [index: number]: string 
    // 索引是number类型，索引值是string类型
}
// 对对象的约束
interface UseObj {
    [index: string]: number 
    // 索引是string类型（重要），索引值number类型（或其他类型）
}

let obj: UseObj = {
    name: 1
};

let arr: UseArr = ['234'];
```



#### 类实现接口

```ts
//	接口在定义的时候，不能初始化属性以及方法，属性不能进行初始化，方法不能实现方法体。
interface Ali{
  pay(): void
  payName: string
}
interface Tence{
  payNumber(): void
  name: string
}

//	类实现接口之后，必须声明接口中定义的属性以及方法。
class mySelf implements Ali, Tence{
  pay(){

  } 
  payName: string
  payNumber(){

  }
  name: string
}
```



#### 接口继承接口

```ts
interface Shape{
    color: string;
}
interface Square extends Shape{
    sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;
```



#### 接口继承类

```ts
// 将Point当做一个类型来用
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```



### 类

#### ES6中类的用法

基本概念可以看这里 :point_right: [ES6 中类的用法](https://csmsimona.github.io/myDocs/#/zh-cn/前端基础汇总/JavaScript小记?id=_13%e3%80%81class)



**当父类的方法被重写时，可以用super调用父类原来的那个方法**

```js
class Person {
    name = '张';
	getName() {
        return this.name;
    }
}

class Teacher extends Person {
    getTeacherName() {
        return 'Teacher';
    }
    getName() {
        return super.getName() + '三'
    }
}
```





#### TypeScript 中类的用法

##### 类的访问类型

```ts
// private, protected, public 访问类型
// public 允许在类的内外被调用
// private 允许在类内被使用
// protected 允许在类内及继承的子类中使用
class Person {
    private name: string;
    protected job: string;
    public sayHi() {
        this.name;
        this.job;
        console.log('hi');
    }
}

class Teacher extends Person {
    this.sayHi();
    public sayBye() {
        this.name;	// 报错
        this.job;
    }
}
```



##### 构造器constructor

构造器constructor的执行时间是在 new的一瞬间

```ts
class Person {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
}
const person = new Person('张三')
```



constructor的传统写法和简化写法

```ts
class Person {
    // 传统写法
    // public name: string;
    // constructor(name: string) {
    //     this.name = name;
    // }
    // 简化写法
    constructor (public name: string) {}
}
```



super调父类的构造函数并传值

```ts
class Person {
    constructor(public name: string) {}
}

class Teacher extends Person {
    constructor(public age: number) {
        super('张三')	// super调父类的构造函数并传值
    }
}
const teacher = new Teacher(28)
```



##### 抽象类

1、抽象类不能被直接实例化，要被类继承使用

2、 抽象类中的抽象方法必须被子类实现

```ts
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat('Tom');
```



##### ts实现单例模式

```ts
class Demo {
    private static instance: Demo;
    private constructor(public name: string) {}
    
    static getInstance() {
        if (!this.instance) {
            this.instance = new Demo('张三');
        }
        return this.instance;
    }
}

const demo1 = Demo.getInstance()	
const demo2 = Demo.getInstance()
console.log(demo1 === demo2);  // true
```



### 类型断言

语法：

值 as 类型   或  <类型>值



#### 将一个联合类型断言为其中一个类型

用于解决 **访问联合类型里不是共有的属性或方法会报错** 的问题（类型保护）

```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```



#### 将一个父类断言为更加具体的子类

```ts
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```



#### 将任何一个类型断言为any

不能滥用！

`window` 上添加一个属性 `foo`，但 TypeScript 编译时会报错，提示我们 `window` 上不存在 `foo` 属性。

此时我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型：

```ts
window.foo = 1 				// 报错
(window as any).foo = 1;
```



#### 将 any 断言为一个具体的类型

一般用于优化历史遗留代码， 通过类型断言及时的把 `any` 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展 

```ts
// 原来返回值是any
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

// 断言成Cat类型
const tom = getCacheData('tom') as Cat;
tom.run();
```



也可以用 [泛型](#_泛型) 来解决这个问题

```ts
function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```



### type alias 类型别名

常用于联合类型

```ts
type User = {
    name: string;
    age: number;
};


type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```



还可以用  type 定义一个字符串字面量类型  

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```



**类型别名和接口的区别**

类型别名可以代表基础类型  接口不可以

```ts
interface Person {
    name: string;
}
type Person = string;
```



### 元组 （Tuple） 

其实元组类型是数组类型的子集。 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。 



```ts
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');		// 元组数据量不能多也不能少
tom.push(true);			// 不能添加元组中定义类型以外的类型数据
```



**用于csv或excel导出数据形式时**

```ts
// 元组 tuple
const teacherInfo: [string, string, number] = ['Dell', 'male', 18];
// csv
const teacherList: [string, string, number][] = [
    ['dell', 'male', 19],
    ['sun', 'female', 26],
    ['jeny', 'female', 38]
]
```



### 枚举类型

枚举类型是一种特殊的类型，主要用于状态码的取值

默认情况下，每一个元组key的value都是number，而且是从0开始计，而且都可以被指定新的value。
  但是我们可以认为改变这个value，value的改变规则如下：

1. 将第一个改变为number类型时，第二个以及以后的key他的value紧接着第一个key的value+1
2. 将第一个改变为string类型时，第二个必须指定为number类型或一个string类型，若指定为string类型，第三个和第二个的情况一样，依此类推。
3. 类似其他情况与第二种情况一样，若某一个改变为string类型其下一个的value必须指定为number或string，依此类推。

[直接看这里吧](https://ts.xcatliu.com/advanced/enum.html)

枚举成员会被**赋值为从 0 开始递增的数字**，同时也会对枚举值到枚举名进行**反向映射**

**不仅可以取得他的key，而且可以取得他的value**，不必像对象那样进行Object.keys操作

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

事实上，上面的例子会被编译为：

```js
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```





### 泛型（Generics）

#### 基本概念

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。 

```ts
function join<T>(first: T, second: T) {
    return  `${first}${second}`;
}
function map<T>(params: T[]) {
    return params;
}
// T[] <==> Array<T>

join<number>(1, 1);
map<string>(['123'])
```



#### 多个类型参数

```ts
function join<T, P>(first: T, second: P) {
    return `${first}${second}`;
}

join<number, string>(1, '2');

```



#### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

 这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束： 

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```



#### 类中泛型的使用

```ts
class DataManager<T> {
    constructor(private data: T[]) {}
    getItem(index: number): T {
        return this.data[index];
    }
}
const data = new DataManager<string>(['1']);
data.getItem(0);
```



#### 泛型中keyof语法的使用

因为类型除了string，number等类型，也可以是一个具体的值/字符串

```typescript
type T = 'age'
key: 'age'
Person['age']

class Teacher {
    constructor(private info: Person) {}
    getInfo<T extend keyof Person>(key: T): Person[T] {
        return this.info[key];
    }
}
```



### 模块化

各种模块化 :point_right: [模块化](https://csmsimona.github.io/myDocs/#/zh-cn/前端基础汇总/JavaScript小记?id=%e6%a8%a1%e5%9d%97%e5%8c%96)

ts中模块化规则与ES6一致



### 命名空间（namespace）

假设这么一个情况，我们有多人在开发一个ts项目，那么就必然会存在函数或者方法重名的情况。这个时候我们就需要命名空间来解决这一问题。

命名空间关键字是`namespace`，并且支持命名空间的导入和导出，并且在命名空间内部的属性必须通过`export`才能够实现命名空间的调用 



#### 命名空间的拆分

**namespace2.ts中有一个和namespace1.ts同名的命名空间时，相当于一个命名空间分布在两个ts文件中，共享一个命名空间** 

 *namespace1.ts*

```ts
namespace Shape {
    const pi = Math.PI
    // 全局可见
    export function circle(r: number){
        return pi * r ** 2
    }
}
```

*namespace2.ts*

```ts
namespace Shape {
    export function square(x: number){
        return x * x
    }
}
```



#### 命名空间的使用

直接使用命名空间名称进行访问即可

```js
// 命名空间
namespace Shape {
    export function square(x: number){
        return x * x
    }
}

console.log(Shape.circle(1))    // namespace1.ts
console.log(Shape.square(1))    // namespace2.ts
```



如果 namespace2.ts引用namespace1.ts ，需要使用三斜线指令

```text
/// <reference path="引用文件的相对路径">
```



```js
/// <reference path="namespace.ts"/>

// 命名空间
namespace Shape {
    export function square(x: number){
        return x * x
    }
}

console.log(Shape.circle(1))    // namespace1.ts
console.log(Shape.square(1))    // namespace2.ts
```



如何要在html中引入 typescript 编译后的 js文件，需要把这两个文件都引入。

```html
<body>
    <div class="app"></div>
    <script src="src/namespace.js"></script>
    <script src="src/namespace2.js"></script>
</body>
```

或者编辑tsconfig.json文件，编译在一个js文件中

```json
"module": "amd"
"outFile": "./build/page.js"
```

```html
<script src="./build/page.js"></script>
```



#### 命名空间的别名

在引用命名空间时，可以通过import关键字起一个别名

biology.ts

```js
namespace Biology {
     export interface Animal {
         name: string;
         eat(): void;
     }
 }
```



```js
/// <reference path="biology.ts" />

import bio_other = Biology;     // 别名
```



### 装饰器

- 装饰器本身是一个函数

- 装饰器通过@符号来使用

- 装饰器在类定义的时候执行

- 装饰器后定义先执行：

  1、有多个参数装饰器时：从最后一个参数依次向前执行

  2、方法和方法参数中参数装饰器先执行。

  3、类装饰器总是最后执行。

  4、方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行。

  

#### 类的装饰器

```typescript
function testDecorator() {
    return function(constructor: any) {
        constructor.prototype.getName = () => {
            console.log('decorator')
        }
    }
}

@testDecorator()
class Test {}
```



##### 装饰器先定义后执行

```typescript
function testDecorator(constructor: any) {
    console.log('decorator')
}
function testDecorator1(constructor: any) {
    console.log('decorator1')
}

@testDecorator @testDecorator1 class Test {}

const test = new Test();
test();

// decorator1
// decorator
```



##### 装饰器传值

```typescript
function testDecorator(flag: boolean) {
    if (flag) {
        return function(constructor: any) {
            constructor.prototype.getName = () => {
                console.log('decorator')
            }
        }
    } else {
        return function(constructor: any) {}
    }
}

@testDecoraot(false)
class Test{}
```



##### 更优写法

工厂模式包裹，构造函数形式

装饰器装饰过后的类 test.getName() 有提示了

```typescript
function testDecorator() {
    return function<T extends new (...args: any[]) => any>(constructor: T) {
        return class extends constructor {
            name = 'ccc';
            getName() {
                return this.name;
            }
        };
    };
}

const Test = testDecorator() {
    class {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
}

const test = new Test('csm');
console.log(test.getName());		// csm
```





#### 方法的装饰器


方法装饰会在运行时传入下列3个参数：

- target：对于静态方法是类的构造函数，对于普通方法是类的原型对象。
- key：方法的名字。
- descriptor：成员的属性描述符。

```typescript
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // console.log(target, key);
  // descriptor.writable = true;		// 设置后修改内容编译报错
  descriptor.value = function() {
    return 'decorator';
  };
}

class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }
}

const test = new Test('csm');
console.log(test.getName());	// decorator
```



#### 访问器的装饰器

入参与方法的装饰器类似

```typescript
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor.writable = false;
}

class Test {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  @visitDecorator
  set name(name: string) {
    this._name = name;
  }
}

const test = new Test('ccc');
test.name = 'csm';
console.log(test.name);
```



#### 属性的装饰器

```typescript
// 修改的并不是实力上的name，而是原型上的name
function nameDecorator(target: any, key: string): any {
    target[key] = 'csm'
}
// name 放在实例上
class Test {
    @nameDecorator
    name = 'ccc';
}
const test = new Test();
console.log(test.name);						// ccc
console.log((test as any).__proto__.name);	// csm
```



#### 参数装饰器

参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

- target：对于静态方法是类的构造函数，对于普通方法是类的原型对象。
- method：参数的名字。
- paramIndex：参数在函数参数列表中的索引。

```typescript
function paramDecorator(target: any, method: string, paramIndex: number) {
    console.log(target, method, paramIndex);
}

class Test {
    getInfo(name: string, @paramDecorator age: number) {
        console.log(name, age);
    }
}

const test = new Test();
test.getInfo('csm', 18);

// Test { getInfo: [Function] } getInfo 1
// csm 18
```



#### 装饰器实际使用的小例子——解决try catch反复编写的问题

 ```typescript
const userInfo: any = undefined;

function catchError(msg: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function() {
      try {
        fn();
      } catch (e) {
        console.log(msg);
      }
    }
  }
}

class Test {
  @catchError('userInfo.name 不存在')
  getName() {
    return userInfo.name;
  }
  @catchError('userInfo.age 不存在')
  getAge() {
    return userInfo.age;
  }
  @catchError('userInfo.gender 不存在')
  getGender() {
    return userInfo.gender;
  }
}

const test = new Test();
test.getName();		// userInfo.name 不存在
test.getAge();		// userInfo.age 不存在
test.getGender()	// userInfo.gender 不存在
 ```



### 迭代器、生成器



### 声明文件

[声明文件](https://ts.xcatliu.com/basics/declaration-files.html)























