module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test'
    : '/'
//   chainWebpack: config => {
//     if (config.plugins.has('extract-css')) {
//       const extractCSSPlugin = config.plugin('extract-css')
//       extractCSSPlugin && extractCSSPlugin.tap(() => [{
//         filename: '[name].css',
//         chunkFilename: '[name].css'
//       }])
//     }
//   },
//   configureWebpack: {
//     output: {
//       filename: '[name].js',
//       chunkFilename: '[name].js'
//     }
//   }
}
