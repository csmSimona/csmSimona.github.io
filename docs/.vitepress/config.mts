import { defineConfig } from 'vitepress'
import { nav, sidebar } from './configs'

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

    // toc显示1-6级标题
    toc: {level: [1,2,3,4,5,6]},

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

    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      }
    }
  },
  // 站点地图
  sitemap: {
    hostname: 'http://chenshimeng.top/',
  },
  // 上次更新时间 首次配置不会立即生效，需git提交后爬取时间戳
  lastUpdated: true, 
  themeConfig: {
    // 右侧大纲
    outline: { 
      level: 'deep', // 显示2-6级标题
      label: '目录' // 文字显示
    },
    logo: '/logo.png',
    // siteTitle: false, // 隐藏标题

    // 编辑本页 会被 Frontmatter配置 覆盖
    editLink: { 
      pattern: 'https://github.com/csmSimona/csmSimona.github.io/edit/main/docs/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },

    // 自定义上下页名
    docFooter: { 
      prev: '上一页', 
      next: '下一页', 
    }, 

    // 上次更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },

    nav,

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/csmSimona' },
      // TODO 我的主页
      // { icon: 'github', link: 'https://github.com/csmSimona' }
    ],

    // 手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',

    // 侧边栏文字更改(移动端) 默认 Menu
    sidebarMenuLabel: '目录', 

    returnToTopLabel: '返回顶部', 

    // Carbon 广告 https://www.carbonads.net/
    // carbonAds: { 
    //   code: 'your-carbon-code', 
    //   placement: 'your-carbon-placement', 
    // },

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
    footer: {
      message: "Released under the MIT License.",
      // 自动更新时间
      copyright: `Copyright © 2025-${new Date().getFullYear()} 备案号：<a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2025215771号</a>`,
    },
  },
})
