const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'memory-game',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/memory-game'
    : '/',
  indexPath: process.env.NODE_ENV === 'production'
    ? 'index.html'
    : 'index.html'
})
