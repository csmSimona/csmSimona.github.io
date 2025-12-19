# 八、渲染器和前端UI界面

### Three.js背景透明度
通过Three.js渲染一个模型的时候，不希望canvas画布有背景颜色，也就是canvas画布完全透明，可以透过canvas画布看到画布后面叠加的HTML元素图文，呈现出来一种三维模型悬浮在网页上面的效果。

**1、`.setClearAlpha()`方法**

改变背景透明度值

```javascript
renderer.setClearAlpha(0.8);
// 完全透明
renderer.setClearAlpha(0.0);
```

**2、背景透明`alpha: true`**

```javascript
// 在构造函数参数中设置alpha属性的值
var renderer = new THREE.WebGLRenderer({
  alpha: true
});
```

**3、`.setClearColor()`方法**

`.setClearColor()`方法的参数2，可以用来设置背景颜色透明度。

```javascript
renderer.setClearColor(0xb9d3ff, 0.4); //设置背景颜色和透明度
```



### Three.js渲染结果保存为图片
1. 配置webgl渲染器`preserveDrawingBuffer:true`
2. 按钮绑定鼠标事件
3. 创建超链接元素a：用于保存下载文件
4. Canvas画布通过`.toDataURL()`方法可以获取画布上的像素信息

```javascript
// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
    //想把canvas画布上内容下载到本地，需要设置为true
    preserveDrawingBuffer:true,
});

// 鼠标单击id为download的HTML元素，threejs渲染结果以图片形式下载到本地
document.getElementById('download').addEventListener('click',function(){
    // 创建一个超链接元素，用来下载保存数据的文件
    const link = document.createElement('a');
    // 通过超链接herf属性，设置要保存到文件中的数据
    const canvas = renderer.domElement; //获取canvas对象
    link.href = canvas.toDataURL("image/png");
    link.download = 'threejs.png'; //下载文件名
    link.click(); //js代码触发超链接元素a的鼠标点击事件，开始下载文件到本地
})

```

以不同的格式获取像素信息

```javascript
canvas.toDataURL("image/png");
canvas.toDataURL("image/jpeg");
canvas.toDataURL("image/bmp");
```



### 深度冲突(模型闪烁)
创建两个重合的矩形平面Mesh，通过浏览器预览，当你旋转三维场景的时候，你会发现模型渲染的时候产生闪烁。

这种现象，主要是两个Mesh重合，电脑GPU分不清谁在前谁在后，这种现象，可以称为深度冲突`Z-fighting`。

解决方法：

+ 两个矩形Mesh拉开距离  

适当偏移，解决深度冲突，偏移尺寸相对模型尺寸比较小，视觉上两个平面近似还是重合效果。  

注意：当两个面间隙很小，也可能出现深度冲突。

从纯理论的角度，你能分清0和0.0000...0000001的大小，但是实际上，电脑GPU精度是有限的。

```javascript
mesh2.position.z = 1;
```

+ webgl渲染器设置对数深度缓冲区  

当一个三维场景中有一些面距离比较近，有深度冲突，你可以尝试设置webgl渲染器设置对数深度缓冲区`logarithmicDepthBuffer: true`来优化或解决。  

`logarithmicDepthBuffer: true`作用简单来说，就是两个面间距比较小的时候，让threejs更容易区分两个面，谁在前，谁在后。

```javascript
// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
    // 设置对数深度缓冲区，优化深度冲突问题
    logarithmicDepthBuffer: true
});
```

注意：当两个面间隙过小，或者重合，你设置webgl渲染器对数深度缓冲区也是无效的



### 模型加载进度条
`loader.load(模型路径,加载完成函数,加载过程函数)`

模型本身是有大小的，通过浏览器从服务器加载的时候，本身网络传输是需要时间的。

`.load()`方法的参数2是一个函数，参数2函数是模型加载完成以后才会被调用执行。

`.load()`方法的参数3是一个函数，通过函数的参数获取模型加载信息,每当模型加载部分内容，该函数就会被调用，一次加载过程中一般会被调用多次，直到模型加载完成。

```javascript
const percentDiv = document.getElementById("per"); // 获取进度条元素

loader.load("../工厂.glb", function (gltf) {
    model.add(gltf.scene);
    // 加载完成，隐藏进度条
    // document.getElementById("container").style.visibility ='hidden';
    document.getElementById("container").style.display = 'none';
}, function (xhr) {
    // 控制台查看加载进度xhr
    // 通过加载进度xhr可以控制前端进度条进度   
    const percent = xhr.loaded / xhr.total;
    console.log('加载进度' + percent);
     
    percentDiv.style.width = percent * 400 + "px"; //进度条元素长度
    percentDiv.style.textIndent = percent * 400 + 5 + "px"; //缩进元素中的首行文本
    // Math.floor:小数加载进度取整
    percentDiv.innerHTML = Math.floor(percent * 100) + '%'; //进度百分比
})
```

