# SVG入门

参考文章：[案例+图解带你一文读懂SVG](https://juejin.cn/post/7124312346947764260)

### 介绍

SVG 是 Scalable Vector Graphics 的缩写，意为可缩放矢量图形。



### 优点

- SVG 与 JPEG 和 GIF 图像比起来，尺寸更小，且可压缩性更强。

- SVG图像中的文本是可选的，同时也是可搜索的，且可以与 JavaScript 技术一起运行

- SVG可在图像质量不下降的情况下被放大和缩小

- SVG可被非常多的工具读取和修改（比如文本编辑器）

- SVG图像不依赖分辨率，可在任何的分辨率下被高质量地打印

  

### 缺点

- SVG复杂度越高渲染速度就会越慢（任何过度使用DOM的应用都不快）

- SVG不适合游戏应用，只能结合Canvas来实现

- SVG不能动态的修改动画内容



### 基本使用

```html
  <svg width="300" height="300">
    <circle cx="100" cy="100" r="50"/>
  </svg>
```

SVG的绘制其实就是一个SVG标签，然后在标签内绘制你要绘制的内容，比如上面的语法是在SVG标签中绘制了一个圆形(cx、cy为圆的坐标，r为圆的半径)



**svg基本属性**

- width、height：SVG的宽高（默认为300 * 150，当内部元素大于300 * 150时，大于部分会被隐藏）

- viewBox：SVG中可以显示的区域

  语法：`viewBox="x y w h"` x、y为起始点，w、h为显示区域的宽高。

  ```html
  <svg width="300" height="300" viewBox="0 0 100 100">
      <circle cx="100" cy="100" r="100"/>
    </svg>
  ```

  上例中viewBox定义了从（0, 0）点开始，宽高为100 * 100的显示区域，然后再把这个显示区域放大到300*300的SVG中显示。

- xmlns和xmlns:xlink

  > 在XML中，标签和属性属于命名空间，这是为了防止来自不同技术的标签和属性发生冲突。例如在SVG中存在a标签，在HTML中也存在a标签，那么怎么区分这个a标签属于哪一种技术，这就需要使用命名空间了。 加入命名空间以后我们就能知道哪一个是svg:a，哪一个又是html:a，这样我们就可以区分出不同的标签和属性。
  >
  > xmlns用于声明命名空间（namespace），在此声明之下的所有子标签都属于这个空间内。这里看起来是一个url，但实际上仅仅是一个字符串，这样使用只是惯例。因此很多时候都会被称为”namespace url” 而不是”namespace name”。
  >
  > 当我们在SVG中加入xmlns时，因为它定义了默认命名空间，因此不需要前缀，我们直接在SVG标签中写一个a标签，a标签和UA就知道它是SVG的a标签而不是HTML的a标签
  >
  > xmlns:xlink 表示前缀为xlink的标签和属性，应该由理解该规范的UA 使用xlink规范 来解释。
  >
  > 注解：UA是User Agent的简称。User Agent是Http协议中的一部分，属于头域的组成部分。通俗地讲UA是一种向访问网站提供你所使用的浏览器类型、操作系统、浏览器内核等信息的标识。通过这个标识，用户所访问的网站可以显示不同的排版，从而为用户提供更好的体验或者进行信息统计。

  因为SVG 使用 XML 格式定义图形，所以SVG文件是纯粹的XML文件

  ```html
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      // ......
  </svg>
  ```

  



### 绘制基本图形

#### 1、圆形（circle）

属性：cx、cy为圆的坐标，r为圆的半径

```html
<svg width="300" height="300">
    <circle cx="100" cy="100" r="100"/>
  </svg>
```



#### 2、矩形（rect）

属性：x、y为矩形的起始点坐标， width、height为矩形的宽高，rx、ry为圆角x、y轴方向的半径

```html
<svg width="300" height="300">
    <rect x="0" y="0" width="300" height="200" rx="5" ry="5"/>
  </svg>
```



#### 3、椭圆（ellipse）

属性：cx、cy为椭圆的坐标，rx为椭圆的x轴半径、ry为椭圆的y轴半径

```html
<svg width="300" height="300">
    <ellipse cx="100" cy="100" rx="100" ry="50"/>
  </svg>
```



#### 4、线条（line）

属性：x1、y1为起点的坐标，x2、y2为终点的坐标

```html
<svg width="300" height="300">
    <!-- 不设置样式属性 style 是看不出效果的 -->
    <line x1="50" x2="50" y1="200" y2="50" style="stroke: #000000;"/>
  </svg>
```



#### 5、折线（polyline）

polyline标签可以把很多个点链接在一起成为一条折线。

属性：points为点集数列，其中每个点都必须包含2个数字，一个是x坐标，一个是y坐标。

```html
<svg width="300" height="300">
    <!-- 不设置样式属性style是看不出效果的 并且polyline默认为填充需要把fill属性设置为none -->
    <polyline points="0 0, 20 40, 70 80, 100 90, 200 30, 250 50" fill="none" style="stroke: #000000;" />
  </svg>
```

polyline默认为填充，需要把fill属性设置为none，再设置stroke样式



#### 6、多边形（polygon）

polygon标签和polyline标签的区别是polygon路径中的最后一个点和第一个点是默认闭合的。

属性：points为点集数列，其中每个点都必须包含2个数字，一个是x坐标，一个是y坐标。

```html
<svg width="300" height="300">
    <!-- 不设置样式属性style是看不出效果的 并且polygon默认为填充需要把fill属性设置为none -->
    <polygon points="0 0, 20 40, 70 80, 100 90, 200 30, 250 50" fill="none" style="stroke: #000000;" />
  </svg>
```



#### 7、路径（path）

path标签是所有图形中最复杂的，但他也是最强大的。在SVG中最常用的图形就是path标签，他可以绘制圆形、椭圆、矩形、线条、折线、多边形、贝塞尔曲线等。

属性：d为一个点集数列以及其它绘制路径的信息。

```html
<svg width="300" height="300">
    <path d="M50 50 H 200 V 200 H 50 L 50 50" fill="none" style="stroke: #000000;"/>
  </svg>
```

path标签的图形形状是通过属性d来定义的，属性d的值是以：命令 + 参数 的形式进行组合的，命令又是通过关键字来表示的。



**命令：**

以下所有命令中大写为绝对定位，小写为相对定位



##### M = Move to

M命令其实就是把画笔移动到某个点，就好像画笔提起来以后移动到一个新的位置准备开始绘制。但因为仅仅是移动画笔而没有绘制，所以M命令经常出现在路径的起始点，用来指明画笔应该从何处开始绘制。

每一段路径都必须以M命令开头，如果有多个M命令则表示新路径的开始。

语法：`M x y 或者 m x y`



##### L = Line to

L命令会绘制一点并且和之前的点（也就是L命令前面的点）连成一条直线。

语法：`L x y 或者 l x y`

注意：

1.M命令为多个时，后面的M命令为新线段的起始点

2.M命令后面连续跟着多个坐标点，除了第一个坐标点，后面的全部默认为隐式的L命令

3.多个L命令连续可以省略后面的L命令

```html
<svg width="300" height="300">
    <!-- 从起始点（50， 20）画一条到（250， 20）的直线 -->
    <path d="M50 20 L250 20" style="stroke: #000000;"/>
      
    <!-- 从起始点（50， 50）画一条到（250， 50）的直线 和 从起始点（50， 100）画一条到（250， 100）的直线 -->
    <path d="M50 50 L250 50 M50 100 L250 100" style="stroke: #ff0000;"/>
      
    <!-- 从起始点（50， 150）画一条到（250， 150）的直线 -->
    <path d="M50 150 250 150" style="stroke: #00ff00;"/>
      
    <!-- 从起始点（50， 200）画一条到（250， 200）又到（250，250）的折线 -->
    <path d="M50 200 L250 200 250 250 " fill="none" style="stroke: #0000ff;"/>
  </svg>
```



##### H = Horizontal Line to

H命令可以从之前的点绘制一条水平的直线，H命令可以等价于y值和之前点相同的L命令

语法：`H x 或者 h x`

```html
<svg width="300" height="300">
    <!-- 从起始点（50， 20）画一条X轴为250的水平直线 -->
    <path d="M50 20 H250" style="stroke: #000000;"/>
  </svg>
```



##### V = Vertical Line to

V命令可以从之前的点绘制一条垂直的直线，V命令可以等价于x值和之前点相同的L命令

语法：`V y 或者 v y`

注意：连续的H命令和V命令取大值

```html
<svg width="300" height="300">
    <!-- 从起始点（50， 20）画一条Y轴为250的垂直直线 -->
    <path d="M50 20 V250" style="stroke: #000000;"/>
  </svg>
```



##### Z = close path

Z命令是一个闭合命令，他会从当前点画一条直线到路径的起始点。
Z命令因为没有参数所以Z和z效果一样，所以不区分大小写，

语法：`Z 或者 z`

```html
<svg width="300" height="300">
    <path d="M50 20 H200 V200 Z" fill="none" style="stroke: #000000;"/>
  </svg>
```



##### Q = Quadratic Bezier Curve to

Q命令可以用来绘制一条二次贝塞尔曲线，二次贝塞尔曲线需要一个控制点，用来确定起点和终点的曲线斜率。

语法：`Q x1 y1, x y 或者 q x1 y1, x y`

参数：x1、y1为控制点，x、y为终点位置。

注意：起点就是M命令

```html
<svg width="300px" height="300px">
    <path d="M50 100 Q 175 200 300 100" fill="none" style="stroke: #ff0000;"/>
  </svg>
```



##### T = Smooth Quadratic Bezier Curve to

T命令是一个延长二次贝塞尔曲线的简化命令，T命令可以通过前一个控制点推断出后一个控制点，这也就是为什么T命令只需要一个坐标的原因。

语法：`T x y 或者 t x y`

参数：x、y为终点位置。

注意：T命令的的前面必须有一个Q命令或者其他的T命令。如果T命令单独使用，那么控制点就会被认为和终点是同一个点，所以画出来的将是一条直线。

```html
<svg width="600px" height="300px">
    <path d="M50 100 Q 175 200 300 100 T 600 100 " fill="none" style="stroke: #ff0000;"/>
  </svg>
```



##### C = Curve to

C命令可用来绘制一条三次贝塞尔曲线，相对于二次贝塞尔曲线多了一个控制点。

语法：`C x1 y1, x2 y2, x y 或者 c x1 y1, x2 y2, x y`

参数：x1、y1为曲线起始点的控制点，x2、y2为曲线终止的控制点，x、y为终点位置。

```html
<svg width="300" height="300">
    <path d="M50 200 C 100 250, 200 150, 250 200" fill="none" style="stroke: #ff0000;"/>
  </svg>
```



##### S = Smooth Curve to

三次贝塞尔曲线的S命令和二次贝塞尔曲线的T命令比较相似。S命令也可以用来创建与前面一样的贝塞尔曲线，但如果S命令跟在一个C命令或者另一个S命令的后面，那么它的第一个控制点，就会被假设成前一个控制点的对称点。

如果S命令单独使用，前面没有C命令或者另一个S命令，那么它的两个控制点就会被假设为同一个点。

语法：`S x2 y2, x y 或者 s x2 y2, x y`

参数：x2、y2为曲线终止的控制点，x、y为终点位置。

```html
<svg width="300px" height="300px">
    <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" fill="none" style="stroke: #ff0000;"/>
  </svg>
```

三次贝塞尔曲线相对于二次贝塞尔曲线拥有更大的自由度，但两种曲线能达到的效果是差不多的。最终选择使用哪种贝塞尔曲线，通常取决于需求，以及对曲线对称性的依赖程度。



##### A = Elliptical Arc

A命令用于画弧形，它可以截取圆或椭圆的弧形成的曲线

语法：` A rx ry x-axis-rotation large-arc-flag sweep-flag x y 或者 a rx ry x-axis-rotation large-arc-flag sweep-flag x y`

参数：

- rx、ry分别为X轴的半径和Y轴的半径
- x-axis-rotation为弧度在X轴的旋转角度
- large-arc-flag决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧
- sweep-flag为弧的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧
- x、y为弧形的终点

```html
<svg width="300px" height="1000px">
    <path d="M50 100 A 30 50 0 0 1 150 100" fill="none" style="stroke: #ff0000"/>
  </svg>
```



### 绘制文字

```html
<svg width="300" height="300">
    <text x="50" y="50">Hello Svg !</text>
  </svg>
```

属性：

#### x和y

x和y属性决定了文字的绘制起点。如上面的例子我们就是从坐标（50,50）的位置开始绘制的文字。

但需要注意的是x和y的值可以是一个数列。如果设置为了一个数列则会应用到每一个字符上

```html
<svg width="300" height="300">
    <text 
      x="30 60 90 120 150 180 210 240 270" 
      y="60 90 120 150 180 150 120 90 60"
      fill="#f00" 
      stroke="#0f0" 
      font-size="50"
      font-weight="bold" >
      Hello Svg !
    </text>
  </svg>
```



#### dx和dy

dx和dy属性与x和y属性不同的是，x和y属性是绝对的坐标，而dx和dy属性是相对于当前位置的偏移量。

参数也可以是一个数列。如果设置为了一个数列则会应用到每一个字符上

```html
<svg width="500" height="500">
    <text 
      dx="50 10 10 10 10 10 10 10 10" 
      dy="50 20 -20 20 -20 20 -20 20 -20" 
      fill="#f00" 
      stroke="#0f0" 
      font-size="50"
      font-weight="bold" >
      Hello Svg !
    </text>
  </svg>
```



#### rotate

rotate属性可以把文字旋转一个角度

同样的参数也可以是一个数列。如果设置为了一个数列则会应用到每一个字符上



#### textLength

textLength属性给定了一个字符串的计算长度。在文字的长度和textLength属性给定的长度不一致的情况下渲染引擎会精细调整字型的位置。

```html
<svg width="550" height="500">
    <text x="50" y="50" textLength="150" fill="#f00" stroke="#0f0" font-size="50"font-weight="bold" >
      Hello Svg !
    </text>
    <text  x="50" y="100" textLength="500" fill="#f00" stroke="#0f0" font-size="50" font-weight="bold" >
      Hello Svg !
    </text>
  </svg>
```



#### lengthAdjust

lengthadjust属性可以控制文本以什么方式伸展到由*textLength*属性定义的长度。

- spacing：只拉伸或压缩间距（文字不变形）
- spacingAndGlyphs：同时拉伸或压缩间距和文字本身（文字变形）



#### fill和stroke

填充和轮廓也都可以应用于文字



#### CSS文字属性

一些CSS中的文字样式属性同样也可以应用于SVG的文字中。比如上面例子中我们用到的文字加粗：font-weight 还有很多属性同样也适用，例如：font-size、font-family、font-style、font-variant、font-stretch、font-size-adjust、kerning、letter-spacing、word-spacing、text-decoration等。



#### tspan

tspan标签和text标签一样都可以用来添加文字，但不同的是tspan标签的作用为标记大块文本内的部分内容。比如一段文本其中某个字需要加粗或者颜色不一致，就可以用到tspan标签。

tspan标签的属性和text标签一致，上面说道的text标签的属性在tspan标签中也适用。

需注意的是tspan标签必须是一个text元素的子元素或别的子元素tspan的子元素。

```html
<svg width="550" height="500">
    <text x="50" y="50" fill="#f00" stroke="#0f0" font-size="50" >
      Hello <tspan fill="#f0f" font-weight="bold"> 小 </tspan> Svg !
    </text>
  </svg>
```



#### textPath

textPath标签可以利用它的xlink:href属性取得一个任意路径，并且可以让字符顺着路径渲染。

在路径上绘制文字：

1、创建一条path路径，设置id

2、创建textPath路径文字，并指定对应的xlink:href属性

```html
 <svg width="600" height="500">
    <path id="pathM" d="M 50 50 100 100 200 50 300 100" fill="none" />
    <path id="pathQ" d="M50 100 Q 175 200 300 100 T 600 100" fill="none" />
    <text>
      <textPath xlink:href="#pathM"> Welcome to the world of SVG ! </textPath>
    </text>
    <text>
      <textPath xlink:href="#pathQ"> Welcome to the world of SVG ! Welcome to the world of SVG ! </textPath>
    </text>
  </svg>
```





### 填充和轮廓

#### fill

fill属性用于填充图形的颜色

语法：`fill= "color" 或者 style="fill: color"`

注意：默认为黑色的填充，去除默认填充： `fill='none'` 

#### fill-opacity

fill-opacity属性用于设置填充颜色的透明度

#### fill-rule

（其实没理解，但是用的不多）

fill-rule属性用来设置复杂形状的填充规则。它有两种填充方式：nonzero 和 evenodd。 该属性简单说就是判断某点属于该形状的“内部”还是“外部”。

##### nonzero

nonzero为默认值，规则为：要判断一个点是否在图形内，从该点作任意方向的一条射线，然后检测射线与图形路径的交点情况。从0开始计数，路径从左向右（顺时针）穿过射线则计数加1，从右向左（逆时针）穿过射线则计数减1。得出计数结果后，如果结果是0，则认为点在图形外部，否则认为在内部。

##### evenodd

规则为：要判断一个点是否在图形内，从该点作任意方向的一条射线，然后检测射线与图形路径的交点的数量。如果结果是奇数则认为点在内部，是偶数则认为点在外部。



#### stroke

stroke属性用来定义线条、文本或元素轮廓的颜色。

语法：`stroke="color" 或者 style="stroke: color"`

注意：默认黑色



#### stroke-width

stroke-width属性定义了轮廓的宽度



#### stroke-opacity

stroke-opacity属性用于设置轮廓的透明度



#### stroke-linecap

stroke-linecap属性定义了轮廓终点的形状，该属性有三个值：

- butt：默认值，以直边结束线段
- round：以圆角结束线段，圆角的半径由stroke-width（轮廓宽度）控制的
- square：也是以直边结束线段，但和butt不同的是会在结束位置多出一段由stroke-width（轮廓宽度）大小控制的长度。

```html
<svg width="300" height="200">
    <g fill="#ffff00" stroke="#ff0000" stroke-width="10">
      <path stroke-linecap="butt" d="M20 50 l200 0" />
      <path stroke-linecap="round" d="M20 100 l200 0" />
      <path stroke-linecap="square" d="M20 150 l200 0" />
    </g>
  </svg>
```



#### stroke-linejoin

stroke-linejoin属性定义了轮廓连接处的样式。样式有三种类型：

- miter：默认值，表示用方形画笔在连接处形成尖角
- round：用圆角连接，实现平滑效果
- bevel：连接处会形成一个斜面

```html
<svg width="160" height="280">
    <g fill="none" stroke="#ff0000" stroke-width="20">
      <path d="M40 60 80 20 120 60" stroke-linecap="butt"  stroke-linejoin="miter" />
      <path d="M40 140 80 100 120 140" stroke-linecap="round"  stroke-linejoin="round" />
      <path d="M40 220 80 180 120 220" stroke-linecap="square"  stroke-linejoin="bevel" />
    </g>
  </svg>
```



#### stroke-dasharray

stroke-dasharray属性可以定义轮廓为虚线

语法：`stroke-dasharray="xxx"`

参数：xxx为一列数字字符串，对应的是：线段 空格 线段 空格......

```html
<svg width="300" height="300">
    <g fill="#ffff00" stroke="#ff0000" stroke-width="5">
      <path d="M20 50 l200 0" />
      <path stroke-dasharray="5, 10" d="M20 100 l200 0" />
      <path stroke-dasharray="5, 10, 5" d="M20 150 l200 0" />
      <path stroke-dasharray="10, 5, 20" d="M20 200 l200 0" />
    </g>
  </svg>
```



#### stroke-dashoffset

stroke-dashoffset 属性用于指定路径开始的距离。值可为正值、负值、百分比。

```html
<svg width="300" height="300">
    <g fill="#ffff00" stroke="#ff0000" stroke-width="5" stroke-dasharray="20">
      <path d="M50 50 l200 0" />
      <path d="M50 100 l200 0" stroke-dashoffset="10" />
      <path d="M50 150 l200 0"  stroke-dashoffset="1%" />
      <path d="M50 200 l200 0" stroke-dashoffset="-10" />
    </g>
  </svg>
```



#### stroke-miterlimit

（这个也不太理解，好像一般也不会用到）

如果两条线交汇在一起形成一个尖角，而且属性 **stroke-linejoin** 指定了 **miter**，斜接有可能扩展到远远超过路径轮廓线的线宽。属性 **stroke-miterlimit** 对斜接长度和**stroke-width**的比率强加了一个极限。当极限到达时，交汇处由斜接变成倒角。

```html
 <svg width="200" height="500">
    <g fill="none" stroke="#ff0000" stroke-width="20">
      <path d="M40 60 80 20 120 60 120 20 150 70" stroke-linejoin="miter" stroke-miterlimit="1" />
      <path d="M40 140 80 100 120 140 120 100 150 150" stroke-linejoin="miter" stroke-miterlimit="2" />
      <path d="M40 220 80 180 120 220 120 180 150 230" stroke-linejoin="miter" stroke-miterlimit="3" />
      <path d="M40 300 80 260 120 300 120 260 150 310" stroke-linejoin="miter" stroke-miterlimit="4" />
      <path d="M40 380 80 340 120 380 120 340 150 390" stroke-linejoin="miter" stroke-miterlimit="5" />
    </g>
  </svg>
```



### 渐变

需要接触两个新的标签：

- defs标签用来定义渐变
- stop标签用来定义渐变的颜色坡度，具有三个属性：offset定义渐变开始和结束的位置、stop-color（定义颜色）和stop-opacity（定义透明度）



#### 线性渐变

线性渐变（linearGradient）就是沿直线改变颜色。

语法：

```html
<linearGradient x1="" y1="" x2="" y2="">
  <stop offset="0%"/>
  ...
  <stop offset="20%"/>
  ...
  <stop offset="100%"/>
</linearGradient>
```

参数：x1、y1定义线性渐变的起点， x2、y2定义渐变的终点。



```html
<svg width="500" height="400">
    <defs>
      <linearGradient id="linearGradient" x1="0" y1="0" x2="100%" y2="0">
        <stop offset="0%" stop-color="rgb(255,255,0)"  />
        <stop offset="100%" stop-color="rgb(255,0,0)" />
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="70" rx="100" ry="50" fill="url(#linearGradient)" />
  </svg>
```



#### 径向渐变

径向渐变（radialGradient）其实就是以一个点做放射性的渐变。

语法：

```html
<radialGradient cx="" cy="" r="" fx="" fy="">
  <stop offset="0%"/>
  ...
  <stop offset="20%"/>
  ...
  <stop offset="100%"/>
</radialGradient>
```

参数： cx、cy、r分别为圆的坐标和半径，也就是渐变的范围，fx、fy定义渐变的中心点，也叫渐变的焦点。



```html
<svg width="500" height="400">
    <defs>
      <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="rgb(255, 255, 0)" />
        <stop offset="100%" stop-color="rgb(255, 0, 0)" />
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="100" rx="100" ry="50" fill="url(#radialGradient)" />
  </svg>
```



### 裁剪和蒙层

#### 裁剪

裁剪的功能主要是使用`clipPath`标签定义一条裁剪路径，然后用来裁剪掉元素的部分内容。且任何透明度的效果都是无效的，它只能要么裁剪掉要么不裁剪。

示例：

```html
<svg width="300" height="300">
  <defs>
    <clipPath id="clipPath">
      <path d="M10 50 A50 50 0 0 1 100 50 A50 50 0 0 1 190 50 Q210 100 100 200  Q-5 100 10 50 Z" />
    </clipPath>
  </defs>

  <rect x="0" y="0" width="200" height="200" fill="#f00" clip-path="url(#clipPath)"  />
</svg>
```



#### 蒙层

蒙层的功能主要实现标签就是`mask`标签，他的功能和名字正好相反，他不是用来遮住元素的部分内容，而是用来显示元素中`mask`标签遮住的内容。 他和`clipPath`标签不同的是他允许使用透明度（透明度为0则无蒙层效果）和灰度值遮罩计算得的软边缘

示例：

```html
<svg width="300" height="300">
  <defs>
    <mask id="Mask">
      <path d="M10 50 A50 50 0 0 1 100 50 A50 50 0 0 1 190 50 Q210 100 100 200  Q-5 100 10 50 Z" fill="#fff" fill-opacity="0.5" />
    </mask>
  </defs>

  <rect x="0" y="0" width="200" height="200" fill="#f00" mask="url(#Mask)" />
</svg>
```



### 动画

#### GSAP

[GreenSock](https://link.juejin.cn?target=https%3A%2F%2Fgreensock.com%2F) 动画平台 (GSAP) 是一个业界知名的工具套件，用于 超过 1100 万个网站，其中包括超过 50% 的 获奖网站 ！ 您可以使用 GSAP 在任何框架中为 JavaScript 可以触及的几乎所有内容制作动画。 无论您是想要为 UI、SVG、Three.js 还是 React 组件制作动画，GSAP 都能满足您的需求。核心库 包含创建超快速、跨浏览器友好动画所需的一切。这就是我们将在本文中逐步介绍的内容。

除了核心，还有各种插件。您无需学习它们即可开始，但它们可以帮助解决特定的动画挑战，例如 基于滚动的动画、 可拖动 交互、变形等。



GSAP补间类型：

- gsap.to()：这是最常见的补间类型。 .to()补间将从元素的当前状态开始 “到” 补间中定义的值。
- gsap.from()：和 .to() 正好相反，.from()补间中定义的值 为动画开始的状态。
- gsap.fromTo()：定义了起始值和结束值。
- gsap.set()：立即设置属性（无动画）。



实例：

小球物理落地动画

```html
<div id="svg-wrapper">
  <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
    <circle id="circle" cx="100" cy="50" r="50" fill="orange" />
  </svg>
</div>
<script>
  gsap.to('#circle', {
    y: 400, // transform: translateY(400px)
    duration: 2, // 动画执行时间2S
    ease: "bounce.out", // 动画轨迹
  })
</script>
```













