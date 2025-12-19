# 十七、动画库tween.js

### tweenjs创建threejs动画
TweenJS是一个由JavaScript语言编写的补间动画库，如果需要tweenjs辅助你生成动画，对于任何前端web项目，你都可以选择tweenjs库。

**安装与引用**

```bash
npm i @tweenjs/tween.js@^18
```

```javascript
import TWEEN from '@tweenjs/tween.js';
```



**tweenjs改变threejs模型对象位置**

```javascript
//创建一段mesh平移的动画
// 写法一：
const tween = new TWEEN.Tween(mesh.position);
//经过2000毫秒，pos对象的x和y属性分别从零变化为100、50
tween.to({x: 100,y: 50}, 2000);
//tween动画开始执行
tween.start(); 

// 写法二：
const tween = new TWEEN.Tween(mesh.position)
.to({x: 100,y: 50}, 2000)
.start();

// 渲染循环
function render() {
    TWEEN.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();
```



### **tweenjs相机运动动画**
**相机飞行动画：从一个点飞到另一个点**

只改变相机位置，相机默认视线方向保持不变，如果你想重新计算相机视线方向，可以在相机位置改变的过程中不停地执行`lookAt()`即可。

```javascript
import TWEEN from '@tweenjs/tween.js';

...
camera.position.set(202, 123, 125);
camera.lookAt(0, 0, 0);
new TWEEN.Tween(camera.position)
.to({x: 202,y: 123,z: -350}, 3000)
// tweenjs改变参数对象的过程中，.onUpdate方法会被重复调用执行
.onUpdate(function(){
    camera.lookAt(0, 0, 0);
})
.start()


// 渲染循环
function render() {
    TWEEN.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();
```



**Tweenjs回调函数**

twwenjs库提供了`onStart`、`onUpdate`、`onComplete`等用于控制动画执行的回调函数。

+ `onStart`：动画开始执行触发
+ `onUpdate`：动画执行过程中，一直被调用执行
+ `onComplete`：动画正常执行完触发

`.onUpdate(function(obj){})`结构中，obj对应的是`new TWEEN.Tween(pos)`的参数对象pos。

```javascript
const tween = new TWEEN.Tween(pos).to({x: 0}, 4000)
// 开始执行：动画片段tween开始执行的时候触发onStart
.onStart(function(obj){
  ...
})
```



**相机圆周运动，且保持相机镜头对准坐标原点**

```javascript
const R = 100; //相机圆周运动的半径
new TWEEN.Tween({angle:0})
.to({angle: Math.PI*2}, 16000)
.onUpdate(function(obj){
    camera.position.x = R * Math.cos(obj.angle);
    camera.position.z = R * Math.sin(obj.angle);
    camera.lookAt(0, 0, 0);
})
.start()
```



### 点按钮,相机飞行靠近观察设备
实际开发的的时候，一个较大的三维场景，有很多不同的设备或物品，你可能希望通过UI按钮点击切换到不同视角，观察某个区域，或者说放大观察某个特定的物品或设备。

```javascript
<div class="pos">
    <div id="A" class="bu">设备A</div>
    <div id="B" class="bu" style="margin-left: 10px;">设备B</div>
    <div id="car" class="bu" style="margin-left: 10px;">停车场</div>
    <div id="all" class="bu" style="margin-left: 10px;">整体</div>
</div>
```

```javascript
// 切换到设备A预览状态
document.getElementById('A').addEventListener('click', function () {
    const A = model.getObjectByName('设备A标注');
    const pos = new THREE.Vector3();
    A.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
    // 相机飞行到的位置和观察目标拉开一定的距离
    const pos2 = pos.clone().addScalar(30);//向量的x、y、z坐标分别在pos基础上增加30
    // 相机从当前位置camera.position飞行三维场景中某个世界坐标附近
    new TWEEN.Tween({
            // 相机开始坐标
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z,
            // 相机开始指向的目标观察点
            tx: 0,
            ty: 0,
            tz: 0,
        })
        .to({
            // 相机结束坐标
            x: pos2.x,
            y: pos2.y,
            z: pos2.z,
            // 相机结束指向的目标观察点
            tx: pos.x,
            ty: pos.y,
            tz: pos.z,
        }, 2000)
        .onUpdate(function (obj) {
            // 动态改变相机位置
            camera.position.set(obj.x, obj.y, obj.z);
            // 动态计算相机视线
            camera.lookAt(obj.tx, obj.ty, obj.tz);
        })
        .start();
})
```



**考虑OrbitControls的影响**

如果你在项目中使用了相机控件`OrbitControls`，希望相机`looAt()`指向的目标改变以后，该相机控件让然可以正常使用。需要在动画结束`.onComplete()`的时候重新设置`controls.target`，或者`.onUpdate()`更新`controls.target`。

```javascript
.onUpdate(function (obj) {
    ...
    camera.lookAt(obj.tx, obj.ty, obj.tz);
})
.onComplete(function(obj){
    controls.target.set(obj.tx, obj.ty, obj.tz);
    controls.update();
})
```



### 缓动算法.easing(地球渐入相机动画)
```javascript
// easing函数：缓动算法(运动效果)
// easing类型：定义缓动算法起作用地方
tween.easing(TWEEN.Easing.easing函数.easing类型);

// 动画开始缓动方式(类比加速启动)
tween.easing(TWEEN.Easing.Sinusoidal.In);
// 动画结束缓动方式(类比减速刹车)
tween.easing(TWEEN.Easing.Sinusoidal.Out);
// 同时设置In和Out
tween.easing(TWEEN.Easing.Sinusoidal.InOut);
```



动画效果：地球从小到大出现

```javascript
camera.position.set(3000, 3000, 3000);
camera.lookAt(0, 0, 0);

// 视觉效果：地球从小到大出现(透视投影相机远小近大投影规律)
new TWEEN.Tween(camera.position)
.to({x: 300,y: 300,z: 300}, 3000)
.start()
.easing(TWEEN.Easing.Sinusoidal.InOut)//进入和结束都设置缓动
```



### 淡入淡出
**淡入**

```javascript
// 模型淡入
material.transparent = true;//开启透明计算
material.opacity = 0.0;//完全透明

// new TWEEN.Tween(material)
new TWEEN.Tween({opacity:material.opacity})
.to({opacity:1.0}, 3000)
.onUpdate(function(obj){
    material.opacity = obj.opacity
})
.onComplete(function(){
    //动画结束：关闭允许透明，恢复到模型原来状态
    material.transparent = false;
})
.start();
```

**淡出**

```javascript
// 模型淡出
// new TWEEN.Tween(material)
new TWEEN.Tween({opacity:material.opacity})
.to({opacity:0.0}, 3000)
.onStart(function(){
    //动画开始：允许透明opacity属性才能生效
    material.transparent = true;
})
.onUpdate(function(obj){
    material.opacity = obj.opacity
})
.start();
```



### 循环触发
```javascript
const tween = new TWEEN.Tween(object)
  .to({ x: 100 }, 1000)
  .onRepeat(() => {
    console.log('一次循环完成，触发执行');
  })
  .onComplete(() => {
    console.log('整个动画最终循环完成触发');
  })
  .repeat(800) // 循环次数
  .start();
```

```javascript
// 循环无数次
 tween.repeat(Infinity)
// 循环往复
 tween.yoyo(true)
// 延迟操作
 tween.delay(3000)
// 循环2次
 tween.repeat(2)
```

