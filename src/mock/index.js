import i18n from '@/i18n'
import './sys'
import './user-manage'
import './role-manage'
import './permission-list'
import Mock from 'mockjs-pro' // mock.js

Mock.setup({
  timeout: '200-300'
})

export const user = {
  role: [],
  openTime: '',
  username: '',
  password: '',
  avatar: ''
}

export const role = {
  title: '',
  describe: '',
  permissions: []
}

export const permission = {
  id: '',
  pid: '',
  name: '',
  code: '',
  type: 1,
  children: []
}

export function getUrlParams(url, name) {
  const reg = new RegExp(`(?<=\\b${name}=)[^&]*`)
  const str = url.split('?')[1]
  const target = str.match(reg)

  if (target) {
    return target[0]
  }
}

export function getResBody(
  data = null,
  message = i18n.t('mock.index.017836-0'),
  success = false,
  code = 10000
) {
  return {
    success,
    code,
    data,
    message
  }
}
