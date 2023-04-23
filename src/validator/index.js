// 登录注册密码校验规则
export const pwdValidator = (rule, value, callback) => {
  value = value.trim()
  if (!(value.length >= 6 && value.length <= 14)) {
    callback(new Error('密码长度要求在6到14之间'))
  } else {
    callback()
  }
}
