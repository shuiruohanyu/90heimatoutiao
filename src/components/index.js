import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册一个全局组件
    Vue.component('layout-header', layoutHeader) // 注册一个全局组件
    Vue.component('bread-crumb', breadCrumb) // 全局注册一个面包屑组件
  }
}
