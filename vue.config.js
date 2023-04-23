const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    // 设置 svg-sprite-loader,是 `webpack` 中专门用来处理 `svg` 图标的一个 `loader`，本地svg处理后，会在body标签中svg标签下显示
    config.module.rule('svg').exclude.add(resolve('src/assets/icon')).end()
    config.module
      .rule('icon')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        // 定义id
        symbolId: 'icon-my-[name]'
      })
      .end()
  }
})
