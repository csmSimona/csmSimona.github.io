/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: "首页", link: "/" },
  { text: "导航", link: "" },
  {
    text: "前端汇总",
    items: [
      {
        // 分组标题
        text: '前端基础',
        items: [
          { text: "HTML小记", link: "/前端基础汇总/HTML小记" },
          { text: "CSS小记", link: "/前端基础汇总/CSS小记" },
          { text: "JavaScript小记", link: "/前端基础汇总/JavaScript小记" },
          { text: "计算机网络", link: "/前端基础汇总/计算机网络" },
          { text: "手写js", link: "/前端基础汇总/手写js" },
        ],
      },
      {
        text: '框架',
        items: [
          { text: "React小记", link: "/前端基础汇总/React小记" },
          { text: "Vue小记", link: "/前端基础汇总/Vue小记" },
        ],
      },
      {
        text: '实践',
        items: [
          { text: "前端工程化", link: "/前端基础汇总/前端工程化" },
          { text: "前端性能优化", link: "/前端基础汇总/前端性能优化" },
          { text: "实际项目开发", link: "/前端基础汇总/实际项目开发" },
        ],
      },
      {
        text: '其他',
        items: [
          { text: "Typescript面试题", link: "/前端基础汇总/Typescript面试题" },
          { text: "Nodejs面试题", link: "/前端基础汇总/Nodejs面试题" },
        ],
      },
    ],
  },
  {
    text: "算法",
    items: [
      { text: "排序", link: "/算法/排序" },
      { text: "算法题", link: "/算法/算法题" },
    ],
  },
  {
    text: "其他",
    items: [
      { text: "TypeScript小记", link: "/其他/TypeScript小记" },
      { text: "NodeJs小记", link: "/其他/NodeJs小记" },
      { text: "Git小记", link: "/其他/Git小记" },
      { text: "Linux基本命令", link: "/其他/Linux基本命令" },
      { text: "正则表达式入门", link: "/其他/正则表达式入门" },
    ],
  },
  {
    text: "可视化",
    items: [
      { text: "Echarts基本使用", link: "/可视化/Echarts基本使用" },
      { text: "Canvas入门", link: "/可视化/Canvas入门" },
      { text: "SVG入门", link: "/可视化/SVG入门" },
      {
        text: "AntV G6的基础入门及树图的实际应用",
        link: "/可视化/AntVG6/AntV G6的基础入门及树图的实际应用",
      },
      {
        text: "PixiJS",
        items: [
          { text: "PixiJS的基本使用", link: "/可视化/PixiJS的基本使用" },
          { text: "PixiJS实现一镜到底", link: "/可视化/PixiJS实现一镜到底" },
        ]
      },
      {
        text: "Three.js",
        items: [
          { text: "Three.js基础课程笔记", link: "/Three.js/Three.js基础课程笔记/开始" },
          { text: "Three.js进阶课程笔记", link: "/Three.js/Three.js进阶课程笔记/一、数学几何计算基础" },
        ]
      },
    ],
  },
  {
    text: "学习笔记",
    items: [
      {
        text: "技术书籍",
        items: [
          { text: "CSS揭秘", link: "/学习笔记/CSS揭秘/CSS揭秘" },
          {
            text: "Python编程：从入门到实践",
            link: "/学习笔记/Python编程：从入门到实践",
          },
        ]
      },
      {
        text: "视频课程",
        items: [
          {
            text: "AI大模型应用开发：从小白到高手",
            link: "/学习笔记/AI大模型应用开发：从小白到高手",
          },
        ]
      },
    ],
  },
  {
    text: "开发记录",
    items: [
      {
        text: "中后台管理系统模板记录",
        link: "/开发记录/中后台管理系统模板记录",
      },
      {
        text: "多页签开发记录",
        link: "/开发记录/多页签开发记录",
      },
      {
        text: "低代码数据可视化平台开发记录",
        link: "/开发记录/低代码数据可视化平台开发记录",
      },
      {
        text: "浙政钉、浙里办、浙江政务服务网应用上架指南",
        link: "/开发记录/浙政钉、浙里办、浙江政务服务网应用上架指南/浙政钉、浙里办、浙江政务服务网应用上架指南",
      },
    ],
  },
  { text: "关于我", link: "" },
]