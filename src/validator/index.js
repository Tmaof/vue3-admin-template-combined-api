import i18n from '@/i18n'
// 登录注册密码校验规则
export const pwdValidator = (rule, value, callback) => {
  value = value.trim()
  if (!(value.length >= 6 && value.length <= 14)) {
    callback(new Error(i18n.$t('validator.index.808362-0')))
  } else {
    callback()
  }
}
