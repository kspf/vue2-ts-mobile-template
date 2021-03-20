// eslint-disable-next-line @typescript-eslint/no-var-requires
const pxtovw = require('postcss-px-to-viewport')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockServe = require('./mock/index.js')
const CONFIG = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [
          // eslint-disable-next-line new-cap
          new pxtovw({
            unitToConvert: 'px',
            viewportWidth: 750,
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: []
          })
        ]
      }
    }
  },
  devServer: {}
}

// 配置mock
if (process.env.PROJECT_MODE === 'mock') {
  CONFIG.devServer.before = MockServe
}

module.exports = CONFIG
