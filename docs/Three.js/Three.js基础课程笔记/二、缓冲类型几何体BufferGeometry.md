# 二、缓冲类型几何体BufferGeometry

BufferGeometry是一个没有任何形状的空几何体，你可以通过BufferGeometry自定义任何几何形状，具体一点说就是定义**顶点数据**。

### 定义一个几何体
1. 通过缓冲类型几何体`BufferGeometry`创建空几何体对象
2. 通过javascript[类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)`Float32Array`创建一组xyz坐标数据用来表示几何体的顶点坐标
3. 通过`BufferAttribute`定义几何体顶点数据
4. 设置几何体顶点`.attributes.position`

```javascript
const geometry = new THREE.BufferGeometry(); //创建一个空几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标
  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10, //顶点6坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;
```



### 创建点模型对象
1. 创建点材质`PointsMaterial`
2. 使用几何体和点材质 创建点模型对象`Points`

```javascript
// 点渲染模式
const material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 10.0 //点对象像素尺寸
}); 
const points = new THREE.Points(geometry, material); // 点模型对象
```



### 创建线模型对象
1. 创建线材质`LineBasicMaterial`
2. 使用几何体和线材质 创建线模型对象
    - `Line`：一条连续的线
    - `LineLoop`：一条头尾相接的连续的线
    - `LineSegments`：线段

```javascript
// 线条渲染模式
const material = new THREE.LineBasicMaterial({
    color: 0xffff00 //线条颜色
}); //材质对象
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
const line = new THREE.Line(geometry, material); //线条模型对象
```



### 创建网格模型对象
网格模型Mesh其实就一个一个三角形(面)拼接构成。使用网格模型Mesh渲染几何体geometry，就是几何体所有顶点坐标三个为一组，构成一个三角形，多组顶点构成多个三角形，就可以用来模拟表示物体的表面。

空间中一个三角形有正反两面，那么Three.js的规则是如何区分正反面的？非常简单，你的眼睛(相机)对着三角形的一个面，**如果三个顶点的顺序是逆时针方向，该面视为正面，如果三个顶点的顺序是顺时针方向，该面视为反面。**

```javascript
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff, //材质颜色
    // side: THREE.FrontSide, //默认只有正面可见
    // side: THREE.BackSide, //设置只有背面可见
    side: THREE.DoubleSide, //两面可见
});
// 网格模型本质：一个一个三角形(面)构成
const mesh = new THREE.Mesh(geometry, material); 
```



### 构建一个矩形平面几何体
一个矩形平面，可以至少通过两个三角形拼接而成。而且两个三角形有两个顶点的坐标是重合的。

```javascript
//类型数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标

    0, 0, 0, //顶点4坐标   和顶点1位置相同
    80, 80, 0, //顶点5坐标  和顶点3位置相同
    0, 80, 0, //顶点6坐标
]);

```



### 几何体顶点索引数据
可以借助几何体顶点索引`geometry.index`来减少顶点坐标数据量

1、把上一节三角形重复的顶点位置坐标删除

2、通过Uint16Array类型数组创建顶点索引数据

3、索引数据赋值给几何体的index属性

```javascript
import * as THREE from 'three';

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
// 类型数组创建顶点数据 把上一节三角形重复的顶点位置坐标删除
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标
    0, 80, 0, //顶点4坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// Uint16Array类型数组创建顶点索引数据
const indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3,
])
// BufferAttribute表示顶点索引属性的值
geometry.index = new THREE.BufferAttribute(indexes, 1); // 1个为一组
// 索引数据赋值给几何体的index属性
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff, 
    // side: THREE.FrontSide, //默认只有正面可见
    // side: THREE.BackSide, //设置只有背面可见
    side: THREE.DoubleSide, //两面可见
});
// 网格模型本质：一个一个三角形(面)构成
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

### 顶点法线数据
把前面两节课的案例源码中`MeshBasicMaterial`材质改为`MeshLambertMaterial`材质，你会发现原来的矩形平面无法正常渲染，这其实很简单，使用受光照影响的材质，几何体BufferGeometry需要定义**顶点法线**数据`.attributes.normal`。

Three.js中法线是通过顶点定义，默认情况下，每个顶点都有一个法线数据，就像每一个顶点都有一个位置数据。

```javascript
// 矩形平面，有索引，两个三角形，有2个顶点重合，有4个顶点
// 每个顶点的法线数据和顶点位置数据一一对应
const normals = new Float32Array([
    0, 0, 1, //顶点1法线( 法向量 )
    0, 0, 1, //顶点2法线
    0, 0, 1, //顶点3法线
    0, 0, 1, //顶点4法线
]);
// 设置几何体的顶点法线属性.attributes.normal
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);


// MeshBasicMaterial不受光照影响
// 使用受光照影响的材质，几何体Geometry需要定义顶点法线数据
const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, 
    side: THREE.DoubleSide, //两面可见
});

```



### [查看threejs自带几何体顶点](http://www.webgl3d.cn/pages/d8b07b/)
### [旋转、缩放、平移几何体](http://www.webgl3d.cn/pages/1b0d6c/)
