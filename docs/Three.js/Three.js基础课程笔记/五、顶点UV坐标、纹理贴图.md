# 五、顶点UV坐标、纹理贴图

### 创建纹理贴图
通过纹理贴图加载器`TextureLoader`的`load()`方法加载一张图片可以返回一个纹理对象`Texture`，纹理对象`Texture`可以作为模型材质颜色贴图`.map`属性的值。

**注意：最新版本，webgl渲染器默认编码方式已经改变，为了避免色差，纹理对象编码方式要修改为**`THREE.SRGBColorSpace`

```javascript
const geometry = new THREE.PlaneGeometry(200, 100); 
//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load('./earth.jpg');
texture.colorSpace  = THREE.SRGBColorSpace; //设置为SRGB颜色空间

const material = new THREE.MeshLambertMaterial({
    // 设置纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//map表示材质的颜色贴图属性
});
```



### 自定义顶点UV坐标
**顶点UV坐标**的作用是从纹理贴图上提取像素映射到网格模型Mesh的几何体表面上。

顶点UV坐标可以在0~1.0之间任意取值，纹理贴图**左下角**对应的UV坐标是`(0,0)`，**右上角**对应的坐标`(1,1)`。

顶点UV坐标`geometry.attributes.uv`和顶点位置坐标`geometry.attributes.position`是一一对应的

自定义顶点UV：

```javascript
/**纹理坐标0~1之间随意定义*/
const uvs = new Float32Array([
    0, 0, //图片左下角
    1, 0, //图片右下角
    1, 1, //图片右上角
    0, 1, //图片左上角
]);
// 设置几何体attributes属性的位置normal属性
geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标
```



### 圆形平面设置纹理贴图
通过圆形几何体`CircleGeometry`创建一个网格模型Mesh，把一张图片作为圆形Mesh材质的颜色贴图，这样就可以把一张方形图片剪裁渲染为圆形效果。

```javascript
//CircleGeometry的顶点UV坐标是按照圆形采样纹理贴图
const geometry = new THREE.CircleGeometry(60, 100);
//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('./texture.jpg');
const material = new THREE.MeshBasicMaterial({
    map: texture,//map表示材质的颜色贴图属性
    side:THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
```



### 纹理对象Texture阵列
使用threejs纹理对象`Texture`的阵列功能+矩形平面几何体`PlaneGeometry`实现一个地面瓷砖效果

1. 矩形平面设置颜色贴图

```javascript
const geometry = new THREE.PlaneGeometry(2000, 2000);
//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load('./瓷砖.jpg');
const material = new THREE.MeshLambertMaterial({
    // 设置纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//map表示材质的颜色贴图属性
});
const mesh = new THREE.Mesh(geometry, material);
```

2. 纹理对象`Texture`的阵列功能

```javascript
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load('./瓷砖.jpg');
// 设置阵列模式
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(12,12);//注意选择合适的阵列数量
```

3. 旋转矩形平面矩形平面默认是在XOY平面上，如果你想平行于XOZ平面，就需要手动旋转。

```javascript
// 旋转矩形平面
mesh.rotateX(-Math.PI/2);
```



### 矩形Mesh+背景透明png贴图
整体思路：创建一个矩形平面，设置颜色贴图`.map`,注意选择背景透明的`.png`图像作为颜色贴图，同时材质设置`transparent: true`，这样png图片背景完全透明的部分不显示。

```javascript
// 矩形平面网格模型设置背景透明的png贴图
const geometry = new THREE.PlaneGeometry(60, 60); //默认在XOY平面上
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./指南针.png'),        
    transparent: true, //使用背景透明的png贴图，注意开启透明计算
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
```



网格地面辅助观察`GridHelper`

```javascript
// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
```



### UV动画
通过纹理对象的偏移属性`.offset`实现一个UV动画效果

纹理对象Texture的`.offset`的功能是偏移贴图在Mesh上位置，本质上相当于修改了UV顶点坐标。

1. 通过阵列纹理贴图设置`.map`
2. 渲染循环中通过`.offset`设置了纹理映射偏移
3. 把`.wrapS`或`.wrapT`设置为重复映射模式`THREE.RepeatWrapping`

```javascript
// 一个矩形平面几何体用来表示传送带
const geometry = new THREE.PlaneGeometry(200, 20);
//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load('./纹理3.jpg');

const material = new THREE.MeshLambertMaterial({
    map: texture,//map表示材质的颜色贴图属性
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI/2);

// 设置阵列
texture.wrapS = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.x=50;//注意选择合适的阵列数量


// 渲染循环
function render() {
    texture.offset.x +=0.001;//设置纹理动画：偏移量根据纹理和动画需要，设置合适的值
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();
```



## 
