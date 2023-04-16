import request from '@/utility/request'
import store from '@/store'
import md5 from 'md5'
import { isRef } from 'vue'

/**
 * 注册
 * @param {*} data
 * @returns Promise
 */
export function register(data) {
  const md5Data = { username: '', password: '' }
  if (isRef(data)) {
    md5Data.username = data.value.username

    md5Data.password = md5(data.value.password)
  } else {
    md5Data.username = data.username
    md5Data.password = md5(data.password)
  }
  return request({
    url: '/sys/register',
    method: 'post',
    data: md5Data
  })
}

/**
 * 登录
 * @param {*} data
 * @returns Promise
 */
export function login(data) {
  const md5Data = { username: '', password: '' }
  if (isRef(data)) {
    md5Data.username = data.value.username

    md5Data.password = md5(data.value.password)
  } else {
    md5Data.username = data.username
    md5Data.password = md5(data.password)
  }
  return request({
    url: '/sys/login',
    method: 'post',
    data: md5Data
  })
}

/**
 *获取用户信息
 * @returns Promise
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'get',
    params: { token: store.getters.token }
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({ url: '/sys/logout', method: 'post' })
}
