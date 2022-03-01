import axios from 'axios' // 引入axios
import { Message } from 'element-ui'
import store from '@/stores'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8081'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'http://localhost:8081'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://localhost:8081'
}

axios.defaults.timeout = 10000

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (store.state.token != null && store.state.token !== '') {
      config.headers.token = store.state.token
    }
    return config
  },
  error => {
    /* _.toast('错误的传参', 'fail') */
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if (response.data != null && response.data.code === '1') {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展

  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$router.currentRoute.fullPath
            }
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true
          })
          // 清除token
          localStorage.removeItem('token')
          this.$store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            this.$router.replace({
              path: '/login',
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
        // 404请求不存在
        case 404:
          Message({
            message: '网络请求接口不存在',
            duration: 1500,
            forbidClick: true
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          })
      }
      return Promise.reject(error.response)
    }
  }
)

// 返回一个Promise(发送post请求)
export function fetch (url, params) {
  // axios.defaults.headers.accesstoken = sessionStorage.getItem('access_token')
  //   ? AES.decrypt(sessionStorage.getItem('access_token'))
  //   : ''
  url = (process.env.NODE_ENV === 'development' ? '' : '') + url
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(response => {
        if (response.data.code === 401 || response.data.code === 402) {
          // logout()
        } else {
          resolve(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送post请求)
export function fetchGet (url, params) {
  // axios.defaults.headers.accesstoken = sessionStorage.getItem('access_token')
  //   ? AES.decrypt(sessionStorage.getItem('access_token'))
  //   : ''
  url = (process.env.NODE_ENV === 'development' ? '' : '') + url
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(response => {
        if (response.data.code === 401 || response.data.code === 402) {
          // logout()
        } else {
          resolve(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {

  login (params) {
    return fetch('/login', params)
  },
  register (params) {
    return fetch('/register', params)
  },
  hello () {
    return fetchGet('/hello', {})
  }

}
