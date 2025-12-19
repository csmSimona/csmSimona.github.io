# 六、加载外部三维模型(gltf)

### 加载.gltf文件(模型加载全流程)
1. gltf模型加载器`GLTFLoader.js`

```javascript
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 创建GLTF加载器对象
const loader = new GLTFLoader();

loader.load( 'gltf模型.gltf', function ( gltf ) {
  console.log('控制台查看加载gltf文件返回的对象结构',gltf);
  console.log('gltf对象场景属性',gltf.scene);
  // 返回的场景对象gltf.scene插入到threejs场景中
  scene.add( gltf.scene );
})
```

2. 相机参数根据需要设置 大部分3D项目，一般都是使用**透视投影相机**`PerspectiveCamera`

```javascript
// 近裁截面near和远裁截面far，要能包含你想渲染的场景，否则超出视锥体模型会被剪裁掉，简单说near足够小，far足够大，主要是far。
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// camera.position.set(200, 200, 200);// 第1步：根据场景渲染范围尺寸设置 
camera.position.set(292, 223, 185);// 第2步：通过相机控件OrbitControls的.position属性辅助设置
camera.lookAt(100, 0, 0); // 通过相机控件OrbitControls的.lookAt属性辅助设置

// 注意相机控件OrbitControls会影响lookAt设置，注意手动设置OrbitControls的目标参数，默认0,0,0
// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(100, 0, 0);
controls.update();//update()函数内会执行camera.lookAt(controls.targe)
```

3. 加载gltf的时候，webgl渲染器编码方式设置 查WebGL渲染器文档，你可以看到`.outputColorSpace`的默认值就是SRGB颜色空间`THREE.SRGBColorSpace`，意味着新版本代码中，加载gltf，没有特殊需要，不设置`.outputColorSpace`也不会引起色差。

```javascript
// 纹理贴图颜色偏差解决
renderer.outputColorSpace = THREE.SRGBColorSpace;//设置为SRGB颜色空间
```



### 加载gltf不同文件形式
单独.gltf文件

```javascript
// 单独.gltf文件
loader.load("../../工厂.gltf", function (gltf) { 
    scene.add(gltf.scene);
})
```

单独.glb文件

```javascript
// 单独.glb文件
loader.load("../../工厂.glb", function (gltf) { 
    scene.add(gltf.scene);
})
```

.gltf + .bin + 贴图文件

```javascript
// .gltf + .bin + 贴图文件
loader.load("../../工厂/工厂.gltf", function (gltf) { 
    scene.add(gltf.scene);
})
```



### 解决多个mesh共享材质的问题
1. 三维建模软件中设置，需要代码改变材质的Mesh不要共享材质，要独享材质。
2. 代码批量更改：克隆材质对象，重新赋值给mesh的材质属性

```javascript
//用代码方式解决mesh共享材质问题
gltf.scene.getObjectByName("小区房子").traverse(function (obj) {
    if (obj.isMesh) {
        // .material.clone()返回一个新材质对象，和原来一样，重新赋值给.material属性
        obj.material = obj.material.clone();
    }
});
mesh1.material.color.set(0xffff00);
mesh2.material.color.set(0x00ff00);
```

### 纹理和渲染器colorSpace
如果没有特殊需要，一般为了正常渲染，避免颜色偏差，threejs代码中需要颜色贴图`.colorSpace`和渲染器`.colorSpace`属性值保持一致。

```javascript
THREE.NoColorSpace = ""
THREE.SRGBColorSpace = "srgb"
THREE.LinearSRGBColorSpace = "srgb-linear"
```



```javascript
//解决加载gltf格式模型颜色偏差问题
renderer.colorSpace = THREE.SRGBColorSpace;
texture.colorSpace = THREE.SRGBColorSpace;
```



### gltf模型更换纹理.map
如果你直接给gltf模型材质设置`.map`属性更换贴图，可能会出现纹理贴图错位的问题，这主要和纹理对象`Texture`的翻转属性`.flipY`有关。

`.flipY`表示是否翻转纹理贴图在Mesh上的显示位置。

纹理对象`Texture`翻转属性`.flipY`默认值是true。

```javascript
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('./黑色.png');// 加载手机mesh另一个颜色贴图
texture.colorSpace = THREE.SRGBColorSpace; //和渲染器.colorSpace 一样值

loader.load("../手机模型.glb", function (gltf) {
    const mesh = gltf.scene.children[0]; //获取Mesh
    console.log('.flipY', mesh.material.map.flipY);
    // 注意把纹理贴图.flipY的值设置给gltf中纹理的值
    // 是否翻转纹理贴图
    texture.flipY = false;
})
```

