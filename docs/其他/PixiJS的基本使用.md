## PixiJS的基本使用

官网：https://www.pixijs.com

官方api文档：https://pixijs.download/release/docs/index.html



### 更新记录（2023.4）

1、新版本创建纹理api

2、新版本加载器api

3、文字与遮罩

4、ticker - 限制刷新率

5、图像绘制 - 创建特殊图形（插件：@pixi/graphics-extras）

6、交互事件更新

7、滤镜（高级滤镜插件：pixi-filters）

8、音频（插件：pixi-sound）

9、动画精灵



### 介绍

PixiJS 基于 WebGL 开发，是一个轻量级的2D渲染引擎，它能自动侦测使用WebGL还是Canvas来创建图形。

- Pixi 最大的特点在于，Pixi 具有完整的 WebGL 支持，却并不要求开发者掌握 WebGL 的相关知识，并在需要时无缝地回退到 Canvas 。
- Pixi 会帮助你用 JavaScript 或者其他 HTML5 技术来显示媒体，创建动画或管理交互式图像（精灵），经常被用来制作HTML5游戏（微信小游戏）以及有复杂交互的H5活动页。
- 但它并不是一个游戏引擎，其核心本质是尽可能快速有效地在屏幕上移动物体。
- 代码简单，性能高效，扩展性强




### 安装

```bash
npm install pixi.js
```

引入

```js
import * as PIXI from "pixi.js";
```

```html
<script src="https://pixijs.download/release/pixi.js"></script>
```



### 创建应用和舞台

#### Application 应用

创建应用方法调用后会在页面上创建一个`canvas`元素，之后所有的内容，都会渲染在这个画布上

```js
// 创建一个pixi应用对象
let app = new PIXI.Application({width: 256, height: 256});
// 将这个应用对象元素添加到dom文档中
document.body.appendChild(app.view);
```

| 选项            | 类型    | 默认值   | 描述                                           |
| --------------- | ------- | -------- | ---------------------------------------------- |
| width           | number  | 800      | 渲染器视图宽度                                 |
| height          | number  | 600      | 渲染器视图高度                                 |
| transparent     | boolean | false    | 视图是否透明                                   |
| resolution      | number  | 1        | 分辨率，渲染器设备像素比，R屏默认为2.          |
| antialias       | boolean | false    | 是否平滑抗锯齿，取消字体平滑，抗混叠。         |
| forceCanvas     | boolean | false    | 是否强制使用canvas渲染模式，默认使用WebGL。    |
| backgroundColor | String  | 0x000000 | 传入颜色关键词、 `rgb`、十六进制等表示颜色的值 |
| resizeTo        |         | window   | 画布跟随父元素大小改变                         |



```js
// 销毁画布
app.destroy();	
// 将canvas也清除
app.destroy(true);	
```



#### Stage 舞台

PixiJs对页面上元素的管理是树状的结构，根元素是应用，下一级就是舞台`stage`，舞台`stage`可以理解为是根节点下的根容器，接下来画布上所有的可见元素，都是挂载在舞台下的。

```js
let buttonContainer = new PIXI.Container();
app.stage.addChild(buttonContainer);
```

#### Container 容器

`PixiJs`的容器的容器概念类似于`Ps`里的分组的概念，用来装载多个显示对象。

一般如果场景比较多的时候，使用容器进行切换会比较方便，如果内容比较简单，直接把元素添加到舞台 stage 效果也是一样的

#### Renderer 渲染器

`app.renderer`是一个`Renderer`的实例，如果你希望重新渲染页面，就需要使用它

```js
// 创建画布后，改变背景颜色，需设置十六进制颜色值
app.renderer.backgroundColor = 0x061639;

// 查看渲染器的宽度和高度
app.renderer.view.width
app.renderer.view.height

// 改变画布大小
app.renderer.autoResize = true;
app.renderer.resize(512, 512);

// 让画布填充整个窗口
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
// 请确保所有HTML元素的默认内边距和边距设置为0：
// <style>* {padding: 0; margin: 0}</style>
```



### Texture 纹理（重要）

因为Pixi使用WebGL在GPU上渲染图像，图像需要转换为GPU可以处理的东西，这个东西被称为`texture（纹理）`。

`PIXI.Texture.from`： https://pixijs.download/release/docs/PIXI.Texture.html#from

```js
// 1、创建纹理 旧版本
// const texture = PIXI.utils.TextureCache["images/btn.png"];
// 1、创建纹理 新版本（v7）
const texture = PIXI.Texture.from("images/btn.png");
// 2、利用这个纹理，创建精灵
const sprite = new PIXI.Sprite(texture);
// 把精灵放入画布
app.stage.addChild(sprite);
```



### Loader 加载器（重要）

加载器功能：加载资源并将其转换为纹理



#### 新版本（v7）

##### 加载多个资源 

`PIXI.Assets.add`：https://pixijs.download/release/docs/PIXI.Assets.html#add

`PIXI.Assets.load`：https://pixijs.download/release/docs/PIXI.Assets.html#load

```js
// 添加资源 第一个参数为分配的别名,第二个参数则是图像路径
PIXI.Assets.add("jian", "./textures/jian.png");
PIXI.Assets.add("man", "./textures/man.png");
PIXI.Assets.add("mujian", "./textures/mujian.png");

// 异步加载资源
const texturesPromise = PIXI.Assets.load(
  ["jian", "man", "mujian"],
  (progress) => {
    // 监听加载进度
    console.log("加载完成:", progress);
  }
);

// 加载完成后创建精灵
texturesPromise.then((textures) => {
  // 创建容器
  const container = new PIXI.Container();
  // 使用纹理创建精灵
  const sprite = new PIXI.Sprite(textures.jian);
  // 将精灵放入容器
  container.addChild(sprite);
  // 将容器放入舞台
  app.stage.addChild(container);
});
```



##### 添加场景资源

分场景加载资源

`PIXI.Assets.addBundle`：https://pixijs.download/release/docs/PIXI.Assets.html#addBundle

`PIXI.Assets.loadBundle`：https://pixijs.download/release/docs/PIXI.Assets.html#loadBundle

```js
// 将资源添加到一个场景中
PIXI.Assets.addBundle("scene1", {
  jian: require("./assets/textures/jian.png"),
  man: require("./assets/textures/man.png"),
  mujian: require("./assets/textures/mujian.png"),
});
// 加载该场景的资源
const texturesPromise = PIXI.Assets.loadBundle("scene1", (progress) => {
  console.log("加载完成:", progress);
});

// 加载完成后创建精灵
texturesPromise.then((textures) => {
  // 创建容器
  const container = new PIXI.Container();
  // 创建精灵
  const sprite = new PIXI.Sprite(textures.jian);
  container.addChild(sprite);
  app.stage.addChild(container);
});
```



#### 旧版本

- 通过`app.loader.add`加载图像或纹理贴图时，可以指定别名，别名需要全局唯一。接下来使用的时候可以通过指定的别名来找到纹理缓存

- `app.loader.add`可以链式调用添加多个纹理缓存
- `onProgress`事件可以监听加载的进度，通过这个方法，可以很方便的制作进度条动画。
- 通过`add`方法添加需要加载的图片，所有图片加载完成后，`load`方法会调用传入的`setup`回调函数，这时就可以通过引入loader中resources对象中的图片资源来创建精灵

```javascript
let app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);

const loader = new PIXI.Loader();
// 第一个参数为分配的别名,第二个参数则是图像路径
loader.add("btn", "images/btn.png")
  .add("btn_circle", "images/btn_circle.png")
  .add("brake_bike", "images/brake_bike.png")
  .add("brake_handlerbar", "images/brake_handlerbar.png")
  .add("brake_lever", "images/brake_lever.png")
  .add("road", "images/road.png");
loader.load();
loader.onProgress.add(loadProgressHandler);
loader.onComplete.add(setup);
       
function loadProgressHandler(loader, resource) {
  //显示当前加载的文件路径
  console.log("loading: " + resource.url); 
  //显示当前文件加载的百分比
  console.log("progress: " + loader.progress + "%");
}

function setup() {
  let buttonContainer = new PIXI.Container();
  app.stage.addChild(buttonContainer);
  // 引用loader的resources对象中的纹理来创建精灵
  let btnImage = new PIXI.Sprite(loader.resources['btn'].texture);
  buttonContainer.addChild(btnImage);
}
```



### Sprite 精灵（重要）

api：https://pixijs.download/release/docs/PIXI.Sprite.html

- Sprite精灵是可以放在容器里的交互式图像。

- 精灵是你能用代码控制图像的基础。

- 你能够控制它们的位置，大小，和许多其他有用的属性来产生交互和动画。



#### 创建并显示精灵

新版

```js
const app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);

// 添加资源
PIXI.Assets.add("btn", "images/btn.png");
// 异步加载资源
const texturesPromise = PIXI.Assets.load(
  ["btn"],
  (progress) => {
    console.log("加载完成:", progress);
  }
);
// 加载完成后创建精灵
texturesPromise.then((textures) => {
  // 使用纹理创建精灵
  const sprite = new PIXI.Sprite(textures.btn);
  app.stage.addChild(sprite);
});
```

旧版

```js
const app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);

const loader = new PIXI.Loader();
loader.add("btn", "images/btn.png");
loader.load();
loader.onComplete.add(setup);

function setup() {
  // 引用loader的resources对象中的纹理来创建精灵
  let btnImage = new PIXI.Sprite(loader.resources['btn'].texture);
  app.stage.addChild(btnImage);
}
```



#### 位置

默认精灵sprite对象保存x和y属性用来定位

```js
sprite.x = 100;
sprite.y = 100;
// 或
sprite.position.set(10, 10);
```

#### 宽高大小

```js
sprite.width = 150;
sprite.height = 120;
```

#### 缩放比例

```js
sprite.scale.x = 0.5;
sprite.scale.y = 0.5;
// 或
sprite.scale.set(0.5, 0.5);
```

#### 旋转角度

可设置精灵的rotation来设定角度来旋转，旋转是针对锚点anchor发生的，默认在精灵的左上角，锚点是精灵旋转的中心点。

```js
sprite.rotation = 0.5;
```

angle 和 rotation 具有相同的效果。不同点是 rotation 以弧度为单位，angle 以度为单位。

#### anchor 锚点

```js
sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;
// 或
sprite.anchor.set(0.5, 0.5);
```

锚点anchor取值范围从0到1，是纹理长度或宽度的百分比。

#### pivot 中心点

精灵提供和anchor锚点类似的pivot属性来设置精灵的原点，若改变pivot中心点的值后旋转精灵，将会围绕设置的原点来旋转。

```js
sprite.pivot.x = 100;
sprite.pivot.y = 100;
// 或
sprite.pivot.set(100, 100);
```

若精灵的尺寸为200x200，设置pivot(100, 100)后，精灵将围绕其中心点旋转。

锚点pivot和中心点pivot的区别在于

- anchor锚点改变了纹理的原点，使用0到1填充。

- pivot中心点则改变精灵的原点，使用像素来填充。

#### zIndex 图层层级

zIndex 的值越大，层级就越高。

注意：只有父精灵设置了sortableChildren为true, 子精灵才能按照zIndex的value值进行层级的排序

默认：后添加的层级比先添加的高



### Ticker 计时器

PixiJS 提供了一个定时器 ticker 来帮助我们实现帧动画，只要我们把方法传进去，它就会按一定帧频刷新舞台，从而达到动画效果

```js
// 旋转效果
app.ticker.add((delta) => {
    container.rotation -= 0.01 * delta;
})
```



现在手机屏幕刷新率越来越高，比如我用pixi写了一段动画，在60hz的手机上看是正常的，但是在120hz的手机上看动画速度变成两倍了，所以需要进行限制才行，统一为60帧最好

```js
gsap.ticker.fps(60);
```



### 图像绘制

Graphics主要用于绘制原始形状（如线条，圆形和矩形）以及他们的上色和填充。

- 所有的形状的初始化都是先创造一个Pixi的Graphics的类 (PIXI.Graphics)的实例。

  ```js
  let rectangle = new Graphics();
  ```

- 使用参数为十六进制颜色代码值的beginFill方法来设置矩形的填充颜色，以endFill结束

  ```js
  rectangle.beginFill(0x66CCFF);
  ```

- 轮廓线样式

  ```js
  // 第一个参数为轮廓线宽度,第二个参数为轮廓线颜色值,第三个参数为alpha值
  rectangle.lineStyle(4, 0xFF3300, 1);
  ```

- API与Canvas Drawing几乎相同

#### 普通图形

```js
// 矩形
let rectangle = new Graphics();
rectangle.lineStyle(4, 0xFF3300, 1);
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
app.stage.addChild(rectangle);
// 清除图形
rectangle.clear()

// 线段
let line = new Graphics();
line.lineStyle(4, 0xFFFFFF, 1);
line.moveTo(0, 0);	// 开始点
line.lineTo(80, 50);	// 结束点
app.stage.addChild(line);

// 圆形 
let circle = new Graphics();
circle.beginFill(0x9966FF);
circle.drawCircle(0, 0, 32);
circle.endFill();
app.stage.addChild(circle);

// 椭圆 
let ellipse = new Graphics();
ellipse.beginFill(0xFFFF00);
ellipse.drawEllipse(0, 0, 50, 20);	// x, y, width, height
ellipse.endFill();
app.stage.addChild(ellipse);

// 圆角矩形 
let roundBox = new Graphics();
roundBox.lineStyle(4, 0x99CCFF, 1);
roundBox.beginFill(0xFF9933);
roundBox.drawRoundedRect(0, 0, 84, 36, 10)	// x, y, width, height, cornerRadius
roundBox.endFill();
app.stage.addChild(roundBox);

// 多边形 
let triangle = new Graphics();
triangle.beginFill(0x66FF33);
triangle.drawPolygon([
  -32, 64,
  32, 64,
  0, 0         
]);
triangle.endFill();
app.stage.addChild(triangle);

// 贝塞尔曲线 
let bezier = new Graphics();
bezier.bezierCurveTo(100, 240, 200, 200, 240, 100)
app.stage.addChild(bezier);
```



#### 创建特殊图形

```shell
npm install @pixi/graphics-extras
```

```js
// 倒角矩形
// 最后一个参数控制倒角切口大小
graphics.drawChamferRect(x, y, width, height, chamfer)

// 倒圆角矩形
// 最后一个参数为负数时，圆角向内凹进去
graphics.drawFilletRect(x，y，width，height，fillet)

// 正多边形
// x, y, 半径（图形尺寸）, 边数, 旋转弧度
graphics.drawRegularPolygon(x, y, radius, sides, rotation)

// 圆角正多边形
// x, y, 半径（图形尺寸）, 边数, 圆角, 旋转弧度
graphics.drawRoundedPolygon(x, y, radius, sides, corner, rotation)

// 环形
// x, y, 内圆半径, 外圆半径
graphics.drawTorus(x, y, innerRadius, outerRadius, startArc, endArc)

// 星形
graphics.drawStar(x, y, points, radius, innerRadius, rotation)
```



### mask 遮罩

遮罩是一个物体，能将精灵的可见性限制于遮罩的形状。

```js
let app = new PIXI.Application({ width: 640, height: 360, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let containers = new PIXI.Container();
app.stage.addChild(containers);
// 创建背景
const background = PIXI.Sprite.from('https://pic.qy566.com/pixijs/images/bg.png');
containers.addChild(background);
background.width = app.screen.width;
background.height = app.screen.height;

// 创建一个图形类
const graphics = new PIXI.Graphics();
// 指定一个简单的单色填充
graphics.beginFill(0xFF0000);
// 通过图形类画一个圆
graphics.drawCircle(app.screen.width / 2, app.screen.height / 2, 100);
// 填充上一次设置的 beginFill()
graphics.endFill();

// 把圆添加到舞台（app）上
// containers.addChild(graphics);

// 把圆形精灵以掩模的形式添加在图片精灵上
containers.mask = graphics;
```



### 文字

语法：`new PIXI.Text(text, style, canvas)`



```js
// 显示hello world文字
const text = new PIXI.Text("Hello World", {
  fontFamily: "Arial",
  fontSize: 180,
  fill: 0xff0000,
  align: "center",
});

// 设置文字位置
text.x = app.screen.width / 2;
text.y = app.screen.height / 2;

// 设置文字锚点
text.anchor.set(0.5);
// app.stage.addChild(text);

// 创建一个精灵
const bunny = PIXI.Sprite.from("./assets/textures/bg.png");
// 用精灵铺满整个屏幕
bunny.width = app.screen.width;
bunny.height = app.screen.height;

// 使用文字作为精灵的遮罩
bunny.mask = text;
app.stage.addChild(bunny);
```





### 交互事件

```js
const sprite = new Sprite(texture);
sprite.eventMode = "static"; 	// 与 interactive = true 相同
sprite.cursor = "cursor";
sprite.on('tap', (event) => {
  // Handle event
});
```



**1、开启交互事件**

`sprite.interactive = true`  or

`sprite.eventMode = "static"`

PS：新版本（v7.2）推荐用[eventMode](https://pixijs.download/release/docs/PIXI.Text.html#eventMode)  

**2、设置指针样式**

- buttonMode（指定为按钮模式）

  元素开启事件交互模式以后，鼠标悬停时还是指针的样式。当 buttonMode 设置为 true 以后，鼠标光标会被更改为手指。

- cursor (光标）

  cursor 和 buttonMode 一样可以设置鼠标的光标模式，但不同的是cursor能设置很多不同的模式，具体模式对应css中[cursor属性值](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)

**3、使用 `xxx.on('事件名', 回调函数)` 的方式监听指定事件**

​	如果是在移动端，需要使用 `tap` 代替 `click` 事件





### 滤镜

给精灵加特殊效果

例：模糊滤镜 PIXI.BlurFilter

```js
// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  antialias: true, // 抗锯齿
});

// 将应用画布添加到DOM中
document.body.appendChild(app.view);

// 创建一个纹理
const texture = PIXI.Texture.from("./assets/textures/mujian.png");
// 创建一个精灵
const sprite = new PIXI.Sprite(texture);
// 设置精灵的位置
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
// 将精灵添加到舞台
app.stage.addChild(sprite);
// 创建模糊滤镜
const blurFilter = new PIXI.BlurFilter();
// 设置模糊滤镜的模糊程度
blurFilter.blur = 20;
// 将模糊滤镜添加到精灵上
sprite.filters = [blurFilter];
```



高级滤镜插件

github：https://github.com/pixijs/filters

api：https://filters.pixijs.download/main/docs/index.html

```bash
npm install pixi-filters
```



例：轮廓滤镜、glowFilter

```js
// 导入pixi.js
import * as PIXI from "pixi.js";
import { OutlineFilter, GlowFilter } from "pixi-filters";

// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  antialias: true, // 抗锯齿
});

// 将应用画布添加到DOM中
document.body.appendChild(app.view);

// 创建一个纹理
const texture = PIXI.Texture.from("./assets/textures/mujian.png");
// 创建一个精灵
const sprite = new PIXI.Sprite(texture);
// 设置精灵的位置
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

// 设置精灵的锚点
sprite.anchor.set(0.5);

// 将精灵添加到舞台
app.stage.addChild(sprite);

// 创建轮廓滤镜
const outlineFilter = new OutlineFilter(5, 0xffff00); //2为轮廓宽度，0x000000为轮廓颜色
// 创建发光滤镜
const glowFilter = new GlowFilter({
  distance: 50,
  outerStrength: 1,
  innerStrength: 0,
  color: 0xff0000,
  quality: 0.5,
});
// 将轮廓滤镜添加到精灵上
sprite.filters = [outlineFilter, glowFilter];
```



### 音频

github：https://github.com/pixijs/sound

api文档：https://pixijs.io/sound/docs/Sound.html

```shell
npm i @pixi/sound --save
```

基本使用

```js
import { sound } from '@pixi/sound';

sound.add('my-sound', '@/assets/audios/bg.mp3');
sound.play('my-sound');
```



### AnimatedSprite 动画精灵

https://pixijs.download/release/docs/PIXI.AnimatedSprite.html

将多个纹理逐帧播放，形成动画效果

例：用多张图做一个loading动画

```js
let loadingTextures = [];
for (let i2 = 1; i2 <= 52; i2++) {
  loadingTextures.push(
    PIXI.Texture.from(require("./assets/images/x" + i2 + ".png"))
  );
}
const loadingAnimation = new PIXI.AnimatedSprite(loadingTextures); // 动画精灵
loadingAnimation.position.set(0, 0);
loadingAnimation.animationSpeed = 0.8;
loadingAnimation.play();
container.addChild(loadingAnimation);
```

