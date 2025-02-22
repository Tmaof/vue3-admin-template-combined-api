import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
const serve = axios.create({
  baseURL: process.env.VUE_APP_baseUrl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
serve.interceptors.request.use(
  (config) => {
    // 如果有token，则在请求头中进行携带,方便进行用户鉴权
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    ElMessage.error({ message: error.message })
    return Promise.reject(error)
  }
)

// 响应拦截器
serve.interceptors.response.use(
  (response) => {
    // 2xx 范围的状态码都会触发该函数。
    const { success, message, data } = response.data
    if (success) {
      // 直接返回数据
      console.log('res:', response.data)
      return data
    } else {
      // 响应成功，但是后端业务逻辑处理失败
      ElMessage.error({ message })
      return Promise.reject(message)
    }
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const { message } = error.response.data
    ElMessage.error({ message: message || error.message })
    return Promise.reject(error)
  }
)

export default serve
