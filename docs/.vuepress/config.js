import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { readingTimePlugin } from '@vuepress/plugin-reading-time'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'myDocs',
  description: '我的学习笔记文档',

  theme: defaultTheme({
    logo: null,
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "前端基础汇总",
        children: [
          { text: "JavaScript小记", link: "/前端基础汇总/JavaScript小记" },
          { text: "HTML小记", link: "/前端基础汇总/HTML小记" },
          { text: "CSS小记", link: "/前端基础汇总/CSS小记" },
          { text: "计算机网络", link: "/前端基础汇总/计算机网络" },
          { text: "React小记", link: "/前端基础汇总/React小记" },
          { text: "Vue小记", link: "/前端基础汇总/Vue小记" },
          { text: "手写js", link: "/前端基础汇总/手写js" },
          { text: "前端性能优化", link: "/前端基础汇总/前端性能优化" },
          { text: "正则表达式入门", link: "/JavaScript/正则表达式入门" },
          { text: "TypeScript小记", link: "/前端基础汇总/TypeScript小记" },
        ]
      },
      { text: "前端框架及项目面试", link: "/慕课/前端框架及项目面试" },
      {
        text: "算法",
        children: [
          { text: "排序", link: "/算法/排序" },
          { text: "算法题", link: "/算法/算法题" },
        ]
      },
      { text: "nodejs", link: "/node/nodejs" },
      {
        text: "其他",
        children: [
          { text: "Git小记", link: "/其他/Git小记" },
          { text: "webpack概念与配置", link: "/其他/webpack概念与配置" },
          { text: "Linux基本命令", link: "/其他/Linux基本命令" },
          { text: "Echarts基本使用", link: "/其他/Echarts基本使用" },
          { text: "Three.js学习笔记", link: "/其他/Three.js学习笔记" },
          { text: "《CSS揭秘》学习笔记", link: "/其他/《CSS揭秘》学习笔记/《CSS揭秘》学习笔记" },
          { text: "Vue.js源码全方位深入解析", link: "/慕课/Vue.js源码全方位深入解析" },
        ]
      },
      {
        text: "python",
        children: [
          { text: "python入门", link: "/python/Python编程：从入门到实践" },
        ]
      },
      { text: "Github", link: "https://github.com/csmSimona" },
    ],
    sidebarDepth: 5
  }),

  bundler: viteBundler(),
  plugins: [
    searchPlugin({
      // 配置项
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
    shikiPlugin({
      // 配置项：https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html#%E9%85%8D%E7%BD%AE%E9%A1%B9
      // 主题：https://shiki.tmrs.site/themes
      theme: 'dark-plus',
    }),
    readingTimePlugin({
      // 配置项
    }),
  ]
})