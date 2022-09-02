const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages:{
    index:{
      //page入口
      entry:'src/main.js',
    },

  },
  productionSourceMap:false,
  lintOnSave:false,//关闭语法检查
  //代理跨域
  devServer:{
    //请求服务器地址
    proxy:'http://localhost:3000'
  }
})
