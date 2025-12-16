import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "MyDocs",
  description: "我的学习笔记",
  cleanUrls: true, // 开启纯净链接无html
  // Fav图标
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],
  markdown: {
    // 行号显示
    lineNumbers: true,

    // toc显示一级标题
    toc: {level: [1,2,3]},

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],

    // 开启图片懒加载
    image: {
      lazyLoading: true
    },

    theme: {
      light: 'min-light',
      dark: 'dark-plus',
    },
    config: (md) => {
      // 没有任何复杂的逻辑，只是简单的注册功能，确保构建正常
    }
  },
  themeConfig: {
    outline: 'deep',
    // logo: undefined, // default is undefined
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端基础汇总",
        items: [
          { text: "JavaScript小记", link: "/前端基础汇总/JavaScript小记" },
          { text: "HTML小记", link: "/前端基础汇总/HTML小记" },
          { text: "CSS小记", link: "/前端基础汇总/CSS小记" },
          { text: "计算机网络", link: "/前端基础汇总/计算机网络" },
          { text: "React小记", link: "/前端基础汇总/React小记" },
          { text: "Vue小记", link: "/前端基础汇总/Vue小记" },
          { text: "手写js", link: "/前端基础汇总/手写js" },
          { text: "前端工程化", link: "/前端基础汇总/前端工程化" },
          { text: "前端性能优化", link: "/前端基础汇总/前端性能优化" },
          { text: "实际项目开发", link: "/前端基础汇总/实际项目开发" },
          { text: "Typescript面试题", link: "/前端基础汇总/Typescript面试题" },
          { text: "Nodejs面试题", link: "/前端基础汇总/Nodejs面试题" },
          { text: "小程序", link: "/其他/小程序" },
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
          { text: "Git小记", link: "/其他/Git小记" },
          { text: "NodeJs小记", link: "/其他/NodeJs小记" },
          { text: "TypeScript小记", link: "/其他/TypeScript小记" },
          { text: "正则表达式入门", link: "/其他/正则表达式入门" },
          { text: "Linux基本命令", link: "/其他/Linux基本命令" },
          { text: "PixiJS的基本使用", link: "/其他/PixiJS的基本使用" },
          { text: "PixiJS实现一镜到底", link: "/其他/PixiJS实现一镜到底" },
        ],
      },
      {
        text: "数据可视化",
        items: [
          { text: "Canvas入门", link: "/数据可视化/Canvas入门" },
          { text: "SVG入门", link: "/数据可视化/SVG入门" },
          { text: "Echarts基本使用", link: "/数据可视化/Echarts基本使用" },
          {
            text: "antv G6的基础入门及树图的实际应用",
            link: "/数据可视化/antvG6/antv G6的基础入门及树图的实际应用",
          },
          { text: "Three.js", link: "/数据可视化/Three.js/Three.js基础课程" },
        ],
      },
      {
        text: "读书笔记",
        items: [
          { text: "《CSS揭秘》", link: "/读书笔记/CSS揭秘/CSS揭秘" },
          {
            text: "《Python编程：从入门到实践》",
            link: "/读书笔记/Python编程：从入门到实践",
          },
        ],
      },
      {
        text: "项目开发",
        items: [
          {
            text: "低代码数据可视化平台开发记录",
            link: "/项目开发/低代码数据可视化平台开发记录",
          },
          {
            text: "中后台管理系统模板记录",
            link: "/项目开发/中后台管理系统模板记录",
          },
          {
            text: "多页签开发记录",
            link: "/项目开发/多页签开发记录",
          },
          {
            text: "浙政钉、浙里办、浙江政务服务网应用上架指南",
            link: "/项目开发/浙政钉、浙里办、浙江政务服务网应用上架指南",
          },
        ],
      }
    ],

    sidebar: {
      '/前端基础汇总/': [
        {
          text: '前端基础汇总',
          collapsed: true,
          items: [
            { text: "JavaScript小记", link: "/前端基础汇总/JavaScript小记" },
            { text: "HTML小记", link: "/前端基础汇总/HTML小记" },
            { text: "CSS小记", link: "/前端基础汇总/CSS小记" },
            { text: "计算机网络", link: "/前端基础汇总/计算机网络" },
            { text: "React小记", link: "/前端基础汇总/React小记" },
            { text: "Vue小记", link: "/前端基础汇总/Vue小记" },
            { text: "手写js", link: "/前端基础汇总/手写js" },
            { text: "前端工程化", link: "/前端基础汇总/前端工程化" },
            { text: "前端性能优化", link: "/前端基础汇总/前端性能优化" },
            { text: "实际项目开发", link: "/前端基础汇总/实际项目开发" },
            { text: "Typescript面试题", link: "/前端基础汇总/Typescript面试题" },
            { text: "Nodejs面试题", link: "/前端基础汇总/Nodejs面试题" },
          ]
        }
      ],
      '/算法/': [
        {
          text: '算法',
          collapsed: true,
          items: [
            { text: "排序", link: "/算法/排序" },
            { text: "算法题", link: "/算法/算法题" },
          ]
        }
      ],
      '/其他/': [
         {
          text: '其他',
          collapsed: true,
          items: [
            { text: "Git小记", link: "/其他/Git小记" },
            { text: "NodeJs小记", link: "/其他/NodeJs小记" },
            { text: "TypeScript小记", link: "/其他/TypeScript小记" },
            { text: "正则表达式入门", link: "/其他/正则表达式入门" },
            { text: "Linux基本命令", link: "/其他/Linux基本命令" },
            { text: "PixiJS的基本使用", link: "/其他/PixiJS的基本使用" },
            { text: "PixiJS实现一镜到底", link: "/其他/PixiJS实现一镜到底" },
            { text: "小程序", link: "/其他/小程序" }, 
          ]
         }
      ],
      '/数据可视化/': [
        {
          text: '数据可视化',
          collapsed: true,
          items: [
            { text: "Canvas入门", link: "/数据可视化/Canvas入门" },
            { text: "SVG入门", link: "/数据可视化/SVG入门" },
            { text: "Echarts基本使用", link: "/数据可视化/Echarts基本使用" },
            {
               text: "antv G6",
               items: [
                 { text: "antv G6的基础入门及树图的实际应用", link: "/数据可视化/antvG6/antv G6的基础入门及树图的实际应用" }
               ]
            },
            {
               text: "Three.js",
               items: [
                 { text: "Three.js基础课程", link: "/数据可视化/Three.js/Three.js基础课程" }
               ]
            }
          ]
        }
      ],
      '/读书笔记/': [
        {
          text: '读书笔记',
          collapsed: true,
          items: [
             { text: "《CSS揭秘》", link: "/读书笔记/CSS揭秘/CSS揭秘" },
             { text: "《Python编程：从入门到实践》", link: "/读书笔记/Python编程：从入门到实践" },
          ]
        }
      ],
      '/项目开发/': [
        {
          text: '项目开发',
          collapsed: true,
          items: [
            { text: "低代码数据可视化平台开发记录", link: "/项目开发/低代码数据可视化平台开发记录" },
            { text: "中后台管理系统模板记录", link: "/项目开发/中后台管理系统模板记录" },
            { text: "多页签开发记录", link: "/项目开发/多页签开发记录" },
            { text: "浙政钉、浙里办、浙江政务服务网应用上架指南", link: "/项目开发/浙政钉、浙里办、浙江政务服务网应用上架指南" },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/csmSimona' }
    ],

    search: {
      provider: 'local',
       options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                }
              }
            }
          }
        }
      }
    },
    // footer: {
    //   message: "Released under the MIT License.",
    //   copyright: "Copyright ©csm",
    // },
  },
})
