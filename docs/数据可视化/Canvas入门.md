## Canvas入门

参考文章：[案例+图解带你一文读懂Canvas](https://juejin.cn/post/7119495608938790942)

### 介绍

**canvas** 是一个可以使用脚本(通常为JavaScript)来绘制图形的 HTML 元素.

**Canvas API** 提供了一个通过JavaScript 和 HTML的Canvas元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

**Canvas API** 主要聚焦于2D图形。而同样使用Canvas元素的 WebGL API 则用于绘制硬件加速的2D和3D图形。



### 基本使用

```html
<canvas id="canvas" width="200" height="200">
  当前浏览器不支持canvas元素，请升级或更换浏览器！
</canvas>
<script>
  // 获取 canvas 元素
  const canvas = document.getElementById('canvas');
  // 通过判断getContext方法是否存在来判断浏览器的支持性
  if(typeof canvas.getContext === 'function') {
    // 获取绘图上下文
    const ctx = canvas.getContext('2d');
    // 绘制操作
  }
</script>
```

- Canvas标签的默认大小为：300 x 150 (像素)

- Canvas标签中的文字是在不支持Canvas标签的浏览器中使用的，因为支持Canvas标签的浏览器会忽略容器中包含的内容正常渲染Canvas标签，而不支持Canvas标签的浏览器则相反，浏览器会忽略容器而显示其中的内容。



#### 获取上下文

Canvas标签提供了一个方法叫：**getContext()** ，通过它我们可以获得渲染上下文和绘画功能。

getContext方法是有一个接收参数，它是绘图上下文的类型，可能的参数有：

- 2d：建立一个二维渲染上下文。这种情况可以用 CanvasRenderingContext2D()来替换getContext('2d')。
- webgl（或 experimental-webgl）： 创建一个 WebGLRenderingContext 三维渲染上下文对象。只在实现WebGL 版本1(OpenGL ES 2.0)的浏览器上可用。
- webgl2（或 experimental-webgl2）：创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本2 (OpenGL ES 3.0)的浏览器上可用。
- bitmaprenderer：创建一个只提供将canvas内容替换为指定ImageBitmap功能的ImageBitmapRenderingContext。



#### 绘制方法

- `stroke()`：通过线条来绘制图形轮廓，默认黑色

- `fill()`：填充，默认黑色
- `strokeStyle`：描边的样式

- `fillStyle`：填充的样式

`strokeStyle` 和 `fillStyle` 属性的设置是一次设置永久有效的，想要改变必须重新设置其他值来覆盖原有的值。



### 绘制图形

#### 直线

方法

- moveTo(x, y)

  设置初始位置，参数为初始位置x和y的坐标点

- lineTo(x, y)

  绘制一条从初始位置到指定位置的直线，参数为指定位置x和y的坐标点
  
- beginPath()

  用于开始一条路径或重置当前的路径

- closePath()

  闭合路径。开启和关闭路径的时候，关闭路径其实并不是必须的，对于新路径其实每次都开启新路径就可以

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
ctx.strokeStyle = "#f00" // 描边样式设置为红色

// 画一条（50， 50） 到 （400， 50）的直线
ctx.moveTo(50, 50) 
ctx.lineTo(400, 50)
ctx.stroke() 

ctx.beginPath() // 开启新路径

// 连续的直线只需要设置一个起始点
ctx.lineWidth = 10
ctx.moveTo(50, 100) 
ctx.lineTo(50, 400)
ctx.lineTo(400, 400)
ctx.stroke() 
```



样式

- lineWidth  线段宽度

- lineCap  设置线段端点显示的样式

  - butt：默认值，以直边结束线段
  - round：以圆角结束线段
  - square：也是以直边结束线段，但和butt不同的是会在结束位置多出一段由width大小控制的长度。

- lineJoin  定义了两线段连接处的样式。

  - miter：默认值，表示用方形画笔在连接处形成尖角
  - round：用圆角连接，实现平滑效果
  - bevel：连接处会形成一个斜面

- miterLimit   设置当两条线相交时交接处最大长度

  - 所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

  - 线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。

  
  - 如果交点距离大于miterLimit值，连接效果会变成了 lineJoin = bevel 的效果。
  
- setLineDash  设置虚线样式

- getLineDash  返回虚线设置的样式，长度为非负偶数的数组

- lineDashOffset  设置虚线样式的起始偏移量。例如：15

- globalAlpha   透明度 `ctx.globalAlpha = 0.5;`



```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
ctx.strokeStyle = "#f00" // 描边样式设置为红色
ctx.lineWidth = 5

// 绘制一条虚线
ctx.setLineDash([5, 10, 20, 40]);
console.log(ctx.getLineDash()); // [5, 10, 20, 40]
ctx.beginPath();
ctx.moveTo(0,100);
ctx.lineTo(400, 100);
ctx.stroke();

ctx.setLineDash([5, 10, 20, 40]);
// 设置起始偏移量
ctx.lineDashOffset = 15;
ctx.beginPath();
ctx.moveTo(0,300);
ctx.lineTo(400, 300);
ctx.stroke();
```



#### 三角形

只需要画三条直线拼在一起就是一个三角形了

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
ctx.strokeStyle = "#f00" // 描边样式设置为红色
ctx.fillStyle = "#00f" // 填充样式设置为蓝色
ctx.lineWidth = 5

// 绘制一个三角形
ctx.moveTo(50, 100) 
ctx.lineTo(50, 400)
ctx.lineTo(400, 400)
ctx.lineTo(50, 100) 
ctx.stroke();

// 如果是填充一个三角形，则只需两条直线就行，它会默认闭合。
ctx.beginPath()
ctx.moveTo(200, 200) 
ctx.lineTo(400, 200)
ctx.lineTo(400, 370)
ctx.fill();
```



#### 矩形

方法

- rect(x, y, width, height) 

  矩形描边，还需要结合描边`stroke() `和填充`fill()`的方法来实现

  x和y 是矩形的起点坐标，width和height 是矩形的宽高

- strokeRect(x, y, width, height) 

  绘制一个矩形的边框，`rect()`方法和`stroke()`方法的合成版

- fillRect(x, y, width, height) 

  绘制一个填充的矩形，`rect()`方法和`fill()`方法的合成版

- clearRect(x, y, width, height) 

  清除指定矩形区域，让清除部分完全透明。

  

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
ctx.strokeStyle = "#f00" // 描边样式设置为红色
ctx.fillStyle = "#00f" // 填充样式设置为蓝色
ctx.lineWidth = 5

// 描边一个矩形
ctx.rect(50, 50, 300, 100)
ctx.stroke()
// 等价于 => 直接创建矩形路径并描边
ctx.strokeRect(50, 50, 300, 100)

ctx.beginPath()

// 填充一个矩形
ctx.rect(50, 300, 300, 100)
ctx.fill();
// 等价于 => 直接创建矩形路径并填充
ctx.fillRect(50, 300, 300, 100)

// 清除指定矩形区域
ctx.clearRect(50, 300, 200, 100)
```



#### 圆和圆弧

**arc(x, y, radius, startAngle, endAngle, anticlockwise)**

参数：

- x，y 为圆弧中心或圆的圆心坐标

- radius 为圆弧的半径或圆的半径

- startAngle 为圆弧或圆的起始点，从x轴方向开始计算，且单位为弧度（0的位置在右边，3点钟位置）

- endAngle 为圆弧或圆的终点，单位也是为弧度

- anticlockwise 是一个可选参数，可选值为Boolean类型，用它来表示圆弧或圆的绘制方向，默认为false，顺时针绘制圆弧或圆



角度转弧度的公式为：`弧度 = 角度 * Math.PI / 180`

画一个圆就是绘制一个起点为0，结束点为360(360 * Math.PI /180)的弧度就可

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
ctx.strokeStyle = "#f00"; // 描边样式设置为红色
ctx.fillStyle = "#00f"; // 填充样式设置为蓝色
ctx.lineWidth = 5;

// 顺时针绘制一段90度的圆弧
ctx.arc(100, 100, 50, 0, 90 * Math.PI /180 ); 
ctx.stroke();

// 逆时针绘制一段90度的圆弧
ctx.beginPath();
ctx.arc(300, 100, 50, 0, 90 * Math.PI /180, true ); 
ctx.stroke();

// 画一个圆
ctx.beginPath();
ctx.arc(300, 300, 50, 0, 360 * Math.PI /180 ); 
ctx.stroke();
```



#### 椭圆

**ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)**

参数：

- x、y：椭圆的圆心位置
- radiusX、radiusY：x轴和y轴的半径
- rotation：椭圆的旋转角度，以弧度表示
- startAngle：开始绘制点
- endAngle：结束绘制点
- anticlockwise：绘制的方向（默认顺时针），可选参数。

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
ctx.strokeStyle = "#f00"; // 描边样式设置为红色
ctx.fillStyle = "#00f"; // 填充样式设置为蓝色
ctx.lineWidth = 5;

// 画一个椭圆
ctx.ellipse(100, 150, 50, 100, 0, 0, 360 * Math.PI /180); 
ctx.stroke();

// 画一个旋转90°的椭圆
ctx.beginPath();
ctx.ellipse(300, 150, 50, 100, 90 * Math.PI /180, 0, 360 * Math.PI /180); 
ctx.stroke();
```



#### 贝塞尔曲线

##### 二次贝塞尔曲线

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b93f24fcb7e04ebc89959f9dfd9b6708~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?"/>

[二次贝塞尔曲线调试工具](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html)

二次贝塞尔曲线需要一个控制点，用来确定起点和终点的曲线斜率

**quadraticCurveTo(x1, y1, x, y)**

参数：

- x1和y1为控制点坐标
- x和y为结束点坐标

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

ctx.moveTo(100, 250);
ctx.quadraticCurveTo(250, 100, 400, 250);
ctx.stroke();
```



##### 三次贝塞尔曲线

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb035911f33541ef962436c1afaf6773~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?" />

[三次贝塞尔曲线调试工具](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html)

相对于二次贝塞尔曲线多了一个控制点

**ctx.bezierCurveTo(x1, y1, x2, y2, x, y)**

参数：

- x1和y1为第一个控制点坐标
- x2和y2为第二个控制点坐标
- x和y为结束点坐标

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

ctx.moveTo(100, 250);
ctx.bezierCurveTo(150, 100, 350, 100, 400, 250);
ctx.stroke();
```



### 绘制样式

#### 渐变

##### 线性渐变

顾名思义就是以一个点开始沿某个方向的渐变

方法：

- ctx.createLinearGradient(x1, y1, x2, y2)

  创建线性渐变

  参数：起点和终点的坐标

- gradient.addColorStop(offset, color)

  添加渐变的颜色

  参数：offset：颜色的偏移值，0到1之间的数；color：颜色

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 创建线性渐变
const gradient = ctx.createLinearGradient(10, 10, 200, 10);
gradient.addColorStop(0, "#000");
gradient.addColorStop(1, "#fff");

const gradient2 = ctx.createLinearGradient(10, 10, 200, 10);
// 从0.5的位置才开始渐变
gradient.addColorStop(0.5, "#000");
gradient.addColorStop(1, "#fff");


// 使用渐变填充
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100);

ctx.beginPath();
ctx.fillStyle = gradient2;
ctx.fillRect(30, 30, 200, 100);
```



##### 径向渐变

从起点到终点颜色从内到外进行圆形的渐变

**ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)**

参数：

- x0, y0为开始圆的坐标
- r0为开始圆的半径
- x1, y1为结束圆的坐标
- r1为结束圆的半径

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 创建径向渐变
const gradient = ctx.createRadialGradient(100, 100, 100, 100, 100, 0);
gradient.addColorStop(0, "#000000");
gradient.addColorStop(1, "#ffffff");

// 使用渐变填充
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 200);
```



#### 图案样式

把一个图像绘制到Canvas中

**createPattern(image, type)** 

参数：

- Image 参数可以是一个 Image 对象，也可以是一个 canvas 对象

- Type 为图案绘制的类型，可用的类型分别有：

  repeat：平铺

  repeat-x：沿x轴平铺

  repeat-y：沿y轴平铺

  no-repeat：不平铺



##### 用Image对象填充

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
    
const imgUrl = 'https://img1.baidu.com/it/u=3049268614,1991712026&fm=253&fmt=auto&app=138&f=JPEG?w=283&h=500';
    
const img = new Image();
img.src = imgUrl;
img.onload = function() {
  // 创建图案
  const pattern = ctx.createPattern(img, 'no-repeat');
  // 用图案填充
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 500, 500);
}
```



##### 用Canvas对象填充

```html
<canvas id="canvas" width="140" height="150">
  当前浏览器不支持canvas元素，请升级或更换浏览器！
</canvas>
<canvas id="canvas2" width="500" height="500">
  当前浏览器不支持canvas元素，请升级或更换浏览器！
</canvas>
<script>
  // 获取 canvas 元素
  const canvas = document.getElementById('canvas');
  const canvas2 = document.getElementById('canvas2');
  
  // 通过判断getContext方法是否存在来判断浏览器的支持性
  if(canvas.getContext && canvas2.getContext) {
    // 获取绘图上下文
    const ctx = canvas.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    const img = new Image();
    img.src = "https://img1.baidu.com/it/u=3049268614,1991712026&fm=253&fmt=auto&app=138&f=JPEG?w=283&h=500";
    img.onload = function() {
      // 创建图案
      const pattern = ctx.createPattern(img, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 140, 150);
      
      // 用canvas来绘制canvas2
      const pattern2 = ctx2.createPattern(canvas, 'repeat');
      ctx2.fillStyle = pattern2;
      ctx2.fillRect(0, 0, 500, 500);
    }
  }
</script>
```



### 绘制文本

#### 轮廓绘制

**ctx.strokeText(text, x, y, maxWidth)**

参数：

- text：是绘制的文本内容
- x、y：为绘制文本的起始位置坐标
- maxWidth：可选参数，为文本绘制的最大宽度



#### 填充绘制

**ctx.fillText(text, x, y, maxWidth)**

参数：

- text：绘制的文案
- x、y：文本的起始位置
- maxWidth：可选参数，最大宽度。



```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 解决canvas绘制文本模糊问题
let dpr = window.devicePixelRatio; 
let { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect();
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
canvas.width = dpr * cssWidth;
canvas.height = dpr * cssHeight;
ctx.scale(dpr, dpr);

// 需要设置字体字号 才能生效
ctx.font = "50px 微软雅黑";
// 轮廓绘制
ctx.strokeText('微软雅黑', 50, 50);

ctx.beginPath();
// 填充绘制
ctx.fillText('微软雅黑', 50, 100);
```



**解决canvas绘制文本模糊问题**

原因分析： 高清屏上物理像素和设备独立像素不一致导致的

解决方式： 通过屏幕dpr调整canvas大小，在调整后的画布上fillText



#### 文本样式

- font

  设置字号和字体。默认： 10px sans-serif

- textAlign

  文本对齐的方式。可选值为：left、right、center、start和end。默认值是 start。

- direction

  文本的方向。可选值为：ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document 。）。默认值是 inherit。

  如果 direction 属性设置为 ltr，则textAlign属性的 left 和 start 的效果相同，right 和 end 的效果相同；

  如果 direction 属性设置为 rtl，则textAlign属性的 left 和 end 的效果相同，right 和 start 的效果相同。

- textBaseline

  基线对齐选项，决定文字垂直方向的对齐方式。可选值为：top、hanging、middle、alphabetic、ideographic和bottom。默认值是 alphabetic。

  <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ceff6bea0e142aba3853e8362176284~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?" />

- 阴影

  - shadowOffsetX

    用于设置阴影在X轴上的延伸距离，默认值为0。

    如设置为10，则表示延 X轴 向右延伸10像素的阴影，也可以为负值，负值表示阴影会往反方向（向左）延伸。

  - shadowOffsetY

    用于设置阴影在 Y轴 上的延伸距离，默认值为0。

    如设置为10，则表示延 Y轴 向下延伸10像素的阴影，也可以为负值，负值表示阴影会往反方向（向上）延伸。

  - shadowBlur

    用于设置阴影的模糊程度，默认为 0

  - shadowColor

    用于设置阴影的颜色，默认为全透明的黑色

- measureText

  这个对象有很多属性，其中width属性用于基于当前上下文字号和字体来计算内联字符串的宽度

  ```js
  const canvas = document.getElementById('canvas'); // 获取Canvas
  const ctx = canvas.getContext('2d'); // 获取绘制上下文
  
  ctx.font="30px Arial";
  const txt="Hello World";
  ctx.fillText(txt, 10, 100);
  ctx.fillText("width:" + ctx.measureText(txt).width, 10, 50);
  ```

  

### 绘制图片:star:

drawImage方法会根据不同的传参实现不同的功能：绘制图像、缩放图像、裁剪图像



#### 绘制图像

**drawImage(image, dx, dy)**

参数：

- image：绘制的元素（图像）。

- dx、dy：绘制元素（图像）时左上角的坐标。

只有单纯的绘制功能，可以绘制图片、视频和别的Canvas对象等。



#### 缩放图像

**drawImage(image, dx, dy, dWidth, dHeight)**

参数：

- image：绘制的元素（图像）。

- dx、dy：绘制元素（图像）时左上角的坐标。
- dWidth、dHeight：绘制元素（图像）的宽度和高度。如果不设置，则在绘制时image宽度和高度不会缩放。



#### 裁剪图像

**drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)**

参数：

- image：绘制的元素（图像）。

- sx、sy：裁剪框左上角的坐标。

- sWidth、sHeight：裁剪框的宽度和高度。

- dx、dy：绘制元素（图像）时左上角的坐标。

- dWidth、dHeight：绘制元素（图像）的宽度和高度。如果不设置，则在绘制时image宽度和高度不会缩放。



```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

const img = new Image();
img.src = 'https://img0.baidu.com/it/u=242767209,2541342896&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500';
img.onload = function() {
  // 绘制图像
  // ctx.drawImage(img, 0, 0);

  // 缩放图像
  // ctx.drawImage(img, 0, 0, 500, 300);

  // 裁剪图像
  // 在图片的（0，200）位置，裁剪一个250*250大小的内容，然后缩放到200*200绘制到Canvas中（0, 0）的地方
  ctx.drawImage(img, 0, 200, 250, 250, 0, 0, 200, 200);
}
```



### 变换

#### 移动

**ctx.translate(x, y)**

参数：

- x 是左右偏移量

- y 是上下偏移量

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 将画布向x轴和y轴分别偏移100px，也可以理解为原点移至(100, 100)
ctx.translate(100, 100);

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 200, 100);
```



#### 旋转

**ctx.rotate(angle)**

- angle 是旋转的角度，单位是弧度，顺时针旋转

- 旋转的原点是Canvas画布的（0,0）坐标点，而不是元素的左上角或者中心点。

- 角度转弧度的公式为：`弧度 = 角度 * Math.PI / 180`

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

for (let i = 0; i < 9; i++) {
  ctx.fillStyle = `#${i}${i}${i}`;
  ctx.rotate(i * 2 * Math.PI / 180);
  // 在（100,0）坐标点绘制一个宽：200，高：100的矩形
  ctx.fillRect(100, 0, 200, 100);
}
```



#### 缩放

**ctx.scale(x, y)**

参数：

- x 为水平缩放的值

- y 为垂直缩放的值

- x和y的值小于1则为缩小，大于1则为放大。默认值为 1。

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 缩放0.5倍
ctx.scale(0.5, 0.5);
ctx.fillRect(0, 100, 200, 100);

// 恢复为原来尺寸需要重新设置缩放
ctx.scale(2, 2);
ctx.fillRect(0, 300, 200, 100);
```



#### 状态的保存与恢复

- 可以理解为就是对canvas 状态的快照进行保存和恢复。

- save() 和 restore() 方法是用来保存和恢复 canvas 状态的，方法不需要参数。

- save()保存的状态是可以多次保存的，同时保存在栈中的元素遵循的是后进先出的顺序



可以保存和恢复的状态：

- 应用的变形：移动、旋转、缩放、strokeStyle、fillStyle、globalAlpha、lineWidth、lineCap、lineJoin、miterLimit、lineDashOffset、shadowOffsetX、shadowOffsetY、shadowBlur、shadowColor、globalCompositeOperation、font、textAlign、textBaseline、direction、imageSmoothingEnabled等。

- 应用的裁切路径（clipping path）



上面缩放的例子恢复原来尺寸也可以用状态的保存与恢复来实现

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 保存初始状态
ctx.save();

ctx.scale(0.5, 0.5);
ctx.fillRect(0, 100, 200, 100);

// 恢复初始状态
ctx.restore();
ctx.fillRect(0, 300, 200, 100);
```



#### 画布清空

**ctx.clearRect(x, y, width, height)**

参数：

- x为要清除的矩形区域左上角的x坐标
- y为要清除的矩形区域左上角的y坐标
- width为要清除的矩形区域的宽度
- height为要清除的矩形区域的高度



#### 用transform实现变换

**transform(a, b, c, d, e, f)**

- a：水平缩放，不缩放为1
- b：水平倾斜，不倾斜为0，单位也是弧度
- c：垂直倾斜，不倾斜为0，单位也是弧度
- d：垂直缩放，不缩放为1
- e：水平移动，不移动为0
- f：垂直移动，不移动为0



##### 移动

修改参数e，f

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 将画布向x轴和y轴分别偏移100px，也可以理解为原点移至(100, 100)
ctx.transform(1, 0, 0, 1, 100, 100);
// => ctx.translate(100, 100);

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 200, 100);
```



##### 缩放

修改参数a，d

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 缩放0.5倍
ctx.transform(0.5, 0, 0, 0.5, 0, 0);
// => ctx.scale(0.5, 0.5);
ctx.fillRect(0, 100, 200, 100);
```



##### 倾斜

修改参数b，c

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
// 水平倾斜30°
ctx.transform(1, 30 * Math.PI / 180, 0, 1, 0, 0);
ctx.fillRect(0, 0, 200, 100);
```



##### 旋转

修改参数a，b，c，d

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

// 旋转30度
const c3 = Math.cos(30 * Math.PI / 180);
const s3 = Math.sin(30 * Math.PI / 180);
ctx.transform(c3, s3, -s3, c3, 0, 0);
// => ctx.rotate(30 * Math.PI / 180);

ctx.fillRect(100, 0, 200, 100);
```



#### 用globalCompositeOperation改变合成图形的绘制顺序

合成效果：https://article.itxueyuan.com/BJnKL3



#### 裁剪

**clip()**

将当前正在构建的路径转换为当前的裁剪路径

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

const img = new Image();
img.src = 'https://img0.baidu.com/it/u=242767209,2541342896&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500';
img.onload = function() {
  // 创建圆形裁剪路径
  ctx.arc(250, 250, 200, 0, 360 * Math.PI / 180, false);
  ctx.clip();
  // 创建完后绘制
  ctx.drawImage(img, 0, 0, 500, 500);
}
```



### 动画

绘制动画的基本步骤

- 清空 canvas：除非接下来要画的内容会完全充满 canvas（例如背景图），否则需要清空所有。最简单的做法就是用 clearRect 方法。
- 保存 canvas 状态：如果要改变 canvas 状态的设置（样式，变形之类的），之后又要在每画一帧之时都是原始状态的情况时，需要先保存一下。
- 绘制动画图形（animated shapes）。
- 恢复 canvas 状态：如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。



为了实现动画，我们需要一些可以定时执行重绘的方法

- setInterval(function, delay)：定时器，当设定好间隔时间后，function 会定期执行。
- setTimeout(function, delay)：延时器，在设定好的时间之后执行函数
- requestAnimationFrame(callback)：告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画。



#### setInterval

如果需要自动去展示动画而不需要和用户交互，可以使用 setInterval() 方法，它可以定期执行指定的代码。

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

const width = canvas.width;
const height = canvas.height;
let num = 0;


setInterval(()=>{
  num += 1;
  if (num <= 400) {
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(num, 0, 100, 100);
  } else {
    num = 0;
  }
})
```



#### setTimeout

如果需要做一些交互性的动画，可以使用键盘或者鼠标事件配合上 setTimeout() 方法来实现。

通过设置事件监听，可以捕捉用户的交互，并执行相应的动作。





#### requestAnimationFrame

- requestAnimationFrame()方法的整体性能要比setInterval()方法好很多

- requestAnimationFrame()方法提供了更加平缓且有效率的方式来执行动画，当系统准备好重绘条件后才会调用绘制动画帧。

- 一般每秒钟回调函数执行 60 次，也有可能会被降低，因为通常情况下requestAnimationFrame()方法会遵循 W3C 的建议，浏览器中的回调函数执行次数通常与浏览器屏幕刷新次数相匹配。

- requestAnimationFrame()方法运行在后台标签页或者隐藏在 `<iframe>`标签时，requestAnimationFrame()方法会暂停调用以提升性能和电池使用寿命。

```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

const width = canvas.width;
const height = canvas.height;
let num = 0;

requestAnimationFrame(move);

// 递归自循环
function move() {
  console.log('num', num);
  num += 1;
  if (num <= 400) {
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(num, 0, 100, 100);
  } else {
    num = 0;
  }

  // 执行完以后继续调用
  requestAnimationFrame(move);
}
```



### 事件

#### 鼠标事件

- click（点击）
- dblclick（双击）
- mouseover（鼠标移入）
- mouseout（鼠标移出）
- mouseenter（鼠标移入）
- mouseleave（鼠标移出）
- mousedown（鼠标按下）
- mouseup（鼠标抬起）
- mousemove（鼠标移动）
- mousewheel（鼠标滚轮）

以上就是咱们常用的鼠标事件，我们发现其中的`mouseover`和`mouseenter`还有`mouseout`和`mouseleave`好像是一样的事件，但凭我们的经验虽然看似一样，其实肯定不一样，或者说有区别。

那么他们有什么区别呢？

`mouseover`和`mouseenter`都是鼠标移入时触发，但区别是`mouseover`支持事件冒泡，而`mouseenter`不支持事件冒泡。简单说就是 `mouseover`事件在鼠标指针移入被选元素或者是被选元素的任何子元素，都会触发，而`mouseenter`事件只有在鼠标指针移入被选元素时，才会触发，移入被选元素的子元素不会触发。

`mouseout`和`mouseleave`都是鼠标移入时触发，但区别是`mouseout`支持事件冒泡，而`mouseleave`不支持事件冒泡。简单说就是 `mouseout`事件在鼠标指针离开被选元素或者是被选元素的任何子元素，都会触发，而`mouseleave`事件只有在鼠标指针离开被选元素时，才会触发，离开被选元素的子元素不会触发。



#### 键盘事件

键盘事件相对于鼠标事件就比较简单一些，就三个：

- keydown（键盘按下）
- keyup（键盘抬起）
- keypress（键盘按下）

这里我们常见的其实就是`keydown`和`keyup`两个事件，至于`keypress`事件其实相对于`keydown`和`keyup`事件复杂一些。虽然`keypress`事件和`keydown`事件都是按下时触发，但也有区别，`keypress`事件返回的是输入的字符的**ASCII**码,也就是**baiKeyAscii**，而`keydown`事件返回的是键盘码。并且`keypress`事件虽然也是用户按下键盘上的字符键时触发，但如果按住不让的话，会重复触发此事件。



```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文
      
// 获取x,y的值
let x = canvas.width / 2 - 50;
let y = canvas.height / 2 - 50;

// 绘制一个矩形
ctx.fillRect(x, y, 100, 50);
// 给canvas添加键盘移动事件
window.addEventListener("keydown", doKeydown, false);

function doKeydown(e) {
  ctx.clearRect(0, 0, 500, 500)
  var keyID = e.keyCode ? e.keyCode :e.which;
  switch(e.keyCode) {
    case 37:
      console.log(`按下左键`)
      x = x - 10;
      ctx.fillRect(x, y, 100, 50);
      break;
    case 38:
      console.log(`按下上键`)
      y = y - 10;
      ctx.fillRect(x, y, 100, 50);
      break;
    case 39:
      console.log(`按下右键`)
      x = x + 10;
      ctx.fillRect(x, y, 100, 50);
      break;
    case 40:
      console.log(`按下下键`)
      y = y + 10;
      ctx.fillRect(x, y, 100, 50);
      break;
  }
}
```



#### 通过鼠标事件实现元素拖拽移动

判断是否选中元素

**isPointInPath(x, y)**

此方法可以把坐标传入，然后判断是否在路径之内。

参数：x为监测点的x坐标，y为监测点的y坐标。

注意：使用绘制路径的方法绘制的元素才能使用`isPointInPath()`方法判断，drawImage、fillRect、strokeRect方法等不支持`isPointInPath()`方法的路径检测



```js
const canvas = document.getElementById('canvas'); // 获取Canvas
const ctx = canvas.getContext('2d'); // 获取绘制上下文

const width = canvas.width;
const height = canvas.height;

let clickCoordinate = { x: 0, y: 0 };	// 鼠标按下的坐标
let checked = false;	// 是否选中

let x = 100, y = 100, w = 200, h = 100;

// 绘制一个矩形
fillStyle = '#000';
ctx.rect(x, y, w, h);
ctx.fill();

// 为canvas添加鼠标按下事件
canvas.addEventListener("mousedown", mousedownFn, false);

// 鼠标按下触发的方法
function mousedownFn(e) {
  // 获取元素按下时的坐标
  clickCoordinate.x = e.pageX - canvas.offsetLeft;
  clickCoordinate.y = e.pageY - canvas.offsetTop;

  checkElement();
  // 为canvas添加鼠标移动和鼠标抬起事件
  canvas.addEventListener("mousemove", mousemoveFn, false);
  canvas.addEventListener("mouseup", mouseupFn, false);
}

// 鼠标移动触发
function mousemoveFn(e) {
  if (checked) {
    const moveX = e.pageX;
    const moveY = e.pageY;
    // 计算移动元素的坐标
    x = x + (moveX - clickCoordinate.x);
    y = y + (moveY - clickCoordinate.y);
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    // 清空画布以后重新绘制
    ctx.beginPath();
    fillStyle = '#000';
    ctx.rect(x, y, w, h);
    ctx.fill();
    // 赋值
    clickCoordinate.x = moveX;
    clickCoordinate.y = moveY;
  }
}

// 鼠标抬起触发
function mouseupFn() {
  // 鼠标抬起以后移除事件
  canvas.removeEventListener("mousemove", mousemoveFn, false)
  canvas.removeEventListener("mouseup", mouseupFn, false)
  checked = false;
}

// 判断是否选中该元素
function checkElement() {
  // 方法一：计算元素边界
  // const minX = x;
  // const maxX = x + w;
  // const minY = y;
  // const maxY = y + h;

  // if (minX <= clickCoordinate.x && clickCoordinate.x <= maxX && minY <= clickCoordinate.y && clickCoordinate.y <= maxY) {
  //   checked = true;
  // } else {
  //   checked = false;
  // }

  // 方法二：isPointInPath
  if (ctx.isPointInPath(clickCoordinate.x, clickCoordinate.y)) {
    checked = true;
  } else {
    checked = false;
  }
}
```



### 应用

https://juejin.cn/post/7171828391346176007
