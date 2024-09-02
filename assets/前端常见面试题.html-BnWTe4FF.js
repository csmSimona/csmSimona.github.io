import{_ as s,c as n,o as a,a as l}from"./app-C_Vf4vWB.js";const e={},p=l(`<h1 id="前端常见面试题" tabindex="-1"><a class="header-anchor" href="#前端常见面试题"><span>前端常见面试题</span></a></h1><h3 id="什么是服务端渲染" tabindex="-1"><a class="header-anchor" href="#什么是服务端渲染"><span>什么是服务端渲染？</span></a></h3><p>服务端渲染（Server-Side Rendering，简称 SSR）是一种<strong>将网页内容在服务器端动态生成并发送给客户端的技术</strong>。传统的客户端渲染（Client-Side Rendering，简称 CSR）是在客户端浏览器中使用 JavaScript 动态生成页面内容。</p><p>在传统的客户端渲染中，浏览器首先下载一个空的 HTML 页面，然后通过 JavaScript 请求数据并生成页面内容。这种方式的优点是可以提供更丰富的交互和动态效果，但也存在一些缺点。例如，搜索引擎爬虫可能无法正确解析和索引页面内容，导致 SEO（搜索引擎优化）问题。同时，初始加载时用户可能会看到空白的页面或者出现闪烁的内容。</p><p>相比之下，服务端渲染通过在服务器上预先生成完整的 HTML 页面，将其发送给客户端浏览器。这样，浏览器在接收到页面时就能够立即显示完整的内容，而不需要等待 JavaScript 的下载和执行。这样可以提高页面的加载速度和首次渲染速度，并且对于搜索引擎爬虫来说更容易解析和索引页面内容，有利于 SEO。</p><p>客户端渲染：获取 HTML 文件，根据需要下载 JavaScript 文件，运行文件，生成 DOM，再渲染。</p><p>服务端渲染：服务端返回 HTML 文件，客户端只需解析 HTML。</p><ul><li>优点：首屏渲染快，SEO 好。</li><li>缺点：配置麻烦，增加了服务器的计算压力。</li></ul><h4 id="客户端渲染过程" tabindex="-1"><a class="header-anchor" href="#客户端渲染过程"><span>客户端渲染过程</span></a></h4><ol><li>访问客户端渲染的网站。</li><li>服务器返回一个包含了引入资源语句和 <code>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</code> 的 HTML 文件。</li><li>客户端通过 HTTP 向服务器请求资源，当必要的资源都加载完毕后，执行 <code>new Vue()</code> 开始实例化并渲染页面。</li></ol><h4 id="服务端渲染过程" tabindex="-1"><a class="header-anchor" href="#服务端渲染过程"><span>服务端渲染过程</span></a></h4><ol><li>访问服务端渲染的网站。</li><li>服务器会查看当前路由组件需要哪些资源文件，然后将这些文件的内容填充到 HTML 文件。如果有 ajax 请求，就会执行它进行数据预取并填充到 HTML 文件里，最后返回这个 HTML 页面。</li><li>当客户端接收到这个 HTML 页面时，可以马上就开始渲染页面。与此同时，页面也会加载资源，当必要的资源都加载完毕后，开始执行 <code>new Vue()</code> 开始实例化并接管页面。</li></ol><p>从上述两个过程中可以看出，区别就在于第二步。客户端渲染的网站会直接返回 HTML 文件，而服务端渲染的网站则会渲染完页面再返回这个 HTML 文件。</p><h3 id="nuxt-js、next-js、nest-js的区别" tabindex="-1"><a class="header-anchor" href="#nuxt-js、next-js、nest-js的区别"><span>Nuxt.js、Next.js、Nest.js的区别</span></a></h3><ul><li>Nuxt.js 和 Next.js 都是用于构建服务器渲染应用的框架（SSR），分别基于 Vue.js 和 React。</li><li>Nuxt.js 适用于构建 Vue.js 应用程序，提供了默认的配置和约定，使得开发 SSR 应用更加简单。</li><li>Next.js 适用于构建 React 应用程序，具有出色的性能和开发体验，并支持静态生成和服务器端渲染。</li><li>Nest.js 是一个用于构建 Node.js 服务器端应用的框架，结合了 TypeScript 和面向对象编程的概念，提供了模块化的架构设计和丰富的功能。</li></ul><h3 id="节流和防抖" tabindex="-1"><a class="header-anchor" href="#节流和防抖"><span>节流和防抖</span></a></h3><p>节流（Throttle）和防抖（Debounce）是两种常用的优化高频率执行JavaScript代码的技术。</p><h4 id="防抖" tabindex="-1"><a class="header-anchor" href="#防抖"><span>防抖</span></a></h4><p><strong>防抖是指在事件被触发后延迟一段时间后再执行回调，如果在这段延迟时间内事件又被触发，则重新计算延迟时间。</strong></p><p>在日常开发中，像在滚动事件中需要做个复杂计算或者实现一个按钮的防二次点击操作这些需求都可以通过函数防抖动来实现。</p><ul><li>当事件触发时，相应的函数并不会立即触发，而是会等待一定的时间；</li><li>当事件密集触发时，函数的触发会被频繁的推迟；</li><li>只有等待了一段时间也没有事件触发，才会真正的执行响应函数</li></ul><p><strong>应用场景</strong>： 输入框中频繁的输入内容、频繁的点击按钮、触发某个事件、监听浏览器滚动事件，完成某些特定操作、用户缩放浏览器的resize事件等等</p><p>整体实现：</p><ul><li>对于按钮防点击来说的实现：一旦我开始一个定时器，只要定时器还在，不管你怎么点击都不会执行回调函数。一旦定时器结束并设置为null，就可以再次点击了。</li><li>对于延时执行函数来说的实现：每次调用防抖动函数都会判断本次调用和之前的时间间隔，如果小于需要的时间间隔，就会重新创建一个定时器，并且定时器的延迟为设定时间减去之前的时间间隔。一旦时间到了，就会执行相应的回调函数。</li></ul><div class="language-javascript line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="shiki dark-plus vp-code" style="background-color:#1E1E1E;color:#D4D4D4 language-javascript;"><code><span class="line"><span class="line"><span style="color:#569CD6;">function</span><span style="color:#DCDCAA;"> debounce</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">fn</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">wait</span><span style="color:#D4D4D4;"> = </span><span style="color:#B5CEA8;">100</span><span style="color:#D4D4D4;">) {</span></span></span>
<span class="line"><span class="line"><span style="color:#569CD6;">  let</span><span style="color:#9CDCFE;"> timer</span><span style="color:#D4D4D4;"> = </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">;</span></span></span>
<span class="line"><span class="line"><span style="color:#C586C0;">  return</span><span style="color:#569CD6;"> function</span><span style="color:#D4D4D4;">(...</span><span style="color:#9CDCFE;">args</span><span style="color:#D4D4D4;">) {</span></span></span>
<span class="line"><span class="line"><span style="color:#DCDCAA;">    clearTimeout</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">timer</span><span style="color:#D4D4D4;">)</span></span></span>
<span class="line"><span class="line"><span style="color:#9CDCFE;">    timer</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">setTimeout</span><span style="color:#D4D4D4;">(() </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#9CDCFE;">      fn</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">apply</span><span style="color:#D4D4D4;">(</span><span style="color:#569CD6;">this</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">args</span><span style="color:#D4D4D4;">)</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">    }, </span><span style="color:#9CDCFE;">wait</span><span style="color:#D4D4D4;">)</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">  }</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">}</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="节流" tabindex="-1"><a class="header-anchor" href="#节流"><span>节流</span></a></h4><p><strong>节流是指在一段时间内，不管事件触发了多少次，只执行一次回调。</strong></p><p>防抖动和节流本质是不一样的。**防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。**比如搜索框就会用到节流。</p><ul><li>如果这个事件会被频繁触发，那么节流函数会按照一定的频率来执行函数；</li><li>不管在这个中间有多少次触发这个事件，执行函数的频率总是固定的；</li></ul><p><strong>应用场景</strong>：搜索联想功能、鼠标移动事件、王者荣耀攻击键、点击再快也是以一定攻速(频率)进行攻击等等</p><div class="language-javascript line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="shiki dark-plus vp-code" style="background-color:#1E1E1E;color:#D4D4D4 language-javascript;"><code><span class="line"><span class="line"><span style="color:#569CD6;">function</span><span style="color:#DCDCAA;"> throttle</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">fn</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">duration</span><span style="color:#D4D4D4;">) {</span></span></span>
<span class="line"><span class="line"><span style="color:#569CD6;">  var</span><span style="color:#9CDCFE;"> begin</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">new</span><span style="color:#DCDCAA;"> Date</span><span style="color:#D4D4D4;">()</span></span></span>
<span class="line"><span class="line"><span style="color:#C586C0;">  return</span><span style="color:#569CD6;"> function</span><span style="color:#D4D4D4;">(...</span><span style="color:#9CDCFE;">args</span><span style="color:#D4D4D4;">) {</span></span></span>
<span class="line"><span class="line"><span style="color:#569CD6;">    var</span><span style="color:#9CDCFE;"> current</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">new</span><span style="color:#DCDCAA;"> Date</span><span style="color:#D4D4D4;">()</span></span></span>
<span class="line"><span class="line"><span style="color:#C586C0;">    if</span><span style="color:#D4D4D4;"> (</span><span style="color:#9CDCFE;">current</span><span style="color:#D4D4D4;"> - </span><span style="color:#9CDCFE;">begin</span><span style="color:#D4D4D4;"> &gt;= </span><span style="color:#9CDCFE;">duration</span><span style="color:#D4D4D4;">) {</span></span></span>
<span class="line"><span class="line"><span style="color:#9CDCFE;">      fn</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">apply</span><span style="color:#D4D4D4;">(</span><span style="color:#569CD6;">this</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">args</span><span style="color:#D4D4D4;">)</span></span></span>
<span class="line"><span class="line"><span style="color:#9CDCFE;">      begin</span><span style="color:#D4D4D4;"> = </span><span style="color:#9CDCFE;">current</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">    }</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">  }</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">}</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#569CD6;">function</span><span style="color:#DCDCAA;"> throttle</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">fn</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">delay</span><span style="color:#D4D4D4;">) {</span></span></span>
<span class="line"><span class="line"><span style="color:#569CD6;">  let</span><span style="color:#9CDCFE;"> flag</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">true</span></span></span>
<span class="line"><span class="line"><span style="color:#C586C0;">  return</span><span style="color:#D4D4D4;"> (...</span><span style="color:#9CDCFE;">args</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#C586C0;">    if</span><span style="color:#D4D4D4;"> (!</span><span style="color:#9CDCFE;">flag</span><span style="color:#D4D4D4;">) </span><span style="color:#C586C0;">return</span></span></span>
<span class="line"><span class="line"><span style="color:#9CDCFE;">    flag</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">false</span></span></span>
<span class="line"><span class="line"><span style="color:#DCDCAA;">    setTimeout</span><span style="color:#D4D4D4;">(() </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#9CDCFE;">      fn</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">call</span><span style="color:#D4D4D4;">(</span><span style="color:#569CD6;">this</span><span style="color:#D4D4D4;">, ...</span><span style="color:#9CDCFE;">args</span><span style="color:#D4D4D4;">)</span></span></span>
<span class="line"><span class="line"><span style="color:#9CDCFE;">      flag</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">true</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">    }, </span><span style="color:#9CDCFE;">delay</span><span style="color:#D4D4D4;">)</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">  }</span></span></span>
<span class="line"><span class="line"><span style="color:#D4D4D4;">}</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31),i=[p];function o(c,r){return a(),n("div",null,i)}const D=s(e,[["render",o],["__file","前端常见面试题.html.vue"]]),d=JSON.parse('{"path":"/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%B1%87%E6%80%BB/%E5%89%8D%E7%AB%AF%E5%B8%B8%E8%A7%81%E9%9D%A2%E8%AF%95%E9%A2%98.html","title":"前端常见面试题","lang":"zh-CN","frontmatter":{},"headers":[{"level":3,"title":"什么是服务端渲染？","slug":"什么是服务端渲染","link":"#什么是服务端渲染","children":[]},{"level":3,"title":"Nuxt.js、Next.js、Nest.js的区别","slug":"nuxt-js、next-js、nest-js的区别","link":"#nuxt-js、next-js、nest-js的区别","children":[]},{"level":3,"title":"节流和防抖","slug":"节流和防抖","link":"#节流和防抖","children":[]}],"git":{"updatedTime":1725294921000,"contributors":[{"name":"chenshimeng","email":"chenshimeng@hyperchain.cn","commits":1}]},"filePathRelative":"前端基础汇总/前端常见面试题.md","readingTime":{"minutes":5.2,"words":1561}}');export{D as comp,d as data};
