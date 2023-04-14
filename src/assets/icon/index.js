// https://webpack.docschina.org/guides/dependency-management/#requirecontext
const svgRequire = require.context('./svg', false, /\.svg$/)
const svgList = svgRequire.keys() // svg文件的路径列表
// 导入本地所有图标给webpack，需要在main.js中进行调用,在webpack的配置中使用svg的相关loader进行处理（vue.config.js中配置）
svgList.forEach((svg) => {
  svgRequire(svg)
})
