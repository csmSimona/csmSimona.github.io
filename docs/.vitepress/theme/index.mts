import { h, watch, onMounted, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
import HomeUnderline from "./components/HomeUnderline.vue"
import xgplayer from "./components/xgplayer.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import { inBrowser } from 'vitepress'
import MyLayout from "./components/MyLayout.vue";
import googleAnalytics from 'vitepress-plugin-google-analytics'
import mediumZoom from 'medium-zoom';
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import useVisitData from './utils/useVisitData'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
    const { frontmatter } = useData();
        
    // giscus配置
    giscusTalk({
      repo: 'csmSimona/csmSimona.github.io', // 仓库
      repoId: 'R_kgDOMo0gJg', // 仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOMo0gJs4C0C_F', // 讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );

    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
  enhanceApp({app, router}) {
    // 注册全局组件
    app.component('HomeUnderline' , HomeUnderline)
    app.component('xgplayer' , xgplayer)
    app.component('ArticleMetadata' , ArticleMetadata)

    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }

    // 切换路由进度条
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChange = () => {
        useVisitData()
        NProgress.done() // 停止进度条
      }
    }

    // 谷歌分析
    googleAnalytics({
      id: 'G-T1X5LGNGJ3', // 跟踪ID，在analytics.google.com注册即可
    })
  },
  Layout() {
    // return h(DefaultTheme.Layout, null, {
    //   // 指定组件使用layout-bottom插槽
    //   'layout-bottom': () => h(bsz),
    //   // 指定组件使用doc-footer-before插槽
    //   'doc-footer-before': () => h(backtotop),
    // })
    // 改用自定义layout
    return h(MyLayout, null, {
    })
  }
}


// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}