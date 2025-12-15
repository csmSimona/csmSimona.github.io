import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import './custom.scss'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 插入到文档标题下
      'doc-before': () => {
        const { frontmatter } = useData()
        if (frontmatter.value.readingTime) {
          return h('div', { 
            style: { 
              marginTop: '10px', 
              color: 'var(--vp-c-text-2)', 
              fontSize: '14px',
              fontStyle: 'italic'
            } 
          }, `阅读时间: ${frontmatter.value.readingTime.text}`)
        }
      }
    })
  }
}
