import axios from 'axios'
import store from '@/store'

// 创建axios配置对象
const requestConfig = {
  baseURL: `${process.env.VUE_APP_SERVE_URL}${process.env.VUE_APP_SERVE_PASH}`
}
// 创建请求实例
const request = axios.create(requestConfig)
// token过期需要重新发起请求的集合
// eslint-disable-next-line
let resetRequest: any[] = []
// 是否正在换取token
let isRfreshing = false

// 错误消息提示方法
const toastError = (msg: string) => {
  // 在这里写入你错误提示方法
  console.log(msg)
}
// 获取需要替换token参数方法
const getOldToken = () => {
  // return 可以换取token参数
  return false
}
// token过期等 认证失败的时候跳转登录方法
const redirectLogin = () => {
  console.log(123)
}
// 刷新token方法
const refres = () => {
  return axios.create()({
    method: 'POST',
    url: '/替换token请求地址'
  })
}
// 请求拦截器
request.interceptors.request.use(config => {
  // 请求发送之前处理
  // 如果有用户认证信息则添加到header
  if (store.getters.token) {
    // 把token换为需要设置的请求头
    config.headers.token = store.getters.token
  }
  // 必须return config 不然请求会卡主
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response
}, error => {
  // console.log('请求响应失败了 => ', error)
  // 如果是使用的 HTTP 状态码，错误处理就写到这里
  // console.dir(error)
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      toastError('请求参数错误')
    } else if (status === 401) {
      // 如果可以换取token则在这里换取token
      // 获取换取token 参数 如果没有直接返回错误
      if (!getOldToken()) {
        // 跳转登录方法
        redirectLogin()
        return Promise.reject(error)
      }

      // 刷新token方法不需要可以删除
      if (!isRfreshing) {
        isRfreshing = true
        // 刷新完毕之后设置刷新中状态为false
        return refres().then(res => {
          // 判断token是否刷新成功
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }
          // 刷新 token 成功了
          store.commit('setUser', res.data.content)
          // 把 requests 队列中的请求重新发出去
          resetRequest.forEach(cb => cb())
          // 重置 requests 数组
          resetRequest = []

          return request(error.config)
        }).catch(err => {
          // 清空token
          store.commit('user/SET_TOKEN', null)
          // 跳转登录方法
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          isRfreshing = false
        })
      }

      // 刷新状态下，把请求挂起放到 requests 数组中
      return new Promise(resolve => {
        resetRequest.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      toastError('没有权限，请联系管理员')
    } else if (status === 404) {
      toastError('请求资源不存在')
    } else if (status >= 500) {
      toastError('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    toastError('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    toastError(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})

export default request
