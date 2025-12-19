# 七、PBR材质与纹理贴图

PBR就是基于物理的渲染(physically-based rendering)。

Three.js提供了两个PBR材质相关的API`标准网格材质(MeshStandardMaterial)`和`物理网格材质(MeshPhysicalMaterial)`。

`MeshPhysicalMaterial`是`MeshStandardMaterial`扩展的子类，提供了更多功能属性。

![](../image/image_KNmnCG_03p.png)

### PBR材质金属度`metalness` 和粗糙度`roughness`
**金属度**`metalness`

表示材质像**金属**的程度, 非金属材料,如木材或石材,使用0.0,金属使用1.0。

threejs的PBR材质，`.metalness`默认是0.5,0.0到1.0之间的值可用于生锈的金属外观。

**粗糙度**`roughness`

表示模型表面的光滑或者说粗糙程度，越光滑镜面反射能力越强，越粗糙，表面镜面反射能力越弱，更多地表现为漫反射。

粗糙度`roughness`,0.0表示平滑的镜面反射,1.0表示完全漫反射,默认0.5。

**示例：重新设置材质的金属度和粗糙度属性**

```javascript
// 引入Three.js
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("../../金属.glb", function (gltf) { 
    // 递归遍历所有模型节点批量修改材质
    gltf.scene.traverse(function(obj) {
        if (obj.isMesh) {//判断是否是网格模型
            // 重新设置材质的金属度和粗糙度属性
            obj.material.metalness = 1.0;//金属度
            obj.material.roughness = 0.5;//表面粗糙度
            
            // obj.material = new THREE.MeshStandardMaterial({
            //     color: obj.material.color, //读取材质原来的颜色
            //     // 金属度属性metalness：材质像金属的程度, 非金属材料,如木材或石材,使用0.0,金属使用1.0。
            //     // metalness默认0.5,0.0到1.0之间的值可用于生锈的金属外观
            //     metalness: 1.0,
            //     // metalness: 0.0,//没有金属质感    
            //     // 粗糙度属性roughness:模型表面粗糙程度,0.0表示平滑的镜面反射,1.0表示完全漫反射,默认0.5                      
            //     roughness: 0.5,
            //     // roughness: 1.0,//设置到完全漫反射状态，表面金属质感比较弱
            //     // roughness: 0.0,//完全镜面反射，就像一面镜子一样，注意配合环境贴图观察更明显
            // })
        }
    });
    model.add(gltf.scene);
})
export default model;
```

### 环境贴图`envMap`**和场景环境属性**`.environment`
立方体纹理加载器`CubeTextureLoader`的`.load()`方法是加载6张图片，返回一个立方体纹理对象`CubeTexture`。

所谓**环境贴图**，就是一个模型周围的环境的图像，比如一间房子，房子的**上下左右前后**分别拍摄一张照片，就是3D空间中6个角度方向的照片。

**环境贴图**`envMap`**属性**

实际生活中，一个物体表面，往往会反射周围的环境。人的眼睛看到的东西，往往反射有周围景物，所以three.js渲染模型，如果想渲染效果更好看，如果想更符合实际生活情况，也需要想办法让模型反射周围景物。

MeshStandardMaterial材质的环境贴图属性是`.envMap`，通过PBR材质的贴图属性可以实现模型表面反射周围景物，这样渲染效果更好。

**环境贴图反射率**`.envMapIntensity`

`MeshStandardMaterial`的`.envMapIntensity`属性主要用来设置模型表面反射周围环境贴图的能力，或者说环境贴图对模型表面的影响能力。具体说`.envMapIntensity`相当于环境贴图的系数，环境贴图像素值乘以该系数后，在用于影响模型表面。

**示例：通过环境贴图设置材质的金属效果**

```javascript
// 加载环境贴图
// 加载周围环境6个方向贴图
// 上下左右前后6张贴图构成一个立方体空间
// 'px.jpg', 'nx.jpg'：x轴正方向、负方向贴图  p:正positive  n:负negative
// 'py.jpg', 'ny.jpg'：y轴贴图
// 'pz.jpg', 'nz.jpg'：z轴贴图
// CubeTexture表示立方体纹理对象，父类是纹理对象Texture
const textureCube = new THREE.CubeTextureLoader()
    .setPath('../../环境贴图/环境贴图0/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
   
loader.load("../../金属.glb", function (gltf) {
    // 递归遍历所有模型节点批量修改材质
    gltf.scene.traverse(function (obj) {
        if (obj.isMesh) { //判断是否是网格模型
            // console.log('obj.material',obj.material);
            // 重新设置材质的金属度和粗糙度属性
            obj.material.metalness = 1.0; //金属度
            obj.material.roughness = 0.35; //表面粗糙度
            obj.material.envMap = textureCube; //设置环境贴图
            // envMapIntensity：控制环境贴图对mesh表面影响程度
            obj.material.envMapIntensity = 1.0;//默认值1, 设置为0.0,相当于没有环境贴图


            // obj.material = new THREE.MeshStandardMaterial({
            //     color: obj.material.color, //读取材质原来的颜色
            //     metalness: 1.0, //金属度
            //     roughness: 0.5, //粗糙度
            //     envMap: textureCube, //设置pbr材质环境贴图
            //     // envMapIntensity：控制环境贴图对mesh表面影响程度
            //     envMapIntensity: 0.0, //默认值1, 设置为0.0,相当于没有环境贴图
            // })
        }
    });
    model.add(gltf.scene);
})
```

**场景环境属性**`.environment`

如果你希望环境贴图影响场景中scene所有Mesh，可以通过Scene的场景环境属性`.environment`实现,把环境贴图对应纹理对象设置为`.environment`的属性值即可。

```javascript
//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

const textureCube = new THREE.CubeTextureLoader()
    // .setPath('../../环境贴图/环境贴图0/')
    .setPath('../../环境贴图/环境贴图3/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
texture.colorSpace = THREE.SRGBColorSpace; // 和renderer.colorSpace一致
// 环境贴图纹理对象textureCube作为.environment属性值,影响所有模型
scene.environment = textureCube;
```

### MeshPhysicalMaterial清漆层`clearcoat`
MeshPhysicalMaterial是在MeshStandardMaterial基础上扩展出来的子类，除了继承了MeshStandardMaterial的金属度、粗糙度等属性，还新增了清漆`.clearcoat`、透光率`.transmission`、反射率`.reflectivity`、光泽`.sheen`、折射率`.ior`等等各种用于模拟生活中不同材质的属性。

**示例：车外壳油漆效果**

车外壳油漆效果，可以通过PBR材质的清漆层属性`.clearcoat`和清漆层粗糙度`.clearcoatRoughness`属性模拟。

```javascript
const mesh = gltf.scene.getObjectByName('外壳01');
mesh.material = new THREE.MeshPhysicalMaterial( {
  clearcoat: 1.0,//物体表面清漆层或者说透明涂层的厚度
  clearcoatRoughness: 0.1,//透明涂层表面的粗糙度
} );
```

### 物理材质透光率`transmission`
为了更好的模拟玻璃、半透明塑料一类的视觉效果，可以使用物理透明度`.transmission`属性代替Mesh普通透明度属性`.opacity`。

使用`.transmission`属性设置Mesh透明度,即便完全透射的情况下仍可保持高反射率。

物理光学透明度`.transmission`的值范围是从0.0到1.0。默认值为0.0。

**折射率**`.ior`：非金属材料的折射率从1.0到2.333。默认值为1.5。不同材质的折射率，可以上网查询。

**示例：通过设置透光率**`.transmission`**和折射率**`.ior`**等实现玻璃效果。**

```javascript
const mesh = gltf.scene.getObjectByName('玻璃01')
mesh.material = new THREE.MeshPhysicalMaterial({
    metalness: 0.0,//玻璃非金属 
    roughness: 0.0,//玻璃表面光滑
    envMap: textureCube,//环境贴图
    envMapIntensity: 1.0, //环境贴图对Mesh表面影响程度
    // 设置透光率.transmission和折射率.ior
    transmission: 1.0, //玻璃材质透光率，transmission替代opacity 
    ior: 1.5,//折射率
})
```

**GUI可视化调试PBR材质属性**

gui.js库的使用参考**快速入门**章节介绍

```javascript
const obj = {
    color: mesh.material.color, // 材质颜色
};
// 材质颜色color
matFolder.addColor(obj, 'color').onChange(function (value) {
    mesh.material.color.set(value);
});
// 范围可以参考文档
matFolder.add(mesh.material,'metalness',0,1);
matFolder.add(mesh.material,'roughness',0,1);
matFolder.add(mesh.material,'transmission',0,1);
matFolder.add(mesh.material,'ior',0,3);
matFolder.add(mesh.material,'envMapIntensity',0,10);
```

