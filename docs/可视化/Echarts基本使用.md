# Echarts基本使用

PS：很早之前，刚入门的时候记录写的



来源：[ECharts数据可视化项目](https://www.bilibili.com/video/BV1v7411R7mp)（PS：这个老师讲的不错，风趣生动）

### Echarts-介绍

常见的数据可视化库：

- D3.js   目前 Web 端评价最高的 Javascript 可视化工具库(入手难)  
- ECharts.js   百度出品的一个开源 Javascript 数据可视化库   
- Highcharts.js  国外的前端数据可视化库，非商用免费，被许多国外大公司所使用  
- AntV  蚂蚁金服全新一代数据可视化解决方案  等等
- Highcharts 和 Echarts 就像是 Office 和 WPS 的关系

> ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖矢量图形库 [ZRender](https://github.com/ecomfe/zrender)，提供直观，交互丰富，可高度个性化定制的数据可视化图表。

大白话：

- 是一个JS插件
- 性能好可流畅运行PC与移动设备
- 兼容主流浏览器
- 提供很多常用图表，且可**定制**。
  - [折线图](https://www.echartsjs.com/zh/option.html#series-line)、[柱状图](https://www.echartsjs.com/zh/option.html#series-bar)、[散点图](https://www.echartsjs.com/zh/option.html#series-scatter)、[饼图](https://www.echartsjs.com/zh/option.html#series-pie)、[K线图](https://www.echartsjs.com/zh/option.html#series-candlestick)

官网地址：<https://www.echartsjs.com/zh/index.html>

### Echarts-体验

官方教程：[五分钟上手ECharts](https://www.echartsjs.com/zh/tutorial.html#5 分钟上手 ECharts)

- 下载echarts  https://github.com/apache/incubator-echarts/tree/4.5.0  

**使用步骤：**

1. 引入echarts 插件文件到html页面中
2. 准备一个具备大小的DOM容器

```html
<div id="main" style="width: 600px;height:400px;"></div>
```

3.  初始化echarts实例对象

```js
var myChart = echarts.init(document.getElementById('main'));
```

4. 指定配置项和数据(option)

```js
var option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
```

5. 将配置项设置给echarts实例对象

```js
myChart.setOption(option);
```

### Echarts-基础配置

> 需要了解的主要配置：`series` `xAxis` `yAxis` `grid` `tooltip` `title` `legend` `color` 

- series

  - 系列列表。每个系列通过 `type` 决定自己的图表类型
  - 大白话：图标数据，指定什么类型的图标，可以多个图表重叠。

- xAxis：直角坐标系 grid 中的 x 轴

  - boundaryGap: 坐标轴两边留白策略 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。

- yAxis：直角坐标系 grid 中的 y 轴

- grid：直角坐标系内绘图网格。 

- title：标题组件

- tooltip：提示框组件

- legend：图例组件

- color：调色盘颜色列表

  数据堆叠，同个类目轴上系列配置相同的`stack`值后 后一个系列的值会在前一个系列的值上相加。

~~~javascript
option = {
    // color设置我们线条的颜色 注意后面是个数组
    color: ['pink', 'red', 'green', 'skyblue'],
    // 设置图表的标题
    title: {
        text: '折线图堆叠123'
    },
    // 图表的提示框组件 
    tooltip: {
        // 触发方式
        trigger: 'axis'
    },
    // 图例组件
    legend: {
       // series里面有了 name值则 legend里面的data可以删掉
    },
    // 网格配置  grid可以控制线形图 柱状图 图表大小
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        // 是否显示刻度标签 如果是true 就显示 否则反之
        containLabel: true
    },
    // 工具箱组件  可以另存为图片等功能
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    // 设置x轴的相关配置
    xAxis: {
        type: 'category',
        // 是否让我们的线条和坐标轴有缝隙
        boundaryGap: false,
        data: ['星期一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
     // 设置y轴的相关配置
    yAxis: {
        type: 'value'
    },
    // 系列图表配置 它决定着显示那种类型的图表
    series: [
        {
            name: '邮件营销',
            type: 'line',
           
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',

            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
          
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
          
            data: [320, 332, 301, 334, 390, 330, 320]
        }
    ]
};

~~~

### Echarts-社区介绍

> [社区](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)就是一些，活跃的echart使用者，交流和贡献定制好的图表的地方。

- 在这里可以找到一些基于echart的高度定制好的图表，相当于基于jquery开发的插件，这里是基于echarts开发的第三方的图表。

### Echarts-map使用（扩展）

参考社区的例子：https://gallery.echartsjs.com/editor.html?c=x0-ExSkZDM  (模拟飞机航线)

实现步骤：

- 第一需要下载china.js提供中国地图的js文件
- 第二个因为里面代码比较多，我们新建一个新的js文件 myMap.js 引入
- 使用社区提供的配置即可。

需要修改：

- 去掉标题组件
- 去掉背景颜色
- 修改地图省份背景  #142957  areaColor 里面做修改
- 地图放大通过  zoom   设置为1.2即可

~~~javascript
    geo: {
      map: 'china',
      zoom: 1.2,
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false,
      itemStyle: {
        normal: {
          areaColor: '#142957',
          borderColor: '#0692a4'
        },
        emphasis: {
          areaColor: '#0b1c2d'
        }
      }
    },
~~~

总结：这例子是扩展案例，大家以后可以多看看社区里面的案例。

