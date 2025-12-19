# 十二、精灵模型Sprite

#### 精灵模型Sprite
Three.js的精灵模型`Sprite`和Threejs的网格模型`Mesh`一样都是模型对象，父类都是`Object3D`

`Sprite`**与矩形平面**`Mesh`**的区别**：`Sprite`矩形平面会始终平行于Canvas画布或者说屏幕，而矩形平面`Mesh`的姿态角度会跟着旋转，不一定平行于canvas画布。



1. 创建精灵模型材质`SpriteMaterial` 精灵材质对象`SpriteMaterial`和普通的网格材质一样可以设置颜色`.color`、颜色贴图`.map`、开启透明`.transparent`、透明度`.opacity`等属性，精灵材质对象`SpriteMaterial`的父类是材质`Material`。
2. 创建精灵模型`Sprite`
    - 创建精灵模型对象`Sprite`和创建网格模型对象一样需要创建一个材质对象，不同的地方在于创建精灵模型对象不需要创建几何体对象`Geometry`。
    - 精灵模型`Sprite`默认是一个矩形形状，默认长宽都是1，默认在坐标原点位置。

```javascript
// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
  color:0x00ffff,//设置颜色
});
// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);

// 设置精灵模型在三维空间中的位置坐标
sprite.position.set(0,50,0);
// 控制精灵大小
sprite.scale.set(50, 25, 1); //只需要设置x、y两个分量就可以
```



### 精灵模型标注场景（贴图）
1. 引入纹理图
2. `.map`设置贴图
3. `.transparent`是否透明 如果贴图是背景透明的png贴图，需要把`.transparent`设置为true
4. `.color`与`.map`混合 如果`.map`是纯白色贴图，你可以通过设置`.color`,把精灵模型设置为其他任意颜色。



```javascript
const texture = new THREE.TextureLoader().load("./光点.png");
const spriteMaterial = new THREE.SpriteMaterial({
  color: 0x00ffff,//设置颜色
  map: texture, //设置精灵纹理贴图
  transparent: true,//SpriteMaterial默认是true
});
const sprite = new THREE.Sprite(spriteMaterial);
// 控制精灵大小
sprite.scale.set(10, 10, 1);
```



### [Sprite模拟下雨、下雪](http://www.webgl3d.cn/pages/477843/)
1. Sprite模拟雨滴
2. 雨滴在3D空间随机分布
3. 周期性改变雨滴Sprite位置
4. 根据时间计算Sprite位置 `clock.getDelta()`获得前后两次执行该方法的时间间隔
5. 相机镜头附近的雨滴偏大，可以把相机的near参数调大一些



```javascript
const texture = new THREE.TextureLoader().load("雨滴.png");
const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
});
// 批量创建多个精灵模型，在一个长方体空间上随机分布
const group = new THREE.Group();
model.add(group);
for (let i = 0; i < 16000; i++) {
    // 精灵模型共享材质
    const sprite = new THREE.Sprite(spriteMaterial);
    group.add(sprite);
    sprite.scale.set(1, 1, 1);
    // 设置精灵模型位置，在长方体空间上上随机分布
    const x = 1000 * (Math.random() - 0.5);
    const y = 600 * Math.random();
    const z = 1000 * (Math.random() - 0.5);
    sprite.position.set(x, y, z)
}

const clock = new THREE.Clock();
function loop() {
    // loop()两次执行时间间隔
    const t = clock.getDelta();
    // loop()每次执行都会更新雨滴的位置，进而产生动画效果
    group.children.forEach(sprite => {
        // 雨滴的y坐标每次减t*60
        sprite.position.y -= t*60;
        if (sprite.position.y < 0) {
            // 如果雨滴落到地面，重置y，从新下落
            sprite.position.y = 600;
        }
    });
    requestAnimationFrame(loop);
}
loop();
```

