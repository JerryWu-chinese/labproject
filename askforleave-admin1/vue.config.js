//const proxy = require('http-proxy-middleware');
const proxyObj = {}

proxyObj['/'] = {
  target: 'http://localhost:8085',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100 //设计图给的375的图就写37.5，也就是1rem=37.5px
          })
        ]
      }
    }
  }
}