const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages:{
    index:{
      entry: 'src/main.js',
      title: 'IP Tracker',
      template: 'public/index.html',
      filename: 'index.html',
    },
  }
})
