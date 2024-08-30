## Three.js学习笔记

### 定义一个点

```js
var point1 = new THREE.Vecotr3(4,8,9);

// 或

var point1 = new THREE.Vector3();
point1.set(4,8,9);
```



### 案例一：画一条彩色的线（ 通过定义两个点，来画一条直线 ）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>画一条彩色的线</title>
    <script src="js/three.js"></script>
    <style type="text/css">
        div#canvas-frame {
            border: none;
            cursor: pointer;
            width: 100%;
            height: 600px;
            background-color: #EEEEEE;
        }
    </style>
    <script>
        // 初始化渲染器
        var renderer;
        function initThree() {
            width = document.getElementById('canvas-frame').clientWidth;
            height = document.getElementById('canvas-frame').clientHeight;
            renderer = new THREE.WebGLRenderer({
                antialias: true
            })
            // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
            renderer.setSize(width, height);
            // 添加画布到body上
            document.getElementById('canvas-frame').appendChild(renderer.domElement);
            renderer.setClearColor(0xFFFFFF, 1.0);
        }

        // 初始化相机  相机不止一种，每个相机都有自己不同的参数
        // THREE.PerspectiveCamera：透视相机
        function initCamera() {
            // 该构造函数总共有四个参数，分别是fov，aspect，near，far
            // fov表示摄像机视锥体垂直视野角度，最小值为0，最大值为180，默认值为50，实际项目中一般都定义45，因为45最接近人正常睁眼角度；
            // aspect表示摄像机视锥体长宽比，默认长宽比为1，即表示看到的是正方形，实际项目中使用的是屏幕的宽高比；
            // near表示摄像机视锥体近端面，这个值默认为0.1，实际项目中都会设置为1；
            // far表示摄像机视锥体远端面，默认为2000，这个值可以是无限的，说的简单点就是我们视觉所能看到的最远距离。
            camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            // position用来指定相机在三维坐标中的位置
            camera.position.x = 0;
            camera.position.y = 1000;
            camera.position.z = 0;
            // up用来指定相机拍摄时相机头顶的方向
            camera.up.x = 0;
            camera.up.y = 0;
            camera.up.z = 1;
            // lookAt表示相机拍摄时指向的中心点
            camera.lookAt({
                x: 0,
                y: 0,
                z: 0
            })
        }

        // 初始化场景  场景只有一种
        var scene;
        function initScene() {
            scene = new THREE.Scene();
        }

        // 初始化光线
        var light;
        function initLight() {
            // THREE.DirectionalLight平行光可以看作距离很远的光。它发出的所有光线都是平行的。
            // 与点光源和聚光灯光源最大的区别就是，点光源和聚光灯光源距离物体越远光线越暗。光是从一点发出的。而被平行光照亮的整个区域接收到的光强是一样的。光是平行的。
            light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
            light.position.set(100, 100, 200);
            scene.add(light);
        }

        // 初始化几何体
        var cube;
        function initObject() {
            var geometry = new THREE.Geometry();
            
            // 定义一种线条的材质，使用THREE.LineBasicMaterial类型来定义，它接受一个集合作为参数
            // 其原型如下: LineBasicMaterial( parameters )
            // Parameters是一个定义材质外观的对象，它包含多个属性来定义材质，这些属性是：
            // Color：线条的颜色，用16进制来表示，默认的颜色是白色。
            // Linewidth：线条的宽度，默认时候1个单位宽度。
            // Linecap：线条两端的外观，默认是圆角端点，当线条较粗的时候才看得出效果，如果线条很细，那么你几乎看不出效果了。
            // Linejoin：两个线条的连接点处的外观，默认是“round”，表示圆角。
            // VertexColors：定义线条材质是否使用顶点颜色，这是一个boolean值。意思是，线条各部分的颜色会根据顶点的颜色来进行插值。
            // Fog：定义材质的颜色是否受全局雾效的影响。
            
            // 使用顶点颜色vertexColors: THREE.VertexColors，就是线条的颜色会根据顶点来计算
            var material = new THREE.LineBasicMaterial({ vertexColors: true});
            var color1 = new THREE.Color(0x444444),
            color2 = new THREE.Color(0xFF0000);

            // 定义点的位置
            var p1 = new THREE.Vector3(-100, 0, 100);
            var p2 = new THREE.Vector3(200, 0, -100);
            
            // 几何体里面的vertices变量，可以用来存放点
            geometry.vertices.push(p1);
            geometry.vertices.push(p2);
            geometry.colors.push(color1, color2);

            var line = new THREE.Line(geometry, material, THREE.LinePieces);
            scene.add(line);
        }

        function threeStart() {
            initThree();
            initCamera();
            initScene();
            initLight();
            initObject();
            renderer.clear();
            renderer.render(scene, camera);
        }
    </script>
</head>
<body onload="threeStart();">
    <div id="canvas-frame"></div>
</body>
</html>
```



###  Threejs使用的是右手坐标系 

左手坐标系， x轴正方向向右，y轴正方向向上，z轴由屏幕从外向里 

右手坐标系， x轴正方向向右，y轴正方向向上，z轴由屏幕从里向外 



### 案例二：画一个坐标系

```js
var cube;
function initObject() {
    var geometry = new THREE.Geometry();
    // B begin
    geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
    geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );
    // B end

    for ( var i = 0; i <= 20; i ++ ) {
        // 将这条线段复制20次，分别平行移动到z轴的不同位置，就能够形成一组平行的线段
        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
        line.position.z = ( i * 50 ) - 500;
        scene.add( line );
        
        // 将p1p2这条线先围绕y轴旋转90度，然后再复制20份，平行于z轴移动到不同的位置，也能形成一组平行线
        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
        line.position.x = ( i * 50 ) - 500;
        line.rotation.y = 90 * Math.PI / 180;
        scene.add( line );

    }
}
```



### 渲染循环

渲染的时候，调用渲染器的render() 函数：`renderer.render( scene, camera );`

如果我们改变了物体的位置或者颜色之类的属性，就必须重新调用render()函数，才能够将新的场景绘制到浏览器中去。不然浏览器是不会自动刷新场景的。

如果不断的改变物体的颜色，那么就需要不断的绘制新的场景，所以我们最好的方式，是让画面执行一个循环，不断的调用render来重绘，这个循环就是渲染循环，在游戏中，也叫游戏循环。

为了实现循环，我们需要javascript的一个特殊函数，这个函数是requestAnimationFrame。

调用requestAnimationFrame函数，传递一个callback参数，则在下一个动画帧时，会调用callback这个函数。

```js
function animate() {

    render();

    requestAnimationFrame( animate );

}
```

这样就会不断的执行animate这个函数。也就是不断的执行render()函数。在render()函数中不断的改变物体或者摄像机的位置，并渲染它们，就能够实现动画了。



### 案例三：通过移动照相机实现物体移动效果

**几何体 THREE.CylinderGeometry** 

这也是一种非常简单的三维几何体，你甚至不需要指定任何参数就能创建出一个圆柱体。 

| 属性           | 描述                                                         |
| :------------- | :----------------------------------------------------------- |
| radiusTop      | 可选。此属性定义圆柱体顶部圆半径。默认值是 20                |
| radiusBottom   | 可选。此属性定义圆柱体底部圆半径。默认值是 20                |
| height         | 可选。此属性定义圆柱体的高度。默认值是 100                   |
| radiusSegments | 可选。此属性定义圆柱体的上下部的圆截面分成多少段。默认值是 8 |
| heightSegments | 可选。此属性定义圆柱体竖直方向上分成多少段。默认值是 1       |
| openEnded      | 可选。此属性定义圆柱体的顶部和底部是否为打开。默认值是 false |

**高级材质 THREE.MeshLambertMaterial**

- 这种材质可以用来创建暗淡的并不光亮的表面。
- 无光泽表面的材质，无镜面高光。
- 这可以很好地模拟一些表面（如未经处理的木材或石头），但不能用镜面高光（如上漆木材）模拟光泽表面。
- 该材质非常易用，而且会对场景中的光源产生反应。
- 可以配置的属性：color、opacity、shading、blending、depthTest、depthWrite、wireframe、wireframeLinewidth、wireframeLinecap、wireframeLineJoin、vertexColors和fog。



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>通过移动照相机实现物体移动效果</title>
    <script src="three.js"></script>
    <style type="text/css">
        div#canvas-frame {
            border: none;
            cursor: pointer;
            width: 100%;
            height: 600px;
            background-color: #EEEEEE;
        }
    </style>
    <script>
        var renderer;
        function initThree() {
            width = document.getElementById('canvas-frame').clientWidth;
            height = document.getElementById('canvas-frame').clientHeight;
            renderer = new THREE.WebGLRenderer({
                antialias : true
            });
            renderer.setSize(width, height);
            document.getElementById('canvas-frame').appendChild(renderer.domElement);
            renderer.setClearColor(0xFFFFFF, 1.0);
        }

        var camera;
        function initCamera() {
            camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 600;
            camera.up.x = 0;
            camera.up.y = 1;
            camera.up.z = 0;
            camera.lookAt({
                x: 0,
                y: 0,
                z: 0
            })
        }

        var scene;
        function initScene() {
            scene = new THREE.Scene();
        }

        var light;
        function initLight() {
            // THREE.AmbientLight 环境光 颜色会应用到全局，该光源并没有特别的来源方向，不会产生阴影
            light = new THREE.AmbientLight(0xFFFFFF);
            light.position.set(100, 100, 200);
            scene.add(light);
            // THREE.PointLight 点光源 是一种单点发光、照射所有方向的光源，不会产生阴影。
            light = new THREE.PointLight(0x00FF00);
            light.position.set(0, 0, 300);
            scene.add(light);
        }

        var cube;
        var mesh;
        function initObject() {
            // 创建几何体
            var geometry = new THREE.CylinderGeometry(100, 100, 400);
            var material = new THREE.MeshLambertMaterial({ color: 0xFFFF00});
            // 创建一个网格对象
            mesh = new THREE.Mesh(geometry, material);
            mesh.position = new THREE.Vector3(0, 0, 0);
            scene.add(mesh);
        }

        function threeStart() {
            initThree();
            initCamera();
            initScene();
            initLight();
            initObject();
            animation();
        }

        function animation() {
            // 向右移动照相机，效果相当于向左移动物体
            camera.position.x = camera.position.x + 1;
            renderer.render(scene, camera);
            requestAnimationFrame(animation);
        }
    </script>
</head>
<body onload="threeStart();">
    <div id="canvas-frame"></div>
</body>
</html>
```



### 案例四：通过移动物体实现物体移动效果

```js
function animation() {
    // 向左移动物体
    mesh.position.x -= 1;
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}
```



### 性能评估

 帧数：图形处理器每秒钟能够刷新几次，通常用fps（Frames Per Second）来表示。 

当物体在快速运动时,当人眼所看到的影像消失后，人眼仍能继续保留其影像1/24秒左右的图像，这种现象被称为视觉暂留现象。是人眼具有的一种性质。人眼观看物体时，成像于视网膜上，并由视神经输入人脑，感觉到物体的像。一帧一帧的图像进入人脑，人脑就会将这些图像给连接起来，形成动画。

毫无疑问，帧数越高，画面的感觉就会越好。所以大多数游戏都会有超过30的FPS。为了监视FPS，看看你的程序哪里占用了很多的CPU时间，就需要学习一下性能监视器。



#### 性能监视器Stats

在Three.js中，性能由一个性能监视器来管理。性能监视器的截图如下所示:

![img](http://www.hewebgl.com/attached/image/20130515/20130515140815_493.png)![img](http://www.hewebgl.com/attached/image/20130515/20130515140824_632.png)

FPS表示：上一秒的帧数，这个值越大越好，一般都为60左右。点击上面的图，就会变成下面的另一个视图。 

MS表示：渲染一帧需要的毫秒数，这个数字是越小越好。再次点击又可以回到FPS视图中。



#### 性能监视器Stats的使用

```js
var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms
// 将stats的界面对应左上角
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
setInterval( function () {
    stats.begin();
    // 你的每一帧的代码
    stats.end();
}, 1000 / 60 );
```

1、setMode函数

参数为0的时候，表示显示的是FPS界面，参数为1的时候，表示显示的是MS界面。

2、stats的domElement

stats的domElement表示绘制的目的地（DOM），波形图就绘制在这上面。

3、stats的begin函数

begin，在你要测试的代码前面调用begin函数，在你代码执行完后调用end()函数，这样就能够统计出这段代码执行的平均帧数了。

 Stats的begin和end 函数本质上是在统计代码执行的时间和帧数，然后用公式fps=帧数/时间 ，就能够得到FPS。Stats的这个功能，被封装成了一个更好的函数update，只需要在渲染循环中调用就可以了。 



### 相机

 在Threejs中相机的表示是THREE.Camera，它是相机的抽象基类。

其子类有两种相机，分别是正投影相机THREE.OrthographicCamera和透视投影相机THREE.PerspectiveCamera 

正投影和透视投影的区别是：透视投影有一个基本点，就是远处的物体比近处的物体小。 



#### 正投影相机

 **OrthographicCamera( left, right, top, bottom, near, far )** 

```js
var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

scene.add( camera );

// 这个例子将浏览器窗口的宽度和高度作为了视景体的高度和宽度，相机正好在窗口的中心点上。这也是我们一般的设置方法，基本上为了方便，我们不会设置其他的值。
```



#### 透视投影相机

 **PerspectiveCamera( fov, aspect, near, far )** 

1、fov表示摄像机视锥体垂直视野角度，最小值为0，最大值为180，默认值为50，实际项目中一般都定义45，因为45最接近人正常睁眼角度；
2、aspect表示摄像机视锥体长宽比，默认长宽比为1，即表示看到的是正方形，实际项目中使用的是屏幕的宽高比；
3、near表示摄像机视锥体近端面，表示你近处的裁面的距离。补充一下，也可以认为是眼睛距离近处的距离.这个值默认为0.1，实际项目中都会设置为1；
4、 far表示摄像机视锥体远端面，默认为2000，这个值可以是无限的，说的简单点就是我们视觉所能看到的最远距离。

```js
// 一般默认设置
var camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );

scene.add( camera );
```



### 光源

当没有任何光源的时候，最终的颜色将是黑色，无论材质是什么颜色。 

因为在场景中没有任何光源的情况下，物体不能反射光源到人的眼里。

#### 光源基类

**THREE.Light ( hex )**

参数hex，接受一个16进制的颜色值。

 ![img](http://www.hewebgl.com/attached/image/20130515/20130515163339_12.jpg) 



#### 环境光

环境光是经过多次反射而来的光称为环境光，无法确定其最初的方向。环境光是一种无处不在的光。环境光源放出的光线被认为来自任何方向。因此，当你仅为场景指定环境光时，所有的物体无论法向量如何，都将表现为同样的明暗程度。 （这是因为，反射光可以从各个方向进入您的眼睛）不会产生阴影。

环境光用THREE.AmbientLight来表示，它的构造函数如下所示：

**THREE.AmbientLight( hex )**

它仍然接受一个16进制的颜色值，作为光源的颜色。环境光将照射场景中的所有物体，让物体显示出某种颜色。环境光的使用例子如下所示：

```js
var light = new THREE.AmbientLight( 0xff0000 );

scene.add( light );
```



#### 点光源

由这种光源放出的光线来自同一点，且方向辐射自四面八方。例如蜡烛放出的光，萤火虫放出的光。不会产生阴影。

点光源用PointLight来表示，它的构造函数如下所示：

**THREE.PointLight( hex, intensity, distance )**

1、hex：光的颜色

2、Intensity：光的强度，默认是1.0，就是说是100%强度的灯光

3、distance：光的距离，从光源所在的位置，经过distance这段距离之后，光的强度将从Intensity衰减为0。 默认情况下，这个值为0.0，表示光源强度不衰减。



#### 聚光灯

这种光源的光线从一个锥体中射出，在被照射的物体上产生聚光的效果。使用这种光源需要指定光的射出方向以及锥体的顶角α。 

聚光灯的构造函数是：

**THREE.SpotLight( hex, intensity, distance, angle, exponent )**

函数的参数如下所示：

1、Hex：聚光灯发出的颜色，如0xFFFFFF

2、Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些。和上面点光源一样。

3、Distance：光线的强度，从最大值衰减到0，需要的距离。 默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.

4、Angle：聚光灯着色的角度，用弧度作为单位，这个角度是和光源的方向形成的角度。

5、exponent：光源模型中，衰减的一个参数，越大衰减约快。



#### 平行光

THREE.DirectionalLight平行光是一组没有衰减的平行的光线，类似太阳光的效果。可以看作距离很远的光。它发出的所有光线都是平行的。
与点光源和聚光灯光源最大的区别就是，点光源和聚光灯光源距离物体越远光线越暗。光是从一点发出的。而被平行光照亮的整个区域接收到的光强是一样的。光是平行的。

构造函数如下所示：

**THREE.DirectionalLight( hex, intensity, distance )**

1、hex：光的颜色

2、intensity：光的强度

3、distance：光的距离



### 纹理

 3D世界的纹理由图片组成

纹理实现： 首先应该有一个纹理类，其次是有一个加载图片的方法，将这张图片和这个纹理类捆绑起来。 

 纹理类由**THREE.Texture**表示，其构造函数如下所示： 

THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )

1、 Image：这是一个图片类型，基本上它由ImageUtils来加载 

```js
var image = THREE.ImageUtils.loadTexture(url);   
```

2、Mapping：是一个THREE.UVMapping()类型，它表示的是纹理坐标。

3、wrapS：表示x轴的纹理的回环方式，就是当纹理的宽度小于需要贴图的平面的宽度的时候，平面剩下的部分应该p以何种方式贴图的问题。

4、wrapT：表示y轴的纹理回环方式。 

5、magFilter和minFilter表示过滤的方式，这是OpenGL的基本概念，我将在下面讲一下，目前你不用担心它的使用。当您不设置的时候，它会取默认值，所以，我们这里暂时不理睬他。

6、format：表示加载的图片的格式，这个参数可以取值THREE.RGBAFormat，RGBFormat等。THREE.RGBAFormat表示每个像素点要使用四个分量表示，分别是红、绿、蓝、透明来表示。RGBFormat则不使用透明，也就是说纹理不会有透明的效果。

7、type：表示存储纹理的内存的每一个字节的格式，是有符号，还是没有符号，是整形，还是浮点型。不过这里默认是无符号型（THREE.UnsignedByteType）。

8、anisotropy：各向异性过滤。使用各向异性过滤能够使纹理的效果更好，但是会消耗更多的内存、CPU、GPU时间。



#### 添加纹理步骤

a：画一个平面

b：为平面赋予纹理坐标

c：加载纹理

d：将纹理应用于材质







