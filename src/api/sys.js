import request from '@/utility/request'
import { isRef } from 'vue'

/**
 * 注册
 * @param {*} data
 * @returns Promise
 */
export function register(data) {
  // 解包ref对象
  if (isRef(data)) {
    data = data.value
  }
  return request({
    url: '/auth/signup',
    method: 'post',
    data
  })
}

/**
 * 登录
 * @param {*} data
 * @returns Promise
 */
export function login(data) {
  // 解包ref对象
  if (isRef(data)) {
    data = data.value
  }
  return request({
    url: '/auth/signin',
    method: 'post',
    data
  })
}

/**
 *获取用户信息
 * @returns Promise
 */
export function getUserInfo() {
  return request({
    url: '/user/profile',
    method: 'get'
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({ url: '/auth/logout', method: 'post' })
}
