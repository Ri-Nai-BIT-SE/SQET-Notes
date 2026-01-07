// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '@chinese-fonts/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css';

// 导入可视化组件
import CodeCoverageDemo from '../components/CodeCoverageDemo.vue'
import FlowChartDemo from '../components/FlowChartDemo.vue'
import BoundaryDemo from '../components/BoundaryDemo.vue'
import ComplexityDemo from '../components/ComplexityDemo.vue'
import TestingModelDemo from '../components/TestingModelDemo.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件（可选，VitePress 也会自动导入 components 目录下的组件）
    app.component('CodeCoverageDemo', CodeCoverageDemo)
    app.component('FlowChartDemo', FlowChartDemo)
    app.component('BoundaryDemo', BoundaryDemo)
    app.component('ComplexityDemo', ComplexityDemo)
    app.component('TestingModelDemo', TestingModelDemo)
  }
} satisfies Theme
