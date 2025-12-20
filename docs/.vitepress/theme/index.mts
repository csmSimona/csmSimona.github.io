import { h, watch, onMounted, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
import HomeUnderline from "./components/HomeUnderline.vue"
import xgplayer from "./components/xgplayer.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import bsz from "./components/bsz.vue";
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import backtotop from "./components/backtotop.vue";
import MyLayout from "./components/MyLayout.vue";
import googleAnalytics from 'vitepress-plugin-google-analytics'
import mediumZoom from 'medium-zoom';
import { useRoute } from 'vitepress';
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
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

    // 不蒜子
    // 切换路由进度条
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChange = () => {
        // busuanzi.fetch()
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