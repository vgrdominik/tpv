module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.module
        .rule('file-loader')
        .test(/\.(svg|png|jpe?g|gif)$/)
        .use('file-loader')
        .loader('file-loader')
        .end()
  },
}
