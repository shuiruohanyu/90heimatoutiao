import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor' // quill编辑器组件对象
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'
import WriteCard from './common/write-card'
import StarRain from './common/star-rain'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册一个全局组件
    Vue.component('layout-header', layoutHeader) // 注册一个全局组件
    Vue.component('bread-crumb', breadCrumb) // 全局注册一个面包屑组件
    Vue.component('quill-editor', quillEditor) // 注册一个全局的富文本编辑器
    Vue.component('cover-image', CoverImage) // 注册一个封面组件
    Vue.component('select-image', SelectImage) // 注册一个素材库和上传图片组件
    Vue.component('WriteCard', WriteCard)
    Vue.component('StarRain', StarRain)
  }
}
