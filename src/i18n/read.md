# 快速 提取语言+配置i18n
## 对于中文使用者
如果你想要将项目中的中文快速提取并翻译成英文,你可以尝试以下vscode插件:
Du I18N (https://marketplace.visualstudio.com/items?itemName=DewuTeam.du-i18n)

使用帮助:(https://juejin.cn/post/7191769910685466679)

i18n pro(https://marketplace.visualstudio.com/items?itemName=wumo1016.i18n-pro)

使用帮助:(https://juejin.cn/post/7213665579701731385)
它fork自i18n Ally,提供了百度翻译的API接口配置,对中国开发者来说更加方便.

## 对于英文使用者
如果你想要将项目中的英文快速提取并翻译成中文,你可以尝试以下这一个vscode插件:
i18n Ally

## 一些配置
如果你使用i18n Ally 或者 i18n pro,你可以在项目根目录的.vscode中的settings.json中进行如下配置:
``` json
{
  "i18n-ally.localesPaths": ["src/i18n/locale"],
  "i18n-ally.keystyle": "nested",
  "i18n-ally.sortKeys": true,
  // "i18n-ally.namespace": true,
  // "i18n-ally.pathMatcher": "{locale}/{namespaces}.{ext}",
  "i18n-ally.enabledParsers": ["json"],
  "i18n-ally.sourceLanguage": "zh",
  "i18n-ally.displayLanguage": "zh",
  "i18n-ally.enabledFrameworks": ["vue", "react"],
  "i18n-ally.extract.autoDetect": true,
  // i18n pro
  "i18n-ally.translate.engines": ["baidu"],
  "i18n-ally.translate.baidu.appid": "百度平台APPID",
  "i18n-ally.translate.baidu.apiSecret": "百度平台分配的密钥",
  "vue.features.codeActions.enable": false
}
```