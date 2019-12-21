// 封装一个axios
import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置一个常态值

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 执行请求ok
  // config 请求参数配置
  let token = window.localStorage.getItem('user-token')// 取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config // 表示会用该config请求进行后台操作
}, function () {
  // 执行请求错误

})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 成功时执行该函数 状态码 200 /201 /204

  return response.data ? response.data : {}
}, function () {
  // 失败时执行该函数

})
export default axios
