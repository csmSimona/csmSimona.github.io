# 十三、后处理EffectComposer

### 发光描边OutlinePass
1. 引入后处理扩展库`EffectComposer.js`，创建后处理对象EffectComposer，WebGL渲染器作为参数
2. 引入渲染器通道`RenderPass`，创建一个渲染器通道RenderPass，场景和相机作为参数，添加到composer中
3. 引入`OutlinePass`通道，创建OutlinePass通道
4. 使用OutlinePass属性`.selectedObjects`设置需要高亮发光描边的模型对象（是一个数组）
5. 把创建好的OutlinePass通道添加到后处理composer中
6. 渲染循环中后处理EffectComposer执行`.render()`



```javascript
// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

// ...创建scene、camera、render

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);
// 创建一个渲染器通道，场景和相机作为参数
const renderPass = new RenderPass(scene, camera);
// 设置renderPass通道
composer.addPass(renderPass);

// 创建OutlinePass通道,显示模型外轮廓边框
const v2 = new THREE.Vector2(window.innerWidth, window.innerWidth);
// outlinePass第一个参数v2的尺寸和canvas画布保持一致
const outlinePass = new OutlinePass(v2, scene, camera);
//设置需要高亮发光描边的模型对象
outlinePass.selectedObjects = [mesh];
// 设置OutlinePass通道
composer.addPass(outlinePass);

// 渲染循环
function render() {
  // 使用后处理模块EffectComposer，可通过该对象的render方法调用渲染器的render方法
  // renderer.render(scene, camera)不用再执行
  composer.render();
  // renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

```



### [OutlinePass描边样式](http://www.webgl3d.cn/pages/73bfc8/)


### Bloom发光通道
和发光描边OutlinePass类型，把第三步换成引入UnrealBloomPass通道

```javascript
// 引入UnrealBloomPass通道
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// UnrealBloomPass第一个参数是一个二维向量，xy分量和canvas画布宽高度保持一致
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight));
bloomPass.strength = 2.0;//bloom发光强度
// 设置bloomPass通道
composer.addPass(bloomPass);
```



### GlitchPass通道
`GlitchPass`通道会产生闪屏效果。

```javascript
// 引入GlitchPass通道
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';

const glitchPass = new GlitchPass();
// 设置glitchPass通道
composer.addPass(glitchPass);
```



### gltf后处理颜色异常(伽马校正)
使用threejs后处理功能EffectComposer，`renderer.outputColorSpace` 会无效，颜色会出现偏差，可以通过创建伽马校正后处理通道

1. 引入伽马校正后处理`Shader`GammaCorrectionShader.js
2. 引入ShaderPass.js处理后处理通道
3. 创建伽马校正通道

```javascript
// 伽马校正后处理Shader
import {GammaCorrectionShader} from 'three/addons/shaders/GammaCorrectionShader.js';
// ShaderPass功能：使用后处理Shader创建后处理通道
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';

// 创建伽马校正通道
const gammaPass= new ShaderPass(GammaCorrectionShader);
composer.addPass(gammaPass);
```



### 抗锯齿后处理
#### FXAA抗锯齿通道
FXAA减弱了锯齿，但是并不完美。

```javascript
// FXAA抗锯齿Shader
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
// ShaderPass功能：使用后处理Shader创建后处理通道
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';

// 设置设备像素比，避免canvas画布输出模糊
renderer.setPixelRatio(window.devicePixelRatio);

const FXAAPass = new ShaderPass( FXAAShader );
// `.getPixelRatio()`获取`renderer.setPixelRatio()`设置的值
const pixelRatio = renderer.getPixelRatio(); //获取设备像素比 
// width、height是canva画布的宽高度
FXAAPass.uniforms.resolution.value.x = 1 /(width*pixelRatio);
FXAAPass.uniforms.resolution.value.y = 1 /(height*pixelRatio);
composer.addPass( FXAAPass );
```



#### SMAA抗锯齿通道
SMAA相比较FXAA抗锯齿效果更好一些。

```javascript
// SMAA抗锯齿通道
import {SMAAPass} from 'three/addons/postprocessing/SMAAPass.js';

//获取.setPixelRatio()设置的设备像素比
const pixelRatio = renderer.getPixelRatio();
// width、height是canva画布的宽高度
const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
composer.addPass(smaaPass);
```

